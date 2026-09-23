import React from "react";
import { Tabs } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

// ─── Design tokens ────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#F0F4FF",
  card: "#FFFFFF",
  primary: "#4A6FA5",
  primaryLight: "#EEF2FF",
  text: "#1A1F36",
  sub: "#9CA3AF",
  border: "#DDE3F0",
  inactive: "#B0B8CC",
};

// ─── Tab bar icon component ───────────────────────────────────────────────────
type TabIconProps = {
  emoji: string;
  label: string;
  focused: boolean;
};

function TabIcon({ emoji, label, focused }: TabIconProps) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiFocused]}>
        {emoji}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {label}
      </Text>
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" label="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="medicines"
        options={{
          title: "Medicines",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💊" label="Medicines" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📅" label="Appointments" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👤" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: Platform.OS === "ios" ? 80 : 65,
    paddingTop: 6,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
    elevation: 12,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 60,
  },
  tabItemFocused: {
    backgroundColor: "#EEF2FF",
  },
  tabEmoji: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabEmojiFocused: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: COLORS.inactive,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  tabLabelFocused: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});