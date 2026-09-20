import { useState } from 'react';
import { Alert } from 'react-native';

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

    const handleVerifyNumber = () => {
        if (phoneNumber.trim().length !== 10) {
            Alert.alert(
                'Invalid Number',
                'Please enter a valid 10-digit phone number.'
            );
            return;
        }

        if (isSending) return;

        setVerificationStatus('sending');

        setTimeout(() => {
            setVerificationStatus('verified');

            // Show alert after successful verification
            Alert.alert(
                'OTP Sent',
                'Your phone number has been verified successfully.\n\nAn OTP has been sent to your caregiver’s registered email. Please check the email and enter the OTP below.',
                [
                    {
                        text: 'OK',
                    },
                ]
            );
        }, 1500);
    };

    const handleResendOtp = () => {
        if (isSending) return;
        // TODO: replace with real resend API call
        setVerificationStatus('sending');
        setTimeout(() => setVerificationStatus('verified'), 1500);
    };

    const handleLogin = () => {
        // Number must be verified before login
        if (!isVerified) {
            if (!phoneNumber.trim()) {
                Alert.alert('Phone Required', 'Please enter your phone number.');
            } else {
                Alert.alert(
                    'Number Not Verified',
                    'Please verify your number before logging in.'
                );
            }
            return;
        }

        if (otp.trim().length < 4) {
            Alert.alert('Invalid OTP', 'Please enter the OTP sent to your caregiver.');
            return;
        }

        setLoading(true);
        // TODO: replace with real login API call (phoneNumber + otp)
        setTimeout(() => {
            setLoading(false);
            console.log('Elder login:', { phoneNumber, otp });
            // router.replace('/(tabs)/elder-home');
        }, 1500);
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