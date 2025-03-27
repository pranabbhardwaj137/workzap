
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { jobService } from '@/services/jobService';
import { MapPin, AlertCircle } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  wage: z.coerce.number().min(1, { message: "Wage must be at least 1" }),
  location: z.string().min(3, { message: "Location is required" }),
  isUrgent: z.boolean().default(false),
  isVolunteer: z.boolean().default(false),
  volunteerSlots: z.object({
    total: z.coerce.number().min(1).optional(),
  }).optional(),
});

const categories = [
  "Cleaning",
  "Delivery",
  "Gardening",
  "Home Repair",
  "Moving",
  "Pet Care",
  "Tech Support",
  "Event Staff",
  "Food Service",
  "Customer Service",
  "Administrative",
  "Education",
  "Healthcare",
  "Other"
];

const JobPostForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      wage: 0,
      location: user?.location || "",
      isUrgent: false,
      isVolunteer: false,
    },
  });
  
  const isVolunteer = form.watch("isVolunteer");
  
  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        toast({
          variant: "destructive",
          title: "Location Error",
          description: "Could not get your location. Your job may not appear in location-based searches.",
        });
      }
    );
  }, [toast]);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Prepare volunteer slots if it's a volunteer job
      const volunteerSlots = values.isVolunteer && values.volunteerSlots?.total
        ? { total: values.volunteerSlots.total, filled: 0 }
        : undefined;
      
      // Create job data, ensuring all required fields are present
      const jobData = {
        title: values.title,
        description: values.description,
        category: values.category,
        wage: values.wage,
        location: values.location,
        isUrgent: values.isUrgent,
        isVolunteer: values.isVolunteer,
        volunteerSlots,
        coordinates: userLocation || undefined,
      };
      
      // Submit job
      await jobService.createJob(jobData);
      
      // Show success message
      toast({
        title: "Job Posted",
        description: "Your job has been posted successfully.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post job. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="p-6 border border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., House Cleaning, Furniture Assembly" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="wage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVolunteer ? "Volunteer Compensation" : "Hourly Wage ($)"}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder={isVolunteer ? "0" : "15"} 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    {isVolunteer 
                      ? "Optional compensation for volunteers (enter 0 if none)" 
                      : "Hourly rate in USD"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the job requirements, duties, and any specific skills needed" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter address" 
                      {...field} 
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  {userLocation 
                    ? "Using your current location for map display"
                    : "Enable location services to improve job visibility"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mark as Urgent</FormLabel>
                    <FormDescription>
                      Urgent jobs are highlighted and shown first
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isVolunteer"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Volunteer Opportunity</FormLabel>
                    <FormDescription>
                      Post as a volunteer opportunity instead of paid work
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          {isVolunteer && (
            <FormField
              control={form.control}
              name="volunteerSlots.total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Volunteers Needed</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="1" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default JobPostForm;
