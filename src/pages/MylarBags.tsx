import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/hooks/useCart";

type Options = {
  productName: string;
  sizes: { id: string; label: string }[];
  colors: string[];
  finishes: string[];
  printStyles: string[];
  quantities: number[];
  addons: string[];
};

type State = {
  size: string;
  color: string;
  finish: string;
  printStyle: string;
  quantity: number | "";
  addons: string[];
};

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {"★★★★★".split("").map((s, i) => (
        <span key={i} aria-hidden>{s}</span>
      ))}
      <span className="ml-2 text-xs text-white/70">(212 reviews)</span>
    </div>
  );
}

export default function MylarBags() {
  const [opts, setOpts] = useState<Options | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [s, setS] = useState<State>({
    size: "",
    color: "",
    finish: "",
    printStyle: "",
    quantity: "",
    addons: [],
  });
  const { addItem } = useCart();

  // simple gallery state
  const images = [
    "/quickprintz_assets/storefront-interior.jpg", // fallback
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/quick-printz-options.json", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load options");
        const data: Options = await res.json();
        setOpts(data);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Error";
        setErr(message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (opts) document.title = `${opts.productName} • Quick Printz`;
  }, [opts]);

  const price = useMemo(() => {
    // Placeholder pricing: quantity tier stub
    const q = Number(s.quantity || 0);
    if (!q) return 0;
    const unit = q >= 5000 ? 0.18 : q >= 2500 ? 0.22 : q >= 1000 ? 0.28 : q >= 500 ? 0.35 : q >= 250 ? 0.42 : 0.49;
    return unit * q;
  }, [s.quantity]);

  function toggleAddon(val: string) {
    setS(prev => ({
      ...prev,
      addons: prev.addons.includes(val) ? prev.addons.filter(a => a !== val) : [...prev.addons, val],
    }));
  }

  const selectionComplete = Boolean(s.size && s.color && s.finish && s.printStyle && s.quantity);

  const handleAddToCart = () => {
    if (!selectionComplete || !opts) return;
    const qty = Number(s.quantity);
    const addonsKey = s.addons.length ? s.addons.sort().join("-") : "no-addons";
    const idParts = [opts.productName, s.size, s.color, s.finish, s.printStyle, qty, addonsKey];

    addItem({
      id: idParts.join("|"),
      name: `${opts.productName} (${s.size})`,
      price: Number(price.toFixed(2)),
      quantity: 1,
      metadata: {
        Color: s.color,
        Finish: s.finish,
        Print: s.printStyle,
        Quantity: qty,
        Addons: s.addons.length ? s.addons.join(", ") : "None",
      },
    });
  };

  if (loading) return <main className="container px-6 py-12 text-white/80">Loading…</main>;
  if (err || !opts) return <main className="container px-6 py-12 text-red-400">Error: {err}</main>;

  return (
    <main className="px-6 py-6 md:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/60 mb-4">
          <a className="hover:text-white" href="/">Home</a>
          <span className="mx-2">/</span>
          <a className="hover:text-white" href="/mylar-bags">Products</a>
          <span className="mx-2">/</span>
          <span className="text-white/80">{opts.productName}</span>
        </nav>

        {/* Header row */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">{opts.productName}</h1>
          <span className="hidden md:inline-block text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
            Child-Resistant Options • Retail Ready
          </span>
        </div>
        <StarRow />

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Gallery */}
          <section className="lg:col-span-3">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                <img
                  src={images[activeIdx]}
                  alt="Mylar bags"
                  className="w-full h-full object-cover"
                  onError={() => setActiveIdx(images.length - 1)}
                />
              </div>
            </div>

            {/* Details accordion */}
            <div className="mt-6 space-y-3">
              <details className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4" open>
                <summary className="cursor-pointer font-semibold text-white">Description</summary>
                <p className="mt-2 text-sm text-white/80">
                  Premium odor-resistant Mylar bags with printed labels applied by Quick Printz.
                  Choose matte, gloss, or holographic finishes. Designed for cannabis compliance layouts.
                </p>
              </details>
              <details className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <summary className="cursor-pointer font-semibold text-white">Specs</summary>
                <ul className="mt-2 text-sm text-white/80 space-y-1">
                  <li>Sizes: 3.5g (4×5), 7g (5×7), 14g (6×9), 1oz (7×10), 1lb (12×16)</li>
                  <li>Materials: Food-safe PET/PE, high barrier</li>
                  <li>Options: Zipper, hang hole, window cut, child-resistant seal</li>
                </ul>
              </details>
              <details className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <summary className="cursor-pointer font-semibold text-white">FAQ</summary>
                <ul className="mt-2 text-sm text-white/80 space-y-2 list-disc pl-5">
                  <li>Art: CMYK, 300 DPI, include 0.125" bleed.</li>
                  <li>Turnaround: 3–7 business days after proof approval.</li>
                  <li>Compliance varies by state. This is not legal advice.</li>
                </ul>
              </details>
            </div>
          </section>

          {/* Buy box */}
          <aside className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 inline-block">
                    Mylar Bags • Labels Applied
                  </div>
                  <StarRow />
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60">From</div>
                  <div className="text-3xl font-extrabold text-[hsl(60,100%,50%)]">${price.toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">Bag Size</label>
                  <select
                    className="w-full rounded-lg bg-black/60 border border-white/10 px-3 py-2"
                    value={s.size}
                    onChange={(e) => setS({ ...s, size: e.target.value })}
                  >
                    <option value="">Select size</option>
                    {opts.sizes.map(o => <option key={o.id} value={o.label}>{o.label}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Color</label>
                    <select
                      className="w-full rounded-lg bg-black/60 border border-white/10 px-3 py-2"
                      value={s.color}
                      onChange={(e) => setS({ ...s, color: e.target.value })}
                    >
                      <option value="">Select color</option>
                      {opts.colors.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Finish</label>
                    <select
                      className="w-full rounded-lg bg-black/60 border border-white/10 px-3 py-2"
                      value={s.finish}
                      onChange={(e) => setS({ ...s, finish: e.target.value })}
                    >
                      <option value="">Select finish</option>
                      {opts.finishes.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Print Style</label>
                    <select
                      className="w-full rounded-lg bg-black/60 border border-white/10 px-3 py-2"
                      value={s.printStyle}
                      onChange={(e) => setS({ ...s, printStyle: e.target.value })}
                    >
                      <option value="">Select style</option>
                      {opts.printStyles.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Quantity</label>
                    <select
                      className="w-full rounded-lg bg-black/60 border border-white/10 px-3 py-2"
                      value={s.quantity}
                      onChange={(e) => setS({ ...s, quantity: Number(e.target.value) })}
                    >
                      <option value="">Select quantity</option>
                      {opts.quantities.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Add-ons</label>
                  <div className="grid grid-cols-1 gap-2">
                    {opts.addons.map(v => (
                      <label key={v} className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="scale-110 accent-yellow-400"
                          checked={s.addons.includes(v)}
                          onChange={() => toggleAddon(v)}
                        />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-3 flex-wrap">
                <button
                  className="rounded-xl px-5 py-3 font-bold !bg-[hsl(60,100%,50%)] text-black hover:!bg-[hsl(60,100%,45%)] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddToCart}
                  disabled={!selectionComplete}
                >
                  Add to Cart
                </button>
                <a
                  href="/contact"
                  className="rounded-xl px-5 py-3 font-bold bg-white/10 border border-white/15 hover:bg-white/15"
                >
                  Get Custom Quote
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] text-white/70">
                <div className="rounded-lg border border-white/10 py-2">Satisfaction Guaranteed</div>
                <div className="rounded-lg border border-white/10 py-2">Retail Ready</div>
                <div className="rounded-lg border border-white/10 py-2">Child-Resistant</div>
              </div>

              {/* Mini summary */}
              <div className="mt-4 rounded-xl border border-white/10 p-4 text-sm text-white/80">
                <div>Size: <span className="text-white/90">{s.size || "-"}</span></div>
                <div>Color: <span className="text-white/90">{s.color || "-"}</span></div>
                <div>Finish: <span className="text-white/90">{s.finish || "-"}</span></div>
                <div>Style: <span className="text-white/90">{s.printStyle || "-"}</span></div>
                <div>Qty: <span className="text-white/90">{s.quantity || 0}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
