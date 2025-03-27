
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'worker' | 'recruiter';
  location: string;
  skills?: string[];
  experience?: string;
  rating: number;
  availableNow?: boolean;
  reviews?: Array<{
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  currentLocation?: {
    coordinates: {
      lat: number;
      lng: number;
    },
    address: string,
    lastUpdated: string
  };
}

interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  location?: string;
  skills?: string[];
  experience?: string;
}

interface ReviewData {
  rating: number;
  comment: string;
}

class UserService {
  private baseUrl = 'http://localhost:5000/api/users';

  async getProfile(token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        headers: {
          'x-auth-token': token,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async updateProfile(profileData: ProfileUpdateData, token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async toggleAvailability(token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/available`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to toggle availability');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error toggling availability:', error);
      throw error;
    }
  }

  async getAvailableWorkers() {
    try {
      const response = await fetch(`${this.baseUrl}/available`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch available workers');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching available workers:', error);
      throw error;
    }
  }

  async addReview(userId: string, reviewData: ReviewData, token: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${userId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add review');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error adding review for user ${userId}:`, error);
      throw error;
    }
  }
}

export const userService = new UserService();
