import { Image, Pressable, StyleSheet, Touchable } from "react-native";
import { View, Text } from "../Themed";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type CompactMovieDetailsProps = {
  title?: string;
  releaseYear?: number;
  topCredits?: Array<string>;
  poster?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  movieId?: string;
};

function AddToWatchlistBtn({
  isInWatchlist,
  onChange,
}: {
  isInWatchlist?: boolean;
  onChange?: () => void;
}) {
  return (
    <Pressable
      onPress={() => onChange && onChange()}
      style={{
        backgroundColor: isInWatchlist ? "gray" : "yellow",
        borderRadius: 9999,
        width: 150,
        display: "flex",
        flexDirection: "row",
        gap: 3,
        marginVertical: 8,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons
        name={`${isInWatchlist ? "checkmark-outline" : "add-outline"}`}
        color="black"
        size={25}
      />
      <Text style={{ color: "black" }}>Watchlist</Text>
    </Pressable>
  );
}

export function CompactMovieDetails({
  title,
  releaseYear,
  topCredits,
  poster,
  movieId,
  isInWatchlist,
  addedBy,
  onToggleFromWatchlist,
  isSkeleton,
}: CompactMovieDetailsProps & {
  isInWatchlist?: boolean;
  onToggleFromWatchlist?: () => void;
  isSkeleton?: boolean;
  addedBy?: string;
}) {
  const { push } = useRouter();

  const openMovieDetailsPanel = () => push(`/moviedetails/${movieId}`);

  return (
    <Pressable onPress={openMovieDetailsPanel} style={styles.link}>
      <View style={styles.container}>
        <Image
          src={isSkeleton || !poster ? "" : poster.url}
          alt={isSkeleton || !poster ? "" : poster.alt}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.infosContainer}>
          <Text style={isSkeleton ? styles.loadingTitle : styles.title}>
            {title}
          </Text>
          <Text style={isSkeleton ? styles.loadingSubtext : styles.subtext}>
            {releaseYear}
          </Text>
          <Text style={isSkeleton ? styles.loadingSubtext : styles.subtext}>
            {topCredits?.join(", ")}
          </Text>
          {addedBy && (
            <Text style={isSkeleton ? styles.loadingSubtext : styles.subtext}>
              Added by : {addedBy}
            </Text>
          )}
          <AddToWatchlistBtn
            isInWatchlist={isInWatchlist}
            onChange={onToggleFromWatchlist}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
    width: "100%",
  },
  link: {
    display: "flex",
    width: "100%",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  infosContainer: {
    flexDirection: "column",
    gap: 3,
  },
  poster: {
    backgroundColor: "gray",
    width: (9 * 120) / 16,
    height: 120,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
  },
  subtext: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  loadingTitle: {
    opacity: 0.3,
    width: 150,
    color: "transparent",
    backgroundColor: Colors.secondaryText,
  },
  loadingSubtext: {
    opacity: 0.3,
    width: 250,
    overflow: "hidden",
    color: "transparent",
    backgroundColor: Colors.secondaryText,
  },
});
