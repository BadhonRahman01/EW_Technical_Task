import axios from 'axios';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZGV4ZHVma25kZGJjaGV3ZGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNDcyODUsImV4cCI6MjAzNzgyMzI4NX0.k62P6W0dO7E_BJpy9zVfm-HYhVlE3vrRldMo_1uUa9U';

const apiClient = axios.create({
  baseURL: 'https://ybdexdufknddbchewdkm.supabase.co/rest/v1',
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});



// Preferences
export const getPreferences = () => apiClient.get('/preferences');
export const addPreference = (data) => apiClient.post('/preferences', data);
export const updatePreference = (id, data) => apiClient.patch(`/preferences?id=eq.${id}`, data);
export const deletePreference = (id) => apiClient.delete(`/preferences?id=eq.${id}`);