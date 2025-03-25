
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Zap, MapPin } from 'lucide-react';

const AvailableNowSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-workzap-blue/90 to-blue-600 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center text-white text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Instant Work Opportunities
              </div>
              
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                Toggle "Available Now" to Get Hired Instantly
              </h2>
              
              <p className="text-white/90 text-lg mb-8">
                Need work today? Turn on "Available Now" to show recruiters you're ready for immediate hiring. Perfect for last-minute gigs and urgent opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-workzap-blue hover:bg-white/90" asChild>
                  <Link to="/signup">Find Instant Work</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative hidden lg:flex items-center justify-center p-8">
              <div className="w-72 h-[450px] bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white relative">
                <div className="bg-gray-100 h-full w-full relative">
                  <div className="absolute top-10 inset-x-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Available Now</h3>
                        <p className="text-sm text-gray-500">Get hired instantly</p>
                      </div>
                      <div className="w-12 h-6 bg-workzap-blue rounded-full relative px-1 flex items-center">
                        <div className="w-4 h-4 bg-white rounded-full absolute transform translate-x-6"></div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Your Location</span>
                        <span className="text-xs text-workzap-blue">Change</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-800">San Francisco, CA</span>
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <span className="text-sm font-medium text-gray-700">Nearby Jobs</span>
                    </div>
                    
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                          <span className="text-xs text-workzap-blue font-medium">0.8 miles away</span>
                          <h4 className="text-sm font-medium text-gray-900">Coffee Shop Assistant</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-500">$20/hr</span>
                            <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                              Now
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-12 -left-12 h-40 w-40 bg-blue-400/30 rounded-full blur-2xl"></div>
              <div className="absolute top-20 -right-16 h-32 w-32 bg-blue-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvailableNowSection;
