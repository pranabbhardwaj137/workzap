
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-workzap-blue flex items-center justify-center text-white font-bold">
                WZ
              </div>
              <span className="text-xl font-semibold text-gray-900">WorkZap</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              On-demand gig & volunteer marketplace connecting job seekers with recruiters.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Workers</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/jobs" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link to="/available" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Available Now
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Recruiters</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/post-job" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Post Job
                </Link>
              </li>
              <li>
                <Link to="/find-workers" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Find Workers
                </Link>
              </li>
              <li>
                <Link to="/volunteers" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Volunteer Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-workzap-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} WorkZap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
