"use client";

import { useTheme } from "@/common/context/api-context";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";

type Poster = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  url: string;
};

type Genre = {
  id: number;
  name: string;
};

type FilmItemProps = {
  title: string;
  film_url: string;
  poster: Poster;
  rating: number;
  watchDate: string;
  genres: Genre[];
};

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function FilmItem({
  title,
  film_url,
  poster,
  rating,
  watchDate,
  genres,
}: FilmItemProps) {
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
            src={poster.url}
            fill
            alt={poster.alternativeText}
            className="w-full h-auto rounded-xl object-cover"
          />
        </CardContent>
        <CardFooter
          className={`${
            theme === "dark" ? "bg-black text-white" : "text-black bg-white"
          } absolute bottom-2.5 right-2.5 z-10 text-2xl px-1 py-0 rounded flex gap-1 text-lg font-bold`}
        >
          {rating}
          <span className="text-lg text-yellow-400">IMDb</span>
        </CardFooter>
      </Card>
      <div className="short-desc p-2">
        <div className="font-bold truncate">{title}</div>
        <div className="genres text-sm">
          {genres.map(({ id, name }, index) => (
            <span key={id}>
              {name}
              {index < genres.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
