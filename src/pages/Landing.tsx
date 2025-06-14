// src/pages/Landing.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setAuthChecked(true);
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-green-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-md w-full space-y-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700">QRx Health</h1>
        <p className="text-gray-500">Your health, one scan away.</p>

        <div className="space-y-4">
          <Button
            onClick={() => navigate(isLoginMode ? "/login" : "/signup")}
            className="w-full text-lg"
          >
            {isLoginMode ? "Login with Email" : "Sign Up with Email"}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-lg"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </Button>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Landing;
