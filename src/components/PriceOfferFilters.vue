<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Origin combo box logic
const originFilter = ref('');
const showOriginDropdown = ref(false);
const highlightedOriginIndex = ref(-1);

// Destination combo box logic
const destinationFilter = ref('');
const showDestinationDropdown = ref(false);
const highlightedDestinationIndex = ref(-1);

const filteredOrigins = computed(() => {
  if (!originFilter.value.trim()) {
    return props.origins; 
  }
  
  const searchLower = originFilter.value.toLowerCase();
  return props.origins.filter(city => 
    city.city.toLowerCase().includes(searchLower) ||
    city.code.toLowerCase().includes(searchLower)
  );
});

const filteredDestinations = computed(() => {
  if (!destinationFilter.value.trim()) {
    return props.destinations; 
  }
  
  const searchLower = destinationFilter.value.toLowerCase();
  return props.destinations.filter(city => 
    city.city.toLowerCase().includes(searchLower) ||
    city.code.toLowerCase().includes(searchLower)
  );
});

// Watch for external changes to modelOrigin
watch(() => props.modelOrigin, (newVal) => {
  const selectedCity = props.origins.find(c => c.code === newVal);
  if (selectedCity) {
    originFilter.value = `${selectedCity.city} (${selectedCity.code})`;
  } else {
    originFilter.value = '';
  }
}, { immediate: true });

// Watch for external changes to modelDestination
watch(() => props.modelDestination, (newVal) => {
  const selectedCity = props.destinations.find(c => c.code === newVal);
  if (selectedCity) {
    destinationFilter.value = `${selectedCity.city} (${selectedCity.code})`;
  } else {
    destinationFilter.value = '';
  }
}, { immediate: true });

const selectOrigin = (city: Airport): void => {
  originFilter.value = `${city.city} (${city.code})`;
  emit('update:modelOrigin', city.code);
  showOriginDropdown.value = false;
  highlightedOriginIndex.value = -1;
};

const selectDestination = (city: Airport): void => {
  destinationFilter.value = `${city.city} (${city.code})`;
  emit('update:modelDestination', city.code);
  showDestinationDropdown.value = false;
  highlightedDestinationIndex.value = -1;
};

const handleOriginBlur = (): void => {
  setTimeout(() => {
    showOriginDropdown.value = false;
    highlightedOriginIndex.value = -1;
    
    if (props.modelOrigin && !originFilter.value.includes('(')) {
      const selectedCity = props.origins.find(c => c.code === props.modelOrigin);
      if (selectedCity) {
        originFilter.value = `${selectedCity.city} (${selectedCity.code})`;
      }
    }
  }, 200);
};

const handleDestinationBlur = (): void => {
  setTimeout(() => {
    showDestinationDropdown.value = false;
    highlightedDestinationIndex.value = -1;
    
    if (props.modelDestination && !destinationFilter.value.includes('(')) {
      const selectedCity = props.destinations.find(c => c.code === props.modelDestination);
      if (selectedCity) {
        destinationFilter.value = `${selectedCity.city} (${selectedCity.code})`;
      }
    }
  }, 200);
};

// Filter origins on input
const filterOrigins = (): void => {
  highlightedOriginIndex.value = -1;
  showOriginDropdown.value = true;
  if (!originFilter.value.trim()) {
    emit('update:modelOrigin', '');
  }
};

// Filter destinations on input
const filterDestinations = (): void => {
  highlightedDestinationIndex.value = -1;
  showDestinationDropdown.value = true;
  if (!destinationFilter.value.trim()) {
    emit('update:modelDestination', '');
  }
};

// Show dropdown on focus
const handleOriginFocus = (): void => {
  showOriginDropdown.value = true;
};

const handleDestinationFocus = (): void => {
  showDestinationDropdown.value = true;
};

const hasActiveFilters = computed<boolean>(() => {
  return props.modelOrigin !== '' || props.modelDestination !== '';
});

const handleReset = (): void => {
  emit('reset');
  originFilter.value = '';
  destinationFilter.value = '';
  showOriginDropdown.value = false;
  showDestinationDropdown.value = false;
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm p-4 md:p-6" role="search" aria-label="Filter price offers">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Origin Filter - ComboBox -->
      <div class="relative">
        <label for="origin-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Departure airport
        </label>
        
        <div class="relative">
          <input
            id="origin-filter"
            v-model="originFilter"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-800 focus:border-transparent transition-all"
            placeholder="Choose departure airport..."
            aria-label="Search departure airport"
            @focus="handleOriginFocus"
            @blur="handleOriginBlur"
            @input="filterOrigins"
          />
          
          <!-- Dropdown Icon -->
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <!-- Dropdown Options -->
          <div
            v-if="showOriginDropdown && filteredOrigins.length > 0"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            role="listbox"
            aria-label="Origin options"
          >
            <div
              v-for="(city, index) in filteredOrigins"
              :key="city.code"
              :class="[
                'px-4 py-3 cursor-pointer transition-colors',
                highlightedOriginIndex === index ? 'bg-pink-50 text-pink-800' : 'hover:bg-gray-50',
                modelOrigin === city.code ? 'bg-pink-100 font-semibold' : ''
              ]"
              role="option"
              :aria-selected="modelOrigin === city.code"
              @mousedown="selectOrigin(city)"
              @mouseenter="highlightedOriginIndex = index"
            >
              <div class="font-medium">{{ city.city }}</div>
              <div class="text-sm text-gray-600">{{ city.city }} ({{ city.code }})</div>
            </div>
          </div>
          
          <!-- No Results State -->
          <div
            v-if="showOriginDropdown && originFilter && filteredOrigins.length === 0"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            <div class="px-4 py-3 text-gray-500 text-center">
              No origins found for "{{ originFilter }}"
            </div>
          </div>
        </div>
      </div>
      
      <!-- Destination Filter - ComboBox -->
      <div class="relative">
        <label for="destination-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Destination airport
        </label>
        
        <div class="relative">
          <input
            id="destination-filter"
            v-model="destinationFilter"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-800 focus:border-transparent transition-all"
            placeholder="Choose destination airport..."
            aria-label="Search destination airport"
            @focus="handleDestinationFocus"
            @blur="handleDestinationBlur"
            @input="filterDestinations"
          />
                    
          <!-- Dropdown Icon -->
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <!-- Dropdown Options -->
          <div
            v-if="showDestinationDropdown && filteredDestinations.length > 0"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            role="listbox"
            aria-label="Destination options"
          >
            <div
              v-for="(city, index) in filteredDestinations"
              :key="city.code"
              :class="[
                'px-4 py-3 cursor-pointer transition-colors',
                highlightedDestinationIndex === index ? 'bg-pink-50 text-pink-800' : 'hover:bg-gray-50',
                modelDestination === city.code ? 'bg-pink-100 font-semibold' : ''
              ]"
              role="option"
              :aria-selected="modelDestination === city.code"
              @mousedown="selectDestination(city)"
              @mouseenter="highlightedDestinationIndex = index"
            >
              <div class="font-medium">{{ city.city }}</div>
              <div class="text-sm text-gray-600">{{ city.city }} ({{ city.code }})</div>
            </div>
          </div>
          
          <!-- No Results State -->
          <div
            v-if="showDestinationDropdown && destinationFilter && filteredDestinations.length === 0"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            <div class="px-4 py-3 text-gray-500 text-center">
              No destinations found for "{{ destinationFilter }}"
            </div>
          </div>
        </div>
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