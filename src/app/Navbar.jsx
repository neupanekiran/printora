"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Keep this for client-side navigation
import { auth } from './firebase/firebaseconfig'; // Firebase config
import { signOut } from 'firebase/auth'; // Firebase signOut function

function Navbar() {
  const [user, setUser] = useState(null); // Declare user state
  const router = useRouter(); // Initialize Next.js router

  async function handleLogout() {
    try {
      await signOut(auth); 
      setUser(null);
      router.push('/login'); 
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-4 shadow-lg absolute top-0 left-0">
              <Link href={"/myprofile"}><li>My Profile</li></Link>
              <Link href={"/myorders"}><li>My orders</li></Link>
              <Link href={"/myorders/transactions"}><li>Transactions</li></Link>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href={"/"} className="btn btn-ghost text-xl">Printora</Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
