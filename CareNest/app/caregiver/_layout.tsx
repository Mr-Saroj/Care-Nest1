import { Stack, useRouter } from 'expo-router';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

export default function CaregiverLayout() {
  const router = useRouter();

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        router.replace('/auth/login');
        return true;
      }
    );

    return () => subscription.remove();
  }, [router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: '#F5F7FA',
        },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="elderList" />
      <Stack.Screen name="appointments" />
    </Stack>
  );
}