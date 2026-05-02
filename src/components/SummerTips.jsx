import { Droplets, Salad, Shield, Sun } from "lucide-react";

const TIPS = [
  {
    icon: Shield,
    title: "Layer your SPF",
    body: "Apply SPF50 mineral sunscreen 20 mins before sun. Re-apply every 2 hours — yes, even on cloudy days.",
    tone: "from-sun-200 to-sun-300",
  },
  {
    icon: Droplets,
    title: "Hydrate inside-out",
    body: "Aim for 2.5L of water daily. Add a pinch of sea salt and citrus for natural electrolytes.",
    tone: "from-ocean-100 to-ocean-300",
  },
  {
    icon: Salad,
    title: "Eat the rainbow",
    body: "Watermelon, cucumber and leafy greens are 90%+ water — nature's built-in sunscreen and skin food.",
    tone: "from-sun-100 to-sun-200",
  },
  {
    icon: Sun,
    title: "Mind golden hour",
    body: "Avoid direct sun 11am–3pm. Seek shade, wear UPF fabrics and a wide-brim hat for safer rays.",
    tone: "from-sand-100 to-sun-200",
  },
];

export default function SummerTips() {
  return (
    <section className="container-x py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <span className="eyebrow">Summer Care 101</span>

          <h2 className="section-title mt-2">
            Stay sun-smart, glow soft
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TIPS.map(({ icon: Icon, title, body, tone }, i) => (
          <article
            key={title}
            className="relative card-sun p-6 overflow-hidden"
          >
            <div
              className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${tone} opacity-70 blur-2xl`}
            />

            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white border border-sun-100 grid place-items-center shadow-sm">
                <Icon className="w-6 h-6 text-sun-600" />
              </div>

              <div className="mt-5 text-sm font-bold text-sun-600">
                Tip {String(i + 1).padStart(2, "0")}
              </div>

              <h3 className="font-display text-2xl mt-1 text-sun-900">
                {title}
              </h3>

              <p className="mt-2 text-sm text-neutral/70">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
