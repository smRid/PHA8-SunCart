import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  CalendarDays,
  Crown,
  Mail,
  MapPin,
  Pencil,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect(`/login?redirect=${encodeURIComponent("/")}`);
  }

  const u = session.user;
  const joined = u.createdAt ? new Date(u.createdAt) : null;

  return (
    <div className="container-x py-12">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sun-300 via-sun-400 to-sun-600 p-8 text-white sm:p-12">
        <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-80 w-80 rounded-full bg-ocean-300/30 blur-3xl" />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/40 blur-xl" />

            <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-white ring-4 ring-white/80">
              {u.image ? (
                <Image
                  src={u.image}
                  alt={u.name || "user"}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-display text-5xl text-sun-700">
                  {(u.name || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <span className="chip border border-white/30 bg-white/20 backdrop-blur">
              <Crown className="h-3.5 w-3.5" /> SunCart Member
            </span>

            <h1 className="mt-2 font-display text-4xl sm:text-5xl">
              {u.name || "Sun-lover"}
            </h1>

            <p className="mt-1 flex items-center gap-2 text-white/90">
              <Mail className="h-4 w-4" /> {u.email}
            </p>
          </div>

          <Link
            href="/my-profile/update"
            className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 font-bold text-sun-700 shadow transition hover:scale-[1.02] sm:self-auto"
          >
            <Pencil className="h-4 w-4" /> Update Information
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-sun p-6">
          <div className="flex items-center gap-2 text-sun-700">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-bold">Account</span>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Name" value={u.name || "-"} />
            <Row label="Email" value={u.email} />
            <Row
              label="Email verified"
              value={u.emailVerified ? "Verified" : "Not verified"}
            />
            <Row label="Member ID" value={String(u.id).slice(0, 12) + "..."} />
          </dl>
        </div>

        <div className="card-sun p-6">
          <div className="flex items-center gap-2 text-sun-700">
            <CalendarDays className="h-5 w-5" />
            <span className="font-bold">Activity</span>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            <Row
              label="Joined"
              value={joined ? joined.toLocaleDateString() : "-"}
            />
            <Row label="Orders placed" value="0" />
            <Row label="Wishlist items" value="0" />
            <Row label="Loyalty tier" value="Sunshine" />
          </dl>
        </div>

        <div className="card-sun p-6">
          <div className="flex items-center gap-2 text-sun-700">
            <MapPin className="h-5 w-5" />
            <span className="font-bold">Default address</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral/70">
            You haven&apos;t added a shipping address yet. Add one to enable
            one-click checkout for next summer&apos;s drops.
          </p>

          <button
            type="button"
            className="btn-ghost-sun mt-4 !px-4 !py-2 !text-sm"
          >
            Add address
          </button>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-4 rounded-3xl border border-sun-100 bg-white/70 p-6">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sun-100">
          <Crown className="h-6 w-6 text-sun-600" />
        </div>

        <div>
          <div className="font-display text-xl text-sun-900">
            Keep glowing, {u.name?.split(" ")[0] || "friend"}!
          </div>

          <p className="mt-1 text-sm text-neutral/70">
            Your profile is your sunshine passport. Update your photo and name
            anytime - your bundles, history and rewards travel with you.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-neutral/60">{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-semibold text-sun-800">
        {value}
      </dd>
    </div>
  );
}
