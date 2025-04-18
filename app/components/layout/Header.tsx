"use client";
import Link from "next/link";
import Image from "next/image";
import SwitchWrapper from "../switch/SwitchWrapper";
import { useTheme } from "@/common/context/api-context";

const Header = () => {
  const { theme } = useTheme();
  return (
    <header
      className={`${
        theme === "dark" && "bg-white/10"
      } header bg-[#121217]/10 backdrop-blur-md backdrop-blur-2xl`}
    >
      <nav className="navbar py-4 max-w-[1310px] px-[15px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 w-max">
          <Image
            src="/images/doubleespresso_logo.png"
            width={48}
            height={48}
            alt="Home Page link"
            className="rounded-3xl"
          />
          <div className="text-xl bold">Кава дивиться кіно</div>
        </Link>
        <SwitchWrapper />
      </nav>
    </header>
  );
};

export default Header;
