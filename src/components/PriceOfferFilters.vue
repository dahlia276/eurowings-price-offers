<script setup lang="ts">
import { computed } from 'vue';
import type { Airport } from '../types/priceOffer';

interface Props {
  origins: Airport[];
  destinations: Airport[];
  modelOrigin: string;
  modelDestination: string;
}

interface Emits {
  (e: 'update:modelOrigin', value: string): void;
  (e: 'update:modelDestination', value: string): void;
  (e: 'reset'): void;
  (e: 'search'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localOrigin = computed({
  get: () => props.modelOrigin,
  set: (value: string) => emit('update:modelOrigin', value)
});

const localDestination = computed({
  get: () => props.modelDestination,
  set: (value: string) => emit('update:modelDestination', value)
});

const hasActiveFilters = computed<boolean>(() => {
  return props.modelOrigin !== '' || props.modelDestination !== '';
});

const handleReset = (): void => {
  emit('reset');
};

const handleSearch = (): void => {
  emit('search');
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-4 md:p-6" role="search" aria-label="Filter price offers">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Origin Filter -->
      <div class="relative">
        <label for="origin-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Departure airport
        </label>
        <select 
          id="origin-filter"
          v-model="localOrigin"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-800 focus:border-transparent transition-all cursor-pointer appearance-none"
          aria-label="Filter by origin city"
        >
          <option value="">All Origins</option>
          <option 
            v-for="city in origins" 
            :key="city.code" 
            :value="city.code"
          >
            {{ city.city }} ({{ city.code }})
          </option>
        </select>
      </div>
      
      <!-- Destination Filter -->
      <div class="relative">
        <label for="destination-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Destination airport
        </label>
        <select 
          id="destination-filter"
          v-model="localDestination"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-800 focus:border-transparent transition-all cursor-pointer appearance-none"
          aria-label="Filter by destination city"
        >
          <option value="">All Destinations</option>
          <option 
            v-for="city in destinations" 
            :key="city.code" 
            :value="city.code"
          >
            {{ city.city }} ({{ city.code }})
          </option>
        </select>
      </div>

      <!-- Search Button -->
      <div class="flex items-end">
        <button
          type="button"
          class="w-full px-6 py-3 bg-pink-800 hover:bg-pink-900 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-800 focus:ring-offset-2 active:scale-95"
          @click="handleSearch"
          aria-label="Search flights"
        >
          Search Flights
        </button>
      </div>

      <!-- Reset Button -->
      <div v-if="hasActiveFilters" class="flex items-end">
        <button
          type="button"
          class="w-full px-6 py-3 bg-pink-800 hover:bg-pink-900 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-800 focus:ring-offset-2 active:scale-95"
          @click="handleReset"
          aria-label="Reset all filters"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>