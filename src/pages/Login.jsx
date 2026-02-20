import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Mock authentication - accept any username with password
    if (credentials.username && credentials.password) {
      if (credentials.password.length < 4) {
        setError('Password must be at least 4 characters');
        return;
      }

      login(credentials.username);
      navigate(from, { replace: true });
    } else {
      setError('Please enter both username and password');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page">
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <p className="login-subtitle">Sign in to access your dashboard</p>

          {location.state?.from && (
            <div className="info-message">
              Please log in to access {location.state.from.pathname}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter any username"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password (min 4 chars)"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary btn-full">
              Sign In
            </button>
          </form>

          <div className="login-demo">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: any username</p>
            <p>Password: any password (min 4 characters)</p>
          </div>

          <p className="login-footer">
            Don't have an account? <Link to="/contact">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
