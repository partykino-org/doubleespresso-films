"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type SortOption = "rating-desc" | "rating-asc" | "date-desc" | "date-asc";

export function SortFilter() {
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc");

  const handleSortChange = (value: SortOption) => {
    // console.log(value, sortBy);
    if (value === sortBy) {
      return;
    }
    setSortBy(value);
    // console.log("Сортувати за:", sortBy);
  };

  return (
    <div className="w-[200px]">
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className={"w-full"}>
          <SelectValue placeholder="Сортувати за" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating-desc">Рейтинг ↓</SelectItem>
          <SelectItem value="rating-asc">Рейтинг ↑</SelectItem>
          <SelectItem value="date-desc">Дата ↓</SelectItem>
          <SelectItem value="date-asc">Дата ↑</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
