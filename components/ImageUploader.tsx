"use client";

import { useCallback, useState } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File, base64: string) => void;
  currentImage: string | null;
}

export default function ImageUploader({
  onImageSelect,
  currentImage,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];
        onImageSelect(file, base64);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = "hidden";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFile(file);
    };
    input.click();
  }, [handleFile]);

  return (
    <div
      className={`
        relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group
        ${
          isDragging
            ? "border-black bg-gray-50 bg-opacity-50"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }
        ${currentImage ? "border-solid border-transparent p-0" : "p-8"}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      {currentImage ? (
        <div className="w-full h-full relative">
          <img
            src={`data:image/jpeg;base64,${currentImage}`}
            alt="Uploaded product"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <p className="text-white font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
              Click to change image
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Upload Product</h3>
            <p className="text-sm text-gray-500 mt-1">
              Drag & drop or click to browse
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
