
import React from 'react';
import { MapPin, Zap, MessageSquare, Star, Calendar, Shield } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="h-6 w-6 text-workzap-blue" />,
    title: 'Location-Based Matching',
    description: 'Find jobs or workers near you with our advanced location-based technology.'
  },
  {
    icon: <Zap className="h-6 w-6 text-workzap-blue" />,
    title: 'Available Now',
    description: 'Toggle "Available Now" to instantly connect with recruiters for immediate work.'
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-workzap-blue" />,
    title: 'Direct Communication',
    description: 'Chat directly with workers or recruiters through our real-time messaging system.'
  },
  {
    icon: <Star className="h-6 w-6 text-workzap-blue" />,
    title: 'Ratings & Reviews',
    description: 'Build trust with a transparent rating system and verified reviews.'
  },
  {
    icon: <Calendar className="h-6 w-6 text-workzap-blue" />,
    title: 'Volunteer Opportunities',
    description: 'Find or post volunteer events and manage registrations with ease.'
  },
  {
    icon: <Shield className="h-6 w-6 text-workzap-blue" />,
    title: 'Trust & Safety',
    description: 'Verified profiles and secure interactions for a safe working experience.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-workzap-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Powerful Features for Workers & Recruiters
          </h2>
          <p className="text-gray-600">
            WorkZap is packed with tools to help you find the perfect job or the right talent quickly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-workzap-light-blue p-3 inline-flex mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
