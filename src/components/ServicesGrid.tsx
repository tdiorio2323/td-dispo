import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  FileText,
  Image,
  Package,
  Shirt,
  Sticker,
  ArrowRight,
  Sparkles
} from "lucide-react";

const services = [
  {
    icon: Sticker,
    title: "Stickers & Labels",
    description: "Durable vinyl stickers and custom labels for products and branding.",
    features: ["Die-Cut Shapes", "Waterproof", "Custom Shapes"],
    color: "lightning-yellow"
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Custom packaging solutions for cannabis products and retail.",
    features: ["Exit Bags", "Boxes", "Mylar Bags"],
    color: "lightning-yellow"
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-20 px-6 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-lightning-yellow" />
            <span className="text-lightning-yellow font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">What We </span>
            <span className="text-lightning-yellow">Print</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional printing services tailored for cannabis businesses, events, and brands.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-lightning-yellow/50 transition-all duration-300 shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)] overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-lightning-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-lightning-yellow/10 flex items-center justify-center mb-4 group-hover:bg-lightning-yellow/20 transition-colors">
                    <Icon className="w-7 h-7 text-lightning-yellow" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-lightning-yellow transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-lightning-yellow" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:text-lightning-yellow group-hover:bg-lightning-yellow/10"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see what you need? We do custom projects too!
          </p>
          <Button variant="premium" size="lg" className="shadow-glow hover:shadow-[0_0_40px_hsl(var(--lightning-yellow)/0.5)]">
            Request Custom Quote
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}