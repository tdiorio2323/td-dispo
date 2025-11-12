import { useState } from "react";
import { ShoppingCart, Minus, Plus, Trash2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

type CartSheetTriggerProps = {
  triggerVariant?: React.ComponentProps<typeof Button>["variant"];
  triggerSize?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  fullWidth?: boolean;
};

const CartSheetTrigger = ({
  triggerVariant = "outline",
  triggerSize = "sm",
  className,
  fullWidth,
}: CartSheetTriggerProps) => {
  const [open, setOpen] = useState(false);
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const hasItems = items.length > 0;
  const cashAppAmount = subtotal > 0 ? `?amount=${encodeURIComponent(subtotal.toFixed(2))}` : "";
  const cashAppLink = `https://cash.app/$tdiorio23${cashAppAmount}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={cn(fullWidth && "w-full", "font-semibold gap-2", className)}
        >
          <ShoppingCart className="w-4 h-4" />
          Cart ({totalItems})
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg bg-background/95 backdrop-blur">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingCart className="w-5 h-5 text-lightning-yellow" />
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-white/70">
            {hasItems
              ? "Review your selections and checkout when you’re ready."
              : "You haven’t added anything yet. Explore products to get started."}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
          {hasItems ? (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-4"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover border border-white/10"
                  />
                ) : null}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">{item.name}</p>
                      <p className="text-sm text-white/60">${item.price.toFixed(2)} each</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-white/50 hover:text-white transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.metadata ? (
                    <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/70">
                      {Object.entries(item.metadata).map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-2">
                          <span className="uppercase tracking-wide text-white/50">{label}</span>
                          <span className="font-medium text-white truncate">{value}</span>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center rounded-full border border-white/15">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-white/80 hover:text-white disabled:opacity-40"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-white/80 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xs text-white/60">Item Total</p>
                      <p className="text-lg font-semibold text-lightning-yellow">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/70">
              Cart items will appear here as you add products.
            </p>
          )}
        </div>

        <Separator className="my-5 bg-white/10" />

        <div className="space-y-4">
          <div className="flex items-center justify-between text-lg font-semibold text-white">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Button
            asChild
            disabled={!hasItems}
            className="w-full bg-lightning-yellow text-black hover:bg-lightning-yellow/90 font-bold"
          >
            <a href={cashAppLink} target="_blank" rel="noopener noreferrer">
              <Wallet className="w-4 h-4 mr-2" />
              Pay via Cash App
            </a>
          </Button>
          <Button
            variant="ghost"
            className="w-full text-white/70 hover:text-white"
            onClick={clearCart}
            disabled={!hasItems}
          >
            Clear Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheetTrigger;
