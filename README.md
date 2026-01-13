# Eurowings Price Offers - Frontend Challenge

Accessible Vue.js application for browsing and filtering flight price offers.

## 🚀 Features

- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Vue 3** - Composition API with `<script setup>`
- ✅ **Mobile-First Design** - Responsive from mobile to desktop
- ✅ **Accessibility** - WCAG AA compliant with ARIA labels
- ✅ **Testing** - Unit and component tests with Vitest
- ✅ **Client-Side Filtering** - Fast, reactive filtering by origin/destination
- ✅ **Error Handling** - Graceful error states with retry functionality

## 📋 Prerequisites

- Node.js 18+ and npm

## 🛠️ Installation
# Install dependencies
npm install

## 🏃 Running the Application
```bash
# Start both mock server and dev server
npm start

# Or run separately:
npm run server  # Mock API on port 3001
npm run dev     # Vite dev server on port 5173
```

Visit `http://localhost:5173`

## 🧪 Testing
```bash
# Run tests
npm run test

## 🏗️ Architecture

### Directory Structure
src/
├── api/
│   ├── index.ts
── components/          # Vue components
│   ├── PriceOfferCard.vue
│   ├── PriceOfferFilters.vue
├── composables/         # Vue composables
│   └── usePriceOffers.ts
├── services/           # API services
│   └── priceOfferService.ts
├── types/              # TypeScript types
│   └── priceOffer.ts
├── utils/              # Utility functions
│   └── formatters.ts
└── App.vue             # Main app component