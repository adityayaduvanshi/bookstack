"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

interface TemplateLinkProps {
  linkPath: string;
}



const TemplateButton = ({linkPath}: TemplateLinkProps) => {
  const [showButton, setShowButton] = useState(false);

  

  useEffect(() => {
    setShowButton(true);
  }, []);


  return (
    <>
      {showButton && (
        <div className="flex gap-2 py-4 px-4 w-full">
          <Link href={linkPath} className="px-2">
            <Button>
           Template 1
           </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default TemplateButton;
