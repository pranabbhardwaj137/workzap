
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    content: 'WorkZap has completely changed how I find design gigs. The "Available Now" feature helped me secure a project within hours when I was in a financial pinch.',
    rating: 5,
    userType: 'worker'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Small Business Owner',
    content: 'As a cafe owner, I regularly need last-minute staff. WorkZap helps me find qualified people in my area quickly. The quality of workers has been excellent.',
    rating: 5,
    userType: 'recruiter'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Event Coordinator',
    content: 'The volunteer feature on WorkZap has been a game-changer for our community events. We can easily find and manage volunteers, making our events run smoothly.',
    rating: 4,
    userType: 'recruiter'
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Delivery Driver',
    content: 'I use WorkZap to find delivery gigs between my main job shifts. The location-based job matching is spot on, and I only see relevant opportunities.',
    rating: 5,
    userType: 'worker'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-gray-600">
            Discover how WorkZap is helping workers and recruiters connect efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <Avatar className="h-12 w-12 mr-4 border-2 border-white">
                  <div className="bg-workzap-blue text-white flex items-center justify-center w-full h-full font-medium">
                    {testimonial.name.split(' ').map(name => name[0]).join('')}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-workzap-light-blue text-workzap-blue">
                    {testimonial.userType === 'worker' ? 'Worker' : 'Recruiter'}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
