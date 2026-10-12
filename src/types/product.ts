
export type Product = {
  id: string | number;
  slug: string;
  nameBn: string;
  image: string;
  category: string;
  categorySlug: string;
  unit: string;
  emoji: string;
  price: number;
  previousPrice: number;
  today: number;
  yesterday: number;
  markets: MarketPrice[];
  description?: string;
};

export type MarketPrice = {
  marketName: string;
  division: string;
  min: number;
  max: number;
};
