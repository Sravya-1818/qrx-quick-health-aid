import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link, useNavigate } from 'react-router-dom';

// Add Tailwind via CDN (works if you use this in a raw HTML shell or template)
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
    pdf.save(QRx-${qrData?.userData?.name || 'HealthCard'}.pdf);
  };

  if (!qrData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
        <p className="text-gray-600 text-lg">No profile data found. Please generate your QR first.</p>
        <Link to="/generate">
          <Button className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:scale-105 transition-transform duration-200">
            Go to QR Generator
          </Button>
        </Link>
      </div>
    );
  }

  const { userData, qrCodeUrl } = qrData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-pink-100 py-10 px-4">
      <div
        id="profileCard"
        className="bg-white shadow-xl rounded-2xl max-w-3xl mx-auto p-8 border border-red-300"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-red-700 tracking-wide uppercase">
          QRx Emergency Health Profile
        </h2>

        <div className="flex justify-center mb-6">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="h-44 w-44 border-2 border-red-300 rounded-lg p-2 bg-white"
            crossOrigin="anonymous"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 font-medium">
          <p><span className="font-semibold text-red-600">Name:</span> {userData.name}</p>
          <p><span className="font-semibold text-red-600">Age:</span> {userData.age}</p>
          <p><span className="font-semibold text-red-600">Blood Group:</span> {userData.bloodGroup}</p>
          <p><span className="font-semibold text-red-600">Allergies:</span> {userData.allergies?.join(', ') || 'None'}</p>
          <p><span className="font-semibold text-red-600">Medical Conditions:</span> {userData.medicalConditions?.join(', ') || 'None'}</p>
          <p><span className="font-semibold text-red-600">Medications:</span> {userData.medications?.join(', ') || 'None'}</p>
          <p className="sm:col-span-2">
            <span className="font-semibold text-red-600">Emergency Contact:</span>{' '}
            {userData.emergencyContact?.name} ({userData.emergencyContact?.relation}) -{' '}
            {userData.emergencyContact?.phone}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Link to="/printstore">
          <Button variant="outline" className="hover:bg-red-100">
            <Printer className="mr-2 w-4 h-4" /> Print QR
          </Button>
        </Link>

        <Button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:scale-105 transition-transform duration-200"
        >
          <Printer className="mr-2 w-4 h-4" /> Download PDF
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
