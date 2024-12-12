import React from 'react';

function Profile() {
  return (
    <div>
      <div className="card bg-neutral text-neutral-content w-96">
  <div className="card-body items-center text-center">
    <h1 className="card-title">Profile</h1>
    <p>hi there ${kachuesh}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">change your name</button>
    </div>
  </div>
</div>
<div className="card bg-neutral text-neutral-content w-96">
  <div className="card-body items-center text-center">
    <h2 className="card-title">previous orders</h2>
    <p>a list of your orders and their transaction will show up here</p>
  </div>
</div>
<div className="card bg-neutral text-neutral-content w-96">
  <div className="card-body items-center text-center">
    <h2 className="card-title">Details</h2>
    <p>your details will show up here</p>
    </div>
  </div>
</div>
  )
}

export default Profile;
