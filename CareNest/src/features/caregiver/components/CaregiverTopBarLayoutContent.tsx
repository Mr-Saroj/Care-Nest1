import React from 'react';
import { Animated } from 'react-native';
import TopBarLayout from '../../../components/layout/TopBarLayout';

// ── Props ────────────────────────────────────────────────
interface CaregiverTopBarLayoutProps {
  title: string;           // caregiver's name e.g. "Saroj 👋"
  anim?: Animated.Value;
  onBellPress?: () => void;
}

// ── Wrapper component ────────────────────────────────────
export default function CaregiverTopBarLayout({
  title,
  anim,
  onBellPress,
}: CaregiverTopBarLayoutProps) {
  return (
    <TopBarLayout
      title={title}
      anim={anim}
      showBell={true}
      showNotificationDot={true}
      onBellPress={onBellPress}
    />
  );
}