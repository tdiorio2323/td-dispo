import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Upload, Sparkles, Zap } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const bagSizes = [
  { id: "1_8", name: "1/8 oz", basePrice: 0.45 },
  { id: "1_4", name: "1/4 oz", basePrice: 0.55 },
  { id: "1_2", name: "1/2 oz", basePrice: 0.65 },
  { id: "1oz", name: "1 oz", basePrice: 0.75 },
  { id: "3_5g", name: "3.5g", basePrice: 0.40 }
];

const colors = [
  { id: "black", name: "Black", color: "#000000" },
  { id: "white", name: "White", color: "#FFFFFF" },
  { id: "clear", name: "Clear", color: "#F0F0F0" },
  { id: "green", name: "Green", color: "#22C55E" },
  { id: "purple", name: "Purple", color: "#8B5CF6" },
  { id: "gold", name: "Gold", color: "#F59E0B" }
];

const finishes = [
  { id: "gloss", name: "Gloss", price: 0 },
  { id: "matte", name: "Matte", price: 0.15 },
  { id: "holo", name: "Holographic", price: 0.25 }
];

const PODConfigurator = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    bagSize: "1_8",
    quantity: [100],
    printCoverage: "front",
    color: "black",
    finish: "gloss",
    spotUV: false,
    uvGloss: false,
    customLogo: false
  });

  const calculatePrice = () => {
    const bagSize = bagSizes.find(b => b.id === config.bagSize);
    const finish = finishes.find(f => f.id === config.finish);
    const quantity = config.quantity[0];
    
    const basePrice = bagSize?.basePrice || 0;
    let perBagPrice = basePrice + (finish?.price || 0);
    
    if (config.printCoverage === "both") perBagPrice += 0.20;
    if (config.spotUV) perBagPrice += 0.20;
    if (config.uvGloss) perBagPrice += 0.30;
    if (config.customLogo) perBagPrice += 1.50;
    
    // Quantity breaks
    if (quantity >= 1000) perBagPrice *= 0.8;
    else if (quantity >= 500) perBagPrice *= 0.85;
    else if (quantity >= 100) perBagPrice *= 0.9;
    
    return {
      perBag: perBagPrice,
      total: perBagPrice * quantity
    };
  };

  const price = calculatePrice();
  const { addItem } = useCart();

  const steps = [
    { number: 1, title: "Bag Selection", description: "Choose size & quantity" },
    { number: 2, title: "Print Coverage", description: "Select printing options" },
    { number: 3, title: "Design & Finish", description: "Colors and effects" },
    { number: 4, title: "Add-ons", description: "Premium features" },
    { number: 5, title: "Design Studio", description: "Upload or choose design" }
  ];

  return (
    <section id="configurator" className="py-16 px-6 bg-gradient-dark mb-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Configure</span> Your Order
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time pricing with instant quotes. From 25 to 10,000+ units.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-3 space-y-4">
            {/* Progress Steps */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-[360px] mx-auto">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  {steps.map((s, index) => (
                    <div key={s.number} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        step >= s.number 
                          ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {s.number}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-2 ${
                          step > s.number ? "bg-primary" : "bg-muted"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1">{steps[step - 1].title}</h3>
                  <p className="text-sm text-muted-foreground">{steps[step - 1].description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Step Content */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-[360px] mx-auto">
              <CardContent className="p-4">
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Select Bag Size</h3>
                    <div className="grid grid-cols-1 gap-2 max-w-lg mx-auto">
                      {bagSizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setConfig({...config, bagSize: size.id})}
                          className={`p-3 border-2 rounded-lg transition-all text-center w-full ${
                            config.bagSize === size.id
                              ? "border-primary bg-primary/10 shadow-glow"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="font-semibold text-lg">{size.name}</div>
                          <div className="text-sm text-muted-foreground">${size.basePrice}/bag</div>
                        </button>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Quantity: {config.quantity[0]} bags</h4>
                      <Slider
                        value={config.quantity}
                        onValueChange={(value) => setConfig({...config, quantity: value})}
                        min={25}
                        max={1000}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>25</span>
                        <span>500</span>
                        <span>1000+</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Print Coverage</h3>
                    <RadioGroup
                      value={config.printCoverage}
                      onValueChange={(value) => setConfig({...config, printCoverage: value})}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="front" id="front" />
                        <Label htmlFor="front" className="flex-1">
                          <div className="font-medium">Front Only</div>
                          <div className="text-sm text-muted-foreground">Standard single-side printing</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="flex-1">
                          <div className="font-medium">Both Sides (+$0.20/bag)</div>
                          <div className="text-sm text-muted-foreground">Double-sided printing</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-6">Bag Color</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => setConfig({...config, color: color.id})}
                            className={`p-3 border-2 rounded-lg transition-all ${
                              config.color === color.id
                                ? "border-primary shadow-glow"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div
                              className="w-full h-6 rounded mb-2"
                              style={{ backgroundColor: color.color }}
                            />
                            <div className="text-xs font-medium">{color.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Finish Type</h4>
                      <RadioGroup
                        value={config.finish}
                        onValueChange={(value) => setConfig({...config, finish: value})}
                      >
                        {finishes.map((finish) => (
                          <div key={finish.id} className="flex items-center space-x-2 p-4 border rounded-lg">
                            <RadioGroupItem value={finish.id} id={finish.id} />
                            <Label htmlFor={finish.id} className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{finish.name}</span>
                                {finish.price > 0 && (
                                  <span className="text-primary">+${finish.price}/bag</span>
                                )}
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Design Studio</h3>
                    <Tabs defaultValue="templates">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="templates">Template Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload Custom</TabsTrigger>
                      </TabsList>
                      <TabsContent value="templates" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((template) => (
                            <button
                              key={template}
                              className="aspect-square bg-muted/20 rounded-lg border-2 border-border hover:border-primary/50 transition-all p-4"
                            >
                              <div className="w-full h-full bg-gradient-primary/20 rounded flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-primary" />
                              </div>
                              <div className="text-sm mt-2">Template {template}</div>
                            </button>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="upload" className="mt-6">
                        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="text-lg font-semibold mb-2">Upload Your Design</h4>
                          <p className="text-muted-foreground mb-4">
                            Drag & drop your files or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supports PNG, PDF, AI files (300 DPI minimum)
                          </p>
                          <Button variant="outline" className="mt-4">
                            Choose Files
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border/20">
                  <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="premium"
                    onClick={() => setStep(Math.min(5, step + 1))}
                    disabled={step === 5}
                  >
                    {step === 5 ? "Complete" : "Next Step"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-24 max-w-[360px] mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bag Size:</span>
                    <span>{bagSizes.find(b => b.id === config.bagSize)?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quantity:</span>
                    <span>{config.quantity[0]} bags</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Print Coverage:</span>
                    <span className="capitalize">{config.printCoverage}</span>
                  </div>
                </div>

                <div className="border-t border-border/20 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Per Bag:</span>
                    <span className="text-primary">${price.perBag.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total:</span>
                    <span className="text-gradient-primary">${price.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => {
                    const selectedBag = bagSizes.find((b) => b.id === config.bagSize);
                    addItem({
                      id: [
                        "pod-config",
                        config.bagSize,
                        config.quantity[0],
                        config.color,
                        config.finish,
                        config.printCoverage,
                        config.spotUV ? "spot" : "no-spot",
                        config.uvGloss ? "uv" : "no-uv",
                        config.customLogo ? "logo" : "no-logo",
                      ].join("|"),
                      name: `${selectedBag?.name ?? "Custom"} POD Order`,
                      price: Number(price.total.toFixed(2)),
                      quantity: 1,
                      metadata: {
                        Quantity: config.quantity[0],
                        Color: config.color,
                        Finish: config.finish,
                        Coverage: config.printCoverage,
                        SpotUV: config.spotUV ? "Yes" : "No",
                        UVGloss: config.uvGloss ? "Yes" : "No",
                        "Custom Logo": config.customLogo ? "Yes" : "No",
                      },
                    });
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                <div className="text-center">
                  <Badge variant="secondary" className="bg-accent/20 text-accent">
                    <Zap className="w-3 h-3 mr-1" />
                    24-48hr Rush Available
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PODConfigurator;
