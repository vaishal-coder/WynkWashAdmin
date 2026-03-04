import React, { useState } from 'react';
import { coupons, services } from '../data/mockData';

function CouponModal({ coupon, onClose }) {
    const isNew = !coupon;
    const [form, setForm] = useState(coupon || {
        code: '', type: 'flat', value: '', maxDiscount: '', usageLimit: '', expiry: '', active: true,
    });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{isNew ? 'Create Coupon' : 'Edit Coupon'}</div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>COUPON CODE</div>
                        <input className="input" value={form.code} placeholder="e.g. WELCOME50"
                            onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                            style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, letterSpacing: '0.1em' }} />
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>DISCOUNT TYPE</div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className={`btn btn-sm ${form.type === 'flat' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setForm({ ...form, type: 'flat' })}>₹ Flat</button>
                            <button className={`btn btn-sm ${form.type === 'percentage' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setForm({ ...form, type: 'percentage' })}>% Percent</button>
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
                            DISCOUNT VALUE ({form.type === 'flat' ? '₹' : '%'})
                        </div>
                        <input className="input" type="number" value={form.value} placeholder="e.g. 50"
                            onChange={e => setForm({ ...form, value: e.target.value })} />
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>MAX DISCOUNT (₹)</div>
                        <input className="input" type="number" value={form.maxDiscount} placeholder="e.g. 300"
                            onChange={e => setForm({ ...form, maxDiscount: e.target.value })} />
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>USAGE LIMIT</div>
                        <input className="input" type="number" value={form.usageLimit} placeholder="e.g. 500"
                            onChange={e => setForm({ ...form, usageLimit: e.target.value })} />
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>EXPIRY DATE</div>
                        <input className="input" type="date" value={form.expiry}
                            onChange={e => setForm({ ...form, expiry: e.target.value })}
                            style={{ colorScheme: 'dark' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>APPLICABLE SERVICES</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {['All', ...services.map(s => s.name)].map(s => (
                                <label key={s} style={{
                                    display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 11,
                                    background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '5px 10px', border: '1px solid var(--border)'
                                }}>
                                    <input type="checkbox" defaultChecked={s === 'All'} />
                                    {s}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8 }}>APPLICABLE VEHICLE TYPES</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {['All', 'Hatchback', 'Sedan', 'SUV/XUV', 'Luxury', 'Bike'].map(v => (
                                <label key={v} style={{
                                    display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: 11,
                                    background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '5px 10px', border: '1px solid var(--border)'
                                }}>
                                    <input type="checkbox" defaultChecked={v === 'All'} />
                                    {v}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                        Active
                    </label>
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary">Save Coupon</button>
                </div>
            </div>
        </div>
    );
}

export default function Coupons() {
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                    {[
                        { label: 'Total Coupons', val: coupons.length, col: '#3B82F6' },
                        { label: 'Active', val: coupons.filter(c => c.active).length, col: '#10B981' },
                        { label: 'Total Usage', val: coupons.reduce((a, c) => a + c.usedCount, 0), col: '#F5C518' },
                    ].map((s, i) => (
                        <div key={i} style={{ background: `${s.col}14`, border: `1px solid ${s.col}30`, borderRadius: 12, padding: '12px 20px', textAlign: 'center', minWidth: 120 }}>
                            <div style={{ fontSize: 22, fontWeight: 800, color: s.col }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Create Coupon
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                {coupons.map(c => {
                    const usedPct = Math.round((c.usedCount / c.usageLimit) * 100);
                    return (
                        <div key={c.id} className="card" style={{
                            borderLeft: `3px solid ${c.active ? '#F5C518' : 'rgba(255,255,255,0.1)'}`,
                            opacity: c.active ? 1 : 0.6,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div>
                                    <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, color: '#F5C518', letterSpacing: '0.05em' }}>
                                        {c.code}
                                    </div>
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                                        {c.type === 'flat' ? `₹${c.value} off` : `${c.value}% off`}
                                        {c.maxDiscount ? ` · max ₹${c.maxDiscount}` : ''}
                                    </div>
                                </div>
                                <span className={`badge ${c.active ? 'badge-completed' : 'badge-cancelled'}`}>
                                    {c.active ? 'Active' : 'Disabled'}
                                </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                                <div style={{ fontSize: 12 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Expires: </span>
                                    <span style={{ fontWeight: 600 }}>{c.expiry}</span>
                                </div>
                                <div style={{ fontSize: 12 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Limit: </span>
                                    <span style={{ fontWeight: 600 }}>{c.usageLimit}</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Usage</span>
                                    <span style={{ fontWeight: 600 }}>{c.usedCount} / {c.usageLimit} ({usedPct}%)</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${usedPct}%` }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => { setIsNew(false); setModal(c); }}>Edit</button>
                                <button className={`btn btn-sm ${c.active ? 'btn-danger' : 'btn-success'}`} style={{ flex: 1 }}>
                                    {c.active ? 'Disable' : 'Activate'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {(modal !== null || isNew) && (
                <CouponModal coupon={isNew ? null : modal} onClose={() => { setModal(null); setIsNew(false); }} />
            )}
        </div>
    );
}
