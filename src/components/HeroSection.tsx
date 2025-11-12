import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";

type HeroSectionProps = {
  onPrefetchDesigns?: () => void;
};

export default function HeroSection({ onPrefetchDesigns }: HeroSectionProps = {}) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-36">
      {/* Content with frosted glass card */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="hero-lightning bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-glow mt-8 md:mt-16 lg:mt-24 overflow-hidden">
          <div className="hero-lightning__pulses" aria-hidden="true" />
          <div className="hero-lightning__bolts" aria-hidden="true" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-lightning-yellow animate-pulse" />
              <span className="text-lightning-yellow font-semibold text-sm uppercase tracking-wider">
                Fast • Professional • Quality
              </span>
              <Sparkles className="w-6 h-6 text-lightning-yellow animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Lightning Fast</span>
              <br />
              <span className="lightning-shimmer bg-clip-text text-transparent">
                Print Solutions
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Professional printing services for cannabis businesses, events, and brands.
              From business cards to banners, we deliver quality prints at lightning speed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="group !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)]"
                asChild
              >
                <a
                  href="/premadedesigns"
                  onMouseEnter={onPrefetchDesigns}
                  onFocus={onPrefetchDesigns}
                >
                  PREMADE DESIGNS
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform inline-flex ml-2" />
                </a>
              </Button>
              <Button size="xl" className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)]" asChild>
                <a href="https://www.instagram.com/quickprintz401/" target="_blank" rel="noopener noreferrer">
                  DM TO GET STARTED
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-lightning-yellow mb-2">24hr</div>
                <div className="text-sm text-muted-foreground">Turnaround</div>
              </div>
              <div className="text-center border-l border-r border-border/30">
                <div className="text-3xl md:text-4xl font-bold text-lightning-yellow mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-lightning-yellow mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
