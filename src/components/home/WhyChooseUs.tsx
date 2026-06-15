import Image from "next/image";
import { ShieldCheck, Truck, Package, MessageCircle } from "lucide-react";
import { ABOUT_IMAGE } from "@/lib/images";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "Food-safe, durable materials that meet the highest standards.",
  },
  {
    icon: Package,
    title: "Extensive Range",
    description: "500+ products across cups, plates, glasses, and packaging.",
  },
  {
    icon: Truck,
    title: "Bulk Delivery",
    description: "Competitive rates and fast turnaround for large orders.",
  },
  {
    icon: MessageCircle,
    title: "Custom Orders",
    description: "Branded and bespoke products tailored to your brand.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-cream-100 relative overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-4xl overflow-hidden aspect-[4/5] shadow-soft-xl">
              <Image
                src={ABOUT_IMAGE}
                alt="Quality disposable products"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-8 bg-white rounded-3xl p-6 shadow-soft-lg border border-cream-200">
              <div className="font-display text-4xl font-bold text-brand-600">5+</div>
              <div className="text-ink-muted text-sm font-medium">Years of Excellence</div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-brand-200 pointer-events-none" />
          </div>

          {/* Content side */}
          <div>
            <p className="section-label mb-3">Why Lasani</p>
            <h2 className="heading-display text-4xl sm:text-5xl text-ink mb-5 leading-tight">
              Quality you can{" "}
              <span className="italic text-brand-600">trust</span>
            </h2>
            <p className="text-ink-muted leading-relaxed mb-10 text-lg">
              We supply businesses, event planners, and caterers with reliable
              disposable products at competitive prices — direct to you, no middlemen.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group p-5 rounded-2xl bg-white/60 hover:bg-white border border-transparent hover:border-cream-300 transition-all duration-300 hover:shadow-soft"
                >
                  <div className="w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                    <f.icon size={20} className="text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5">{f.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
