import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed R.",
    role: "Restaurant Owner",
    text: "Lasani's disposable cups and plates have been our go-to for over 2 years. Quality is consistent and bulk pricing is unbeatable.",
    rating: 5,
  },
  {
    name: "Sara K.",
    role: "Event Planner",
    text: "They delivered 5,000 custom-branded cups for our corporate event on time. The printing quality was exceptional.",
    rating: 5,
  },
  {
    name: "Hassan M.",
    role: "Café Chain Manager",
    text: "Fast WhatsApp responses, reliable delivery, and products that our customers actually compliment. Highly recommended.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="section-padding bg-brand-900 relative overflow-hidden">
      <div className="container-site relative z-10">
        <div className="text-center mb-14">
          <p className="section-label justify-center mb-3 text-brand-300">Testimonials</p>
          <h2 className="heading-display text-4xl sm:text-5xl text-white">
            Loved by Businesses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Quote size={24} className="text-brand-400/50 mb-4" />
              <p className="text-white/80 leading-relaxed mb-6 text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-brand-400 fill-brand-400" />
                ))}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/50 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
