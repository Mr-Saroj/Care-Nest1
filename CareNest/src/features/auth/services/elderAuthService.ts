import { apiRequest } from '../../../services/api';

export const verifyElderNumber = async (mobile: string) => {
    return apiRequest('/elder-auth/verify-number', {
        method: 'POST',
        body: JSON.stringify({
            mobile: mobile.trim(),
        }),
    });
};

export const elderLogin = async (
    mobile: string,
    otp: string
) => {
    return apiRequest('/elder-auth/login', {
        method: 'POST',
        body: JSON.stringify({
            mobile: mobile.trim(),
            otp: otp.trim(),
        }),
    });
};
