"use client";
import { Template } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import useTemplateStore from "@/store/useTemplate";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";

interface SavedTemplateItemProps {
  data: Template 
  courseId: string;
}
const SavedTemplateItem = ({ data, courseId }: SavedTemplateItemProps) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [istemplateOn,setIsTemplateOn]=useState(false)

  const handleApplyTemplate = async () => {
    try {
      const response = await axios.post(`/api/course/${courseId}/website`, {
        htmlContent: data?.htmlContent,
        jsonContent: data?.jsonContent,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };



  const handleDelete = async () => {

    try {
     
      setIsLoading(true);
      const response = await axios.delete(
        `/api/template/delete/${data.id}`

      
      );

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" relative aspect-square bg-slate-200  flex items-center justify-center text-xs px-2">
        {data?.title}
        <div className=" absolute bottom-0 right-1">
          <Popover>
            <PopoverTrigger>
              {" "}
              <MoreVertical className=" h-4 w-4 cursor-pointer  text-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className=" px-1 py-1 w-fit ">
              <div className="grid text-sm text-left">
                <div
                  onClick={handleApplyTemplate}
                  className=" rounded-md hover:bg-slate-200 cursor-pointer py-1 px-2"
                >
                  Apply
                </div>
                <div onClick={()=>setIsTemplateOn(true)} className="hover:bg-slate-200 rounded-md  cursor-pointer py-1 px-2">
                  Delete
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <AlertDialog open={istemplateOn} onOpenChange={()=>setIsTemplateOn(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              saved data template from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-rose-500"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SavedTemplateItem;
