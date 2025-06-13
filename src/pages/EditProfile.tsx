// src/pages/EditProfile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { getUserData, updateUserData, UserData } from "@/services/userData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userId = user?.uid || "";

  const [formData, setFormData] = useState<UserData>({
    name: "",
    age: 0,
    bloodGroup: "",
    allergies: [],
    medications: [],
    medicalConditions: [],
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
    lastUpdated: new Date().toLocaleDateString(),
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getUserData(userId).then((data) => {
      if (data) setFormData(data);
      setLoading(false);
    });
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("emergencyContact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [key]: value,
        },
      }));
    } else if (["allergies", "medications", "medicalConditions"].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: value.split(",").map((v) => v.trim()) }));
    } else if (name === "age") {
      setFormData((prev) => ({ ...prev, age: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!userId) return;
    const updatedData = {
      ...formData,
      lastUpdated: new Date().toLocaleDateString(),
      email: user?.email || "",
    };
    await updateUserData(userId, updatedData); // ✅ fixed
    navigate("/profile");
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Edit Your Profile</h2>
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <Input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" />
      <Input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" />
      <Textarea name="allergies" value={formData.allergies.join(", ")} onChange={handleChange} placeholder="Allergies (comma-separated)" />
      <Textarea name="medications" value={formData.medications.join(", ")} onChange={handleChange} placeholder="Medications (comma-separated)" />
      <Textarea name="medicalConditions" value={formData.medicalConditions.join(", ")} onChange={handleChange} placeholder="Medical Conditions (comma-separated)" />
      <Input name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange} placeholder="Emergency Contact Name" />
      <Input name="emergencyContact.relation" value={formData.emergencyContact.relation} onChange={handleChange} placeholder="Relation" />
      <Input name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange} placeholder="Phone Number" />
      <Button onClick={handleSubmit}>💾 Save Profile</Button>
    </div>
  );
};

export default EditProfile;
