import React, { useState } from 'react';
import { coupons, services } from '../data/mockData';

/* ── Modal ─────────────────────────────────────────── */
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
                            VALUE ({form.type === 'flat' ? '₹' : '%'})
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
                    <div style={{ gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>EXPIRY DATE</div>
                        <input className="input" type="date" value={form.expiry}
                            onChange={e => setForm({ ...form, expiry: e.target.value })}
                            style={{ colorScheme: 'dark' }} />
                    </div>
                </div>
                <div className="modal-footer">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, fontSize: 13, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })}
                            style={{ accentColor: '#F5C518', width: 16, height: 16 }} />
                        Active
                    </label>
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={onClose}>Save Coupon</button>
                </div>
            </div>
        </div>
    );
}

/* ── Coupon Card ───────────────────────────────────── */
function CouponCard({ c, onEdit, onToggle }) {
    const usedPct = Math.min(100, Math.round((c.usedCount / c.usageLimit) * 100));
    const col = '#F5C518';

    return (
        <div
            style={{
                position: 'relative', overflow: 'hidden',
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '24px',
                display: 'flex', flexDirection: 'column', gap: 18,
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                opacity: c.active ? 1 : 0.6,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Top accent line */}
            <div style={{
                position: 'absolute', top: 0, left: 24, right: 24, height: 2,
                background: `linear-gradient(90deg,transparent,${c.active ? col : 'rgba(255,255,255,0.2)'},transparent)`, borderRadius: '0 0 4px 4px'
            }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 900, color: c.active ? col : 'var(--text-secondary)', letterSpacing: '0.08em' }}>
                        {c.code}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.8)', marginTop: 6, fontWeight: 600 }}>
                        {c.type === 'flat' ? `₹${c.value} FLAT OFF` : `${c.value}% PERCENT OFF`}
                        {c.maxDiscount ? ` · UP TO ₹${c.maxDiscount}` : ''}
                    </div>
                </div>
                <div style={{
                    fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20,
                    background: c.active ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: c.active ? '#34D399' : '#F87171',
                    border: c.active ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(248,113,113,0.25)',
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                    {c.active ? 'Active' : 'Disabled'}
                </div>
            </div>

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>EXPIRES</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F4FF', marginTop: 4 }}>{c.expiry}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>USAGE LIMIT</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#F0F4FF', marginTop: 4 }}>{c.usageLimit}</div>
                </div>
            </div>

            {/* Usage Progress */}
            <div style={{ marginTop: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8 }}>
                    <span style={{ color: 'rgba(148,163,184,0.7)', fontWeight: 600 }}>TOTAL REDEMPTIONS</span>
                    <span style={{ fontWeight: 800, color: '#F0F4FF' }}>{c.usedCount} / {c.usageLimit} ({usedPct}%)</span>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                    <div className="progress-fill" style={{ width: `${usedPct}%`, background: usedPct > 90 ? '#F87171' : col }} />
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <button
                    onClick={() => onEdit(c)}
                    style={{
                        flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#F0F4FF', borderRadius: 10, padding: '10px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}>
                    Edit
                </button>
                <button
                    onClick={() => onToggle(c)}
                    style={{
                        flex: 1,
                        background: c.active ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                        border: c.active ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(16,185,129,0.2)',
                        color: c.active ? '#F87171' : '#34D399',
                        borderRadius: 10, padding: '10px 0', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s'
                    }}>
                    {c.active ? 'Disable' : 'Activate'}
                </button>
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────── */
export default function Coupons() {
    const [data, setData] = useState(coupons);
    const [modal, setModal] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const handleToggle = (c) => setData(d => d.map(x => x.id === c.id ? { ...x, active: !x.active } : x));

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                    {[
                        { label: 'Total Coupons', val: data.length, col: '#3B82F6' },
                        { label: 'Active', val: data.filter(c => c.active).length, col: '#10B981' },
                        { label: 'Total Usage', val: data.reduce((a, c) => a + c.usedCount, 0), col: '#F5C518' },
                    ].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '14px 24px', textAlign: 'center', minWidth: 130 }}>
                            <div style={{ fontSize: 24, fontWeight: 800, color: s.col, letterSpacing: '-0.02em' }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={() => { setIsNew(true); setModal(null); }}>
                    + Create Coupon
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
                {data.map(c => (
                    <CouponCard key={c.id} c={c} onEdit={(c) => { setIsNew(false); setModal(c); }} onToggle={handleToggle} />
                ))}
            </div>

            {(modal !== null || isNew) && (
                <CouponModal coupon={isNew ? null : modal} onClose={() => { setModal(null); setIsNew(false); }} />
            )}
        </div>
    );
}
