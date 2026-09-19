declare const process: {
  env: Record<string, string | undefined>;
};

export const API_BASE_URL =
  `${process.env.EXPO_PUBLIC_API_BASE_URL}/api`;

import { getToken, clearAuthData } from './secureStorage';
import { router } from 'expo-router';

export async function apiRequest(
  path: string,
  options?: RequestInit
) {
  // 1. Try to get token from SecureStore
  const token = await getToken();

  // console.log("API PATH:", path);
  // console.log("JWT TOKEN:", token);

  // 2. Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> ?? {}),
  };

  // 3. Attach JWT token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // console.log(
  //   "AUTHORIZATION HEADER:",
  //   headers['Authorization']
  // );

  // 4. Make the request
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // 5. Debug response status
  // console.log("RESPONSE STATUS:", response.status);

  // 6. Token expired or invalid → force logout
  if (response.status === 401) {

    // Only protected APIs should trigger logout
    if (!path.startsWith('/auth/')) {
      await clearAuthData();
      router.replace('/auth/login');

      throw new Error(
        'Session expired. Please login again.'
      );
    }

    // Login/register 401 should be handled normally
    const err = await response.json().catch(() => ({}));

    throw new Error(
      err.message || 'Invalid email or password.'
    );
  }

  // 7. Other errors
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));

    throw new Error(
      err.message || 'Something went wrong.'
    );
  }

  return response.json();
}