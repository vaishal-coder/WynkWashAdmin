import React, { useState } from 'react';
import { services } from '../data/mockData';

const vehicleTypes = ['Hatchback', 'Sedan', 'SUV/XUV', 'Luxury', 'Bike'];

function ServiceModal({ service, onClose }) {
    const isNew = !service;
    const [form, setForm] = useState(service || {
        name: '', category: 'Basic', description: '', duration: '',
        active: true,
        pricing: { Hatchback: '', Sedan: '', 'SUV/XUV': '', Luxury: '', Bike: '' },
        products: [],
    });
    const [newProduct, setNewProduct] = useState('');

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{isNew ? 'Create Service' : 'Edit Service'}</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>SERVICE NAME</div>
                            <input className="input" value={form.name} placeholder="e.g. Premium Doorstep Wash"
                                onChange={e => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>CATEGORY</div>
                            <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                {['Basic', 'Package', 'Interior', 'Detailing', 'Premium', 'Specialty', 'Bike'].map(c => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>DURATION</div>
                            <input className="input" value={form.duration} placeholder="e.g. 45 mins"
                                onChange={e => setForm({ ...form, duration: e.target.value })} />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>DESCRIPTION</div>
                            <textarea className="input" rows={2} value={form.description} placeholder="Service description..."
                                onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'none' }} />
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>PRICING BY VEHICLE TYPE (₹)</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                            {vehicleTypes.map(v => (
                                <div key={v}>
                                    <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 4 }}>{v}</div>
                                    <input className="input" type="number" style={{ paddingLeft: 10 }}
                                        value={form.pricing[v] || ''}
                                        placeholder="—"
                                        onChange={e => setForm({ ...form, pricing: { ...form.pricing, [v]: e.target.value ? Number(e.target.value) : null } })} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>PRODUCTS USED</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                            {form.products.map((p, i) => (
                                <span key={i} className="badge badge-yellow" style={{ cursor: 'pointer' }}
                                    onClick={() => setForm({ ...form, products: form.products.filter((_, j) => j !== i) })}>
                                    {p} ✕
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input className="input" placeholder="Add product..." value={newProduct}
                                onChange={e => setNewProduct(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && newProduct.trim()) { setForm({ ...form, products: [...form.products, newProduct.trim()] }); setNewProduct(''); } }} />
                            <button className="btn btn-ghost btn-sm"
                                onClick={() => { if (newProduct.trim()) { setForm({ ...form, products: [...form.products, newProduct.trim()] }); setNewProduct(''); } }}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13 }}>
                            <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                            Active
                        </label>
                    </div>
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary">Save Service</button>
                </div>
            </div>
        </div>
    );
}

export default function Services() {
    const [data, setData] = useState(services);
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const categoryColor = {
        Basic: '#3B82F6', Package: '#8B5CF6', Interior: '#10B981',
        Detailing: '#F59E0B', Premium: '#F5C518', Specialty: '#EC4899', Bike: '#06B6D4'
    };

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
                <button className="btn btn-primary" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Create Service
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                {data.map(sv => {
                    const col = categoryColor[sv.category];
                    return (
                        <div key={sv.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px', position: 'relative', overflow: 'hidden', border: `1px solid ${col}20`, borderLeft: `3px solid ${col}` }}>
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `radial-gradient(circle at center, ${col}15, transparent 70%)`, pointerEvents: 'none' }} />

                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 1 }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <span style={{
                                            background: `linear-gradient(135deg, ${categoryColor[sv.category]}30, ${categoryColor[sv.category]}10)`, color: categoryColor[sv.category],
                                            fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20, letterSpacing: '0.05em', border: `1px solid ${categoryColor[sv.category]}40`,
                                            boxShadow: `0 2px 8px ${categoryColor[sv.category]}20`
                                        }}>
                                            {sv.category.toUpperCase()}
                                        </span>
                                        <span className={`badge ${sv.active ? 'badge-completed' : 'badge-cancelled'}`} style={{ fontSize: 10, padding: '4px 10px' }}>
                                            {sv.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: 18, color: '#FFF', letterSpacing: '-0.01em' }}>{sv.name}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.4 }}>{sv.description}</div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 14, padding: 16, border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', zIndex: 1 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 700, letterSpacing: '0.05em' }}>PRICING</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {vehicleTypes.filter(v => sv.pricing[v]).map(v => (
                                        <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '8px 12px', flex: '1 1 auto', minWidth: 68, border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{v}</div>
                                            <div style={{ fontWeight: 800, color: '#F5C518', fontSize: 14, marginTop: 2 }}>₹{sv.pricing[v]?.toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ zIndex: 1 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8, fontWeight: 700, letterSpacing: '0.05em' }}>PRODUCTS</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {sv.products.map((p, i) => (
                                        <span key={i} className="badge" style={{ fontSize: 11, background: 'rgba(59,130,246,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.2)' }}>{p}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 1, marginTop: 'auto' }}>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                    <span style={{ color: '#10B981', fontWeight: 700 }}>{sv.bookingsThisMonth} bookings</span> · {sv.duration}
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="btn btn-ghost" onClick={() => { setIsNew(false); setModal(sv); }} style={{ padding: '6px 14px', fontSize: 12 }}>Edit</button>
                                    <button className="btn btn-ghost" style={{ padding: '6px 14px', fontSize: 12, color: '#EF4444', background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.1)' }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {(modal !== null || isNew) && (
                <ServiceModal service={isNew ? null : modal} onClose={() => { setModal(null); setIsNew(false); }} />
            )}
        </div>
    );
}
