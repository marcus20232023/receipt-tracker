import { apiClient } from './apiClient';
import { User, AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post('/auth/login', credentials);
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return apiClient.post('/auth/register', credentials);
  },

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await apiClient.post('/auth/logout', { refreshToken });
      } catch (error) {
        // Ignore errors on logout
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get('/auth/me');
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  async forgotPassword(email: string): Promise<void> {
    return apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    return apiClient.post('/auth/reset-password', { token, password });
  },
};
