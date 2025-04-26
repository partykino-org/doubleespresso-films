"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "../wrapper/Wrapper";
import { Dispatch, SetStateAction } from "react";

export function SortFilter({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<SortOption>>;
}) {
  const handleSortChange = (value: SortOption) => {
    // console.log(value, sortBy);
    if (value === sortBy) {
      return;
    }
    setSortBy(value);
  };

  return (
    <div className="w-full md:w-[200px]">
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder="Сортувати за" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating-asc">Рейтинг ↑</SelectItem>
          <SelectItem value="rating-desc">Рейтинг ↓</SelectItem>
          <SelectItem value="date-desc">Дата перегляду ↓</SelectItem>
          <SelectItem value="date-asc">Дата перегляду ↑</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
