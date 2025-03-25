
import React from 'react';
import JobCategory from './JobCategory';
import { 
  Briefcase, 
  Code, 
  Palette, 
  Truck, 
  Utensils, 
  ShoppingBag, 
  Wrench, 
  Heart 
} from 'lucide-react';

const categories = [
  {
    icon: <Briefcase className="h-6 w-6 text-workzap-blue" />,
    title: 'Office & Admin',
    count: 128,
    to: '/jobs/office-admin'
  },
  {
    icon: <Code className="h-6 w-6 text-workzap-blue" />,
    title: 'Development & IT',
    count: 156,
    to: '/jobs/development-it'
  },
  {
    icon: <Palette className="h-6 w-6 text-workzap-blue" />,
    title: 'Design & Creative',
    count: 87,
    to: '/jobs/design-creative'
  },
  {
    icon: <Truck className="h-6 w-6 text-workzap-blue" />,
    title: 'Delivery & Transport',
    count: 213,
    to: '/jobs/delivery-transport'
  },
  {
    icon: <Utensils className="h-6 w-6 text-workzap-blue" />,
    title: 'Food & Hospitality',
    count: 175,
    to: '/jobs/food-hospitality'
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-workzap-blue" />,
    title: 'Sales & Retail',
    count: 104,
    to: '/jobs/sales-retail'
  },
  {
    icon: <Wrench className="h-6 w-6 text-workzap-blue" />,
    title: 'Trades & Labor',
    count: 132,
    to: '/jobs/trades-labor'
  },
  {
    icon: <Heart className="h-6 w-6 text-workzap-blue" />,
    title: 'Volunteer Work',
    count: 95,
    to: '/volunteers'
  }
];

const JobCategories = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Browse Job Categories</h2>
          <p className="text-gray-600">
            Explore opportunities across various industries and find the perfect job match for your skills.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <JobCategory
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
              to={category.to}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
