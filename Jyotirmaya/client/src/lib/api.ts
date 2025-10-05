const API_BASE = '/api';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  dataConsent: boolean;
}

export interface ScanResult {
  id: string;
  userId: string;
  condition: string;
  severity: string;
  eye: string;
  confidence: number;
  imageUrl: string | null;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  date: string;
  timeSlot: string;
  specialty: string;
  hospital: string;
  status: string;
  createdAt: string;
}

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

export const api = {
  auth: {
    signup: async (email: string, phone: string, dataConsent: boolean): Promise<User> => {
      const data = await fetchAPI('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, phone, dataConsent }),
      });
      return data.user;
    },

    login: async (email: string): Promise<User> => {
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return data.user;
    },
  },

  scanResults: {
    create: async (userId: string, result: {
      condition: string;
      severity: string;
      eye: string;
      confidence: number;
      imageUrl?: string;
    }): Promise<ScanResult> => {
      const data = await fetchAPI('/scan-results', {
        method: 'POST',
        body: JSON.stringify({ userId, ...result }),
      });
      return data.result;
    },

    getAll: async (userId: string): Promise<ScanResult[]> => {
      const data = await fetchAPI(`/scan-results/${userId}`);
      return data.results;
    },
  },

  bookings: {
    create: async (userId: string, booking: {
      date: string;
      timeSlot: string;
      specialty: string;
    }): Promise<Booking> => {
      const data = await fetchAPI('/bookings', {
        method: 'POST',
        body: JSON.stringify({ userId, ...booking }),
      });
      return data.booking;
    },

    getAll: async (userId: string): Promise<Booking[]> => {
      const data = await fetchAPI(`/bookings/${userId}`);
      return data.bookings;
    },
  },
};

export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem('current_user');
  return userJson ? JSON.parse(userJson) : null;
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem('current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('current_user');
  }
}
