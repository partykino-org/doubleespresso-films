"use client";

import { useEffect, useState } from "react";
import { FilmItem } from "./FilmItem";
import { SortOption } from "../wrapper/Wrapper";

export function Films({
  searchedFilm,
  sortBy,
}: {
  searchedFilm: string;
  sortBy: SortOption;
}) {
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
      data.data?.sort((a: FilmProps, b: FilmProps) => b.rating - a.rating);
      setFilms(data.data);
    };
    getFilms();
  }, []);

  useEffect(() => {
    function sortFilms() {
      filteredFilms?.sort((a: FilmProps, b: FilmProps): number => {
        switch (sortBy) {
          case "date-asc":
            return (
              new Date(a.watchDate).getTime() - new Date(b.watchDate).getTime()
            );
          case "date-desc":
            return (
              new Date(b.watchDate).getTime() - new Date(a.watchDate).getTime()
            );
          case "rating-asc":
            return a.rating - b.rating;
          case "rating-desc":
            return b.rating - a.rating;
        }
      });
    }
    sortFilms();
  }, [sortBy, filteredFilms, films]);

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
        }: FilmProps) => {
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

interface FilmProps {
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
  rating: number;
  watchDate: string;
  genres: { name: string; id: number; slug: string }[];
}
