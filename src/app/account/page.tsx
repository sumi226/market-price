import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <Link href="/" className="link link-hover text-sm">
        ← হোম পেজ
      </Link>
      <section className="card mx-auto max-w-xl border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          {session ? (
            <>
              <p className="text-sm text-base-content/60">আপনার অ্যাকাউন্ট</p>
              <h1 className="text-2xl font-black">{session.user.name}</h1>
              <p>{session.user.email}</p>
              <p className="text-sm text-base-content/70">
                লগআউট করতে উপরের account menu ব্যবহার করুন।
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-base-content/60">অ্যাকাউন্ট</p>
              <h1 className="text-2xl font-black">স্বাগতম</h1>
              <p>লগইন করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  className="btn btn-sm border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 sm:btn-md"
                  href="/sign-in"
                >
                  লগইন
                </Link>
                <Link
                  className="btn btn-outline btn-sm border-emerald-600 text-emerald-800 sm:btn-md"
                  href="/sign-up"
                >
                  রেজিস্টার
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
