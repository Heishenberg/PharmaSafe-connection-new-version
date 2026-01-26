
import { MedicineAnalysis } from '../types';

export interface UserProfile {
  name: string;
  phone: string;
  age: string;
  gender: string;
  city: string;
  pincode: string;
  joinDate: string;
}

export interface StoredPickup {
  id: string;
  medicineName: string;
  pickupDate: string;
  timeSlot: string;
  status: string;
  riskLevel: string;
  timestamp: string;
}

// Generic Helpers
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key}`, e);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key}`, e);
  }
};

// User Profile
export const getUserProfile = () => getStorageItem<UserProfile | null>('userProfile', null);
export const saveUserProfile = (profile: UserProfile) => setStorageItem('userProfile', profile);

// Agent Profile
export const saveAgentProfile = (profile: any) => setStorageItem('agentProfile', profile);
export const getAgentProfile = () => getStorageItem<any>('agentProfile', null);

// Pickups
export const getUserPickups = () => getStorageItem<StoredPickup[]>('userPickups', []);
export const saveUserPickup = (pickup: StoredPickup) => {
  const pickups = getUserPickups();
  const updatedPickups = [pickup, ...pickups];
  setStorageItem('userPickups', updatedPickups);
  incrementLifetimeUsage();
  return updatedPickups;
};

// Usage Stats
export const getLifetimeUsage = () => {
  const val = localStorage.getItem('lifetimeUsage');
  return val ? parseInt(val, 10) : 0;
};

export const incrementLifetimeUsage = () => {
  const current = getLifetimeUsage();
  localStorage.setItem('lifetimeUsage', (current + 1).toString());
};
