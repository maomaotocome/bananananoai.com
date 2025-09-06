import { Link } from "wouter";
import { Github, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-xl">
                🍌
              </div>
              <h3 className="text-xl font-bold gradient-text">Banana Nano Ai</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate platform for AI-powered image editing using Google's revolutionary
              Gemini 2.5 Flash Image model. Create viral content with character consistency.
            </p>
            <div className="mb-4">
              <Link href="/pose-painter" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors" data-testid="footer-pose-painter-link">
                🎨 Try Pose Painter Tool
              </Link>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github"
              >
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
              >
                <span className="sr-only">YouTube</span>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/#features"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-features"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pose-painter"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-pose-painter"
                >
                  Pose Painter
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-api"
                >
                  API Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-faq"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/how-to-use"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-how-to-use"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-tutorials"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/examples"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-examples"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-nano-banana"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-what-is-nano-banana"
                >
                  What is Nano Banana
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-case-studies"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/social-media-kit"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-social-media-kit"
                >
                  Social Media Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/outreach-strategy"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-outreach-strategy"
                >
                  Outreach Strategy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">Banana Nano Ai</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
              data-testid="footer-link-privacy"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
              data-testid="footer-link-terms"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
              data-testid="footer-link-contact"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
