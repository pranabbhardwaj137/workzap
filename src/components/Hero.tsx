
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-workzap-light-blue text-workzap-blue text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-workzap-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-workzap-blue"></span>
              </span>
              Connecting Talent with Opportunity
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-tight">
              Find <span className="text-gradient">On-Demand</span> Jobs & Skilled Workers
            </h1>
            
            <p className="mt-6 text-lg text-gray-600">
              WorkZap connects job seekers with recruiters for small tasks, freelance gigs, and volunteering opportunities in your local area.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-workzap-blue hover:bg-workzap-blue/90 text-white" asChild>
                <Link to="/signup">Find Jobs</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup?type=recruiter">Hire Workers</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-gray-900">10K+</span>
                <span className="text-sm text-gray-500">Active Jobs</span>
              </div>
              <div className="h-8 border-r border-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-gray-900">8K+</span>
                <span className="text-sm text-gray-500">Workers</span>
              </div>
              <div className="h-8 border-r border-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-gray-900">15K+</span>
                <span className="text-sm text-gray-500">Recruiters</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in animation-delay-300">
            <div className="glass-card rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto lg:ml-auto lg:mr-0 animate-slide-up animation-delay-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Find jobs near you</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Job title or keyword" 
                    className="input-field pl-10"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Location" 
                    className="input-field pl-10"
                  />
                </div>
                
                <Button className="w-full bg-workzap-blue hover:bg-workzap-blue/90 text-white">
                  Search Jobs
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Popular searches</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-workzap-light-blue text-workzap-blue text-sm rounded-full">
                    Remote
                  </span>
                  <span className="px-3 py-1 bg-workzap-light-blue text-workzap-blue text-sm rounded-full">
                    Part-time
                  </span>
                  <span className="px-3 py-1 bg-workzap-light-blue text-workzap-blue text-sm rounded-full">
                    Web Developer
                  </span>
                  <span className="px-3 py-1 bg-workzap-light-blue text-workzap-blue text-sm rounded-full">
                    Designer
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block absolute -bottom-6 -left-10 h-24 w-24 bg-workzap-blue/10 rounded-full blur-xl"></div>
            <div className="hidden lg:block absolute top-10 -right-16 h-32 w-32 bg-blue-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
