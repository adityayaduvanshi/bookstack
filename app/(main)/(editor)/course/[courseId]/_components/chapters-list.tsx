'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Chapter } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  ArrowDownIcon,
  ArrowUp01Icon,
  ArrowUpIcon,
  Copy,
  EllipsisVerticalIcon,
  Grip,
  GripHorizontal,
  Pencil,
  Trash,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; order: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);
  const pathname = usePathname();
  const [isLoading, setIsloading] = useState<boolean>(false);
  // console.log(router, 'saaaaaaaaaaaaaaaaaaaa');
  const [hoveredChapterIndex, setHoveredChapterIndex] = useState<number | null>(
    null
  );
  const router = useRouter();
  const handleMouseEnter = (index: number) => {
    setHoveredChapterIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredChapterIndex(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedChapters = items.slice(startIndex, endIndex + 1);
    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      order: items.findIndex((item) => item.id === chapter.id),
    }));
    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }
  const handleAddChapter = async (insertPosition: number) => {
    try {
      const response = await axios.post(
        `/api/course/${chapters[0].courseId}/chapters/create`,
        {
          insertPosition: insertPosition,
        }
      );
      router.refresh();
      //  TOAST
    } catch (error) {
      console.log('Something went wrong', error);
      //  TOAST
    }
  };

  const deleteChapter = async (id: string) => {
    try {
      const response = await axios.patch(
        `/api/course/${chapters[0].courseId}/chapters/${id}/trash`
      );
      // router.refresh();
      window.location.reload();
      router.push(`/course/${chapters[0].courseId}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const duplicateChapter = async (id: string) => {
    try {
      const response = await axios.post(
        `/api/course/${chapters[0].courseId}/chapters/${id}/duplicate`
      );
      router.refresh();
      // router.push(`/course/${chapters[0].courseId}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2   border-slate-200 border text-slate-700 rounded-md mb-2 text-sm',
                      pathname.includes(chapter.id)
                        ? 'bg-slate-300'
                        : 'bg-slate-200'
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={cn(
                        'px-2 py-1.5 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition'
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripHorizontal className="h-4 w-4" />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className=" hover:underline text-nowrap  text-ellipsis overflow-hidden">
                          <Link
                            className=" hover:underline text-nowrap  text-ellipsis overflow-hidden"
                            href={`/course/${chapter.courseId}/chapters/${chapter.id}`}
                          >
                            {chapter.title}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs" side="right">
                          {chapter.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {hoveredChapterIndex === index && (
                        <Popover>
                          <PopoverTrigger>
                            <EllipsisVerticalIcon className="  h-4 w-4 text-muted-foreground" />
                          </PopoverTrigger>
                          <PopoverContent
                            className=" px-[4px] py-[2px]  max-w-[10rem]  text-left"
                            side="right"
                          >
                            <div className=" grid gap-[4px] text-left text-sm">
                              <div
                                onClick={() => handleAddChapter(chapter.order)}
                                className="  flex px-1  items-center min-h-[28px] hover:bg-slate-200 rounded-md cursor-pointer "
                              >
                                <ArrowUpIcon className=" h-4 w-4 mr-[6px] text-gray-700" />{' '}
                                Add Above
                              </div>
                              <div
                                onClick={() =>
                                  handleAddChapter(chapter.order + 1)
                                }
                                className="  flex  px-1   items-center min-h-[28px] hover:bg-slate-200 rounded-md cursor-pointer "
                              >
                                <ArrowDownIcon className=" h-4 w-4 mr-[6px] text-gray-700" />{' '}
                                Add Below
                              </div>
                              <div
                                onClick={() => duplicateChapter(chapter.id)}
                                className="  flex  px-1  items-center min-h-[28px] hover:bg-slate-200 rounded-md cursor-pointer "
                              >
                                <Copy className=" h-4 w-4 mr-[6px] text-gray-700" />{' '}
                                Duplicate
                              </div>
                              <div
                                onClick={() => deleteChapter(chapter.id)}
                                className="  flex  px-1  items-center min-h-[28px] hover:bg-slate-200 rounded-md cursor-pointer "
                              >
                                <Trash className=" h-4 w-4 mr-[6px] text-gray-700" />{' '}
                                Move to trash
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
