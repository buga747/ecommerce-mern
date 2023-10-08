import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
}

interface ICartState {
  cartItems: ICartItem[];
  itemsPrice: string; // Added itemsPrice property with string type
  shippingPrice: string; // Added shippingPrice property with string type
  totalPrice: string; // Added totalPrice property with string type
}

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartFromLocalStorage = localStorage.getItem('cart');
const initialState: ICartState = cartFromLocalStorage
  ? JSON.parse(cartFromLocalStorage)
  : {
      cartItems: [],
      itemsPrice: '0.00',
      shippingPrice: '0.00',
      totalPrice: '0.00',
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
