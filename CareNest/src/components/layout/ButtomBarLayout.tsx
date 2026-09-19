import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ── Types ────────────────────────────────────────────────
type IconName = keyof typeof Ionicons.glyphMap;

export type TabName = string; // generic — each role defines its own union

export interface TabItem {
  name: TabName;
  icon: IconName;      // outline variant is derived automatically
  label: string;
}

// ── Props ────────────────────────────────────────────────
interface BottomTabBarLayoutProps {
  active: TabName;
  onPress: (tab: TabName) => void;
  tabs: TabItem[];           // required — caller always supplies role tabs
  anim?: Animated.Value;     // optional entrance animation (slide-up + fade)
  activeColor?: string;      // defaults to brand red
  activeBg?: string;         // tint behind active icon
}

// ── Component ────────────────────────────────────────────
export default function BottomTabBarLayout({
  active,
  onPress,
  tabs,
  anim,
  activeColor = '#E53935',
  activeBg = '#FEF2F2',
}: BottomTabBarLayoutProps) {
  const bar = (
    <View className="flex-row border-t border-[#E2E8F0] bg-white px-2 pb-3 pt-2">
      {tabs.map((tab) => {
        const isActive = active === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.7}
            onPress={() => onPress(tab.name)}
            className="flex-1 items-center py-1"
          >
            <View
              className="items-center justify-center rounded-2xl px-4 py-1"
              style={isActive ? { backgroundColor: activeBg } : undefined}
            >
              <Ionicons
                name={
                  isActive
                    ? tab.icon
                    : (`${tab.icon}-outline` as IconName)
                }
                size={21}
                color={isActive ? activeColor : '#94A3B8'}
              />
            </View>
            <Text
              className="mt-1 text-[10.5px] font-semibold"
              style={{ color: isActive ? activeColor : '#94A3B8' }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  if (!anim) return bar;

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 0],
            }),
          },
        ],
      }}
    >
      {bar}
    </Animated.View>
  );
}