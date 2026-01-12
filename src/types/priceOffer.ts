export interface Airport {
  city: string;
  code: string;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface PriceOffer {
  id: string;
  origin: Airport;
  destination: Airport;
  price: Price;
  departureDate: string;
  returnDate: string;
}

export interface PriceOfferResponse {
  priceOffers: PriceOffer[];
}