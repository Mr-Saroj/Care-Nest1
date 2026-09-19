import React from 'react';
import { ActivityIndicator } from 'react-native'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    loading,
    togglePasswordVisibility,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword,
  } = useLogin();

  return (
    <View className="mt-8 w-full">

      {/* Email */}
      <View className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-4">
        <Ionicons name="mail-outline" size={20} color="#94A3B8" />
        <TextInput
          className="ml-3 flex-1 py-0 text-[15px] text-[#1E293B]"
          placeholder="Email"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Password */}
      <View className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] border-[#E2E8F0] bg-white px-4">
        <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
        <TextInput
          className="ml-3 flex-1 py-0 text-[15px] text-[#1E293B]"
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} className="p-1">
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#94A3B8"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity className="mt-1 items-end" onPress={handleForgotPassword}>
        <Text className="text-[13px] font-medium text-[#1E88E5]">
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="mt-6 w-full items-center justify-center rounded-2xl bg-[#E53935] py-4"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-base font-semibold text-white">Login</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View className="mt-6 flex-row items-center">
        <View className="h-px flex-1 bg-[#E2E8F0]" />
        <Text className="mx-3 text-xs tracking-[0.3px] text-[#94A3B8]">
          or continue with
        </Text>
        <View className="h-px flex-1 bg-[#E2E8F0]" />
      </View>

      {/* Google Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleGoogleLogin}
        className="mt-5 w-full flex-row items-center justify-center rounded-2xl border-[1.5px] border-[#E2E8F0] bg-white py-[15px]"
      >
        <Ionicons name="logo-google" size={20} color="#DB4437" />
        <Text className="ml-2.5 text-[15px] font-semibold text-[#1E293B]">
          Continue with Google
        </Text>
      </TouchableOpacity>

    </View>
  );
}