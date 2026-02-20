import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="page">
      <h1>{t('welcomeMessage')}</h1>
      <p className="intro">
        {t('description')}
      </p>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>🚀 {t('routing')}</h3>
          <p>Experience instant page transitions without full page reloads.</p>
        </div>
        <div className="feature-card">
          <h3>📦 {t('stateManagement')}</h3>
          <p>Context API and Redux Toolkit for global state.</p>
        </div>
        <div className="feature-card">
          <h3>🔐 {t('authentication')}</h3>
          <p>Secure dashboard access with authentication.</p>
        </div>
        <div className="feature-card">
          <h3>🌙 {t('darkMode')}</h3>
          <p>Toggle between light and dark themes.</p>
        </div>
      </div>
      <div className="cta-section">
        <Link to="/products" className="btn-primary">
          Explore Products
        </Link>
        <Link to="/about" className="btn-secondary">
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default Home;
