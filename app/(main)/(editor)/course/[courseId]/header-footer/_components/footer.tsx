'use client';

import React, { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import SocialMediaForm from './socialmediaform';
import { Course } from '@prisma/client';
import { FaGlobe, FaXTwitter } from 'react-icons/fa6';
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface FooterProps {
  courseID: string;
  course: Course | null;
}

const Footer = ({ courseID, course }: FooterProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  if (!course) {
    return null;
  }
  const socialLinks = [
    { id: 1, url: course.instagram, icon: FaInstagram },
    { id: 2, url: course.linkedin, icon: FaLinkedin },
    { id: 3, url: course.github, icon: FaGithub },
    { id: 5, url: course.twitter, icon: FaXTwitter },
    { id: 6, url: course.discord, icon: FaDiscord },
    { id: 7, url: course.youtube, icon: FaYoutube },
    { id: 8, url: course.facebook, icon: FaFacebook },
    { id: 9, url: course.personalWebsite, icon: FaGlobe },
  ];
  return (
    <>
      <div className="flex flex-col items-center my-8">
        <Plus className="cursor-pointer" onClick={handleDialogOpen}>
          Add social icons
        </Plus>
        <SocialMediaForm
          isOpen={isDialogOpen}
          handleDialogOpen={handleDialogOpen}
          courseID={courseID}
          course={course}
        />

        <div className="flex space-x-1">
          {socialLinks.map(
            ({ url, id, icon: Icon }) =>
              url && (
                <Link
                  key={id}
                  href={url}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'hover:bg-gray-100 transition-colors'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-6 h-6" />
                </Link>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Footer;
