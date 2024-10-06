"use client"
import React, { useState } from "react";
import { Course, Website } from "@prisma/client";
import axios from "axios";


interface WebsiteProps {
  courseId: string;
  website: Website | any;
}


  
const WebsiteUrl = ({
  courseId,
  website,
}: WebsiteProps) => {


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
    <div>
    {`${website?.domain}.localhost:3000`}
    </div>
  )
}

export default WebsiteUrl
