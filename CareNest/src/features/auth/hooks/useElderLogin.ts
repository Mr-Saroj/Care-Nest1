import { router } from 'expo-router/build/exports';
import { useState } from 'react';
import { Alert } from 'react-native';
import { verifyElderNumber, elderLogin } 
    from '../services/elderAuthService';

import { saveAuthData } 
    from '../../../services/secureStorage';

export type VerificationStatus = 'idle' | 'sending' | 'verified';

export function useElderLogin() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationStatus, setVerificationStatus] =
        useState<VerificationStatus>('idle');
    const [loading, setLoading] = useState(false);

    const isVerified = verificationStatus === 'verified';
    const isSending = verificationStatus === 'sending';

    const updatePhoneNumber = (text: string) => {
        const digits = text.replace(/[^0-9]/g, '');
        setPhoneNumber(digits);
        // If user edits the number after verifying → reset verification
        if (verificationStatus === 'verified') {
            setVerificationStatus('idle');
            setOtp('');
        }
    };

    const handleVerifyNumber = async () => {
    if (phoneNumber.trim().length !== 10) {
        Alert.alert(
            'Invalid Number',
            'Please enter a valid 10-digit phone number.'
        );
        return;
    }

    if (isSending) return;

    try {
        setVerificationStatus('sending');

        const response = await verifyElderNumber(phoneNumber);

        console.log('Verify number response:', response);

        setVerificationStatus('verified');

        Alert.alert(
            'OTP Sent',
            'Your phone number has been verified successfully.\n\nAn OTP has been sent to your caregiver’s registered email.'
        );

    } catch (error: any) {

        console.log('Verify number error:', error);

        setVerificationStatus('idle');

        Alert.alert(
            'Verification Failed',
            error?.message ||
            'Unable to verify your phone number.'
        );
    }
};
   const handleResendOtp = async () => {
    if (isSending) return;

    try {
        setVerificationStatus('sending');

        const response = await verifyElderNumber(phoneNumber);

        console.log('Resend OTP response:', response);

        setVerificationStatus('verified');

        Alert.alert(
            'OTP Sent',
            'A new OTP has been sent to your caregiver’s registered email.'
        );

    } catch (error: any) {

        console.log('Resend OTP error:', error);

        setVerificationStatus('verified');

        Alert.alert(
            'Resend Failed',
            error?.message ||
            'Unable to resend OTP.'
        );
    }
};

  const handleLogin = async () => {

    if (!isVerified) {
        if (!phoneNumber.trim()) {
            Alert.alert(
                'Phone Required',
                'Please enter your phone number.'
            );
        } else {
            Alert.alert(
                'Number Not Verified',
                'Please verify your number before logging in.'
            );
        }

        return;
    }

    if (otp.trim().length !== 6) {
        Alert.alert(
            'Invalid OTP',
            'Please enter the 6-digit OTP.'
        );
        return;
    }

    try {
        setLoading(true);

        const response = await elderLogin(
            phoneNumber,
            otp
        );

        console.log(
            'Elder login response:',
            response
        );

        if (!response?.token) {
            throw new Error(
                'Login successful but token was not received.'
            );
        }

        // Save elder JWT
       await saveAuthData(response.token);

        console.log(
            'Elder JWT saved successfully'
        );

        // Navigate to elder dashboard
        router.replace('/elder/home');

    } catch (error: any) {

        console.log(
            'Elder login error:',
            error
        );

        Alert.alert(
            'Login Failed',
            error?.message ||
            'Invalid OTP or login failed.'
        );

    } finally {
        setLoading(false);
    }
};

    return {
        phoneNumber,
        updatePhoneNumber,
        otp,
        setOtp,
        verificationStatus,
        isVerified,
        isSending,
        loading,
        handleVerifyNumber,
        handleResendOtp,
        handleLogin,
    };
}