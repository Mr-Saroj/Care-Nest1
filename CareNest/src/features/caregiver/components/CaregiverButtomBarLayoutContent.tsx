import React from 'react';
import { Animated } from 'react-native';
import { useRouter } from 'expo-router';
import BottomTabBarLayout, { TabItem } from '../../../components/layout/ButtomBarLayout';

// ── Caregiver tab names ──────────────────────────────────
export type CaregiverTabName = 'home' | 'elders' | 'appointments' | 'profile';

// ── Caregiver tab config ─────────────────────────────────
const CAREGIVER_TABS: TabItem[] = [
  { name: 'home',         icon: 'home',     label: 'Home'         },
  { name: 'elders',       icon: 'people',   label: 'Elders'       },
  { name: 'appointments', icon: 'calendar', label: 'Appointments' },
  { name: 'profile',      icon: 'person',   label: 'Profile'      },
];

// ── Route map ────────────────────────────────────────────
const TAB_ROUTES: Record<CaregiverTabName, string> = {
  home:         '/caregiver/home',
  elders:       '/caregiver/elderList',
  appointments: '/caregiver/appointments',
  profile:      '/caregiver/profile',
};

// ── Props ────────────────────────────────────────────────
interface CaregiverBottomBarLayoutProps {
  active: CaregiverTabName;
  onPress?: (tab: CaregiverTabName) => void; // optional — navigation handled internally
  anim?: Animated.Value;
}

// ── Wrapper component ────────────────────────────────────
export default function CaregiverBottomBarLayout({
  active,
  onPress,
  anim,
}: CaregiverBottomBarLayoutProps) {
  const router = useRouter();

  const handlePress = (tab: string) => {
    const t = tab as CaregiverTabName;
    onPress?.(t);
    if (t !== active) {
      router.push(TAB_ROUTES[t] as any);
    }
  };

  return (
    <BottomTabBarLayout
      active={active}
      onPress={handlePress}
      tabs={CAREGIVER_TABS}
      anim={anim}
    />
  );
}