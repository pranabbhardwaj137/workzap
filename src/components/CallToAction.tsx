
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-workzap-blue to-blue-600 rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 max-w-2xl mx-auto">
            Ready to Transform How You Work or Hire?
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of workers and recruiters already using WorkZap to connect for gigs, jobs, and volunteer opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-workzap-blue hover:bg-white/90" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
