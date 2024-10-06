"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
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
} from "@/components/ui/alert-dialog"



const RecycleDatatableActions = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {templateOn,toggleTemplate}=useTemplateStore()
  

  const handleRestore= async ()=>{
  
       try {
         
        const response= await axios.patch(`/api/course/${courseId}/restore`)

        router.refresh()

       } catch (error) {
        
        console.log(error)
       }
  }


  const handleDelete= async ()=>{
  
    try {
      setIsLoading(true)
     const response= await axios.delete(`/api/course/${courseId}/permanent-trash`)

     router.refresh()

    } catch (error) {


     
     console.log(error)
    }

    finally {setIsLoading(false)}
}

console.log(templateOn)



  return (

    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRestore}>
          Restore
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTemplate}  >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

<AlertDialog open={templateOn} onOpenChange={toggleTemplate}>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your course
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-rose-500">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  
</>
  );
};

export default RecycleDatatableActions;
