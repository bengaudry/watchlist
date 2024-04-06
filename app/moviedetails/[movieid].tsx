import { Stack, useLocalSearchParams } from "expo-router";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { fetchMovieDetails, FullMovieDetails } from "@/api/movieDetails";

export default function MoviePage() {
  const { movieid } = useLocalSearchParams();
  const [movieDetails, setMovieDetails] = useState<FullMovieDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieid) return;
    fetchMovieDetails(movieid as string).then((movie) =>
      setMovieDetails(movie)
    );
  }, [movieid]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerTitle: movieDetails?.title ?? "Loading",
          headerBackButtonMenuEnabled: true,
        }}
      />
      {isLoading && <Text>Loading</Text>}
      <View style={{ paddingVertical: 32, paddingHorizontal: 16 }}>
        <Text>Id : {movieid}</Text>
        <Text>{JSON.stringify(movieDetails)}</Text>
      </View>
    </View>
  );
}
