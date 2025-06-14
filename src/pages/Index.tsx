import React, { useEffect, useState } from 'react';
import { ArrowRight, LogOut, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // redirect to landing page
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 🔵 Navbar */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700">QRx</div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-gray-600 hidden sm:inline">
                {user.displayName || user.email}
              </span>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                <UserCircle className="w-5 h-5 mr-1" />
                Profile
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </Button>
            </>
          )}
        </div>
      </header>

      {/* 💡 Page Content */}
      <HeroSection />
      <HowItWorks />
      <BenefitsSection />
      <TestimonialsSection />

      {/* 📝 Feedback Button */}
      <div className="flex justify-center my-10">
        <Button onClick={() => navigate('/feedback')} className="bg-indigo-600 text-white hover:bg-indigo-700">
          Give Feedback
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
