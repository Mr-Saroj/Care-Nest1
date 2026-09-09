import { useState } from 'react';
import { Alert } from 'react-native';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Details',
        'Please enter your email and password.'
      );
      return;
    }

    console.log('Login:', { email, password });
  };
  const handleGoogleLogin = () => {
    console.log('Continue with Google pressed');
    // TODO: trigger Google OAuth flow here
    // e.g. call your auth service / expo-auth-session logic
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
    togglePasswordVisibility,
    handleLogin,
    handleGoogleLogin,
    handleForgotPassword,
  };
}