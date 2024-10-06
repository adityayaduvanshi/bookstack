"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";

interface DragNdropProps {
  onFilesSelected: (files: File[]) => void;
  width: string;
  height: string;
}

const DragNdropImage: React.FC<DragNdropProps> = ({ onFilesSelected, width, height }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section
      className={`flex justify-center items-center border-2 rounded-lg p-4 ${
        isDragging ? 'border-blue-500' : 'border-gray-300 border-dashed'
      }`}
      style={{ width, height }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="w-full h-full flex flex-col items-center cursor-pointer justify-center">
        {files.length === 0 && (
          <>
            <div className="flex flex-col items-center text-center">
              <AiOutlineCloudUpload className="text-4xl text-gray-500" />
              <div>
                <p className="text-gray-400 text-md cursor-pointer">Drag and Drop files here</p>
                <p className="text-gray-400 text-md">or</p>
              </div>
            </div>
            <div className="flex justify-center">
              <input
                type="file"
                id="browse"
                onChange={handleFileChange}
                accept=".html,.md,.eml"
                multiple
                className="hidden"
              />
              <label
                htmlFor="browse"
                className="mt-4 text-blue-400 inline-block border border-blue-400 py-2 px-4 rounded cursor-pointer"
              >
                Browse files
              </label>
            </div>
          </>
        )}

        {files.length > 0 && (
          <div className="mt-4 w-full">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 border border-gray-300 rounded mb-2"
              >
                <div className="flex-1">
                  <p className="text-sm">{file.name}</p>
                </div>
                <MdClear
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-2 flex items-center font-normal text-sm text-green-600">
            <AiOutlineCheckCircle className="mr-1" />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DragNdropImage;
