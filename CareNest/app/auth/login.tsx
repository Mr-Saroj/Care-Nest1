import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LoginForm from '../../src/features/auth/components/LoginForm';

export default function Login() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const backAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const registerAnim = useRef(new Animated.Value(0)).current;

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
      spring(backAnim),
      spring(logoAnim),
      spring(titleAnim, 60),
      spring(subtitleAnim, 110),
      spring(formAnim, 160),
      spring(registerAnim, 280),
    ]).start();
  }, []);

  const translateY = (anim: Animated.Value) =>
    anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] });

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFF]">

      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFF" translucent={false} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <Animated.View
            style={{ opacity: fadeAnim }}
            className="flex-1 overflow-hidden px-7 pb-8"
          >
            {/* Decorative circle — top right */}
            <View
              className="absolute bg-[rgba(59,130,246,0.06)]"
              style={{ width: 220, height: 220, borderRadius: 110, top: -60, right: -80 }}
            />

            {/* Decorative circle — bottom left */}
            <View
              className="absolute bg-[rgba(239,68,68,0.04)]"
              style={{ width: 260, height: 260, borderRadius: 130, bottom: -80, left: -100 }}
            />

            {/* Back Button */}
            <Animated.View
              style={{ opacity: backAnim, transform: [{ translateY: translateY(backAnim) }] }}
              className="self-start"
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.back()}
                className="h-[42px] w-[42px] items-center justify-center rounded-full border border-[#E2E8F0] bg-white"
              >
                <Ionicons name="chevron-back" size={22} color="#1E293B" />
              </TouchableOpacity>
            </Animated.View>

            {/* Logo */}
            <Animated.View
              style={{ opacity: logoAnim, transform: [{ translateY: translateY(logoAnim) }, { scale: logoAnim }] }}
              className="mt-2 mb-3 items-center"
            >
              <Image
                source={require('../../assets/app_logo.png')}
                style={{ width: 76, height: 76 }}
                resizeMode="contain"
              />
            </Animated.View>

            {/* Title */}
            <Animated.View
              style={{ opacity: titleAnim, transform: [{ translateY: translateY(titleAnim) }] }}
              className="flex-row items-center justify-center"
            >
              <Text className="text-[28px] font-bold tracking-[-0.5px] text-[#E53935]">
                Welcome
              </Text>
              <Text className="text-[28px] font-bold tracking-[-0.5px] text-[#1E88E5]">
                {' '}Back
              </Text>
            </Animated.View>

            {/* Subtitle */}
            <Animated.View
              style={{ opacity: subtitleAnim, transform: [{ translateY: translateY(subtitleAnim) }] }}
            >
              <Text className="mt-2 text-center text-sm leading-[22px] tracking-[0.3px] text-[#94A3B8]">
                Sign in to continue caring{'\n'}for your loved ones
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              style={{ opacity: formAnim, transform: [{ translateY: translateY(formAnim) }] }}
            >
              <LoginForm />
            </Animated.View>

            {/* Register Link */}
            <Animated.View
              style={{ opacity: registerAnim, transform: [{ translateY: translateY(registerAnim) }] }}
              className="mt-7 flex-row items-center justify-center"
            >
              <Text className="text-sm text-[#94A3B8]">Don't have an account? </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('./register')}
              >
                <Text className="text-sm font-semibold text-[#1E88E5] underline">
                  Register
                </Text>
              </TouchableOpacity>
            </Animated.View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}