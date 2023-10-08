import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartProduct, ICartState } from '../reduxTypes';

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartFromLocalStorage = localStorage.getItem('cart');
const initialState: ICartState = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : {
      cartItems: [],
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartProduct>) => {
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
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.itemsPrice = addDecimals(itemsPrice);

      // ShippingPrice
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      state.shippingPrice = addDecimals(shippingPrice);

      // Calculate the total price
      const totalPrice = itemsPrice + shippingPrice;
      state.totalPrice = addDecimals(totalPrice);

      // Save the cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
      // Recalculate itemsPrice
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.itemsPrice = addDecimals(itemsPrice);

      // ShippingPrice
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      state.shippingPrice = addDecimals(shippingPrice);

      // Calculate the total price
      const totalPrice = itemsPrice + shippingPrice;
      state.totalPrice = addDecimals(totalPrice);

      // Save the cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export type CartSlice = typeof cartSlice;

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
