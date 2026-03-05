import React from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { stats, revenueData, weeklyData, servicePopularity, bookings } from '../data/mockData';

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

const SPARK_DATA = [40, 55, 35, 62, 48, 70, 60, 80, 65, 90];

const Sparkline = ({ color }) => {
    const w = 72, h = 28, n = SPARK_DATA.length;
    const min = Math.min(...SPARK_DATA), max = Math.max(...SPARK_DATA);
    const pts = SPARK_DATA.map((v, i) => [
        (i / (n - 1)) * w,
        h - ((v - min) / (max - min)) * h,
    ]);
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    const fill = [...pts, [w, h], [0, h]].map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + 'Z';
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
            <defs>
                <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={fill} fill={`url(#sg-${color.replace('#', '')})`} />
            <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const StatCard = ({ icon, label, value, sub, color, change }) => (
    <div
        className="animate-fade card shadow-sm" style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.35)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
        {/* Top accent line */}
        <div style={{
            position: 'absolute', top: 0, left: 20, right: 20, height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            borderRadius: '0 0 4px 4px',
        }} />

        {/* Icon + trend badge row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: 'rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                </svg>
            </div>
            {sub && (
                <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
                    padding: '3px 9px', borderRadius: 20,
                    background: change > 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: change > 0 ? '#34D399' : '#F87171',
                    border: `1px solid ${change > 0 ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.25)'}`,
                    display: 'flex', alignItems: 'center', gap: 3,
                }}>
                    {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
            )}
        </div>

        {/* Value + label */}
        <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1 }}>
                {value}
            </div>
            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 6 }}>
                {label}
            </div>
        </div>

        {/* Sparkline bottom-right */}
        <div style={{ position: 'absolute', bottom: 14, right: 16, opacity: 0.7 }}>
            <Sparkline color={color} />
        </div>
    </div >
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'var(--navy-light)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
                <div style={{ color: '#64748B', marginBottom: 6 }}>{label}</div>
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
                <div className="card shadow-sm" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: 18, color: '#0F172A' }}>Revenue Overview</div>
                            <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Last 7 months performance</div>
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
                            <CartesianGrid stroke="rgba(0,0,0,0.06)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                            <YAxis tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v / 1000) + 'K'} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="revenue" name="revenue" stroke="#F5C518" strokeWidth={4} fill="url(#revGrad)" dot={{ fill: '#FFFFFF', stroke: '#F5C518', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#F5C518', stroke: '#FFFFFF', strokeWidth: 3 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="card shadow-sm" style={{ padding: '28px' }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#0F172A', marginBottom: 4 }}>Service Popularity</div>
                    <div style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>By booking volume</div>
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
                                <div style={{ fontSize: 13, color: '#0F172A', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{s.name}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly Bar + Recent Orders */}
            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16, marginBottom: 16 }}>
                <div className="card shadow-sm" >
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Weekly Orders</div>
                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>Current week</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                            <CartesianGrid stroke="rgba(15, 23, 42,0.04)" horizontal={false} />
                            <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="orders" name="orders" fill="#F5C518" radius={[4, 4, 0, 0]} opacity={0.85} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
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
                                            <div style={{ fontSize: 11, color: '#64748B' }}>{b.vehicle.split('(')[0].trim()}</div>
                                        </td>
                                        <td style={{ fontSize: 12 }}>{b.service}</td>
                                        <td style={{ fontSize: 12, color: '#64748B' }}>{b.worker || '—'}</td>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>


                <div className="card shadow-sm" >
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', marginBottom: 16 }}>Customer Growth</div>
                    <ResponsiveContainer width="100%" height={170}>
                        <LineChart data={revenueData} margin={{ top: 0, right: 8, bottom: 0, left: -20 }}>
                            <CartesianGrid stroke="rgba(15, 23, 42,0.04)" vertical={false} />
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
