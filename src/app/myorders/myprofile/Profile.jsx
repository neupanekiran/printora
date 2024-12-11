import React from 'react';

function Profile() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 sm:px-8 lg:px-16">
      {/* Profile Card */}
      <div className="card bg-base-100 text-base-content shadow-xl w-full max-w-lg rounded-lg">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Hi there! Welcome to your profile.</p>
          <div className="card-actions mt-4">
            <button className="btn btn-primary px-4 py-2 rounded-lg">
              Change Your Name
            </button>
          </div>
        </div>
      </div>

      {/* Previous Orders Card */}
      <div className="card bg-base-100 text-base-content shadow-xl w-full max-w-lg rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">Previous Orders</h2>
          <p className="mt-2">
            A list of your orders and their transactions will show up here.
          </p>
        </div>
      </div>

      {/* Details Card */}
      <div className="card bg-base-100 text-base-content shadow-xl w-full max-w-lg rounded-lg">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">Details</h2>
          <p className="mt-2">Your details will show up here.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
