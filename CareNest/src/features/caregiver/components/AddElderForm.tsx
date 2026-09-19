import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addElder, ElderResponse } from '../services/caregiverService'; // ⚠️ adjust path

// ── Relation options ─────────────────────────────────────
const RELATIONS = [
  'Father',
  'Mother',
  'Grandfather',
  'Grandmother',
  'Uncle',
  'Aunt',
  'Other',
];

// ── Field Label ──────────────────────────────────────────
function FieldLabel({ text }: { text: string }) {
  return (
    <Text className="mb-2 text-[13px] font-semibold text-[#1E293B]">
      {text}
    </Text>
  );
}

// ── Props ────────────────────────────────────────────────
interface AddElderFormProps {
  onClose: () => void;
  onElderAdded?: (elder: ElderResponse) => void;
}

// ── Main Component ───────────────────────────────────────
export default function AddElderForm({ onClose, onElderAdded }: AddElderFormProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [relation, setRelation] = useState<string | null>(null);
  const [language, setLanguage] = useState<'English' | 'Odia'>('English');

  // API states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Numeric-only handlers
  const handleMobileChange = (text: string) =>
    setMobile(text.replace(/[^0-9]/g, '').slice(0, 10));

  const handleAgeChange = (text: string) =>
    setAge(text.replace(/[^0-9]/g, '').slice(0, 3));

  const isFormValid =
    name.trim() !== '' && mobile.length === 10 && age !== '' && relation !== null;

  // ── Submit → call API ──
  const handleSubmit = async () => {
    if (!isFormValid || relation === null || loading) return;

    setLoading(true);
    setError(null);

    try {
      const elder = await addElder({
        fullName: name.trim(),                              // name        → fullName
        mobile,                                             // mobile      → mobile
        age: parseInt(age, 10),                             // "72"        → 72 (number)
        relationship: relation,                             // "Father"    → relationship
        preferredLanguage: language === 'English' ? 'ENGLISH' : 'ODIA', // → enum
      });

      onElderAdded?.(elder); // pass API response back to list page
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add elder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F8FAFC' }}
    >
      {/* ── Header ── */}
      <View className="flex-row items-center justify-between border-b border-[#E2E8F0] bg-white px-5 pb-4 pt-14">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onClose}
          disabled={loading}
          className="h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9]"
        >
          <Ionicons name="close" size={20} color="#475569" />
        </TouchableOpacity>
        <Text className="text-[16px] font-bold text-[#1E293B]">Add Elder</Text>
        <View className="h-9 w-9" />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Elder Name ── */}
        <FieldLabel text="Elder Name" />
        <View className="mb-5 flex-row items-center rounded-2xl border border-[#E2E8F0] bg-white px-4">
          <Ionicons name="person-outline" size={18} color="#94A3B8" />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter elder's full name"
            placeholderTextColor="#94A3B8"
            editable={!loading}
            className="ml-3 flex-1 py-3.5 text-[14px] text-[#1E293B]"
          />
        </View>

        {/* ── Mobile Number ── */}
        <FieldLabel text="Mobile Number" />
        <View className="mb-5 flex-row items-center rounded-2xl border border-[#E2E8F0] bg-white px-4">
          <Ionicons name="call-outline" size={18} color="#94A3B8" />
          <Text className="ml-3 text-[14px] text-[#64748B]">+91</Text>
          <TextInput
            value={mobile}
            onChangeText={handleMobileChange}
            placeholder="10-digit mobile number"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={10}
            editable={!loading}
            className="ml-2 flex-1 py-3.5 text-[14px] text-[#1E293B]"
          />
          {mobile.length === 10 && (
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
          )}
        </View>

        {/* ── Age ── */}
        <FieldLabel text="Age" />
        <View className="mb-5 flex-row items-center rounded-2xl border border-[#E2E8F0] bg-white px-4">
          <Ionicons name="calendar-outline" size={18} color="#94A3B8" />
          <TextInput
            value={age}
            onChangeText={handleAgeChange}
            placeholder="Enter age"
            placeholderTextColor="#94A3B8"
            keyboardType="number-pad"
            maxLength={3}
            editable={!loading}
            className="ml-3 flex-1 py-3.5 text-[14px] text-[#1E293B]"
          />
          {age !== '' && <Text className="text-[13px] text-[#94A3B8]">years</Text>}
        </View>

        {/* ── Relation ── */}
        <FieldLabel text="Relation" />
        <View className="mb-5 flex-row flex-wrap">
          {RELATIONS.map((r) => {
            const active = relation === r;
            return (
              <TouchableOpacity
                key={r}
                activeOpacity={0.7}
                onPress={() => setRelation(r)}
                disabled={loading}
                className="mb-2.5 mr-2.5 rounded-full px-4 py-2"
                style={{
                  backgroundColor: active ? '#E53935' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: active ? '#E53935' : '#E2E8F0',
                }}
              >
                <Text
                  className="text-[13px] font-medium"
                  style={{ color: active ? '#FFF' : '#64748B' }}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Preferred Language ── */}
        <FieldLabel text="Preferred Language" />
        <View className="mb-6 flex-row rounded-2xl border border-[#E2E8F0] bg-white p-1">
          {(['English', 'Odia'] as const).map((lang) => {
            const active = language === lang;
            return (
              <TouchableOpacity
                key={lang}
                activeOpacity={0.7}
                onPress={() => setLanguage(lang)}
                disabled={loading}
                className="flex-1 items-center rounded-xl py-2.5"
                style={{ backgroundColor: active ? '#1E88E5' : 'transparent' }}
              >
                <Text
                  className="text-[13px] font-semibold"
                  style={{ color: active ? '#FFF' : '#64748B' }}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Error Banner ── */}
        {error && (
          <View className="mb-4 flex-row items-center rounded-2xl bg-[#FEF2F2] px-4 py-3">
            <Ionicons name="alert-circle" size={18} color="#E53935" />
            <Text className="ml-2 flex-1 text-[13px] text-[#E53935]">{error}</Text>
          </View>
        )}

        {/* ── Submit Button ── */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={!isFormValid || loading}
          className="h-14 flex-row items-center justify-center rounded-2xl"
          style={{
            backgroundColor: !isFormValid || loading ? '#FCA5A5' : '#E53935',
            shadowColor: '#E53935',
            shadowOpacity: isFormValid && !loading ? 0.3 : 0,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: isFormValid && !loading ? 6 : 0,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text className="text-[15px] font-bold text-white">Add Elder</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}