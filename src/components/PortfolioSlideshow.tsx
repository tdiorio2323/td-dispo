import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ExternalLink, Filter } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    image: "/quickprintz_assets/quickprintz-256.png",
    title: "Premium Mylar Collection",
    category: "Bags",
    description: "Custom-designed mylar bags with holographic effects and premium finishes for high-end dispensaries.",
    tags: ["Holographic", "Premium", "Custom Logo"]
  },
  {
    id: 2,
    image: "/quickprintz_assets/quickprintz-256.png",
    title: "Luxury Box Series",
    category: "Boxes", 
    description: "Child-resistant luxury packaging with magnetic closures and premium unboxing experience.",
    tags: ["Child-Resistant", "Magnetic", "Luxury"]
  },
  {
    id: 3,
    image: "/quickprintz_assets/quickprintz-256.png",
    title: "Brand Transformation",
    category: "Full Brand Identity",
    description: "Complete rebrand for established dispensary including logo, packaging, and marketing materials.",
    tags: ["Rebrand", "Logo Design", "Complete Suite"]
  },
  {
    id: 4,
    image: "/quickprintz_assets/quickprintz-256.png",
    title: "Boutique Cannabis Bags",
    category: "Bags",
    description: "Small-batch artisan cannabis packaging with hand-finished details and premium materials.",
    tags: ["Artisan", "Small-batch", "Hand-finished"]
  },
  {
    id: 5,
    image: "/quickprintz_assets/quickprintz-256.png",
    title: "Compliance Ready Containers",
    category: "Boxes",
    description: "State-compliant packaging solutions with tamper-evident seals and required labeling areas.",
    tags: ["Compliant", "Tamper-evident", "Professional"]
  }
];

const categories = ["All", "Bags", "Boxes", "Full Brand Identity", "Before/After"];

const PortfolioSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPlaying, setIsPlaying] = useState(true);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredItems.length, isPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = filteredItems[currentIndex];

  return (
    <section className="py-16 px-6 bg-gradient-dark">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-gradient-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Premium cannabis packaging designs that elevate brands and drive sales.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "premium" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentIndex(0);
                }}
                className="text-sm"
              >
                <Filter className="w-3 h-3 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Slideshow */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm border border-border/20">
                <img
                  src={currentItem?.image}
                  alt={currentItem?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-background/10 border-border/30 hover:bg-background/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm bg-background/10 border-border/30 hover:bg-background/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Play/Pause Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-4 right-4 backdrop-blur-sm bg-background/10"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <Badge variant="outline" className="bg-background/10 backdrop-blur-sm">
                {currentItem?.category}
              </Badge>
              
              <h3 className="text-3xl md:text-4xl font-bold">
                {currentItem?.title}
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {currentItem?.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {currentItem?.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-muted/20">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* CTA Button */}
              <Button variant="premium" size="lg" className="group">
                View Project Details
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary shadow-glow" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="backdrop-blur-sm">
            View Complete Portfolio
            <ExternalLink className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSlideshow;