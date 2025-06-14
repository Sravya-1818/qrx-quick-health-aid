// src/lib/firebaseUtils.ts

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Make sure this file exists

export const getUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserData = async (uid: string, newData: any) => {gi
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, newData);
};
