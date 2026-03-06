import React, { useState } from 'react';
import { customers, bookings } from '../data/mockData';

export default function Customers({ onNavigate }) {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [showNote, setShowNote] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    const customerBookings = selected
        ? bookings.filter(b => b.customer === selected.name)
        : [];

    return (
        <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 16 }}>
            {/* List */}
            <div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
                    <input className="input" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
                    <button className="btn btn-ghost btn-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export
                    </button>
                </div>

                <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Contact</th>
                                    <th>Location</th>
                                    <th>Bookings</th>
                                    <th>Total Spend</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(c => (
                                    <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{
                                                    width: 34, height: 34, borderRadius: '50%',
                                                    background: `hsl(${c.id.replace('CU', '') * 60},60%,40%)`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                                                }}>
                                                    {c.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                                                    <div style={{ fontSize: 11, color: '#64748B' }}>{c.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: 12 }}>{c.phone}</div>
                                            <div style={{ fontSize: 11, color: '#64748B' }}>{c.email}</div>
                                        </td>
                                        <td style={{ fontSize: 12 }}>{c.location}</td>
                                        <td style={{ fontWeight: 600, textAlign: 'center' }}>{c.totalBookings}</td>
                                        <td style={{ color: '#F5C518', fontWeight: 700 }}>₹{c.totalSpend.toLocaleString()}</td>
                                        <td style={{ color: '#10B981', fontWeight: 600 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                {c.avgRating} <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${c.status === 'active' ? 'badge-completed' : 'badge-cancelled'}`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="btn btn-ghost btn-sm" style={{ padding: '5px 8px' }}>View</button>
                                                {c.status === 'active'
                                                    ? <button className="btn btn-danger btn-sm">Block</button>
                                                    : <button className="btn btn-success btn-sm">Unblock</button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Panel */}
            {selected && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="card shadow-sm" >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>Customer Profile</div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
                        </div>
                        <div style={{ fontSize: 13 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: '50%',
                                    background: `hsl(${selected.id.replace('CU', '') * 60},60%,40%)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 20, fontWeight: 700, color: '#fff',
                                }}>
                                    {selected.name.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selected.name}</div>
                                    <div style={{ color: '#64748B', fontSize: 12 }}>{selected.id} · Member since {selected.joinDate}</div>
                                    <span className={`badge ${selected.status === 'active' ? 'badge-completed' : 'badge-cancelled'}`} style={{ marginTop: 4 }}>
                                        {selected.status}
                                    </span>
                                </div>
                            </div>
                            {[
                                ['Phone', selected.phone],
                                ['Email', selected.email],
                                ['Location', selected.location],
                                ['Vehicles', selected.vehicles.join(', ')],
                            ].map(([k, v]) => (
                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ color: '#64748B' }}>{k}</span>
                                    <span style={{ fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
                            <div style={{ background: 'rgba(245,197,24,0.08)', borderRadius: 10, padding: 10, textAlign: 'center' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#F5C518' }}>{selected.totalBookings}</div>
                                <div style={{ fontSize: 10, color: '#64748B' }}>Bookings</div>
                            </div>
                            <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: 10, padding: 10, textAlign: 'center' }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#10B981' }}>₹{(selected.totalSpend / 1000).toFixed(1)}K</div>
                                <div style={{ fontSize: 10, color: '#64748B' }}>Spent</div>
                            </div>
                            <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: 10, padding: 10, textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 18, fontWeight: 800, color: '#3B82F6' }}>
                                    {selected.avgRating} <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                                <div style={{ fontSize: 10, color: '#64748B' }}>Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Support note */}
                    <div className="card shadow-sm" >
                        <div style={{ fontWeight: 600, marginBottom: 10 }}>Support Notes</div>
                        <textarea
                            className="input"
                            rows={3}
                            defaultValue={selected.notes}
                            placeholder="Add support notes here..."
                            style={{ resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}>
                            <button className="btn btn-ghost btn-sm">Send Notification</button>
                            <button className="btn btn-primary btn-sm">Save Note</button>
                        </div>
                    </div>

                    {/* Booking History */}
                    <div className="card shadow-sm" >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{ fontWeight: 600 }}>Recent Bookings</div>
                            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate && onNavigate('booking-history', selected.id)}>
                                View All History
                            </button>
                        </div>
                        {customerBookings.length > 0
                            ? customerBookings.map(b => (
                                <div
                                    key={b.id}
                                    onClick={() => setSelectedBooking(b)}
                                    style={{
                                        display: 'grid', gridTemplateColumns: '1fr auto', gap: 8,
                                        borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.2s',
                                        padding: '10px 8px', borderRadius: 6
                                    }}
                                    className="hover-bg"
                                >
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{b.service}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{b.date} · {b.time}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: '#002366', fontWeight: 700 }}>₹{b.amount.toLocaleString()}</div>
                                        <span className={`badge ${b.status === 'completed' ? 'badge-completed' : b.status === 'cancelled' ? 'badge-cancelled' : 'badge-assigned'}`} style={{ fontSize: 10 }}>
                                            {b.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                            : <div style={{ color: '#64748B', fontSize: 13, textAlign: 'center', padding: 20 }}>No bookings found</div>
                        }
                    </div>
                </div>
            )}
            {selectedBooking && <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}
        </div>
    );
}

function BookingDetailModal({ booking, onClose }) {
    if (!booking) return null;
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
