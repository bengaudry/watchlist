import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Link, router, Stack, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";

import { getFirebaseAuth } from "@/auth/firebase";
import { Cta } from "@/components/buttons/Cta";
import { ScreenContainer } from "@/components/ScreenContainer";
import { H1, Text } from "@/components/Themed";
import Colors from "@/constants/Colors";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        email,
        password
      );
      const { displayName, ...otherUserDetails } = response.user;
      await updateCurrentUser(getFirebaseAuth(), {
        ...otherUserDetails,
        displayName: username,
      });
    } catch (err: any) {
      Alert.alert(
        "Error while creating user",
        err.code.replaceAll("auth/", "").replaceAll("-", " ")
      );
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Register" }} />
      <ScreenContainer>
        <H1 style={{ marginBottom: 20 }}>Register</H1>
        <KeyboardAvoidingView style={{ flexDirection: "column", gap: 12 }}>
          <TextInput
            inputMode="email"
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(val) => setUsername(val)}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
          <TextInput
            secureTextEntry
            style={[
              styles.input,
              password !== passwordConfirm &&
                passwordConfirm.length > 0 && { borderColor: "red" },
            ]}
            placeholder="Confirm password"
            value={passwordConfirm}
            onChangeText={(val) => setPasswordConfirm(val)}
          />
          <Cta style={{ marginTop: 16 }} onPress={handleRegister}>
            <Text style={{ color: "black" }}>Register</Text>
          </Cta>
        </KeyboardAvoidingView>
        <Text
          style={{
            color: Colors.secondaryText,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          Already have an account ?{" "}
          <Link href="/signin" style={{ color: "yellow" }}>
            Sign in
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