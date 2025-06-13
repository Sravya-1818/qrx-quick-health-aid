import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Updated user data interface
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

// Update user profile to Firestore
export const updateUserData = async (userId: string, data: UserData): Promise<UserData> => {
  await setDoc(doc(db, "profiles", userId), {
    ...data,
    lastUpdated: new Date().toISOString(),
  });
  return data;
};

// Get user profile from Firestore
export const getUserData = async (userId: string): Promise<UserData | null> => {
  const ref = doc(db, "profiles", userId);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserData) : null;
};

// Generate a public QR code URL
export const generateQRCodeUrl = (userId: string): string => {
  const deployedURL = `https://qrx-quick-health-aid.vercel.app/user/${userId}`;
  const encodedData = encodeURIComponent(deployedURL);
  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=200x200`;
};
