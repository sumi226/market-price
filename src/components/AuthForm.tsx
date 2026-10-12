"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (isSignUp && !name) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    if (!password || (isSignUp && password.length < 8)) {
      toast.error(
        isSignUp
          ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"
          : "আপনার পাসওয়ার্ড লিখুন।",
      );
      return;
    }

    setIsPending(true);

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        toast.error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি।");
        return;
      }

      if (isSignUp) {
        const signOutResult = await authClient.signOut();
        if (signOutResult.error) {
          toast.error(
            "অ্যাকাউন্ট তৈরি হয়েছে, তবে লগইন সেশন বন্ধ করা যায়নি।",
          );
          router.push("/sign-in");
          router.refresh();
          return;
        }
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
        router.push("/sign-in");
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে।");
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "অনুরোধটি সম্পন্ন করা যায়নি।",
      );
    } finally {
      setIsPending(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setIsPending(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/?auth=success`,
      });

      if (result.error) {
        toast.error(result.error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`);
        setIsPending(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : `${provider} দিয়ে সাইন ইন করা যায়নি।`,
      );
      setIsPending(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-10 sm:px-6">
      <section className="card w-full max-w-md border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-black text-blue-950 sm:text-3xl">
              {isSignUp ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আপনার অ্যাকাউন্টে লগইন করুন"}
            </h1>
            <p className="mt-2 text-sm text-base-content/60">
              {isSignUp
                ? "বাজারদরের তথ্য পেতে নিবন্ধন করুন"
                : "বাজার দর-এ স্বাগতম"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {isSignUp && (
              <label className="form-control w-full">
                <span className="label-text mb-2">নাম</span>
                <input
                  autoComplete="name"
                  className="input input-bordered w-full"
                  name="name"
                  placeholder="আপনার নাম"
                  type="text"
                />
              </label>
            )}

            <label className="form-control w-full">
              <span className="label-text mb-2">ইমেইল</span>
              <input
                autoComplete="email"
                className="input input-bordered w-full"
                name="email"
                placeholder="name@example.com"
                type="email"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-2">পাসওয়ার্ড</span>
              <input
                autoComplete={isSignUp ? "new-password" : "current-password"}
                className="input input-bordered w-full"
                name="password"
                placeholder={isSignUp ? "কমপক্ষে ৮ অক্ষর" : "আপনার পাসওয়ার্ড"}
                type="password"
              />
            </label>

            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  অপেক্ষা করুন...
                </>
              ) : isSignUp ? (
                "রেজিস্টার করুন"
              ) : (
                "লগইন করুন"
              )}
            </button>
          </form>

          <div className="divider my-0">অথবা</div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              className="btn btn-outline btn-sm sm:btn-md"
              disabled={isPending}
              onClick={() => void handleSocialSignIn("google")}
              type="button"
            >
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              className="btn btn-outline btn-sm sm:btn-md"
              disabled={isPending}
              onClick={() => void handleSocialSignIn("github")}
              type="button"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="text-center text-sm">
            {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
            <Link
              className="link link-primary font-semibold"
              href={isSignUp ? "/sign-in" : "/sign-up"}
            >
              {isSignUp ? "লগইন করুন" : "রেজিস্টার করুন"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
