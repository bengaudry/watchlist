import { View, Text } from "@/components/Themed";
import { Stack, Link } from "expo-router";

export default function Welcome() {
  return (
    <>
      <Stack.Screen />
      <View>
        <Text>Welcome to watchlist</Text>
        <Link href="/signin" style={{ color: "yellow" }}>
          Sign in
        </Link>
        <Link href="/register" style={{ color: "yellow" }}>
          Register
        </Link>
      </View>
    </>
  );
}
