import { Flame, ShieldCheck, Sparkles, Truck, Waves } from "lucide-react";

const items = [
  { icon: Truck, label: "Free shipping over $40" },
  { icon: Waves, label: "New linen drop" },
  { icon: ShieldCheck, label: "Reef-safe SPF" },
  { icon: Sparkles, label: "Skincare bundles" },
  { icon: Flame, label: "Summer Sale 50% off" },
];

const MarqueeHero = () => {
  return (
    <div className="flex items-center gap-12 pr-12">
      {[...items, ...items].map(({ icon: Icon, label }, index) => (
        <div key={`${label}-${index}`} className="flex items-center gap-2">
          <Icon size={20} className="text-[#f9732a]" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default MarqueeHero;
