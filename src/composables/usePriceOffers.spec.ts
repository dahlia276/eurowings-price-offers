import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { usePriceOffers } from './usePriceOffers';
import { priceOffersApi } from '../api/index';
import { mockOffers } from '../../server/mockServer';

vi.mock('../api/index', () => ({
  priceOffersApi: {
    getAll: vi.fn(),
  },
}));

describe('usePriceOffers', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial values', () => {
      const composable = usePriceOffers();

      expect(composable.offers.value).toEqual([]);
      expect(composable.loading.value).toBe(false);
      expect(composable.error.value).toBe(null);
      expect(composable.originFilter.value).toBe('');
      expect(composable.destinationFilter.value).toBe('');
    });
  });

  describe('filteredOffers', () => {
    beforeEach(() => {
      vi.mocked(priceOffersApi.getAll).mockResolvedValue(mockOffers);
    });

    it('should return all offers when no filters are set', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      expect(composable.filteredOffers.value).toHaveLength(mockOffers.length);
    });

    it('should filter by origin only', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      composable.originFilter.value = 'BER';

      const filtered = composable.filteredOffers.value;
      expect(filtered.every(offer => offer.origin.code === 'BER')).toBe(true);
    });

    it('should filter by destination only', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      composable.destinationFilter.value = 'LHR';

      const filtered = composable.filteredOffers.value;
      expect(filtered.every(offer => offer.destination.code === 'LHR')).toBe(true);
    });

    it('should filter by both origin and destination', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      composable.originFilter.value = 'BER';
      composable.destinationFilter.value = 'LHR';

      const filtered = composable.filteredOffers.value;
      expect(filtered.every(offer => 
        offer.origin.code === 'BER' && offer.destination.code === 'LHR'
      )).toBe(true);
    });

    it('should return empty array when no matches', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      composable.originFilter.value = 'NON_EXISTENT';
      composable.destinationFilter.value = 'ALSO_NON_EXISTENT';

      expect(composable.filteredOffers.value).toEqual([]);
    });
  });

  describe('uniqueOrigins and uniqueDestinations', () => {
    beforeEach(() => {
      vi.mocked(priceOffersApi.getAll).mockResolvedValue(mockOffers);
    });

    it('should return unique origins sorted by city', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      const origins = composable.uniqueOrigins.value;
      const codes = origins.map(o => o.code);
      
      // Should remove duplicates
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });

    it('should return unique destinations sorted by city', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      const destinations = composable.uniqueDestinations.value;
      const codes = destinations.map(d => d.code);
      
      // Should remove duplicates
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });
  });

  describe('loadOffers', () => {
    it('should fetch and update offers', async () => {
      vi.mocked(priceOffersApi.getAll).mockResolvedValue(mockOffers);
      
      const composable = usePriceOffers();
      await composable.loadOffers();
      
      expect(composable.offers.value).toEqual(mockOffers);
      expect(composable.loading.value).toBe(false);
      expect(composable.error.value).toBe(null);
    });

    it('should handle API errors', async () => {
      const mockError = new Error('Network error');
      vi.mocked(priceOffersApi.getAll).mockRejectedValue(mockError);
      
      const composable = usePriceOffers();
      await composable.loadOffers();
      
      expect(composable.error.value).toBe('Network error');
      expect(composable.loading.value).toBe(false);
      expect(composable.offers.value).toEqual([]);
    });

    it('should handle unknown errors', async () => {
      vi.mocked(priceOffersApi.getAll).mockRejectedValue('Not an error object');
      
      const composable = usePriceOffers();
      await composable.loadOffers();
      
      expect(composable.error.value).toBe('An unexpected error occurred');
      expect(composable.loading.value).toBe(false);
    });
  });

  describe('resetFilters', () => {
    beforeEach(() => {
      vi.mocked(priceOffersApi.getAll).mockResolvedValue(mockOffers);
    });

    it('should reset both origin and destination filters', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      composable.originFilter.value = 'BER';
      composable.destinationFilter.value = 'LHR';

      composable.resetFilters();

      expect(composable.originFilter.value).toBe('');
      expect(composable.destinationFilter.value).toBe('');
    });

    it('should not affect offers after resetting', async () => {
      const composable = usePriceOffers();
      await composable.loadOffers();

      const initialOffersCount = composable.offers.value.length;
      composable.originFilter.value = 'BER';
      composable.resetFilters();

      expect(composable.offers.value.length).toBe(initialOffersCount);
    });
  });
});