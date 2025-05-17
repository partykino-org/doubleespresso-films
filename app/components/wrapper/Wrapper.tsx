"use client";

import { useState } from "react";
import { Films } from "@/components/films-list/Films";
import Search from "@/components/search/Search";
import { SortFilter } from "@/components/filter/SortFilter";

const Wrapper = () => {
  const [searchedFilm, setSearchedFilm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("streamer-rating-asc");

  return (
    <div className="max-w-[1310px] px-[15px] mx-auto">
      <div className="my-4 md:my-7 interaction-group flex flex-col md:flex-row gap-y-2 justify-between">
        <Search setSearchedFilm={setSearchedFilm} />
        <SortFilter setSortBy={setSortBy} sortBy={sortBy} />
      </div>
      <Films sortBy={sortBy} searchedFilm={searchedFilm} />
    </div>
  );
};

export default Wrapper;

export type SortOption =
  | "streamer-rating-asc"
  | "streamer-rating-desc"
  | "rating-desc"
  | "rating-asc"
  | "date-desc"
  | "date-asc";
