import { router } from "expo-router";

import { View, Text, H1 } from "@/components/Themed";
import { Cta } from "@/components/buttons/Cta";
import { ScreenContainer } from "@/components/ScreenContainer";

export default function Welcome() {
  return (
    <ScreenContainer>
      <View>
        <H1>Welcome to watchlist</H1>
        <Cta onPress={() => router.push("/signin")}>
          <Text style={{ color: "black" }}>Sign in</Text>
        </Cta>
        <Cta onPress={() => router.push("/register")}>
          <Text style={{ color: "black" }}>Register</Text>
        </Cta>
      </View>
    </ScreenContainer>
  );
}
