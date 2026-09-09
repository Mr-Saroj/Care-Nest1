import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useRegister,
  ROLES,
  DROPDOWN_ITEM_HEIGHT,
  RegisterData,
} from '../hooks/useRegister';

interface RegisterFormProps {
  onGoogleRegister?: () => void;
  onRegister?: (data: RegisterData) => void;
}

export default function RegisterForm({ onGoogleRegister, onRegister }: RegisterFormProps) {
  const {
    name,
    setName,
    role,
    email,
    setEmail,
    mobile,
    dropdownOpen,
    focusedField,
    toggleDropdown,
    selectRole,
    handleFocus,
    handleBlur,
    handleMobileChange,
    handleRegister,
    roleAnim,
    nameAnim,
    emailAnim,
    mobileAnim,
    btnAnim,
    dividerAnim,
    googleAnim,
    dropdownHeight,
    dropdownOpacity,
    translateY,
  } = useRegister({ onRegister });

  return (
    <View className="w-full">

      {/* Role Dropdown */}
      <Animated.View
        style={{ opacity: roleAnim, transform: [{ translateY: translateY(roleAnim) }] }}
        className="mt-7 w-full"
      >
        <Text className="text-[13px] font-medium tracking-[0.3px] text-[#64748B]" style={{ marginBottom: -6 }}>
          I am a...
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleDropdown}
          className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] bg-white px-4"
          style={{ borderColor: dropdownOpen || focusedField === 'role' ? '#1E88E5' : '#E2E8F0' }}
        >
          <Ionicons
            name="people-outline"
            size={20}
            color={dropdownOpen || focusedField === 'role' ? '#1E88E5' : '#94A3B8'}
          />
          <Text
            className="ml-3 flex-1 text-[15px]"
            style={{ color: role ? '#1E293B' : '#94A3B8' }}
          >
            {role || 'Select your role'}
          </Text>
          <Ionicons
            name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#94A3B8"
          />
        </TouchableOpacity>

        {/* Dropdown Options */}
        <Animated.View
          style={{
            height: dropdownHeight,
            opacity: dropdownOpacity,
            backgroundColor: '#fff',
            borderWidth: 1.5,
            borderTopWidth: 0,
            borderColor: '#1E88E5',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {ROLES.map((r) => (
            <TouchableOpacity
              key={r}
              activeOpacity={0.7}
              onPress={() => selectRole(r)}
              className="flex-row items-center justify-between px-4"
              style={{ height: DROPDOWN_ITEM_HEIGHT }}
            >
              <Text className="text-[15px] text-[#1E293B]">{r}</Text>
              {role === r && <Ionicons name="checkmark" size={18} color="#1E88E5" />}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Animated.View>

      {/* Name Input */}
      <Animated.View
        style={{ opacity: nameAnim, transform: [{ translateY: translateY(nameAnim) }] }}
      >
        <View
          className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] bg-white px-4"
          style={{ borderColor: focusedField === 'name' ? '#1E88E5' : '#E2E8F0' }}
        >
          <Ionicons
            name="person-outline"
            size={20}
            color={focusedField === 'name' ? '#1E88E5' : '#94A3B8'}
          />
          <TextInput
            className="ml-3 flex-1 py-0 text-[15px] text-[#1E293B]"
            placeholder="Full Name"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
          />
        </View>
      </Animated.View>

      {/* Email Input */}
      <Animated.View
        style={{ opacity: emailAnim, transform: [{ translateY: translateY(emailAnim) }] }}
      >
        <View
          className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] bg-white px-4"
          style={{ borderColor: focusedField === 'email' ? '#1E88E5' : '#E2E8F0' }}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={focusedField === 'email' ? '#1E88E5' : '#94A3B8'}
          />
          <TextInput
            className="ml-3 flex-1 py-0 text-[15px] text-[#1E293B]"
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />
        </View>
      </Animated.View>

      {/* Mobile Input */}
      <Animated.View
        style={{ opacity: mobileAnim, transform: [{ translateY: translateY(mobileAnim) }] }}
      >
        <View
          className="mt-4 h-[54px] flex-row items-center rounded-[14px] border-[1.5px] bg-white px-4"
          style={{ borderColor: focusedField === 'mobile' ? '#1E88E5' : '#E2E8F0' }}
        >
          <Ionicons
            name="call-outline"
            size={20}
            color={focusedField === 'mobile' ? '#1E88E5' : '#94A3B8'}
          />
          <TextInput
            className="ml-3 flex-1 py-0 text-[15px] text-[#1E293B]"
            placeholder="Mobile Number"
            placeholderTextColor="#94A3B8"
            value={mobile}
            onChangeText={handleMobileChange}
            keyboardType="phone-pad"
            maxLength={15}
            onFocus={() => handleFocus('mobile')}
            onBlur={handleBlur}
          />
        </View>
      </Animated.View>

      {/* Register Button */}
      <Animated.View
        style={{ opacity: btnAnim, transform: [{ translateY: translateY(btnAnim) }] }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleRegister}
          className="mt-7 w-full items-center justify-center rounded-2xl bg-[#E53935] py-4"
          style={{
            shadowColor: '#E53935',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text className="text-base font-semibold tracking-[0.3px] text-white">
            Register
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Divider */}
      <Animated.View
        style={{ opacity: dividerAnim, transform: [{ translateY: translateY(dividerAnim) }] }}
        className="my-6 flex-row items-center"
      >
        <View className="h-px flex-1 bg-[#E2E8F0]" />
        <Text className="mx-3 text-xs tracking-[0.3px] text-[#94A3B8]">
          or continue with
        </Text>
        <View className="h-px flex-1 bg-[#E2E8F0]" />
      </Animated.View>

      {/* Google Button */}
      <Animated.View
        style={{ opacity: googleAnim, transform: [{ translateY: translateY(googleAnim) }] }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onGoogleRegister?.()}
          className="w-full flex-row items-center justify-center rounded-2xl border-[1.5px] border-[#E2E8F0] bg-white py-[15px]"
        >
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text className="ml-2.5 text-[15px] font-semibold text-[#1E293B]">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}