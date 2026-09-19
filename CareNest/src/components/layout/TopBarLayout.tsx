import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ── Helpers ──────────────────────────────────────────────
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

// ── Props ────────────────────────────────────────────────
interface TopBarLayoutProps {
  title: string;                   // e.g. "Saroj 👋"
  subtitle?: string;               // defaults to time-based greeting
  anim?: Animated.Value;           // optional entrance animation
  topInset?: number;               // overrides safe-area inset (optional)
  showBell?: boolean;              // default true
  showNotificationDot?: boolean;   // default true
  onBellPress?: () => void;
}

// ── Component ────────────────────────────────────────────
export default function TopBarLayout({
  title,
  subtitle,
  anim,
  topInset,
  showBell = true,
  showNotificationDot = true,
  onBellPress,
}: TopBarLayoutProps) {
  const insets = useSafeAreaInsets();
  const effectiveTopInset = topInset ?? insets.top;

  const bar = (
    <View
      style={{
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        paddingTop: effectiveTopInset + 12, // white bg runs into phone's top edge
        shadowColor: '#1E293B',
        shadowOpacity: 0.03,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}
      className="flex-row items-center justify-between border-b border-[#E2E8F0] px-6 pb-3"
    >
      <View className="flex-1">
        <Text className="text-[13px] font-medium tracking-[0.3px] text-[#94A3B8]">
          {subtitle ?? `${getGreeting()} 🌤️`}
        </Text>
        <Text className="mt-0.5 text-[21px] font-bold tracking-[-0.5px] text-[#1E293B]">
          {title}
        </Text>
      </View>

      {showBell && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBellPress}
          className="h-[42px] w-[42px] items-center justify-center rounded-full border border-[#E2E8F0] bg-white"
        >
          <Ionicons name="notifications-outline" size={21} color="#1E293B" />
          {showNotificationDot && (
            <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#E53935]" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  // No animation passed → render plain bar
  if (!anim) return bar;

  // With animation → slide up + fade in on mount
  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
      }}
    >
      {bar}
    </Animated.View>
  );
}