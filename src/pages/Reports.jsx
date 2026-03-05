import React, { useState } from 'react';
import { earningsData, servicePopularity, weeklyData } from '../data/mockData';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const fmt = n => '₹' + n.toLocaleString('en-IN');

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'var(--navy-light)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
                <div style={{ color: '#64748B', marginBottom: 6 }}>{label}</div>
                {payload.map((p, i) => (
                    <div key={i} style={{ color: p.color || '#F5C518', fontWeight: 600 }}>
                        {p.name}: {typeof p.value === 'number' && p.value > 1000 ? fmt(p.value) : p.value}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const reportTypes = [
    { key: 'revenue', label: 'Daily Revenue' },
    { key: 'monthly', label: 'Monthly Revenue' },
    { key: 'services', label: 'Service Performance' },
    { key: 'workers', label: 'Worker Performance' },
    { key: 'peak', label: 'Peak Hours' },
];

const peakHoursData = [
    { hour: '6AM', orders: 8 },
    { hour: '7AM', orders: 18 },
    { hour: '8AM', orders: 32 },
    { hour: '9AM', orders: 48 },
    { hour: '10AM', orders: 56 },
    { hour: '11AM', orders: 44 },
    { hour: '12PM', orders: 31 },
    { hour: '1PM', orders: 22 },
    { hour: '2PM', orders: 19 },
    { hour: '3PM', orders: 28 },
    { hour: '4PM', orders: 39 },
    { hour: '5PM', orders: 52 },
    { hour: '6PM', orders: 45 },
    { hour: '7PM', orders: 30 },
    { hour: '8PM', orders: 14 },
    { hour: '9PM', orders: 5 },
];

const workerPerfData = [
    { name: 'Ramesh S.', orders: 538, rating: 4.9, revenue: 189000 },
    { name: 'Suresh K.', orders: 480, rating: 4.8, revenue: 170500 },
    { name: 'Mohan D.', orders: 420, rating: 4.9, revenue: 156000 },
    { name: 'Vijay P.', orders: 380, rating: 4.7, revenue: 143500 },
    { name: 'Praveen K.', orders: 340, rating: 4.8, revenue: 128000 },
    { name: 'Ganesh R.', orders: 265, rating: 4.6, revenue: 99000 },
    { name: 'Ravi S.', orders: 220, rating: 4.5, revenue: 83500 },
];

export default function Reports() {
    const [activeReport, setActiveReport] = useState('monthly');

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {reportTypes.map(r => (
                        <button key={r.key} className={`btn btn-sm ${activeReport === r.key ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveReport(r.key)}>
                            {r.label}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export CSV
                    </button>
                    <button className="btn btn-ghost btn-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        Export PDF
                    </button>
                </div>
            </div>

            {activeReport === 'monthly' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="card shadow-sm" >
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Monthly Revenue Report</div>
                        <div style={{ fontSize: 12, color: '#64748B', marginBottom: 20 }}>Last 6 months</div>
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={earningsData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
                                <defs>
                                    <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F5C518" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="comG" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(15, 23, 42,0.04)" vertical={false} />
                                <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v / 1000) + 'K'} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: 12, color: '#64748B', paddingTop: 12 }} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#F5C518" strokeWidth={2.5} fill="url(#revG)" />
                                <Area type="monotone" dataKey="commission" name="Commission" stroke="#10B981" strokeWidth={2.5} fill="url(#comG)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Monthly table */}
                    <div className="card shadow-sm"  style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', fontWeight: 700, fontSize: 15, borderBottom: '1px solid var(--border)' }}>Monthly Breakdown</div>
                        <table className="data-table">
                            <thead>
                                <tr><th>Month</th><th>Revenue</th><th>Commission</th><th>Payouts</th><th>Refunds</th><th>Net Profit</th></tr>
                            </thead>
                            <tbody>
                                {earningsData.map((r, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{r.month} 2026</td>
                                        <td style={{ color: '#F5C518', fontWeight: 600 }}>₹{r.revenue.toLocaleString()}</td>
                                        <td style={{ color: '#10B981' }}>₹{r.commission.toLocaleString()}</td>
                                        <td style={{ color: '#3B82F6' }}>₹{r.payouts.toLocaleString()}</td>
                                        <td style={{ color: '#EF4444' }}>-₹{r.refunds.toLocaleString()}</td>
                                        <td style={{ fontWeight: 700 }}>₹{(r.commission - r.refunds).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeReport === 'revenue' && (
                <div className="card shadow-sm" >
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Daily Revenue (This Week)</div>
                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 20 }}>Orders and earned revenue per day</div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
                            <CartesianGrid stroke="rgba(15, 23, 42,0.04)" vertical={false} />
                            <XAxis dataKey="day" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v / 1000) + 'K'} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 12, color: '#64748B', paddingTop: 12 }} />
                            <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="#F5C518" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {activeReport === 'services' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>
                    <div className="card shadow-sm" >
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Service Performance Report</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {servicePopularity.map((s, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                                        <span style={{ fontWeight: 500 }}>{s.name}</span>
                                        <span style={{ fontWeight: 700, color: s.color }}>{s.value}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${s.value}%`, background: s.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card shadow-sm" >
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Booking Distribution</div>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={servicePopularity} dataKey="value" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                                    {servicePopularity.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: 'var(--navy-light)', border: '1px solid var(--border)', fontSize: 11 }} />
                                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {activeReport === 'workers' && (
                <div className="card shadow-sm"  style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '18px 20px 12px', fontWeight: 700, fontSize: 16, borderBottom: '1px solid var(--border)' }}>Worker Performance Report</div>
                    <table className="data-table">
                        <thead>
                            <tr><th>Rank</th><th>Worker</th><th>Total Orders</th><th>Rating</th><th>Revenue Generated</th><th>Performance</th></tr>
                        </thead>
                        <tbody>
                            {workerPerfData.map((w, i) => (
                                <tr key={i}>
                                    <td>
                                        <span style={{ fontWeight: 800, fontSize: 16, color: i === 0 ? '#F5C518' : i === 1 ? '#94A3B8' : i === 2 ? '#CD7F32' : 'var(--text-secondary)' }}>
                                            #{i + 1}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{w.name}</td>
                                    <td style={{ fontWeight: 600 }}>{w.orders}</td>
                                    <td style={{ color: '#F5C518', fontWeight: 600 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            {w.rating} <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                        </div>
                                    </td>
                                    <td style={{ color: '#10B981', fontWeight: 600 }}>₹{w.revenue.toLocaleString()}</td>
                                    <td>
                                        <div className="progress-bar" style={{ width: 100 }}>
                                            <div className="progress-fill" style={{ width: `${(w.orders / 538) * 100}%` }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeReport === 'peak' && (
                <div className="card shadow-sm" >
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Peak Booking Hours</div>
                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 20 }}>Average orders per hour across all days</div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={peakHoursData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                            <CartesianGrid stroke="rgba(15, 23, 42,0.04)" vertical={false} />
                            <XAxis dataKey="hour" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="orders" name="Orders" fill="#F5C518" radius={[4, 4, 0, 0]} opacity={0.85} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
