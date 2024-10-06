'use client';
import { Course } from '@/types/data';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDown, Eye, Settings, Share2, Sun, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import { ModeToggle } from '@/components/mode-toggle';

interface NavbarProps {
  data: Course;
  userImage?: string;
}
const Navbar = ({ data, userImage }: NavbarProps) => {
  const pathname = usePathname();

  const links = [
    {
      id: 'emailEditor',
      href: `/course/${data.id}/chapters/${data.chapters[0].id}`,
      title: 'Email Editor',
    },
    {
      id: 'webpageEditor',
      href: `/course/${data.id}/website`,
      title: 'Webpage Editor',
    },
    { id: 'configure', href: `/course/${data.id}/config`, title: 'Configure' },
    { id: 'publish', href: `/course/${data.id}/publish`, title: 'Publish' },
  ];

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <div className="flex items-center space-x-4">
        <Image src="/book-icon.png" alt="Book" width={24} height={24} />
        <h1 className="text-lg font-semibold">{data.title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
          <Settings size={16} className="inline mr-1" />
          Settings
        </button>
        <button className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
          <Eye size={16} className="inline mr-1" />
          Preview
        </button>
        <button className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
          <Share2 size={16} className="inline mr-1" />
          Export
        </button>
        <ModeToggle />
        <div className="flex items-center space-x-1">
          <User />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
