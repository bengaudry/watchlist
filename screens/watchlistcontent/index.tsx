import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActionSheetIOS, Alert, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  fetchUserGlobalWatchlist,
  fetchUserWatchlist,
  Watchlist,
} from "@/api/userWatchlist";
import { fetchCompactMovieDetails } from "@/api/movieDetails";
import {
  CompactMovieDetails,
  CompactMovieDetailsProps,
} from "@/components/custom/CompactMovieDetails";
import { H1, Text, View } from "@/components/Themed";
import { generateRandomString } from "@/functions/strings";
import { ShareWatchlistCodeModal } from "@/components/custom/ShareWatchlistCodeModal";
import Colors from "@/constants/Colors";
import { getCurrentUser } from "@/auth/firebase";
import { LoadingIndicator } from "@/components/custom/LoadingView";

export function WatchlistContentScreen({ id }: { id: string | string[] }) {
  const [watchlist, setWatchlist] = useState<Watchlist | null>();
  const [moviesDetails, setMoviesDetails] = useState<
    CompactMovieDetailsProps[]
  >([]);
  const [settingsModalOpened, setSettingsModalOpened] = useState(false);
  const [shareCode, setShareCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the watchlist content based on the user id
  const fetchlist = () => {
    const uid = getCurrentUser()?.uid;
    if (!uid) return;
    setIsLoading(true);
    // If list id is global, we fetch the global watchlist content
    if (id === "global") {
      fetchUserGlobalWatchlist(uid)
        .then((list) => {
          if (list) setWatchlist({ name: "All", ...list });
        })
        .finally(() => setIsLoading(false));
    } else {
      // else, we just fetch content from the id
      fetchUserWatchlist(uid, id as string)
        .then(setWatchlist)
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  };

  // Fetch the movie details for each item in the watchlist
  const fetchWatchlistMovieDetails = () => {
    if (!watchlist) return;
    setIsLoading(true);
    setMoviesDetails([]);
    watchlist.content.map((movie) => {
      fetchCompactMovieDetails(movie.movieId)
        .then((details) => {
          setMoviesDetails((prevDetails) => {
            return [...prevDetails, details];
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    });
  };

  useEffect(fetchlist, [id]);
  useEffect(fetchWatchlistMovieDetails, [watchlist]);

  return (
    <>
      <Stack.Screen
        options={{
          title: isLoading || !watchlist ? "Loading" : watchlist?.name,
          headerRight: (props) =>
            id !== "global" && (
              <>
                <Pressable
                  onPress={() => {
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options: [
                          "Share watchlist",
                          "Delete watchlist",
                          "Cancel",
                        ],
                        cancelButtonIndex: 2,
                        destructiveButtonIndex: 1,
                      },
                      (btnIndex) => {
                        if (btnIndex === 0) setSettingsModalOpened(true);
                        if (btnIndex === 1) {
                          /* TODO : delete watchlist */
                        }
                      }
                    );
                  }}
                >
                  <Ionicons
                    name="settings-outline"
                    size={28}
                    color={Colors.secondaryText}
                  />
                </Pressable>
              </>
            ),
        }}
      />
      <LoadingIndicator isLoading={isLoading} />
      {id !== "global" && (
        <ShareWatchlistCodeModal
          isOpened={settingsModalOpened}
          setOpened={setSettingsModalOpened}
          generateCode={() => setShareCode(generateRandomString(12))}
          shareCode={shareCode}
          guests={watchlist?.guests}
        />
      )}
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingVertical: 32 }}>
          <H1 style={{ textTransform: "capitalize", marginBottom: 15, fontSize: 24 }}>
            {watchlist?.name}
          </H1>
          <View>
            {moviesDetails.map((details, idx) => (
              <CompactMovieDetails
                {...details}
                isInWatchlist={watchlist?.content.some(
                  (item) => item.movieId === details.movieId
                )}
                addedBy={watchlist?.content[idx].addedBy}
                key={idx}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
