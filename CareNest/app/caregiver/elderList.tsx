import React, { useEffect, useRef } from 'react';
import { View, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CaregiverTopBarLayout from '../../src/features/caregiver/components/CaregiverTopBarLayoutContent';
import CaregiverBottomBarLayout, { CaregiverTabName } from '../../src/features/caregiver/components/CaregiverButtomBarLayoutContent';
import CaregiverElderList from '../../src/features/caregiver/components/CaregiverElderList';

export default function ElderListScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.spring(listAnim, {
        toValue: 1,
        friction: 7,
        tension: 60,
        delay: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFF]" edges={['left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={{ flex: 1 }} className="overflow-hidden">

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

        {/* Fixed — no anim prop, no movement */}
        <CaregiverTopBarLayout title="My Elders" />

        {/* Only middle content fades + slides up */}
        <CaregiverElderList anim={listAnim} />

        {/* Fixed — no anim prop, no movement */}
        <CaregiverBottomBarLayout active={'elders' as CaregiverTabName} />

      </View>
    </SafeAreaView>
  );
}