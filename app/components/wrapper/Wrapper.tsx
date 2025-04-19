"use client";

import { useState } from "react";
import { Films } from "@/components/films-list/Films";
import Search from "@/components/search/Search";
import { SortFilter } from "@/components/filter/SortFilter";

const Wrapper = () => {
  const [searchedFilm, setSearchedFilm] = useState("");

  return (
    <div className="max-w-[1310px] px-[15px] mx-auto">
      <div className="my-7 interaction-group flex justify-between">
        <Search setSearchedFilm={setSearchedFilm} />
        <SortFilter />
      </div>
      <Films searchedFilm={searchedFilm} />
    </div>
  );
};

export default Wrapper;
