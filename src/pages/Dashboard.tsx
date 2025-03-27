
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobMap from '@/components/JobMap';
import JobList from '@/components/JobList';
import JobPostForm from '@/components/JobPostForm';
import { jobService } from '@/services/jobService';
import { userService } from '@/services/userService';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { locationService } from '@/services/locationService';

const Dashboard = () => {
  const [nearbyJobs, setNearbyJobs] = useState([]);
  const [userJobs, setUserJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [dashboardTab, setDashboardTab] = useState<string>('jobs');
  
  const { user, isAuthenticated, toggleAvailability } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Get user location and fetch nearby jobs
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Get user's current location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Update user location in the database
            if (user) {
              await locationService.updateUserLocation(latitude, longitude);
            }
            
            // Fetch nearby jobs
            const jobs = await locationService.getNearbyJobs(latitude, longitude);
            setNearbyJobs(jobs);
            
            // If user is a recruiter, fetch their posted jobs
            if (user?.userType === 'recruiter') {
              const postedJobs = await jobService.getUserJobs();
              setUserJobs(postedJobs);
            } else if (user?.userType === 'worker') {
              // For workers, fetch jobs they've applied to
              const appliedJobs = await jobService.getAppliedJobs();
              setUserJobs(appliedJobs);
            }
            
            setIsLoading(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            toast({
              variant: "destructive",
              title: "Location Error",
              description: "Could not get your location. Please enable location services.",
            });
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data.",
        });
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [isAuthenticated, user, toast]);

  const handleToggleAvailability = async () => {
    const newStatus = await toggleAvailability();
    
    toast({
      title: newStatus ? "You're now available" : "You're now unavailable",
      description: newStatus 
        ? "Recruiters can now see you in the available section" 
        : "You've been removed from the available section",
    });
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const jobs = await locationService.getNearbyJobs(latitude, longitude);
          setNearbyJobs(jobs);
          setIsLoading(false);
          
          toast({
            title: "Jobs refreshed",
            description: `Found ${jobs.length} jobs near your location`,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not get your location",
          });
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Error refreshing jobs:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh jobs",
      });
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Redirecting to login, don't render anything
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* User sidebar */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-card rounded-xl shadow-sm p-6 border border-border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl font-semibold">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">{user?.location}</span>
                  </div>
                </div>
              </div>
              
              {user?.userType === 'worker' && (
                <div className="mt-4 py-3 px-4 bg-muted/40 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Available for work now</span>
                    <Switch 
                      checked={user?.availableNow} 
                      onCheckedChange={handleToggleAvailability}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    When enabled, recruiters can see you in the "Available Now" section
                  </p>
                </div>
              )}
              
              <div className="mt-5">
                <h3 className="text-sm font-medium mb-2">Account Type</h3>
                <Badge variant={user?.userType === 'worker' ? 'default' : 'outline'}>
                  {user?.userType === 'worker' ? 'Worker' : 'Recruiter'}
                </Badge>
              </div>
              
              {user?.userType === 'worker' && user?.skills?.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-5">
                <h3 className="text-sm font-medium mb-2">Rating</h3>
                <div className="flex items-center">
                  <div className="text-lg font-medium">{user?.rating.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground ml-2">
                    ({user?.reviews?.length || 0} reviews)
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6" variant="outline" onClick={() => navigate('/profile')}>
                Edit Profile
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4 w-full">
            <Tabs 
              defaultValue={dashboardTab} 
              onValueChange={setDashboardTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="jobs">
                    {user?.userType === 'worker' ? 'Nearby Jobs' : 'Your Postings'}
                  </TabsTrigger>
                  <TabsTrigger value="applications">
                    {user?.userType === 'worker' ? 'Your Applications' : 'Manage Applications'}
                  </TabsTrigger>
                  {user?.userType === 'recruiter' && (
                    <TabsTrigger value="post">Post New Job</TabsTrigger>
                  )}
                </TabsList>
                
                {dashboardTab === 'jobs' && (
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1" 
                      onClick={handleRefresh}
                      disabled={isLoading}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="hidden sm:inline">Refresh</span>
                    </Button>
                    <div className="border-r h-6 border-border mx-1" />
                    <Button 
                      size="sm" 
                      variant={view === 'list' ? 'default' : 'outline'} 
                      onClick={() => setView('list')}
                    >
                      List
                    </Button>
                    <Button 
                      size="sm" 
                      variant={view === 'map' ? 'default' : 'outline'} 
                      onClick={() => setView('map')}
                    >
                      Map
                    </Button>
                  </div>
                )}
              </div>
              
              <TabsContent value="jobs" className="mt-0">
                {user?.userType === 'worker' ? (
                  <>
                    {view === 'list' ? (
                      <JobList jobs={nearbyJobs} isLoading={isLoading} />
                    ) : (
                      <JobMap jobs={nearbyJobs} isLoading={isLoading} />
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Your Job Postings</h2>
                      <Button 
                        onClick={() => setDashboardTab('post')} 
                        size="sm"
                      >
                        Post New Job
                      </Button>
                    </div>
                    <JobList 
                      jobs={userJobs} 
                      isLoading={isLoading} 
                      showManageOptions={true} 
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="applications" className="mt-0">
                {user?.userType === 'worker' ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Your Applications</h2>
                    {isLoading ? (
                      <div className="text-center py-12">Loading applications...</div>
                    ) : userJobs.length > 0 ? (
                      <JobList jobs={userJobs} isLoading={false} showApplicationStatus={true} />
                    ) : (
                      <div className="text-center py-12 bg-muted/30 rounded-lg">
                        <div className="mb-3">
                          <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          You haven't applied to any jobs yet. Browse nearby jobs and start applying!
                        </p>
                        <Button 
                          onClick={() => setDashboardTab('jobs')} 
                          className="mt-4"
                        >
                          Find Jobs
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Manage Applications</h2>
                    {/* Implementation for recruiters to manage applications */}
                    {/* This would be implemented in a separate component */}
                  </div>
                )}
              </TabsContent>
              
              {user?.userType === 'recruiter' && (
                <TabsContent value="post" className="mt-0">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Post a New Job</h2>
                    <JobPostForm />
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
