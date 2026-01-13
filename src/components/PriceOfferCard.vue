<script setup lang="ts">
import type { PriceOffer } from '../types/priceOffer';
import { formatPrice, formatDate } from '../utils/formatter';

interface Props {
  offer: PriceOffer;
}

defineProps<Props>();
</script>

<template>
  <article class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 flex flex-col gap-4">
    <!-- Route Section -->
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-col items-start flex-1">
        <span class="text-xs text-gray-500 mb-1">{{ offer.origin.code }}</span>
        <span class="text-2xl font-bold text-gray-900">{{ offer.origin.city.substring(0, 3).toUpperCase() }}</span>
      </div>
      
      <div class="flex flex-col items-center px-4 flex-shrink-0">
        <span class="text-xs text-gray-500">Direct</span>
      </div>
      
      <div class="flex flex-col items-end flex-1">
        <span class="text-xs text-gray-500 mb-1">{{ offer.destination.code }}</span>
        <span class="text-2xl font-bold text-gray-900">{{ offer.destination.city.substring(0, 3).toUpperCase() }}</span>
      </div>
    </div>

    <!-- Details Section -->
    <div class="grid grid-cols-2 gap-4 pb-6 border-b border-gray-200">
      <div>
        <div class="text-xs text-gray-500 mb-1">Duration</div>
        <div class="text-sm font-medium text-gray-900">02h 30m</div>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">Connection</div>
        <div class="text-sm font-medium text-gray-900">Nonstop</div>
      </div>
    </div>

    <!-- Dates Section -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <div class="text-xs text-gray-500 mb-1">Departure</div>
        <time :datetime="offer.departureDate" class="text-sm font-medium text-gray-900">
          {{ formatDate(offer.departureDate) }}
        </time>
      </div>
      <div>
        <div class="text-xs text-gray-500 mb-1">Return</div>
        <time :datetime="offer.returnDate" class="text-sm font-medium text-gray-900">
          {{ formatDate(offer.returnDate) }}
        </time>
      </div>
    </div>

    <!-- Price and CTA -->
    <div class="flex items-center justify-between pt-2">
      <div>
        <div class="text-xs text-gray-500 mb-1">Flight from</div>
        <div class="text-2xl font-bold text-gray-900">{{ formatPrice(offer.price) }}</div>
      </div>
      <button 
        type="button" 
        class="px-6 py-2.5 bg-pink-900 hover:bg-pink-950 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 active:scale-95"
        :aria-label="`Book flight from ${offer.origin.city} to ${offer.destination.city}`"
      >
        Select
      </button>
    </div>
  </article>
</template>