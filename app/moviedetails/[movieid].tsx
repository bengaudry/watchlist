import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { H1, Text, View } from "@/components/Themed";
import { fetchMovieDetails, FullMovieDetails } from "@/api/movieDetails";
import { Separator } from "@/components/Separator";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const Pill = ({ label }: { label: string }) => (
  <Pressable
    style={{
      backgroundColor: Colors.borderColor,
      paddingHorizontal: 20,
      paddingVertical: 6,
      borderRadius: 9999,
      width: "auto",
    }}
  >
    <Text style={{ color: Colors.secondaryText }}>{label}</Text>
  </Pressable>
);

const PillsDisplayer = ({ list }: { list?: Array<string> }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 16,
      }}
    >
      {list?.map((el, idx) => (
        <Pill label={el} key={idx} />
      ))}
    </View>
  </ScrollView>
);

export default function MoviePage() {
  const { movieid } = useLocalSearchParams();
  const [movieDetails, setMovieDetails] = useState<FullMovieDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieid) return;
    setIsLoading(true);
    fetchMovieDetails(movieid as string)
      .then((movie) => {
        setMovieDetails(movie);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [movieid]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: movieDetails?.title ?? "Loading",
          headerBackButtonMenuEnabled: true,
          headerBlurEffect: "dark",
          headerTransparent: true,
        }}
      />

      <ScrollView>
        {isLoading && <Text>Loading</Text>}
        <Image
          src={movieDetails?.poster?.url}
          style={styles.blurredImageBackground}
          blurRadius={80}
          progressiveRenderingEnabled
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.3)", "rgba(0,0,0,1)"]}
          style={styles.blurredImageBackgroundFade}
          start={{ x: 0.5, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
        />
        <Image
          src={movieDetails?.poster?.url}
          style={styles.poster}
          resizeMode="contain"
          progressiveRenderingEnabled
          alt={
            movieDetails?.poster?.alt ??
            `${movieDetails?.title} movieDetails? poster`
          }
        />
        <H1 style={styles.movieTitle}>{movieDetails?.title}</H1>
        <Text style={styles.movieSpecs}>
          {movieDetails?.duration?.displayableText}
          {" · "}
          {movieDetails?.releaseYear}
        </Text>

        <PillsDisplayer list={movieDetails?.genres} />

        <View style={styles.croppedView}>
          <Separator />
          <Text style={styles.sectionTitle}>Plot</Text>
          <Text style={{ color: Colors.secondaryText }}>
            {movieDetails?.plot?.plotText}
          </Text>
          <Separator />
        </View>

        <View style={styles.croppedView}>
          <Text style={styles.sectionTitle}>Tags</Text>
        </View>
        <PillsDisplayer list={movieDetails?.keywords} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blurredImageBackground: {
    height: 800,
    width: "100%",
    opacity: 1,
    position: "absolute",
    top: -100,
  },
  blurredImageBackgroundFade: {
    backgroundColor: "transparent",
    width: "100%",
    height: 800,
    position: "absolute",
    top: -100,
  },
  poster: {
    marginTop: 110,
    height: 300,
    width: "100%",
  },
  movieTitle: { marginVertical: 4, textAlign: "center" },
  movieSpecs: {
    textAlign: "center",
    color: Colors.secondaryText,
    marginBottom: 8,
  },
  croppedView: { paddingHorizontal: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
});
