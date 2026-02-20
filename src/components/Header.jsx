import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { selectItemCount } from '../store/slices/cartSlice';

function Header() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const cartItemCount = useSelector(selectItemCount);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <NavLink to="/">
              <span className="logo-icon">⚛️</span>
              <span className="logo-text">React SPA</span>
            </NavLink>
          </div>

          <nav className="nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('home')}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('about')}
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('products')}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('contact')}
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link cart-link active' : 'nav-link cart-link'}>
              {t('cart')}
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </NavLink>
            {user ? (
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {t('dashboard')}
              </NavLink>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link nav-link-login active' : 'nav-link nav-link-login'}>
                {t('login')}
              </NavLink>
            )}
          </nav>

          <div className="header-actions">
            <button 
              onClick={toggleTheme} 
              className="icon-btn"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            
            <button 
              onClick={toggleLanguage} 
              className="icon-btn"
              title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              {language === 'en' ? '🇮🇳' : '🇬🇧'}
            </button>

            {user && (
              <div className="user-info">
                <span className="user-badge">👤 {user}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
