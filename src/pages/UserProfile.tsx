// src/pages/UserProfile.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "@/services/userData";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((data) => {
          setUserData(data);
        })
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (loading) return <div className="p-10 text-center text-lg">Loading profile...</div>;
  if (!userData) return <div className="p-10 text-center text-red-600">Profile not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Emergency Health Profile</h1>
      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
        <p><strong>Allergies:</strong> {userData.allergies?.join(', ') || 'None'}</p>
        <p><strong>Medical Conditions:</strong> {userData.medicalConditions?.join(', ') || 'None'}</p>
        <p><strong>Medications:</strong> {userData.medications?.join(', ') || 'None'}</p>
        <p><strong>Emergency Contact:</strong> {userData.emergencyContact?.name} ({userData.emergencyContact?.relation}) - {userData.emergencyContact?.phone}</p>
      </div>
      <p className="text-center text-xs text-gray-500 mt-6">This profile was accessed via QR for emergency use only.</p>
    </div>
  );
};

export default UserProfile;
