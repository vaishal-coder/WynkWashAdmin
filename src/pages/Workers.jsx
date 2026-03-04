import React, { useState } from 'react';
import { workers } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const statusBadge = { available: 'badge-available', busy: 'badge-busy', leave: 'badge-leave' };

function WorkerModal({ worker, onClose, isNew }) {
    const [form, setForm] = useState(worker || { name: '', phone: '', email: '', zone: '', status: 'available', skills: [] });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{isNew ? 'Add New Worker' : 'Edit Worker'}</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[
                        { label: 'Full Name', key: 'name', placeholder: 'Suresh Kumar' },
                        { label: 'Phone', key: 'phone', placeholder: '9876543210' },
                        { label: 'Email', key: 'email', placeholder: 'worker@wynkwash.com' },
                        { label: 'Zone', key: 'zone', placeholder: 'Koramangala' },
                    ].map(f => (
                        <div key={f.key}>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                            <input className="input" value={form[f.key]} placeholder={f.placeholder}
                                onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                        </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>STATUS</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {['available', 'busy', 'leave'].map(s => (
                                <button key={s} className={`btn btn-sm ${form.status === s ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setForm({ ...form, status: s })}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary">Save Worker</button>
                </div>
            </div>
        </div>
    );
}

function WorkerCard({ w, onEdit }) {
    const initials = w.name.split(' ').map(n => n[0]).join('').slice(0, 2);
    const colors = ['#F5C518', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4'];
    const col = colors[parseInt(w.id.replace('WK', '')) % colors.length];

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px', position: 'relative', overflow: 'hidden', border: `1px solid ${col}20`, borderLeft: `3px solid ${col}` }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at right top, ${col}15, transparent 70%)`, pointerEvents: 'none' }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div className="avatar" style={{
                    background: `linear-gradient(135deg, ${col}40, ${col}10)`,
                    color: col, width: 56, height: 56, fontSize: 18, fontWeight: 800, borderRadius: 16,
                    border: `1px solid ${col}30`,
                    boxShadow: `inset 0 1px 2px rgba(255,255,255,0.2), 0 8px 16px -4px ${col}30`
                }}>
                    {initials}
                </div>
                <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#FFF', letterSpacing: '-0.01em' }}>{w.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, fontWeight: 500 }}>{w.id} · {w.phone}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {w.zone}
                    </div>
                </div>
                <span className={`badge ${statusBadge[w.status]}`} style={{ zIndex: 1, padding: '6px 12px' }}>{w.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, zIndex: 1 }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 12, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#F5C518' }}>{w.completed}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Orders</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 12, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 20, fontWeight: 800, color: '#10B981' }}>
                        {w.rating}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Rating</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 12, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px' }}>₹{(w.totalEarnings / 1000).toFixed(0)}K</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>Earned</div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', zIndex: 1 }}>
                {w.skills.map((s, i) => <span key={i} className="badge" style={{ fontSize: 10, background: 'rgba(245,197,24,0.1)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.2)', padding: '4px 10px' }}>{s}</span>)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16, zIndex: 1 }}>
                <button className="btn btn-ghost" onClick={() => onEdit(w)} style={{ padding: '8px' }}>Edit</button>
                <button className="btn btn-ghost" style={{ padding: '8px', color: '#10B981', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.1)' }}>Assign</button>
                <button className="btn btn-ghost" style={{ padding: '8px', color: '#EF4444', background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.1)' }}>Suspend</button>
            </div>
        </div>
    );
}

export default function Workers() {
    const [view, setView] = useState('grid');
    const [filterStatus, setFilterStatus] = useState('all');
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const filtered = workers.filter(w => {
        const ms = filterStatus === 'all' || w.status === filterStatus;
        const mq = w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase());
        return ms && mq;
    });

    return (
        <div className="animate-fade">
            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                {['all', 'available', 'busy', 'leave'].map(s => (
                    <button key={s} className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilterStatus(s)}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}&nbsp;
                        <span style={{ opacity: 0.7 }}>({workers.filter(w => s === 'all' || w.status === s).length})</span>
                    </button>
                ))}
                <div style={{ flex: 1 }} />
                <input className="input" style={{ width: 200 }} placeholder="Search worker..." value={search} onChange={e => setSearch(e.target.value)} />
                <button className={`btn btn-sm ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('grid')}>Grid</button>
                <button className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setView('table')}>Table</button>
                <button className="btn btn-primary btn-sm" onClick={() => { setIsNew(true); setModal({}); }}>
                    + Add Worker
                </button>
            </div>

            {view === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                    {filtered.map(w => <WorkerCard key={w.id} w={w} onEdit={(w) => { setIsNew(false); setModal(w); }} />)}
                </div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Worker</th>
                                    <th>Contact</th>
                                    <th>Zone</th>
                                    <th>Status</th>
                                    <th>Orders</th>
                                    <th>Rating</th>
                                    <th>Total Earnings</th>
                                    <th>Pending</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(w => (
                                    <tr key={w.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{w.name}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{w.id}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: 12 }}>{w.phone}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{w.email}</div>
                                        </td>
                                        <td style={{ fontSize: 12 }}>{w.zone}</td>
                                        <td><span className={`badge ${statusBadge[w.status]}`}>{w.status}</span></td>
                                        <td style={{ fontWeight: 600 }}>{w.completed}</td>
                                        <td style={{ color: '#F5C518', fontWeight: 600 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                {w.rating} <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                            </div>
                                        </td>
                                        <td style={{ color: '#10B981', fontWeight: 600 }}>₹{w.totalEarnings.toLocaleString()}</td>
                                        <td style={{ color: w.pendingAmount > 0 ? '#F59E0B' : 'var(--text-secondary)' }}>₹{w.pendingAmount.toLocaleString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="btn btn-ghost btn-sm" onClick={() => { setIsNew(false); setModal(w); }}>Edit</button>
                                                <button className="btn btn-danger btn-sm">Suspend</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {modal !== null && (
                <WorkerModal worker={modal} onClose={() => setModal(null)} isNew={isNew} />
            )}
        </div>
    );
}
