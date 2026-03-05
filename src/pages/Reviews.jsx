import React, { useState } from 'react';
import { reviews } from '../data/mockData';

const statusStyle = {
    published: 'badge-completed',
    responded: 'badge-assigned',
    pending: 'badge-pending',
    complaint: 'badge-cancelled',
};

const StarRating = ({ rating, size = 14 }) => (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ))}
    </div>
);

export default function Reviews() {
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState(null);
    const [reply, setReply] = useState('');

    const filtered = reviews.filter(r => filter === 'all' || r.status === filter);

    return (
        <div className="animate-fade">
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 20 }}>
                {[
                    { label: 'Total Reviews', value: reviews.length, color: '#3B82F6' },
                    { label: 'Avg. Rating', value: <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)} <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div>, color: '#F5C518' },
                    { label: 'Complaints', value: reviews.filter(r => r.status === 'complaint').length, color: '#EF4444' },
                    { label: 'Pending Reply', value: reviews.filter(r => r.status === 'pending').length, color: '#F59E0B' },
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                {['all', 'published', 'responded', 'pending', 'complaint'].map(s => (
                    <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilter(s)}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}&nbsp;
                        <span style={{ opacity: 0.7 }}>({s === 'all' ? reviews.length : reviews.filter(r => r.status === s).length})</span>
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map(r => (
                        <div key={r.id} className="card shadow-sm"  style={{
                            cursor: 'pointer',
                            borderLeft: r.status === 'complaint' ? '3px solid #EF4444' : '3px solid transparent',
                            outline: selected?.id === r.id ? '2px solid #F5C518' : 'none',
                        }} onClick={() => setSelected(r)}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3B82F620', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                                    {r.customer.charAt(0)}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700 }}>{r.customer}</span>
                                        <span style={{ color: '#F5C518', fontSize: 13, display: 'flex' }}>
                                            <StarRating rating={r.rating} />
                                        </span>
                                        <span className={`badge ${statusStyle[r.status]}`} style={{ fontSize: 10, marginLeft: 'auto' }}>
                                            {r.status}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>
                                        {r.service} · Worker: {r.worker} · {r.date}
                                    </div>
                                    <div style={{ fontSize: 13 }}>{r.comment}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selected && (
                    <div className="card shadow-sm"  style={{ height: 'fit-content', position: 'sticky', top: 88 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <div style={{ fontWeight: 700 }}>Review Detail</div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)}>✕</button>
                        </div>

                        <div style={{ margin: '0 0 16px' }}>
                            <div style={{ color: '#F5C518', marginBottom: 6 }}>
                                <StarRating rating={selected.rating} size={20} />
                            </div>
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>{selected.customer}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>{selected.service}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>Worker: {selected.worker}</div>
                            <div style={{ fontSize: 12, color: '#64748B' }}>{selected.date}</div>
                        </div>

                        <div style={{ background: 'rgba(15, 23, 42,0.04)', borderRadius: 10, padding: 12, marginBottom: 16 }}>
                            <p style={{ fontSize: 13, lineHeight: 1.6 }}>{selected.comment}</p>
                        </div>

                        <div>
                            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6 }}>ADMIN REPLY</div>
                            <textarea className="input" rows={4} placeholder="Write your response..."
                                value={reply} onChange={e => setReply(e.target.value)} style={{ resize: 'none', marginBottom: 10 }} />
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Send Reply</button>
                                {selected.status === 'complaint' && (
                                    <button className="btn btn-danger btn-sm" style={{ flex: 1 }}>Escalate</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
