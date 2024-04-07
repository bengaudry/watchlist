import { WatchlistContentScreen } from "@/screens/watchlistcontent";
import { useLocalSearchParams } from "expo-router";

export default function WatchlistContentPage() {
  const { id } = useLocalSearchParams();

  return <WatchlistContentScreen id={id} />
}
