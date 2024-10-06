'use client';
import CreateNewChapter from '@/components/course/create-chapter';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/data';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ArrowUp,
  Edit3Icon,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ChaptersForm from './chapter-form';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import RecycleBin from './recycle-bin';
import ImportChapter from './import-chapter';

interface SidebarProps {
  data: Course;
}

const Sidebar = ({ data }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <aside className="h-[100vh] border-r flex flex-col overflow-y-hidden bg-white shadow-sm justify-between">
      <div className="flex flex-col">
        <div className="px-6 flex gap-2 items-center py-4 border-b-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <span>Rainbox</span>
          </Link>
        </div>
        <div className="flex gap-2 py-2 px-4 w-full">
          <Link href="/dashboard">
            <Button className="px-2" size="sm" variant="outline">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 px-4 w-full">
          <div
            className={cn(
              'text-sm py-2 rounded-md w-full font-semibold flex items-center justify-between',
              pathname.includes('master' ? 'bg-black' : '')
            )}
          >
            <p>Header & Footer</p>
            <Link href={`/course/${data.id}/header-footer`}>
              <Button
                size="icon"
                type="button"
                className="h-8 w-8"
                variant="secondary"
              >
                <Edit3Icon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full flex-col flex-grow">
          {/* CHAPTERS */}
          <div className="flex mx-4 items-center justify-between">
            <div className="text-sm font-semibold">Chapters</div>
            <div>
              <CreateNewChapter data={data} />
            </div>
          </div>
          <ChaptersForm initialData={data} courseId={data.id} />
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="text-sm hover:bg-slate-100  cursor-pointer px-4 rounded-md w-full flex items-center">
          <ImportChapter courseId={data.id} />
        </div>
        <div className="text-sm hover:bg-slate-100 mb-2 cursor-pointer px-4 rounded-md w-full flex items-center">
          <RecycleBin data={data} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
