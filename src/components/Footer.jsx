import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>React SPA</h3>
            <p>A modern Single Page Application demonstrating React Router DOM v6 capabilities.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a></li>
              <li><a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">React Router</a></li>
              <li><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" aria-label="GitHub">🐙</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="LinkedIn">💼</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} React SPA. Built with ❤️ using React & React Router.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
