import { Link, useLocation } from 'react-router-dom';

const routeNames = {
  '': 'Home',
  'about': 'About',
  'products': 'Products',
  'contact': 'Contact',
  'login': 'Login',
  'dashboard': 'Dashboard',
};

function Breadcrumbs() {
  const location = useLocation();
  
  // Don't show breadcrumbs on home page or 404
  if (location.pathname === '/') {
    return null;
  }

  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <div className="breadcrumbs">
      <div className="container">
        <Link to="/">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          // Check if it's a number (product ID)
          const isNumeric = !isNaN(name);
          const displayName = isNumeric ? `Product ${name}` : (routeNames[name] || name);
          
          return (
            <span key={routeTo}>
              <span className="breadcrumb-separator">/</span>
              {isLast ? (
                <span className="breadcrumb-current">{displayName}</span>
              ) : (
                <Link to={routeTo}>{displayName}</Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumbs;
