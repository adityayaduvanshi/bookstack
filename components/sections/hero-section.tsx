import React from 'react';

const HeroSection = () => {
  return (
    <section aria-label="hero section" className=" mt-16  w-full md:mt-48">
      <div className="container flex flex-col items-center gap-6 text-center">
        <h1 className="animate-fade-up font-urbanist text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <div>
            Robust Email
            <span className="bg-gradient-to-r from-pink-600 to-purple-400 bg-clip-text font-extrabold text-transparent">
              Website
            </span>
          </div>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
