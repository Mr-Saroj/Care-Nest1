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

  // ==========================================
  // PUBLIC AUTH ENDPOINTS
  // ==========================================

  const isPublicEndpoint =
    path.startsWith('/auth/') ||
    path.startsWith('/elder-auth/');


  // ==========================================
  // 1. Get token from SecureStore
  // ==========================================

  const token = await getToken();


  // ==========================================
  // 2. Build headers
  // ==========================================

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> ?? {}),
  };


  // ==========================================
  // 3. Attach JWT only for protected APIs
  // ==========================================

  if (token && !isPublicEndpoint) {

    headers['Authorization'] =
      `Bearer ${token}`;
  }


  // ==========================================
  // 4. Make request
  // ==========================================

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      headers,
    }
  );
  console.log('API URL:', `${API_BASE_URL}${path}`);
  console.log('API STATUS:', response.status);


  // ==========================================
  // 5. Handle 401
  // ==========================================

  if (response.status === 401) {

    // Public authentication endpoints
    // should NOT logout the existing session.
    if (isPublicEndpoint) {

      const err =
        await response.json().catch(() => ({}));

      throw new Error(
        err.message ||
        'Authentication failed.'
      );
    }


    // Protected endpoint
    // means JWT is expired/invalid.
    await clearAuthData();

    router.replace('/auth/login');

    throw new Error(
      'Session expired. Please login again.'
    );
  }


  // ==========================================
  // 6. Other errors
  // ==========================================

  if (!response.ok) {

    const err =
      await response.json().catch(() => ({}));

    throw new Error(
      err.message ||
      'Something went wrong.'
    );
  }


  // ==========================================
  // 7. Return response
  // ==========================================

  return response.json();
}

