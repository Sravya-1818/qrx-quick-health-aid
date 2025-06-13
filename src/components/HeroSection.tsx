
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-24 h-24 bg-green-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 bg-blue-300 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Emergency Health Info
            <span className="block text-blue-600">at a Scan</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A QR code that speaks when you can't
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            QRx provides simple QR code-based health IDs for vulnerable people like daily wage workers, 
            elderly, and rural citizens. Essential medical info accessible without any app or login.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full hover-scale"
              >
                Get Your Free QR Badge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/user/user123">
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-full hover-scale"
              >
                View Demo Profile
              </Button>
            </Link>
          </div>
        </div>
        
        {/* QR Code Visual Element */}
        <div className="mt-16 animate-scale-in">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-2xl">
            <div className="w-40 h-40 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1 p-4">
                {Array.from({ length: 64 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      Math.random() > 0.5 ? 'bg-white' : 'bg-gray-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">Scan this code for emergency info</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
