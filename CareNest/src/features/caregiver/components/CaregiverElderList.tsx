import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AddElderForm from './AddElderForm';
import { getMyElders, ElderResponse } from '../services/caregiverService'; // ⚠️ adjust path

// ── Types ────────────────────────────────────────────────
interface Elder {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'stable' | 'attention' | 'critical';
  lastChecked: string;
  initials: string;
  avatarBg: string;
}

// ── Status config ─────────────────────────────────────────
const STATUS_CONFIG = {
  stable: { label: 'Stable', color: '#16A34A', bg: '#F0FDF4' },
  attention: { label: 'Attention', color: '#D97706', bg: '#FFFBEB' },
  critical: { label: 'Critical', color: '#E53935', bg: '#FEF2F2' },
};

// ── Avatar colors (cycled per elder) ─────────────────────
const AVATAR_COLORS = ['#EFF6FF', '#F0FDF4', '#FFFBEB', '#FDF2F8', '#F5F3FF'];

// ── API response → Card shape mapper ─────────────────────
function mapElderToCard(elder: ElderResponse, index: number): Elder {
  return {
    id: elder.id,
    name: elder.fullName,
    age: elder.age,
    condition: elder.relationship,
    status: 'stable',
    lastChecked: 'Not checked yet',
    initials:
      elder.fullName
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || '?',
    avatarBg: AVATAR_COLORS[index % AVATAR_COLORS.length],
  };
}

// ── Elder Card ────────────────────────────────────────────
function ElderCard({ item }: { item: Elder }) {
  const router = useRouter();
  const status = STATUS_CONFIG[item.status];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/caregiver/elderDetail?id=${item.id}` as any)}
      className="mb-3 flex-row items-center rounded-3xl border border-[#E2E8F0] bg-white p-4"
      style={{
        shadowColor: '#1E293B',
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* Avatar */}
      <View
        className="h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: item.avatarBg }}
      >
        <Text className="text-[15px] font-bold text-[#1E293B]">{item.initials}</Text>
      </View>

      {/* Info */}
      <View className="ml-3 flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-[14px] font-bold text-[#1E293B]">{item.name}</Text>
          <View
            className="rounded-full px-2.5 py-0.5"
            style={{ backgroundColor: status.bg }}
          >
            <Text className="text-[11px] font-semibold" style={{ color: status.color }}>
              {status.label}
            </Text>
          </View>
        </View>
        <Text className="mt-0.5 text-[12px] text-[#64748B]">
          Age {item.age} • {item.condition}
        </Text>
        <View className="mt-1.5 flex-row items-center">
          <Ionicons name="time-outline" size={11} color="#94A3B8" />
          <Text className="ml-1 text-[11px] text-[#94A3B8]">
            Last checked {item.lastChecked}
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
}

// ── Loading State ─────────────────────────────────────────
function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <ActivityIndicator size="large" color="#E53935" />
      <Text className="mt-3 text-[13px] text-[#94A3B8]">Loading elders...</Text>
    </View>
  );
}

// ── Error State ───────────────────────────────────────────
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View className="items-center py-16">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-[#FEF2F2]">
        <Ionicons name="cloud-offline-outline" size={36} color="#E53935" />
      </View>
      <Text className="mt-4 text-[15px] font-bold text-[#1E293B]">Something went wrong</Text>
      <Text className="mt-1 text-center text-[13px] text-[#94A3B8]">{message}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onRetry}
        className="mt-5 rounded-2xl bg-[#E53935] px-6 py-3"
      >
        <Text className="text-[14px] font-bold text-white">Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Empty State ───────────────────────────────────────────
function EmptyState() {
  return (
    <View className="items-center py-16">
      <View className="h-20 w-20 items-center justify-center rounded-full bg-[#F1F5F9]">
        <Ionicons name="people-outline" size={36} color="#94A3B8" />
      </View>
      <Text className="mt-4 text-[15px] font-bold text-[#1E293B]">No elders yet</Text>
      <Text className="mt-1 text-center text-[13px] text-[#94A3B8]">
        Tap the + button to add your first elder
      </Text>
    </View>
  );
}

// ── Props ─────────────────────────────────────────────────
interface CaregiverElderListProps {
  anim: Animated.Value;
}

// ── Main Export ───────────────────────────────────────────
export default function CaregiverElderList({ anim }: CaregiverElderListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [elders, setElders] = useState<Elder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch elder list from API ──
  const loadElders = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    setError(null);

    try {
      const data = await getMyElders();
      setElders(data.map(mapElderToCard));
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load elders. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    loadElders();
  }, []);

  // ── After successful add → prepend & close modal ──
  const handleElderAdded = (elder: ElderResponse) => {
    setElders((prev) => [mapElderToCard(elder, 0), ...prev]);
    setShowAddForm(false);
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
        ],
      }}
    >
      {/* ── Loading / Error / List ── */}
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => loadElders()} />
      ) : (
        <FlatList
          data={elders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ElderCard item={item} />}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadElders(true)}
              tintColor="#E53935"
              colors={['#E53935']}
            />
          }
          ListHeaderComponent={
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-[13px] text-[#64748B]">
                {elders.length} elder{elders.length !== 1 ? 's' : ''} assigned
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-[13px] font-semibold text-[#1E88E5]">Filter</Text>
              </TouchableOpacity>
            </View>
          }
          ListEmptyComponent={<EmptyState />}
        />
      )}

      {/* FAB — Add Elder */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setShowAddForm(true)}
        className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full"
        style={{
          backgroundColor: '#E53935',
          shadowColor: '#E53935',
          shadowOpacity: 0.4,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Add Elder Form Modal */}
      <Modal
        visible={showAddForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddForm(false)}
      >
        <AddElderForm
          onClose={() => setShowAddForm(false)}
          onElderAdded={handleElderAdded}
        />
      </Modal>
    </Animated.View>
  );
}