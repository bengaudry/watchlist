import { getFirebaseAuth } from "@/auth/firebase";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, Text } from "@/components/Themed";
import { signOut } from "@/auth/firebase";
import { Pressable } from "react-native";

export default function User() {
  return (
    <ScreenContainer>
      <H1>Profile</H1>
      <Text>{getFirebaseAuth().currentUser?.displayName}</Text>
      <Text>{getFirebaseAuth().currentUser?.email}</Text>
      <Pressable onPress={signOut}><Text>Sign out</Text></Pressable>
    </ScreenContainer>
  );
}
