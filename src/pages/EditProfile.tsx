import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserData, getUserData } from "@/lib/firebaseUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();
  const userId = user?.uid ?? "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    allergies: "",
    medicalConditions: "",
    medications: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const existingData = await getUserData(userId);
      if (existingData) {
        setFormData(existingData);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!userId) return;

    // Simple Validation
    if (!formData.name || !formData.age || !formData.bloodGroup) {
      alert("Please fill in Name, Age, and Blood Group.");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        lastUpdated: new Date().toLocaleDateString(),
        email: user?.email || "",
      };
      await updateUserData(userId, updatedData);
      alert("✅ Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("❌ Failed to update profile:", error);
      alert("Something went wrong while saving.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          ✍️ Edit Your Medical Profile
        </h2>

        {/* Basic Info */}
        <h3 className="text-lg font-semibold">👤 Basic Information</h3>
        <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <Input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <Input name="bloodGroup" placeholder="Blood Group (e.g. O+)" value={formData.bloodGroup} onChange={handleChange} />

        {/* Medical Info */}
        <h3 className="text-lg font-semibold mt-4">🌿 Medical Details</h3>
        <Input name="allergies" placeholder="Allergies (comma-separated)" value={formData.allergies} onChange={handleChange} />
        <Input name="medicalConditions" placeholder="Medical Conditions (comma-separated)" value={formData.medicalConditions} onChange={handleChange} />
        <Input name="medications" placeholder="Medications (comma-separated)" value={formData.medications} onChange={handleChange} />

        {/* Emergency Contact */}
        <h3 className="text-lg font-semibold mt-4">📞 Emergency Contact</h3>
        <Input name="emergencyContact.name" placeholder="Contact Name" value={formData.emergencyContact.name} onChange={handleChange} />
        <Input name="emergencyContact.phone" placeholder="Contact Phone" value={formData.emergencyContact.phone} onChange={handleChange} />
        <Input name="emergencyContact.relation" placeholder="Relation (e.g. Father)" value={formData.emergencyContact.relation} onChange={handleChange} />

        <div className="text-center mt-6">
          <Button className="w-full sm:w-auto" onClick={handleSubmit}>
            💾 Save Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
