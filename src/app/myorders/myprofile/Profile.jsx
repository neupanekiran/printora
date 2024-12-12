"use client"; // Marks this component as a client component

import React, { useState, useEffect } from "react";

function Profile() {
  const [theme, setTheme] = useState("light");

  // Detect system theme and update state
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(systemTheme);

    // Listener to update theme dynamically when system theme changes
    const themeChangeListener = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", themeChangeListener);

    // Cleanup listener on unmount
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", themeChangeListener);
  }, []);

  return (
    <div
      className={`flex flex-col items-center gap-8 px-6 py-10 sm:px-12 lg:px-20 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Profile Card */}
      <div
        className={`card w-full max-w-lg rounded-2xl shadow-lg border transition-transform transform hover:scale-105 ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="card-body items-center text-center p-6">
          <h1 className="card-title text-3xl font-bold">Profile</h1>
          <p className="mt-4 text-base">
            Hi there! <span className="font-semibold">Kiran Prasad</span> <br /> Welcome to your profile.
          </p>
          <div className="card-actions mt-6">
            <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
              Change Your Name
            </button>
          </div>
        </div>
      </div>

      {/* Previous Orders Card */}
      <div
        className={`card w-full max-w-lg rounded-2xl shadow-lg border transition-transform transform hover:scale-105 ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-semibold">Previous Orders</h2>
          <p className="mt-4 text-base">
            A list of your orders and their transactions will show up here.
          </p>
        </div>
      </div>

      {/* Details Card */}
      <div
        className={`card w-full max-w-lg rounded-2xl shadow-lg border transition-transform transform hover:scale-105 ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-semibold">Details</h2>
          <p className="mt-4 text-base">Your details will show up here.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
