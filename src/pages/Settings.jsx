import React, { useState } from 'react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [general, setGeneral] = useState({
        appName: 'WynkWash',
        tagline: 'Your No. 1 Doorstep Carwash Service',
        supportEmail: 'contact@wynkwash.com',
        supportPhone: '88700 37600',
        website: 'wynkwash.com',
        gst: '29AAACW1234A1ZX',
    });

    const tabs = [
        { key: 'general', label: 'General' },
        { key: 'commission', label: 'Commission' },
        { key: 'notifications', label: 'Notifications' },
        { key: 'api', label: 'API & AI Settings' },
        { key: 'admin', label: 'Admin Users' },
    ];

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
                {tabs.map(t => (
                    <button key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        style={{
                            background: 'none', border: 'none', color: activeTab === t.key ? '#F5C518' : 'var(--text-secondary)',
                            fontWeight: activeTab === t.key ? 700 : 500, fontSize: 14, cursor: 'pointer',
                            padding: '10px 16px', borderBottom: activeTab === t.key ? '2px solid #F5C518' : '2px solid transparent',
                            transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                        }}>
                        {t.label}
                    </button>
                ))}
            </div>

            {activeTab === 'general' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 700 }}>
                    {[
                        { label: 'App Name', key: 'appName' },
                        { label: 'Tagline', key: 'tagline' },
                        { label: 'Support Email', key: 'supportEmail' },
                        { label: 'Support Phone', key: 'supportPhone' },
                        { label: 'Website', key: 'website' },
                        { label: 'GST Number', key: 'gst' },
                    ].map(f => (
                        <div key={f.key}>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                            <input className="input" value={general[f.key]} onChange={e => setGeneral({ ...general, [f.key]: e.target.value })} />
                        </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                        <button className="btn btn-primary">Save General Settings</button>
                    </div>
                </div>
            )}

            {activeTab === 'commission' && (
                <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Commission Settings</div>
                        {[
                            { label: 'Default Commission %', value: '20', suffix: '%' },
                            { label: 'Minimum Payout Amount (₹)', value: '500', suffix: '₹' },
                            { label: 'Payout Cycle', value: 'Monthly', type: 'select', options: ['Weekly', 'Bi-weekly', 'Monthly'] },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.label}</div>
                                </div>
                                {s.type === 'select'
                                    ? <select className="select" style={{ width: 140 }}>
                                        {s.options.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                    : <input className="input" defaultValue={s.value} style={{ width: 100, textAlign: 'right' }} />
                                }
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Save Commission Settings</button>
                </div>
            )}

            {activeTab === 'api' && (
                <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>AI & Automation Settings</div>
                        {[
                            { label: 'AI Worker Auto-Assignment', desc: 'Automatically assign nearest available worker to new bookings', enabled: true },
                            { label: 'Smart Scheduling', desc: 'Optimize booking slots based on worker availability and location', enabled: true },
                            { label: 'Fraud Detection', desc: 'Detect and flag suspicious coupon usage patterns', enabled: true },
                            { label: 'Dynamic Pricing', desc: 'Adjust prices based on demand and peak hours', enabled: false },
                            { label: 'Route Optimization', desc: 'Suggest optimized routes for workers with multiple bookings', enabled: true },
                            { label: 'Inventory Alerts', desc: 'Send alerts when product stock falls below threshold', enabled: true },
                            { label: 'Automated Earnings Calculation', desc: 'Calculate and credit earnings automatically at month end', enabled: true },
                        ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.label}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{s.desc}</div>
                                </div>
                                <label style={{ position: 'relative', display: 'inline-block', width: 46, height: 26, flexShrink: 0, cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked={s.enabled} style={{ opacity: 0, width: 0, height: 0 }}
                                        onChange={() => { }} />
                                    <span style={{
                                        position: 'absolute', inset: 0, borderRadius: 26, cursor: 'pointer',
                                        background: s.enabled ? '#F5C518' : 'rgba(255,255,255,0.1)',
                                        transition: '0.3s',
                                    }}>
                                        <span style={{
                                            position: 'absolute', height: 20, width: 20, left: s.enabled ? 23 : 3, bottom: 3,
                                            background: s.enabled ? '#0B1F3A' : 'rgba(255,255,255,0.6)',
                                            borderRadius: '50%', transition: '0.3s',
                                        }} />
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>API Keys</div>
                        {[
                            { label: 'Google Maps API Key', placeholder: 'AIzaSy...' },
                            { label: 'Firebase FCM Key', placeholder: 'AAAA...' },
                            { label: 'Razorpay Key ID', placeholder: 'rzp_live_...' },
                            { label: 'SMS Gateway API Key', placeholder: 'Your SMS API key' },
                        ].map((k, i) => (
                            <div key={i} style={{ marginBottom: 12 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{k.label.toUpperCase()}</div>
                                <input className="input" type="password" placeholder={k.placeholder} />
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Save API Settings</button>
                </div>
            )}

            {activeTab === 'admin' && (
                <div style={{ maxWidth: 700 }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                        <button className="btn btn-primary btn-sm">+ Add Admin User</button>
                    </div>
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead>
                                <tr><th>Name</th><th>Email</th><th>Role</th><th>Added</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'WynkWash Owner', email: 'admin@wynkwash.com', role: 'Super Admin', added: '2024-01-01', status: 'active' },
                                    { name: 'Ops Manager', email: 'ops@wynkwash.com', role: 'Operations', added: '2024-06-15', status: 'active' },
                                    { name: 'Finance Team', email: 'finance@wynkwash.com', role: 'Finance', added: '2024-06-15', status: 'active' },
                                ].map((a, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{a.name}</td>
                                        <td style={{ fontSize: 12 }}>{a.email}</td>
                                        <td><span className="badge badge-yellow" style={{ fontSize: 10 }}>{a.role}</span></td>
                                        <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.added}</td>
                                        <td><span className="badge badge-completed">{a.status}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="btn btn-ghost btn-sm">Edit</button>
                                                {i > 0 && <button className="btn btn-danger btn-sm">Remove</button>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card">
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Notification Preferences</div>
                        {[
                            'New booking created',
                            'Booking status changed',
                            'Worker assigned',
                            'Payment completed',
                            'Refund requested',
                            'New complaint received',
                            'Low stock alert',
                            'Daily revenue report',
                            'New customer registered',
                        ].map((notif, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                <span style={{ fontSize: 13 }}>{notif}</span>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12 }}>
                                    <input type="checkbox" defaultChecked style={{ accentColor: '#F5C518', width: 15, height: 15 }} />
                                    Email
                                    <input type="checkbox" defaultChecked style={{ accentColor: '#F5C518', width: 15, height: 15, marginLeft: 8 }} />
                                    Push
                                </label>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Save Preferences</button>
                </div>
            )}
        </div>
    );
}
