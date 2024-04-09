import { useState } from "react";
import {
  Share,
  Modal,
  TextInput,
  Pressable,
  Clipboard,
  StyleSheet,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { Cta } from "@/components/buttons/Cta";
import { H1, Text, ScrollView, View } from "@/components/Themed";
import { Separator } from "../Separator";

export function ShareWatchlistCodeModal({
  shareCode,
  isOpened,
  setOpened,
  generateCode,
  guests,
}: {
  shareCode: string;
  isOpened: boolean;
  setOpened: (val: boolean) => void;
  generateCode: () => void;
  guests?: Array<{ userName: string; uid: string }>;
}) {
  const [copied, setCopied] = useState(false);

  const handleShareCode = () => {
    Share.share(
      { message: shareCode, title: "" },
      {
        excludedActivityTypes: [
          "com.apple.reminders.sharingextension",
          "com.apple.DocumentManagerUICore.SaveToFiles",
        ],
      }
    ).then((shareact) => console.log(shareact));
  };

  const handleCopyCodeToClipboard = () => {
    Clipboard.setString(shareCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDeleteUserBtnPressed = (user: any) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Remove from watchlist", "Cancel"],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (btnIndex) => {
        if (btnIndex === 0) {
          Alert.alert(
            `${user.userName} removed from watchlist`,
            `Do you want to delete ${user.userName}'s contributions from this watchlist ?`,
            [
              {
                text: `Remove ${user.userName}'s contributions`,
                style: "destructive",
                // onPress: () => {
                //   setGuests((prevGuests) =>
                //     prevGuests.filter(
                //       (deletingUser) => deletingUser.uid !== user.uid
                //     )
                //   );
                // },
              },
              {
                text: `Keep ${user.userName}'s contributions`,
                // onPress: () => {
                //   setGuests((prevGuests) =>
                //     prevGuests.filter(
                //       (deletingUser) => deletingUser.uid !== user.uid
                //     )
                //   );
                // },
              },
              { text: "Cancel", style: "cancel" },
            ]
          );
        }
      }
    );
  };

  return (
    <Modal
      visible={isOpened}
      onRequestClose={() => setOpened(false)}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ScrollView style={styles.modalScrollView}>
        <H1>Share watchlist</H1>
        <Text style={{ marginVertical: 4, color: Colors.secondaryText }}>
          Create a selection of movies and shows that you will watch with your
          friends or with your partner
        </Text>

        {shareCode === "" ? (
          <Cta style={{ marginTop: 20 }} onPress={() => generateCode()}>
            <Text style={{ color: "black", textAlign: "center" }}>
              Generate a code
            </Text>
          </Cta>
        ) : (
          <>
            <View style={styles.modalCodeContainer}>
              <TextInput
                readOnly
                value={shareCode}
                style={styles.modalCodeInput}
              />
              <Pressable
                style={styles.modalCopyButton}
                onPress={handleCopyCodeToClipboard}
              >
                <Ionicons
                  name={copied ? "checkmark-done-outline" : "copy-outline"}
                  size={24}
                  color={"white"}
                />
              </Pressable>
            </View>
            <Cta
              style={{ marginTop: 20 }}
              onPress={handleShareCode}
              icon="share-outline"
            >
              <Text style={{ color: "black", textAlign: "center" }}>
                Share code
              </Text>
            </Cta>
          </>
        )}

        <Separator />

        <Text style={styles.modalGuestsSectionTitle}>Guests</Text>
        <View style={styles.guestListWrapper}>
          {guests && guests.length > 0 ? (
            guests.map((user, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  key={idx}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <LinearGradient
                    colors={["rgba(70, 70, 70, .4)", "rgba(0,0,0,0)"]}
                    style={{
                      backgroundColor: "gray",
                      width: 50,
                      aspectRatio: "1/1",
                      borderRadius: 9999,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 22, fontWeight: "600" }}>
                      {user.userName[0]}
                    </Text>
                  </LinearGradient>
                  <Text style={{ fontSize: 18 }}>{user.userName}</Text>
                </View>
                <Pressable onPress={() => handleDeleteUserBtnPressed(user)}>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={22}
                    color={Colors.secondaryText}
                  />
                </Pressable>
              </View>
            ))
          ) : (
            <Text style={{ color: Colors.secondaryText }}>
              The persons you invited to share this watchlist will appear here
            </Text>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalScrollView: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  modalCodeContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  modalCodeInput: {
    color: "rgba(255, 255, 255, 0.4)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
  modalCopyButton: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "1/1",
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  modalGuestsSectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  guestListWrapper: {
    flexDirection: "column",
    gap: 15
  }
});
