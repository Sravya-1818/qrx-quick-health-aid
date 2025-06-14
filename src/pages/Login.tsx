import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials or error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      console.error("Google Sign-In failed", err);
      alert("Google Sign-In failed");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email to receive a reset link.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset link sent to your email.");
    } catch (error) {
      console.error("Reset password failed", error);
      alert("Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-6 animate-fadeIn transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 tracking-tight">
          Login to <span className="text-green-600">QRx</span>
        </h2>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm"
          />

          <Button
            className="w-full font-semibold text-base"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-2">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-sm"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </Button>
        </div>

        <div className="text-sm text-center space-y-2">
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </button>

          <p className="text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-medium hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
