import React from 'react';

interface FilePreviewProps {
  previewUrl: string;
  fileType: string;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ previewUrl, fileType }) => {
  if (!previewUrl) return null;

  return (
    <div className="mt-2">
      {fileType.startsWith('image/') ? (
        <img src={previewUrl} alt="Preview" className="max-w-xs max-h-40" />
      ) : (
        <iframe src={previewUrl} title="Preview" className="w-full max-w-xs h-40" />
      )}
    </div>
  );
};