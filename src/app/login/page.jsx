"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation"; // For navigation in Next.js
import { auth, googleProvider } from "../firebase/firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter(); // For navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateName = (name) => /^[A-Za-z\s]*$/.test(name);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && !validateName(formData.name)) {
      alert("Name should contain only letters.");
      return;
    }

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
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
        // Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);

      } else {
        // Signup
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
   
      }
      router.push("/"); // Redirect to home
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Successful!");
      router.push("/"); // Redirect to home
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-lg shadow-lg">
        <div className="flex w-full mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 text-center py-2 text-lg font-semibold transition-all ${
              isLogin
                ? "text-white bg-blue-500 dark:bg-blue-600"
                : "text-neutral-800 dark:text-neutral-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 text-center py-2 text-lg font-semibold transition-all ${
              !isLogin
                ? "text-white bg-blue-500 dark:bg-blue-600"
                : "text-neutral-800 dark:text-neutral-100"
            }`}
          >
            Signup
          </button>
        </div>

        <div className="relative h-[30rem]">
          {/* Login Form */}
          <form
            onSubmit={handleSubmit}
            className={`absolute w-full transition-all duration-500 ${
              isLogin
                ? "opacity-100 translate-x-0 visible"
                : "opacity-0 -translate-x-full invisible"
            }`}
          >
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-neutral-100 dark:bg-neutral-700"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-neutral-100 dark:bg-neutral-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <div className="flex items-center justify-center my-4">
              <hr className="w-1/3 border-neutral-400" />
              <span className="px-2 text-neutral-500">OR</span>
              <hr className="w-1/3 border-neutral-400" />
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full px-4 py-2 text-neutral-800 bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            >
              <FcGoogle className="mr-2 text-xl" /> Login with Google
            </button>
          </form>

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className={`absolute w-full transition-all duration-500 ${
              !isLogin
                ? "opacity-100 translate-x-0 visible"
                : "opacity-0 translate-x-full invisible"
            }`}
          >
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-neutral-100 dark:bg-neutral-700"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-neutral-100 dark:bg-neutral-700"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-neutral-100 dark:bg-neutral-700"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-neutral-100 dark:bg-neutral-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Signup
            </button>
            <div className="flex items-center justify-center my-4">
              <hr className="w-1/3 border-neutral-400" />
              <span className="px-2 text-neutral-500">OR</span>
              <hr className="w-1/3 border-neutral-400" />
            </div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full px-4 py-2 text-neutral-800 bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            >
              <FcGoogle className="mr-2 text-xl" /> Signup with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
