import React, { useState } from 'react';
import { products, services } from '../data/mockData';

const categoryColor = {
    Cleaning: '#3B82F6', Equipment: '#8B5CF6', Accessory: '#10B981',
    Detailing: '#F59E0B', Specialty: '#EC4899',
};

function ProductModal({ product, onClose }) {
    const [form, setForm] = useState(product || { name: '', category: 'Cleaning', unit: 'Litre', stock: '', price: '', alert: '' });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{product ? 'Edit Product' : 'Add Product'}</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                        { label: 'Product Name', key: 'name', placeholder: 'e.g. 3M Car Shampoo', full: true },
                        { label: 'Category', key: 'category', type: 'select', options: Object.keys(categoryColor) },
                        { label: 'Unit', key: 'unit', type: 'select', options: ['Litre', 'Kg', 'Unit', 'Pack', 'Piece'] },
                        { label: 'Current Stock', key: 'stock', placeholder: '0', type: 'number' },
                        { label: 'Unit Price (₹)', key: 'price', placeholder: '0', type: 'number' },
                        { label: 'Low Stock Alert', key: 'alert', placeholder: '5', type: 'number' },
                    ].map(f => (
                        <div key={f.key} style={f.full ? { gridColumn: '1 / -1' } : {}}>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>{f.label.toUpperCase()}</div>
                            {f.type === 'select'
                                ? <select className="select" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}>
                                    {f.options.map(o => <option key={o}>{o}</option>)}
                                </select>
                                : <input className="input" type={f.type || 'text'} value={form[f.key]} placeholder={f.placeholder}
                                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
                            }
                        </div>
                    ))}

                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>USED IN SERVICES</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {services.map(s => (
                                <label key={s.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12,
                                    background: 'rgba(15, 23, 42,0.04)', borderRadius: 8, padding: '6px 10px', border: '1px solid var(--border)'
                                }}>
                                    <input type="checkbox" defaultChecked={product?.usedIn?.includes(s.id)} />
                                    {s.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary">Save Product</button>
                </div>
            </div>
        </div>
    );
}

export default function Products() {
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [filterCat, setFilterCat] = useState('all');

    const filtered = products.filter(p => filterCat === 'all' || p.category === filterCat);

    return (
        <div className="animate-fade">
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
                {[
                    { label: 'Total Products', value: products.length, color: '#3B82F6' },
                    { label: 'Low Stock Alerts', value: products.filter(p => p.stock <= p.alert).length, color: '#EF4444' },
                    { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, color: '#8B5CF6' },
                    { label: 'Total Inventory Value', value: `₹${(products.reduce((a, p) => a + p.stock * p.price, 0) / 1000).toFixed(0)}K`, color: '#F5C518' },
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                {['all', ...Object.keys(categoryColor)].map(c => (
                    <button key={c} className={`btn btn-sm ${filterCat === c ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilterCat(c)}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                ))}
                <div style={{ flex: 1 }} />
                <button className="btn btn-primary btn-sm" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Add Product
                </button>
            </div>

            <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Total Value</th>
                                <th>Alert Level</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => {
                                const low = p.stock <= p.alert;
                                return (
                                    <tr key={p.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{p.name}</div>
                                            <div style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>{p.id}</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                background: `${categoryColor[p.category]}18`, color: categoryColor[p.category],
                                                fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20
                                            }}>
                                                {p.category}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontWeight: 700, color: low ? '#EF4444' : 'var(--text-primary)' }}>{p.stock}</span>
                                                <div className="progress-bar" style={{ width: 60 }}>
                                                    <div className="progress-fill" style={{
                                                        width: `${Math.min((p.stock / (p.alert * 5)) * 100, 100)}%`,
                                                        background: low ? '#EF4444' : undefined
                                                    }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: 12, color: '#64748B' }}>{p.unit}</td>
                                        <td style={{ fontWeight: 600 }}>₹{p.price.toLocaleString()}</td>
                                        <td style={{ fontWeight: 600, color: '#F5C518' }}>₹{(p.stock * p.price).toLocaleString()}</td>
                                        <td style={{ fontSize: 12 }}>
                                            <span style={{ color: '#64748B' }}>≤ {p.alert}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${low ? 'badge-cancelled' : 'badge-completed'}`}>
                                                {low ? (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                                        Low Stock
                                                    </span>
                                                ) : 'OK'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="btn btn-ghost btn-sm" onClick={() => { setIsNew(false); setModal(p); }}>Edit</button>
                                                <button className="btn btn-danger btn-sm">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {(modal !== null || isNew) && (
                <ProductModal product={isNew ? null : modal} onClose={() => { setModal(null); setIsNew(false); }} />
            )}
        </div>
    );
}
