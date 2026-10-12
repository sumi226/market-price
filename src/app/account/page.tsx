import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in?auth=required");
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <section className="card mx-auto max-w-xl border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <p className="text-sm text-base-content/60">আপনার অ্যাকাউন্ট</p>
          <h1 className="text-2xl font-black">{session.user.name}</h1>
          <p>{session.user.email}</p>
          <Link className="btn btn-primary btn-sm mt-3 self-start sm:btn-md" href="/">
            হোম পেজে ফিরুন
          </Link>
        </div>
      </section>
    </main>
  );
}
