import React from 'react';
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              QRx
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Emergency QR Health ID - A simple QR code that speaks when you can't. 
              Protecting vulnerable communities across India.
            </p>
          </div>
          
          {/* About QRx */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About QRx</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Feedback */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Feedback</h4>
            <button
              onClick={() => navigate("/feedback")}
              className="text-gray-300 hover:text-white transition-colors underline"
            >
              Share your feedback
            </button>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 QRx. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
