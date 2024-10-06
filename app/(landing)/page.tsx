import HeroSection from '@/components/sections/hero-section';
import { signIn } from '@/lib/auth';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-16 md:gap-32">
      <HeroSection />
    </div>
  );
};

export default LandingPage;
