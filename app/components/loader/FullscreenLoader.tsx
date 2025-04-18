"use client";
import { useTheme } from "@/common/context/api-context";
import Image from "next/image";

export function FullscreenLoader() {
  const { theme } = useTheme();
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="animate-pulse rounded-full h-12 w-12 border-b-2 border-white">
        <Image
          src={"/images/coffee_icon.png"}
          width={48}
          height={48}
          alt={"Coffee cup icon"}
          className="w-full h-auto rounded-xl"
        />
      </div>
      <div className="mt-4 text-xl font-bold">Заварюємо каву...</div>
    </div>
  );
}
