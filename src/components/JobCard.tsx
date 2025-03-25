
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  wage: string;
  posted: string;
  urgent?: boolean;
  category: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  wage,
  posted,
  urgent = false,
  category
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Badge variant={urgent ? "destructive" : "secondary"} className="mb-2">
            {urgent ? 'Urgent' : category}
          </Badge>
          <span className="text-sm text-gray-500">{posted}</span>
        </div>
        
        <Link to={`/jobs/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-workzap-blue transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-700 mb-4">{company}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            {location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
            {wage}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            {posted}
          </div>
          <Button size="sm" className="bg-workzap-blue hover:bg-workzap-blue/90" asChild>
            <Link to={`/jobs/${id}`}>Apply Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
