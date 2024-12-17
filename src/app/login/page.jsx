"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider } from "../firebase/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateName = (name) => /^[A-Za-z\s]*$/.test(name);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && !validateName(formData.name)) {
      alert("Name should contain only letters.");
      return;
    }

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && (!formData.name || !formData.phone))
    ) {
      alert("All fields are required.");
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: user.displayName || "Google User",
          email: user.email,
          phone: "",
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Google login error:", error.message);
      alert("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-neutral-800 text-neutral-100 rounded-lg shadow-2xl m-4">
        <div className="flex w-full mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 text-center py-2 text-lg font-semibold transition-all rounded-l-lg ${
              isLogin
                ? "text-white bg-blue-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 text-center py-2 text-lg font-semibold transition-all rounded-r-lg ${
              !isLogin
                ? "text-white bg-blue-600"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          {!isLogin && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg bg-neutral-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-neutral-800 text-neutral-400">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;