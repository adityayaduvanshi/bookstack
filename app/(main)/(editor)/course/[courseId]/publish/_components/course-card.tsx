'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { LoaderCircle, Tag, Globe, CircleArrowUp } from 'lucide-react';
import { Chapter, Course, User, Website } from '@prisma/client';
import axios from 'axios';

interface CourseFormProps {
  data: Course & { user: User; website: Website; chapters: Chapter | any };
  chapterCount: number;
}

const CourseCard = ({ data, chapterCount }: CourseFormProps) => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `https://api.lemonsqueezy.com/v1/products/${data.productID}`,
          {
            headers: {
              Authorization: `Bearer ${data.user.lemonApiKey}`,
            },
          }
        );

        // Extract the formatted price from the response
        const formattedPrice = response.data.data.attributes.price_formatted;
        setPrice(formattedPrice);
      } catch (error) {
        console.error('Error fetching LemonSqueezy price:', error);
      }
    };

    fetchPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[40%]">
      <Card className="bg-white shadow-md">
        <CardHeader className="p-7">
          {data.pinterest && (
            <Image
              src={data.pinterest}
              width={500}
              height={50}
              alt="Course Browser Image"
              className="h-56"
            />
          )}

          <CardTitle className="text-2xl font-semibold pt-5">
            {data.title}
          </CardTitle>
          <CardDescription className="text-md text-gray-600 mb-4 w-[27rem]">
            {data.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-3">
          <div className="flex gap-2">
            <LoaderCircle className="text-gray-300 w-5 h-5" />
            <p className="text-md text-gray-700 mb-2">
              {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <Tag className="text-gray-300 w-5 h-5" />
            <p className="text-md text-gray-700 mb-2">
              Price: {price ? price : 'Loading...'}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <Globe className="text-gray-300 w-5 h-5" />
            <p className="text-md text-gray-700 mb-4">
              {`Rainbox.app/${data.user?.name
                ?.replace(/\s+/g, '')
                .toLowerCase()}/${data.website.domain}`}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="flex gap-2 pb-6">
            <button className="w-44 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition flex items-center justify-center">
              <CircleArrowUp className="mr-2" />
              Publish
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseCard;
