export interface IRating {
  value: number | null | undefined;
  text?: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  user: IUser;
  name: string;
  rating: number;
  comment?: string;
}

export interface ICartState {
  cartItems: ICartProduct[];
  itemsPrice: string; // Added itemsPrice property with string type
  shippingPrice: string; // Added shippingPrice property with string type
  totalPrice: string; // Added totalPrice property with string type
}

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
export interface ICartProduct extends IProduct {
  user: string;
  reviews: IReview[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  qty: number;
}
