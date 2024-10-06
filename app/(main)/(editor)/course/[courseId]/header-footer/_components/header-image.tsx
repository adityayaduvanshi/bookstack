'use client';
import React, { useState, useRef } from 'react';
import { HeaderProps } from './header';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const HeaderImage = ({ course, courseID }: HeaderProps) => {
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = uploadedUrl || course?.pinterest || '/uploader.jpg';

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    setError('');
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(`/api/course/${courseID}/header-image`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadedUrl(data.url);
        } else {
          setError('Error uploading image');
        }
      } catch (error) {
        setError('Error uploading image');
      }
    }
    setLoading(false);
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center max-w-3xl  bg-white rounded-lg shadow-md">
      {/* <h2 className="mb-4 text-xl font-semibold">Course Banner Image</h2> */}
      <div className="relative w-full h-[200px] mb-4">
        <Image
          layout="fill"
          className="object-cover rounded-lg"
          src={displayUrl}
          alt="Course Banner"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleChangeImage}
            className="bg-white text-black hover:bg-gray-200"
          >
            Change Image
          </Button>
        </div>
      </div>
      <Input
        ref={fileInputRef}
        accept=".png,.jpg,.jpeg"
        id="picture"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      {loading && <div className="mb-4 text-blue-500">Uploading...</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <p className="text-xs text-gray-500">
        Recommended size: 600x200 pixels. Supported formats: PNG, JPG, JPEG.
      </p>
    </div>
  );
};

export default HeaderImage;
