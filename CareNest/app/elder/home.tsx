import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Animated,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";

const COLORS = {
  bg: "#F0F4FF",
  card: "#FFFFFF",
  primary: "#4A6FA5",
  primaryLight: "#EEF2FF",
  accent: "#E8534A",
  green: "#2E9E6B",
  greenLight: "#E6F7EF",
  amber: "#E09B2D",
  amberLight: "#FEF5E4",
  text: "#1A1F36",
  sub: "#6B7280",
  border: "#DDE3F0",
  sosRed: "#D93025",
  sosPressedBg: "#FFE8E7",
};

// ─── Vitals Card ────────────────────────────────────────────────────────────
function VitalsCard() {
  return (
    <View style={[styles.card, styles.cardHalf]}>
      <Text style={styles.cardIcon}>❤️</Text>
      <Text style={styles.cardTitle}>Vitals</Text>
      <Text style={styles.cardBig}>128/82</Text>
      <Text style={styles.cardSub}>Blood Pressure</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✓ Normal</Text>
      </View>
    </View>
  );
}

// ─── Medicines Card ──────────────────────────────────────────────────────────
function MedicinesCard() {
  return (
    <View style={[styles.card, styles.cardHalf]}>
      <Text style={styles.cardIcon}>💊</Text>
      <Text style={styles.cardTitle}>Medicines</Text>
      <View style={styles.progressRow}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[styles.dot, i <= 3 ? styles.dotFilled : styles.dotEmpty]}
          />
        ))}
      </View>
      <Text style={styles.cardBig}>3 / 4</Text>
      <Text style={styles.cardSub}>taken today</Text>
      <Text style={styles.cardNext}>Next dose · 8:00 PM</Text>
    </View>
  );
}

// ─── Appointment Card ────────────────────────────────────────────────────────
function AppointmentCard() {
  return (
    <View style={[styles.card, styles.cardHalf]}>
      <Text style={styles.cardIcon}>📅</Text>
      <Text style={styles.cardTitle}>Appointment</Text>
      <Text style={styles.cardBig}>5:00 PM</Text>
      <Text style={styles.cardSub}>Dr. Sharma</Text>
      <View style={[styles.badge, styles.badgeAmber]}>
        <Text style={[styles.badgeText, styles.badgeTextAmber]}>Today</Text>
      </View>
    </View>
  );
}

// ─── Reports Card ────────────────────────────────────────────────────────────
function ReportsCard() {
  return (
    <View style={[styles.card, styles.cardHalf]}>
      <Text style={styles.cardIcon}>📄</Text>
      <Text style={styles.cardTitle}>Reports</Text>
      <Text style={styles.cardBig}>2</Text>
      <Text style={styles.cardSub}>new reports</Text>
      <TouchableOpacity style={styles.linkBtn}>
        <Text style={styles.linkBtnText}>View reports →</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── SOS Button ─────────────────────────────────────────────────────────────
function SOSButton() {
  const progress = useRef(new Animated.Value(0)).current;
  const [holding, setHolding] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anim = useRef<Animated.CompositeAnimation | null>(null);

  const startHold = () => {
    setHolding(true);
    anim.current = Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    });
    anim.current.start(({ finished }) => {
      if (finished) {
        Alert.alert("🚨 SOS Sent", "Emergency contacts have been notified.");
        progress.setValue(0);
        setHolding(false);
      }
    });
  };

  const cancelHold = () => {
    anim.current?.stop();
    Animated.timing(progress, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setHolding(false);
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.sosWrapper}>
      <Text style={styles.sosSectionLabel}>🚨 Emergency</Text>
      <Pressable
        onPressIn={startHold}
        onPressOut={cancelHold}
        style={[styles.sosBtn, holding && styles.sosBtnActive]}
      >
        <Animated.View style={[styles.sosFill, { width: fillWidth }]} />
        <Text style={styles.sosBtnText}>
          {holding ? "Keep holding…" : "HOLD FOR SOS"}
        </Text>
      </Pressable>
      <Text style={styles.sosHint}>Hold 2.5 seconds to alert contacts</Text>
    </View>
  );
}

// ─── AI Chat Strip ───────────────────────────────────────────────────────────
function AIChatStrip() {
  return (
    <TouchableOpacity style={styles.aiStrip} activeOpacity={0.85}>
      <View style={styles.aiAvatar}>
        <Text style={{ fontSize: 18 }}>🤖</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.aiTitle}>AI Health Assistant</Text>
        <Text style={styles.aiSub}>Tap to ask anything about your health</Text>
      </View>
      <Text style={styles.aiArrow}>›</Text>
    </TouchableOpacity>
  );
}

// ─── Home Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning, Father 👋</Text>
            <Text style={styles.subGreeting}>Here's your health overview</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <Text style={styles.statusIcon}>❤️</Text>
          <View>
            <Text style={styles.statusTitle}>Your Health</Text>
            <Text style={styles.statusSub}>Everything looks good today</Text>
          </View>
        </View>

        {/* Cards Grid */}
        <View style={styles.grid}>
          <MedicinesCard />
          <AppointmentCard />
          <VitalsCard />
          <ReportsCard />
        </View>

        {/* SOS */}
        <SOSButton />

        {/* AI Strip */}
        <AIChatStrip />

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  subGreeting: {
    fontSize: 14,
    color: COLORS.sub,
    marginTop: 2,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // Status Banner
  statusBanner: {
    backgroundColor: COLORS.greenLight,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  statusIcon: {
    fontSize: 28,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.green,
  },
  statusSub: {
    fontSize: 13,
    color: COLORS.green,
    opacity: 0.8,
    marginTop: 1,
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardHalf: {
    width: "47.5%",
    minHeight: 150,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.sub,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  cardBig: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  cardSub: {
    fontSize: 12,
    color: COLORS.sub,
    marginTop: 2,
  },
  cardNext: {
    fontSize: 11,
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: "500",
  },
  badge: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.green,
  },
  badgeAmber: {
    backgroundColor: COLORS.amberLight,
  },
  badgeTextAmber: {
    color: COLORS.amber,
  },
  progressRow: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotFilled: {
    backgroundColor: COLORS.primary,
  },
  dotEmpty: {
    backgroundColor: COLORS.border,
  },
  linkBtn: {
    marginTop: 10,
  },
  linkBtnText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },

  // SOS
  sosWrapper: {
    marginBottom: 16,
  },
  sosSectionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },
  sosBtn: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.sosRed,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: COLORS.sosRed,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  sosBtnActive: {
    backgroundColor: COLORS.sosPressedBg,
  },
  sosFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: COLORS.sosRed,
    opacity: 0.15,
  },
  sosBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.sosRed,
    letterSpacing: 1.5,
  },
  sosHint: {
    fontSize: 11,
    color: COLORS.sub,
    textAlign: "center",
    marginTop: 6,
  },

  // AI Strip
  aiStrip: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  aiAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  aiSub: {
    fontSize: 12,
    color: COLORS.sub,
    marginTop: 2,
  },
  aiArrow: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: "300",
  },
});