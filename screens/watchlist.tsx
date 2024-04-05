import { useState, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";

import { H1, View, Text } from "@/components/Themed";
import { ScreenContainer } from "@/components/ScreenContainer";
import { fetchMovieDetails } from "@/api/movieDetails";
import {
  deleteFromWatchlist,
  fetchUserWatchlist,
  fetchUserWatchlists,
  UserWatchlists,
} from "@/api/userWatchlist";
import {
  CompactMovieDetails,
  CompactMovieDetailsProps,
} from "@/components/custom/CompactMovieDetails";
import { useRouter } from "expo-router";

export function WatchlistScreen() {
  const { push } = useRouter();

  const [movieDetails, setMovieDetails] =
    useState<CompactMovieDetailsProps[]>();
  const [watchlists, setWatchlists] = useState<UserWatchlists>();

  // Fetch the user watchlist and the movie details corresponding to the movies in it
  useEffect(() => {
    fetchUserWatchlists("").then((lists) => setWatchlists(lists));
    fetchMovieDetails("dune").then((details) => setMovieDetails(details));
  }, []);

  /** Removes or adds the movie to the user watchlist */
  // const toggleMovieFromWatchlist = (movieId: string) => {
  //   if (watchlist && watchlist.includes(movieId)) {
  //     deleteFromWatchlist("", movieId).then((updatedWatchlist) =>
  //       setWatchlist(updatedWatchlist)
  //     );
  //     return;
  //   }
  //   setWatchlist((prevWatchlist) => {
  //     if (prevWatchlist) {
  //       return [...prevWatchlist, movieId];
  //     }
  //   });
  // };

  return (
    <ScreenContainer>
      <H1>Watchlists</H1>
      <View>
        {watchlists && watchlists.length > 0 ? (
          watchlists.map((list, idx) => (
            <Pressable onPress={() => push(`watchlistcontent/${list.listId}`)}>
              <View key={idx}>
                <Text>{list.name}</Text>
                <Text>{list.content.join(", ")}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text>No movies saved or watchlists created yet</Text>
        )}
        {/* {movieDetails && watchlist && watchlist.length > 0 ? (
          watchlist.map((movieId, idx) => (
            <CompactMovieDetails
              key={idx}
              {...movieDetails[idx]}
              isInWatchlist={watchlist ? watchlist.includes(movieId) : false}
              onToggleFromWatchlist={() => toggleMovieFromWatchlist(movieId)}
            />
          ))
        ) : (
          <Text>No movie in your watchlist yet. Add one in search tab</Text>
        )} */}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
