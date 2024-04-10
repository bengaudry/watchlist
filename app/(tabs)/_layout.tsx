import React from "react";
import { Redirect, Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Ionicons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  // return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  return <Ionicons size={23} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Watchlists",
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="watchlists"
        options={{
          title: "Watchlists",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmarks-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="person-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
