'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './firebase/firebaseconfig'; // Import Firebase config
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './Navbar'
import Shops from './Shops';

function page() {
  const [user, setUser] = useState(null); // State to store user authentication status
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If the user is logged in, set the user state
        setUser(currentUser);
      } else {
        // If the user is not logged in, redirect to /login
        router.push('/login');
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [router]);

  if (user === null) {
    // Show loading state while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Shops />
    </>
  );
}

export default page;
