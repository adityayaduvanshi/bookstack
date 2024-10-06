"use client";

import { ClipboardPenLine, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-hidden bg-white shadow-sm">
      <div className="px-6 flex gap-2 items-center py-4 border-b-2">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span>Rainbox</span>
        </Link>
      </div>

      

      {/* This div will take up all available space, pushing the links to the bottom */}
      <div className="flex-grow"></div>

      <div className="border-b-2 mb-3"></div>

      <div className="flex flex-col mb-4">
        <Link href="" className="flex ml-5 mb-4">
          <MessageCircleQuestion className="mr-1.5" /> Support
        </Link>

        <Link href="" className="flex ml-5">
          <ClipboardPenLine className="mr-1.5" /> Feedback
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
