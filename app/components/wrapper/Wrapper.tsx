"use client";

import { useState } from "react";
import { Films } from "@/components/films-list/Films";
import Search from "@/components/search/Search";
import { SortFilter } from "@/components/filter/SortFilter";

const Wrapper = () => {
  const [searchedFilm, setSearchedFilm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating-asc");

  return (
    <div className="max-w-[1310px] px-[15px] mx-auto">
      <div className="my-7 interaction-group flex justify-between">
        <Search setSearchedFilm={setSearchedFilm} />
        <SortFilter setSortBy={setSortBy} sortBy={sortBy} />
      </div>
      <Films sortBy={sortBy} searchedFilm={searchedFilm} />
    </div>
  );
};

export default Wrapper;

export type SortOption =
  | "rating-desc"
  | "rating-asc"
  | "date-desc"
  | "date-asc";
