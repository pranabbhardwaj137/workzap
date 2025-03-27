
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle } from 'lucide-react';
import JobCard from '@/components/JobCard';

interface JobListProps {
  jobs: any[];
  isLoading: boolean;
  showManageOptions?: boolean;
  showApplicationStatus?: boolean;
}

const JobList: React.FC<JobListProps> = ({ 
  jobs, 
  isLoading, 
  showManageOptions = false,
  showApplicationStatus = false 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 border border-border rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-6 w-48 mb-3" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-20" />
            </div>
            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="text-lg font-medium mt-4 mb-2">No jobs found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {showManageOptions 
            ? "You haven't posted any jobs yet. Create your first job posting to find workers."
            : "There are no jobs matching your criteria. Try adjusting your filters or check back later."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard 
          key={job._id} 
          job={job} 
          showManageOptions={showManageOptions}
          showApplicationStatus={showApplicationStatus}
        />
      ))}
    </div>
  );
};

export default JobList;
