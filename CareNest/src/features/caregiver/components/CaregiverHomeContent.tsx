import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ── Theme ─────────────────────────────────────────────────
const COLORS = {
  primary: '#E53935',
  secondary: '#1E88E5',
};

const CARD_SHADOW = {
  shadowColor: '#1E293B',
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

// ── Types ────────────────────────────────────────────────
type IconName = keyof typeof Ionicons.glyphMap;

interface QuickAction {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  tint: string;
  bg: string;
}

interface Activity {
  id: string;
  icon: IconName;
  color: string;
  bg: string;
  text: string;
  time: string;
}

// ── Data ─────────────────────────────────────────────────
const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'health',
    icon: 'pulse',
    title: 'Health',
    subtitle: 'All vitals normal',
    tint: COLORS.primary,
    bg: '#FEF2F2',
  },
  {
    id: 'appointments',
    icon: 'calendar',
    title: 'Appointment',
    subtitle: 'Today • 5:00 PM',
    tint: COLORS.secondary,
    bg: '#EFF6FF',
  },
  {
    id: 'reports',
    icon: 'document-text',
    title: 'Reports',
    subtitle: '2 new reports',
    tint: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    id: 'consult',
    icon: 'chatbubbles',
    title: 'Consult',
    subtitle: 'Talk to a doctor',
    tint: '#16A34A',
    bg: '#F0FDF4',
  },
];

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    icon: 'water',
    color: COLORS.secondary,
    bg: '#EFF6FF',
    text: 'Blood pressure recorded — 128/82',
    time: '2h ago',
  },
  {
    id: '2',
    icon: 'checkmark-circle',
    color: '#16A34A',
    bg: '#F0FDF4',
    text: 'Morning medicines taken on time',
    time: '5h ago',
  },
  {
    id: '3',
    icon: 'document-text',
    color: '#7C3AED',
    bg: '#F5F3FF',
    text: 'Dr. Sharma uploaded a report',
    time: 'Yesterday',
  },
];

// ── Helpers ──────────────────────────────────────────────
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

// ── Medicine Summary ──────────────────────────────────────
function MedicineSummary({ anim }: { anim: Animated.Value }) {
  const taken = 3;
  const total = 4;
  const pct = Math.round((taken / total) * 100);

  return (
    <Animated.View style={reveal(anim)} className="mx-6 mb-5 mt-5">
      <View
        className="rounded-3xl p-[18px]"
        style={{
          backgroundColor: COLORS.primary,
          shadowColor: COLORS.primary,
          shadowOpacity: 0.35,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="medical" size={22} color="#FFF" />
          </View>
          <TouchableOpacity
            activeOpacity={0.85}
            className="flex-row items-center rounded-full bg-white px-3.5 py-2"
          >
            <Ionicons name="notifications" size={13} color={COLORS.primary} />
            <Text className="ml-1.5 text-[12px] font-bold text-[#E53935]">Remind</Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-3 text-[17px] font-bold text-white">
          3 of 4 medicines taken
        </Text>
        <Text className="mt-0.5 text-[12.5px] text-white/85">
          Next dose: Amlodipine 5mg at 8:00 PM
        </Text>

        <View className="mt-3.5">
          <View className="h-2 overflow-hidden rounded-full bg-white/25">
            <View className="h-2 rounded-full bg-white" style={{ width: `${pct}%` }} />
          </View>
          <View className="mt-1.5 flex-row justify-between">
            <Text className="text-[10.5px] font-medium text-white/75">Morning ✅</Text>
            <Text className="text-[10.5px] font-medium text-white/75">Noon ✅</Text>
            <Text className="text-[10.5px] font-medium text-white/75">Evening ⏰</Text>
            <Text className="text-[10.5px] font-medium text-white/75">Night</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// ── Section Header ────────────────────────────────────────
function SectionHeader({ title, anim }: { title: string; anim: Animated.Value }) {
  return (
    <Animated.View
      style={reveal(anim)}
      className="mx-6 mb-3 flex-row items-center justify-between"
    >
      <Text className="text-[16px] font-bold tracking-[-0.3px] text-[#1E293B]">{title}</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text className="text-[13px] font-semibold text-[#1E88E5]">See All</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Quick Action Cards ────────────────────────────────────
function ActionCard({ item, onPress }: { item: QuickAction; onPress: (id: string) => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item.id)}
      className="flex-1 rounded-3xl border border-[#E2E8F0] bg-white p-4"
      style={CARD_SHADOW}
    >
      <View className="flex-row items-start justify-between">
        <View
          className="h-10 w-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: item.bg }}
        >
          <Ionicons name={item.icon} size={19} color={item.tint} />
        </View>
        <Ionicons name="chevron-forward" size={15} color="#CBD5E1" />
      </View>
      <Text className="mt-3 text-[14px] font-bold text-[#1E293B]">{item.title}</Text>
      <Text className="mt-0.5 text-[11.5px] text-[#94A3B8]" numberOfLines={1}>
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  );
}

function QuickGrid({ anim, onPress }: { anim: Animated.Value; onPress: (id: string) => void }) {
  const row1 = QUICK_ACTIONS.slice(0, 2);
  const row2 = QUICK_ACTIONS.slice(2, 4);

  return (
    <Animated.View style={reveal(anim)} className="mx-6 mb-5">
      <View className="mb-3 flex-row gap-3">
        {row1.map((item) => <ActionCard key={item.id} item={item} onPress={onPress} />)}
      </View>
      <View className="flex-row gap-3">
        {row2.map((item) => <ActionCard key={item.id} item={item} onPress={onPress} />)}
      </View>
    </Animated.View>
  );
}

// ── Recent Activity ───────────────────────────────────────
function ActivityList({ anim }: { anim: Animated.Value }) {
  return (
    <Animated.View style={reveal(anim)} className="mx-6 mb-6">
      <View className="rounded-3xl border border-[#E2E8F0] bg-white p-2" style={CARD_SHADOW}>
        {ACTIVITIES.map((item, idx) => (
          <View
            key={item.id}
            className={`flex-row items-center px-2.5 py-3 ${
              idx !== ACTIVITIES.length - 1 ? 'border-b border-[#F1F5F9]' : ''
            }`}
          >
            <View
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: item.bg }}
            >
              <Ionicons name={item.icon} size={16} color={item.color} />
            </View>
            <Text className="ml-3 flex-1 text-[13px] text-[#475569]" numberOfLines={1}>
              {item.text}
            </Text>
            <Text className="ml-2 text-[11px] text-[#94A3B8]">{item.time}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

// ── Props ─────────────────────────────────────────────────
interface CaregiverHomeContentProps {
  medicineAnim: Animated.Value;
  gridTitleAnim: Animated.Value;
  gridAnim: Animated.Value;
  activityTitleAnim: Animated.Value;
  activityAnim: Animated.Value;
  onActionPress: (id: string) => void;
}

// ── Main Export ───────────────────────────────────────────
export default function CaregiverHomeContent({
  medicineAnim,
  gridTitleAnim,
  gridAnim,
  activityTitleAnim,
  activityAnim,
  onActionPress,
}: CaregiverHomeContentProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <MedicineSummary anim={medicineAnim} />

      <SectionHeader title="Quick Access" anim={gridTitleAnim} />
      <QuickGrid anim={gridAnim} onPress={onActionPress} />

      <SectionHeader title="Recent Activity" anim={activityTitleAnim} />
      <ActivityList anim={activityAnim} />
    </ScrollView>
  );
}