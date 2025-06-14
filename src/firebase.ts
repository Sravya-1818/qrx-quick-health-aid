// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBD4_ylSmK8jwlUuCr1eAI8Jf3-mrS5g_c",
  authDomain: "qrx-health.firebaseapp.com",
  projectId: "qrx-health",
  storageBucket: "qrx-health.appspot.com",
  messagingSenderId: "263513943",
  appId: "1:263513943:web:6484423a57eb7103658012",
  measurementId: "G-C4X0D3TX7H"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export all services from one place
export { db, auth, storage, googleProvider };

// ✅ Suggested Firestore Security Rules (to be set manually in Firebase Console):
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Private user profiles
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }

    // Public profile data for QR emergency access
    match /publicProfiles/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
*/
