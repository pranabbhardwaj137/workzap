
interface Coordinates {
  lat: number;
  lng: number;
}

class LocationService {
  private baseUrl = 'http://localhost:5000/api/locations';
  private token = localStorage.getItem('token');

  async updateUserLocation(lat: number, lng: number, address?: string) {
    try {
      const response = await fetch(`${this.baseUrl}/update-location`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': this.token || '',
        },
        body: JSON.stringify({ lat, lng, address }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update location');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }

  async getNearbyJobs(lat: number, lng: number, radius: number = 10) {
    try {
      const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        radius: radius.toString(),
      });
      
      const response = await fetch(`${this.baseUrl}/nearby-jobs?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch nearby jobs');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching nearby jobs:', error);
      throw error;
    }
  }

  // Utility function to get the distance between two coordinates in kilometers
  getDistanceBetween(coords1: Coordinates, coords2: Coordinates): number {
    // Haversine formula to calculate distance between two points on Earth
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(coords2.lat - coords1.lat);
    const dLng = this.deg2rad(coords2.lng - coords1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(coords1.lat)) * Math.cos(this.deg2rad(coords2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export const locationService = new LocationService();
