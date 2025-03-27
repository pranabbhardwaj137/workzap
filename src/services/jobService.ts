
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
  private token = localStorage.getItem('token');

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

  async createJob(jobData: JobData) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token || '',
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

  async updateJob(id: string, jobData: Partial<JobData>) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token || '',
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

  async deleteJob(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': this.token || '',
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

  async applyForJob(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token || '',
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

  // New methods for the dashboard
  async getUserJobs() {
    try {
      const response = await fetch(`${this.baseUrl}/user-jobs`, {
        headers: {
          'x-auth-token': this.token || '',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user jobs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user jobs:', error);
      throw error;
    }
  }

  async getAppliedJobs() {
    try {
      const response = await fetch(`${this.baseUrl}/applied`, {
        headers: {
          'x-auth-token': this.token || '',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch applied jobs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      throw error;
    }
  }

  async updateApplicationStatus(jobId: string, applicantId: string, status: 'accepted' | 'rejected') {
    try {
      const response = await fetch(`${this.baseUrl}/${jobId}/applications/${applicantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token || '',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update application status');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating application status:`, error);
      throw error;
    }
  }
}

export const jobService = new JobService();
