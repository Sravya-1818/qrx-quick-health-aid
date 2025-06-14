import React, { useEffect, useState } from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

// Components
import { Button } from "@/components/ui/button";
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ Set loading to false after checking auth
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 🔵 Navbar */}
      <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          QRx
        </div>
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

      {/* 💡 Main Sections */}
      {HeroSection && <HeroSection />}
      {HowItWorks && <HowItWorks />}
      {BenefitsSection && <BenefitsSection />}
      {TestimonialsSection && <TestimonialsSection />}

      {/* 📝 Feedback Button */}
      <div className="flex justify-center my-10">
        <Button
          onClick={() => navigate('/feedback')}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Give Feedback
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
