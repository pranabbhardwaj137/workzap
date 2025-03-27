
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobCardProps {
  id?: string;
  title?: string;
  company?: string;
  location?: string;
  wage?: string;
  posted?: string;
  urgent?: boolean;
  category?: string;
  job?: any; // Add job object prop
  compact?: boolean;
  showManageOptions?: boolean;
  showApplicationStatus?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  wage,
  posted,
  urgent = false,
  category,
  job,
  compact = false,
  showManageOptions = false,
  showApplicationStatus = false,
  onClick,
  isSelected = false
}) => {
  // If job object is provided, extract properties from it
  const jobId = id || (job?._id);
  const jobTitle = title || (job?.title);
  const jobCompany = company || (job?.recruiter?.firstName + ' ' + job?.recruiter?.lastName);
  const jobLocation = location || (job?.location);
  const jobWage = wage || (job?.isVolunteer ? 'Volunteer' : `$${job?.wage}/hr`);
  const jobPosted = posted || (job?.datePosted ? new Date(job?.datePosted).toLocaleDateString() : 'Recently posted');
  const jobUrgent = urgent || (job?.isUrgent);
  const jobCategory = category || (job?.category);
  const jobStatus = job?.status;
  
  // Get application status if available
  const applicationStatus = job?.applicants?.find(
    (app: any) => app.status !== 'pending'
  )?.status;

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
        overflow-hidden transition-all duration-300 hover:shadow-md group
        ${isSelected ? 'ring-2 ring-workzap-blue' : ''}
        ${compact ? 'p-3' : ''}
      `}
      onClick={onClick}
    >
      <div className={compact ? '' : 'p-6'}>
        <div className="flex justify-between items-start mb-3">
          <Badge variant={jobUrgent ? "destructive" : "secondary"} className="mb-2">
            {jobUrgent ? 'Urgent' : jobCategory}
          </Badge>
          
          {jobStatus && jobStatus !== 'open' && (
            <Badge variant={jobStatus === 'completed' ? "success" : 
                          jobStatus === 'in-progress' ? "warning" : "outline"}>
              {jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1)}
            </Badge>
          )}
          
          {!jobStatus && (
            <span className="text-sm text-gray-500 dark:text-gray-400">{jobPosted}</span>
          )}
        </div>
        
        <Link to={`/jobs/${jobId}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-workzap-blue transition-colors">
            {jobTitle}
          </h3>
        </Link>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">{jobCompany}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
            {jobLocation}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <DollarSign className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
            {jobWage}
          </div>
        </div>
        
        {showApplicationStatus && applicationStatus && (
          <div className="mb-4">
            <Badge variant={applicationStatus === 'accepted' ? 'success' : 'destructive'}>
              {applicationStatus === 'accepted' ? (
                <div className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Accepted
                </div>
              ) : (
                <div className="flex items-center">
                  <XCircle className="h-3 w-3 mr-1" />
                  Rejected
                </div>
              )}
            </Badge>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
            {jobPosted}
          </div>
          
          {!showManageOptions && !showApplicationStatus && (
            <Button size="sm" className="bg-workzap-blue hover:bg-workzap-blue/90" asChild>
              <Link to={`/jobs/${jobId}`}>Apply Now</Link>
            </Button>
          )}
          
          {showManageOptions && (
            <Button size="sm" variant="outline" asChild>
              <Link to={`/manage-job/${jobId}`}>Manage</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
