import { apiRequest } from '../../../services/api';

export interface AddElderRequest {
  fullName: string;
  mobile: string;
  age: number;
  relationship: string;
  preferredLanguage: 'ENGLISH' | 'ODIA';
}

export interface ElderResponse {
  id: string;
  caregiverEmail: string;
  fullName: string;
  mobile: string;
  age: number;
  relationship: string;
  preferredLanguage: 'ENGLISH' | 'ODIA';
  role: 'ELDER';
}

// Add elder
export async function addElder(
  data: AddElderRequest
): Promise<ElderResponse> {

  return apiRequest('/elders/add', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Get logged-in caregiver's elders
export async function getMyElders(): Promise<ElderResponse[]> {

  return apiRequest('/elders/my-elders', {
    method: 'GET',
  });
}