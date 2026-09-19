// import { API_BASE_URL } from '../../../services/api';
import { apiRequest } from '../../../services/api';

export const registerUser = async (userData: {
  name: string;
  role: string;
  email: string;
  mobile: string;
}) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (
  email: string,
  password: string
) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });
};

// // Protected — token auto attached
// export const getCaregiverDashboard = async () => {
//   return apiRequest('/caregiver/dashboard');
// };

// // Protected — token auto attached
// export const getElders = async () => {
//   return apiRequest('/caregiver/elders');
// };