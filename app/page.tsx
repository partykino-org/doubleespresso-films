import { Films } from "./components/films-list/Films";
import Search from "@/components/search/Search";
import { SortFilter } from "./components/filter/SortFilter";

export default async function HomePage() {
  return (
    <div className="max-w-[1310px] px-[15px] mx-auto">
      <div className="my-7 interaction-group flex justify-between">
        <Search />
        <SortFilter />
      </div>
      <Films />
    </div>
  );
}
