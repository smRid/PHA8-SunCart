"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Check,
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setFormError("");
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      const message = "Name, email and password are required.";
      setFormError(message);
      toast.error(message);
      return;
    }

    if (form.password.length < 8) {
      const message = "Password must be at least 8 characters.";
      setFormError(message);
      toast.error(message);
      return;
    }

    setFormError("");
    setLoading(true);

    try {
      const { error } = await signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image || undefined,
      });

      if (error) {
        const message = error.message || "Registration failed.";
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (error) {
      const message = error.message || "Something went wrong.";
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      const origin = window.location.origin;

      await signIn.social({
        provider: "google",
        callbackURL: `${origin}/my-profile`,
        errorCallbackURL: `${origin}/login`,
        newUserCallbackURL: `${origin}/my-profile`,
        requestSignUp: true,
      });
    } catch (error) {
      const message = error.message || "Google sign-in failed.";
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="container-x py-12">
      <div className="grid items-stretch gap-10 lg:grid-cols-2">
        <section className="card-sun order-2 p-8 sm:p-10 lg:order-1">
          <h1 className="font-display text-4xl text-sun-900">
            Create account
          </h1>

          <p className="mt-1 text-neutral/60">
            Already a member?{" "}
            <Link
              href="/login"
              className="font-semibold text-sun-700 hover:underline"
            >
              Sign in
            </Link>
            .
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <Field
              icon={User}
              label="Name"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
            />

            <Field
              icon={Mail}
              label="Email"
              name="email"
              type="email"
              placeholder="your email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
            />

            <Field
              icon={ImageIcon}
              label="Photo URL"
              name="image"
              placeholder="https://example.com/avatar.jpg"
              value={form.image}
              onChange={onChange}
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
                  placeholder="Min. 8 characters"
                  className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none placeholder:text-neutral/45 focus:ring-0"
                  autoComplete="new-password"
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

            {formError ? (
              <p
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {formError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="btn-sun w-full justify-center disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-neutral/40">
            <div className="h-px flex-1 bg-sun-100" />
            <span>or sign up with</span>
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

        <section className="order-1 hidden overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ocean-300 via-ocean-400 to-ocean-600 p-10 text-white lg:order-2 lg:flex lg:items-center">
          <div className="flex min-h-[540px] w-full flex-col justify-center">
            <div>
              <span className="chip border border-white/30 bg-white/20 backdrop-blur">
                Members get 10% off
              </span>

              <h2 className="mt-5 font-display text-5xl leading-tight">
                Join the{" "}
                <span className="underline decoration-sun-200 decoration-4 underline-offset-4">
                  sunny side
                </span>
                .
              </h2>

              <p className="mt-3 max-w-md text-white/90">
                Create your SunCart profile and unlock seasonal drops, saved
                wishlists and members-only bundles.
              </p>
            </div>

            <ul className="mt-10 grid max-w-md gap-3 text-sm font-medium text-white">
              {[
                "Save your favorite items",
                "Track orders in real time",
                "Early access to new collections",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
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
