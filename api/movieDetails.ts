import { CompactMovieDetailsProps } from "@/components/custom/CompactMovieDetails";

export type FullMovieDetails = CompactMovieDetailsProps & {
  productionStatus?: string;
  canHaveEpisodes?: boolean;
  certificate?: string;
  releaseDate?: { day?: number; month?: number; year?: number };
  duration?: { seconds?: number; displayableText?: string };
  rating?: { note?: number; voteCount?: number };
  keywords?: Array<string>;
  genres?: Array<string>;
  plot?: { plotText?: string; lang?: string };
};

/**
 * Turns raw api data into usable data in the app with proper types.
 */
const processApiData = (data: any): FullMovieDetails => {
  const result: FullMovieDetails = {};
  result.movieId = data.id ?? undefined;
  result.productionStatus =
    data.productionStatus.currentProductionStage.text ?? undefined;
  result.canHaveEpisodes = data.canHaveEpisodes ?? undefined;
  result.title = data.titleText.text ?? undefined;
  result.certificate = data.certificate.rating ?? undefined;
  result.releaseYear = data.releaseYear.year ?? undefined;
  result.releaseDate = {
    day: data.releaseDate.day ?? undefined,
    month: data.releaseDate.month ?? undefined,
    year: data.releaseDate.year ?? undefined,
  };
  result.duration = {
    seconds: data.runtime.seconds ?? undefined,
    displayableText:
      data.runtime.displayableProperty.value.plainText ?? undefined,
  };
  result.rating = {
    note: data.ratingsSummary.aggregateRating ?? undefined,
    voteCount: data.ratingsSummary.voteCount ?? undefined,
  };
  result.poster = {
    url: data.primaryImage.url ?? undefined,
    width: data.primaryImage.width ?? undefined,
    height: data.primaryImage.height ?? undefined,
    alt: data.primaryImage.caption.plainText ?? undefined,
  };

  const fkeywords = [];
  for (const keyword of data.keywords.edges) {
    fkeywords.push(keyword.node.text.toLowerCase());
  }
  result.keywords = fkeywords;

  const fgenres = [];
  for (const genre of data.genres.genres) {
    fgenres.push(genre.text.toLowerCase());
  }
  result.genres = fgenres;

  result.plot = {
    plotText: data.plot.plotText.plainText ?? undefined,
    lang: data.plot.language.id ?? undefined,
  };
  return result;
};

/**
 * Fetches all movie details from imdb api and turns it into usable data
 */
// export async function fetchMovieDetails(
//   movieid: string
// ): Promise<FullMovieDetails> {
//   if (!process.env.EXPO_PUBLIC_RAPID_API_KEY)
//     throw new Error("Undefined api key");

//   const url = `https://imdb146.p.rapidapi.com/v1/title/?id=${movieid}`;
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "944a8fc90fmsh55f46fcca8709bbp1b44a5jsna2ff4d7b3559",
//       "X-RapidAPI-Host": "imdb146.p.rapidapi.com",
//     },
//   };

//   let result: FullMovieDetails = {};

//   await fetch(encodeURI(url), options)
//     .then((val) => val.json())
//     .then((json) => {
//       console.log("moviedetails json : ", json);
//       if ("error" in json) throw new Error(json.error);
//       if ("message" in json) throw new Error(json.message);
//       result = processApiData(json);
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });

//   return result;
// }

// TEST VERSION OF FETCH MOVIE DETAILS
// DO NOT PUSH IN PROD !

export async function fetchMovieDetails(movieid: string): Promise<FullMovieDetails> {
  return {
    movieId: "tt1160419",
    productionStatus: "Released",
    canHaveEpisodes: false,
    title: "Dune: Part One",
    certificate: "PG-13",
    releaseYear: 2021,
    releaseDate: { day: 22, month: 10, year: 2021 },
    duration: { seconds: 9300, displayableText: "2h 35m" },
    rating: { note: 8, voteCount: 838001 },
    poster: {
      url: "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      width: 1728,
      height: 2552,
      alt: "Javier Bardem, Josh Brolin, Rebecca Ferguson, Jason Momoa, Sharon Duncan-Brewster, Oscar Isaac, Timothée Chalamet, and Zendaya in Dune: Part One (2021)",
    },
    keywords: [
      "mother son relationship",
      "mind control",
      "empire",
      "sandworm",
      "combat",
    ],
    genres: ["action", "adventure", "drama", "sci-fi"],
    plot: {
      plotText:
        "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
      lang: "en-US",
    },
  };
}

/**
 * Returns only the amount of information about a specified movie that is needed on small cards
 */
export async function fetchCompactMovieDetails(
  movieid: string
): Promise<CompactMovieDetailsProps> {
  try {
    const details = await fetchMovieDetails(movieid);
    return details as CompactMovieDetailsProps;
  } catch (err: any) {
    throw new Error(err);
  }
}
