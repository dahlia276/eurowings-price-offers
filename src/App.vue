<script setup lang="ts">
import { onMounted } from 'vue';
import { usePriceOffers } from './composables/usePriceOffers';
import PriceOfferFilters from './components/PriceOfferFilters.vue';
import PriceOfferCard from './components/PriceOfferCard.vue';

const {
  loading,
  error,
  filteredOffers,
  originFilter,
  destinationFilter,
  uniqueOrigins,
  uniqueDestinations,
  loadOffers,
  resetFilters
} = usePriceOffers();

onMounted(() => {
  loadOffers();
});

const handleRetry = (): void => {
  loadOffers();
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
        
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-pink-800">Eurowings</h1>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main id="main-content" class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="mb-8">
        <PriceOfferFilters
          v-model:model-origin="originFilter"
          v-model:model-destination="destinationFilter"
          :origins="uniqueOrigins"
          :destinations="uniqueDestinations"
          @reset="resetFilters"
        />
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="w-full">
      </div>
      
      <!-- Error State -->
      <div 
        v-if="error" 
        class="bg-white rounded-lg shadow-sm p-12 text-center flex flex-col items-center"
        role="alert"
        aria-live="assertive"
      >
        <svg 
          class="w-16 h-16 text-red-500 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path stroke-linecap="round" stroke-width="2" d="M12 8v4m0 4h.01"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Unable to load offers</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button 
          type="button" 
          class="px-6 py-3 bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 active:scale-95"
          @click="handleRetry"
        >
          Try Again
        </button>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredOffers.length === 0 && !loading" class="bg-white rounded-lg shadow-sm p-12 text-center flex flex-col items-center">
        <svg 
          class="w-20 h-20 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">No offers found</h2>
        <p class="text-gray-600 mb-6">
          Try adjusting your filters to see more results
        </p>
        <button 
          type="button" 
          class="px-6 py-3 bg-pink-900 hover:bg-pink-800 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 active:scale-95"
          @click="resetFilters"
        >
          Clear Filters
        </button>
      </div>
      
      <!-- Offers List -->
      <div 
        v-else 
        class="space-y-4"
        role="region"
        aria-label="Price offers"
      >
        <PriceOfferCard
          v-for="offer in filteredOffers"
          :key="offer.id"
          :offer="offer"
        />
      </div>
      
      <!-- Results Count -->
      <div 
        v-if="!loading && filteredOffers.length > 0" 
        class="mt-8 text-center text-sm text-gray-600"
        role="status"
        aria-live="polite"
      >
        Showing {{ filteredOffers.length }} 
        {{ filteredOffers.length === 1 ? 'offer' : 'offers' }}
      </div>
    </main>
    
    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-500 m-0">&copy; 2026 Eurowings Digital. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>