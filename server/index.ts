import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initPromptPacks } from "./init-prompt-packs";

const app = express();

// Force HTTPS redirect in production
app.use((req, res, next) => {
  // Skip redirect for localhost and development
  if (req.hostname === 'localhost' || req.hostname === '127.0.0.1' || process.env.NODE_ENV === 'development') {
    return next();
  }

  // Redirect HTTP to HTTPS
  if (req.header('x-forwarded-proto') !== 'https' && req.protocol !== 'https') {
    return res.redirect(301, `https://${req.get('host')}${req.url}`);
  }
  
  next();
});

// WWW to non-WWW redirect
app.use((req, res, next) => {
  if (req.hostname.startsWith('www.')) {
    const nonWwwHost = req.hostname.replace(/^www\./, '');
    const protocol = req.secure || req.header('x-forwarded-proto') === 'https' ? 'https' : 'http';
    return res.redirect(301, `${protocol}://${nonWwwHost}${req.url}`);
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Initialize prompt packs on startup
  await initPromptPacks();
  
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
