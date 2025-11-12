import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, Package, Shield, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface PricingTier {
  quantity: string;
  price: number;
}

const pricingTiers: PricingTier[] = [
  { quantity: "100", price: 2.99 },
  { quantity: "250", price: 2.49 },
  { quantity: "500", price: 1.99 },
  { quantity: "1,000", price: 1.49 },
  { quantity: "2,500", price: 1.19 },
  { quantity: "5,000+", price: 0.99 },
];

const ProductDetail = () => {
  const [bagSize, setBagSize] = useState("");
  const [bagColor, setBagColor] = useState("");
  const [bagFinish, setBagFinish] = useState("");
  const [printStyle, setPrintStyle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [hasZipper, setHasZipper] = useState(false);
  const [isChildResistant, setIsChildResistant] = useState(false);
  const [hasHangHole, setHasHangHole] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  const [currentPrice, setCurrentPrice] = useState(2.99);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate price based on quantity
  useEffect(() => {
    if (quantity) {
      const tier = pricingTiers.find(t => t.quantity === quantity);
      if (tier) {
        setCurrentPrice(tier.price);
        const qty = parseInt(quantity.replace(/[^0-9]/g, '')) || 100;
        let total = tier.price * qty;

        // Add-on pricing
        if (hasZipper) total += qty * 0.15;
        if (isChildResistant) total += qty * 0.25;
        if (hasHangHole) total += qty * 0.05;
        if (hasWindow) total += qty * 0.20;

        setTotalPrice(total);
      }
    }
  }, [quantity, hasZipper, isChildResistant, hasHangHole, hasWindow]);

  const isFormComplete = bagSize && bagColor && bagFinish && printStyle && quantity;
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!isFormComplete) return;
    const qty = parseInt(quantity.replace(/[^0-9]/g, "")) || 0;
    const itemId = [
      "custom-mylar",
      bagSize,
      bagColor,
      bagFinish,
      printStyle,
      quantity,
      hasZipper ? "zipper" : "no-zipper",
      isChildResistant ? "child" : "standard",
      hasHangHole ? "hang" : "no-hang",
      hasWindow ? "window" : "no-window",
    ].join("|");

    addItem({
      id: itemId,
      name: `${bagSize} Custom Mylar Bags`,
      price: Number(totalPrice.toFixed(2)),
      quantity: 1,
      image: "/quickprintz_assets/quickprintz-256.png",
      metadata: {
        Color: bagColor,
        Finish: bagFinish,
        "Print Style": printStyle,
        Quantity: qty,
        Addons: [
          hasZipper ? "Zipper" : null,
          isChildResistant ? "Child Resistant" : null,
          hasHangHole ? "Hang Hole" : null,
          hasWindow ? "Window" : null,
        ]
          .filter(Boolean)
          .join(", ") || "None",
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-64 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Section */}
            <div className="space-y-6">
              <Card className="relative aspect-square bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <img
                    src="/quickprintz_assets/quickprintz-256.png"
                    alt="Custom Cannabis Mylar Bags"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Feature badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-lightning-yellow text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Custom Print
                  </div>
                  <div className="bg-card/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-xs font-semibold border border-border/50">
                    Fast Turnaround
                  </div>
                </div>
              </Card>

              {/* Product Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                  <Package className="w-5 h-5 text-lightning-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Food-Grade Material</h4>
                    <p className="text-sm text-muted-foreground">
                      All bags are FDA-approved, food-safe, and compliant with cannabis packaging regulations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                  <Shield className="w-5 h-5 text-lightning-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Smell-Proof Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Multi-layer barrier technology keeps products fresh and odor-contained.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {[
                    {
                      title: "Compliance Ready",
                      metric: "50+",
                      description: "State-specific warning layouts preapproved for retail.",
                    },
                    {
                      title: "Finish Upgrades",
                      metric: "8",
                      description: "Foils, spot UV, emboss, holo, and tactile laminations.",
                    },
                    {
                      title: "Audit Trail",
                      metric: "24hr",
                      description: "Proofing, photo confirmation, and archive for every run.",
                    },
                  ].map((tile) => (
                    <div
                      key={tile.title}
                      className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center shadow-glow"
                    >
                      <p className="text-lightning-yellow text-3xl font-bold">{tile.metric}</p>
                      <p className="text-white font-semibold mt-1">{tile.title}</p>
                      <p className="text-sm text-white/70 mt-2">{tile.description}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 mt-6">
                  <h4 className="text-sm uppercase tracking-[0.3em] text-lightning-yellow mb-3">
                    Print Specs
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Materials",
                        details: [
                          "4mil food-safe PET/PE",
                          "Child-resistant zipper option",
                          "Heat-sealable tops",
                        ],
                      },
                      {
                        title: "Color",
                        details: [
                          "CMYK + Pantone spot matches",
                          "ΔE < 2 run-to-run accuracy",
                          "White flood for metallic films",
                        ],
                      },
                      {
                        title: "Finishing",
                        details: [
                          "Matte, gloss, soft-touch films",
                          "Spot gloss, foil, emboss, deboss",
                          "Hang hole, window die-cuts",
                        ],
                      },
                    ].map((spec) => (
                      <details
                        key={spec.title}
                        className="bg-black/40 border border-white/5 rounded-xl p-3"
                        open
                      >
                        <summary className="cursor-pointer font-semibold text-white mb-2">
                          {spec.title}
                        </summary>
                        <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                          {spec.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Configuration Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="text-foreground">Custom Cannabis </span>
                  <span className="text-lightning-yellow">Mylar Bags</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Printed & Applied Labels
                </p>
              </div>

              {/* Price Display */}
              <Card className="p-6 bg-lightning-yellow/10 border-lightning-yellow/30">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-lightning-yellow">
                    ${currentPrice.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">per unit</span>
                </div>
                {totalPrice > 0 && (
                  <div className="mt-2 pt-2 border-t border-lightning-yellow/20">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <span className="text-2xl font-bold text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              {/* Configuration Form */}
              <div className="space-y-6">
                {/* Bag Size */}
                <div className="space-y-2">
                  <Label htmlFor="bag-size" className="text-base font-semibold">
                    Bag Size <span className="text-lightning-yellow">*</span>
                  </Label>
                  <Select value={bagSize} onValueChange={setBagSize}>
                    <SelectTrigger id="bag-size" className="bg-card/50 border-border/50 focus:border-lightning-yellow">
                      <SelectValue placeholder="Select bag size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3.5g">3.5g (4x5)</SelectItem>
                      <SelectItem value="7g">7g (5x7)</SelectItem>
                      <SelectItem value="14g">14g (6x9)</SelectItem>
                      <SelectItem value="1oz">1oz (7x10)</SelectItem>
                      <SelectItem value="1lb">1lb (12x16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bag Color */}
                <div className="space-y-2">
                  <Label htmlFor="bag-color" className="text-base font-semibold">
                    Bag Color <span className="text-lightning-yellow">*</span>
                  </Label>
                  <Select value={bagColor} onValueChange={setBagColor}>
                    <SelectTrigger id="bag-color" className="bg-card/50 border-border/50 focus:border-lightning-yellow">
                      <SelectValue placeholder="Select bag color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="clear-front">Clear (Front)</SelectItem>
                      <SelectItem value="clear-back">Clear (Back)</SelectItem>
                      <SelectItem value="silver">Silver Foil</SelectItem>
                      <SelectItem value="kraft">Kraft Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bag Finish */}
                <div className="space-y-2">
                  <Label htmlFor="bag-finish" className="text-base font-semibold">
                    Bag Finish / Material <span className="text-lightning-yellow">*</span>
                  </Label>
                  <Select value={bagFinish} onValueChange={setBagFinish}>
                    <SelectTrigger id="bag-finish" className="bg-card/50 border-border/50 focus:border-lightning-yellow">
                      <SelectValue placeholder="Select finish" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="matte">Matte</SelectItem>
                      <SelectItem value="gloss">Gloss</SelectItem>
                      <SelectItem value="holographic">Holographic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Print Style */}
                <div className="space-y-2">
                  <Label htmlFor="print-style" className="text-base font-semibold">
                    Print Style <span className="text-lightning-yellow">*</span>
                  </Label>
                  <Select value={printStyle} onValueChange={setPrintStyle}>
                    <SelectTrigger id="print-style" className="bg-card/50 border-border/50 focus:border-lightning-yellow">
                      <SelectValue placeholder="Select print style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-color">Full Color Print</SelectItem>
                      <SelectItem value="matte-lam">Matte Lamination</SelectItem>
                      <SelectItem value="gloss-lam">Gloss Lamination</SelectItem>
                      <SelectItem value="spot-gloss">Spot Gloss</SelectItem>
                      <SelectItem value="uv-spot">UV Spot Gloss</SelectItem>
                      <SelectItem value="holo-overlay">Holographic Overlay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base font-semibold">
                    Quantity <span className="text-lightning-yellow">*</span>
                  </Label>
                  <Select value={quantity} onValueChange={setQuantity}>
                    <SelectTrigger id="quantity" className="bg-card/50 border-border/50 focus:border-lightning-yellow">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingTiers.map((tier) => (
                        <SelectItem key={tier.quantity} value={tier.quantity}>
                          {tier.quantity} units - ${tier.price.toFixed(2)} each
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Add-ons */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Add-ons</Label>
                  <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border/50">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="zipper"
                        checked={hasZipper}
                        onCheckedChange={(checked) => setHasZipper(checked as boolean)}
                      />
                      <label
                        htmlFor="zipper"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Zipper (+$0.15 per unit)
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="child-resistant"
                        checked={isChildResistant}
                        onCheckedChange={(checked) => setIsChildResistant(checked as boolean)}
                      />
                      <label
                        htmlFor="child-resistant"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Child Resistant Seal (+$0.25 per unit)
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="hang-hole"
                        checked={hasHangHole}
                        onCheckedChange={(checked) => setHasHangHole(checked as boolean)}
                      />
                      <label
                        htmlFor="hang-hole"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Hang Hole Punch (+$0.05 per unit)
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="window"
                        checked={hasWindow}
                        onCheckedChange={(checked) => setHasWindow(checked as boolean)}
                      />
                      <label
                        htmlFor="window"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Window Cut-Out (+$0.20 per unit)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full bg-lightning-yellow text-black hover:bg-lightning-yellow/90 font-bold"
                  size="lg"
                  disabled={!isFormComplete}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isFormComplete ? `Add to Cart - $${totalPrice.toFixed(2)}` : "Select All Options"}
                </Button>

                {!isFormComplete && (
                  <p className="text-sm text-muted-foreground text-center">
                    Please select all required options (marked with *)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
