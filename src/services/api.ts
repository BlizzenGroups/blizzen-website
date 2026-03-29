

import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { apiFetch } from '@/lib/apiClient';
 
// Create axios instance with optimized defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
 
// Cache TTL (Time To Live) in milliseconds
const CACHE_TTL = {
  SHORT: 2 * 60 * 1000,    // 2 minutes
  MEDIUM: 5 * 60 * 1000,   // 5 minutes
  LONG: 15 * 60 * 1000,    // 15 minutes
};
 
// Cache helper functions
const getCacheKey = (url: string, params?: any) => {
  return `${url}${params ? JSON.stringify(params) : ''}`;
};
 
const isValidCache = (cacheEntry: any) => {
  return Date.now() - cacheEntry.timestamp < cacheEntry.ttl;
};
 
const getFromCache = (key: string) => {
  const cacheEntry = cache.get(key);
  if (cacheEntry && isValidCache(cacheEntry)) {
    return cacheEntry.data;
  }
  cache.delete(key); // Remove expired cache
  return null;
};
 
const setCache = (key: string, data: any, ttl: number) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};
 
// API service functions with caching
export const apiService = {
  // Home content - cache for 5 minutes
  async getHomeContent() {
    const cacheKey = getCacheKey('/api/home-content');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/home-content');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },
 
  // Courses - cache for 5 minutes
  async getCourses() {
    const cacheKey = getCacheKey('/api/courses');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/courses');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },
 
  // Single course - cache for 15 minutes
  async getCourse(id: string) {
    const cacheKey = getCacheKey(`/api/courses/${id}`);
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get(`/api/courses/${id}`);
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },
 
  // Placements - cache for 5 minutes
  async getPlacements() {
    const cacheKey = getCacheKey('/api/placements');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/placements');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },
 
  // Contact info - cache for 2 minutes (shorter so changes reflect faster)
  async getContactInfo() {
    const cacheKey = getCacheKey('/api/contact-info');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/contact-info');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.SHORT);
    return data;
  },
 
  // Update contact info - clear cache after update
  async updateContactInfo(data: any) {
    const response = await apiClient.put('/api/contact-info', data);
    this.clearCacheEntry(getCacheKey('/api/contact-info'));
    return response.data;
  },
 
  // About info - cache for 5 minutes (shorter to reflect admin changes faster)
  async getAboutInfo() {
    const cacheKey = getCacheKey('/api/about');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/about');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },
 
  // Update about info - clear cache after update
  async updateAboutInfo(data: any) {
    const response = await apiClient.put('/api/about', data);
    this.clearCacheEntry(getCacheKey('/api/about'));
    return response.data;
  },
 
  // Enquiries - no cache (always fresh)
  async getEnquiries() {
    const response = await apiClient.get('/api/enquiries');
    return response.data;
  },
 
  // Post enquiry - no cache
  async postEnquiry(data: any) {
    const response = await apiClient.post('/api/enquiries', data);
    return response.data;
  },
 
  // Update home content - clear cache after update
  async updateHomeContent(data: any) {
    const response = await apiClient.post('/api/home-content', data);
    this.clearCacheEntry(getCacheKey('/api/home-content'));
    return response.data;
  },
 
  // Get placement stats - cache for 5 minutes
  async getPlacementStats() {
    const cacheKey = getCacheKey('/api/placement-stats');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/placement-stats');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },
 
  // Update placement stats - clear cache after update
  async updatePlacementStats(data: any) {
    const response = await apiClient.post('/api/placement-stats', data);
    this.clearCacheEntry(getCacheKey('/api/placement-stats'));
    return response.data;
  },
 
  // Get trust stats - cache for 15 minutes
  async getTrustStats() {
    const cacheKey = getCacheKey('/api/trust-stats');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/trust-stats');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },
 
  // Update trust stats - clear cache after update
  async updateTrustStats(data: any) {
    const response = await apiClient.post('/api/trust-stats', data);
    this.clearCacheEntry(getCacheKey('/api/trust-stats'));
    return response.data;
  },
 
  // Get footer content - cache for 15 minutes
  async getFooterContent() {
    const cacheKey = getCacheKey('/api/footer-content');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/footer-content');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },
 
  // Update footer content - clear cache after update
  async updateFooterContent(data: any) {
    const response = await apiClient.post('/api/footer-content', data);
    this.clearCacheEntry(getCacheKey('/api/footer-content'));
    return response.data;
  },
 
  // Blog - cache for 5 minutes
  async getBlogs(category?: string) {
    const cacheKey = getCacheKey('/api/blog', { category });
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/blog', { params: { category } });
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },
 
  // Get all blogs for admin
  async getAllBlogs() {
    const response = await apiClient.get('/api/blog/admin/all');
    return response.data;
  },
 
  // Single blog - cache for 15 minutes
  async getBlog(slug: string) {
    const cacheKey = getCacheKey(`/api/blog/${slug}`);
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get(`/api/blog/${slug}`);
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },
 
  // Create blog - clear cache
  async createBlog(data: any) {
    const response = await apiClient.post('/api/blog', data);
    cache.clear(); // Clear all blog cache
    return response.data;
  },
 
  // Update blog - clear cache
  async updateBlog(id: string, data: any) {
    const response = await apiClient.put(`/api/blog/${id}`, data);
    cache.clear(); // Clear all blog cache
    return response.data;
  },
 
  // Delete blog - clear cache
  async deleteBlog(id: string) {
    const response = await apiClient.delete(`/api/blog/${id}`);
    cache.clear(); // Clear all blog cache
    return response.data;
  },
 
  // Toggle blog publish status - clear cache
  async toggleBlogPublish(id: string) {
    const response = await apiClient.patch(`/api/blog/${id}/publish`);
    cache.clear(); // Clear all blog cache
    return response.data;
  },
 
  // Get navbar content - cache for 15 minutes
  async getNavbar() {
    const cacheKey = getCacheKey('/api/navbar');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;
 
    const response = await apiClient.get('/api/navbar');
    const data = response.data.data || response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },
 
  // Update navbar content - clear cache
  async updateNavbar(data: any) {
    const response = await apiClient.post('/api/navbar', data);
    this.clearCacheEntry(getCacheKey('/api/navbar'));
    return response.data.data || response.data;
  },
 
  // Batch fetch multiple endpoints in parallel
  async batchFetch(endpoints: string[]) {
    const promises = endpoints.map(endpoint => {
      const cacheKey = getCacheKey(endpoint);
      const cached = getFromCache(cacheKey);
      if (cached) return Promise.resolve(cached);
      return apiClient.get(endpoint).then(res => res.data);
    });
 
    return Promise.all(promises);
  },
 
  // Clear cache (useful for admin operations)
  clearCache() {
    cache.clear();
  },
 
  // Clear specific cache entry
  clearCacheEntry(key: string) {
    cache.delete(key);
  }
};
 
// Request interceptor for performance monitoring
apiClient.interceptors.request.use((config) => {
  (config as any).metadata = { startTime: Date.now() };
  return config;
});
 
// Response interceptor for performance monitoring
apiClient.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config as any).metadata.startTime;
    if (duration > 1000) {
      console.warn(`Slow API call: ${response.config.url} took ${duration}ms`);
    }
    return response;
  },
  (error) => {
    const duration = Date.now() - (error.config as any)?.metadata?.startTime;
    console.error(`API error: ${error.config?.url} failed after ${duration}ms`, error);
 
    // Log network errors
    if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
      console.warn('Network connection error:', error.message);
    }
 
    return Promise.reject(error);
  }
);
 
export const apiServices = {
  // 🔹 Gallery
  getGallery: () => apiFetch("/api/gallery"),
 
  uploadGallery: (formData: FormData) =>
    apiFetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    }),
 
  deleteGalleryImage: (id: string) =>
    apiFetch(`/api/gallery/${id}`, {
      method: "DELETE",
    }),
};
 
export default apiService;