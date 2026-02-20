import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div className="page">
      <div className="not-found">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2>Page Not Found</h2>
          <p>
            The page <code>{location.pathname}</code> does not exist.
          </p>
          <p className="not-found-message">
            The resource you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn-primary">
              Go Home
            </Link>
            <Link to="/products" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
