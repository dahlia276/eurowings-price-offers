import { ref, computed, type Ref, type ComputedRef } from 'vue';
import { priceOffersApi } from '../api/index';
import type { PriceOffer, Airport } from '../types/priceOffer';

export interface UsePriceOffersReturn {
  offers: Ref<PriceOffer[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  filteredOffers: ComputedRef<PriceOffer[]>;
  originFilter: Ref<string>;
  destinationFilter: Ref<string>;
  uniqueOrigins: ComputedRef<Airport[]>;
  uniqueDestinations: ComputedRef<Airport[]>;
  loadOffers: () => Promise<void>;
  resetFilters: () => void;
}

export function usePriceOffers(): UsePriceOffersReturn {
  const offers = ref<PriceOffer[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const originFilter = ref<string>('');
  const destinationFilter = ref<string>('');

  const filteredOffers = computed<PriceOffer[]>(() => {
    return offers.value.filter(offer => {
      const matchesOrigin = !originFilter.value || 
        offer.origin.code === originFilter.value;
      const matchesDestination = !destinationFilter.value || 
        offer.destination.code === destinationFilter.value;
      return matchesOrigin && matchesDestination;
    });
  });

  const uniqueOrigins = computed<Airport[]>(() => {
    const origins = offers.value.map(offer => offer.origin);
    const uniqueMap = new Map<string, Airport>();
    origins.forEach(origin => {
      if (!uniqueMap.has(origin.code)) {
        uniqueMap.set(origin.code, origin);
      }
    });
    return Array.from(uniqueMap.values()).sort((a, b) => 
      a.city.localeCompare(b.city)
    );
  });

  const uniqueDestinations = computed<Airport[]>(() => {
    const destinations = offers.value.map(offer => offer.destination);
    const uniqueMap = new Map<string, Airport>();
    destinations.forEach(dest => {
      if (!uniqueMap.has(dest.code)) {
        uniqueMap.set(dest.code, dest);
      }
    });
    return Array.from(uniqueMap.values()).sort((a, b) => 
      a.city.localeCompare(b.city)
    );
  });

  const loadOffers = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      offers.value = await priceOffersApi.getAll();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An unexpected error occurred';
      console.error('Failed to load offers:', e);
    } finally {
      loading.value = false;
    }
  };

  const resetFilters = (): void => {
    originFilter.value = '';
    destinationFilter.value = '';
  };

  return {
    offers,
    loading,
    error,
    filteredOffers,
    originFilter,
    destinationFilter,
    uniqueOrigins,
    uniqueDestinations,
    loadOffers,
    resetFilters
  };
}