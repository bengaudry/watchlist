import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { fetchUserWatchlist, UserWatchlist } from "@/api/userWatchlist";
import { fetchCompactMovieDetails } from "@/api/movieDetails";
import {
  CompactMovieDetails,
  CompactMovieDetailsProps,
} from "@/components/custom/CompactMovieDetails";
import { H1, Text, View } from "@/components/Themed";
import { generateRandomString } from "@/functions/strings";
import { ShareWatchlistCodeModal } from "@/components/custom/ShareWatchlistCodeModal";
import Colors from "@/constants/Colors";

export function WatchlistContentScreen({ id }: { id: string | string[] }) {
  const [watchlist, setWatchlist] = useState<UserWatchlist | null>();
  const [moviesDetails, setMoviesDetails] = useState<
    CompactMovieDetailsProps[]
  >([]);
  const [settingsModalOpened, setSettingsModalOpened] = useState(false);
  const [shareCode, setShareCode] = useState("");

  const fetchlist = () => {
    console.log("fetching watchlists");
    fetchUserWatchlist("", id as string)
      .then(setWatchlist)
      .catch((err) => console.error(err));
  };

  const fetchWatchlistMovieDetails = () => {
    if (!watchlist) return;
    setMoviesDetails([]);
    watchlist.content.map((movie) => {
      fetchCompactMovieDetails(movie.movieId)
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
    <>
      <ShareWatchlistCodeModal
        isOpened={settingsModalOpened}
        setOpened={setSettingsModalOpened}
        generateCode={() => setShareCode(generateRandomString(12))}
        shareCode={shareCode}
      />
      <View>
        <Stack.Screen options={{ headerTitle: `${watchlist?.name}` }} />
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <H1 style={{ textTransform: "capitalize" }}>{watchlist?.name}</H1>
            <Pressable onPress={() => setSettingsModalOpened(true)}>
              <Ionicons
                name="share-outline"
                size={28}
                color={Colors.secondaryText}
              />
            </Pressable>
          </View>
          <Text>
            {moviesDetails.map((details, idx) => (
              <CompactMovieDetails
                {...details}
                addedBy={watchlist?.content[idx].addedBy.userName ?? ""}
                key={idx}
              />
            ))}
          </Text>
        </View>
      </View>
    </>
  );
}
