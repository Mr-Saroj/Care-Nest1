import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ── Types ────────────────────────────────────────────────
type IconName = keyof typeof Ionicons.glyphMap;

interface SettingItem {
  id: string;
  icon: IconName;
  label: string;
  tint: string;
  bg: string;
  type: 'arrow' | 'toggle';
  value?: boolean;
}

interface StatItem {
  label: string;
  value: string;
  icon: IconName;
  tint: string;
  bg: string;
}

// ── Data ─────────────────────────────────────────────────
const STATS: StatItem[] = [
  { label: 'Elders',      value: '4',   icon: 'people',           tint: '#1E88E5', bg: '#EFF6FF' },
  { label: 'This Month',  value: '12',  icon: 'calendar',         tint: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Tasks Done',  value: '89%', icon: 'checkmark-circle', tint: '#16A34A', bg: '#F0FDF4' },
];

// ── Helpers ──────────────────────────────────────────────
const CARD_SHADOW = {
  shadowColor: '#1E293B',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

const reveal = (anim: Animated.Value, offset = 30) => ({
  opacity: anim,
  transform: [
    {
      translateY: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [offset, 0],
      }),
    },
  ],
});

// ── Avatar ────────────────────────────────────────────────
function ProfileAvatar() {
  return (
    <View className="items-center py-6">
      {/* Avatar circle */}
      <View
        className="h-24 w-24 items-center justify-center rounded-full"
        style={{
          backgroundColor: '#FEF2F2',
          borderWidth: 3,
          borderColor: '#E53935',
        }}
      >
        <Text className="text-[32px] font-bold text-[#E53935]">SC</Text>
      </View>

      {/* Edit badge */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="absolute"
        style={{ top: 86, right: '34%' }}
      >
        <View
          className="h-7 w-7 items-center justify-center rounded-full border-2 border-white"
          style={{ backgroundColor: '#E53935' }}
        >
          <Ionicons name="pencil" size={12} color="#FFF" />
        </View>
      </TouchableOpacity>

      <Text className="mt-4 text-[20px] font-bold text-[#1E293B]">Saroj Chauhan</Text>
      <Text className="mt-0.5 text-[13px] text-[#64748B]">Professional Caregiver</Text>

      <View className="mt-2 flex-row items-center gap-1">
        <Ionicons name="location-outline" size={13} color="#94A3B8" />
        <Text className="text-[12px] text-[#94A3B8]">New Delhi, India</Text>
      </View>

      {/* Verified badge */}
      <View className="mt-3 flex-row items-center gap-1.5 rounded-full bg-[#F0FDF4] px-3 py-1">
        <Ionicons name="shield-checkmark" size={13} color="#16A34A" />
        <Text className="text-[11.5px] font-semibold text-[#16A34A]">Verified Caregiver</Text>
      </View>
    </View>
  );
}

// ── Stats Row ─────────────────────────────────────────────
function StatsRow() {
  return (
    <View
      className="mx-6 mb-5 flex-row rounded-3xl border border-[#E2E8F0] bg-white p-4"
      style={CARD_SHADOW}
    >
      {STATS.map((item, idx) => (
        <View
          key={item.label}
          className={`flex-1 items-center ${
            idx !== STATS.length - 1 ? 'border-r border-[#F1F5F9]' : ''
          }`}
        >
          <View
            className="h-9 w-9 items-center justify-center rounded-2xl"
            style={{ backgroundColor: item.bg }}
          >
            <Ionicons name={item.icon} size={16} color={item.tint} />
          </View>
          <Text className="mt-1.5 text-[16px] font-bold text-[#1E293B]">{item.value}</Text>
          <Text className="text-[10.5px] text-[#94A3B8]">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

// ── Setting Row ───────────────────────────────────────────
function SettingRow({
  item,
  onToggle,
}: {
  item: SettingItem;
  onToggle?: (id: string, val: boolean) => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={item.type === 'arrow' ? 0.7 : 1}
      className="flex-row items-center px-4 py-3.5"
    >
      <View
        className="h-9 w-9 items-center justify-center rounded-2xl"
        style={{ backgroundColor: item.bg }}
      >
        <Ionicons name={item.icon} size={17} color={item.tint} />
      </View>
      <Text className="ml-3 flex-1 text-[13.5px] font-medium text-[#1E293B]">
        {item.label}
      </Text>
      {item.type === 'arrow' ? (
        <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
      ) : (
        <Switch
          value={item.value}
          onValueChange={(val) => onToggle?.(item.id, val)}
          trackColor={{ false: '#E2E8F0', true: '#E53935' }}
          thumbColor="#FFF"
        />
      )}
    </TouchableOpacity>
  );
}

// ── Settings Group ────────────────────────────────────────
function SettingsGroup({
  title,
  items,
  onToggle,
}: {
  title: string;
  items: SettingItem[];
  onToggle?: (id: string, val: boolean) => void;
}) {
  return (
    <View className="mx-6 mb-4">
      <Text className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-[#94A3B8]">
        {title}
      </Text>
      <View
        className="rounded-3xl border border-[#E2E8F0] bg-white overflow-hidden"
        style={CARD_SHADOW}
      >
        {items.map((item, idx) => (
          <View key={item.id}>
            <SettingRow item={item} onToggle={onToggle} />
            {idx !== items.length - 1 && (
              <View className="mx-4 border-b border-[#F1F5F9]" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Props ─────────────────────────────────────────────────
interface CaregiverProfileContentProps {
  anim: Animated.Value;
}

// ── Main Export ───────────────────────────────────────────
export default function CaregiverProfileContent({ anim }: CaregiverProfileContentProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(false);

  const accountItems: SettingItem[] = [
    { id: 'personal',   icon: 'person-outline',      label: 'Personal Information', tint: '#1E88E5', bg: '#EFF6FF', type: 'arrow' },
    { id: 'experience', icon: 'briefcase-outline',   label: 'Experience & Skills',  tint: '#7C3AED', bg: '#F5F3FF', type: 'arrow' },
    { id: 'documents',  icon: 'document-text-outline', label: 'My Documents',       tint: '#16A34A', bg: '#F0FDF4', type: 'arrow' },
    { id: 'payment',    icon: 'card-outline',         label: 'Payment Details',      tint: '#E53935', bg: '#FEF2F2', type: 'arrow' },
  ];

  const preferenceItems: SettingItem[] = [
    { id: 'notifications', icon: 'notifications-outline', label: 'Push Notifications', tint: '#F59E0B', bg: '#FFFBEB', type: 'toggle', value: notifications },
    { id: 'location',      icon: 'location-outline',      label: 'Location Access',    tint: '#1E88E5', bg: '#EFF6FF', type: 'toggle', value: locationAccess },
    { id: 'language',      icon: 'language-outline',      label: 'Language',           tint: '#7C3AED', bg: '#F5F3FF', type: 'arrow' },
  ];

  const supportItems: SettingItem[] = [
    { id: 'help',    icon: 'help-circle-outline', label: 'Help & Support', tint: '#16A34A', bg: '#F0FDF4', type: 'arrow' },
    { id: 'privacy', icon: 'lock-closed-outline', label: 'Privacy Policy', tint: '#64748B', bg: '#F8FAFF', type: 'arrow' },
    { id: 'about',   icon: 'information-circle-outline', label: 'About App', tint: '#94A3B8', bg: '#F1F5F9', type: 'arrow' },
  ];

  const handleToggle = (id: string, val: boolean) => {
    if (id === 'notifications') setNotifications(val);
    if (id === 'location') setLocationAccess(val);
  };

  return (
    <Animated.View style={[{ flex: 1 }, reveal(anim)]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProfileAvatar />
        <StatsRow />

        <SettingsGroup title="Account"      items={accountItems}     onToggle={handleToggle} />
        <SettingsGroup title="Preferences"  items={preferenceItems}  onToggle={handleToggle} />
        <SettingsGroup title="Support"      items={supportItems} />

        {/* Logout */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="mx-6 mb-6 flex-row items-center justify-center gap-2 rounded-3xl border border-[#FEE2E2] bg-[#FEF2F2] py-4"
        >
          <Ionicons name="log-out-outline" size={18} color="#E53935" />
          <Text className="text-[14px] font-bold text-[#E53935]">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}