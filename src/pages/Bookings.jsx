import React, { useState } from 'react';
import { bookings, workers } from '../data/mockData';

const statusColor = {
    pending: 'badge-pending',
    assigned: 'badge-assigned',
    inprogress: 'badge-inprogress',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
};
const statusLabels = { pending: 'Pending', assigned: 'Assigned', inprogress: 'In Progress', completed: 'Completed', cancelled: 'Cancelled' };

function BookingModal({ booking, onClose, onUpdate }) {
    const [status, setStatus] = useState(booking.status);
    const [worker, setWorker] = useState(booking.worker || '');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 17 }}>Booking Details</div>
                        <div style={{ fontSize: 12, color: '#F5C518', fontFamily: 'monospace', marginTop: 2 }}>{booking.id}</div>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: '6px' }}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>CUSTOMER</div>
                            <div style={{ fontWeight: 600 }}>{booking.customer}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>{booking.customerPhone}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>VEHICLE</div>
                            <div style={{ fontWeight: 600 }}>{booking.vehicle}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>{booking.vehicleNo}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>SERVICE</div>
                            <div style={{ fontWeight: 600 }}>{booking.service}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>AMOUNT</div>
                            <div style={{ fontWeight: 700, color: '#F5C518', fontSize: 18 }}>₹{booking.amount.toLocaleString()}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>DATE & TIME</div>
                            <div style={{ fontWeight: 600 }}>{booking.date} · {booking.time}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>LOCATION</div>
                            <div style={{ fontWeight: 600 }}>{booking.location}</div>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>UPDATE STATUS</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <button
                                className={`btn btn-sm ${status === 'cancelled' ? 'btn-danger' : 'btn-ghost'}`}
                                style={{ fontSize: 11, padding: '6px 10px', ...(status === 'cancelled' ? {} : { border: '1px solid var(--border)' }) }}
                                onClick={() => setStatus(status === 'cancelled' ? booking.status : 'cancelled')}
                            >
                                {status === 'cancelled' ? 'Will Cancel' : 'Cancel Booking'}
                            </button>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>ASSIGN / REASSIGN WORKER</div>
                        <select className="select" value={worker} onChange={e => setWorker(e.target.value)}>
                            <option value="">— Select Worker —</option>
                            {workers.filter(w => w.status !== 'leave').map(w => (
                                <option key={w.id} value={w.name}>{w.name} ({w.status}) — {w.zone}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => {
                        const workerObj = workers.find(w => w.name === worker);
                        onUpdate({
                            ...booking,
                            status,
                            worker: worker || null,
                            workerId: workerObj ? workerObj.id : null
                        });
                        onClose();
                    }}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Bookings() {
    const [data, setData] = useState(bookings);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const filtered = data.filter(b => {
        const matchStatus = filter === 'all' || b.status === filter;
        const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase()) ||
            b.service.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
    });

    const handleUpdate = (updated) => {
        setData(data.map(b => b.id === updated.id ? updated : b));
    };

    const counts = {
        all: data.length,
        pending: data.filter(b => b.status === 'pending').length,
        assigned: data.filter(b => b.status === 'assigned').length,
        inprogress: data.filter(b => b.status === 'inprogress').length,
        completed: data.filter(b => b.status === 'completed').length,
        cancelled: data.filter(b => b.status === 'cancelled').length,
    };

    return (
        <div className="animate-fade">
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                {Object.entries({ all: 'All', ...statusLabels }).map(([k, v]) => (
                    <button
                        key={k}
                        className={`btn btn-sm ${filter === k ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilter(k)}
                    >
                        {v} <span style={{ opacity: 0.7, fontWeight: 400 }}>({counts[k] || 0})</span>
                    </button>
                ))}
                <div style={{ flex: 1 }} />
                <input
                    className="input"
                    style={{ width: 220 }}
                    placeholder="Search order, customer..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-primary btn-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    New Booking
                </button>
            </div>

            {/* Table */}
            <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Service</th>
                                <th>Worker</th>
                                <th>Date & Time</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(b => (
                                <tr key={b.id}>
                                    <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#F5C518' }}>{b.id}</span></td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{b.customer}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{b.customerPhone}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: 13 }}>{b.vehicle.split('(')[0].trim()}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{b.vehicleNo}</div>
                                    </td>
                                    <td style={{ fontSize: 12, maxWidth: 140 }}>{b.service}</td>
                                    <td>
                                        {b.worker
                                            ? <div>
                                                <div style={{ fontSize: 13 }}>{b.worker}</div>
                                                <div style={{ fontSize: 11, color: '#64748B' }}>{b.workerId}</div>
                                            </div>
                                            : <span style={{ fontSize: 12, color: '#64748B' }}>Unassigned</span>
                                        }
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 500, fontSize: 12 }}>{b.date}</div>
                                        <div style={{ fontSize: 11, color: '#64748B' }}>{b.time}</div>
                                    </td>
                                    <td style={{ fontWeight: 700, color: '#F5C518' }}>₹{b.amount.toLocaleString()}</td>
                                    <td><span className={`badge ${statusColor[b.status]}`}>{statusLabels[b.status]}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm" style={{ padding: '5px 8px' }} onClick={() => setSelected(b)} title="View Detail">
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                            </button>
                                            {b.status !== 'cancelled' && b.status !== 'completed' && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    style={{ padding: '5px 8px' }}
                                                    title="Cancel Booking"
                                                    onClick={() => handleUpdate({ ...b, status: 'cancelled' })}
                                                >
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: '#64748B' }}>No bookings found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF' }}>
                    <div style={{ fontSize: 13, color: '#64748B' }}>
                        Showing <span style={{ fontWeight: 600, color: '#0F172A' }}>1</span> to <span style={{ fontWeight: 600, color: '#0F172A' }}>{filtered.length}</span> of <span style={{ fontWeight: 600, color: '#0F172A' }}>{filtered.length}</span> results
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost btn-sm" disabled style={{ opacity: 0.5 }}>Previous</button>
                        <button className="btn btn-primary btn-sm" style={{ width: 32, padding: 0 }}>1</button>
                        <button className="btn btn-ghost btn-sm" style={{ width: 32, padding: 0 }}>2</button>
                        <button className="btn btn-ghost btn-sm" style={{ width: 32, padding: 0 }}>3</button>
                        <button className="btn btn-ghost btn-sm">Next</button>
                    </div>
                </div>
            </div>

            {selected && (
                <BookingModal booking={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />
            )}
        </div>
    );
}
