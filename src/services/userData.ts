// src/services/userData.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Define your user profile structure
export interface UserData {
  name: string;
  age: number;
  bloodGroup: string;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  lastUpdated: string;
  profilePhotoUrl?: string;
  email?: string;
}

// Save or update user profile in Firestore
export const saveUserData = async (userId: string, data: UserData): Promise<string> => {
  await setDoc(doc(db, "profiles", userId), data);
  return userId;
};

// Fetch user profile from Firestore
export const getUserData = async (userId: string): Promise<UserData | null> => {
  const snap = await getDoc(doc(db, "profiles", userId));
  return snap.exists() ? (snap.data() as UserData) : null;
};

// Optionally update user profile: same as saving
export const updateUserData = saveUserData;

// Generate QR code image URL for sharing
export const generateQRCodeUrl = (userId: string): string => {
  const deployedURL = `https://qrx-quick-health-aid.vercel.app/user/${userId}`;
  const encoded = encodeURIComponent(deployedURL);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=200x200`;
};
