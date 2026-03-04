import React, { useState } from 'react';
import { zones, workers } from '../data/mockData';

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
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>ASSIGN WORKERS</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {workers.map(w => (
                                <label key={w.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 12,
                                    background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '6px 10px', border: '1px solid var(--border)'
                                }}>
                                    <input type="checkbox" defaultChecked={w.zone.toLowerCase().includes(form.name?.toLowerCase() || 'x')} />
                                    {w.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                        Zone Active
                    </label>
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary">Save Zone</button>
                </div>
            </div>
        </div>
    );
}

export default function Zones() {
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <button className="btn btn-primary" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Add Zone
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
                {zones.map(z => (
                    <div key={z.id} className="card" style={{ borderLeft: `3px solid ${z.active ? '#10B981' : 'rgba(255,255,255,0.1)'}`, opacity: z.active ? 1 : 0.6 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 16 }}>{z.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{z.city} · {z.area}</div>
                            </div>
                            <span className={`badge ${z.active ? 'badge-completed' : 'badge-cancelled'}`}>
                                {z.active ? 'Active' : 'Disabled'}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 10 }}>
                                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Workers</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#3B82F6' }}>{z.workers}</div>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 10 }}>
                                <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Pricing</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: '#F5C518', marginTop: 4 }}>{z.pricing}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => { setIsNew(false); setModal(z); }}>Edit</button>
                            <button className={`btn btn-sm ${z.active ? 'btn-danger' : 'btn-success'}`} style={{ flex: 1 }}>
                                {z.active ? 'Disable' : 'Enable'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Worker zone assignment table */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 20px 12px', fontWeight: 700, fontSize: 16, borderBottom: '1px solid var(--border)' }}>
                    Worker Zone Assignments
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
                                    <td style={{ fontWeight: 600 }}>{w.name}</td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#F5C518' }}>{w.id}</td>
                                    <td style={{ fontSize: 13 }}>{w.zone}</td>
                                    <td><span className={`badge ${w.status === 'available' ? 'badge-available' : w.status === 'busy' ? 'badge-busy' : 'badge-leave'}`}>{w.status}</span></td>
                                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{w.status === 'busy' ? Math.floor(Math.random() * 2) + 1 : 0}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm">Reassign Zone</button>
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
