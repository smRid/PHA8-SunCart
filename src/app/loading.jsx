import { Sun } from "lucide-react";

export default function HomeLoading() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Sun className="w-10 h-10 text-sun-500 animate-spin" />
        <p className="text-sm font-semibold text-sun-600">Loading…</p>
      </div>
    </div>
  );
}
