"use client";

import { useTheme } from "@/common/context/api-context";
import Link from "next/link";
import TelegramIcon from "../ui/telegram-icon";
import YouTubeIcon from "../ui/youtube-icon";
import TwitchIcon from "../ui/twitch-icon";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`footer ${
        theme === "dark" && "bg-white/10"
      } bg-[#121217]/10 backdrop-blur-md backdrop-blur-2xl`}
    >
      <div className="py-8 max-w-[1310px] px-[15px] mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          <Link
            href="https://t.me/doublecacao"
            target="_blank"
            className="flex items-center gap-2"
          >
            <TelegramIcon width={32} height={32} />
            Telegram
          </Link>
          <Link
            href="https://www.youtube.com/@doublekava"
            target="_blank"
            className="flex items-center gap-2"
          >
            <YouTubeIcon width={32} height={32} />
            YouTube
          </Link>
          <Link
            href="https://www.twitch.tv/doubleespresso"
            target="_blank"
            className="flex items-center gap-2"
          >
            <TwitchIcon width={32} height={32} />
            Twitch
          </Link>
        </div>
        <div>
          Created by <span className="font-bold">-VDM</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
