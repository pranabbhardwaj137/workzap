
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const volunteerEvents = [
  {
    id: '1',
    title: 'Community Park Cleanup',
    organization: 'Green Earth Initiative',
    location: 'Central Park, New York',
    date: 'June 15, 2023',
    time: '9:00 AM - 12:00 PM',
    slots: {
      total: 20,
      filled: 12
    },
    category: 'Environment'
  },
  {
    id: '2',
    title: 'Food Bank Distribution',
    organization: 'City Food Bank',
    location: 'Downtown Community Center, Chicago',
    date: 'June 20, 2023',
    time: '2:00 PM - 5:00 PM',
    slots: {
      total: 15,
      filled: 7
    },
    category: 'Community'
  },
  {
    id: '3',
    title: 'Animal Shelter Helper',
    organization: 'Happy Paws Rescue',
    location: 'Happy Paws Shelter, Los Angeles',
    date: 'June 18, 2023',
    time: '10:00 AM - 2:00 PM',
    slots: {
      total: 10,
      filled: 8
    },
    category: 'Animals'
  },
  {
    id: '4',
    title: 'Elderly Home Visit',
    organization: 'Senior Care Foundation',
    location: 'Golden Years Residence, Seattle',
    date: 'June 22, 2023',
    time: '1:00 PM - 4:00 PM',
    slots: {
      total: 12,
      filled: 3
    },
    category: 'Healthcare'
  },
  {
    id: '5',
    title: 'Youth Mentoring Program',
    organization: 'Future Leaders Initiative',
    location: 'Community Youth Center, Boston',
    date: 'June 24, 2023',
    time: '3:00 PM - 6:00 PM',
    slots: {
      total: 8,
      filled: 5
    },
    category: 'Education'
  },
  {
    id: '6',
    title: 'Homeless Shelter Meal Service',
    organization: 'Helping Hands',
    location: 'Hope Shelter, San Francisco',
    date: 'June 19, 2023',
    time: '5:30 PM - 8:00 PM',
    slots: {
      total: 15,
      filled: 10
    },
    category: 'Community'
  }
];

const Volunteers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Volunteer Opportunities</h1>
            <p className="text-gray-600">
              Find meaningful volunteer work in your community and make a difference
            </p>
          </div>
          
          {/* Hero Section */}
          <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Make an Impact in Your Community
                </h2>
                <p className="text-white/90 mb-6">
                  Volunteering is a rewarding way to give back to your community, gain valuable experience, and connect with like-minded individuals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-white/90" asChild>
                    <Link to="/signup">Become a Volunteer</Link>
                  </Button>
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10" asChild>
                    <Link to="/post-volunteer">Post Volunteer Event</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Volunteering" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Search volunteer opportunities" className="pl-10" />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Location" className="pl-10" />
              </div>
              
              <Button className="bg-workzap-blue hover:bg-workzap-blue/90">Search</Button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-workzap-light-blue text-workzap-blue border-workzap-blue/30 hover:bg-workzap-blue hover:text-white cursor-pointer">
              All Categories
            </Badge>
            {['Environment', 'Community', 'Education', 'Animals', 'Healthcare', 'Arts & Culture'].map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="hover:bg-workzap-light-blue cursor-pointer"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          {/* Event List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <Badge variant="secondary" className="mb-2">
                    {event.category}
                  </Badge>
                  
                  <Link to={`/volunteers/${event.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-workzap-blue transition-colors">
                      {event.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-700 mb-4">{event.organization}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {event.slots.filled} / {event.slots.total} slots filled
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-workzap-blue hover:bg-workzap-blue/90"
                    asChild
                  >
                    <Link to={`/volunteers/${event.id}`}>
                      Sign Up to Volunteer
                    </Link>
                  </Button>
                </div>
              </div>
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

export default Volunteers;
