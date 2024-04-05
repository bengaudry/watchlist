import { CompactMovieDetailsProps } from "@/components/custom/CompactMovieDetails";

export async function fetchMovieDetails(
  movieid: string
): Promise<CompactMovieDetailsProps[]> {
  return [
    {
      title: "Dune - Part two",
      releaseYear: "2024",
      topCredits: ["Zendaya", "Timothee Chalamet"],
      poster: {
        url: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      },
      movieId: "dune",
    },
  ];
}
