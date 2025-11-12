import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Users, Award, Zap, Package } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Package, label: "Orders Completed", value: "2,500+" },
    { icon: Clock, label: "Average Turnaround", value: "24hrs" },
    { icon: Award, label: "Years Experience", value: "5+" }
  ];

  const certifications = [
    "FDA Compliant Materials",
    "Food Grade Packaging",
    "Cannabis Industry Approved",
    "Child-Resistant Options"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-lightning-yellow">Quick Printz</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for premium custom packaging and design services. 
            Specializing in mylar bags, stickers, and branded packaging that makes your products stand out.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-card/50 border-border/50 hover:shadow-glow transition-all duration-300">
                <stat.icon className="w-8 h-8 text-lightning-yellow mx-auto mb-4" />
                <div className="text-3xl font-bold text-lightning-yellow mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-6 h-6 text-lightning-yellow" />
              <h2 className="text-3xl font-bold">Our Story</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Founded in 2019, Quick Printz emerged from a simple mission: to provide cannabis businesses and retailers 
                with premium packaging that reflects their brand quality. What started as a small operation has grown into 
                a trusted partner for hundreds of businesses nationwide.
              </p>
              <p>
                We understand that in competitive markets like cannabis, food, and retail, packaging is more than protection—it's 
                your first impression. That's why we've dedicated ourselves to mastering the art of custom mylar bags, 
                stickers, and branded packaging that not only meets industry standards but exceeds expectations.
              </p>
              <p>
                Every project receives our personal attention, from initial design concepts to final production. 
                We're not just a printing service; we're your creative partners in building a brand that stands out.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quality & Compliance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards for materials and processes, ensuring your packaging 
              meets all industry requirements and regulations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card/50 border-border/50">
              <Shield className="w-8 h-8 text-lightning-yellow mb-4" />
              <h3 className="text-xl font-bold mb-4">Quality Guarantee</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• 100% satisfaction guarantee on all orders</li>
                <li>• Free reprints for any quality issues</li>
                <li>• Color accuracy guarantee with proof approval</li>
                <li>• Premium materials from certified suppliers</li>
              </ul>
            </Card>

            <Card className="p-8 bg-card/50 border-border/50">
              <Award className="w-8 h-8 text-lightning-yellow mb-4" />
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {cert}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 bg-card/50 border-border/50">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust Quick Printz for their packaging needs. 
              Let's bring your vision to life with premium custom packaging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="!bg-lightning-yellow !text-black hover:!bg-lightning-yellow/90 font-bold"
                asChild
              >
                <a href="/contact">Get a Quote</a>
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