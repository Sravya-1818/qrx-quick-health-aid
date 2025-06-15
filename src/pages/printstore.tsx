import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import cardPreview from './placeholder-card-preview.png';
import keychainPreview from './qr-keychain-sample.png';

const Shop = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-3">
        🛍️ QRx Print Store
      </h1>
      <p className="text-center text-gray-500 text-lg mb-12">
        ✨ Coming Soon: Personalize your own health QR ID cards and keychains
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* QR Health Card Sample */}
        <Card className="transition duration-300 hover:shadow-xl hover:-translate-y-1 border rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">💳 QR Health ID Card (ATM Size)</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={cardPreview}
              alt="QR Health Card Sample"
              className="h-52 w-full object-contain rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600">
              Compact PVC card with your QR and emergency health details. Fits perfectly in your wallet like a debit card.
            </p>
            <span className="inline-block bg-yellow-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full mt-4">
              🔒 Available Soon
            </span>
          </CardContent>
        </Card>

        {/* QR Keychain Sample */}
        <Card className="transition duration-300 hover:shadow-xl hover:-translate-y-1 border rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">🔑 QR Keychain Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={keychainPreview}
              alt="QR Keychain Sample"
              className="h-52 w-full object-contain rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600">
              Durable acrylic keychain with your health QR. Attach it to your school bags, bike keys, or ID tags for quick access.
            </p>
            <span className="inline-block bg-yellow-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full mt-4">
              🔒 Launching Soon
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shop;
