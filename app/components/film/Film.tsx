"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

interface FilmProps {
  film_url: string;
}

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export function Film({ film_url }: FilmProps) {
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    const getFilm = async (film_url: string) => {
      const res = await fetch(
        `https://admin.doublekava.watch/api/films?filters[film_url][$eq]=${film_url}&populate=*`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch CARDS");
      }

      const data = await res.json();
      console.log(data.data[0]);
      setFilmData(data.data[0]); // повертає один обʼєкт
    };
    getFilm(film_url);
  }, []);
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
  // console.log(filmData);

  return (
    <div className="flex gap-12 justify-between max-w-[1310px] px-[15px] mx-auto">
      <div className="w-full md:w-[300px] md:min-w-[300px]">
        <div className="p-0 m-0 relative max-w-[300px] h-[400px]">
          <Image
            loader={imageLoader}
            src={poster.url}
            fill={true}
            alt={poster.alternativeText}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="mt-4 p-3 rounded bg-white/10 flex flex-col gap-1">
          <div>Дата перегляду: {watchDate.replaceAll("-", ".")}</div>
          <div className="genres text-sm">
            Жанри:&nbsp;
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
      </div>

      <div className="w-full">
        <div className="font-bold mb-2">
          <h1 className="text-2xl mb-2">{title}</h1>
          <div className="flex justify-between">
            <p>Дата виходу: {release_date}</p>
            <p className="text-sm">
              {streamer_rating}{" "}
              <span className="text-yellow-300">Налисничків</span> з 10 /{" "}
              <span className="text-yellow-300">IMDB</span> Рейтинг: {rating} з
              10
            </p>
          </div>
        </div>

        <div className="player mt-4">
          <video controls width="100%">
            <source src={video_url} type="video/mp4" />
            Тег video не підтримується в вашому браузері.
          </video>
        </div>
        <div className="description mt-4">
          <h2 className="mb-3 text-xl font-bold ">Опис до фільму:</h2>
          <p className="px-4">{description || "Опис відсутній"}</p>
        </div>
      </div>
    </div>
  );
}
