import { useState, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";

import { H1, View, Text } from "@/components/Themed";
import { ScreenContainer } from "@/components/ScreenContainer";
import { fetchUserWatchlists, UserWatchlists } from "@/api/userWatchlist";

export function WatchlistScreen() {
  const { navigate } = useRouter();
  const [watchlists, setWatchlists] = useState<UserWatchlists>();

  // Fetch the user watchlist and the movie details corresponding to the movies in it
  useEffect(() => {
    fetchUserWatchlists("").then((lists) => setWatchlists(lists));
  }, []);

  return (
    <ScreenContainer>
      <H1>Watchlists</H1>
      <View
        style={{
          width: "100%",
          marginHorizontal: "auto",
          flex: 2,
        }}
      >
        {watchlists && watchlists.length > 0 ? (
          watchlists.map((list, idx) => (
            <Pressable
              key={idx}
              onPress={() => navigate(`watchlistcontent/${list.listId}`)}
            >
              <View>
                <View
                  style={{
                    aspectRatio: "1/1",
                    width: "100%",
                    backgroundColor: "pink",
                  }}
                >
                  <Text>♂</Text>
                </View>
                <Text style={{ textTransform: "capitalize" }}>{list.name}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text>No movies saved or watchlists created yet</Text>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
