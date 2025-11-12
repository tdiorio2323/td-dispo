import { useMemo, useState, type CSSProperties } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Package, Sparkles, Zap } from "lucide-react";
import { type DesignAsset, isImageAsset } from "@/lib/designs";
import { useDesignAssets, usePrefetchDesignAssets } from "@/hooks/useDesignAssets";

const watermarkOverlayStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(45deg, rgba(255, 255, 255, 0.75) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.75) 75%), linear-gradient(45deg, rgba(0, 0, 0, 0.65) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.65) 75%)",
  backgroundSize: "40px 40px",
  backgroundPosition: "0 0, 20px 20px",
  opacity: 0.85,
  mixBlendMode: "overlay",
};

const logoWatermarkStyle: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  opacity: 0.85,
  zIndex: 10,
  filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
};

const DESIGN_FILTERS = [
  { label: "All", value: "all" },
  { label: "Mylar Bags", value: "mylar" },
  { label: "Soda Cans", value: "soda" },
  { label: "Custom Boxes", value: "boxes" },
  { label: "Stickers", value: "stickers" },
  { label: "Graphic Designs", value: "graphics" },
  { label: "Websites", value: "web" },
  { label: "Other", value: "other" },
] as const;

type DesignFilterValue = (typeof DESIGN_FILTERS)[number]["value"];

const PLACEHOLDER_INDICES = Array.from({ length: 24 }, (_, index) => index);

const resolveCategory = (asset: DesignAsset): Exclude<DesignFilterValue, "all"> => {
  const slug = `${asset.path}-${asset.name}`.toLowerCase();
  if (slug.includes("mylar") || slug.includes("bag")) return "mylar";
  if (slug.includes("soda") || slug.includes("can")) return "soda";
  if (slug.includes("box")) return "boxes";
  if (slug.includes("sticker") || slug.includes("label")) return "stickers";
  if (slug.includes("web") || slug.includes("site")) return "web";
  if (slug.includes("graphic") || slug.includes("brand") || slug.includes("logo")) return "graphics";
  return "other";
};

const getBadge = (asset: DesignAsset, index: number) => {
  const timestamp = asset.createdAt ?? asset.updatedAt;
  if (timestamp) {
    const ageDays =
      (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays <= 7) {
      return { label: "New", className: "bg-gradient-to-r from-yellow-400 to-amber-300" };
    }
  }
  if (index < 6) {
    return { label: "Trending", className: "bg-gradient-to-r from-orange-400 to-yellow-200" };
  }
  return null;
};

const LightningDivider = () => <div className="lightning-divider" aria-hidden="true" />;

const DesignSkeletonCard = () => (
  <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-glow">
    <div className="absolute inset-0 bg-white/5 animate-pulse" />
    <div className="absolute bottom-4 left-4 h-3 w-24 bg-white/20 rounded-full animate-pulse" />
  </div>
);

const Index = () => {
  const { data, isPending, isError, error } = useDesignAssets();
  const prefetchDesigns = usePrefetchDesignAssets();
  const [activeFilter, setActiveFilter] = useState<DesignFilterValue>("all");

  const imageAssets = useMemo(
    () => data?.filter(isImageAsset) ?? [],
    [data]
  );

  const filteredDesigns = useMemo(() => {
    if (activeFilter === "all") {
      return imageAssets;
    }
    return imageAssets.filter((asset) => resolveCategory(asset) === activeFilter);
  }, [activeFilter, imageAssets]);

  const displayedDesigns = filteredDesigns.slice(0, 24);
  const hasDesigns = displayedDesigns.length > 0;
  const designsError =
    isError && error
      ? error instanceof Error
        ? error.message
        : "Unable to load premade designs."
      : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection onPrefetchDesigns={prefetchDesigns} />
      <LightningDivider />

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <p className="text-lightning-yellow text-sm font-semibold uppercase tracking-widest">
                Premade Designs
              </p>
              <h2 className="text-3xl font-bold text-lightning-yellow">ADD YOUR LOGO &amp; GO!</h2>
            </div>
            <Button
              asChild
              className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
            >
              <a
                href="/premadedesigns"
                onMouseEnter={prefetchDesigns}
                onFocus={prefetchDesigns}
              >
                Browse All
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {DESIGN_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  activeFilter === filter.value
                    ? "border-lightning-yellow text-black bg-lightning-yellow font-semibold"
                    : "border-white/20 text-white/70 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {designsError ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-200 text-sm">
              {designsError}.{" "}
              <a href="/premadedesigns" className="underline text-white">
                See the full gallery
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {isPending && !hasDesigns
                ? PLACEHOLDER_INDICES.map((placeholder) => (
                    <DesignSkeletonCard key={`placeholder-${placeholder}`} />
                  ))
                : displayedDesigns.map((design, index) => {
                    const badge = getBadge(design, index);
                    return (
                      <div
                        key={design.path}
                        className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm group shadow-glow transition-transform duration-500 hover:-translate-y-1.5"
                      >
                        <img
                          src={design.publicUrl || "/quickprintz_assets/quickprintz-256.png"}
                          alt={design.name}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.04]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/quickprintz_assets/quickprintz-256.png";
                          }}
                          loading="lazy"
                          draggable={false}
                          onContextMenu={(event) => event.preventDefault()}
                        />
                        <div style={watermarkOverlayStyle} aria-hidden="true" />
                        <img
                          src="/quickprintz_assets/quickprintz-512.png"
                          alt="Quick Printz Watermark"
                          style={logoWatermarkStyle}
                          aria-hidden="true"
                          draggable={false}
                          onContextMenu={(event) => event.preventDefault()}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {badge ? (
                          <span
                            className={`absolute top-3 left-3 rounded-full text-xs font-semibold px-3 py-1 text-black uppercase tracking-wide ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        ) : null}
                        <div className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white flex items-center justify-between">
                          <span className="truncate">{design.name}</span>
                          <span className="text-lightning-yellow">$20</span>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold px-10"
              asChild
            >
              <a
                href="/premadedesigns"
                onMouseEnter={prefetchDesigns}
                onFocus={prefetchDesigns}
              >
                SEE ENTIRE COLLECTION
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LightningDivider />

      <div id="services">
        <ServicesGrid />
      </div>

      {/* Four Glass Cards Section */}
      <LightningDivider />
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Custom Design",
                icon: Sparkles,
                description: "Unique layouts crafted to your brand system.",
              },
              {
                title: "Fast Turnaround",
                icon: Zap,
                description: "Rush production windows with proofed accuracy.",
              },
              {
                title: "Quality Products",
                icon: Package,
                description: "Retail-ready finishes, laminations, and embellishments.",
              },
              {
                title: "Direct Support",
                icon: MessageCircle,
                description: "Chat directly with designers + print specialists.",
              },
            ].map(({ title, icon: Icon, description }) => (
              <div
                key={title}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-lightning-yellow/20 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-lightning-yellow" />
                </div>
                <h3 className="text-2xl font-bold text-lightning-yellow mb-2">{title}</h3>
                <p className="text-white/80 text-sm">{description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-lg px-8 py-6"
              asChild
            >
              <a
                href="https://www.instagram.com/quickprintz401/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                DM TO GET STARTED
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Alternating marketing rows */}
      <section id="marketing-rows" className="max-w-6xl mx-auto px-4 mt-24 pb-8 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl overflow-hidden bg-black/40 p-2 h-full">
            <img
              src="/quickprintz_assets/mylar-bags.jpg"
              srcSet="/quickprintz_assets/mylar-bags.jpg 1x, /quickprintz_assets/mylar-bags.jpg 2x"
              alt="Mylar Bags"
              className="aspect-square rounded-2xl w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-lightning-yellow">Mylar Bags</h3>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              {["Matte, gloss, holographic", "Retail-ready compliance layout", "Rush options available"].map(
                (feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-lightning-yellow text-xl leading-none">•</span>
                    <span>{feature}</span>
                  </li>
                )
              )}
            </ul>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a
                href="https://www.instagram.com/quickprintz401/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DM TO GET STARTED
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] order-last lg:order-first h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-lightning-yellow">Custom Boxes</h3>
            <p className="mt-4 text-white/80 text-base md:text-lg">
              Premium finishes. Factory-level pricing.
            </p>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg flex-grow">
              {["Foil, emboss, UV spot", "Fast prototypes", "Color-accurate proofs"].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-lightning-yellow text-xl leading-none">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a
                href="https://www.instagram.com/quickprintz401/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DM TO GET STARTED
              </a>
            </Button>
          </div>
          <div className="rounded-3xl overflow-hidden bg-black/40 p-2 h-full">
            <img
              src="/quickprintz_assets/custom-boxes.jpg"
              srcSet="/quickprintz_assets/custom-boxes.jpg 1x, /quickprintz_assets/custom-boxes.jpg 2x"
              alt="Custom Boxes"
              className="aspect-square rounded-2xl w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl overflow-hidden bg-black/40 p-2 h-full">
            <img
              src="/quickprintz_assets/in-house-design.jpg"
              srcSet="/quickprintz_assets/in-house-design.jpg 1x, /quickprintz_assets/in-house-design.jpg 2x"
              alt="In-House Design"
              className="aspect-square rounded-2xl w-full h-full object-cover"
            />
          </div>
          <div className="rounded-3xl p-8 bg-black/70 shadow-[0_0_60px_-20px_rgba(245,231,99,0.6)] h-full flex flex-col">
            <h3 className="text-3xl md:text-4xl font-bold text-lightning-yellow">In-House Design</h3>
            <p className="mt-4 text-white/80 text-base md:text-lg flex-grow">
              Custom designs built for your brand, not templates. Fast same-day turnaround and unlimited
              revisions until it’s exactly right. Every file is delivered print-ready, color-accurate, and
              production-verified so your bags come out clean, sharp, and consistent every run.
            </p>
            <ul className="mt-6 space-y-3 text-white/80 text-base md:text-lg">
              {["Same-day turnaround", "Unlimited revisions", "Fully custom designs"].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-lightning-yellow text-xl leading-none">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold text-base"
              asChild
            >
              <a
                href="https://wa.me/13474859935"
                target="_blank"
                rel="noopener noreferrer"
              >
                DM TO GET STARTED
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 mb-12 max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {[...Array(8)].map((_, i) => (
              <Zap key={i} className="w-6 h-6 text-[hsl(60,100%,50%)] fill-[hsl(60,100%,50%)]" />
            ))}
          </div>
        </div>
      </section>

      <div id="portfolio" className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border-border/50 rounded-[20px] h-96 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] transition-all duration-300 overflow-hidden">
            <img
              src="/quickprintz_assets/storefront-interior.jpg"
              alt="Quick Printz storefront interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
