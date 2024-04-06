import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

import {
  fetchUserWatchlists,
  UserWatchlist,
  UserWatchlists,
} from "@/api/userWatchlist";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, ScrollView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";

const PostersScrollView = ({
  list,
  navigate,
}: {
  list: UserWatchlist;
  navigate: CallableFunction;
}) => (
  <ScrollView horizontal>
    <View style={styles.watchlistPostersScrollView}>
      {list.content.map((movie, idx) => (
        <Pressable
          onPress={() => navigate(`/moviedetails/${movie.movieId}`)}
          key={idx}
        >
          <Image
            src={movie.posterUrl}
            resizeMode="cover"
            style={{
              height: 150,
              width: (9 * 150) / 16,
              borderRadius: 5,
            }}
          />
        </Pressable>
      ))}
    </View>
  </ScrollView>
);

export function WatchlistScreen() {
  const { navigate } = useRouter();
  const [watchlists, setWatchlists] = useState<UserWatchlists>();

  // Fetch the user watchlist and the movie details corresponding to the movies in it
  useEffect(() => {
    fetchUserWatchlists("").then((lists) => setWatchlists(lists));
  }, []);

  return (
    <ScreenContainer>
      <H1 style={{ marginBottom: 25 }}>My watchlists</H1>

      {watchlists && watchlists.length > 0 ? (
        watchlists.map((list) => (
          <Pressable
            onPress={() => navigate(`/watchlistcontent/${list.listId}`)}
          >
            <View style={styles.watchlistContainer}>
              <View style={styles.watchlistHeader}>
                <Text style={styles.watchlistName}>{list.name}</Text>
                <Link href={`/watchlistcontent/${list.listId}`}>
                  <Text style={{ color: Colors.secondaryText }}>See all</Text>
                </Link>
              </View>
              <PostersScrollView list={list} navigate={navigate} />
            </View>
          </Pressable>
        ))
      ) : (
        <Text>No movies saved or watchlists created yet</Text>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  watchlistContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.borderColor,
    paddingVertical: 16,
  },
  watchlistHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  watchlistName: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  watchlistPostersScrollView: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
});
