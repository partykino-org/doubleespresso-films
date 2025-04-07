"use client";

import { Film } from "@/components/film/Film";
import { useParams } from "next/navigation";

export default function FilmPage() {
  const params = useParams();
  console.log(params);
  return (
    <div className="py-20 max-w-[1310px] px-[15px] mx-auto">
      <Film film_url={params.film} />
    </div>
  );
}
