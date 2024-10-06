"use client";
import { getDeletedChapters } from "@/actions/trash-chapters";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import moment from "moment";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Chapter, Course, CourseHistory } from "@prisma/client";
import { Trash2Icon,Trash2, ArchiveRestore  } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { deleteChapter } from "@/actions/delete-chapter";

interface RecycleBinProps {
  data: Course | any;
}

const RecycleBin = ({ data }: RecycleBinProps) => {
  const [isPending, startTransition] = useTransition();
  const [history, setHistory] = useState<Chapter[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  const fetchHistory = async () => {
    startTransition(async () => {
      const result = await getDeletedChapters(data.id);
      console.log(result.data);
      if (result.error) {
        console.error(result.error);
        // You might want to show an error message to the user
      } else if (result.success && result.data) {
        setHistory(result.data);
      }
    });
  };
  useEffect(() => {
    // if (isOpen) {
    //   fetchHistory();
    // }
    fetchHistory();
    setIsloading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isLoading) {
    return null;
  }
  const restoreChapter = async (id: string) => {
    try {
      const response = await axios.patch(
        `/api/course/${data.id}/chapters/${id}/restore`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      const response = await deleteChapter(data.id, chapterId);
      console.log(response?.success);
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="sm">
          <Trash2Icon className="h-4 w-4 mr-2" />{" "}
          <p className="text-sm">Recycle Bin</p>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-xl">Recycle Bin</SheetTitle>
        <SheetDescription className="text-slate-950 font-normal py-3">Restored files appear on top of course outline</SheetDescription>
        <div className=" mt-4">
          {history.map((item) => (
            <Card key={item.id}>
              <CardContent className=" py-2 rounded-none">
                <div className=" grid gap-2">
                  <h2 className=" text-sm font-semibold">{item.title}</h2>
                  <p>{item.previewText}</p>
                </div>
                <div className=" items-center flex justify-between">
                  <div>
                    <span className="text-xs">
                      {moment(item.deletedAt).format("MMMM Do YYYY, h:mm a")}
                    </span>
                  </div>
                  <div>
                    <Button
                      onClick={() => restoreChapter(item.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <ArchiveRestore className=" h-5 w-5"/>
                    </Button>

                    <Button
                      onClick={() => handleDeleteChapter(item.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 className=" h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RecycleBin;
