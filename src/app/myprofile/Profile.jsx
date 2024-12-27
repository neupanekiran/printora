"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  // Detect system theme and update state
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(systemTheme);

    const themeChangeListener = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", themeChangeListener);

    // Initialize Firebase Authentication listener
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "Unknown User");
        setPhoneNumber(user.phoneNumber || "Phone number not available");
      } else {
        setName("Guest");
        setPhoneNumber("");
      }
    });

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", themeChangeListener);
  }, []);

  // Function to handle name update
  const handleUpdateName = () => {
    // Logic to update name in your database or Firebase profile
    console.log("Name updated to:", newName);
    setName(newName);
    setNewName("");
    setIsEditing(false);
  };

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
          {isEditing ? (
            <div className="mt-4 flex flex-col items-center gap-4">
              <input
                type="text"
                className="input input-bordered w-full max-w-md"
                placeholder="Enter new name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={handleUpdateName}
                className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
              >
                Save Name
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="mt-4 text-base">
                Hi there! <span className="font-semibold">{name || "Loading..."}</span>
                <br /> Welcome to your profile.
              </p>
              <p className="mt-2 text-base">
                <strong>Phone:</strong> {phoneNumber || "Loading..."}
              </p>
              <div className="card-actions mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
                >
                  Change Your Name
                </button>
              </div>
            </div>
          )}
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
          <h2 className="card-title text-2xl font-semibold">Transactions</h2>
          <p className="mt-4 text-base">Your details will show up here.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
