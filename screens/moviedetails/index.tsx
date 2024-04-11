import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";

import Colors from "@/constants/Colors";
import { H1, Text, View } from "@/components/Themed";
import { fetchMovieDetails, FullMovieDetails } from "@/api/movieDetails";
import { Separator } from "@/components/Separator";
import { LinearGradient } from "expo-linear-gradient";
import { PillsContainer } from "@/components/custom/Pills/PillsContainer";
import { LoadingIndicator } from "@/components/custom/LoadingView";
import { Cta } from "@/components/buttons/Cta";
import { addToWatchlist } from "@/api/userWatchlist";
import { getCurrentUser } from "@/auth/firebase";

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
  const [isPosterFullscreen, setisPosterFullscreen] = useState(false);

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
      <Pressable
        onPress={() => setisPosterFullscreen(false)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: "100%",
          height: "100%",
          alignItems: "center",
          alignContent: "center",
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: 4,
          opacity: isPosterFullscreen ? 1 : 0,
          pointerEvents: isPosterFullscreen ? "auto" : "none",
        }}
      >
        <Image
          src={movieDetails?.poster?.url}
          style={{ width: "90%", height: "100%" }}
          resizeMode="contain"
          progressiveRenderingEnabled
          alt={
            movieDetails?.poster?.alt ??
            `${movieDetails?.title} movieDetails? poster`
          }
        />
      </Pressable>

      <LoadingIndicator isLoading={isLoading} opacity={1} />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerBlurEffect: "dark",
          headerTitle:
            isLoading || !movieDetails ? "Loading" : movieDetails.title,
          headerBackButtonMenuEnabled: true,
        }}
      />
      <ImageBackground
        src={movieDetails?.poster?.url}
        style={{ width: Dimensions.get("window").width, height: 650 }}
      >
        <ScrollView
          style={{
            backgroundColor: "transparent",
            minHeight: Dimensions.get("window").height,
          }}
        >
          <View style={{ paddingBottom: 60, backgroundColor: "transparent" }}>
            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
              end={{ x: 0.5, y: 0.99 }}
              style={{ height: 500 }}
            />
            <View style={styles.croppedView}>
              <H1 style={styles.movieTitle}>{movieDetails?.title}</H1>
              <Text style={styles.movieSpecs}>
                {movieDetails?.duration?.displayableText}
                {" · "}
                {movieDetails?.releaseYear}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: Colors.dark.background,
                paddingTop: 16,
                flexDirection: "column",
              }}
            >
              <Cta
                icon="add-outline"
                label="Watchlist"
                style={{ marginHorizontal: 16, marginBottom: 12 }}
                onPress={() => {
                  const user = getCurrentUser();
                  if (!user) return;
                  addToWatchlist("Cf0PdIPBUSRNcQaa95S9", {
                    movieId: movieDetails?.movieId as string,
                    addedBy: {
                      userName: user.displayName as string,
                      uid: user.uid,
                    },
                    posterUrl: movieDetails?.poster?.url,
                  });
                }}
              />
              <PillsContainer list={movieDetails?.genres} />

              <PlotSection details={movieDetails} />

              <View style={styles.croppedView}>
                <Text style={styles.sectionTitle}>Tags</Text>
              </View>
              <PillsContainer list={movieDetails?.keywords} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  movieTitle: { marginVertical: 4 },
  movieSpecs: {
    color: Colors.secondaryText,
  },
  croppedView: { paddingHorizontal: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
});
