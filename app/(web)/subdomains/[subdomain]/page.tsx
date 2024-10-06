import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';

interface SubdomainPageProps {
  website: {
    title: string;
    htmlContent: string;
  } | null;
}
async function getWebsiteData(subdomain: string) {
  const website = await db.website.findUnique({
    where: { domain: subdomain, course: { trash: false, published: true } },
  });
  return website;
}
const SubdomainPage = async ({ params }: { params: { subdomain: string } }) => {
  const website = await getWebsiteData(params.subdomain);

  if (!website) {
    notFound();
  }
  const vi = await db.website.update({
    where: { id: website.id },
    data: { visits: website.visits + 1 },
  });

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: website.htmlContent }} />
      <div className=" flex py-2 w-full  justify-center">
        Powered by Rainbox.ai
      </div>
    </div>
  );
};

export default SubdomainPage;
