import React from 'react';
import { icons } from './Sidebar';

export default function Topbar({ page, collapsed, setMobileOpen }) {
    const pageLabels = {
        dashboard: 'Dashboard Overview',
        bookings: 'Booking Management',
        workers: 'Worker Management',
        customers: 'Customer Management',
        services: 'Services & Pricing',
        products: 'Product Inventory',
        coupons: 'Coupon Management',
        earnings: 'Earnings & Payouts',
        zones: 'Service Zones',
        notifications: 'Notifications',
        reviews: 'Reviews & Feedback',
        reports: 'Reports & Analytics',
        settings: 'Settings',
    };

    return (
        <header className={`topbar ${collapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 4 }}
                className="mobile-menu-btn"
            >
                {icons.menu}
            </button>

            {/* Page title */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em', margin: 0 }}>{pageLabels[page] || page}</h1>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}>
                    WynkWash · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span style={{ position: 'absolute', left: 12, color: 'var(--text-secondary)', pointerEvents: 'none' }}>{icons.search}</span>
                <input
                    className="input"
                    placeholder="Search anything..."
                    style={{ paddingLeft: 36, width: 220, fontSize: 13 }}
                />
            </div>

            {/* Notification */}
            <button style={{ position: 'relative', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 0.2s', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
                {icons.bell}
                <span style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, background: '#F5C518', borderRadius: '50%', border: '2px solid rgba(10,15,28,0.8)', boxShadow: '0 0 6px #F5C518' }} />
            </button>

            {/* Admin profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 16px 6px 6px', background: 'rgba(255,255,255,0.03)', borderRadius: 30, border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
                <div className="avatar" style={{ background: 'linear-gradient(135deg, #F5C518, #D1A30D)', color: '#000', width: 34, height: 34, fontSize: 13, boxShadow: '0 2px 8px rgba(245, 197, 24, 0.3)' }}>
                    AD
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Admin</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>Super Admin</div>
                </div>
            </div>

            <style>{`
        @media(max-width:1024px){
          .mobile-menu-btn { display:flex !important; }
        }
        @media(max-width:640px){
          .topbar input { display:none; }
        }
      `}</style>
        </header>
    );
}
