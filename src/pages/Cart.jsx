import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  selectCartItems,
  selectCartTotal,
  selectItemCount,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '../store/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectItemCount);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <div className="cart-container">
          <h1>{t('cart')}</h1>
          <div className="cart-empty">
            <p>{t('cartEmpty')}</p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>{t('cart')}</h1>
          <button onClick={handleClearCart} className="btn-secondary">
            {t('clearCart')}
          </button>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleDecrement(item.id)}
                    className="quantity-btn"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => handleIncrement(item.id)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <p className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="btn-remove"
                >
                  {t('removeFromCart')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>{t('items')}:</span>
            <span>{itemCount}</span>
          </div>
          <div className="cart-summary-row cart-total">
            <span>{t('total')}:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary btn-full">
            Proceed to Checkout
          </button>
          <Link to="/products" className="btn-secondary btn-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
