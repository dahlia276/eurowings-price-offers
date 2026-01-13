import axios from 'axios';
import type { PriceOffer, PriceOfferResponse } from '../types/priceOffer';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const priceOffersApi = {
  async getAll(): Promise<PriceOffer[]> {
    const { data } = await api.get<PriceOfferResponse>('/price-offers');
    return data.priceOffers;
  },
};

export default api;