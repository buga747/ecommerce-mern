import { createSlice } from '@reduxjs/toolkit';

interface ICartState {
  cartItems: unknown[];
}

const cartFromLocalStorage = localStorage.getItem('cart');
const initialState: ICartState = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
