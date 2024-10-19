"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the map marker icon
import Link from 'next/link';

function Shops() {
  // State to track which shop's location is visible
  const [visibleLocation, setVisibleLocation] = useState(null);

  const shopData = [
    {
      id: 1,
      name: "Star Prints",
      description: "High-quality prints for all your needs.",
      imgSrc: "/printshop.png", // Update with your image path
      location: "123 Main St, Chennai",
      googleMapsLink: "https://goo.gl/maps/example1"
    },
    {
      id: 2,
      name: "X Zerox",
      description: "Fast and reliable xerox services.",
      imgSrc: "/printshop.png", // Update with your image path
      location: "456 Station Road, Chennai",
      googleMapsLink: "https://goo.gl/maps/example2"
    },
    {
      id: 3,
      name: "UB Prints",
      description: "Affordable prints with superior quality.",
      imgSrc: "/printshop.png", // This should be in the public directory
      location: "789 Market St, Chennai",
      googleMapsLink: "https://goo.gl/maps/example3"
    },
    {
      id: 4,
      name: "DTP Section",
      description: "Design and print services in one place.",
      imgSrc: "/printshop.png", // This should be in the public directory
      location: "101 High Street, Chennai",
      googleMapsLink: "https://goo.gl/maps/example4"
    },
    {
      id: 5,
      name: "Fast Xerox",
      description: "Get your documents copied in minutes.",
      imgSrc: "/printshop.png", // Update with your image path
      location: "112 King St, Chennai",
      googleMapsLink: "https://goo.gl/maps/example5"
    }
  ];

  // Function to toggle visibility of location card
  const toggleLocation = (id) => {
    setVisibleLocation(visibleLocation === id ? null : id);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopData.map((shop) => (
          <div key={shop.id} className="relative card bg-base-100 image-full w-full shadow-xl">
            <figure className="relative z-0">
              <img src={shop.imgSrc} alt={shop.name} className="pointer-events-none w-full h-auto" />
            </figure>
            <div className="card-body z-10">
              <h2 className="card-title">{shop.name}</h2>
              <p>{shop.description}</p>
              <div className="card-actions justify-end">
                <Link href={"/upload"}><button className="btn btn-primary">Place Order</button></Link>
              </div>
            </div>

            {/* Location Icon */}
            <div className="absolute top-2 right-2 z-20 cursor-pointer">
              <FaMapMarkerAlt
                className="text-red-500 text-3xl cursor-pointer hover:text-red-700"
                onClick={() => toggleLocation(shop.id)} // Click to show location
              />
            </div>

            {/* Show location card if visible */}
            {visibleLocation === shop.id && (
              <div className="absolute w-full bg-white text-black p-4 shadow-lg rounded-lg top-full mt-2 z-30">
                <h3 className="font-bold">Location:</h3>
                <p>{shop.location}</p>
                <a
                  href={shop.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Shops;
