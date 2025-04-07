"use client";

import { useTheme } from "@/common/context/api-context";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`footer ${
        theme === "dark" && "bg-white/10"
      } bg-[#121217]/10 backdrop-blur-md backdrop-blur-2xl`}
    >
      <div className="py-8 max-w-[1310px] px-[15px] mx-auto flex items-center justify-between">
        Соціалки туть
      </div>
    </footer>
  );
};

export default Footer;
