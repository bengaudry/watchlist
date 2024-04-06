import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Share, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { fetchUserWatchlist, UserWatchlist } from "@/api/userWatchlist";
import { fetchCompactMovieDetails } from "@/api/movieDetails";
import {
  CompactMovieDetails,
  CompactMovieDetailsProps,
} from "@/components/custom/CompactMovieDetails";
import { H1, Text, View, ScrollView } from "@/components/Themed";
import Colors from "@/constants/Colors";

const generateRandomString = (length: number) => {
  const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  for (let i = 0; i <= length; i++) {
    str += abc[Math.floor(Math.random() * abc.length)];
  }
  return str;
};

export default function WatchlistContentPage() {
  const { id } = useLocalSearchParams();
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
      <Modal
        visible={settingsModalOpened}
        onRequestClose={() => setSettingsModalOpened(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ScrollView
          style={{
            backgroundColor: Colors.dark.background,
            paddingHorizontal: 16,
            paddingVertical: 32,
          }}
        >
          <H1>Share watchlist</H1>
          <Text style={{ marginVertical: 4, color: Colors.secondaryText }}>
            Create a selection of movies and shows that you will watch with your
            friends or with your partner
          </Text>

          {shareCode === "" ? (
            <Pressable
              style={{
                marginTop: 20,
                width: "100%",
                backgroundColor: "yellow",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 9999,
              }}
              onPress={() => setShareCode(generateRandomString(12))}
            >
              <Text style={{ color: "black", textAlign: "center" }}>
                Generate a code
              </Text>
            </Pressable>
          ) : (
            <>
              <TextInput
                readOnly
                value={shareCode}
                style={{
                  marginTop: 20,
                  color: "rgba(255, 255, 255, 0.4)",
                  borderWidth: 2,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
              />
              <Pressable
                style={{
                  marginTop: 20,
                  width: "100%",
                  backgroundColor: "yellow",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 9999,
                }}
                onPress={() => {
                  Share.share(
                    { message: shareCode, title: "" },
                    {
                      excludedActivityTypes: [
                        "com.apple.reminders.sharingextension",
                        "com.apple.DocumentManagerUICore.SaveToFiles",
                      ],
                    }
                  ).then((shareact) => console.log(shareact));
                }}
              >
                <Text style={{ color: "black", textAlign: "center" }}>
                  Share code
                </Text>
              </Pressable>
            </>
          )}

          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              marginTop: 30,
              marginBottom: 8,
            }}
          >
            Guests
          </Text>
          <Text style={{ color: Colors.secondaryText }}>
            The persons you invited to share this watchlist will appear here
          </Text>
        </ScrollView>
      </Modal>
      <View>
        <Stack.Screen options={{ headerTitle: `${watchlist?.name}` }} />
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <H1 style={{ textTransform: "capitalize" }}>{watchlist?.name}</H1>
          <Pressable onPress={() => setSettingsModalOpened(true)}>
            <Text>Share watchlist</Text>
            <Ionicons name="share-outline" size={28} color="white" />
          </Pressable>
          <Text>
            {moviesDetails.map((details, idx) => (
              <CompactMovieDetails {...details} key={idx} />
            ))}
          </Text>
        </View>
      </View>
    </>
  );
}
