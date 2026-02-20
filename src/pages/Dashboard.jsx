import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Total Products', value: '6', icon: '📦' },
    { label: 'Active Users', value: '1,234', icon: '👥' },
    { label: 'Revenue', value: '$12,345', icon: '💰' },
    { label: 'Orders', value: '89', icon: '🛒' },
  ];

  const recentActivities = [
    { id: 1, action: 'New product added', time: '2 hours ago' },
    { id: 2, action: 'User registration', time: '4 hours ago' },
    { id: 3, action: 'Order completed', time: '6 hours ago' },
    { id: 4, action: 'Review posted', time: '8 hours ago' },
  ];

  return (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="welcome-text">Welcome back, <strong>{user}</strong>! 👋</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary">
          Logout
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">
              <span>➕</span> Add Product
            </button>
            <button className="action-btn">
              <span>📊</span> View Reports
            </button>
            <button className="action-btn">
              <span>⚙️</span> Settings
            </button>
            <button className="action-btn">
              <span>👥</span> Manage Users
            </button>
          </div>
        </div>
      </div>

      <div className="protected-info">
        <p>🔐 This is a protected route. Only authenticated users can access this page.</p>
      </div>
    </div>
  );
}

export default Dashboard;
