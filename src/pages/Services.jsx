import React, { useState } from 'react';
import { services } from '../data/mockData';

const vehicleTypes = ['Hatchback', 'Sedan', 'SUV/XUV', 'Luxury', 'Bike'];

const CAT_COLOR = {
    Basic: '#3B82F6', Package: '#8B5CF6', Interior: '#10B981',
    Detailing: '#F59E0B', Premium: '#F5C518', Specialty: '#EC4899', Bike: '#06B6D4'
};

/* ── Service Modal ──────────────────────────────────── */
function ServiceModal({ service, onClose }) {
    const isNew = !service;
    const [form, setForm] = useState(service || {
        name: '', category: 'Basic', description: '', duration: '',
        active: true,
        pricing: { Hatchback: '', Sedan: '', 'SUV/XUV': '', Luxury: '', Bike: '' },
        products: [],
    });
    const [newProduct, setNewProduct] = useState('');

    const addProduct = () => {
        if (newProduct.trim()) { setForm(f => ({ ...f, products: [...f.products, newProduct.trim()] })); setNewProduct(''); }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: 620 }} onClick={e => e.stopPropagation()}>
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
                                {Object.keys(CAT_COLOR).map(c => <option key={c}>{c}</option>)}
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
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
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
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                            {form.products.map((p, i) => (
                                <span key={i} className="badge badge-yellow" style={{ cursor: 'pointer', fontSize: 11 }}
                                    onClick={() => setForm(f => ({ ...f, products: f.products.filter((_, j) => j !== i) }))}>
                                    {p} ✕
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input className="input" placeholder="Add product…" value={newProduct}
                                onChange={e => setNewProduct(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') addProduct(); }} />
                            <button className="btn btn-ghost btn-sm" onClick={addProduct}>Add</button>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })}
                            style={{ accentColor: '#F5C518', width: 15, height: 15 }} />
                        Active
                    </label>
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={onClose}>Save Service</button>
                </div>
            </div>
        </div>
    );
}

/* ── Delete Confirm ─────────────────────────────────── */
function DeleteConfirm({ service, onClose, onConfirm }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>Delete Service</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                        Are you sure you want to delete <strong style={{ color: '#F0F4FF' }}>{service.name}</strong>?
                        This action cannot be undone and will affect all linked bookings.
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => { onConfirm(service); onClose(); }}>Delete Service</button>
                </div>
            </div>
        </div>
    );
}

/* ── Service Card ───────────────────────────────────── */
function ServiceCard({ sv, onEdit, onDelete, onToggle }) {
    const col = CAT_COLOR[sv.category];

    return (
        <div
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                display: 'flex', flexDirection: 'column', gap: 0,
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                opacity: sv.active ? 1 : 0.55,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Top accent */}
            <div style={{
                position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                background: `linear-gradient(90deg,transparent,${col},transparent)`, borderRadius: '0 0 4px 4px'
            }} />

            {/* Card body */}
            <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                {/* Header */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span style={{
                            fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20,
                            background: `${col}14`, color: col, border: `1px solid ${col}25`,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>{sv.category}</span>
                        <span style={{
                            fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                            background: sv.active ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                            color: sv.active ? '#34D399' : '#F87171',
                            border: sv.active ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(248,113,113,0.2)',
                        }}>{sv.active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#F0F4FF', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{sv.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.75)', marginTop: 6, lineHeight: 1.5 }}>{sv.description}</div>
                </div>

                {/* Pricing */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: '14px 16px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(148,163,184,0.6)', letterSpacing: '0.08em', marginBottom: 12 }}>PRICING (₹)</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {vehicleTypes.filter(v => sv.pricing[v]).map(v => (
                            <div key={v} style={{
                                flex: '1 1 auto', minWidth: 64, textAlign: 'center',
                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 10, padding: '8px 6px',
                            }}>
                                <div style={{ fontSize: 9, color: 'rgba(148,163,184,0.6)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{v}</div>
                                <div style={{ fontSize: 14, fontWeight: 800, color: '#F5C518', marginTop: 3 }}>₹{sv.pricing[v]?.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products */}
                <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(148,163,184,0.6)', letterSpacing: '0.08em', marginBottom: 8 }}>PRODUCTS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {sv.products.map((p, i) => (
                            <span key={i} style={{
                                fontSize: 10, fontWeight: 600, padding: '4px 9px', borderRadius: 20,
                                background: 'rgba(59,130,246,0.08)', color: '#93C5FD',
                                border: '1px solid rgba(59,130,246,0.15)',
                            }}>{p}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
            }}>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#34D399', fontWeight: 700 }}>{sv.bookingsThisMonth}</span> bookings · {sv.duration}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => onToggle(sv)}
                        style={{
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(148,163,184,0.85)', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                        {sv.active ? 'Disable' : 'Enable'}
                    </button>
                    <button
                        onClick={() => onEdit(sv)}
                        style={{
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                            color: '#F0F4FF', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(sv)}
                        style={{
                            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
                            color: '#F87171', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────── */
export default function Services() {
    const [data, setData] = useState(services);
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [deleteTarget, setDelete] = useState(null);
    const [filterCat, setFilterCat] = useState('all');

    const handleDelete = (sv) => setData(d => d.filter(x => x.id !== sv.id));
    const handleToggle = (sv) => setData(d => d.map(x => x.id === sv.id ? { ...x, active: !x.active } : x));

    const categories = ['all', ...Object.keys(CAT_COLOR)];
    const filtered = data.filter(sv => filterCat === 'all' || sv.category === filterCat);

    return (
        <div className="animate-fade">
            {/* Toolbar */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                {categories.map(c => (
                    <button key={c}
                        className={`btn btn-sm ${filterCat === c ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilterCat(c)}>
                        {c === 'all' ? 'All' : c}
                        <span style={{ opacity: 0.65, marginLeft: 4 }}>
                            ({c === 'all' ? data.length : data.filter(s => s.category === c).length})
                        </span>
                    </button>
                ))}
                <div style={{ flex: 1 }} />
                <button className="btn btn-primary" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Create Service
                </button>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 16 }}>
                {filtered.map(sv => (
                    <ServiceCard key={sv.id} sv={sv}
                        onEdit={sv => { setIsNew(false); setModal(sv); }}
                        onDelete={sv => setDelete(sv)}
                        onToggle={handleToggle} />
                ))}
                {filtered.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
                        No services found
                    </div>
                )}
            </div>

            {(modal !== null || isNew) && (
                <ServiceModal service={isNew ? null : modal} onClose={() => { setModal(null); setIsNew(false); }} />
            )}
            {deleteTarget && (
                <DeleteConfirm service={deleteTarget} onClose={() => setDelete(null)} onConfirm={handleDelete} />
            )}
        </div>
    );
}
