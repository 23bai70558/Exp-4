import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import {
  fetchProducts,
  setFilter,
  clearFilter,
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductFilter
} from '../store/slices/productSlice';
import { addItem } from '../store/slices/cartSlice';

function Products() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const products = useSelector(selectFilteredProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const filter = useSelector(selectProductFilter);
  
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync URL search params with Redux filter
  useEffect(() => {
    if (searchQuery !== filter) {
      dispatch(setFilter(searchQuery));
    }
  }, [searchQuery, filter, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (query) {
      setSearchParams({ q: query, page: '1' });
    } else {
      setSearchParams({});
      dispatch(clearFilter());
    }
  };

  const handleClearSearch = () => {
    setSearchParams({});
    dispatch(clearFilter());
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-message">
          {t('error')}: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{t('products')}</h1>
      
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            placeholder={t('searchProducts')}
            defaultValue={searchQuery}
            className="search-input"
          />
          <button type="submit" className="btn-primary">Search</button>
          {searchQuery && (
            <button type="button" onClick={handleClearSearch} className="btn-secondary">
              Clear
            </button>
          )}
        </form>
        
        {searchQuery && (
          <p className="search-info">
            Showing results for: <strong>{searchQuery}</strong> (Page {currentPage})
          </p>
        )}
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-category">{product.category}</div>
              <h3>{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="btn-view">
                  View Details
                </Link>
                <button 
                  onClick={() => handleAddToCart(product)} 
                  className="btn-primary btn-add-cart"
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">{t('noResults')}</p>
        )}
      </div>
    </div>
  );
}

export default Products;
