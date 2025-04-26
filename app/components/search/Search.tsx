"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export function Search({
  setSearchedFilm,
}: {
  setSearchedFilm: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || !e.key) {
      setSearchedFilm(query);
    }
  };

  const handleButtonSearch = () => {
    setSearchedFilm(query);
  };

  return (
    <div className="flex items-center gap-2 w-full md:max-w-md">
      <Input
        type="text"
        placeholder="Пошук..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
        onKeyDown={handleSearch}
      />
      <Button variant="outline" onClick={handleButtonSearch}>
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Search;
