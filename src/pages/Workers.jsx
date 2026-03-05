import React, { useState } from 'react';
import { workers } from '../data/mockData';

const STATUS_META = {
    available: { cls: 'badge-available', dot: '#10B981', label: 'Available' },
    busy: { cls: 'badge-busy', dot: '#EF4444', label: 'Busy' },
    leave: { cls: 'badge-leave', dot: '#F59E0B', label: 'On Leave' },
};

const ACCENT = ['#F5C518', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4'];
const accentOf = (id) => ACCENT[parseInt(id.replace('WK', '')) % ACCENT.length];

/* ── Modal ─────────────────────────────────────────── */
function WorkerModal({ worker, onClose, isNew }) {
    const [form, setForm] = useState(
        worker?.id ? { ...worker } : { name: '', phone: '', email: '', zone: '', status: 'available', skills: [] }
    );
    const [skillInput, setSkillInput] = useState('');

    const addSkill = () => {
        if (skillInput.trim()) { setForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] })); setSkillInput(''); }
    };

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
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                            <input className="input" value={form[f.key]} placeholder={f.placeholder}
                                onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                        </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>STATUS</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {['available', 'busy', 'leave'].map(s => (
                                <button key={s} className={`btn btn-sm ${form.status === s ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setForm({ ...form, status: s })}>
                                    {STATUS_META[s].label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>SKILLS</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                            {(form.skills || []).map((s, i) => (
                                <span key={i} className="badge badge-yellow" style={{ cursor: 'pointer', fontSize: 11 }}
                                    onClick={() => setForm(f => ({ ...f, skills: f.skills.filter((_, j) => j !== i) }))}>
                                    {s} ✕
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input className="input" placeholder="Add skill..." value={skillInput}
                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') addSkill(); }} />
                            <button className="btn btn-ghost btn-sm" onClick={addSkill}>Add</button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={onClose}>Save Worker</button>
                </div>
            </div>
        </div>
    );
}

/* ── Assign Modal ───────────────────────────────────── */
function AssignModal({ worker, onClose }) {
    const [zone, setZone] = useState(worker.zone);
    const zones = ['North Bangalore', 'South Bangalore', 'East Bangalore', 'West Bangalore', 'Central Bangalore', 'Whitefield'];
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 440 }}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>Assign Booking — {worker.name}</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>REASSIGN ZONE</div>
                        <select className="select" value={zone} onChange={e => setZone(e.target.value)}>
                            {zones.map(z => <option key={z}>{z}</option>)}
                        </select>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>AVAILABLE BOOKINGS (UNASSIGNED)</div>
                        {['BK005 — Honda Activa · JP Nagar · 12:00 PM', 'BK009 — Maruti Swift · Hebbal · 2:00 PM'].map((b, i) => (
                            <label key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                                borderBottom: '1px solid var(--border)', cursor: 'pointer', fontSize: 13
                            }}>
                                <input type="checkbox" style={{ accentColor: '#F5C518' }} />
                                {b}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={onClose}>Confirm Assignment</button>
                </div>
            </div>
        </div>
    );
}

/* ── Worker Card ────────────────────────────────────── */
function WorkerCard({ w, onEdit, onAssign, onSuspend }) {
    const initials = w.name.split(' ').map(n => n[0]).join('').slice(0, 2);
    const col = accentOf(w.id);
    const meta = STATUS_META[w.status];

    return (
        <div
            className="card"
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Top accent */}
            <div style={{
                position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                background: `linear-gradient(90deg,transparent,${col},transparent)`, borderRadius: '0 0 4px 4px'
            }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                    width: 52, height: 52, borderRadius: 15, flexShrink: 0,
                    background: 'rgba(0,0,0,0.06)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 800, color: col, letterSpacing: '-0.02em',
                }}>{initials}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{w.name}</div>
                    <div style={{ fontSize: 11, color: '#475569', marginTop: 4, fontWeight: 500 }}>{w.id} · {w.phone}</div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {w.zone}
                    </div>
                </div>

                {/* Status pill */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 20,
                    background: `${meta.dot}14`, border: `1px solid ${meta.dot}30`,
                    fontSize: 11, fontWeight: 700, color: meta.dot, flexShrink: 0
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: meta.dot }} />
                    {meta.label}
                </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                    { val: w.completed, label: 'Orders', color: '#F5C518' },
                    { val: `${w.rating}★`, label: 'Rating', color: '#10B981' },
                    { val: `₹${(w.totalEarnings / 1000).toFixed(0)}K`, label: 'Earned', color: '#3B82F6' },
                ].map((s, i) => (
                    <div key={i} style={{
                        background: 'rgba(15, 23, 42,0.04)', border: '1px solid rgba(0,0,0,0.06)',
                        borderRadius: 12, padding: '12px 8px', textAlign: 'center'
                    }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.val}</div>
                        <div style={{
                            fontSize: 10, color: 'rgba(100,116,139,0.7)', fontWeight: 600, textTransform: 'uppercase',
                            letterSpacing: '0.06em', marginTop: 4
                        }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Skills */}
            {(w.skills || []).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {w.skills.map((s, i) => (
                        <span key={i} style={{
                            fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
                            background: 'rgba(245,197,24,0.08)', color: 'rgba(245,197,24,0.85)',
                            border: '1px solid rgba(245,197,24,0.15)', letterSpacing: '0.04em', textTransform: 'uppercase',
                        }}>{s}</span>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
                borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 16
            }}>
                <button
                    onClick={() => onEdit(w)}
                    style={{
                        background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.1)',
                        color: '#0F172A', borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}>
                    Edit
                </button>
                <button
                    onClick={() => onAssign(w)}
                    style={{
                        background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
                        color: '#34D399', borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.08)'}>
                    Assign
                </button>
                <button
                    onClick={() => onSuspend(w)}
                    style={{
                        background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                        color: '#F87171', borderRadius: 10, padding: '9px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
                    Suspend
                </button>
            </div>
        </div>
    );
}

/* ── Suspend Confirm ────────────────────────────────── */
function SuspendConfirm({ worker, onClose, onConfirm }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>Suspend Worker</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748B' }}>
                        Are you sure you want to suspend <strong style={{ color: '#0F172A' }}>{worker.name}</strong>?
                        They will not receive new bookings until reinstated.
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => { onConfirm(worker); onClose(); }}>Confirm Suspend</button>
                </div>
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────── */
export default function Workers() {
    const [data, setData] = useState(workers);
    const [filterStatus, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [editModal, setEditModal] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [assignModal, setAssign] = useState(null);
    const [suspendModal, setSuspend] = useState(null);

    const filtered = data.filter(w => {
        const ms = filterStatus === 'all' || w.status === filterStatus;
        const mq = w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase());
        return ms && mq;
    });

    const handleSuspend = (w) => setData(d => d.map(x => x.id === w.id ? { ...x, status: 'leave' } : x));

    const statusCounts = s => s === 'all' ? data.length : data.filter(w => w.status === s).length;

    return (
        <div className="animate-fade">
            {/* Controls */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                {['all', 'available', 'busy', 'leave'].map(s => (
                    <button key={s} className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilter(s)}>
                        {s === 'all' ? 'All' : STATUS_META[s]?.label}&nbsp;
                        <span style={{ opacity: 0.65 }}>({statusCounts(s)})</span>
                    </button>
                ))}
                <div style={{ flex: 1 }} />
                <input className="input" style={{ width: 200 }} placeholder="Search worker…"
                    value={search} onChange={e => setSearch(e.target.value)} />
                <button className="btn btn-primary btn-sm" onClick={() => { setIsNew(true); setEditModal({}); }}>
                    + Add Worker
                </button>
            </div>

            <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Worker</th><th>Contact</th><th>Zone</th><th>Status</th>
                                <th>Orders</th><th>Rating</th><th>Total Earnings</th><th>Pending</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(w => (
                                <tr key={w.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{
                                                width: 34, height: 34, borderRadius: 10, background: 'rgba(0,0,0,0.06)',
                                                border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 12, fontWeight: 800, color: accentOf(w.id), flexShrink: 0
                                            }}>
                                                {w.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{w.name}</div>
                                                <div style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>{w.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div style={{ fontSize: 12 }}>{w.phone}</div><div style={{ fontSize: 11, color: '#64748B' }}>{w.email}</div></td>
                                    <td style={{ fontSize: 12 }}>{w.zone}</td>
                                    <td>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                                            background: `${STATUS_META[w.status].dot}14`, color: STATUS_META[w.status].dot,
                                            border: `1px solid ${STATUS_META[w.status].dot}30`
                                        }}>
                                            {STATUS_META[w.status].label}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{w.completed}</td>
                                    <td style={{ color: '#F5C518', fontWeight: 600 }}>{w.rating}★</td>
                                    <td style={{ color: '#10B981', fontWeight: 600 }}>₹{w.totalEarnings.toLocaleString()}</td>
                                    <td style={{ color: w.pendingAmount > 0 ? '#F59E0B' : 'var(--text-secondary)' }}>₹{w.pendingAmount.toLocaleString()}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { setIsNew(false); setEditModal(w); }}>Edit</button>
                                            <button className="btn btn-success btn-sm" onClick={() => setAssign(w)}>Assign</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => setSuspend(w)}>Suspend</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editModal !== null && (
                <WorkerModal worker={editModal} onClose={() => { setEditModal(null); setIsNew(false); }} isNew={isNew} />
            )}
            {assignModal && <AssignModal worker={assignModal} onClose={() => setAssign(null)} />}
            {suspendModal && <SuspendConfirm worker={suspendModal} onClose={() => setSuspend(null)} onConfirm={handleSuspend} />}
        </div>
    );
}
