import { createSlice } from '@reduxjs/toolkit';

interface ICartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
}

interface ICartState {
  cartItems: ICartItem[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: string; // Add totalPrice property
}

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartFromLocalStorage = localStorage.getItem('cart');
const initialState: ICartState = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : { cartItems: [], itemsPrice: 0, shippingPrice: 0, totalPrice: '0.00' }; // Initialize totalPrice as a string

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Recalculate itemsPrice
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      // ShippingPrice
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

      // Calculate totalPrice
      state.totalPrice = addDecimals(state.itemsPrice + state.shippingPrice);

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
