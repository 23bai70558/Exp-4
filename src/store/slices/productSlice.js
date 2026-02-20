import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  filter: ''
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Actions
export const { setFilter, clearFilter } = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectProductFilter = (state) => state.products.filter;

// Filtered products selector
export const selectFilteredProducts = (state) => {
  const products = selectProducts(state);
  const filter = selectProductFilter(state);
  
  if (!filter) return products;
  
  return products.filter(product => 
    product.title.toLowerCase().includes(filter.toLowerCase()) ||
    product.category.toLowerCase().includes(filter.toLowerCase())
  );
};

// Reducer
export default productSlice.reducer;
