import React, { useState, useEffect } from 'react';
import { bookings, customers } from '../data/mockData';

function HistoryDetailModal({ booking, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 650 }}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17, color: '#0F172A' }}>Booking Details</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: 6 }}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Booking ID + Status header row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, marginBottom: 4 }}>BOOKING ID</div>
                            <div style={{ fontSize: 16, fontWeight: 800, color: '#002366', fontFamily: 'monospace' }}>{booking.id}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, marginBottom: 4 }}>STATUS</div>
                            <span className={`badge badge-${booking.status}`}>{booking.status.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Service Info + Photos */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, marginBottom: 12 }}>SERVICE INFORMATION</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div>
                                    <div style={{ fontSize: 12, color: '#64748B' }}>Service Name</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{booking.service}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, color: '#64748B' }}>Date &amp; Time</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>{booking.date} · {booking.time}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, color: '#64748B' }}>Worker Assigned</div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#002366' }}>{booking.worker || '—'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, color: '#64748B' }}>Amount</div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#002366' }}>₹{booking.amount?.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, marginBottom: 12 }}>SERVICE PHOTOS</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=200&q=80"
                                        alt="Before"
                                        style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8 }}
                                    />
                                    <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginTop: 4 }}>BEFORE</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=200&q=80"
                                        alt="After"
                                        style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 8 }}
                                    />
                                    <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginTop: 4 }}>AFTER</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Feedback + Employee Remarks */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, fontWeight: 700 }}>CUSTOMER FEEDBACK</div>
                            <div style={{ color: '#F5C518', marginBottom: 6, fontSize: 15 }}>{'★'.repeat(booking.rating || 4)}{'☆'.repeat(5 - (booking.rating || 4))}</div>
                            <div style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.6, fontStyle: 'italic' }}>
                                "Service was great, stains on the interior were removed perfectly."
                            </div>
                        </div>
                        <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, fontWeight: 700 }}>EMPLOYEE REMARKS</div>
                            <div style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.6, fontStyle: 'italic' }}>
                                "Vehicle was extremely dusty, required an extra round of vacuuming. Customer was happy with the result."
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
}

export default function BookingHistory({ customerId }) {
    const [data, setData] = useState(bookings);
    const [selectedCustomer, setSelectedCustomer] = useState(customerId || 'all');
    const [detailModal, setDetailModal] = useState(null);

    const filtered = data.filter(b => {
        if (b.status !== 'completed' && b.status !== 'cancelled') return false;
        if (selectedCustomer === 'all') return true;
        // Search for customer name in customers mock data to match against booking.customer
        const customer = customers.find(c => c.id === selectedCustomer);
        return b.customer === customer?.name;
    });

    return (
        <>
            <div className="animate-fade">
                {/* Header / Filter Row */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            </span>
                            <select
                                className="select"
                                style={{ width: 280, paddingLeft: 34 }}
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                            >
                                <option value="all">All Customers History</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-ghost btn-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Export History
                        </button>
                    </div>
                </div>

                <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Service</th>
                                <th>Completed By</th>
                                <th>Date & Time</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(b => (
                                <tr key={b.id}>
                                    <td><span style={{ fontFamily: 'monospace', color: '#002366', fontWeight: 700 }}>{b.id}</span></td>
                                    <td
                                        style={{ fontWeight: 600, color: '#002366', cursor: 'pointer', textDecoration: 'underline' }}
                                        onClick={() => setDetailModal(b)}
                                    >
                                        {b.customer}
                                    </td>
                                    <td style={{ fontSize: 13 }}>{b.vehicle} · {b.vehicleNo}</td>
                                    <td style={{ fontSize: 13 }}>{b.service}</td>
                                    <td style={{ fontSize: 13, fontWeight: 500, color: '#0F172A' }}>{b.worker || '—'}</td>
                                    <td style={{ fontSize: 13 }}>{b.date} · {b.time}</td>
                                    <td style={{ fontWeight: 700, color: '#002366' }}>₹{b.amount.toLocaleString()}</td>
                                    <td>
                                        <span className={`badge badge-${b.status}`}>
                                            {b.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div style={{ padding: 60, textAlign: 'center', color: '#94A3B8' }}>
                            <div style={{ marginBottom: 12, opacity: 0.5 }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                            </div>
                            <div style={{ fontWeight: 600, fontSize: 16, color: '#475569' }}>No History Records Found</div>
                            <p style={{ fontSize: 13, marginTop: 4 }}>Try selecting a different customer or clear filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {detailModal && (
                <HistoryDetailModal booking={detailModal} onClose={() => setDetailModal(null)} />
            )}
        </>
    );
}
