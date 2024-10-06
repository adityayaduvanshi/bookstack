import React from 'react';
import {
  getAuthenticatedUser,
  lemonSqueezySetup,
} from '@lemonsqueezy/lemonsqueezy.js';
import { db } from '@/lib/db';
interface WebsitePageProps {
  params: { creator: string; site: string };
}
const page = async ({ params }: WebsitePageProps) => {
  const website = await db.website.findFirst({
    where: {
      course: { user: { creatorName: params.creator } },
      domain: params.site,
    },
    include: {
      course: {
        include: {
          user: true,
        },
      },
    },
  });
  if (!website) {
    return null;
  }
  const apiKey = website.course.user.lemonApiKey || undefined;
  let ls;
  if (apiKey) {
    ls = lemonSqueezySetup({ apiKey });
  } else {
    console.log('Lemon Squeezy API key not found for this user');
  }
  const { data, error } = await getAuthenticatedUser();
  console.log(data);
  return <div>page</div>;
};

export default page;
