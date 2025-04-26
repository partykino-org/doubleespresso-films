"use client";
import { useTheme } from "@/common/context/api-context";
import Image, { ImageLoader } from "next/image";
import { useEffect, useState } from "react";
import VideoPlayer from "../player/VideoPlayer";

interface FilmProps {
  film_url: string;
}

interface Poster {
  url: string;
  alternativeText: string;
}

interface Genre {
  id: number;
  name: string;
}

interface FilmData {
  id: number;
  attributes: {
    title: string;
    video_url: string;
    description: string;
    release_date: string;
    watchDate: string;
    rating: string;
    streamer_rating: string;
    poster: Poster;
    genres: Genre[];
  };
}

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function Film({ film_url }: FilmProps) {
  const { theme } = useTheme();
  const [filmData, setFilmData] = useState<FilmData["attributes"] | null>(null);

  useEffect(() => {
    const getFilm = async (film_url: string) => {
      const res = await fetch(
        `https://admin.doublekava.watch/api/films?filters[film_url][$eq]=${film_url}&populate=*`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch film");
      }

      const data = await res.json();

      const film = data.data[0];
      if (film) {
        const poster: Poster = film.poster || {
          url: "",
          alternativeText: "no alt",
        };

        const genres: Genre[] =
          film.genres?.map((genre: { name: string; id: number }) => ({
            id: genre.id,
            name: genre.name,
          })) || [];

        setFilmData({
          ...film,
          poster,
          genres,
        });
      }
    };

    getFilm(film_url);
  }, [film_url]);

  if (!filmData) {
    return <div>❌ Фільм не знайдено</div>;
  }

  const {
    title,
    video_url,
    description,
    release_date,
    watchDate,
    poster,
    rating,
    streamer_rating,
    genres,
  } = filmData;

  return (
    <div className="flex flex-col md:flex-row gap-12 justify-between max-w-[1310px] px-[15px] mx-auto">
      <div className="flex flex-col w-full md:w-[240px] lg:w-[300px] lg:min-w-[300px]">
        <div className="p-0 m-0 relative w-[345px] md:max-w-[240px] lg:max-w-[300px] h-[460px] md:h-[340px] lg:h-[400px]">
          <Image
            loader={imageLoader}
            src={poster.url}
            fill
            alt={poster.alternativeText}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
        <div className="mt-4 p-3 w-[345px] md:w-auto rounded bg-white/10 flex flex-col gap-1">
          <div>Дата перегляду: {watchDate.replaceAll("-", ".")}</div>
          {genres.length ? (
            <div className="genres text-sm">
              Жанри:&nbsp;
              {genres.map(({ id, name }, index) => (
                <span key={id}>
                  {name}
                  {index < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="w-full">
        <div className="font-bold mb-2 flex flex-col">
          <h1 className="text-2xl mb-2">{title}</h1>
          <div className="flex flex-col lg:flex-row gap-y-2 justify-between">
            <p>Дата виходу: {release_date}</p>
            <p className="text-sm">
              {streamer_rating}{" "}
              <span
                className={`${
                  theme === "dark" ? "text-yellow-300" : "text-black"
                }`}
              >
                Налисничків
              </span>{" "}
              з 10 /{" "}
              <span
                className={`${
                  theme === "dark" ? "text-yellow-300" : "text-black"
                }`}
              >
                IMDb
              </span>{" "}
              Рейтинг: {rating} з 10
            </p>
          </div>
        </div>

        <div className="player mt-4">
          <VideoPlayer film_url={video_url} />
        </div>
        <div className="description mt-4">
          <h2 className="mb-3 text-xl font-bold">Опис до фільму:</h2>
          <p className="px-4 text-sm md:text-md">
            {description || "Опис відсутній"}
          </p>
        </div>
      </div>
    </div>
  );
}
