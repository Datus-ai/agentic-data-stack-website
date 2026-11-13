"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function Language() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.lang =
      path === "/zh" || path.startsWith("/zh/") ? "zh-CN" : "en";
  }, [path]);
  return null;
}
