import { FilmItem } from "./FilmItem";

const getFilms = async () => {
  const res = await fetch("http://localhost:8080/api/cards?populate=*");

  if (!res.ok) {
    throw new Error("Failed to fetch CARDS");
  }

  const data = await res.json();
  return data.data; // бо Strapi повертає { data: [...] }
};

export async function Films() {
  const films = await getFilms();

  return (
    <div className="my-10 grid grid-cols-5 gap-4">
      {films.map(
        ({
          id,
          name,
          film_url,
          thumbnail_url,
          rating,
          watchDate,
          genres,
        }: {
          id: number;
          name: string;
          film_url: string;
          thumbnail_url: string;
          rating: string;
          watchDate: string;
          genres: { name: string };
        }) => {
          return (
            <FilmItem
              key={id}
              name={name}
              film_url={film_url}
              thumbnail_url={thumbnail_url}
              rating={rating}
              watchDate={watchDate}
              genres={genres}
            />
          );
        }
      )}
    </div>
  );
}
