import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
  } catch (err) {
    console.error('Could not load cart from localStorage', err);
  }
  return initialState;
};

// Save cart to localStorage
const saveCartToStorage = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Could not save cart to localStorage', err);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
      
      // Calculate total
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      saveCartToStorage(state);
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      saveCartToStorage(state);
    },
    
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        saveCartToStorage(state);
      }
    },
    
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        saveCartToStorage(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToStorage(state);
    }
  }
});

// Actions
export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

// Reducer
export default cartSlice.reducer;
