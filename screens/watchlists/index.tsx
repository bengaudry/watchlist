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
  createWatchlist,
  fetchUserGlobalWatchlist,
  fetchUserWatchlists,
  GlobalWatchlist,
  Watchlist,
  WatchlistContent,
} from "@/api/userWatchlist";
import { getCurrentUser } from "@/auth/firebase";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, ScrollView, Text, View } from "@/components/Themed";
import { Cta } from "@/components/buttons/Cta";
import Colors from "@/constants/Colors";

const PostersScrollView = ({
  list,
  navigate,
}: {
  list?: WatchlistContent;
  navigate: CallableFunction;
}) => (
  <ScrollView horizontal>
    <View style={styles.watchlistPostersScrollView}>
      {list && list.length > 0 ? (
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
                backgroundColor: "rgba(70, 70, 70, 1)",
              }}
            />
          </Pressable>
        ))
      ) : (
        <View style={{ height: 150 }}>
          <Text style={{ color: Colors.secondaryText }}>Nothing here yet</Text>
        </View>
      )}
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

  const createNewList = () =>
    Alert.prompt(
      "Create a watchlist",
      "Choose a name for this watchlist",
      (txt) => {
        const uid = getCurrentUser()?.uid;
        if (uid && txt.length > 2) {
          createWatchlist(uid, { name: txt }).then(getWatchlists);
        }
      },
      "plain-text",
      "",
      "",
      { userInterfaceStyle: "dark" }
    );

  const joinCollaborativeList = () =>
    Alert.prompt(
      "Join a collaborative watchlist",
      "Enter the code that has been shared to you",
      (txt) => txt
    );

  const GlobalWatchlistButton = () => (
    <Pressable onPress={() => navigate(`/watchlistcontent/global`)}>
      <View style={styles.watchlistContainer}>
        <View style={styles.watchlistHeader}>
          <Text style={styles.watchlistName}>Saved</Text>
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
  );

  return (
    <ScreenContainer>
      <ScrollView style={{ paddingBottom: 150 }}>
        <RefreshControl refreshing={isRefreshing} onRefresh={getWatchlists} />
        <H1 style={{ marginBottom: 25 }}>My watchlists</H1>

        <GlobalWatchlistButton />

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Cta
            onPress={joinCollaborativeList}
            icon="link-outline"
            style={{ flex: 1 }}
            importance="secondary"
            label="Join watchlist"
          />
          <Cta
            onPress={createNewList}
            icon="add-outline"
            style={{ flex: 1 }}
            label="Create watchlist"
          />
        </View>

        {watchlists && watchlists.length > 0 ? (
          watchlists
            .sort((l1, l2) => l2.content.length - l1.content.length)
            .map((list, idx) => (
              <Pressable
                onPress={() => navigate(`/watchlistcontent/${list.id}`)}
                key={idx}
              >
                <View style={styles.watchlistContainer}>
                  <View style={styles.watchlistHeader}>
                    <Text style={styles.watchlistName}>{list.name}</Text>
                    <Link href={`/watchlistcontent/${list.id}`}>
                      <Text style={{ color: Colors.secondaryText }}>
                        See all
                      </Text>
                    </Link>
                  </View>
                  <PostersScrollView list={list.content} navigate={navigate} />
                </View>
              </Pressable>
            ))
        ) : (
          <Text>No movies saved or watchlists created yet</Text>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  watchlistContainer: {
    width: "100%",
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
