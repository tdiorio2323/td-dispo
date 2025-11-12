import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BrandMark from "@/components/BrandMark";
import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Package
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-lightning-yellow/20">
      {/* Glow effect at top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lightning-yellow to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-10" />
              <span className="text-2xl font-bold">
                <span className="text-foreground">Quick</span>
                <span className="text-lightning-yellow">Printz</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lightning-fast professional printing services for cannabis businesses, events, and brands.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lightning-yellow font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {["Stickers & Labels", "Packaging"].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-lightning-yellow transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lightning-yellow font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Premade Designs", href: "/premadedesigns" },
                { name: "Mylar Bags", href: "https://instagram.com/quickprintz401", external: true },
                { name: "Custom Designs", href: "https://tdstudioshq.com/mylars", external: true },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-lightning-yellow transition-colors text-sm"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lightning-yellow font-semibold mb-4 text-sm uppercase tracking-wider">
              Follow Us
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-lightning-yellow mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  @QUICKPRINTZ401
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-lightning-yellow mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  derekcasiano16@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Package className="w-4 h-4 text-lightning-yellow mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  WE SHIP EVERYWHERE, EVERY DAY!
                </span>
              </li>
            </ul>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Quick Printz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
