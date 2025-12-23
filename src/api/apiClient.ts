/**
 * API Client for Backend Integration
 * Replaces the Base44 mock client with real backend API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Set auth token
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data || data;
}

// Auth API
export const authAPI = {
  register: async (userData: { name: string; email: string; phone: string; password: string }) => {
    const response = await apiRequest<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  login: async (email: string, password: string) => {
    const response = await apiRequest<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  getMe: async () => {
    return apiRequest<any>('/auth/me');
  },

  updateProfile: async (data: { name?: string; phone?: string }) => {
    return apiRequest<any>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Submissions API
export const submissionsAPI = {
  create: async (submissionData: any) => {
    return apiRequest<any>('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionData),
    });
  },

  list: async (filters?: {
    type?: string;
    status?: string;
    project?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    const queryString = params.toString();
    return apiRequest<any[]>(`/submissions${queryString ? `?${queryString}` : ''}`);
  },

  get: async (id: string) => {
    return apiRequest<any>(`/submissions/${id}`);
  },

  update: async (id: string, data: any) => {
    return apiRequest<any>(`/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    return apiRequest<any>('/admin/stats');
  },

  getSubmissions: async (filters?: {
    type?: string;
    status?: string;
    project?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    return apiRequest<any>(`/admin/submissions${queryString ? `?${queryString}` : ''}`);
  },

  getSubmission: async (id: string) => {
    return apiRequest<any>(`/admin/submissions/${id}`);
  },

  updateSubmission: async (id: string, data: any) => {
    return apiRequest<any>(`/admin/submissions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getConversations: async () => {
    const response = await apiRequest<any>('/admin/conversations');
    return response.data?.conversations || response.conversations || [];
  },

  getDonations: async (filters?: {
    search?: string;
    project?: string;
    verified?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    return apiRequest<any>(`/admin/donations${queryString ? `?${queryString}` : ''}`);
  },

  verifyDonation: async (id: string) => {
    return apiRequest<any>(`/admin/donations/${id}/verify`, {
      method: 'PUT',
    });
  },
};

// Chat API
export const chatAPI = {
  createConversation: async (sessionId?: string, userName?: string, userPhone?: string) => {
    return apiRequest<any>('/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ 
        session_id: sessionId,
        user_name: userName,
        user_phone: userPhone
      }),
    });
  },

  addMessage: async (sessionId: string, role: 'user' | 'assistant', content: string, options?: any[]) => {
    return apiRequest<any>('/chat/messages', {
      method: 'POST',
      body: JSON.stringify({ 
        session_id: sessionId, 
        role, 
        content,
        options: options || null
      }),
    });
  },

  getConversation: async (sessionId: string) => {
    return apiRequest<any>(`/chat/conversations/${sessionId}`);
  },
};

// Users API (Admin)
export const usersAPI = {
  list: async (filters?: {
    search?: string;
    role?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    return apiRequest<any>(`/users${queryString ? `?${queryString}` : ''}`);
  },

  get: async (id: string) => {
    return apiRequest<any>(`/users/${id}`);
  },

  update: async (id: string, data: any) => {
    return apiRequest<any>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<any>(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  getActivity: async (id: string) => {
    return apiRequest<any>(`/users/${id}/activity`);
  },
};

// Content API (Admin)
export const contentAPI = {
  list: async (filters?: {
    type?: string;
    category?: string;
    isPublished?: boolean;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    return apiRequest<any[]>(`/content${queryString ? `?${queryString}` : ''}`);
  },

  get: async (key: string) => {
    return apiRequest<any>(`/content/${key}`);
  },

  create: async (data: any) => {
    return apiRequest<any>('/content', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return apiRequest<any>(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return apiRequest<any>(`/content/${id}`, {
      method: 'DELETE',
    });
  },
};

// Analytics API (Admin)
export const analyticsAPI = {
  getOverview: async (filters?: {
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    const queryString = params.toString();
    return apiRequest<any>(`/analytics/overview${queryString ? `?${queryString}` : ''}`);
  },

  generateReport: async (type: string, filters?: {
    startDate?: string;
    endDate?: string;
    format?: string;
  }) => {
    const params = new URLSearchParams({ type });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    return apiRequest<any>(`/analytics/reports?${params.toString()}`);
  },
};

// Communications API (Admin)
export const communicationsAPI = {
  send: async (data: {
    type: 'email' | 'whatsapp' | 'sms' | 'facebook';
    recipient: string;
    subject?: string;
    message: string;
    relatedTo?: { entity: string; entityId: string };
    template?: string;
    attachments?: any[];
  }) => {
    return apiRequest<any>('/communications/send', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  list: async (filters?: {
    type?: string;
    status?: string;
    recipient?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    return apiRequest<any>(`/communications${queryString ? `?${queryString}` : ''}`);
  },

  get: async (id: string) => {
    return apiRequest<any>(`/communications/${id}`);
  },

  getHistory: async (entityType: string, entityId: string) => {
    return apiRequest<any[]>(`/communications/history/${entityType}/${entityId}`);
  },
};

// Security API (Admin)
export const securityAPI = {
  getAuditLogs: async (filters?: {
    action?: string;
    entity?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const queryString = params.toString();
    return apiRequest<any>(`/security/audit-logs${queryString ? `?${queryString}` : ''}`);
  },

  getCompliance: async () => {
    return apiRequest<any>('/security/compliance');
  },

  getUserConsent: async (userId: string) => {
    return apiRequest<any>(`/security/user-consent/${userId}`);
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest<any>('/health');
};

