import { Image, Pressable, StyleSheet, Touchable } from "react-native";
import { View, Text } from "../Themed";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type CompactMovieDetailsProps = {
  title: string;
  releaseYear: string;
  topCredits: Array<string>;
  poster: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  movieId: string;
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
        width: "auto",
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
  onToggleFromWatchlist,
}: CompactMovieDetailsProps & {
  isInWatchlist?: boolean;
  onToggleFromWatchlist?: () => void;
}) {
  const { push } = useRouter();

  const openMovieDetailsPanel = () => push(`/moviedetails/${movieId}`);

  return (
    <Pressable onPress={openMovieDetailsPanel} style={styles.link}>
      <View style={styles.container}>
        <Image
          src={poster.url}
          alt={poster.alt}
          style={styles.poster}
          onError={() => console.error("error while loading poster")}
          resizeMode="cover"
        />
        <View style={styles.infosContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtext}>{releaseYear}</Text>
          <Text style={styles.subtext}>{topCredits.join(", ")}</Text>
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
});
