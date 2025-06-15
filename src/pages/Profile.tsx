import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Pencil } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [qrData, setQrData] = useState<{
    userData: any;
    qrCodeUrl: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('qrData');
    if (saved) {
      setQrData(JSON.parse(saved));
    }
  }, []);

  const downloadPDF = async () => {
    const card = document.getElementById('profileCard');
    if (!card) return;

    const canvas = await html2canvas(card, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth() - 30;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 15, 30, width, height);
    pdf.save(`QRx-${qrData?.userData?.name || 'HealthCard'}.pdf`);
  };

  if (!qrData) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No profile data found. Please generate your QR first.</p>
        <Link to="/generate">
          <Button className="mt-4">Go to QR Generator</Button>
        </Link>
      </div>
    );
  }

  const { userData, qrCodeUrl } = qrData;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div
        id="profileCard"
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-black dark:text-white border"
      >
        <h2 className="text-xl font-bold mb-4 text-red-600 text-center">
          QRx Emergency Health Profile
        </h2>

        <div className="flex justify-center mb-4">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="h-40 w-40 border p-1"
            crossOrigin="anonymous"
          />
        </div>

        <div className="text-sm space-y-2">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Blood Group:</strong> {userData.bloodGroup}</p>
          <p><strong>Allergies:</strong> {userData.allergies?.join(', ') || 'None'}</p>
          <p><strong>Medical Conditions:</strong> {userData.medicalConditions?.join(', ') || 'None'}</p>
          <p><strong>Medications:</strong> {userData.medications?.join(', ') || 'None'}</p>
          <p>
            <strong>Emergency Contact:</strong>{' '}
            {userData.emergencyContact?.name} ({userData.emergencyContact?.relation}) -{' '}
            {userData.emergencyContact?.phone}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Link to="/printstore">
          <Button variant="outline">
            <Printer className="mr-2 w-4 h-4" /> Print QR
          </Button>
        </Link>

        <Button onClick={downloadPDF}>
          <Printer className="mr-2 w-4 h-4" /> Download PDF
  
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
