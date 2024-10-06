import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Course, Website, User, Chapter } from '@prisma/client';

interface LaunchFormProps {
  data: Course & { user: User; website: Website; chapters: Chapter };
  chapterCount: number;
}

const LaunchCard = ({ data, chapterCount }: LaunchFormProps) => {
  const isHeaderComplete = Boolean(data.headerJson || data.header);
  const isFooterComplete = Boolean(data.footerJson || data.footer);
  const isChapterComplete = Boolean(data.chapters);
  const isCourseDescriptionComplete = Boolean(data.description);
  // const isCourseOutlineComplete = chapterCount > 0;
  const isWebpageUrlComplete = Boolean(data.website.domain);
  const isLemonSqueezyProductIdComplete = Boolean(data.productID);
  const isLemonSqueezyApiKeyComplete = Boolean(data.user.lemonApiKey);

  return (
    <div className="w-[40%]">
      <Card className="bg-white shadow-md">
        <CardHeader className="pt-7">
          <CardTitle className="text-xl font-semibold">
            Launch checklist
          </CardTitle>
          <CardDescription className="text-md text-gray-600">
            Ensure that everything is in place and hit Publish!
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <h3 className="font-semibold mb-2 text-md ml-2">Course Emails</h3>
          <ul className="space-y-6 mt-5 ml-5">
            <li className="flex items-center gap-3">
              <Checkbox aria-readonly checked={isHeaderComplete} />
              <Label>Header</Label>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox aria-readonly checked={isFooterComplete} />
              <Label>Footer</Label>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox aria-readonly checked={isChapterComplete} />
              <Label>Chapters ({chapterCount})</Label>
            </li>
          </ul>
          <h3 className="font-semibold mb-2 text-md ml-2 mt-8">Webpage</h3>
          <ul className="space-y-6 mt-6 ml-5 ">
            <li className="flex items-center gap-3">
              <Checkbox checked={isCourseDescriptionComplete} />
              <Label>Course description</Label>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox />
              <Label>Course outline</Label>
            </li>
          </ul>
          <h3 className="font-semibold mb-2 text-md ml-2 mt-8">
            Configuration
          </h3>
          <ul className="space-y-6 mt-6 ml-5">
            <li className="flex items-center gap-3">
              <Checkbox checked={isWebpageUrlComplete} />
              <Label>Course webpage URL</Label>
            </li>
            <li className="flex items-center gap-3">
              <Checkbox checked={isLemonSqueezyProductIdComplete} />
              <Label>Lemon Squeezy Product ID</Label>
            </li>
            <li className="flex items-center gap-3 pb-4">
              <Checkbox checked={isLemonSqueezyApiKeyComplete} />
              <Label>Lemon Squeezy API Key</Label>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LaunchCard;
