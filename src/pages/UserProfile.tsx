// src/pages/UserProfile.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "@/services/userData";
import { motion } from "framer-motion";
import { User, Phone, ShieldHeart, Syringe, AlertTriangle, CalendarDays, UserCheck } from "lucide-react";

const BloodGroupBadge = ({ group }: { group: string }) => {
  const colorMap: { [key: string]: string } = {
    'A+': 'bg-red-500',
    'A-': 'bg-red-700',
    'B+': 'bg-blue-500',
    'B-': 'bg-blue-700',
    'AB+': 'bg-purple-500',
    'AB-': 'bg-purple-700',
    'O+': 'bg-green-500',
    'O-': 'bg-green-700',
  };

  const color = colorMap[group] || 'bg-gray-500';

  return (
    <span className={`text-white text-xs px-3 py-1 rounded-full ${color}`}>

      🩸 {group}
    </span>
  );
};

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

  if (loading) return <div className="p-10 text-center text-lg animate-pulse">Loading profile...</div>;
  if (!userData) return <div className="p-10 text-center text-red-600">Profile not found.</div>;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-2xl mt-10 border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">🛑 Emergency Health Profile</h1>
        <p className="text-sm text-gray-500">Accessible by scanning the QR Code in an emergency</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="flex items-center gap-3">
          <User className="text-red-400" size={18} />
          <span><strong>Name:</strong> {userData.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="text-blue-400" size={18} />
          <span><strong>Age:</strong> {userData.age}</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldHeart className="text-pink-500" size={18} />
          <span><strong>Blood Group:</strong> <BloodGroupBadge group={userData.bloodGroup} /></span>
        </div>
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-500" size={18} />
          <span><strong>Allergies:</strong> {userData.allergies?.length ? userData.allergies.join(', ') : 'None'}</span>
        </div>
        <div className="flex items-start gap-3">
          <Syringe className="text-purple-500" size={18} />
          <span><strong>Medical Conditions:</strong> {userData.medicalConditions?.length ? userData.medicalConditions.join(', ') : 'None'}</span>
        </div>
        <div className="flex items-start gap-3">
          <UserCheck className="text-green-500" size={18} />
          <span><strong>Medications:</strong> {userData.medications?.length ? userData.medications.join(', ') : 'None'}</span>
        </div>
        <div className="md:col-span-2 flex items-start gap-3">
          <Phone className="text-indigo-500" size={18} />
          <span><strong>Emergency Contact:</strong> {userData.emergencyContact?.name} ({userData.emergencyContact?.relation}) - {userData.emergencyContact?.phone}</span>
        </div>
      </div>

      <motion.p
        className="text-center text-xs text-gray-400 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        This profile was accessed via QR for emergency use only.
      </motion.p>
    </motion.div>
  );
};

export default UserProfile;
