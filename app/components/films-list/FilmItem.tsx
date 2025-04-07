"use client";

import { useTheme } from "@/common/context/api-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDaysIcon, StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function FilmItem({
  name,
  film_url,
  thumbnail_url,
  rating,
  watchDate,
  genres,
}: {
  name: string;
  film_url: string;
  thumbnail_url: string;
  rating: string;
  watchDate: string;
  genres: { name: string; id: number }[];
}) {
  const { theme } = useTheme();

  return (
    <Link href={`/films/${film_url}`}>
      <Card className="p-0 m-0 relative will-change-transform transition-transform hover:scale-[102%] active:scale-[97%]">
        <CardHeader className="absolute top-3 left-3 z-10 p-0">
          <CardTitle
            className={`${
              theme === "dark" ? "bg-black" : "bg-white"
            } p-1 rounded flex items-center gap-2 w-max`}
          >
            <CalendarDaysIcon className="w-5 h-5" />
            {watchDate}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 m-0 relative max-w-[245px] h-[350px]">
          <Image
            loader={imageLoader}
            src={thumbnail_url}
            fill={true}
            alt={name}
            className="w-full h-auto rounded-xl"
          />
        </CardContent>
        <CardFooter
          className={`${
            theme === "dark" ? "bg-black text-white" : "text-black bg-white"
          } absolute bottom-2.5 right-2.5 z-10 text-2xl px-1 py-0 rounded flex gap-2 text-lg`}
        >
          {rating}
          <StarIcon className="w-5 h-5" />
        </CardFooter>
      </Card>
      <div className="short-desc p-2">
        <div className="font-bold truncate">{name}</div>
        <div className="genres text-sm">
          {genres.map(({ id, name }, index) => {
            return (
              <span key={id}>
                {name}
                {genres.length - 1 === index ? "" : ","}{" "}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
