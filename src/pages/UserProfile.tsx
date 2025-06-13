import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Calendar, Heart, Phone, Shield, User, Pencil } from 'lucide-react';
import { getUserData, updateUserData, generateQRCodeUrl, UserData } from '@/services/userData';

const UserProfile = () => {
  const params = useParams();
  const userId = params.userId ?? '';

  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserData(userId);
        setUserData(data);
        setFormData(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  const handleChange = (field: keyof UserData, value: any) => {
    if (!formData) return;
    setFormData(prev => ({ ...prev!, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    try {
      const updated = await updateUserData(userId, formData); // assume this API updates user data
      setUserData(updated);
      setEditMode(false);
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-40 w-full" />;
  }

  if (error || !userData || !formData) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">User Health Profile</h1>
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            <Pencil className="mr-2 h-4 w-4" />
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <User className="mr-2 h-5 w-5" />
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <>
                <Input value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Name" className="mb-2" />
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

        {/* Blood Group */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-700">Blood Group</CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <Input value={formData.bloodGroup} onChange={e => handleChange("bloodGroup", e.target.value)} />
            ) : (
              <div className="text-xl font-bold text-red-600">{userData.bloodGroup}</div>
            )}
          </CardContent>
        </Card>

        {/* Allergies, Medical Conditions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-700">Medical Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="font-semibold">Allergies:</p>
              {editMode ? (
                <Textarea value={formData.allergies.join(", ")} onChange={e => handleChange("allergies", e.target.value.split(",").map(i => i.trim()))} />
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
                <Textarea value={formData.medicalConditions.join(", ")} onChange={e => handleChange("medicalConditions", e.target.value.split(",").map(i => i.trim()))} />
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

        {/* Emergency Contact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-700">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <>
                <Input value={formData.emergencyContact.name} onChange={e => handleChange("emergencyContact", { ...formData.emergencyContact, name: e.target.value })} className="mb-2" />
                <Input value={formData.emergencyContact.phone} onChange={e => handleChange("emergencyContact", { ...formData.emergencyContact, phone: e.target.value })} className="mb-2" />
                <Input value={formData.emergencyContact.relation} onChange={e => handleChange("emergencyContact", { ...formData.emergencyContact, relation: e.target.value })} />
              </>
            ) : (
              <div>
                <p className="font-semibold text-lg">{userData.emergencyContact.name}</p>
                <p>{userData.emergencyContact.relation}</p>
                <p className="text-green-600">{userData.emergencyContact.phone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        {editMode && (
          <div className="text-right">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
