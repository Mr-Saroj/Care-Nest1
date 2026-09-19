import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

import { loginUser } from '../services/authService';
import { saveAuthData, getToken } from '../../../services/secureStorage';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {

    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Details',
        'Please enter your email and password.'
      );
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // 1. LOGIN API
      // ==============================

      const data = await loginUser(
        email,
        password
      );

      console.log('LOGIN RESPONSE:', data);


      // ==============================
      // 2. GET TOKEN
      // ==============================

      const token = data.token;

      console.log('TOKEN FROM LOGIN:', token);

      if (!token || typeof token !== 'string') {
        throw new Error(
          'Invalid token received from server.'
        );
      }


      // ==============================
      // 3. DECODE JWT
      // ==============================

      const decoded = jwtDecode<JwtPayload>(token);

      console.log('DECODED JWT:', decoded);
      console.log('JWT EMAIL:', decoded.email);
      console.log('JWT ROLE:', decoded.role);
      console.log('JWT EXPIRATION:', decoded.exp);


      // ==============================
      // 4. SAVE TOKEN
      // ==============================

      await saveAuthData(token);

      console.log('TOKEN SAVED TO SECURESTORE');


      // ==============================
      // 5. VERIFY TOKEN WAS SAVED
      // ==============================

      const savedToken = await getToken();

      console.log(
        'TOKEN FROM SECURESTORE:',
        savedToken
      );


      // ==============================
      // 6. NAVIGATION
      // ==============================

      const role = decoded.role;

      console.log('NAVIGATING WITH ROLE:', role);

      if (role === 'CAREGIVER') {

        router.replace('/caregiver/home');

      } else if (role === 'ADMIN') {

        router.replace('/admin/dashboard');

      } else if (role === 'ELDER') {

        router.replace('/user/dashboard');

      } else {

        throw new Error('Invalid user role.');
      }

    } catch (error: any) {

      console.log('LOGIN ERROR:', error);

      Alert.alert(
        'Login Failed',
        error.message || 'Unable to login.'
      );

    } finally {

      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Continue with Google pressed');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    loading,
    togglePasswordVisibility,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword,
  };
}