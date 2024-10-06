import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';

interface WebsitePageProps {
  params: { creator: string; site: string };
}

const WebsitePage = async ({ params }: WebsitePageProps) => {
  const website = await db.website.findFirst({
    where: {
      course: { user: { creatorName: params.creator } },
      domain: params.site,
    },
  });
  if (!website) {
    return notFound();
  }
  if (!website?.draftHtmlContent) {
    return notFound();
  }
  let content = website.draftHtmlContent;
  const subscriptionUrl = `/${params.creator}/${params.site}/subscription`;
  content = content.replace(
    '<a href="" id="subscription-link">',
    `<a href="${subscriptionUrl}" id="subscription-link">`
  );
  return (
    <main className="  ">
      <style>{website.draftCssContent}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
};

export default WebsitePage;
