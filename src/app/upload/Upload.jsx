'use client';

import React, { useState } from 'react';

function Upload() {
  const [rows, setRows] = useState([{ id: Date.now() }]);

  // Function to handle adding a new row
  const addRow = () => {
    setRows([...rows, { id: Date.now() }]);
  };

  // Function to handle deleting a row
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container to take full screen height */}
      
      {/* Dynamically added rows */}
      <div>
        {rows.map((row) => (
          <div key={row.id} className="card bg-base-100 w-full shadow-xl flex items-center mb-4 p-4">
            <div className="flex w-full flex-col lg:flex-row">
              {/* File Input Section */}
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs mr-2"
                />
              </div>

              {/* Select Option Section */}
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <select className="select select-warning w-full max-w-xs mr-2">
                  <option disabled>Select an option</option>
                  <option>A5 color</option>
                  <option>A2 color</option>
                  <option>A5 black and white</option>
                  <option>A2 black and white</option>
                  <option>A1 color</option>
                  <option>A1 black and white</option>
                  <option>A4 color duplex</option>
                  <option>A3 color duplex</option>
                  <option>A4 black and white duplex</option>
                  <option>A3 black and white duplex</option>
                  <option>Letter size color</option>
                  <option>Letter size black and white</option>
                  <option>Tabloid color</option>
                  <option>Tabloid black and white</option>
                  <option>Poster color</option>
                  <option>Poster black and white</option>
                </select>
              </div>

              {/* Upload and Delete Buttons */}
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <button className="btn btn-outline btn-info">Upload</button>
              </div>
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <button
                  className="btn btn-outline btn-danger"
                  onClick={() => deleteRow(row.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button - Positioned just below the rows */}
      <div className="card bg-base-100 w-full shadow-xl mb-4">
        <button className="btn btn-outline btn-accent w-full" onClick={addRow}>
          Add
        </button>
      </div>

      {/* Checkout Button - Fixed at the bottom */}
      <div className="mt-auto"> {/* This ensures it's at the bottom of the screen */}
        <div className="card bg-base-100 w-full shadow-xl">
          <button className="btn btn-outline btn-accent w-full">
            Proceed for Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
