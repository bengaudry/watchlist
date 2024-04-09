import { MovieDetailsScreen } from "@/screens/moviedetails";
import { useLocalSearchParams } from "expo-router";

export default () => {
  const { movieid } = useLocalSearchParams();
  return <MovieDetailsScreen movieid={movieid} />;
};
