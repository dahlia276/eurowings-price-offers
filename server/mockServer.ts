import express from 'express';
import cors from 'cors';

interface Airport {
  city: string;
  code: string;
}

interface Price {
  amount: number;
  currency: string;
}

interface PriceOffer {
  id: string;
  origin: Airport;
  destination: Airport;
  price: Price;
  departureDate: string;
  returnDate: string;
}

interface PriceOfferResponse {
  priceOffers: PriceOffer[];
}

const app = express();
app.use(cors());
app.use(express.json());

export const mockOffers: PriceOffer[] = [
  {
    id: "1",
    origin: { city: "Berlin", code: "BER" },
    destination: { city: "Madrid", code: "MAD" },
    price: { amount: 49.99, currency: "EUR" },
    departureDate: "2026-03-15",
    returnDate: "2026-03-22"
  },
  {
    id: "2",
    origin: { city: "Berlin", code: "BER" },
    destination: { city: "Paris", code: "CDG" },
    price: { amount: 39.99, currency: "EUR" },
    departureDate: "2026-03-20",
    returnDate: "2026-03-27"
  },
  {
    id: "3",
    origin: { city: "London", code: "LHR" },
    destination: { city: "Barcelona", code: "BCN" },
    price: { amount: 59.99, currency: "EUR" },
    departureDate: "2026-04-01",
    returnDate: "2026-04-08"
  },
  {
    id: "4",
    origin: { city: "Paris", code: "CDG" },
    destination: { city: "Rome", code: "FCO" },
    price: { amount: 69.99, currency: "EUR" },
    departureDate: "2026-04-10",
    returnDate: "2026-04-17"
  },
  {
    id: "5",
    origin: { city: "Madrid", code: "MAD" },
    destination: { city: "Berlin", code: "BER" },
    price: { amount: 45.99, currency: "EUR" },
    departureDate: "2026-03-25",
    returnDate: "2026-04-01"
  },
  {
    id: "6",
    origin: { city: "London", code: "LHR" },
    destination: { city: "Amsterdam", code: "AMS" },
    price: { amount: 35.99, currency: "EUR" },
    departureDate: "2026-04-05",
    returnDate: "2026-04-12"
  },
  {
    id: "7",
    origin: { city: "Amsterdam", code: "AMS" },
    destination: { city: "Berlin", code: "BER" },
    price: { amount: 42.99, currency: "EUR" },
    departureDate: "2026-03-18",
    returnDate: "2026-03-25"
  },
  {
    id: "8",
    origin: { city: "Barcelona", code: "BCN" },
    destination: { city: "Paris", code: "CDG" },
    price: { amount: 54.99, currency: "EUR" },
    departureDate: "2026-04-15",
    returnDate: "2026-04-22"
  },
  {
    id: "9",
    origin: { city: "Rome", code: "FCO" },
    destination: { city: "London", code: "LHR" },
    price: { amount: 65.99, currency: "EUR" },
    departureDate: "2026-03-28",
    returnDate: "2026-04-04"
  },
  {
    id: "10",
    origin: { city: "Paris", code: "CDG" },
    destination: { city: "Madrid", code: "MAD" },
    price: { amount: 47.99, currency: "EUR" },
    departureDate: "2026-04-08",
    returnDate: "2026-04-15"
  }
];

app.get('/api/price-offers', (_req: Request, res: Response<PriceOfferResponse>) => {
  setTimeout(() => {
    res.json({ priceOffers: mockOffers });
  }, 500);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/price-offers`);
});