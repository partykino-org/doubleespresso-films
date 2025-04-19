"use client";

import { useEffect, useState } from "react";
import { FilmItem } from "./FilmItem";

export function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const getFilms = async () => {
      const res = await fetch(
        "https://admin.doublekava.watch/api/cards?populate=*"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch CARDS");
      }

      const data = await res.json();
      setFilms(data.data);
    };
    getFilms();
  }, []);

  if (!films.length) return <p>Loading...</p>;

  return (
    <div className="my-10 grid grid-cols-5 gap-4">
      {films.map(
        ({
          id,
          title,
          film_url,
          poster,
          rating,
          watchDate,
          genres,
        }: {
          id: number;
          title: string;
          film_url: string;
          poster: {
            id: number;
            documentId: string;
            name: string;
            alternativeText: string;
            caption: string;
            url: string;
          };
          rating: string;
          watchDate: string;
          genres: { name: string; id: number; slug: string }[];
        }) => {
          return (
            <FilmItem
              key={id}
              title={title}
              film_url={film_url}
              poster={poster}
              rating={rating}
              watchDate={watchDate}
              genres={genres}
            />
          );
        }
      )}
    </div>
  );
}
