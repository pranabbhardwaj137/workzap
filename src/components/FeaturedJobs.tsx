
import React from 'react';
import JobCard from './JobCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    wage: '$45 - $60 per hour',
    posted: 'Posted 2 days ago',
    urgent: true,
    category: 'Development'
  },
  {
    id: '2',
    title: 'Event Staff',
    company: 'EventMasters',
    location: 'Los Angeles, CA',
    wage: '$25 per hour',
    posted: 'Posted 1 day ago',
    category: 'Hospitality'
  },
  {
    id: '3',
    title: 'Delivery Driver',
    company: 'QuickShip',
    location: 'Chicago, IL',
    wage: '$22 per hour',
    posted: 'Posted 3 days ago',
    urgent: true,
    category: 'Transport'
  },
  {
    id: '4',
    title: 'Graphic Designer',
    company: 'Creative Studio',
    location: 'Remote',
    wage: '$40 per hour',
    posted: 'Posted 3 hours ago',
    category: 'Design'
  },
  {
    id: '5',
    title: 'Office Assistant',
    company: 'Global Enterprises',
    location: 'New York, NY',
    wage: '$20 per hour',
    posted: 'Posted 4 days ago',
    category: 'Admin'
  },
  {
    id: '6',
    title: 'Sales Representative',
    company: 'Retail Emporium',
    location: 'Miami, FL',
    wage: '$18 + commission',
    posted: 'Posted 5 days ago',
    category: 'Sales'
  }
];

const FeaturedJobs = () => {
  return (
    <section className="py-20 bg-workzap-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Featured Jobs</h2>
          <p className="text-gray-600">
            Discover top opportunities currently available on WorkZap
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              wage={job.wage}
              posted={job.posted}
              urgent={job.urgent}
              category={job.category}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
