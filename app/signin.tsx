import { getFirebaseAuth, signOut } from "@/auth/firebase";
import { Cta } from "@/components/buttons/Cta";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Link, router, Stack, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      const response = signInWithEmailAndPassword(
        getFirebaseAuth(),
        email,
        password
      );
    } catch (err: any) {
      Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Sign in" }} />
      <ScreenContainer>
        <H1 style={{ marginBottom: 20 }}>Sign in</H1>
        <KeyboardAvoidingView style={{ flexDirection: "column", gap: 12 }}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(val) => setEmail(val)}
            inputMode="email"
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder="Password"
          />
          <Cta style={{ marginTop: 16 }} onPress={handleSignin}>
            <Text style={{ color: "black" }}>Sign in</Text>
          </Cta>
        </KeyboardAvoidingView>
        <Text
          style={{
            color: Colors.secondaryText,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Don't have an account ?{" "}
          <Link href="/register" style={{ color: "yellow" }}>
            Register
          </Link>
        </Text>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 12,
    color: Colors.primaryText,
    borderWidth: 2,
    borderColor: Colors.borderColor,
  },
});
