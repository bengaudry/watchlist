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
        backgroundColor: isInWatchlist ? "gray" : Colors.accent,
        borderRadius: 9999,
        width: 35,
        aspectRatio: "1/1",
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons
        name={`${isInWatchlist ? "bookmark" : "bookmark-outline"}`}
        color="black"
        size={22}
      />
    </Pressable>
  );
}

export function CompactMovieDetails({
  title,
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
  addedBy?: { userName: string; uid: string };
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

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={styles.subtext}>Added by</Text>
            {addedBy && addedBy.userName !== "" ? (
              <Text style={styles.subtext}>{addedBy.userName}</Text>
            ) : (
              <Text style={styles.subtext}>you</Text>
            )}
            <AddToWatchlistBtn
              isInWatchlist={isInWatchlist}
              onChange={onToggleFromWatchlist}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    display: "flex",
    width: "100%",
    paddingBottom: 6,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    width: "100%",
  },
  infosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  poster: {
    backgroundColor: "gray",
    width: "100%",
    height: 200,
    borderRadius: 12,
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
