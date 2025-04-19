"use client";

import { useEffect, useState } from "react";
import { FilmItem } from "./FilmItem";

export function Films({ searchedFilm }: { searchedFilm: string }) {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState(films);

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

  useEffect(() => {
    function findFilm(filmInput: string) {
      const filteredFilms = films?.filter(({ title }: { title: string }) =>
        title.toLowerCase().includes(filmInput)
      );

      if (filmInput.trim().length === 0) {
        setFilteredFilms(films);
      }

      if (filteredFilms.length === 0) {
        setFilteredFilms(filteredFilms);
      }
      if (filteredFilms.length > 0) {
        setFilteredFilms(filteredFilms);
      }
    }
    findFilm(searchedFilm);
  }, [searchedFilm, films]);

  if (!films.length) return <p>Loading...</p>;

  return (
    <div className="my-10 grid grid-cols-5 gap-4">
      {filteredFilms.map(
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
