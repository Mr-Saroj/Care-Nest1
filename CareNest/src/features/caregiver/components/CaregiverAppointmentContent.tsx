import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ── Types ────────────────────────────────────────────────
type IconName = keyof typeof Ionicons.glyphMap;

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: string;
  experience: string;
  availableToday: boolean;
  initials: string;
  avatarBg: string;
  tint: string;
  slots: string[];
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  initials: string;
  avatarBg: string;
}

// ── Data ─────────────────────────────────────────────────
const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    hospital: 'Apollo Hospital',
    rating: '4.9',
    experience: '15 yrs',
    availableToday: true,
    initials: 'AS',
    avatarBg: '#EFF6FF',
    tint: '#1E88E5',
    slots: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
  },
  {
    id: '2',
    name: 'Dr. Rakesh Verma',
    specialty: 'Neurologist',
    hospital: 'Fortis Hospital',
    rating: '4.7',
    experience: '12 yrs',
    availableToday: false,
    initials: 'RV',
    avatarBg: '#F5F3FF',
    tint: '#7C3AED',
    slots: ['9:00 AM', '1:00 PM', '3:30 PM'],
  },
  {
    id: '3',
    name: 'Dr. Priya Nair',
    specialty: 'Geriatrician',
    hospital: 'AIIMS Delhi',
    rating: '4.8',
    experience: '10 yrs',
    availableToday: true,
    initials: 'PN',
    avatarBg: '#F0FDF4',
    tint: '#16A34A',
    slots: ['11:00 AM', '12:30 PM', '5:00 PM'],
  },
];

const UPCOMING: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    date: 'Today',
    time: '5:00 PM',
    status: 'upcoming',
    initials: 'AS',
    avatarBg: '#EFF6FF',
  },
  {
    id: '2',
    doctorName: 'Dr. Priya Nair',
    specialty: 'Geriatrician',
    date: 'Tomorrow',
    time: '11:00 AM',
    status: 'upcoming',
    initials: 'PN',
    avatarBg: '#F0FDF4',
  },
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

// ── Upcoming Appointment Card ─────────────────────────────
function UpcomingCard({ item }: { item: Appointment }) {
  return (
    <View
      className="mr-3 w-64 rounded-3xl p-4"
      style={{
        backgroundColor: '#E53935',
        shadowColor: '#E53935',
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
      }}
    >
      <View className="flex-row items-center">
        <View
          className="h-10 w-10 items-center justify-center rounded-2xl bg-white/20"
        >
          <Text className="text-[13px] font-bold text-white">{item.initials}</Text>
        </View>
        <View className="ml-2.5 flex-1">
          <Text className="text-[13px] font-bold text-white" numberOfLines={1}>
            {item.doctorName}
          </Text>
          <Text className="text-[11px] text-white/80">{item.specialty}</Text>
        </View>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.8)" />
          <Text className="ml-1 text-[12px] text-white/80">{item.date}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.8)" />
          <Text className="ml-1 text-[12px] text-white/80">{item.time}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        className="mt-3 items-center rounded-2xl bg-white/20 py-2"
      >
        <Text className="text-[12px] font-bold text-white">View Details</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Doctor Card ───────────────────────────────────────────
function DoctorCard({
  item,
  onBook,
}: {
  item: Doctor;
  onBook: (doctor: Doctor) => void;
}) {
  return (
    <View
      className="mb-3 rounded-3xl border border-[#E2E8F0] bg-white p-4"
      style={CARD_SHADOW}
    >
      <View className="flex-row items-start">
        {/* Avatar */}
        <View
          className="h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: item.avatarBg }}
        >
          <Text className="text-[14px] font-bold" style={{ color: item.tint }}>
            {item.initials}
          </Text>
        </View>

        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-[14px] font-bold text-[#1E293B]">{item.name}</Text>
            {item.availableToday && (
              <View className="rounded-full bg-[#F0FDF4] px-2 py-0.5">
                <Text className="text-[10px] font-semibold text-[#16A34A]">Today</Text>
              </View>
            )}
          </View>
          <Text className="mt-0.5 text-[12px] text-[#64748B]">
            {item.specialty} • {item.hospital}
          </Text>

          <View className="mt-1.5 flex-row items-center gap-3">
            <View className="flex-row items-center">
              <Ionicons name="star" size={11} color="#F59E0B" />
              <Text className="ml-1 text-[11px] font-semibold text-[#1E293B]">
                {item.rating}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="briefcase-outline" size={11} color="#94A3B8" />
              <Text className="ml-1 text-[11px] text-[#64748B]">{item.experience}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Time Slots */}
      <View className="mt-3 flex-row flex-wrap gap-2">
        {item.slots.map((slot) => (
          <TouchableOpacity
            key={slot}
            activeOpacity={0.7}
            className="rounded-xl border border-[#E2E8F0] px-3 py-1.5"
          >
            <Text className="text-[11.5px] font-medium text-[#475569]">{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Book Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onBook(item)}
        className="mt-3 items-center rounded-2xl py-2.5"
        style={{ backgroundColor: '#E53935' }}
      >
        <Text className="text-[13px] font-bold text-white">Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Section Header ────────────────────────────────────────
function SectionHeader({ title, icon }: { title: string; icon: IconName }) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={16} color="#1E293B" />
        <Text className="text-[15px] font-bold text-[#1E293B]">{title}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text className="text-[13px] font-semibold text-[#1E88E5]">See All</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Props ─────────────────────────────────────────────────
interface CaregiverAppointmentContentProps {
  anim: Animated.Value;
}

// ── Main Export ───────────────────────────────────────────
export default function CaregiverAppointmentContent({ anim }: CaregiverAppointmentContentProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Cardiology', 'Neurology', 'Geriatrics'];

  const filteredDoctors =
    selectedSpecialty === 'All'
      ? DOCTORS
      : DOCTORS.filter((d) =>
          d.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase().slice(0, 5))
        );

  const handleBook = (doctor: Doctor) => {
    // TODO: open booking modal or navigate to booking screen
  };

  return (
    <Animated.View style={[{ flex: 1 }, reveal(anim)]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
      >
        {/* ── Upcoming ── */}
        <SectionHeader title="Upcoming" icon="calendar" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5 -mx-1"
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {UPCOMING.map((item) => (
            <UpcomingCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* ── Specialty Filter ── */}
        <SectionHeader title="Book a Doctor" icon="medkit" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 -mx-1"
          contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
        >
          {specialties.map((s) => {
            const active = s === selectedSpecialty;
            return (
              <TouchableOpacity
                key={s}
                activeOpacity={0.7}
                onPress={() => setSelectedSpecialty(s)}
                className="rounded-2xl px-4 py-2"
                style={{
                  backgroundColor: active ? '#E53935' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: active ? '#E53935' : '#E2E8F0',
                }}
              >
                <Text
                  className="text-[12.5px] font-semibold"
                  style={{ color: active ? '#FFF' : '#64748B' }}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Doctor List ── */}
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} item={doctor} onBook={handleBook} />
        ))}
      </ScrollView>
    </Animated.View>
  );
}