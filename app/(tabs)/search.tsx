import { Link } from "expo-router";

import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, Text } from "@/components/Themed";

export default function TabTwoScreen() {
  return (
    <ScreenContainer>
      <H1>Search</H1>
      <Link push href="moviedetails/dune">
        <Text>Test me</Text>
      </Link>
    </ScreenContainer>
  );
}
