import { Truck, Shield, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, text: "Free delivery on bulk orders" },
  { icon: Shield, text: "Food-safe certified products" },
  { icon: Sparkles, text: "Custom branding available" },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-900 text-cream-100 text-xs font-medium tracking-wide">
      <div className="container-site">
        <div className="flex items-center justify-center gap-8 py-2.5 overflow-hidden">
          {items.map((item, i) => (
            <div key={i} className="hidden sm:flex items-center gap-2 shrink-0">
              <item.icon size={13} className="text-brand-300" />
              <span>{item.text}</span>
              {i < items.length - 1 && (
                <span className="ml-6 text-brand-600">·</span>
              )}
            </div>
          ))}
          <div className="sm:hidden flex items-center gap-2">
            <Sparkles size={13} className="text-brand-300" />
            <span>Premium disposables — Bulk orders welcome</span>
          </div>
        </div>
      </div>
    </div>
  );
}
