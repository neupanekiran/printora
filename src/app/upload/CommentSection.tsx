import React from 'react';
import { FiSend } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

interface CommentSectionProps {
  showComment: boolean;
  comment: string;
  comments: { id: number; text: string }[];
  onCommentChange: (value: string) => void;
  onSendComment: () => void;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (commentId: number, newText: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  showComment,
  comment,
  comments,
  onCommentChange,
  onSendComment,
  onDeleteComment,
  onEditComment,
}) => {
  return (
    <>
      {showComment && (
        <div className="mt-4 flex items-center gap-2">
          <textarea
            className="textarea textarea-bordered flex-grow"
            placeholder="Add your comment here..."
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
          <button
            className="btn btn-outline btn-success flex items-center gap-2"
            onClick={onSendComment}
          >
            <FiSend /> Send
          </button>
        </div>
      )}
      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center gap-2 mb-2">
            <input
              className="input input-bordered flex-grow"
              value={comment.text}
              onChange={(e) => onEditComment(comment.id, e.target.value)}
            />
            <button
              className="btn btn-outline btn-danger"
              onClick={() => onDeleteComment(comment.id)}
            >
              <FaTrashAlt /> Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};