import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Palette, Zap, ChevronDown, Package, Sparkles, Calculator, Info } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import CartSheetTrigger from "@/components/CartSheetTrigger";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const navigation = [
    { 
      name: "Shop", 
      href: "/products",
      hasDropdown: true,
      children: [
        { name: "Mylar Bags", href: "/products/custom-mylar-bags", icon: Package, description: "Custom printed mylar packaging" },
        { name: "Stickers & Labels", href: "/products/stickers", icon: Sparkles, description: "Vinyl stickers and labels" },
        { name: "Custom Boxes", href: "/products/boxes", icon: Package, description: "Corrugated and folding cartons" }
      ]
    },
    { name: "Premade Designs", href: "/premadedesigns" },
    { 
      name: "Services", 
      href: "/services",
      hasDropdown: true,
      children: [
        { name: "Graphic Design", href: "/services#design", icon: Palette, description: "Professional design services" },
        { name: "Custom Printing", href: "/services#printing", icon: Package, description: "Premium printing solutions" },
        { name: "Quote Calculator", href: "/pricing", icon: Calculator, description: "Get instant pricing" }
      ]
    },
    { 
      name: "Company", 
      href: "/about",
      hasDropdown: true,
      children: [
        { name: "About Us", href: "/about", icon: Info, description: "Our story and values" },
        { name: "Portfolio", href: "/about#portfolio", icon: Sparkles, description: "See our work" },
        { name: "Contact", href: "/contact", icon: Package, description: "Get in touch" }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-lightning-yellow/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Logo centered on top */}
          <div className="flex justify-center pt-6 pb-4">
            <a href="/" aria-label="Quick Printz Home">
              <BrandMark className="h-32 w-32" />
            </a>
          </div>

          {/* Menu items and CTAs below logo */}
          <div className="flex items-center justify-between pb-6">
            {/* Left spacer */}
            <div className="flex-1"></div>

            {/* Centered Navigation */}
            <div className="flex items-center gap-8">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(item.hasDropdown ? item.name : null)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${hoveredMenu === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && hoveredMenu === item.name && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-[#0b0b0f] border border-white/10 shadow-lg rounded-lg overflow-hidden">
                      {item.children?.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors"
                        >
                          <child.icon className="w-5 h-5 text-lightning-yellow mt-0.5" />
                          <div>
                            <div className="font-medium text-white">{child.name}</div>
                            <div className="text-xs text-gray-400">{child.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <CartSheetTrigger className="border-white/20 text-white hover:bg-white/10" />
              <Button
                size="sm"
                className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                asChild
              >
                <a href="https://tdstudioshq.com/mylars" target="_blank" rel="noopener noreferrer">
                  <Palette className="w-4 h-4 mr-2" />
                  Custom Design
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-center relative h-20">
            <div className="absolute left-0">
              <CartSheetTrigger
                triggerVariant="outline"
                triggerSize="sm"
                className="text-white border-white/20 bg-black/50 hover:bg-black/60"
              />
            </div>
            {/* Centered Logo */}
            <a href="/" aria-label="Quick Printz Home">
              <BrandMark className="h-16 w-16" />
            </a>

            {/* Mobile Menu Button - Top Right */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-0 h-10 w-10 !bg-[hsl(60,100%,50%)] hover:!bg-[hsl(60,100%,45%)] border-none rounded-md"
            >
              <Zap className="w-5 h-5 text-black fill-black" />
            </Button>
          </div>

          {/* Mobile Menu - Yellow Card */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Menu Card */}
              <div className="fixed left-0 right-0 top-20 bottom-0 z-50 bg-[hsl(60,100%,50%)] overflow-y-auto">
                <div className="p-6 min-h-full">
                  {/* Close X button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-black hover:bg-black/10 rounded-md transition-colors z-10"
                    aria-label="Close menu"
                  >
                    <X className="w-8 h-8 stroke-[3]" />
                  </button>

                  <div className="space-y-6 mt-12">
                    {navigation.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <a
                          href={item.href}
                          className="block text-2xl font-bold text-black hover:underline transition-colors py-3"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </a>
                        {item.children && (
                          <div className="pl-4 space-y-2">
                            {item.children.map((child) => (
                              <a
                                key={child.name}
                                href={child.href}
                                className="flex items-center gap-2 text-lg text-black/80 hover:text-black py-1"
                                onClick={() => setIsOpen(false)}
                              >
                                <child.icon className="w-4 h-4" />
                                {child.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-col gap-4 pt-8 border-t-2 border-black/20">
                      <Button
                        size="lg"
                        className="w-full !bg-black !text-[hsl(60,100%,50%)] hover:!bg-black/90 font-bold text-lg py-6"
                        asChild
                      >
                        <a href="https://tdstudioshq.com/mylars" target="_blank" rel="noopener noreferrer">
                          <Palette className="w-5 h-5 mr-2" />
                          Custom Design
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
