
import React from 'react';
import { Link } from 'react-router-dom';

interface JobCategoryProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  to: string;
}

const JobCategory: React.FC<JobCategoryProps> = ({ icon, title, count, to }) => {
  return (
    <Link 
      to={to}
      className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-workzap-blue/20"
    >
      <div className="w-16 h-16 bg-workzap-light-blue rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{count} jobs available</p>
    </Link>
  );
};

export default JobCategory;
