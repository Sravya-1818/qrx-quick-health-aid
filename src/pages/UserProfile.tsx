import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Pencil } from 'lucide-react';
import { getUserData, updateUserData, UserData } from '@/services/userData';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct import for v3+
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else navigate('/login');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const data = await getUserData(userId);
        setUserData(data);
        setFormData(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (field: keyof UserData, value: any) => {
    if (!formData) return;
    setFormData(prev => ({ ...prev!, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData || !userId) return;
    setSaving(true);
    try {
      const updated = await updateUserData(userId, formData);
      setUserData(updated);
      setEditMode(false);
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById("profile-card");
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save("Emergency_Profile.pdf");
  };

  if (loading) return <Skeleton className="h-40 w-full" />;
  if (error || !userData || !formData) return <div>Error loading profile</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8">
      <div className="container mx-auto px-6 max-w-3xl" id="profile-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-red-700">Emergency Health Card</h1>
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            <Pencil className="mr-2 h-4 w-4" />
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        <Card className="mb-6 border-2 border-red-500">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-red-700 font-extrabold">Blood Group</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {editMode ? (
              <Input value={formData.bloodGroup} onChange={e => handleChange("bloodGroup", e.target.value)} />
            ) : (
              <div className="text-4xl font-extrabold text-red-600">{userData.bloodGroup}</div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <User className="mr-2 h-5 w-5" />
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <>
                <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Full Name" className="mb-2" />
                <Input value={formData.age} onChange={e => handleChange("age", Number(e.target.value))} placeholder="Age" type="number" />
              </>
            ) : (
              <>
                <p className="text-xl font-semibold">{userData.name}</p>
                <p className="text-gray-600">Age: {userData.age} years</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-700">Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Allergies:</p>
              {editMode ? (
                <Textarea
                  value={formData.allergies.join(", ")}
                  onChange={e =>
                    handleChange("allergies", e.target.value.split(",").map(i => i.trim()))
                  }
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userData.allergies.map((a, i) => (
                    <Badge key={i} variant="destructive">{a}</Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="font-semibold">Medical Conditions:</p>
              {editMode ? (
                <Textarea
                  value={formData.medicalConditions.join(", ")}
                  onChange={e =>
                    handleChange("medicalConditions", e.target.value.split(",").map(i => i.trim()))
                  }
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userData.medicalConditions.map((m, i) => (
                    <Badge key={i}>{m}</Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border border-green-500">
          <CardHeader>
            <CardTitle className="text-green-700">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <>
                <Input
                  className="mb-2"
                  placeholder="Name"
                  value={formData.emergencyContact.name}
                  onChange={e =>
                    handleChange("emergencyContact", {
                      ...formData.emergencyContact,
                      name: e.target.value
                    })
                  }
                />
                <Input
                  className="mb-2"
                  placeholder="Phone"
                  value={formData.emergencyContact.phone}
                  onChange={e =>
                    handleChange("emergencyContact", {
                      ...formData.emergencyContact,
                      phone: e.target.value
                    })
                  }
                />
                <Input
                  placeholder="Relation"
                  value={formData.emergencyContact.relation}
                  onChange={e =>
                    handleChange("emergencyContact", {
                      ...formData.emergencyContact,
                      relation: e.target.value
                    })
                  }
                />
              </>
            ) : (
              <div>
                <p className="text-lg font-bold">{userData.emergencyContact.name}</p>
                <p>{userData.emergencyContact.relation}</p>
                <p className="text-green-700 font-semibold">{userData.emergencyContact.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {editMode && (
          <div className="text-right mb-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}

        {!editMode && userId && (
          <div className="text-center mt-8">
            <h3 className="font-semibold mb-2 text-gray-700">Scan to View</h3>
            <QRCode value={`https://your-app.com/view-profile/${userId}`} size={128} />
            <div className="mt-4">
              <Button onClick={handleDownload}>Download PDF</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
