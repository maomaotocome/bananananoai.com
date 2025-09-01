import { Link } from "wouter";
import { Github, Twitter, Youtube } from "lucide-react";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <h3 className="text-xl font-bold gradient-text">Nano Banana AI</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate platform for AI-powered image editing using Google's revolutionary
              Gemini 2.5 Flash Image model.
            </p>
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

          <div className="grid grid-cols-2 gap-8">
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
                    href="/api"
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-api"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-pricing"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-changelog"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
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
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-blog"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-community"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Nano Banana AI. Powered by Google Gemini 2.5 Flash Image.
          </p>
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