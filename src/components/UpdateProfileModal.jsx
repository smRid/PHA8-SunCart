"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Pencil, X } from "lucide-react";
import { updateUser } from "@/lib/auth-client";

export default function UpdateProfileModal({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const { error } = await updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        setOpen(false);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setName(user.name || "");
          setImage(user.image || "");
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 font-bold text-sun-700 shadow transition hover:scale-[1.02] sm:self-auto cursor-pointer"
      >
        <Pencil className="h-4 w-4" /> Update Information
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-md animate-in rounded-3xl border border-sun-100 bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-neutral/50 transition hover:bg-sun-50 hover:text-sun-700 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <h2 className="font-display text-2xl text-sun-900">
                Update Profile
              </h2>
              <p className="mt-1 text-sm text-neutral/60">
                Change your name and profile image below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-sun-800">
                  Full Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full rounded-2xl border border-sun-200 bg-sun-50/50 px-4 py-3 text-sm text-sun-900 outline-none transition placeholder:text-neutral/40 focus:border-sun-400 focus:ring-4 focus:ring-sun-200/40"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-sun-800">
                  Profile Image URL
                </span>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="w-full rounded-2xl border border-sun-200 bg-sun-50/50 px-4 py-3 text-sm text-sun-900 outline-none transition placeholder:text-neutral/40 focus:border-sun-400 focus:ring-4 focus:ring-sun-200/40"
                />
                <span className="mt-1 block text-xs text-neutral/50">
                  Paste a direct link to your profile photo (optional)
                </span>
              </label>

              {image.trim() ? (
                <div className="flex items-center gap-3 rounded-2xl border border-sun-100 bg-sun-50/30 p-3">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-sun-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-xs text-neutral/60">Image preview</span>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="btn-sun w-full justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Updating…
                  </>
                ) : (
                  "Update Information"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
