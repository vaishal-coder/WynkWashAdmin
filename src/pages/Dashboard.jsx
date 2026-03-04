import React from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { stats, revenueData, weeklyData, servicePopularity, bookings } from '../data/mockData';

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

const StatCard = ({ icon, label, value, sub, color, change }) => (
    <div className="stat-card animate-fade" style={{ display: 'flex', flexDirection: 'column', padding: '24px', overflow: 'hidden', justifyContent: 'space-between', minHeight: '160px', background: `${color}14`, border: `1px solid ${color}30`, borderLeft: `3px solid ${color}`, borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="icon-bg" style={{
                background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 16px -4px ${color}30`
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 2px 4px ${color}60)` }}>
                    {icon}
                </svg>
            </div>
            {sub && (
                <div style={{
                    padding: '4px 10px', borderRadius: 30, fontSize: 13, fontWeight: 700,
                    background: change > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: change > 0 ? '#10B981' : '#EF4444',
                    border: `1px solid ${change > 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    display: 'flex', alignItems: 'center', gap: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    {change > 0 ?
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg> :
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    }
                    {Math.abs(change)}%
                </div>
            )}
        </div>
        <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto', paddingTop: '16px' }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: '#FFF', lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 8 }}>{label}</div>
        </div>

        <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 140, height: 140,
            background: `radial-gradient(circle at right top, ${color}20, transparent 70%)`,
            borderTopRightRadius: 20,
            pointerEvents: 'none'
        }} />
        <div style={{
            position: 'absolute', bottom: -20, left: -20,
            width: 100, height: 100,
            background: `radial-gradient(circle at left bottom, rgba(255,255,255,0.03), transparent 70%)`,
            pointerEvents: 'none'
        }} />
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'var(--navy-light)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
                <div style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</div>
                {payload.map((p, i) => (
                    <div key={i} style={{ color: p.color, fontWeight: 600 }}>
                        {p.name}: {p.name === 'revenue' ? fmt(p.value) : p.value}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const statCards = [
        { icon: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></>, label: "Today's Orders", value: stats.todayOrders, change: 12, color: '#3B82F6' },
        { icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>, label: 'Completed Orders', value: stats.completedOrders, change: 8, color: '#10B981' },
        { icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, label: 'Active Workers', value: stats.activeWorkers, change: 0, color: '#8B5CF6' },
        { icon: <><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" /></>, label: "Revenue Today", value: fmt(stats.revenueToday), change: 15, color: '#F5C518' },
        { icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>, label: 'Monthly Revenue', value: '₹4.82L', change: 5, color: '#F59E0B' },
        { icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><path d="M12 14v4l2 2" /></>, label: 'Upcoming Bookings', value: stats.upcomingBookings, change: 22, color: '#EC4899' },
        { icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>, label: 'Total Customers', value: stats.totalCustomers, change: 9, color: '#06B6D4' },
        { icon: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>, label: 'Avg. Rating', value: <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{stats.avgRating} <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5C518" stroke="#F5C518" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div>, change: 2, color: '#F5C518' },
    ];

    const recentBookings = bookings.slice(0, 5);

    const statusColor = {
        pending: 'badge-pending',
        assigned: 'badge-assigned',
        inprogress: 'badge-inprogress',
        completed: 'badge-completed',
        cancelled: 'badge-cancelled',
    };

    return (
        <div className="animate-fade">
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                {statCards.map((c, i) => (
                    <StatCard key={i} {...c} sub />
                ))}
            </div>

            {/* Revenue Chart + Pie */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, marginBottom: 24 }}>
                <div className="card" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 18, color: '#FFF' }}>Revenue Overview</div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Last 7 months performance</div>
                        </div>
                        <div style={{ background: 'linear-gradient(135deg, rgba(245,197,24,0.15), rgba(245,197,24,0.05))', color: '#F5C518', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, border: '1px solid rgba(245,197,24,0.3)', boxShadow: '0 4px 12px rgba(245, 197, 24, 0.1)' }}>
                            Monthly
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F5C518" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v / 1000) + 'K'} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="revenue" name="revenue" stroke="#F5C518" strokeWidth={3} fill="url(#revGrad)" dot={{ fill: '#0A0F1C', stroke: '#F5C518', strokeWidth: 3, r: 5 }} activeDot={{ r: 7, fill: '#F5C518', stroke: '#FFF', strokeWidth: 3 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: '28px' }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#FFF', marginBottom: 4 }}>Service Popularity</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>By booking volume</div>
                    <ResponsiveContainer width="100%" height={170}>
                        <PieChart>
                            <Pie data={servicePopularity} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} stroke="var(--card-bg)" strokeWidth={3}>
                                {servicePopularity.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                            <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: 'var(--navy-light)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, backdropFilter: 'blur(10px)' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                        {servicePopularity.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0, boxShadow: `0 0 10px ${s.color}80` }} />
                                <div style={{ fontSize: 13, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{s.name}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly Bar + Recent Orders */}
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16, marginBottom: 16 }}>
                <div className="card">
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Weekly Orders</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>Current week</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                            <CartesianGrid stroke="rgba(255,255,255,0.04)" horizontal={false} />
                            <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="orders" name="orders" fill="#F5C518" radius={[4, 4, 0, 0]} opacity={0.85} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '18px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>Recent Orders</div>
                        <button className="btn btn-ghost btn-sm">View All</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Worker</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map(b => (
                                    <tr key={b.id}>
                                        <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#F5C518' }}>{b.id}</span></td>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{b.customer}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{b.vehicle.split('(')[0].trim()}</div>
                                        </td>
                                        <td style={{ fontSize: 12 }}>{b.service}</td>
                                        <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{b.worker || '—'}</td>
                                        <td style={{ fontWeight: 600, color: '#F5C518' }}>₹{b.amount.toLocaleString()}</td>
                                        <td><span className={`badge ${statusColor[b.status]}`}>{b.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Worker Activity + Customer Growth */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="card">
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Worker Activity Heatmap</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>Orders assigned by hour</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <div key={d} style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-secondary)', marginBottom: 4 }}>{d}</div>
                        ))}
                        {Array.from({ length: 7 * 6 }, (_, i) => {
                            const intensity = Math.random();
                            const alpha = (0.1 + intensity * 0.9).toFixed(2);
                            return (
                                <div key={i} style={{
                                    height: 20, borderRadius: 4,
                                    background: `rgba(245,197,24,${alpha})`,
                                    title: `${Math.floor(intensity * 12)} orders`,
                                }} />
                            );
                        })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
                        <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Low</span>
                        {[0.1, 0.3, 0.5, 0.7, 0.9].map(a => (
                            <div key={a} style={{ width: 14, height: 14, borderRadius: 3, background: `rgba(245,197,24,${a})` }} />
                        ))}
                        <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>High</span>
                    </div>
                </div>

                <div className="card">
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Customer Growth</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>New vs. returning</div>
                    <ResponsiveContainer width="100%" height={170}>
                        <LineChart data={revenueData} margin={{ top: 0, right: 8, bottom: 0, left: -20 }}>
                            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="orders" name="orders" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: '#3B82F6', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
