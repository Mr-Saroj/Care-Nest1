import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CaregiverTopBarLayout from '../../src/features/caregiver/components/CaregiverTopBarLayoutContent';
import CaregiverBottomBarLayout, { CaregiverTabName } from '../../src/features/caregiver/components/CaregiverButtomBarLayoutContent';
import CaregiverHomeContent from '../../src/features/caregiver/components/CaregiverHomeContent';

export default function CaregiverHome() {
  const [activeTab, setActiveTab] = React.useState<CaregiverTabName>('home');
  const router = useRouter();

  // ── Staggered entrance animations ──
  const fadeAnim         = useRef(new Animated.Value(0)).current;
  const topBarAnim       = useRef(new Animated.Value(0)).current;
  const medicineAnim     = useRef(new Animated.Value(0)).current;
  const gridTitleAnim    = useRef(new Animated.Value(0)).current;
  const gridAnim         = useRef(new Animated.Value(0)).current;
  const activityTitleAnim = useRef(new Animated.Value(0)).current;
  const activityAnim     = useRef(new Animated.Value(0)).current;
  const tabAnim          = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spring = (anim: Animated.Value, delay = 0) =>
      Animated.spring(anim, {
        toValue: 1,
        friction: 7,
        tension: 60,
        delay,
        useNativeDriver: true,
      });

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      spring(topBarAnim),
      spring(medicineAnim, 60),
      spring(gridTitleAnim, 110),
      spring(gridAnim, 160),
      spring(activityTitleAnim, 210),
      spring(activityAnim, 260),
      spring(tabAnim, 400),
    ]).start();
  }, []);

  const handleAction = (id: string) => {
    // TODO: wire to feature routes
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFF]" edges={['left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }} className="overflow-hidden">

        {/* Decorative circles */}
        <View pointerEvents="none" className="absolute inset-0">
          <View
            className="absolute bg-[rgba(59,130,246,0.06)]"
            style={{ width: 220, height: 220, borderRadius: 110, top: 70, right: -80 }}
          />
          <View
            className="absolute bg-[rgba(239,68,68,0.04)]"
            style={{ width: 260, height: 260, borderRadius: 130, bottom: -60, left: -100 }}
          />
        </View>

        <CaregiverTopBarLayout title="Saroj 👋" anim={topBarAnim} />

        <CaregiverHomeContent
          medicineAnim={medicineAnim}
          gridTitleAnim={gridTitleAnim}
          gridAnim={gridAnim}
          activityTitleAnim={activityTitleAnim}
          activityAnim={activityAnim}
          onActionPress={handleAction}
        />

        <CaregiverBottomBarLayout active={activeTab} onPress={setActiveTab} anim={tabAnim} />

      </Animated.View>
    </SafeAreaView>
  );
}