import Link from "next/link";
import { Rocket } from "lucide-react";
import { TwitterIcon, GithubIcon, LinkedinIcon } from "@/components/public/social-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl inline-block">CampaignFlow</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Discover amazing content, guides, and campaigns. Join our newsletter to get the latest updates delivered directly to your inbox.
            </p>
            <form className="flex space-x-2 max-w-sm" action="#">
              <Input type="email" placeholder="Enter your email" required className="max-w-sm" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Content</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/search?q=technology" className="text-muted-foreground hover:text-primary text-sm transition-colors">Technology</Link>
                </li>
                <li>
                  <Link href="/search?q=business" className="text-muted-foreground hover:text-primary text-sm transition-colors">Business</Link>
                </li>
                <li>
                  <Link href="/search?q=lifestyle" className="text-muted-foreground hover:text-primary text-sm transition-colors">Lifestyle</Link>
                </li>
                <li>
                  <Link href="/search?q=latest" className="text-muted-foreground hover:text-primary text-sm transition-colors">Latest Articles</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About Us</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-muted-foreground hover:text-primary text-sm transition-colors">Disclaimer</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t pt-8 space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} CampaignFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
