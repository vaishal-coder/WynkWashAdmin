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
                    ].map(f => (
                        <div key={f.key}>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                            <input className="input" value={form[f.key]} placeholder={f.placeholder}
                                onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                        </div>
                    ))}
                    <div>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>ASSIGNED HUB</div>
                        <select className="select" value={form.zone} onChange={e => setForm({ ...form, zone: e.target.value })}>
                            {['North Bangalore', 'South Bangalore', 'East Bangalore', 'West Bangalore', 'Central Bangalore'].map(z => (
                                <option key={z}>{z}</option>
                            ))}
                        </select>
                    </div>
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

/* ── Worker Detail Modal ─────────────────────────── */
function WorkerDetailModal({ worker, onClose }) {
    if (!worker) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>Worker Profile</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 12, background: accentOf(worker.id),
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 24, fontWeight: 800, color: '#fff'
                        }}>
                            {worker.name.charAt(0)}
                        </div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800 }}>{worker.name}</div>
                            <div style={{ fontSize: 13, color: '#64748B' }}>{worker.id} · Joining Date: {worker.joinDate}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { label: 'Primary Hub', value: worker.zone },
                            { label: 'Status', value: STATUS_META[worker.status].label },
                            { label: 'Total Earnings', value: `₹${worker.totalEarnings.toLocaleString()}` },
                            { label: 'Completed Orders', value: worker.completed },
                            { label: 'Contact', value: worker.phone },
                            { label: 'Email', value: worker.email },
                            { label: 'Rating', value: `${worker.rating} ★` },
                        ].map(f => (
                            <div key={f.label}>
                                <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>{f.label.toUpperCase()}</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{f.value}</div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>CORE SKILLS</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {(worker.skills || []).map(s => (
                                <span key={s} className="badge badge-yellow" style={{ fontSize: 11 }}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" onClick={onClose}>Close Profile</button>
                </div>
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
    const [suspendModal, setSuspend] = useState(null);
    const [detailView, setDetailView] = useState(null);

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
                                <th>Worker</th><th>Contact</th><th>Hub</th><th>Status</th>
                                <th>Orders</th><th>Rating</th><th>Total Earnings</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(w => (
                                <tr key={w.id} style={{ cursor: 'pointer' }} onClick={() => setDetailView(w)}>
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
                                    <td onClick={e => e.stopPropagation()}>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { setIsNew(false); setEditModal(w); }}>Edit</button>
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
            {suspendModal && <SuspendConfirm worker={suspendModal} onClose={() => setSuspend(null)} onConfirm={handleSuspend} />}
            {detailView && <WorkerDetailModal worker={detailView} onClose={() => setDetailView(null)} />}
        </div>
    );
}
