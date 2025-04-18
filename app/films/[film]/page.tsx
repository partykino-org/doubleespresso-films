"use client";

import { Film } from "@/components/film/Film";
import { FullscreenLoader } from "@/components/loader/FullscreenLoader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilmPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  console.log(params);

  useEffect(() => {
    // Симуляція завантаження фільму (замінити на своє)
    const loadMovie = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s затримка
      setIsLoading(false);
    };

    loadMovie();
  }, []);

  useEffect(() => {});

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <div className="py-20 max-w-[1310px] px-[15px] mx-auto">
        {!isLoading && <Film film_url={params.film} />}
      </div>
    </>
  );
}
