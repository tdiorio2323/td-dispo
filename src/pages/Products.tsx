import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: number;
  title: string;
  price: string;
  image1: string;
  image2: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: "$29.99",
    image1: "/quickprintz_assets/quickprintz-256.png",
    image2: "/quick-printz-storefront.jpg"
  },
  {
    id: 2,
    title: "Product 2",
    price: "$34.99",
    image1: "/quick-printz-storefront.jpg",
    image2: "/quickprintz_assets/quickprintz-256.png"
  },
  {
    id: 3,
    title: "Product 3",
    price: "$39.99",
    image1: "/quickprintz_assets/quickprintz-256.png",
    image2: "/quick-printz-storefront.jpg"
  },
  {
    id: 4,
    title: "Product 4",
    price: "$44.99",
    image1: "/quick-printz-storefront.jpg",
    image2: "/quickprintz_assets/quickprintz-256.png"
  },
  {
    id: 5,
    title: "Product 5",
    price: "$49.99",
    image1: "/quickprintz_assets/quickprintz-256.png",
    image2: "/quick-printz-storefront.jpg"
  },
  {
    id: 6,
    title: "Product 6",
    price: "$54.99",
    image1: "/quick-printz-storefront.jpg",
    image2: "/quickprintz_assets/quickprintz-256.png"
  },
  {
    id: 7,
    title: "Product 7",
    price: "$59.99",
    image1: "/quickprintz_assets/quickprintz-256.png",
    image2: "/quick-printz-storefront.jpg"
  },
  {
    id: 8,
    title: "Product 8",
    price: "$64.99",
    image1: "/quick-printz-storefront.jpg",
    image2: "/quickprintz_assets/quickprintz-256.png"
  }
];

const ProductCard = ({ product }: { product: Product }) => {
  const [currentImage, setCurrentImage] = useState(product.image1);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  // Mobile auto-transition effect
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentImage(prev =>
          prev === product.image1 ? product.image2 : product.image1
        );
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [product.image1, product.image2]);

  const priceValue = Number(product.price.replace(/[^0-9.]/g, "")) || 0;

  const handleAddToCart = () => {
    addItem({
      id: `catalog-${product.id}`,
      name: product.title,
      price: priceValue,
      image: product.image1,
    });
  };

  return (
    <Card
      className="group relative bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden hover:border-lightning-yellow/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--lightning-yellow)/0.2)]"
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsHovered(true);
          setCurrentImage(product.image2);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) {
          setIsHovered(false);
          setCurrentImage(product.image1);
        }
      }}
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-muted/20">
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-foreground group-hover:text-lightning-yellow transition-colors">
          {product.title}
        </h3>

        <p className="text-2xl font-bold text-lightning-yellow">
          {product.price}
        </p>

        <Button
          className="w-full bg-lightning-yellow text-black hover:bg-lightning-yellow/90 font-bold"
          size="lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="pt-64 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Our </span>
            <span className="text-lightning-yellow">Products</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our selection of premium printing products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
