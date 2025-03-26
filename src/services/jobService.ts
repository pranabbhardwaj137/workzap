
interface JobFilter {
  category?: string;
  location?: string;
  minWage?: number;
  maxWage?: number;
  isUrgent?: boolean;
  isVolunteer?: boolean;
}

interface JobData {
  title: string;
  description: string;
  category: string;
  wage: number;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isUrgent?: boolean;
  isVolunteer?: boolean;
  volunteerSlots?: {
    total: number;
    filled: number;
  };
}

class JobService {
  private baseUrl = 'http://localhost:5000/api/jobs';

  async getAllJobs(filter: JobFilter = {}) {
    try {
      // Build query string from filter
      const params = new URLSearchParams();
      
      if (filter.category) params.append('category', filter.category);
      if (filter.location) params.append('location', filter.location);
      if (filter.minWage) params.append('minWage', filter.minWage.toString());
      if (filter.maxWage) params.append('maxWage', filter.maxWage.toString());
      if (filter.isUrgent !== undefined) params.append('isUrgent', filter.isUrgent.toString());
      if (filter.isVolunteer !== undefined) params.append('isVolunteer', filter.isVolunteer.toString());
      
      const queryString = params.toString();
      const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  async getJobById(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      throw error;
    }
  }

  async createJob(jobData: JobData, token: string) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create job');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  async updateJob(id: string, jobData: Partial<JobData>, token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(jobData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update job');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating job ${id}:`, error);
      throw error;
    }
  }

  async deleteJob(id: string, token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete job');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error deleting job ${id}:`, error);
      throw error;
    }
  }

  async applyForJob(id: string, token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to apply for job');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error applying for job ${id}:`, error);
      throw error;
    }
  }
}

export const jobService = new JobService();
