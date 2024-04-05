import { fetchUserWatchlist, UserWatchlist } from "@/api/userWatchlist";
import { ScreenContainer } from "@/components/ScreenContainer";
import { Text } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function WatchlistContentPage() {
  const { listId } = useLocalSearchParams();
  const [watchlist, setWatchlist] = useState<UserWatchlist | null>();

  const fetchlist = () => {
    console.log("fetching watchlists");
    fetchUserWatchlist("", listId as string)
      .then(setWatchlist)
      .catch((err) => console.error(err));
  };

  useEffect(fetchlist, []);

  return (
    <>
      <Stack.Screen
        options={{ title: "Watchlist", navigationBarHidden: true }}
      />
      <ScreenContainer>
        <Text>{listId}</Text>
        <Text>{watchlist?.content.join(", ")}</Text>
      </ScreenContainer>
    </>
  );
}
