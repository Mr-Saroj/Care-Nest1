import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useElderLogin } from '../hooks/useElderLogin';

// Enable layout animation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ElderLoginForm() {
  const {
    phoneNumber,
    updatePhoneNumber,
    otp,
    setOtp,
    isVerified,
    isSending,
    loading,
    handleVerifyNumber,
    handleResendOtp,
    handleLogin,
  } = useElderLogin();

  // Smooth reveal animation when OTP field appears
  useEffect(() => {
    if (isVerified) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [isVerified]);

  return (
    <View className="mt-8 w-full">

      {/* Phone Number + Verify Button */}
      <View
        className={`mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] bg-white pl-4 pr-1.5 ${
          isVerified ? 'border-[#A5D6A7]' : 'border-[#E2E8F0]'
        }`}
      >
        <Ionicons name="call-outline" size={20} color="#94A3B8" />
        <TextInput
          className="ml-3 flex-1 py-0 text-[15px] text-[#1E293B]"
          placeholder="Phone Number"
          placeholderTextColor="#94A3B8"
          value={phoneNumber}
          onChangeText={updatePhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />

        {/* Verify Number Button — right side of field */}
        <TouchableOpacity
          onPress={handleVerifyNumber}
          disabled={isSending || isVerified}
          activeOpacity={0.8}
          className={`h-[40px] min-w-[100px] flex-row items-center justify-center rounded-[10px] px-3 ${
            isVerified ? 'bg-[#E8F5E9]' : 'bg-[#E53935]'
          }`}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : isVerified ? (
            <>
              <Ionicons name="checkmark-circle" size={16} color="#2E7D32" />
              <Text className="ml-1 text-[12px] font-bold text-[#2E7D32]">
                Verified
              </Text>
            </>
          ) : (
            <Text className="text-[12px] font-bold text-white">
              Verify Number
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* OTP Field — only shows after number is verified */}
      {isVerified && (
        <View>
          <View className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-4">
            <Ionicons name="shield-checkmark-outline" size={20} color="#94A3B8" />
            <TextInput
              className="ml-3 flex-1 py-0 text-[16px] font-semibold tracking-[6px] text-[#1E293B]"
              placeholder="Enter OTP"
              placeholderTextColor="#94A3B8"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
            />
          </View>

          {/* Helper + Resend */}
          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-[12px] text-[#94A3B8]">
              OTP sent to your caregiver
            </Text>
            <TouchableOpacity onPress={handleResendOtp}>
              <Text className="text-[12px] font-semibold text-[#1E88E5]">
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.8}
        className="mt-6 w-full items-center justify-center rounded-2xl bg-[#E53935] py-4"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-semibold text-white">Login</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}