'use client';

import React, { useState } from 'react';
import { FaComment, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

function Upload() {
  const [rows, setRows] = useState([{ id: Date.now(), showComment: false, comment: '', comments: [] }]);

  // Function to handle adding a new row
  const addRow = () => {
    setRows([...rows, { id: Date.now(), showComment: false, comment: '', comments: [] }]);
  };

  // Function to handle deleting a row
  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Function to toggle the comment bar
  const toggleComment = (id) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, showComment: !row.showComment } : row)));
  };

  // Function to handle comment input change
  const handleCommentChange = (id, value) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, comment: value } : row)));
  };

  // Function to handle sending a comment
  const handleSendComment = (id) => {
    setRows(rows.map((row) => {
      if (row.id === id && row.comment.trim()) {
        return {
          ...row,
          comments: [...row.comments, { id: Date.now(), text: row.comment }],
          comment: '', // Clear the input
        };
      }
      return row;
    }));
  };

  // Function to delete a specific comment
  const handleDeleteComment = (rowId, commentId) => {
    setRows(rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          comments: row.comments.filter((comment) => comment.id !== commentId),
        };
      }
      return row;
    }));
  };

  // Function to edit a specific comment
  const handleEditComment = (rowId, commentId, newText) => {
    setRows(rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          comments: row.comments.map((comment) =>
            comment.id === commentId ? { ...comment, text: newText } : comment
          ),
        };
      }
      return row;
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamically added rows */}
      <div>
        {rows.map((row) => (
          <div key={row.id} className="card bg-base-100 w-full shadow-xl mb-4 p-4">
            <div className="flex w-full flex-col lg:flex-row items-center">
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

              {/* Upload, Delete, and Comment Buttons */}
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <button className="btn btn-outline btn-info">Upload</button>
              </div>
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <button
                  className="btn btn-outline btn-danger flex items-center gap-2"
                  onClick={() => deleteRow(row.id)}
                >
                  <FaTrashAlt className="hidden lg:inline" /> <span className="lg:hidden">Delete</span>
                </button>
              </div>
              <div className="card rounded-box grid h-auto flex-grow place-items-center p-2">
                <button
                  className="btn btn-outline btn-secondary flex items-center gap-2"
                  onClick={() => toggleComment(row.id)}
                >
                  <FaComment className="hidden lg:inline" /> <span className="lg:hidden">Comment</span>
                </button>
              </div>
            </div>

            {/* Comment Bar */}
            {row.showComment && (
              <div className="mt-4 flex items-center gap-2">
                <textarea
                  className="textarea textarea-bordered flex-grow"
                  placeholder="Add your comment here..."
                  value={row.comment}
                  onChange={(e) => handleCommentChange(row.id, e.target.value)}
                ></textarea>
                <button
                  className="btn btn-outline btn-success flex items-center gap-2"
                  onClick={() => handleSendComment(row.id)}
                >
                  <FiSend /> Send
                </button>
              </div>
            )}

            {/* Sent Comments */}
            <div className="mt-4">
              {row.comments.map((comment) => (
                <div key={comment.id} className="flex items-center gap-2 mb-2">
                  <input
                    className="input input-bordered flex-grow"
                    value={comment.text}
                    onChange={(e) => handleEditComment(row.id, comment.id, e.target.value)}
                  />
                  <button
                    className="btn btn-outline btn-danger"
                    onClick={() => handleDeleteComment(row.id, comment.id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="card bg-base-100 w-full shadow-xl mb-4">
        <button className="btn btn-outline btn-accent w-full" onClick={addRow}>
          Add
        </button>
      </div>

      {/* Checkout Button */}
      <div className="mt-auto">
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
