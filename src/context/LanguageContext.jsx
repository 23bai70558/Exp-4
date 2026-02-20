import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext(null);

// Translation dictionary
export const translations = {
  en: {
    welcome: 'Welcome',
    home: 'Home',
    about: 'About',
    products: 'Products',
    contact: 'Contact',
    login: 'Login',
    dashboard: 'Dashboard',
    cart: 'Cart',
    logout: 'Logout',
    welcomeMessage: 'Welcome to React SPA',
    description: 'A modern Single Page Application built with React and React Router',
    features: 'Features',
    routing: 'Client-side Routing',
    stateManagement: 'State Management',
    authentication: 'Authentication',
    darkMode: 'Dark Mode',
    aboutTitle: 'About This Project',
    aboutDescription: 'This project demonstrates state management using Context API and Redux Toolkit',
    techStack: 'Technology Stack',
    contextApi: 'Context API for Theme & Language',
    reduxToolkit: 'Redux Toolkit for Cart & Products',
    searchProducts: 'Search products...',
    addToCart: 'Add to Cart',
    removeFromCart: 'Remove',
    clearCart: 'Clear Cart',
    cartEmpty: 'Your cart is empty',
    total: 'Total',
    items: 'items',
    loading: 'Loading...',
    error: 'Error',
    noResults: 'No products found'
  },
  hi: {
    welcome: 'स्वागत है',
    home: 'होम',
    about: 'के बारे में',
    products: 'उत्पाद',
    contact: 'संपर्क करें',
    login: 'लॉगिन',
    dashboard: 'डैशबोर्ड',
    cart: 'कार्ट',
    logout: 'लॉगआउट',
    welcomeMessage: 'React SPA में आपका स्वागत है',
    description: 'React और React Router के साथ बनाया गया एक आधुनिक सिंगल पेज एप्लिकेशन',
    features: 'विशेषताएं',
    routing: 'क्लाइंट-साइड रूटिंग',
    stateManagement: 'स्टेट मैनेजमेंट',
    authentication: 'प्रमाणीकरण',
    darkMode: 'डार्क मोड',
    aboutTitle: 'इस परियोजना के बारे में',
    aboutDescription: 'यह परियोजना Context API और Redux Toolkit का उपयोग करके स्टेट मैनेजमेंट को प्रदर्शित करती है',
    techStack: 'प्रौद्योगिकी स्टैक',
    contextApi: 'थीम और भाषा के लिए Context API',
    reduxToolkit: 'कार्ट और उत्पादों के लिए Redux Toolkit',
    searchProducts: 'उत्पाद खोजें...',
    addToCart: 'कार्ट में डालें',
    removeFromCart: 'हटाएं',
    clearCart: 'कार्ट साफ़ करें',
    cartEmpty: 'आपका कार्ट खाली है',
    total: 'कुल',
    items: 'आइटम',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    noResults: 'कोई उत्पाद नहीं मिला'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Initialize language from localStorage or default to 'en'
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage || 'en';
  });

  useEffect(() => {
    // Persist language preference
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
