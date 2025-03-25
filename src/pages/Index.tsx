
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import JobCategories from '@/components/JobCategories';
import FeaturedJobs from '@/components/FeaturedJobs';
import HowItWorks from '@/components/HowItWorks';
import AvailableNowSection from '@/components/AvailableNowSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <JobCategories />
        <FeaturedJobs />
        <AvailableNowSection />
        <HowItWorks />
        <TestimonialsSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
