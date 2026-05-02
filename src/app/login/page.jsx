"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="container-x py-20 text-center text-sun-700">
          Loading...
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/my-profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: form.email,
        password: form.password,
        callbackURL: redirectTo,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to SunCart.");
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  return (
    <div className="container-x py-12">
      <div className="grid items-stretch gap-10 lg:grid-cols-2">
        <section className="hidden overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sun-300 via-sun-400 to-sun-600 p-10 text-white lg:flex">
          <div className="flex min-h-[460px] flex-col justify-between">
            <div>
              <span className="chip border border-white/30 bg-white/20 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Members get 10% off
              </span>

              <h2 className="mt-5 font-display text-5xl leading-tight">
                Welcome back to{" "}
                <span className="underline decoration-sun-200 decoration-4 underline-offset-4">
                  golden hour
                </span>
                .
              </h2>

              <p className="mt-3 max-w-md text-white/90">
                Pick up where you left off: saved carts, faster checkout, and
                early access to seasonal drops.
              </p>
            </div>
 
          </div>
        </section>

        <section className="card-sun p-8 sm:p-10">
          <h1 className="font-display text-4xl text-sun-900">Sign in</h1>

          <p className="mt-1 text-neutral/60">
            New here?{" "}
            <Link
              href="/register"
              className="font-semibold text-sun-700 hover:underline"
            >
              Create an account
            </Link>
            .
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <AuthField
              icon={Mail}
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="your email"
              autoComplete="email"
            />

            <label className="block">
              <span className="text-sm font-semibold text-sun-800">
                Password
              </span>

              <div className="mt-1 flex items-center gap-2 rounded-2xl border border-sun-100 bg-white px-3 py-2.5 transition focus-within:border-sun-400 focus-within:ring-4 focus-within:ring-sun-200/45">
                <Lock className="h-4 w-4 shrink-0 text-sun-500" />

                <input
                  type={show ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Password"
                  className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-neutral/45 focus:ring-0"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShow((value) => !value)}
                  className="text-sun-600 transition hover:text-sun-800"
                  aria-label="Toggle password visibility"
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-sun w-full justify-center disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-neutral/40">
            <div className="h-px flex-1 bg-sun-100" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-sun-100" />
          </div>

          <button
            type="button"
            onClick={onGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-sun-100 bg-white px-5 py-3 font-semibold transition hover:bg-sun-100/45"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </section>
      </div>
    </div>
  );
}

function AuthField({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-sun-800">{label}</span>

      <div className="mt-1 flex items-center gap-2 rounded-2xl border border-sun-100 bg-white px-3 py-2.5 transition focus-within:border-sun-400 focus-within:ring-4 focus-within:ring-sun-200/45">
        <Icon className="h-4 w-4 shrink-0 text-sun-500" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-neutral/45 focus:ring-0"
        />
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.6 6.5 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.6 6.5 29.1 4.5 24 4.5 16.3 4.5 9.6 8.8 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c5 0 9.5-1.9 12.9-5.1l-6-4.9C29.1 35 26.7 35.5 24 35.5c-5.3 0-9.7-2.6-11.3-7l-6.5 5C9.6 39.2 16.3 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4 5.4l6 4.9c-.4.4 6.7-4.9 6.7-14.3 0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
