import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, User, Heart, Phone, Shield, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserData, saveUserData, generateQRCodeUrl } from '@/services/userData';
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const QRGenerator = () => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '',
    age: 0,
    bloodGroup: '',
    allergies: [],
    medicalConditions: [],
    medications: [],
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });

  const [generatedUserId, setGeneratedUserId] = useState<string>('');
  const [qrCodeUrl, setQRCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('emergencyContact.')) {
      const contactField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact!,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayInput = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userId = `${formData.name?.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
      await saveUserData(userId, formData as UserData);
      setGeneratedUserId(userId);
      setQRCodeUrl(generateQRCodeUrl(userId));

      toast({
        title: "QR Code Generated Successfully!",
        description: "Your emergency health profile is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = async () => {
    if (!qrCodeUrl) return;
    const response = await fetch(qrCodeUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `QRx-${formData.name || 'Emergency'}-Health-ID.png`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    const cardElement = document.getElementById('healthCard');
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth - 30; // margins
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 15, 30, imgWidth, imgHeight);
    pdf.save(`QRx-${formData.name || 'HealthCard'}.pdf`);
  };


    return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-blue-600 mb-6 hover:underline">
        <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" /> Emergency Health QR Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Personal Details */}
            <div className="space-y-4">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />

              <Label>Age</Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", parseInt(e.target.value))}
                required
              />

              <Label>Blood Group</Label>
              <Input
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                required
              />

              <Label>Allergies (comma-separated)</Label>
              <Textarea
                value={formData.allergies?.join(', ')}
                onChange={(e) => handleArrayInput("allergies", e.target.value)}
              />

              <Label>Medical Conditions (comma-separated)</Label>
              <Textarea
                value={formData.medicalConditions?.join(', ')}
                onChange={(e) => handleArrayInput("medicalConditions", e.target.value)}
              />

              <Label>Medications (comma-separated)</Label>
              <Textarea
                value={formData.medications?.join(', ')}
                onChange={(e) => handleArrayInput("medications", e.target.value)}
              />
            </div>

            {/* Right Column - Emergency Contact & Actions */}
            <div className="space-y-4">
              <Label>Emergency Contact Name</Label>
              <Input
                value={formData.emergencyContact?.name}
                onChange={(e) => handleInputChange("emergencyContact.name", e.target.value)}
              />

              <Label>Emergency Contact Phone</Label>
              <Input
                value={formData.emergencyContact?.phone}
                onChange={(e) => handleInputChange("emergencyContact.phone", e.target.value)}
              />

              <Label>Emergency Contact Relation</Label>
              <Input
                value={formData.emergencyContact?.relation}
                onChange={(e) => handleInputChange("emergencyContact.relation", e.target.value)}
              />

              <Button type="submit" disabled={isLoading} className="mt-4 w-full">
                {isLoading ? "Generating..." : "Generate QR"}
              </Button>

              {qrCodeUrl && (
                <div className="mt-6 space-y-4">
                  <div id="healthCard" className="border rounded-xl p-4 shadow-md bg-white text-center">
                    <h2 className="text-lg font-semibold mb-2">Your Emergency QR Health ID</h2>
                    <img
                      src={qrCodeUrl}
                      alt="QR Code"
                      className="mx-auto h-40 w-40"
                      crossOrigin="anonymous"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Name: {formData.name} <br />
                      Age: {formData.age} <br />
                      Blood Group: {formData.bloodGroup} <br />
                      Emergency Contact: {formData.emergencyContact?.name} ({formData.emergencyContact?.relation}) - {formData.emergencyContact?.phone}
                    </p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button onClick={downloadQR} variant="outline">
                      <Download className="mr-2 w-4 h-4" /> Download QR
                    </Button>
                    <Button onClick={downloadPDF} variant="default">
                                            <Printer className="mr-2 w-4 h-4" /> Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;

