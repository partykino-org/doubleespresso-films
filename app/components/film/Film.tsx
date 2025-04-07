"use client";

import { useEffect, useState } from "react";

interface FilmProps {
  film_url: string;
}

export function Film({ film_url }: FilmProps) {
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    const getVod = async (film_url: string) => {
      const res = await fetch(
        `http://localhost:8080/api/vods?filters[vod_id][$eq]=${film_url}&populate=*`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Fetch failed:", res.status, errText);
        throw new Error("Failed to fetch VOD");
      }

      const data = await res.json();

      if (data.data.length === 0) {
        console.warn("VOD не знайдено для:", film_url);
      }

      setFilmData(data.data[0]); // повертає один обʼєкт
    };
    getVod(film_url);
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
    rating,
    streamer_rating,
  } = filmData;

  return (
    <div className="flex gap-12 justify-between py-20 max-w-[1310px] px-[15px] mx-auto">
      <div className="w-full md:w-[300px] md:min-w-[300px]">
        <h2 className="font-semibold text-lg">Опис</h2>
      </div>

      <div className="w-full">
        <div className="font-bold mb-2">
          <h1 className="text-2xl">{title}</h1>
          <div>📅 {watchDate}</div>
        </div>

        <div className="player mt-4">
          <video controls width="100%">
            <source src={video_url} type="video/mp4" />
            Тег video не підтримується в вашому браузері.
          </video>
        </div>
        <p className="text-sm text-gray-400">⭐ Рейтинг: {rating}</p>
        <div className="description mt-4">
          <p className="text-gray-600">
            {description?.[0]?.children?.[0]?.text || "Опис відсутній"}
          </p>
        </div>
      </div>
    </div>
  );
}
