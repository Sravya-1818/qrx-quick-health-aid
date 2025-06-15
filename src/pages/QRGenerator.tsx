import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Printer, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserData, saveUserData, generateQRCodeUrl } from '@/services/userData';
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react'; 

const QRGenerator = () => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: '', age: 0, bloodGroup: '', allergies: [], medicalConditions: [], medications: [],
    emergencyContact: { name: '', phone: '', relation: '' }
  });
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

      const qrUrl = generateQRCodeUrl(userId);
      setQRCodeUrl(qrUrl);

      // ✅ Save data to localStorage for Profile reuse
      localStorage.setItem("qrData", JSON.stringify({
        userData: formData,
        qrCodeUrl: qrUrl
      }));

      toast({ title: "QR Code Generated!", description: "Emergency profile is ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate QR code.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    const card = document.getElementById('healthCard');
    if (!card) return;
    const canvas = await html2canvas(card, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth() - 30;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 15, 30, width, height);
    pdf.save(`QRx-${formData.name || 'HealthCard'}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-in">
      <Link to="/" className="flex items-center text-blue-500 hover:underline mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
      </Link>

      <Card className="shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 rounded-t-2xl text-white p-6">
          <CardTitle className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-7 h-7" /> Emergency Health QR Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required /></div>
              <div><Label>Age</Label><Input type="number" value={formData.age} onChange={(e) => handleInputChange("age", parseInt(e.target.value))} required /></div>
              <div><Label>Blood Group</Label><Input value={formData.bloodGroup} onChange={(e) => handleInputChange("bloodGroup", e.target.value)} required /></div>
              <div><Label>Allergies</Label><Textarea value={formData.allergies?.join(', ')} onChange={(e) => handleArrayInput("allergies", e.target.value)} /></div>
              <div><Label>Medical Conditions</Label><Textarea value={formData.medicalConditions?.join(', ')} onChange={(e) => handleArrayInput("medicalConditions", e.target.value)} /></div>
              <div><Label>Medications</Label><Textarea value={formData.medications?.join(', ')} onChange={(e) => handleArrayInput("medications", e.target.value)} /></div>
            </div>
            <div className="space-y-4">
              <div><Label>Emergency Contact Name</Label><Input value={formData.emergencyContact?.name} onChange={(e) => handleInputChange("emergencyContact.name", e.target.value)} /></div>
              <div><Label>Emergency Contact Phone</Label><Input value={formData.emergencyContact?.phone} onChange={(e) => handleInputChange("emergencyContact.phone", e.target.value)} /></div>
              <div><Label>Emergency Contact Relation</Label><Input value={formData.emergencyContact?.relation} onChange={(e) => handleInputChange("emergencyContact.relation", e.target.value)} /></div>
              <Button type="submit" disabled={isLoading} className="w-full mt-4 transition duration-300 hover:scale-105">
                {isLoading ? "Generating..." : "Generate QR"}
              </Button>
              {qrCodeUrl && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div id="healthCard" className="p-6 bg-gray-50 rounded-lg border text-sm">
                    <h2 className="text-center font-bold text-lg text-red-600 mb-4">QRx Emergency Health Card</h2>
                    <div className="flex justify-center mb-4">
                     
<div className="flex justify-center mb-4">
  <QRCodeCanvas
    value={qrCodeUrl}
    size={144}
    bgColor="#ffffff"
    fgColor="#000000"
    level="H"
    includeMargin={true}
  />
</div>
                    </div>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Age:</strong> {formData.age}</p>
                    <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>
                    <p><strong>Allergies:</strong> {formData.allergies?.join(', ') || 'None'}</p>
                    <p><strong>Medical Conditions:</strong> {formData.medicalConditions?.join(', ') || 'None'}</p>
                    <p><strong>Medications:</strong> {formData.medications?.join(', ') || 'None'}</p>
                    <p><strong>Emergency Contact:</strong> {formData.emergencyContact?.name} ({formData.emergencyContact?.relation}) - {formData.emergencyContact?.phone}</p>
                    <p className="text-center text-gray-500 text-xs mt-2">Scan QR for emergency access</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Link to="/printstore">
                      <Button variant="outline"><Printer className="mr-2 w-4 h-4" /> Print Your QR</Button>
                    </Link>
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
