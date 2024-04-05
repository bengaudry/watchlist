import { CompactMovieDetailsProps } from "@/components/custom/CompactMovieDetails";

export async function searchMovie(
  query: string
): Promise<CompactMovieDetailsProps[]> {
  if (!process.env.EXPO_PUBLIC_RAPID_API_KEY)
    throw new Error("Undefined api key");
  const results: Array<CompactMovieDetailsProps> = [];
  const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${query}`;
  console.log("url, ", encodeURI(url));
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "944a8fc90fmsh55f46fcca8709bbp1b44a5jsna2ff4d7b3559",
      "X-RapidAPI-Host": "imdb146.p.rapidapi.com",
    },
  };

  console.log("key :  ", process.env.EXPO_PUBLIC_RAPID_API_KEY);

  await fetch(encodeURI(url), options)
    .then((val) => val.json())
    .then((json) => {
      console.log("json", json);
      if ("error" in json) throw new Error(json.error);
      if ("message" in json) throw new Error(json.message);

      // const json = {
      //   resultsSectionOrder: ["TITLE", "NAME"],
      //   findPageMeta: {
      //     searchTerm: "dune",
      //     includeAdult: false,
      //     isExactMatch: false,
      //   },
      //   keywordResults: { results: [] },
      //   titleResults: {
      //     results: [
      //       {
      //         id: "tt1160419",
      //         titleNameText: "Dune",
      //         titleReleaseText: "2021",
      //         titleTypeText: "",
      //         titlePosterImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
      //           maxHeight: 2552,
      //           maxWidth: 1728,
      //           caption:
      //             "Javier Bardem, Josh Brolin, Rebecca Ferguson, Jason Momoa, Sharon Duncan-Brewster, Oscar Isaac, Timothée Chalamet, and Zendaya in Dune (2021)",
      //         },
      //         topCredits: ["Timothée Chalamet", "Rebecca Ferguson"],
      //         imageType: "movie",
      //       },
      //       {
      //         id: "tt15239678",
      //         titleNameText: "Dune: Part Two",
      //         titleReleaseText: "2024",
      //         titleTypeText: "",
      //         titlePosterImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      //           maxHeight: 4096,
      //           maxWidth: 2764,
      //           caption:
      //             "Javier Bardem, Josh Brolin, Stellan Skarsgård, Rebecca Ferguson, Dave Bautista, Austin Butler, Timothée Chalamet, Zendaya, Florence Pugh, and Souheila Yacoub in Dune: Part Two (2024)",
      //         },
      //         topCredits: ["Timothée Chalamet", "Zendaya"],
      //         imageType: "movie",
      //       },
      //       {
      //         id: "tt0087182",
      //         titleNameText: "Dune",
      //         titleReleaseText: "1984",
      //         titleTypeText: "",
      //         titlePosterImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BYTAzYzNlMDMtMGRjYS00M2UxLTk0MmEtYmE4YWZiYmEwOTIwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_.jpg",
      //           maxHeight: 1426,
      //           maxWidth: 913,
      //           caption: "Sean Young and Kyle MacLachlan in Dune (1984)",
      //         },
      //         topCredits: ["Kyle MacLachlan", "Virginia Madsen"],
      //         imageType: "movie",
      //       },
      //       {
      //         id: "tt0142032",
      //         titleNameText: "Dune",
      //         titleReleaseText: "2000",
      //         titleTypeText: "TV Mini Series",
      //         titlePosterImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BMTU4MjMyMTkxN15BMl5BanBnXkFtZTYwODA5OTU5._V1_.jpg",
      //           maxHeight: 475,
      //           maxWidth: 325,
      //           caption: "Dune (2000)",
      //         },
      //         topCredits: ["William Hurt", "Alec Newman"],
      //         imageType: "tvMiniSeries",
      //       },
      //       {
      //         id: "tt0287839",
      //         titleNameText: "Children of Dune",
      //         titleReleaseText: "2003",
      //         titleTypeText: "TV Mini Series",
      //         titlePosterImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BMTI3ODIwMTQ5OF5BMl5BanBnXkFtZTYwNTkwNDk5._V1_.jpg",
      //           maxHeight: 475,
      //           maxWidth: 317,
      //           caption:
      //             "Susan Sarandon, Alice Krige, Steven Berkoff, Edward Atterton, Julie Cox, Daniela Amavia, James McAvoy, Ian McNeice, Alec Newman, and Jessica Brooks in Children of Dune (2003)",
      //         },
      //         topCredits: ["Alec Newman", "Daniela Amavia"],
      //         imageType: "tvMiniSeries",
      //       },
      //     ],
      //     nextCursor:
      //       "eyJlc1Rva2VuIjpbIjk4Mzk1LjA4IiwidHQwMjg3ODM5Il0sImZpbHRlciI6IntcImluY2x1ZGVBZHVsdFwiOmZhbHNlLFwiaXNFeGFjdE1hdGNoXCI6ZmFsc2UsXCJzZWFyY2hUZXJtXCI6XCJkdW5lXCIsXCJ0eXBlXCI6W1wiVElUTEVcIl19In0=",
      //     hasExactMatches: true,
      //   },
      //   nameResults: {
      //     results: [
      //       {
      //         id: "nm5872485",
      //         displayNameText: "Nea Dune",
      //         knownForJobCategory: "Actress",
      //         knownForTitleText: "Smile Maker",
      //         avatarImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BZDFkMzIzNjAtNjgwMC00Y2ViLWIxMTgtODBjNzUyM2ZkMzk5XkEyXkFqcGdeQXVyNDU4MjM5NDY@._V1_.jpg",
      //           maxHeight: 1000,
      //           maxWidth: 758,
      //           caption: "Nea Dune 2023-2024",
      //         },
      //       },
      //       {
      //         id: "nm1692878",
      //         displayNameText: "Dune Kossatz",
      //         knownForJobCategory: "Actress",
      //         knownForTitleText: "Las Vegas",
      //         knownForTitleYear: "2003–2008",
      //         avatarImageModel: {
      //           url: "https://m.media-amazon.com/images/M/MV5BMjA3MDk2ODc2Ml5BMl5BanBnXkFtZTcwMjE5MDcyMQ@@._V1_.jpg",
      //           maxHeight: 402,
      //           maxWidth: 288,
      //           caption: "Dune Kossatz",
      //         },
      //       },
      //       {
      //         id: "nm1216327",
      //         displayNameText: "Natia Dune",
      //         knownForJobCategory: "Actress",
      //         knownForTitleText: "A Walk Among the Tombstones",
      //         knownForTitleYear: "2014",
      //       },
      //       {
      //         id: "nm10338239",
      //         displayNameText: "Dune",
      //         knownForJobCategory: "Self",
      //         knownForTitleText: "Charlie Danger, l'Aventurière",
      //         knownForTitleYear: "2017",
      //       },
      //       {
      //         id: "nm7701758",
      //         displayNameText: "Duné Medros",
      //         knownForJobCategory: "Actress",
      //         knownForTitleText: "Verso la notte",
      //         knownForTitleYear: "2020",
      //         akaName: "Dune Medros",
      //       },
      //     ],
      //     nextCursor:
      //       "eyJlc1Rva2VuIjpbIjE0MjM2LjM2MSIsIm5tNzcwMTc1OCJdLCJmaWx0ZXIiOiJ7XCJpbmNsdWRlQWR1bHRcIjpmYWxzZSxcImlzRXhhY3RNYXRjaFwiOmZhbHNlLFwic2VhcmNoVGVybVwiOlwiZHVuZVwiLFwidHlwZVwiOltcIk5BTUVcIl19In0=",
      //     hasExactMatches: true,
      //   },
      //   companyResults: { results: [] },
      // };

      json.titleResults.results.map((result: any) => {
        results.push({
          title: result.titleNameText ?? "",
          movieId: result.id ?? "",
          topCredits: result.topCredits ?? [],
          poster: {
            url: result.titlePosterImageModel?.url ?? "",
            height: result.titlePosterImageModel?.maxHeight,
            width: result.titlePosterImageModel?.maxWidth,
            alt: result.titlePosterImageModel?.caption ?? "",
          },
          releaseYear: result.titleReleaseText ?? "",
        });
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
  return results;
}
