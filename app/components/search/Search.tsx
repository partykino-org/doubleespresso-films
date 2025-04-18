"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export function Search() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // console.log("Пошук:", query);
    // Тут можна викликати fetch або router.push(`/search?q=${query}`)
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Пошук..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Button variant="outline" onClick={handleSearch}>
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default Search;
