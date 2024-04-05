import { fetchMovieDetails } from "@/api/movieDetails";
import { searchMovie } from "@/api/searchMovie";
import { deleteFromWatchlist, fetchUserWatchlist } from "@/api/userWatchlist";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, View, Text } from "@/components/Themed";
import {
  CompactMovieDetails,
  CompactMovieDetailsProps,
} from "@/components/custom/CompactMovieDetails";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

export default function TabTwoScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<CompactMovieDetailsProps[]>();

  const fetchQuery = () => {
    if (query.length > 2) {
      searchMovie(query)
        .then((movies) => {
          console.log("search results : ", movies);
          setSearchResults(movies);
        })
        .catch((err) =>
          console.error(`Error while fetching search results : `, err)
        );
    }
  };

  useEffect(() => {
    if (query === "") setSearchResults([]);
  }, [query]);

  return (
    <ScreenContainer>
      <H1>Search</H1>
      <TextInput
        autoFocus
        clearButtonMode="always"
        placeholder="Search an actor, a movie, a serie..."
        value={query}
        onChangeText={setQuery}
        onEndEditing={fetchQuery}
        style={{
          color: Colors.primaryText,
          backgroundColor: Colors.inputBackground,
          borderRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginVertical: 15,
        }}
      />
      <View style={{ width: "100%" }}>
        {searchResults?.map((movie, idx) => (
          <CompactMovieDetails key={idx} {...movie} />
        ))}
      </View>
    </ScreenContainer>
  );
}
