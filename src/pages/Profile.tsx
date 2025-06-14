import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(!auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Profile Page</h2>
      {loading ? (
        <p className="text-gray-600 mt-2">Loading user info...</p>
      ) : user ? (
        <div className="mt-4 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <p><strong>Display Name:</strong> {user.displayName || "Not set"}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber || "Not provided"}</p>
        </div>
      ) : (
        <p className="text-red-500 mt-2">No user is signed in.</p>
      )}
    </div>
  );
};

export default Profile;
