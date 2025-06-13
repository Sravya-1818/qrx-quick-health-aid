import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Updated user data interface with optional fields for flexibility
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
  profilePhotoUrl?: string; // Optional profile photo
  email?: string;           // Useful if you want to link Firebase Auth data
}

// Save user profile to Firestore
export const saveUserData = async (userId: string, data: UserData): Promise<string> => {
  await setDoc(doc(db, "profiles", userId), data);
  return userId;
};

// Get user profile from Firestore
export const getUserData = async (userId: string): Promise<UserData | null> => {
  const ref = doc(db, "profiles", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserData) : null;
};

// Generate a public QR code for the profile
export const generateQRCodeUrl = (userId: string): string => {
  const deployedURL = `https://qrx-quick-health-aid.vercel.app/user/${userId}`;
  const encodedData = encodeURIComponent(deployedURL);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=200x200`;
};
