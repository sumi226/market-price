"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("auth") === "success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      window.history.replaceState(window.history.state, "", pathname);
    } else if (query.get("auth") === "required") {
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।");
      window.history.replaceState(window.history.state, "", pathname);
    }
  }, [pathname]);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: { fontFamily: "inherit" },
      }}
    />
  );
}
