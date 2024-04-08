import { Cta } from "@/components/buttons/Cta";
import { View, Text } from "@/components/Themed";
import { router } from "expo-router";
import { ScreenContainer } from "react-native-screens";

export default function Welcome() {
  return (
    <ScreenContainer>
      <View>
        <Text>Welcome to watchlist</Text>
        <Cta onPress={() => router.push("/signin")}>
          <Text>Sign in</Text>
        </Cta>
        <Cta onPress={() => router.push("/register")}>
          <Text>Register</Text>
        </Cta>
      </View>
    </ScreenContainer>
  );
}
