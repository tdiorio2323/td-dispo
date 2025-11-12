import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Palette, 
  Zap, 
  Clock, 
  Shield, 
  FileText,
  Layers,
  Sparkles,
  CheckCircle
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Package,
      title: "Custom Mylar Bags",
      description: "Premium mylar packaging with custom designs, multiple finish options, and compliance-ready features.",
      features: ["Multiple sizes available", "Matte/Gloss finishes", "Child-resistant options", "Cannabis compliant"],
      startingPrice: "From $1.49/bag"
    },
    {
      icon: Sparkles,
      title: "Custom Stickers & Labels",
      description: "High-quality vinyl stickers and labels for branding, compliance, and product identification.",
      features: ["Weatherproof materials", "Custom shapes", "Holographic options", "Bulk discounts"],
      startingPrice: "From $0.25/sticker"
    },
    {
      icon: Palette,
      title: "Graphic Design Services",
      description: "Professional design services from concept to print-ready files, ensuring your brand stands out.",
      features: ["Logo design", "Package design", "Brand identity", "Print optimization"],
      startingPrice: "From $299/project"
    },
    {
      icon: FileText,
      title: "Custom Boxes & Packaging",
      description: "Corrugated boxes, folding cartons, and specialty packaging for retail and shipping.",
      features: ["Custom sizes", "Full-color printing", "Various materials", "Structural design"],
      startingPrice: "From $2.99/box"
    }
  ];

  const materials = [
    { name: "Mylar (PET)", properties: "Barrier protection, durability, heat sealable" },
    { name: "BOPP (Polypropylene)", properties: "Crystal clear, moisture resistant" },
    { name: "Vinyl", properties: "Weather resistant, long-lasting adhesive" },
    { name: "Paper/Cardstock", properties: "Eco-friendly, printable, recyclable" }
  ];

  const finishes = [
    { name: "Matte", description: "Smooth, non-reflective finish" },
    { name: "Gloss", description: "High-shine, vibrant colors" },
    { name: "Metallic", description: "Premium metallic appearance" },
    { name: "Holographic", description: "Eye-catching rainbow effect" }
  ];

  const process = [
    {
      step: "1",
      title: "Consultation",
      description: "Discuss your needs, quantities, and timeline"
    },
    {
      step: "2", 
      title: "Design & Proofing",
      description: "Create or refine designs with unlimited revisions"
    },
    {
      step: "3",
      title: "Production",
      description: "Print using premium materials and quality controls"
    },
    {
      step: "4",
      title: "Quality Check & Ship",
      description: "Final inspection and fast, secure shipping"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-lightning-yellow">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive packaging and design solutions tailored for cannabis businesses, 
            food brands, and retailers who demand quality and compliance.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-lightning-yellow/10 rounded-lg">
                    <service.icon className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="text-lightning-yellow font-semibold mb-4">{service.startingPrice}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-lightning-yellow" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full !bg-lightning-yellow !text-black hover:!bg-lightning-yellow/90 font-bold"
                  asChild
                >
                  <a href="/contact">Get Quote</a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Materials & Specifications</h2>
          
          <Tabs defaultValue="materials" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="finishes">Finishes</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
            </TabsList>
            
            <TabsContent value="materials" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {materials.map((material, index) => (
                  <Card key={index} className="p-6 bg-card/50 border-border/50">
                    <h4 className="font-bold text-lightning-yellow mb-2">{material.name}</h4>
                    <p className="text-muted-foreground">{material.properties}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="finishes" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {finishes.map((finish, index) => (
                  <Card key={index} className="p-6 bg-card/50 border-border/50">
                    <h4 className="font-bold text-lightning-yellow mb-2">{finish.name}</h4>
                    <p className="text-muted-foreground">{finish.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="process" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {process.map((step, index) => (
                  <Card key={index} className="p-6 bg-card/50 border-border/50 text-center">
                    <div className="w-12 h-12 bg-lightning-yellow text-black rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {step.step}
                    </div>
                    <h4 className="font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 px-6 bg-card/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Quick Printz?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-card/50 border-border/50">
              <Clock className="w-8 h-8 text-lightning-yellow mx-auto mb-4" />
              <h3 className="font-bold mb-2">Fast Turnaround</h3>
              <p className="text-muted-foreground">24-48 hour production for most orders</p>
            </Card>
            
            <Card className="p-6 text-center bg-card/50 border-border/50">
              <Shield className="w-8 h-8 text-lightning-yellow mx-auto mb-4" />
              <h3 className="font-bold mb-2">Industry Compliant</h3>
              <p className="text-muted-foreground">FDA approved materials, cannabis regulations</p>
            </Card>
            
            <Card className="p-6 text-center bg-card/50 border-border/50">
              <Zap className="w-8 h-8 text-lightning-yellow mx-auto mb-4" />
              <h3 className="font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">100% satisfaction or free reprints</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 bg-card/50 border-border/50">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a custom quote for your packaging needs. Our team will work with you to create 
              the perfect solution for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="!bg-lightning-yellow !text-black hover:!bg-lightning-yellow/90 font-bold"
                asChild
              >
                <a href="/contact">Get Custom Quote</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/premadedesigns">Browse Designs</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}