import React, { useState } from 'react';
import { zones, workers } from '../data/mockData';

/* ── Modal ─────────────────────────────────────────── */
function ZoneModal({ zone, onClose }) {
    const isNew = !zone;
    const [form, setForm] = useState(zone || { name: '', city: 'Bangalore', active: true, pricing: 'Standard', area: '' });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{isNew ? 'Add Service Zone' : 'Edit Zone'}</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    {[
                        { label: 'Zone Name', key: 'name', placeholder: 'e.g. Koramangala' },
                        { label: 'City', key: 'city', placeholder: 'e.g. Bangalore' },
                        { label: 'Area (km²)', key: 'area', placeholder: 'e.g. 12 km²' },
                    ].map(f => (
                        <div key={f.key}>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                            <input className="input" value={form[f.key]} placeholder={f.placeholder}
                                onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                        </div>
                    ))}
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>PRICING TIER</div>
                        <select className="select" value={form.pricing} onChange={e => setForm({ ...form, pricing: e.target.value })}>
                            {['Standard', 'Premium +10%', 'Premium +15%', 'Budget -5%'].map(o => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>ASSIGN WORKERS</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {workers.map(w => (
                                <label key={w.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12,
                                    background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px 14px', border: '1px solid var(--border)',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <input type="checkbox" defaultChecked={w.zone.toLowerCase().includes(form.name?.toLowerCase() || 'x')}
                                        style={{ accentColor: '#F5C518' }} />
                                    {w.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })}
                            style={{ accentColor: '#F5C518', width: 16, height: 16 }} />
                        Zone Active
                    </label>
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={onClose}>Save Zone</button>
                </div>
            </div>
        </div>
    );
}

/* ── Zone Card ─────────────────────────────────────── */
function ZoneCard({ z, onEdit, onToggle }) {
    const col = z.active ? '#10B981' : 'rgba(255,255,255,0.2)';

    return (
        <div
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '24px',
                display: 'flex', flexDirection: 'column', gap: 20,
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                opacity: z.active ? 1 : 0.6,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                background: `linear-gradient(90deg,transparent,${col},transparent)`, borderRadius: '0 0 4px 4px'
            }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: '#F0F4FF', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{z.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.75)', marginTop: 6, fontWeight: 500 }}>{z.city} · {z.area}</div>
                </div>
                <div style={{
                    fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20,
                    background: z.active ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: z.active ? '#34D399' : '#F87171',
                    border: z.active ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(248,113,113,0.25)',
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                    {z.active ? 'Active' : 'Disabled'}
                </div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>WORKERS</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#3B82F6', marginTop: 4, letterSpacing: '-0.02em' }}>{z.workers}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PRICING TIER</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#F5C518', marginTop: 8 }}>{z.pricing}</div>
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <button
                    onClick={() => onEdit(z)}
                    style={{
                        flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#F0F4FF', borderRadius: 10, padding: '10px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}>
                    Edit
                </button>
                <button
                    onClick={() => onToggle(z)}
                    style={{
                        flex: 1,
                        background: z.active ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                        border: z.active ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(16,185,129,0.2)',
                        color: z.active ? '#F87171' : '#34D399',
                        borderRadius: 10, padding: '10px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}>
                    {z.active ? 'Disable' : 'Enable'}
                </button>
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────── */
export default function Zones() {
    const [data, setData] = useState(zones);
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const handleToggle = (z) => setData(d => d.map(x => x.id === z.id ? { ...x, active: !x.active } : x));

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <button className="btn btn-primary" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Add Zone
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 30 }}>
                {data.map(z => (
                    <ZoneCard key={z.id} z={z} onEdit={(z) => { setIsNew(false); setModal(z); }} onToggle={handleToggle} />
                ))}
            </div>

            {/* Worker zone assignment table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.025)' }}>
                <div style={{ padding: '20px 24px 14px', fontWeight: 800, fontSize: 17, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>Worker Zone Assignments</div>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>Export Data</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Worker</th>
                                <th>ID</th>
                                <th>Assigned Zone</th>
                                <th>Status</th>
                                <th>Active Orders</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workers.map(w => (
                                <tr key={w.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{w.name}</div>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#F5C518' }}>{w.id}</td>
                                    <td style={{ fontSize: 13, color: 'rgba(148,163,184,0.9)' }}>{w.zone}</td>
                                    <td>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                                            background: w.status === 'available' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                                            color: w.status === 'available' ? '#34D399' : '#F87171',
                                            border: w.status === 'available' ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(248,113,113,0.2)',
                                            textTransform: 'capitalize'
                                        }}>{w.status}</span>
                                    </td>
                                    <td style={{ textAlign: 'center', fontWeight: 700, color: '#F5C518' }}>{w.status === 'busy' ? Math.floor(Math.random() * 2) + 1 : 0}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>Reassign Zone</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {(modal !== null || isNew) && (
                <ZoneModal zone={isNew ? null : modal} onClose={() => { setModal(null); setIsNew(false); }} />
            )}
        </div>
    );
}
