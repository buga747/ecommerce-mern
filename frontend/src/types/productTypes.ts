export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating?: number | null;
  numReviews: number;
}

export interface IRating {
  value: number | undefined;
  text?: string;
}
