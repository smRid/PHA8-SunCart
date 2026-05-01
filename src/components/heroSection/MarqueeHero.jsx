import {
  Flame,
  ShieldCheck,
  Sparkles,
  Truck,
  WavesHorizontal,
} from "lucide-react";

const items = [
  { label: "☀ Summer Sale 50% off" },
  { label: "✦ Free shipping over $40" },
  { label: "🌊 New: Linen drop" },
  { label: "🏖 Reef-safe SPF" },
  { label: "🧴 Skincare bundles" },
  { label: "🕶 Polarized UV400" },
];

const MarqueeHero = () => {
  return (
    <div className="flex items-center gap-12 pr-12">
      {[...items, ...items].map(({ icon: Icon, label }, index) => (
        <div
          key={`${label}-${index}`}
          className="flex shrink-0 items-center gap-2"
        >
          
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default MarqueeHero;
