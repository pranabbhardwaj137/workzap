
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation } from 'lucide-react';
import JobCard from '@/components/JobCard';

// For a real implementation, you would use:
// import { Loader } from '@googlemaps/js-api-loader';

interface JobMapProps {
  jobs: any[];
  isLoading: boolean;
}

const JobMap: React.FC<JobMapProps> = ({ jobs, isLoading }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();
  
  // Load Google Maps
  useEffect(() => {
    // In a real implementation, you would load the Google Maps API with your API key
    // For this example, we'll simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
        toast({
          variant: "destructive",
          title: "Location Error",
          description: "Could not get your location. Some map features may not work correctly.",
        });
      }
    );
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // For the real implementation, you would initialize the map here
  useEffect(() => {
    if (!mapLoaded || !userLocation || !mapRef.current) return;
    
    // This is where you would initialize Google Maps and add markers for jobs
    // For now, we'll simulate the map with a placeholder

    // In a real implementation:
    /*
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });
    
    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: userLocation,
        zoom: 12,
        styles: [
          // Dark mode map styles would go here
        ]
      });
      
      // Add user location marker
      new google.maps.Marker({
        position: userLocation,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#3b82f6',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        },
        title: 'Your Location'
      });
      
      // Add job markers
      jobs.forEach(job => {
        if (job.coordinates && job.coordinates.lat && job.coordinates.lng) {
          const marker = new google.maps.Marker({
            position: job.coordinates,
            map,
            title: job.title,
          });
          
          marker.addListener('click', () => {
            setSelectedJob(job);
          });
        }
      });
    });
    */
  }, [mapLoaded, userLocation, jobs]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden rounded-xl border border-border">
        {/* Map container */}
        <div 
          ref={mapRef} 
          className="h-[400px] bg-card flex items-center justify-center"
        >
          {!mapLoaded ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading map...</p>
            </div>
          ) : (
            <div className="text-center p-8">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Map Placeholder</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                This is where the Google Maps would be displayed in a real implementation.
                The map would show {jobs.length} job markers and your current location.
              </p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Center on me
                </Button>
                <Button variant="outline" size="sm">
                  Show all jobs
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Selected job info */}
        {selectedJob && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border max-h-60 overflow-y-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2"
              onClick={() => setSelectedJob(null)}
            >
              ✕
            </Button>
            <JobCard job={selectedJob} compact={true} />
          </div>
        )}
      </Card>
      
      {/* Job list below map */}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard 
              key={job._id} 
              job={job} 
              onClick={() => setSelectedJob(job)}
              isSelected={selectedJob?._id === job._id}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-medium mt-4 mb-2">No jobs found nearby</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no jobs in your area at the moment. Try expanding your search radius or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobMap;
