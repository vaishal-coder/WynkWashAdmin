import React, { useState } from 'react';
import { notifications } from '../data/mockData';

export default function Notifications() {
    const [form, setForm] = useState({ title: '', message: '', audience: 'all', type: 'general' });
    const [sent, setSent] = useState(false);

    const audiences = [
        { key: 'all', label: 'All Users' },
        { key: 'customers', label: 'All Customers' },
        { key: 'workers', label: 'All Workers' },
        { key: 'premium', label: 'Premium Customers' },
        { key: 'zone', label: 'Zone Workers' },
    ];

    const types = [
        { key: 'general', label: 'General', color: '#3B82F6', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
        { key: 'promo', label: 'Promotion', color: '#F5C518', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg> },
        { key: 'alert', label: 'Alert', color: '#EF4444', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
        { key: 'info', label: 'Info', color: '#10B981', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg> },
    ];

    return (
        <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
            {/* Send form */}
            <div>
                <div className="card shadow-sm"  style={{ marginBottom: 20 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 18 }}>Send New Notification</div>

                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>NOTIFICATION TYPE</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {types.map(t => (
                                <button key={t.key}
                                    className={`btn btn-sm ${form.type === t.key ? '' : 'btn-ghost'}`}
                                    style={form.type === t.key ? { background: `${t.color}22`, color: t.color, border: `1px solid ${t.color}44` } : {}}
                                    onClick={() => setForm({ ...form, type: t.key })}>
                                    {t.icon} {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8 }}>SEND TO</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {audiences.map(a => (
                                <button key={a.key}
                                    className={`btn btn-sm ${form.audience === a.key ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setForm({ ...form, audience: a.key })}>
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>TITLE</div>
                        <input className="input" placeholder="e.g. Heavy rain today – services delayed"
                            value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>

                    <div style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>MESSAGE</div>
                        <textarea className="input" rows={4}
                            placeholder="Write your notification message here..."
                            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                            style={{ resize: 'vertical' }} />
                    </div>

                    {/* Preview */}
                    {form.message && (
                        <div style={{ background: 'rgba(245,197,24,0.06)', border: '1px solid rgba(245,197,24,0.2)', borderRadius: 12, padding: 14, marginBottom: 16 }}>
                            <div style={{ fontSize: 11, color: '#F5C518', marginBottom: 6, fontWeight: 600 }}>PREVIEW</div>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{form.title || '(No title)'}</div>
                            <div style={{ fontSize: 13, color: '#64748B' }}>{form.message}</div>
                            <div style={{ fontSize: 11, color: '#64748B', marginTop: 8 }}>
                                To: {audiences.find(a => a.key === form.audience)?.label}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <button className="btn btn-ghost" onClick={() => setForm({ title: '', message: '', audience: 'all', type: 'general' })}>
                            Clear
                        </button>
                        <button className="btn btn-primary"
                            onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); setForm({ title: '', message: '', audience: 'all', type: 'general' }); }}>
                            {sent ? <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Sent!</span> : 'Send Notification'}
                        </button>
                    </div>
                </div>
            </div>

            {/* History */}
            <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Notification History</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {notifications.map(n => {
                        const typeInfo = types.find(t => t.key === n.type) || types[0];
                        return (
                            <div key={n.id} className="card shadow-sm"  style={{ borderLeft: `3px solid ${typeInfo.color}` }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontSize: 11, background: `${typeInfo.color}18`, color: typeInfo.color, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{typeInfo.icon} {typeInfo.label}</div>
                                    </span>
                                    <span style={{ fontSize: 11, color: '#64748B' }}>{n.date}</span>
                                </div>
                                <div style={{ fontSize: 13, color: '#0F172A', lineHeight: 1.5, marginBottom: 8 }}>{n.message}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 11, color: '#64748B' }}>Sent to: <strong>{n.sentTo}</strong></span>
                                    <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> {n.reach} reached</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
