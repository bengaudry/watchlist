import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Link, useRouter } from "expo-router";

import {
  fetchUserGlobalWatchlist,
  fetchUserWatchlists,
  GlobalWatchlist,
  Watchlist,
  WatchlistContent,
} from "@/api/userWatchlist";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, ScrollView, Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Cta } from "@/components/buttons/Cta";
import { getCurrentUser } from "@/auth/firebase";

const PostersScrollView = ({
  list,
  navigate,
}: {
  list?: WatchlistContent;
  navigate: CallableFunction;
}) => (
  <ScrollView horizontal>
    <View style={styles.watchlistPostersScrollView}>
      {list &&
        list.map((movie, idx) => (
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
  const [watchlists, setWatchlists] = useState<Array<Watchlist>>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [globalWatchlist, setGlobalWatchlist] =
    useState<GlobalWatchlist | null>(null);

  // Fetch the user watchlist and the movie details corresponding to the movies in it
  const getWatchlists = () => {
    const uid = getCurrentUser()?.uid;
    if (uid) {
      setIsRefreshing(true);
      fetchUserWatchlists(uid)
        .then((lists) => setWatchlists(lists))
        .finally(() => setIsRefreshing(false));

      fetchUserGlobalWatchlist(uid).then((list) => setGlobalWatchlist(list));
    }
  };
  useEffect(getWatchlists, []);

  return (
    <ScreenContainer>
      <RefreshControl refreshing={isRefreshing} />
      <H1 style={{ marginBottom: 25 }}>My watchlists</H1>

      <Pressable
        onPress={() =>
          navigate(`/watchlistcontent/global`)
        }
      >
        <View style={styles.watchlistContainer}>
          <View style={styles.watchlistHeader}>
            <Text style={styles.watchlistName}>All</Text>
            <Link href={`/watchlistcontent/global`}>
              <Text style={{ color: Colors.secondaryText }}>See all</Text>
            </Link>
          </View>
          <PostersScrollView
            list={globalWatchlist?.content}
            navigate={navigate}
          />
        </View>
      </Pressable>

      {watchlists && watchlists.length > 0 ? (
        watchlists.map((list, idx) => (
          <Pressable
            onPress={() => navigate(`/watchlistcontent/${list.id}`)}
            key={idx}
          >
            <View style={styles.watchlistContainer}>
              <View style={styles.watchlistHeader}>
                <Text style={styles.watchlistName}>{list.name}</Text>
                <Link href={`/watchlistcontent/${list.id}`}>
                  <Text style={{ color: Colors.secondaryText }}>See all</Text>
                </Link>
              </View>
              <PostersScrollView list={list.content} navigate={navigate} />
            </View>
          </Pressable>
        ))
      ) : (
        <Text>No movies saved or watchlists created yet</Text>
      )}

      <Cta
        onPress={() =>
          console.log(
            Alert.prompt("Entrez le code partagé", "", (txt) =>
              console.log(txt)
            )
          )
        }
        icon="link-outline"
      >
        <Text style={{ textAlign: "center", color: "black" }}>
          Join a collaborative watchlist
        </Text>
      </Cta>
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
