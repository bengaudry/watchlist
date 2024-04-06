import { fetchUserWatchlist, UserWatchlist } from "@/api/userWatchlist";
import { fetchCompactMovieDetails } from "@/api/movieDetails";
import {
  CompactMovieDetails,
  CompactMovieDetailsProps,
} from "@/components/custom/CompactMovieDetails";
import { H1, Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function WatchlistContentPage() {
  const { id } = useLocalSearchParams();
  const [watchlist, setWatchlist] = useState<UserWatchlist | null>();
  const [moviesDetails, setMoviesDetails] = useState<
    CompactMovieDetailsProps[]
  >([]);

  const fetchlist = () => {
    console.log("fetching watchlists");
    fetchUserWatchlist("", id as string)
      .then(setWatchlist)
      .catch((err) => console.error(err));
  };

  const fetchWatchlistMovieDetails = () => {
    if (!watchlist) return;
    setMoviesDetails([]);
    watchlist.content.map((movieid) => {
      fetchCompactMovieDetails(movieid)
        .then((details) => {
          setMoviesDetails((prevDetails) => {
            return [...prevDetails, details];
          });
        })
        .catch((err) => console.error(err));
    });
  };

  useEffect(fetchlist, [id]);
  useEffect(fetchWatchlistMovieDetails, [watchlist]);

  return (
    <View>
      <Stack.Screen
        options={{ headerTitle: `${watchlist?.name}` }}
      />
      <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
        <H1 style={{ textTransform: "capitalize" }}>{watchlist?.name}</H1>
        <Text>
          {moviesDetails.map((details, idx) => (
            <CompactMovieDetails {...details} key={idx} />
          ))}
        </Text>
      </View>
    </View>
  );
}
