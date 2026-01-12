import type { Price } from '@/types/priceOffer';

export const formatPrice = (price: Price): string => {
  return new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: price.currency,
  }).format(price.amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};