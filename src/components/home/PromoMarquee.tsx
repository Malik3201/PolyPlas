const brands = [
  "Restaurants",
  "Caterers",
  "Event Planners",
  "Cafés",
  "Hotels",
  "Retail Stores",
  "Food Trucks",
  "Bakeries",
];

export default function PromoMarquee() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-5 bg-brand-700 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((brand, i) => (
          <div key={i} className="flex items-center mx-8">
            <span className="text-cream-200/60 text-sm font-semibold tracking-widest uppercase">
              {brand}
            </span>
            <span className="ml-8 w-1.5 h-1.5 rounded-full bg-brand-400/60" />
          </div>
        ))}
      </div>
    </section>
  );
}
