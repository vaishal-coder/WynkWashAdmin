import React, { useState } from 'react';
import { earningsData, workerPayouts } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'var(--navy-light)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: 12 }}>
                <div style={{ color: '#64748B', marginBottom: 6 }}>{label}</div>
                {payload.map((p, i) => (
                    <div key={i} style={{ color: p.color, fontWeight: 600 }}>
                        {p.name}: {fmt(p.value)}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function Earnings() {
    const latest = earningsData[earningsData.length - 1];

    const summary = [
        { label: 'Total Revenue', value: fmt(latest.revenue), color: '#F5C518', change: '+5%' },
        { label: 'Commission Earned (20%)', value: fmt(latest.commission), color: '#10B981', change: '+5%' },
        { label: 'Worker Payouts', value: fmt(latest.payouts), color: '#3B82F6', change: '+5%' },
        { label: 'Refunds Issued', value: fmt(latest.refunds), color: '#EF4444', change: '-33%' },
        { label: 'Pending Payouts', value: fmt(workerPayouts.filter(w => w.status === 'pending').reduce((a, w) => a + w.payout, 0)), color: '#F59E0B', change: '' },
    ];

    return (
        <div className="animate-fade">
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
                {summary.map((s, i) => (
                    <div key={i} className="stat-card">
                        <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>{s.label}</div>
                        {s.change && <div style={{ fontSize: 11, color: s.change.startsWith('+') ? '#10B981' : '#EF4444', fontWeight: 600 }}>{s.change} vs last month</div>}
                    </div>
                ))}
            </div>

            {/* Earnings bar chart */}
            <div className="card shadow-sm"  style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>Earnings Breakdown</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>Revenue, Commission & Payouts</div>
                    </div>
                    <button className="btn btn-ghost btn-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export CSV
                    </button>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={earningsData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }} barGap={4}>
                        <CartesianGrid stroke="rgba(15, 23, 42,0.04)" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v / 1000) + 'K'} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 12, color: '#64748B', paddingTop: 16 }} />
                        <Bar dataKey="revenue" name="Revenue" fill="#F5C518" radius={[4, 4, 0, 0]} opacity={0.9} />
                        <Bar dataKey="commission" name="Commission" fill="#10B981" radius={[4, 4, 0, 0]} opacity={0.9} />
                        <Bar dataKey="payouts" name="Payouts" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.9} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Worker payouts */}
            <div className="card shadow-sm"  style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>Worker Payout Management</div>
                    <button className="btn btn-primary btn-sm">Approve All Pending</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Worker</th>
                                <th>Worker ID</th>
                                <th>Total Earned</th>
                                <th>Commission (20%)</th>
                                <th>Net Payout</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workerPayouts.map((w, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600 }}>{w.worker}</td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#F5C518' }}>{w.id}</td>
                                    <td style={{ fontWeight: 600 }}>₹{w.earned.toLocaleString()}</td>
                                    <td style={{ color: '#EF4444' }}>-₹{(w.earned - w.payout).toLocaleString()}</td>
                                    <td style={{ fontWeight: 700, color: '#10B981' }}>₹{w.payout.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge ${w.status === 'paid' ? 'badge-completed' : 'badge-pending'}`}>
                                            {w.status === 'paid' ? (
                                                <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                    Paid
                                                </span>
                                            ) : (
                                                <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-8.31l5.67-5.67" /></svg>
                                                    Pending
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            {w.status === 'pending' && <button className="btn btn-success btn-sm">Approve</button>}
                                            <button className="btn btn-ghost btn-sm">Details</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
