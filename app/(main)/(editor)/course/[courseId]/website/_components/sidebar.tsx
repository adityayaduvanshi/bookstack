'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Course } from '@/types/data';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useParams, useRouter } from 'next/navigation';

import axios from 'axios';
import { User } from '@prisma/client';
interface TemplateProps {
  data: Course & { user: User };
}

const Sidebar = ({ data }: TemplateProps) => {
  const router = useRouter();
  const templateCSS = `* { box-sizing: border-box; } body {margin: 0;}#ia67{background-color:#1c1e21;color:white;padding:20px;text-align:center;}#ihyc{display:flex;margin-top:20px;}#ibs4{width:25%;padding:20px;background-color:#f5f5f5;}#ih3ro{background-color:#000;}#i968i{width:75%;padding:20px;}#iilqb{background-color:#1c1e21;color:white;padding:10px;text-align:center;margin-top:20px;}`;
  const template = `
<body><header id="ia67"><h1>Javascript</h1><p>Instructor Name</p></header><div id="ihyc"><aside id="ibs4"><h2>Course Content</h2><ul><li>Introduction</li><li>Lesson 1</li><li>Lesson 2</li><li>Conclusion</li></ul><a href="" id="subscription-link"><button  id="buy-course">Buy course</button></a></aside><main id="i968i"><h2>Course Description</h2><img src="{data.pinterest}/"/><p>This is a detailed course description. Here you can add more information about the course.</p><img width="500px" height="200px" src="https://images.unsplash.com/photo-1717715118448-9494035f862e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></main></div><footer id="iilqb"><p>© 2024 Rainbox</p></footer></body>

`;
  const saveContent = async () => {
    try {
      const response = await axios.post(`/api/course/${data.id}/web`, {
        htmlContent: template,
        cssContent: templateCSS,
      });
      router.refresh();
      // console.log('Content saved:', htmlContent, cssContent, jsContent);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };
  return (
    <div className="h-full border-r flex flex-col overflow-y-hidden bg-white shadow-sm  justify-between ">
      <div>
        <div className="px-6 flex gap-2 items-center py-4 border-b-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <span>Rainbox</span>
          </Link>
        </div>
        <div className="flex gap-2 py-4 px-4 w-full">
          <Link href="/dashboard">
            <Button className="px-2" size="sm" variant="outline">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className=" text-sm font-semibold p-3  ">Templates</div>

        <div className=" relative aspect-video bg-slate-200  flex items-center justify-center text-xs m-2 border border-slate-900">
          <div className="absolute top-0 right-1">
            <SquareArrowOutUpRight className="h-4 w-4 text-muted-foreground " />
          </div>
          <div className=" absolute bottom-0 right-1">
            <Popover>
              <PopoverTrigger>
                {' '}
                <Menu className=" h-4 w-4 cursor-pointer  text-muted-foreground" />
              </PopoverTrigger>
              <PopoverContent className=" px-1 py-1 w-fit ">
                <div className="grid text-sm text-left">
                  <div
                    onClick={saveContent}
                    className=" rounded-md hover:bg-slate-200 cursor-pointer py-1 px-2"
                  >
                    Use
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="w-full flex-col"></div>
      </div>
    </div>
  );
};

export default Sidebar;
