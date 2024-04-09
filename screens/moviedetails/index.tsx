import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";

import Colors from "@/constants/Colors";
import { H1, Text, View } from "@/components/Themed";
import { fetchMovieDetails, FullMovieDetails } from "@/api/movieDetails";
import { Separator } from "@/components/Separator";
import { LinearGradient } from "expo-linear-gradient";
import { PillsContainer } from "@/components/custom/Pills/PillsContainer";
import { LoadingIndicator } from "@/components/custom/LoadingView";

const PlotSection = ({ details }: { details?: FullMovieDetails }) =>
  details ? (
    <View style={styles.croppedView}>
      <Separator />
      <Text style={styles.sectionTitle}>Plot</Text>
      <Text style={{ color: Colors.secondaryText }}>
        {details?.plot?.plotText}
      </Text>
      <Separator />
    </View>
  ) : (
    <></>
  );

export function MovieDetailsScreen({
  movieid,
}: {
  movieid: string | string[];
}) {
  const [movieDetails, setMovieDetails] = useState<FullMovieDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const getMovieDetails = () => {
    if (!movieid) return;
    setIsLoading(true);
    fetchMovieDetails(movieid as string)
      .then((movie) => {
        setMovieDetails(movie);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(getMovieDetails, [movieid]);

  return (
    <View style={{ position: "relative" }}>
      <LoadingIndicator isLoading={isLoading} opacity={1} />
      <Stack.Screen
        options={{
          headerTitle: movieDetails?.title ?? "Loading",
          headerBackButtonMenuEnabled: true,
          headerBlurEffect: "dark",
          headerTransparent: true,
        }}
      />
      <ScrollView>
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

        <PillsContainer list={movieDetails?.genres} />

        <PlotSection details={movieDetails} />

        <View style={styles.croppedView}>
          <Text style={styles.sectionTitle}>Tags</Text>
        </View>
        <PillsContainer list={movieDetails?.keywords} />
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
