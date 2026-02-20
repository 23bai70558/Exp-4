import { useParams, Link, useNavigate } from 'react-router-dom';

const productDatabase = {
  1: { id: 1, name: 'React Fundamentals', category: 'Courses', price: 49.99, description: 'Master the fundamentals of React including components, props, state, and hooks. Perfect for beginners starting their React journey.', duration: '8 hours', level: 'Beginner' },
  2: { id: 2, name: 'Advanced React Patterns', category: 'Courses', price: 79.99, description: 'Learn advanced patterns like render props, higher-order components, compound components, and custom hooks. Take your React skills to the next level.', duration: '12 hours', level: 'Advanced' },
  3: { id: 3, name: 'React Router Mastery', category: 'Courses', price: 39.99, description: 'Complete guide to React Router v6 covering routing, navigation, protected routes, nested routes, and dynamic routing patterns.', duration: '6 hours', level: 'Intermediate' },
  4: { id: 4, name: 'State Management Guide', category: 'Books', price: 29.99, description: 'Comprehensive guide covering useState, useReducer, Context API, Redux, and Zustand. Learn when and how to use each approach.', duration: '250 pages', level: 'Intermediate' },
  5: { id: 5, name: 'React Performance Tips', category: 'Books', price: 19.99, description: 'Practical tips and techniques for optimizing React applications. Learn about memoization, code splitting, and performance profiling.', duration: '150 pages', level: 'Intermediate' },
  6: { id: 6, name: 'Full Stack React', category: 'Courses', price: 99.99, description: 'Build complete full-stack applications with React, Node.js, Express, and MongoDB. Includes authentication, API development, and deployment.', duration: '20 hours', level: 'Advanced' },
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productDatabase[id];

  if (!product) {
    return (
      <div className="page">
        <div className="error-box">
          <h2>Product Not Found</h2>
          <p>The product with ID <strong>{id}</strong> does not exist.</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="page">
      <button onClick={handleGoBack} className="btn-back">
        ← Back
      </button>
      
      <div className="product-detail">
        <div className="product-header">
          <span className="product-category">{product.category}</span>
          <span className="product-level">{product.level}</span>
        </div>
        
        <h1>{product.name}</h1>
        
        <div className="product-meta">
          <span>📦 Product ID: {product.id}</span>
          <span>⏱️ {product.duration}</span>
          <span className="product-price-large">${product.price}</span>
        </div>

        <div className="product-description">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>

        <div className="product-actions">
          <button className="btn-primary">Add to Cart</button>
          <Link to="/products" className="btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
