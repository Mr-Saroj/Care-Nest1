import { useEffect, useRef, useState } from 'react';
import { Animated, Alert } from 'react-native';

// ── Constants & Data ────────────────────────────────────────────
// Add more roles here later (e.g., 'Elder', 'Doctor', 'Nurse')
export const ROLES = ['Caregiver'];

export const DROPDOWN_ITEM_HEIGHT = 48;
const DROPDOWN_DURATION = 200;

export interface RegisterData {
  name: string;
  role: string;
  email: string;
  mobile: string;
}

interface UseRegisterOptions {
  onRegister?: (data: RegisterData) => void;
}

// ── Hook ────────────────────────────────────────────────────────
export function useRegister({ onRegister }: UseRegisterOptions = {}) {
  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  // UI state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Field entry animations
  const roleAnim = useRef(new Animated.Value(0)).current;
  const nameAnim = useRef(new Animated.Value(0)).current;
  const emailAnim = useRef(new Animated.Value(0)).current;
  const mobileAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;
  const dividerAnim = useRef(new Animated.Value(0)).current;
  const googleAnim = useRef(new Animated.Value(0)).current;

  // Dropdown open/close animation (no native driver — animates height)
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const dropdownHeight = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ROLES.length * DROPDOWN_ITEM_HEIGHT],
  });
  const dropdownOpacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Entry animations (fast: parallel + staggered delays)
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
      spring(roleAnim, 0),
      spring(nameAnim, 30),
      spring(emailAnim, 60),
      spring(mobileAnim, 90),
      spring(btnAnim, 120),
      spring(dividerAnim, 150),
      spring(googleAnim, 180),
    ]).start();
  }, []);

  const translateY = (anim: Animated.Value) =>
    anim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] });

  // ── Handlers ──────────────────────────────────────────────────
  const toggleDropdown = () => {
    const toValue = dropdownOpen ? 0 : 1;
    setDropdownOpen(!dropdownOpen);
    Animated.timing(dropdownAnim, {
      toValue,
      duration: DROPDOWN_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const selectRole = (selected: string) => {
    setRole(selected);
    setDropdownOpen(false);
    Animated.timing(dropdownAnim, {
      toValue: 0,
      duration: DROPDOWN_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  // Digits only, max 15 chars
  const handleMobileChange = (text: string) =>
    setMobile(text.replace(/[^0-9]/g, ''));

  const handleRegister = () => {
    if (!name.trim() || !role || !email.trim() || !mobile.trim()) {
      Alert.alert('Missing Details', 'Please fill in all fields.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (mobile.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid mobile number.');
      return;
    }
    onRegister?.({ name, role, email, mobile });
  };

  return {
    // Form state
    name,
    setName,
    role,
    email,
    setEmail,
    mobile,
    // UI state
    dropdownOpen,
    focusedField,
    // Handlers
    toggleDropdown,
    selectRole,
    handleFocus,
    handleBlur,
    handleMobileChange,
    handleRegister,
    // Animations
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
  };
}