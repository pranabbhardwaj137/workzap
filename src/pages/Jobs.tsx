
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Filter, ChevronDown } from 'lucide-react';

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
  },
  {
    id: '7',
    title: 'Warehouse Worker',
    company: 'Logistics Pro',
    location: 'Austin, TX',
    wage: '$19 per hour',
    posted: 'Posted 2 days ago',
    category: 'Labor'
  },
  {
    id: '8',
    title: 'Marketing Coordinator',
    company: 'Brand Builders',
    location: 'Seattle, WA',
    wage: '$28 per hour',
    posted: 'Posted 1 week ago',
    category: 'Marketing'
  },
  {
    id: '9',
    title: 'Customer Support',
    company: 'Service Connect',
    location: 'Remote',
    wage: '$22 per hour',
    posted: 'Posted 3 days ago',
    category: 'Customer Service'
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([15, 50]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Find the Perfect Job</h1>
            <p className="text-gray-600">
              Browse through hundreds of opportunities across various categories
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Job title or keyword" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Location" 
                  className="pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="flex-shrink-0">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <Button className="flex-grow bg-workzap-blue hover:bg-workzap-blue/90">Search Jobs</Button>
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Contract', 'Temporary', 'Volunteer'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={type} 
                          className="h-4 w-4 text-workzap-blue rounded border-gray-300"
                        />
                        <label htmlFor={type} className="ml-2 text-sm text-gray-700">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <div className="space-y-2">
                    {['Development', 'Design', 'Marketing', 'Sales', 'Customer Service', 'Admin'].map((category) => (
                      <div key={category} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={category} 
                          className="h-4 w-4 text-workzap-blue rounded border-gray-300"
                        />
                        <label htmlFor={category} className="ml-2 text-sm text-gray-700">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider 
                    defaultValue={priceRange} 
                    max={100} 
                    step={1} 
                    className="py-4"
                    onValueChange={(value) => setPriceRange(value as number[])}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$0</span>
                    <span>$100+</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Showing {jobs.length} jobs</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border border-gray-300 rounded-md py-1 px-2">
                <option>Most Recent</option>
                <option>Highest Paid</option>
                <option>Nearby</option>
              </select>
            </div>
          </div>
          
          {/* Job List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="bg-workzap-blue text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
