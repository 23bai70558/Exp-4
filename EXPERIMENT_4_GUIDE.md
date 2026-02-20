# Experiment 4: State Management - Implementation Guide

## Overview
This document provides a comprehensive guide to **Experiment 4: State Management**, which extends the existing **Experiment 3: React Router SPA** by implementing both **Context API** and **Redux Toolkit** for global state management.

---

## 🎯 Implementation Summary

### Part 1: Context API (Simple Global State)
- ✅ **Enhanced AuthContext** - Improved authentication with localStorage persistence
- ✅ **ThemeContext** - Light/Dark theme toggle with persistence
- ✅ **LanguageContext** - English/Hindi bilingual support with i18n

### Part 2: Redux Toolkit (Advanced State Management)
- ✅ **Redux Store** - Centralized state with Redux DevTools
- ✅ **Cart Slice** - Shopping cart with localStorage persistence
- ✅ **Product Slice** - Async API calls with loading/error states
- ✅ **User Slice** - User preferences management

---

## 📦 New Dependencies

```json
{
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0"
}
```

**Installation:**
```bash
pnpm add @reduxjs/toolkit react-redux
```

---

## 🗂️ Updated Project Structure

```
src/
├── context/                    # Context API Providers
│   ├── AuthContext.jsx        ✨ Enhanced with isLoggedIn
│   ├── ThemeContext.jsx        ✅ NEW - Theme management
│   └── LanguageContext.jsx     ✅ NEW - i18n support
│
├── store/                      ✅ NEW - Redux Structure
│   ├── index.js               # Store configuration
│   └── slices/
│       ├── cartSlice.js       # Shopping cart logic
│       ├── productSlice.js    # Product fetching & filtering
│       └── userSlice.js       # User preferences
│
├── pages/
│   ├── Cart.jsx               ✅ NEW - Shopping cart page
│   ├── Products.jsx           ✨ Updated - Redux integration
│   ├── Home.jsx               ✨ Updated - i18n support
│   └── About.jsx              ✨ Updated - i18n support
│
├── components/
│   └── Header.jsx             ✨ Updated - Theme/Lang toggles + Cart badge
│
├── main.jsx                   ✨ Updated - Provider wrapping
└── App.jsx                    ✨ Updated - Cart route added
```

---

## 🔥 Key Features Implemented

### 1. Theme Management (Context API)
**File:** `src/context/ThemeContext.jsx`

**Features:**
- Toggle between light and dark themes
- Automatic persistence in localStorage
- CSS custom properties for theme switching
- System preference detection fallback

**Usage:**
```jsx
import { useTheme } from '../context/ThemeContext';

function Component() {
  const { theme, toggleTheme } = useTheme();
  // theme: 'light' | 'dark'
  // toggleTheme: () => void
}
```

**Toggle Button in Header:**
```jsx
<button onClick={toggleTheme} className="icon-btn">
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

---

### 2. Language/i18n (Context API)
**File:** `src/context/LanguageContext.jsx`

**Features:**
- English/Hindi bilingual support
- Translation dictionary with 25+ keys
- Automatic persistence in localStorage
- Simple `t()` function for translations

**Translations:**
```javascript
const translations = {
  en: {
    welcome: 'Welcome',
    home: 'Home',
    products: 'Products',
    // ... more keys
  },
  hi: {
    welcome: 'स्वागत है',
    home: 'होम',
    products: 'उत्पाद',
    // ... more keys
  }
};
```

**Usage:**
```jsx
import { useLanguage } from '../context/LanguageContext';

function Component() {
  const { language, toggleLanguage, t } = useLanguage();
  
  return <h1>{t('welcome')}</h1>;
}
```

---

### 3. Shopping Cart (Redux Toolkit)
**File:** `src/store/slices/cartSlice.js`

**State Shape:**
```javascript
{
  items: [
    {
      id: 1,
      title: "Product Name",
      price: 29.99,
      quantity: 2,
      image: "...",
      category: "..."
    }
  ],
  total: 59.98
}
```

**Actions:**
- `addItem(product)` - Add item or increment if exists
- `removeItem(id)` - Remove item from cart
- `incrementQuantity(id)` - Increase quantity
- `decrementQuantity(id)` - Decrease quantity (min: 1)
- `clearCart()` - Empty entire cart

**Selectors:**
- `selectCartItems` - Get all cart items
- `selectCartTotal` - Get total price
- `selectItemCount` - Get total item quantity

**Persistence:**
- Automatically saves to localStorage on every change
- Restores cart state on app load

**Usage:**
```jsx
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectItemCount } from '../store/slices/cartSlice';

function Component() {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectItemCount);
  
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };
}
```

---

### 4. Product Management (Redux Toolkit)
**File:** `src/store/slices/productSlice.js`

**State Shape:**
```javascript
{
  products: [],      // Fetched from API
  loading: false,    // Loading indicator
  error: null,       // Error message
  filter: ''         // Search/filter query
}
```

**Async Thunk:**
```javascript
fetchProducts() // Fetches from https://fakestoreapi.com/products
```

**Actions:**
- `setFilter(query)` - Set search filter
- `clearFilter()` - Clear search
- `fetchProducts.pending` - Loading state
- `fetchProducts.fulfilled` - Success state
- `fetchProducts.rejected` - Error state

**Selectors:**
- `selectProducts` - All products
- `selectFilteredProducts` - Filtered by search query
- `selectProductsLoading` - Loading boolean
- `selectProductsError` - Error message

**Usage:**
```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsLoading
} from '../store/slices/productSlice';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const loading = useSelector(selectProductsLoading);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
}
```

---

### 5. Cart Page
**File:** `src/pages/Cart.jsx`

**Features:**
- Display all cart items with images
- Quantity controls (+/- buttons)
- Remove individual items
- Clear entire cart
- Real-time total calculation
- Empty cart state with CTA
- Responsive design

**Route:** `/cart`

---

### 6. Enhanced Products Page
**File:** `src/pages/Products.jsx`

**Updates:**
- Fetches products from FakeStore API via Redux
- Shows loading spinner during fetch
- Shows error message on failure
- Search/filter integrated with Redux state
- "Add to Cart" buttons on each product
- Product images from API
- Internationalization support

---

### 7. Provider Hierarchy
**File:** `src/main.jsx`

**Correct Order:**
```jsx
<Provider store={store}>           {/* Redux - Outermost */}
  <AuthProvider>                   {/* User Authentication */}
    <ThemeProvider>                {/* Theme Management */}
      <LanguageProvider>           {/* Internationalization */}
        <BrowserRouter>            {/* Routing */}
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </AuthProvider>
</Provider>
```

**Why this order?**
- Redux Provider wraps everything for global access
- Auth, Theme, and Language are independent contexts
- BrowserRouter needs to be inside contexts to use them

---

## 🎨 CSS Enhancements

### Theme Support
```css
/* Light Theme (Default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  /* ... */
}

/* Dark Theme */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... */
}
```

### New Components Styled
- `.icon-btn` - Theme/Language toggle buttons
- `.cart-badge` - Item count badge on cart link
- `.cart-container` - Cart page layout
- `.cart-item` - Individual cart item card
- `.quantity-controls` - +/- quantity buttons
- `.product-image` - Product thumbnails

---

## 🧪 Testing Checklist

### Context API Testing
- [ ] Login persists after page refresh
- [ ] Theme persists after page refresh
- [ ] Theme toggle switches between light/dark
- [ ] Language persists after page refresh
- [ ] Language toggle switches between EN/HI
- [ ] All UI text changes with language

### Redux Testing
- [ ] Products fetch from API on mount
- [ ] Loading spinner shows during fetch
- [ ] Products display after successful fetch
- [ ] Error message shows on API failure
- [ ] Search/filter works correctly
- [ ] Add to Cart increments quantity if duplicate
- [ ] Cart badge shows correct count
- [ ] Cart persists after page refresh
- [ ] Quantity controls work (+/-)
- [ ] Remove item works
- [ ] Clear cart works
- [ ] Total price calculates correctly

### Redux DevTools
- [ ] Open Redux DevTools in browser
- [ ] See initial state
- [ ] Watch actions dispatch on interactions
- [ ] Inspect state changes
- [ ] Time-travel debugging works

---

## 📊 State Management Decision Guide

### When to Use Context API
✅ **Use Context for:**
- Theme preferences (light/dark)
- Language/i18n settings
- User authentication state
- Simple global settings
- Data that changes infrequently

**Example:** Theme doesn't need complex logic, just toggle and persist.

### When to Use Redux
✅ **Use Redux for:**
- Shopping cart (complex logic)
- API data fetching (products)
- Data with frequent updates
- Complex state transformations
- Need for DevTools debugging
- Time-travel debugging

**Example:** Cart needs add/remove/update operations with calculations.

### Anti-Patterns (DON'T DO)
❌ Putting theme in Redux (overkill)
❌ Putting cart in Context (hard to debug)
❌ Mixing both for same feature
❌ Using Redux when useState is enough

---

## 🚀 Running the Application

### Development
```bash
pnpm dev
```
Open: `http://localhost:5173`

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

---

## 🔧 Browser DevTools Setup

### Redux DevTools Extension
**Chrome/Edge:**
- Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- Open DevTools (F12)
- Click "Redux" tab
- See state, actions, and time-travel

**What to Check:**
- Initial state matches expected structure
- Actions appear when you interact (addItem, fetchProducts.fulfilled, etc.)
- State updates correctly after each action
- No unexpected mutations

---

## 📝 Code Quality

### Best Practices Followed
✅ **Separation of Concerns**
- Context for UI state
- Redux for data/business logic

✅ **Immutability**
- Redux Toolkit uses Immer internally
- No direct state mutations

✅ **Type Safety**
- Selectors prevent direct state access
- Actions are type-safe

✅ **Performance**
- React.memo on expensive components
- Lazy loading for pages
- Selector memoization with createSelector

✅ **Persistence**
- localStorage for cart
- localStorage for theme/language
- Easy to migrate to server storage later

---

## 🎓 Viva/Interview Questions

### Context API
**Q: What is Context API?**
A: A React feature to share state across components without prop drilling.

**Q: When to use Context vs Props?**
A: Use Context for global state (theme, auth). Use props for component-specific data.

**Q: What is the Provider pattern?**
A: Wrapping components with `<Provider>` to make context values available to children.

**Q: How does useContext work?**
A: It accesses the nearest Provider's value in the component tree.

### Redux Toolkit
**Q: What is Redux?**
A: A predictable state container for JavaScript apps using a single source of truth.

**Q: What is Redux Toolkit?**
A: Official Redux library with simplified API, less boilerplate, and best practices built-in.

**Q: What is a slice?**
A: A collection of reducer logic and actions for a single feature (e.g., cart, products).

**Q: What is createAsyncThunk?**
A: A function to handle async operations like API calls with pending/fulfilled/rejected states.

**Q: Why use Redux DevTools?**
A: To inspect state, debug actions, and time-travel through state changes.

**Q: What are selectors?**
A: Functions to extract specific data from the Redux store efficiently.

**Q: Context vs Redux - when to use which?**
A:
- **Context:** Simple global state, infrequent updates, UI preferences
- **Redux:** Complex state, frequent updates, need DevTools, middleware

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   Redux Provider                     │
│  ┌───────────────────────────────────────────────┐  │
│  │              Auth Provider                    │  │
│  │  ┌─────────────────────────────────────────┐ │  │
│  │  │         Theme Provider                  │ │  │
│  │  │  ┌───────────────────────────────────┐  │ │  │
│  │  │  │     Language Provider            │  │ │  │
│  │  │  │  ┌────────────────────────────┐  │  │ │  │
│  │  │  │  │    BrowserRouter           │  │  │ │  │
│  │  │  │  │  ┌──────────────────────┐  │  │  │ │  │
│  │  │  │  │  │       App            │  │  │  │ │  │
│  │  │  │  │  │  - Header            │  │  │  │ │  │
│  │  │  │  │  │  - Routes            │  │  │  │ │  │
│  │  │  │  │  │  - Footer            │  │  │  │ │  │
│  │  │  │  │  └──────────────────────┘  │  │  │ │  │
│  │  │  │  └────────────────────────────┘  │  │ │  │
│  │  │  └───────────────────────────────────┘  │ │  │
│  │  └─────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

State Flow:
┌──────────┐    ┌────────────┐    ┌─────────┐
│ Component│ →  │  Dispatch  │ →  │  Store  │
│          │ ←  │  Selector  │ ←  │         │
└──────────┘    └────────────┘    └─────────┘
```

---

## 🎉 Summary

You've successfully implemented:
1. ✅ **3 Context Providers** - Auth, Theme, Language
2. ✅ **3 Redux Slices** - Cart, Products, User
3. ✅ **1 New Page** - Cart
4. ✅ **Enhanced Pages** - Products with API, Home/About with i18n
5. ✅ **Theme System** - Dark/Light mode
6. ✅ **Internationalization** - English/Hindi
7. ✅ **Shopping Cart** - Full CRUD operations
8. ✅ **API Integration** - FakeStore API
9. ✅ **Persistence** - localStorage for cart & settings
10. ✅ **DevTools** - Redux DevTools ready

**Total Lines of Code Added:** ~1200 lines
**Files Created:** 7
**Files Modified:** 8

---

## 👤 Author
**GitHub:** [@23bai70558](https://github.com/23bai70558)
**Email:** 23bai70558@cuchd.in

---

## 📄 License
Educational project for learning purposes.

---

**Built with ❤️ using React, Context API, and Redux Toolkit**
