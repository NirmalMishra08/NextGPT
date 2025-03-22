"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Prefer using router.push instead of window.location.href for client-side routing
    router.push("/dashboard");
  }, [router]);

  return <div></div>;
};

export default Page;
