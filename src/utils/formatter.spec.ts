import { describe, it, expect } from 'vitest';
import { formatPrice, formatDate } from './formatter';

describe('formatter utilities', () => {
  describe('formatPrice', () => {
    it('should format EUR price correctly', () => {
      const price = { amount: 99.99, currency: 'EUR' } as const;
      const result = formatPrice(price);
      expect(result).toContain('99.99');
      expect(result).toContain('€');
      expect(typeof result).toBe('string');
    });

    it('should format USD price correctly', () => {
      const price = { amount: 149.50, currency: 'USD' } as const;
      const result = formatPrice(price);
      expect(result).toContain('149.50'); 
      expect(result).toMatch(/[\$\€\£]/);  
      expect(typeof result).toBe('string');
    });

    it('should handle whole numbers without decimals', () => {
      const price = { amount: 100, currency: 'EUR' } as const;
      const result = formatPrice(price);
      expect(result).toContain('100.00');
      expect(result).toContain('€');
    });

    it('should handle zero amount', () => {
      const price = { amount: 0, currency: 'EUR' } as const;
      const result = formatPrice(price);
      
      expect(result).toContain('0.00');
      expect(result).toContain('€');
    });

    it('should handle negative prices', () => {
      const price = { amount: -49.99, currency: 'EUR' } as const;
      const result = formatPrice(price);
      expect(result).toContain('49.99');
      expect(result).toContain('-');
      expect(result).toContain('€');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string correctly', () => {
      const dateString = '2024-03-15T14:30:00Z';
      const result = formatDate(dateString);
      expect(result).toContain('Mar');
      expect(result).toContain('2024'); 
      expect(typeof result).toBe('string');
    });

    it('should format date with single-digit day', () => {
      const dateString = '2024-03-05T00:00:00Z';
      const result = formatDate(dateString);
      expect(result).toContain('Mar');
      expect(result).toContain('2024');
      expect(result).toContain('05');
    });

    it('should handle different months correctly', () => {
      const testCases = [
        { date: '2024-01-15', month: 'Jan' },
        { date: '2024-06-20', month: 'Jun' },
        { date: '2024-12-25', month: 'Dec' },
      ];

      testCases.forEach(({ date, month }) => {
        const result = formatDate(date);
        expect(result).toContain(month);
      });
    });

    it('should handle leap year date', () => {
      const result = formatDate('2024-02-29');
      expect(result).toContain('Feb');
      expect(result).toContain('2024');
      expect(result).toContain('29');
    });
  });
});