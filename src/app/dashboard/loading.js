"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // minimum loading visible for 0.5 sec (adjust if you want)

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-blue-500 animate-pulse" />
    </div>
  );
}
