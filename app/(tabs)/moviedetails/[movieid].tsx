import { Stack, useLocalSearchParams } from "expo-router";

import { Text, View } from "@/components/Themed";

export default function MoviePage() {
  const { movieid } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: `${movieid}` }} />
      <View style={{ paddingVertical: 32, paddingHorizontal: 16 }}>
        <Text>Id : {movieid}</Text>
      </View>
    </>
  );
}
