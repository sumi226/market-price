"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

export default function AccountMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "লগআউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে।");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "লগআউট করা যায়নি।",
      );
    }
  }

  if (isPending) {
    return <div className="skeleton h-9 w-20 rounded-full" aria-label="লোড হচ্ছে" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link className="btn btn-ghost btn-sm sm:btn-md" href="/sign-in">
          সাইন ইন
        </Link>
        <Link
          className="btn btn-sm border-emerald-500 bg-emerald-500 text-white hover:border-emerald-600 hover:bg-emerald-600 sm:btn-md"
          href="/sign-up"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        aria-label="অ্যাকাউন্ট মেনু"
        className="btn btn-ghost btn-circle avatar btn-sm sm:btn-md"
        type="button"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content sm:h-10 sm:w-10">
          {session.user.name?.trim().charAt(0) || "👤"}
        </span>
      </button>
      <ul className="menu menu-sm dropdown-content z-20 mt-3 w-56 rounded-box bg-base-100 p-2 shadow">
        <li className="menu-title break-all">
          {session.user.name || session.user.email}
        </li>
        <li>
          <Link href="/account">আমার অ্যাকাউন্ট</Link>
        </li>
        <li>
          <button onClick={() => void handleSignOut()} type="button">
            লগআউট
          </button>
        </li>
      </ul>
    </div>
  );
}
