import DashboardNavbar from '@/components/dashboard/_components/navbar';
import Sidebar from '@/components/dashboard/_components/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2Icon, LoaderIcon } from 'lucide-react';
import React, { Suspense } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className=" h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <DashboardNavbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      {/* <Suspense fallback={<DashboardSkeleton />}> */}
        <main className="md:pl-56 h-full pt-[80px]">{children}</main>
      {/* </Suspense> */}
    </div>
  );
};

export default DashboardLayout;

const DashboardSkeleton = () => {
  return (
    <div className="h-screen w-screen flex justify-center  items-center">
      <LoaderIcon className=" animate-spin " />
    </div>
  );
};
