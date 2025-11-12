import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, Package, Send } from "lucide-react";

const interestOptions = [
  "Mylar Bags",
  "Soda Cans",
  "Custom Boxes",
  "Stickers",
  "Graphic Designs",
  "Websites",
  "Other",
];

const ContactPage = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/movkvrpz", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-64 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lightning-yellow font-semibold uppercase tracking-[0.3em] text-sm mb-3">
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Let&apos;s Bring Your </span>
              <span className="text-lightning-yellow">Project To Life</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Drop your details below and tell us what you need—design, print, or a full custom build.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Card className="p-6 bg-black/40 border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lightning-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Instagram</h3>
                    <p className="text-sm text-white/70">@quickprintz401</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-black/40 border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lightning-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-sm text-white/70">derekcasiano16@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-black/40 border border-white/10 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-lightning-yellow/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-lightning-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Fulfillment</h3>
                    <p className="text-sm text-white/70">We ship everywhere, every day.</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="lg:col-span-2 p-8 bg-black/40 border border-white/10 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-background/50 border-white/20 focus:border-lightning-yellow"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-background/50 border-white/20 focus:border-lightning-yellow"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      className="bg-background/50 border-white/20 focus:border-lightning-yellow"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      className="bg-background/50 border-white/20 focus:border-lightning-yellow"
                      placeholder="Brand or company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">What are you looking for? *</Label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    className="w-full rounded-lg bg-background/50 border border-white/20 px-3 py-2 text-sm focus:border-lightning-yellow focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {interestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="bg-background/50 border-white/20 focus:border-lightning-yellow resize-none"
                    placeholder="Tell us about your print or design needs..."
                  />
                </div>

                {status === "success" ? (
                  <p className="text-sm text-green-300">
                    Thanks for the message! We&apos;ll reply shortly.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="text-sm text-red-300">
                    Something went wrong. Please email derekcasiano16@gmail.com directly.
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-lightning-yellow text-black hover:bg-lightning-yellow/90 font-bold"
                  disabled={status === "submitting"}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
