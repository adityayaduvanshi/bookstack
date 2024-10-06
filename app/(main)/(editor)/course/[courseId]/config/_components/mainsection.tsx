'use client';

import React, { useState } from 'react';
import { Course, Website } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DomainSetting from './domainsetting';
import Email from './email';
import { Pencil } from 'lucide-react';
import WebsiteUrl from './website';
import Sender from './sender';
import Price from './price';

interface DomainSettingFormProps {
  website: Website | any;
  courseId: string;
  data: Course | any;
}

const DomainSettingForm = ({
  website,
  courseId,
  data,
}: DomainSettingFormProps) => {
  const [courseDomain, setCourseDomain] = useState<string>(website?.domain);

  console.log('DATAAA!!!!!', data);
  return (
    <div>
      <div className="p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg underline underline-offset-2 font-semibold mb-3 text-zinc-900">
            Domain setting
          </h2>
          <p className="text-xs">
            You can use your own domain (Eg: course.yourdomain.com),
          </p>
          <p className="text-xs">
            or you use a customizable Rainbox subdomain (Eg:
            subdomain.rainbox.ai)
          </p>
          <div className="mt-2.5">
            {' '}
            <DomainSetting data={data} courseId={courseId} website={website} />
          </div>
          <div className="flex items-center mt-2">
            <Button variant="ghost">Add Custom Domain</Button>
            <p className=" text-sm px-4">Pro Plan applicable</p>
          </div>
        </div>

        <div className="flex items-start">
          <div>
            <h2 className="text-lg underline underline-offset-2 font-semibold text-zinc-900">
              Email
            </h2>
            <div className="flex items-center">
              <p className="text-sm text-gray-600 mr-2 mb-5">
                Emails will be sent from
              </p>
              <Button variant="outline" className="px-4 py-2 rounded ml-20">
                <Pencil className="w-4 h-4 mr-1" /> Update email
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 ">
          <Email />
        </div>

        <div className="flex items-start">
          <div>
            <h2 className="text-lg underline underline-offset-2 font-semibold text-zinc-900 mt-7">
              Website URL
            </h2>
            <div className="flex items-center">
              <p className="text-sm text-gray-600">
                Landing page for your course
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2">
          {' '}
          <WebsiteUrl courseId={courseId} website={website} />
        </div>

        <div className=" border-b-2 border-gray-200 mt-5"></div>

        <Price data={data} courseId={courseId} website={website} />

        <div className=" border-b-2 border-gray-200 mt-10"></div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 mt-8">
            Sender Name
          </h2>
          <p className="mb-5 text-sm text-gray-600">
            This is who subscribers will see the email is from in their inbox.
          </p>
        </div>

        <div className=" flex mt-10 ">
          <Sender />
          <Button variant="outline" className="px-4 py-2 rounded ml-10 mb-6">
            <Pencil className="w-4 h-4 mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DomainSettingForm;
