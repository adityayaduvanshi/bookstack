import React, { useState } from 'react';
import Image from 'next/image';
import { Course, Website } from '@prisma/client';
import axios from 'axios';

interface EmbedProps {
  data: Course | any;
  courseId: string;
  website: Website | any;
}

const Embedpreview = ({ data, courseId, website }: EmbedProps) => {
  const [courseDomain, setCourseDomain] = useState<string>(website?.domain);

  const handleCourseDomain = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/course/${courseId}/config`, {
        domain: courseDomain.toLowerCase(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-14 flex flex-col bg-white shadow-md rounded-lg p-4 w-[35rem]">
      <div className="flex items-center justify-between">
        <div className="mb-14">
          <h2 className=" text-xl font-semibold">{`${data.title}`}</h2>
          <p className=" mt-1 text-l">Sub-heading</p>
        </div>
        <div className="w-32 h-32 bg-gray-300 mb-4 ml-4">
          {/* <Image
            src=""
            alt="Course Image"
            className="w-full h-full object-cover"
          /> */}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-semibold ml-5">{`$ ${data?.price}`}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 mr-24 rounded max-w-56">
          Subscribe to course
        </button>
      </div>
    </div>
  );
};

export default Embedpreview;
