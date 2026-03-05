import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Workers from './pages/Workers';
import Customers from './pages/Customers';
import Services from './pages/Services';
import Products from './pages/Products';
import Coupons from './pages/Coupons';
import Earnings from './pages/Earnings';
import Zones from './pages/Zones';
import Notifications from './pages/Notifications';
import Reviews from './pages/Reviews';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import WorkerApplications from './pages/WorkerApplications';
import BookingHistory from './pages/BookingHistory';
import OrderKitStatus from './pages/OrderKitStatus';
import Verification from './pages/Verification';

const pages = {
  dashboard: Dashboard,
  bookings: Bookings,
  workers: Workers,
  customers: Customers,
  services: Services,
  products: Products,
  coupons: Coupons,
  earnings: Earnings,
  zones: Zones,
  notifications: Notifications,
  reviews: Reviews,
  reports: Reports,
  settings: Settings,
  'worker-applications': WorkerApplications,
  'booking-history': BookingHistory,
  'order-kit-status': OrderKitStatus,
  'verification': Verification,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const PageComponent = pages[activePage] || Dashboard;

  return (
    <>
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <Topbar
        page={activePage}
        collapsed={collapsed}
        setMobileOpen={setMobileOpen}
      />
      <main className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <PageComponent key={activePage} onNavigate={setActivePage} />
      </main>
    </>
  );
}
