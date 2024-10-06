'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Course, Website } from '@prisma/client';
import axios from 'axios';
import Embedpreview from './embedpreview';
import { useRouter } from 'next/navigation';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { useToast } from '@/components/ui/use-toast';

interface PublishFormProps {
  data: Course | any;
  courseId: string;
  website: Website | any;
}

const MainForm = ({ data, courseId, website }: PublishFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const confetti = useConfettiStore();
  const handlePublish = async () => {
    // Logic to publish the course

    try {
      setIsLoading(true);
      if (data.published) {
        const response = await axios.patch(`/api/course/${courseId}/unpublish`);
        toast({ title: 'Course unpublished' });
      } else {
        const response = await axios.patch(`/api/course/${courseId}/publish`);
        toast({ title: 'Course published' });
        confetti.onOpen();
      }
      // SHOW SUCCESS MESSAGE

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-semibold mb-3 text-zinc-900">
            {`${data.title}`}
          </h2>
          <Button
            disabled={isLoading}
            onClick={handlePublish}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 mr-[350px] rounded-full ..."
          >
            {data.published ? 'Unpublish' : 'Publish'}
          </Button>
        </div>

        <p className="text-md font-semibold mb-3 text-zinc-900">
          Course website link
        </p>

        <div className="flex items-center  mb-4">
          <p>{`${website?.domain}.localhost:3000`}</p>
          <Button className="ml-10 font-semibold  " size="sm">
            Copy
          </Button>
        </div>

        {/* <Embedpreview data={data} courseId={courseId} website={website} /> */}
      </div>
    </div>
  );
};

export default MainForm;
