import { useMemo, useState } from "react";
import { Loader2, RefreshCcw, Search, Filter, X, Tag, Palette, Package } from "lucide-react";

import { isImageAsset } from "@/lib/designs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useDesignAssets } from "@/hooks/useDesignAssets";

// Mock categories and tags for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "cannabis", label: "Cannabis" },
  { value: "food", label: "Food & Beverage" },
  { value: "retail", label: "Retail" },
  { value: "wellness", label: "Health & Wellness" },
  { value: "abstract", label: "Abstract" }
];

const styles = [
  { value: "all", label: "All Styles" },
  { value: "bold", label: "Bold & Vibrant" },
  { value: "minimal", label: "Minimal" },
  { value: "vintage", label: "Vintage" },
  { value: "modern", label: "Modern" },
  { value: "grunge", label: "Grunge" }
];

const colors = [
  { value: "all", label: "All Colors" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "gold", label: "Gold" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "rainbow", label: "Multicolor" }
];

// Function to simulate design metadata (in real app, this would come from API)
const getDesignMetadata = (fileName: string) => {
  const name = fileName.toLowerCase();
  const metadata = {
    category: name.includes('cannabis') || name.includes('weed') || name.includes('leaf') ? 'cannabis' :
             name.includes('food') || name.includes('snack') ? 'food' :
             name.includes('abstract') ? 'abstract' : 'retail',
    style: name.includes('vintage') ? 'vintage' :
           name.includes('minimal') ? 'minimal' :
           name.includes('grunge') ? 'grunge' : 'modern',
    colors: name.includes('green') ? ['green'] :
           name.includes('purple') ? ['purple'] :
           name.includes('gold') ? ['gold'] :
           name.includes('black') ? ['black'] : ['rainbow'],
    tags: name.includes('premium') ? ['premium'] :
          name.includes('organic') ? ['organic'] :
          name.includes('luxury') ? ['luxury'] : ['standard']
  };
  return metadata;
};

const PremadeDesigns = () => {
  const { data, isPending, isError, error, refetch, isRefetching } = useDesignAssets();
  const { addItem } = useCart();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const assets = useMemo(() => data ?? [], [data]);

  // Filter and search logic
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const metadata = getDesignMetadata(asset.name || asset.path);
      
      // Search filter
      const matchesSearch = !searchTerm || 
        asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
      // Category filter
      const matchesCategory = selectedCategory === "all" || metadata.category === selectedCategory;
      
      // Style filter
      const matchesStyle = selectedStyle === "all" || metadata.style === selectedStyle;
      
      // Color filter
      const matchesColor = selectedColor === "all" || metadata.colors.includes(selectedColor);
      
      return matchesSearch && matchesCategory && matchesStyle && matchesColor;
    });
  }, [assets, searchTerm, selectedCategory, selectedStyle, selectedColor]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStyle("all");
    setSelectedColor("all");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedStyle !== "all" || selectedColor !== "all";

  const assetCountLabel = useMemo(() => {
    if (isPending) {
      return "Loading designs…";
    }

    if (!filteredAssets.length && hasActiveFilters) {
      return "No designs match your filters";
    }

    if (!filteredAssets.length) {
      return "No designs found";
    }

    return `${filteredAssets.length} design${filteredAssets.length === 1 ? "" : "s"} ${hasActiveFilters ? "found" : "available"}`;
  }, [filteredAssets.length, isPending, hasActiveFilters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-6 pt-64 pb-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Premade Designs</h1>
                <p className="text-lg text-white/70">
                  Browse our collection of professional 4x5 cannabis label designs
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/60">{assetCountLabel}</span>

                <Button
                  size="sm"
                  onClick={() => void refetch()}
                  disabled={isPending || isRefetching}
                  className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                >
                  {isPending || isRefetching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Refreshing
                    </>
                  ) : (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Refresh
                    </>
                  )}
                </Button>
              </div>
            </div>
          </header>

          {/* Search and Filter Section */}
          <Card className="mb-8 p-6 bg-card/50 border-border/50">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search designs by name or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>

              {/* Filter Toggle and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <Button
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters {hasActiveFilters && `(${[searchTerm && 'search', selectedCategory !== 'all' && 'category', selectedStyle !== 'all' && 'style', selectedColor !== 'all' && 'color'].filter(Boolean).length})`}
                </Button>

                <div className={`flex flex-col lg:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <Tag className="w-3 h-3" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map(style => (
                        <SelectItem key={style.value} value={style.value}>
                          <div className="flex items-center gap-2">
                            <Palette className="w-3 h-3" />
                            {style.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map(color => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${color.value === 'all' ? 'bg-muted' : `bg-${color.value}-500`}`} />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button
                      size="sm"
                      onClick={clearFilters}
                      className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filter Tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-lightning-yellow/20 text-lightning-yellow">
                      Search: "{searchTerm}"
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
                    </Badge>
                  )}
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="bg-lightning-yellow/20 text-lightning-yellow">
                      {categories.find(c => c.value === selectedCategory)?.label}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                    </Badge>
                  )}
                  {selectedStyle !== "all" && (
                    <Badge variant="secondary" className="bg-lightning-yellow/20 text-lightning-yellow">
                      {styles.find(s => s.value === selectedStyle)?.label}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedStyle("all")} />
                    </Badge>
                  )}
                  {selectedColor !== "all" && (
                    <Badge variant="secondary" className="bg-lightning-yellow/20 text-lightning-yellow">
                      {colors.find(c => c.value === selectedColor)?.label}
                      <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setSelectedColor("all")} />
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </Card>

          {isError ? (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>Unable to load designs</AlertTitle>
              <AlertDescription>
                {(error instanceof Error ? error.message : error) ??
                  "Unable to load designs. Double-check your Supabase credentials and bucket permissions."}
              </AlertDescription>
            </Alert>
          ) : null}

          {filteredAssets.length === 0 && !isPending ? (
            <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-6 py-12 text-center text-white/70">
              {hasActiveFilters ? (
                <div className="space-y-4">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No designs match your filters</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={clearFilters}
                    className="!bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                "No designs available yet. Upload assets to the Supabase bucket to populate this view."
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAssets.map((asset) => {
                const isImage = isImageAsset(asset);

                const handleAddDesignToCart = () => {
                  addItem({
                    id: `premade-${asset.path}`,
                    name: asset.name,
                    price: 20,
                    quantity: 1,
                    image: asset.publicUrl ?? undefined,
                    metadata: {
                      Type: "Premade Design",
                    },
                  });
                };
                return (
                  <article
                    key={asset.path}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-glow transition-all duration-300 hover:border-white/20 hover:shadow-premium"
                  >
                    <div className="relative bg-white/5">
                      {isImage && asset.publicUrl ? (
                        <div className="relative aspect-[4/5]">
                          <img
                            src={asset.publicUrl}
                            alt={asset.name}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          <div className="watermark-overlay" aria-hidden="true" />
                          <img
                            src="/quickprintz_assets/quickprintz-512.png"
                            alt="Quick Printz Watermark"
                            className="logo-watermark"
                            aria-hidden="true"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                        </div>
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center text-sm text-white/50">
                          Preview unavailable
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-3 border-t border-white/10 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base font-semibold text-white leading-tight truncate">
                            {asset.name}
                          </h2>
                        </div>

                        {/* Preview lock - no external expansion */}
                      </div>

                      <Button
                        className="w-full !bg-[hsl(60,100%,50%)] !text-black hover:!bg-[hsl(60,100%,45%)] font-bold"
                        onClick={handleAddDesignToCart}
                      >
                        Add to Cart - $20
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {isPending ? (
            <div className="mt-12 flex items-center justify-center gap-3 text-white/60">
              <Loader2 className="h-5 w-5 animate-spin" />
              Fetching latest designs…
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PremadeDesigns;
