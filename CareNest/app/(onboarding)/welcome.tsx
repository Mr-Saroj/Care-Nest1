import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;
  const loginAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(logoAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(titleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 60,
        useNativeDriver: true,
      }),
      Animated.spring(subtitleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 80,
        useNativeDriver: true,
      }),
      Animated.spring(descAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 80,
        useNativeDriver: true,
      }),
      Animated.spring(btnAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 80,
        useNativeDriver: true,
      }),
      Animated.spring(loginAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const translateY = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F8FAFF"
        translucent={false}
      />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        {/* Decorative background circles */}
        <View style={[styles.circle1]} />
        <View style={[styles.circle2]} />
        <View style={[styles.circle3, { top: height * 0.35 }]} />

        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            { marginTop: height * 0.06 },
            {
              opacity: logoAnim,
              transform: [
                { translateY: translateY(logoAnim) },
                { scale: logoAnim },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/app_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Brand Name */}
        <Animated.View
          style={[
            styles.brandRow,
            {
              opacity: titleAnim,
              transform: [{ translateY: translateY(titleAnim) }],
            },
          ]}
        >
          <Text style={styles.brandRed}>Care</Text>
          <Text style={styles.brandBlue}>Nest</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.taglineRow,
            {
              opacity: subtitleAnim,
              transform: [{ translateY: translateY(subtitleAnim) }],
            },
          ]}
        >
          <Text style={styles.taglineEmoji}>❤️</Text>
          <Text style={styles.taglineText}>Care</Text>
          <Text style={styles.taglineDot}>•</Text>
          <Text style={styles.taglineText}>Connect</Text>
        </Animated.View>

        {/* Illustration */}
        <Animated.View
          style={[
            { marginBottom: 28 },
            {
              opacity: subtitleAnim,
              transform: [{ translateY: translateY(subtitleAnim) }],
            },
          ]}
        >
          <View style={styles.illustrationCircle}>
            {/* Shield */}
            <View style={styles.shield}>
              <View style={styles.crossH} />
              <View style={styles.crossV} />
              {/* Heart */}
              <View style={styles.heartRow}>
                <View style={styles.heartLeft} />
                <View style={styles.heartRight} />
                <View style={styles.heartTriangle} />
              </View>
            </View>
            {/* Floating dots */}
            <View style={[styles.dot, { top: 10, left: 16, width: 6, height: 6, backgroundColor: '#3B82F6', opacity: 0.4 }]} />
            <View style={[styles.dot, { top: 24, right: 20, width: 8, height: 8, backgroundColor: '#3B82F6', opacity: 0.4 }]} />
            <View style={[styles.dot, { bottom: 20, left: 24, width: 6, height: 6, backgroundColor: '#E53935', opacity: 0.4 }]} />
            <View style={[styles.dot, { bottom: 10, right: 16, width: 10, height: 10, backgroundColor: '#1E88E5', opacity: 0.4 }]} />
            <View style={[styles.dotBorder, { top: 4, right: 28, width: 12, height: 12, borderColor: '#93C5FD', opacity: 0.5 }]} />
            <View style={[styles.dotBorder, { bottom: 16, left: 10, width: 16, height: 16, borderColor: '#E53935', opacity: 0.5 }]} />
          </View>
        </Animated.View>

        {/* Heading */}
        <Animated.View
          style={[
            styles.headingContainer,
            {
              opacity: descAnim,
              transform: [{ translateY: translateY(descAnim) }],
            },
          ]}
        >
          <Text style={styles.heading}>Your Loved Ones,</Text>
          <Text style={styles.heading}>Always Cared For</Text>
        </Animated.View>

        {/* Description */}
        <Animated.View
          style={{
            opacity: descAnim,
            transform: [{ translateY: translateY(descAnim) }],
          }}
        >
          <Text style={styles.description}>
            Smart healthcare support{'\n'}for elders and caregivers.
          </Text>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View
          style={[
            styles.btnContainer,
            {
              opacity: btnAnim,
              transform: [{ translateY: translateY(btnAnim) }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/(onboarding)/role-selection')}
            style={styles.getStartedBtn}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Text style={styles.getStartedArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Login Link */}
        <Animated.View
          style={[
            styles.loginRow,
            {
              opacity: loginAnim,
              transform: [{ translateY: translateY(loginAnim) }],
            },
          ]}
        >
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{ flex: 1 }} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    paddingHorizontal: 32,
    overflow: 'hidden',
  },

  // Decorative circles
  circle1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(59,130,246,0.06)',
    top: -60,
    right: -80,
  },
  circle2: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(239,68,68,0.04)',
    bottom: 100,
    left: -100,
  },
  circle3: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(59,130,246,0.05)',
    right: -40,
  },

  // Logo
  logoContainer: {
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },

  // Brand
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  brandRed: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E53935',
    letterSpacing: -0.5,
  },
  brandBlue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E88E5',
    letterSpacing: -0.5,
  },

  // Tagline
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  taglineEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  taglineText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  taglineDot: {
    fontSize: 14,
    color: '#CBD5E1',
    marginHorizontal: 6,
  },

  // Illustration
  illustrationCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F0F7FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.08)',
  },
  shield: {
    width: 70,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#93C5FD',
  },
  crossH: {
    position: 'absolute',
    width: 36,
    height: 12,
    backgroundColor: '#E53935',
    borderRadius: 2,
  },
  crossV: {
    position: 'absolute',
    width: 12,
    height: 36,
    backgroundColor: '#E53935',
    borderRadius: 2,
  },
  heartRow: {
    position: 'absolute',
    bottom: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  heartLeft: {
    width: 14,
    height: 14,
    backgroundColor: '#E53935',
    borderRadius: 7,
    marginRight: -4,
    transform: [{ rotate: '-45deg' }],
  },
  heartRight: {
    width: 14,
    height: 14,
    backgroundColor: '#E53935',
    borderRadius: 7,
    marginLeft: -4,
    transform: [{ rotate: '45deg' }],
  },
  heartTriangle: {
    position: 'absolute',
    bottom: -2,
    left: 3,
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderLeftColor: 'transparent',
    borderRightWidth: 9,
    borderRightColor: 'transparent',
    borderTopWidth: 14,
    borderTopColor: '#E53935',
  },
  dot: {
    position: 'absolute',
    borderRadius: 99,
  },
  dotBorder: {
    position: 'absolute',
    borderRadius: 99,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },

  // Heading
  headingContainer: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
  },

  // Description
  description: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 10,
    letterSpacing: 0.3,
  },

  // Button
  btnContainer: {
    width: '100%',
    marginTop: 48,
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    marginBottom: 16,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
  getStartedArrow: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },

  // Login
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  loginLink: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});