'use client';
import Link from 'next/link';
import {
  List,
  LineChart,
  Wallet,
  Settings,
  Trash2,
  Globe,
  ArrowUp,
  TriangleAlert,
  MessageCircle,
} from 'lucide-react';
import CreateCourse from '../create-course';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import SupportDialog from '../support-dialog';

interface Route {
  id: string;
  href: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const routes1: Route[] = [
  {
    id: 'courses',
    href: '/dashboard',
    title: 'My Courses',
    icon: List,
  },
  // {
  //   id: 'analytics',
  //   href: '/dashboard/analytics',
  //   title: 'Analytics',
  //   icon: LineChart,
  // },
  {
    id: 'payments',
    href: '/dashboard/payments',
    title: 'Payments',
    icon: Wallet,
  },
  {
    id: 'settings',
    href: '/dashboard/settings',
    title: 'Settings',
    icon: Settings,
  },
];

const routes2: Route[] = [
  {
    id: 'recycleBin',
    href: '/dashboard/recyclebin',
    title: 'Recycle Bin',
    icon: Trash2,
  },
  { id: 'viewWebsite', href: '/', title: 'View Website', icon: Globe },
  {
    id: 'featurereq',
    href: '/dashboard/support',
    title: 'Feature request',
    icon: ArrowUp,
  },
  {
    id: ' Report Issues',
    href: '/dashboard/viewWebsite',
    title: ' Report Issues',
    icon: TriangleAlert,
  },
  {
    id: 'support',
    href: '/dashboard/support',
    title: 'Support',
    icon: MessageCircle,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (id: string, href: string) => {
    if (id === 'support') {
      handleDialogOpen();
    } else {
      router.push(href);
    }
  };

  return (
    <div className="h-full  border-r flex flex-col overflow-y-auto bg-white shadow-sm  justify-between ">
      <div className="flex-grow">
        <div className="px-6 py-4 border-b-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span>Rainbox</span>
          </Link>
        </div>
        <div className="flex flex-col py-4  w-full">
          <div className=" px-4">
            <CreateCourse />
          </div>
          <Separator className=" mt-4  bg-gray-200 w-full" />
          <div className="grid mt-4 gap-3">
            {routes1.map((item) => (
              <div
                onClick={() => router.push(item.href)}
                className={cn(
                  `ml-3 h-6 flex px-2 py-4 cursor-pointer items-center`,
                  pathname === item.href ? 'bg-slate-200' : ''
                )}
                // className="ml-3 h-6 flex cursor-pointer items-center"
                key={item.id}
              >
                {item.icon && <item.icon className="w-5 h-5 mr-1.5" />}
                <div className="whitespace-nowrap">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className=" border-b-2 border-gray-200 mt-2"></div>
      </div>

      <div className=" border-b-2 border-gray-200 mb-7"></div>
      <div className="grid gap-3">
        {routes2.map((item) => (
          <div
            onClick={() => handleLinkClick(item.id, item.href)}
            className="ml-4 mb-2 text-gray-500 whitespace-nowrap flex cursor-pointer"
            key={item.id}
          >
            {item.icon && <item.icon className="w-5 h-5 mr-1.5" />}
            {item.title}
          </div>
        ))}
      </div>
      <SupportDialog isOpen={isOpen} handleDialogOpen={handleDialogOpen} />
    </div>
  );
};

export default Sidebar;
