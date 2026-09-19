import { useEffect, useRef, useState } from 'react';
import { Animated, Alert, Linking } from 'react-native';
import { registerUser } from '../services/authService';
import { router } from 'expo-router';
// import { GOOGLE_AUTH_URL } from '../../../services/api';
import * as WebBrowser from 'expo-web-browser';

export const ROLES = ['Caregiver'];

export const DROPDOWN_ITEM_HEIGHT = 48;
const DROPDOWN_DURATION = 200;

// ── Hook ────────────────────────────────────────────────────────
export function useRegister() {
  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

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

  const handleRegister = async () => {
    try {
      console.log('Register Data:', {
        name,
        role,
        email,
        mobile,
        password,
      });

      // Create payload
      const userData = {
        name,
        role: role.toUpperCase(),
        email,
        mobile,
        password,
      };

      // Call authService
      const response = await registerUser(userData);

      // Convert backend response JSON
      const result = await response.json();

      // Backend error
      if (!response.ok) {
        Alert.alert(
          'Registration Failed',
          result.message || 'Something went wrong'
        );

        return;
      }

      // Clear form after success
      setName('');
      setRole('');
      setEmail('');
      setMobile('');
      setPassword('');

      // Show backend message
      Alert.alert(
        'Success',
        result.message,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/auth/login'),
          },
        ]
      );

    } catch (error) {
      console.error('Registration Error:', error);

      Alert.alert(
        'Error',
        'Unable to connect to server'
      );
    }
  };
 

WebBrowser.maybeCompleteAuthSession();

const handleGoogleRegister = async () => {
  // try {
  //   const result = await WebBrowser.openAuthSessionAsync(
  //     `${GOOGLE_AUTH_URL}/oauth2/authorization/google`,
  //     'carenest://auth/google-success'  // redirect back to app
  //   );

  //   if (result.type === 'success') {
  //     router.replace('/auth/login');
  //   }
  // } catch (error) {
  //   console.error('Google Login Error:', error);
  //   Alert.alert('Error', 'Unable to open Google Sign In');
  // }
  console.log("Google button clicked..");
  
};

  return {
    // Form state
    name,
    setName,
    role,
    email,
    setEmail,
    mobile,
    password,
    setPassword,
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
    handleGoogleRegister,
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