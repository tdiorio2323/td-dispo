import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Package, 
  Sparkles, 
  Clock, 
  Shield, 
  TrendingDown,
  CheckCircle,
  AlertCircle
} from "lucide-react";

type ProductType = "mylar-bags" | "stickers" | "boxes" | "design";
type FinishType = "matte" | "gloss" | "metallic" | "holographic";
type SizeType = "small" | "medium" | "large" | "xl";

interface PricingTier {
  minQty: number;
  maxQty: number;
  price: number;
}

export default function Pricing() {
  const [productType, setProductType] = useState<ProductType>("mylar-bags");
  const [quantity, setQuantity] = useState([250]);
  const [size, setSize] = useState<SizeType>("medium");
  const [finish, setFinish] = useState<FinishType>("matte");
  const [rushOrder, setRushOrder] = useState(false);

  // Pricing tiers for different products
  const pricingTiers: Record<ProductType, PricingTier[]> = useMemo(() => ({
    "mylar-bags": [
      { minQty: 100, maxQty: 249, price: 2.99 },
      { minQty: 250, maxQty: 499, price: 2.49 },
      { minQty: 500, maxQty: 999, price: 1.99 },
      { minQty: 1000, maxQty: 2499, price: 1.49 },
      { minQty: 2500, maxQty: 4999, price: 1.19 },
      { minQty: 5000, maxQty: 9999, price: 0.99 },
      { minQty: 10000, maxQty: Infinity, price: 0.79 }
    ],
    "stickers": [
      { minQty: 50, maxQty: 99, price: 0.89 },
      { minQty: 100, maxQty: 249, price: 0.69 },
      { minQty: 250, maxQty: 499, price: 0.49 },
      { minQty: 500, maxQty: 999, price: 0.35 },
      { minQty: 1000, maxQty: 2499, price: 0.25 },
      { minQty: 2500, maxQty: Infinity, price: 0.19 }
    ],
    "boxes": [
      { minQty: 25, maxQty: 99, price: 8.99 },
      { minQty: 100, maxQty: 249, price: 6.99 },
      { minQty: 250, maxQty: 499, price: 4.99 },
      { minQty: 500, maxQty: 999, price: 3.99 },
      { minQty: 1000, maxQty: Infinity, price: 2.99 }
    ],
    "design": [
      { minQty: 1, maxQty: 1, price: 299 },
      { minQty: 2, maxQty: 3, price: 249 },
      { minQty: 4, maxQty: Infinity, price: 199 }
    ]
  }), []);

  // Calculate pricing
  const calculatedPrice = useMemo(() => {
    const currentQuantity = quantity[0];
    const tiers = pricingTiers[productType];
    const tier = tiers.find(t => currentQuantity >= t.minQty && currentQuantity <= t.maxQty);
    
    if (!tier) return 0;
    
    let basePrice = tier.price;
    
    // Size multipliers
    const sizeMultipliers = {
      "small": 0.8,
      "medium": 1,
      "large": 1.3,
      "xl": 1.6
    };
    
    // Finish multipliers
    const finishMultipliers = {
      "matte": 1,
      "gloss": 1.1,
      "metallic": 1.4,
      "holographic": 1.8
    };
    
    basePrice *= sizeMultipliers[size];
    basePrice *= finishMultipliers[finish];
    
    // Rush order upcharge
    if (rushOrder) {
      basePrice *= 1.5;
    }
    
    return basePrice;
  }, [productType, quantity, size, finish, rushOrder, pricingTiers]);

  const totalPrice = calculatedPrice * quantity[0];
  const savings = quantity[0] >= 500 ? (2.99 - calculatedPrice) * quantity[0] : 0;

  const productOptions = [
    { value: "mylar-bags", label: "Mylar Bags", icon: Package },
    { value: "stickers", label: "Stickers", icon: Sparkles },
    { value: "boxes", label: "Boxes", icon: Package },
    { value: "design", label: "Design Service", icon: Calculator }
  ];

  const features = [
    "Free design consultation",
    "Unlimited revisions on artwork",
    "Color accuracy guarantee", 
    "Premium materials only",
    "Fast 24-48hr turnaround",
    "Free shipping on orders over $500"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transparent <span className="text-lightning-yellow">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No hidden fees, no surprises. Get instant pricing for your custom packaging 
            with our interactive calculator below.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Calculator */}
            <Card className="p-8 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-lightning-yellow" />
                <h2 className="text-2xl font-bold">Price Calculator</h2>
              </div>

              <div className="space-y-6">
                {/* Product Type */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Product Type</Label>
                  <Select value={productType} onValueChange={(value: ProductType) => setProductType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity Slider */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Quantity: {quantity[0].toLocaleString()}
                  </Label>
                  <Slider
                    value={quantity}
                    onValueChange={setQuantity}
                    max={productType === "design" ? 10 : 10000}
                    min={productType === "design" ? 1 : productType === "boxes" ? 25 : 50}
                    step={productType === "design" ? 1 : 25}
                    className="w-full"
                  />
                </div>

                {/* Size (not for design) */}
                {productType !== "design" && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Size</Label>
                    <Select value={size} onValueChange={(value: SizeType) => setSize(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (3.5" x 5")</SelectItem>
                        <SelectItem value="medium">Medium (4" x 6")</SelectItem>
                        <SelectItem value="large">Large (5" x 8")</SelectItem>
                        <SelectItem value="xl">Extra Large (6" x 9")</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Finish (not for design) */}
                {productType !== "design" && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Finish</Label>
                    <Select value={finish} onValueChange={(value: FinishType) => setFinish(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matte">Matte</SelectItem>
                        <SelectItem value="gloss">Gloss (+10%)</SelectItem>
                        <SelectItem value="metallic">Metallic (+40%)</SelectItem>
                        <SelectItem value="holographic">Holographic (+80%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Rush Order */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="rush"
                    checked={rushOrder}
                    onChange={(e) => setRushOrder(e.target.checked)}
                    className="w-4 h-4"
                    aria-label="Rush order option"
                  />
                  <Label htmlFor="rush" className="text-base">
                    Rush Order (24hr turnaround) +50%
                  </Label>
                </div>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-8 bg-card/50 border-border/50">
              <h3 className="text-2xl font-bold mb-6">Your Quote</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Unit Price:</span>
                  <span className="font-bold text-lightning-yellow">
                    ${calculatedPrice.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span>Quantity:</span>
                  <span>{quantity[0].toLocaleString()}</span>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-lightning-yellow">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="flex items-center gap-2 text-green-400">
                    <TrendingDown className="w-4 h-4" />
                    <span>You save ${savings.toFixed(2)} with bulk pricing!</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {rushOrder ? "24 hour" : "48-72 hour"} turnaround
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Price includes design consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Free shipping on orders over $500</span>
                </div>
              </div>

              <Button 
                className="w-full !bg-lightning-yellow !text-black hover:!bg-lightning-yellow/90 font-bold"
                size="lg"
                asChild
              >
                <a href="/contact">Get This Quote</a>
              </Button>

              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-lightning-yellow mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Final pricing may vary based on artwork complexity and special requirements. 
                    This calculator provides estimated pricing for standard orders.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quantity Discounts</h2>
          
          <Tabs defaultValue="mylar-bags" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mylar-bags">Mylar Bags</TabsTrigger>
              <TabsTrigger value="stickers">Stickers</TabsTrigger>
              <TabsTrigger value="boxes">Boxes</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
            
            {Object.entries(pricingTiers).map(([product, tiers]) => (
              <TabsContent key={product} value={product} className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tiers.map((tier, index) => (
                    <Card key={index} className="p-6 bg-card/50 border-border/50">
                      <div className="text-center">
                        <div className="text-lg font-bold mb-2">
                          {tier.minQty === tier.maxQty 
                            ? `${tier.minQty}`
                            : `${tier.minQty.toLocaleString()} - ${tier.maxQty === Infinity ? "10,000+" : tier.maxQty.toLocaleString()}`
                          }
                        </div>
                        <div className="text-2xl font-bold text-lightning-yellow">
                          ${tier.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">per unit</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-card/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-lightning-yellow" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 bg-card/50 border-border/50">
            <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a detailed quote for your specific needs. Our team will review your requirements 
              and provide final pricing within 2 hours.
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