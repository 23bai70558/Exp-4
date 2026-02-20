# React Router + State Management SPA

A modern **Single Page Application** built with **Vite + React**, **React Router DOM v6**, **Context API**, and **Redux Toolkit**, demonstrating comprehensive routing capabilities and advanced state management patterns.

## 🚀 Features Implemented

### Core Routing Features (Experiment 3)
- ✅ **BrowserRouter** - Client-side routing without hash in URL
- ✅ **Routes & Route** - Modern route configuration
- ✅ **NavLink** - Active state highlighting in navigation
- ✅ **Dynamic Routes** - `/products/:id` with URL parameters
- ✅ **Nested Routing** - Layout component with Outlet for child routes
- ✅ **Wildcard Route** - 404 Not Found page for unmatched URLs

### State Management Features (Experiment 4)
- ✅ **Context API** - Theme, Language, and Auth management
- ✅ **Redux Toolkit** - Shopping cart and product management
- ✅ **Dark Mode** - Toggle between light and dark themes with persistence
- ✅ **Internationalization** - English/Hindi bilingual support
- ✅ **Shopping Cart** - Full cart functionality with localStorage
- ✅ **API Integration** - Fetch products from FakeStore API
- ✅ **Redux DevTools** - Time-travel debugging enabled

### Advanced Features
- ✅ **Protected Routes** - Authentication-based route protection
- ✅ **Programmatic Navigation** - `useNavigate` for redirect after login
- ✅ **Breadcrumb Navigation** - `useLocation` for route hierarchy display
- ✅ **Query Parameters** - `useSearchParams` for search functionality
- ✅ **Lazy Loading** - React.lazy & Suspense for code splitting
- ✅ **Mock Authentication** - localStorage-based auth system
- ✅ **Persistent State** - Cart, theme, and language persist across sessions

### Pages Included
1. **Home** - Landing page with feature showcase (i18n enabled)
2. **About** - Project information and tech stack (i18n enabled)
3. **Products** - Product listing with search, API integration & cart
4. **Product Detail** - Dynamic route showing product details
5. **Contact** - Contact form with validation
6. **Login** - Authentication page with redirect
7. **Dashboard** - Protected route (requires auth)
8. **Cart** - Shopping cart with full CRUD operations
9. **404 Not Found** - Custom error page

## 📁 Project Structure

```
exp3-routing/
├── public/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Shared components
│   │   ├── Breadcrumbs.jsx
│   │   ├── Footer.jsx        # Theme/Lang toggles + Cart badge
│   │   ├── Layout.jsx
│   │   ├── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React Context (State Management)
│   │   ├── AuthContext.jsx   # User authentication
│   │   ├── ThemeContext.jsx  # Dark/Light mode
│   │   └── LanguageContext.jsx # i18n (EN/HI)
│   ├── store/           # Redux Toolkit (State Management)
│   │   ├── index.js          # Store configuration
│   │   └── slices/
│   │       ├── cartSlice.js      # Shopping cart
│   │       ├── productSlice.js   # Products with API
│   │       └── userSlice.js      # User preferences
│   ├── hooks/           # Custom hooks
│   │   └── useAuth.js
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx      # Redux + API integration
│   │   ├── ProductDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Cart.jsx          # Shopping cart page
│   │   └── NotFound.jsx
│   ├── App.jsx          # Route definitions
│   ├── App.css          # Component styles
│   ├── main.jsx         # App bootstrap with providers
│   └── index.css        # Global styles + theme variables
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── EXPERIMENT_4_GUIDE.md # Detailed state management guidenfig.js
└── README.md
```

## 🛠️ Installatio-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

5. **Install Redux DevTools Extension** (Optional but recommended)
   - [Chrome/Edge Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
pnpm build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
# or
pnpm preview
```

## 🌐 Deployment

### SPA Rewrite Configuration

Single Page Applications require server configuration to handle client-side routing. All routes should serve `index.html`.

#### Netlify
Create `netlify.toml` in the project root:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel
Create `vercel.json` in the project root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule> (test theme & language toggle)
- `/about` - About page (i18n enabled)
- `/products` - Products listing (API-powered, with Add to Cart)
- `/products/1` - Product detail (IDs: 1-20 from API)
- `/products?q=shirt&page=1` - Products with search query
- `/contact` - Contact form
- `/cart` - Shopping cart (view cart items)

### Theme & Language Testing
1. Click 🌙/☀️ icon in header to toggle dark/light mode
2. Click 🇮🇳/🇬🇧 icon to toggle between Hindi/English
3. Refresh page - preferences should persist

### Shopping Cart Flow
1. Visit `/products`
2. Wait for products to load from API
3. Click "Add to Cart" on any product
4. See cart badge update in header
5. Click "Cart" link in header
6. Adjust quantities with +/- buttons
7. Remove items or clear cart
8. Refresh page - cart should persist
  try_files $uri $uri/ /index.html;
}
```

## 🧪 Example Routes to Test

### Public Routes
- `/` - Home page
- `/about` - About page

## 🎨 State Management Architecture

### Context API Usage
```
ThemeContext → Dark/Light mode management
LanguageContext → English/Hindi i18n
AuthContext → User authentication
```

**When to use Context:**
- UI preferences (theme, language)
- User authentication state
- Settings that change infrequently

### Redux Toolkit Usage
```
cartSlice → Shopping cart CRUD operations
productSlice → API calls with async thunks
userSlice → User preference management
```

**When to use Redux:**
- Complex business logic
- Frequent state updates
- Need for DevTools/time-travel
- Async operations (API calls)

### Provider Hierarchy
```jsx
<Provider store={reduxStore}>
  <AuthProvider>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </AuthProvider>
</Provider>
```
- `/products` - Products listing
- `/products/1` - Product detail (IDs: 1-6)
- `/products?q=react&page=1` - Products with search query
- `/contact` - Contact form

### Authentication Flow
1. Visit `/dashboard` (will redirect to `/login`)
2. Login with any credentials:
   - Username: any value
   - Password: minimum 4 characters
3. Redirected back to `/dashboard`
4. Logout button returns to `/login`

### Protected Route
- `/dashboard` - Requires authentication (redirects to `/login` if not logged in)

### 404 Handling
- `/random-path` - Shows 404 Not Found page
- Any unmatched route triggers the wildcard route

## 🎨 Key Implementation Details

### 1. Lazy Loading
All Redux Toolkit** 2.11.2 - State management (advanced)
- **React Redux** 9.2.0 - React bindings for Redux
- **Vite** 7.3.1 - Build tool and dev server
- **JavaScript** ES6+ - Programming language
- **CSS3** - Styling with custom properties & theme variables
- **FakeStore API** - External API for product datae'));
```

### 2. Protected Routes
Authentication check before rendering:
```jsx
<Route
  path="dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
``**Complete React Router v6 implementation**
- **Modern React patterns** (Hooks, Context, Lazy Loading)
- **Context API** for simple global state (theme, language, auth)
- **Redux Toolkit** for complex state (cart, products, async operations)
- **State management architecture** - when to use Context vs Redux
- **API integration** with async thunks and loading states
- **localStorage persistence** for cart and user preferences
- **Internationalization (i18n)** with translation system
- **Dark/Light theme** implementation with CSS variables
- **Authentication flow** in SPAs
- **Route protection** and redirection
- **URL parameter** handling (dynamic routes & query strings)
- **Component composition** and reusability
- **Responsive CSS** design
- **Production deployment** considerations
- **Redux DevTools** integration for debugging

### 4. Dynamic Parameters
Access route parameters with useParams:
```jsx
const { id } = useParams();
```

### 5. Query Parameters
HanRedux Toolkit Documentation](https://redux-toolkit.js.org)
- [Vite Documentation](https://vitejs.dev)
- [FakeStore API](https://fakestoreapi.com)

## 📚 Additional Resources

- [EXPERIMENT_4_GUIDE.md](./EXPERIMENT_4_GUIDE.md) - Detailed state management implementation guide
- See Redux DevTools in browser DevTools panel for state inspection

---

**Experiment 3:** React Router SPA ✅  
**Experiment 4:** State Management (Context API + Redux Toolkit) ✅

Built with ❤️ using React, React Router DOM v6, Context API, and Redux Toolkit

### 6. Breadcrumbs
Display current route hierarchy:
```jsx
const location = useLocation();
const pathnames = location.pathname.split('/').filter(x => x);
```

## 🖼️ Screenshots

> Add screenshots of your application here after deployment

- Home Page
- Products Listing
- Product Detail
- Dashboard (Protected)
- Login Page
- 404 Page

## 🔧 Technology Stack

- **React** 19.2.0 - UI library
- **React Router DOM** 7.13.0 - Routing library (v6 API compatible)
- **Vite** 7.3.1 - Build tool and dev server
- **JavaScript** ES6+ - Programming language
- **CSS3** - Styling with custom properties

## 📝 Code Quality

- ✅ Clean, modular, and readable code
- ✅ Proper separation of concerns
- ✅ No console errors or warnings
- ✅ Responsive design for all screen sizes
- ✅ Semantic HTML structure
- ✅ Accessible navigation

## 🎯 Learning Outcomes

This project demonstrates:
- Complete React Router v6 implementation
- Modern React patterns (Hooks, Context, Lazy Loading)
- Authentication flow in SPAs
- Route protection and redirection
- URL parameter handling
- Query string manipulation
- Component composition and reusability
- Responsive CSS design
- Production deployment considerations

## 👤 Author

**Your Name**
- GitHub: [@23bai70558](https://github.com/23bai70558)
- Email: 23bai70558@cuchd.in

## 📄 License

This project is created for educational purposes.

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

---

Built with ❤️ using React & React Router DOM v6
