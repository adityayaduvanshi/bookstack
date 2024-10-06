"use client";
import { X } from "lucide-react";
import React, { useState } from "react";

const InfoAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const handleVisibility = () => {
    setVisible(false);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-9 bg-orange-200 text-slate-950 text-md font-semibold">
      Double click on the text and image to edit
      <div className="absolute right-2 cursor-pointer">
        <X onClick={handleVisibility} />
      </div>
    </div>
  );
};

export default InfoAlert;
