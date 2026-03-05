import React, { useState } from 'react';
import { workerVerifications } from '../data/mockData';

const StatusBadge = ({ status }) => {
    const styles = {
        verified: { bg: '#ECFDF5', color: '#10B981', border: '#10B98130', label: 'Verified' },
        pending: { bg: 'var(--text-primary)7ED', color: '#F59E0B', border: '#F59E0B30', label: 'Pending' },
        rejected: { bg: '#FEF2F2', color: '#EF4444', border: '#EF444430', label: 'Rejected' },
    };
    const s = styles[status] || styles.pending;
    return (
        <span style={{
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
            padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'uppercase'
        }}>
            {s.label}
        </span>
    );
};

const SectionHeader = ({ title }) => (
    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 4, height: 14, background: 'var(--yellow)', borderRadius: 2 }} />
        {title.toUpperCase()}
    </div>
);

const DocCard = ({ title, img, status, onAction }) => (
    <div className="card shadow-sm"  style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{title}</span>
            <StatusBadge status={status} />
        </div>
        <img src={img} alt={title} style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: 8, background: '#f1f5f9' }} />
        <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-success btn-sm" style={{ flex: 1, height: 32 }} onClick={() => onAction('verified')}>Verify</button>
            <button className="btn btn-danger btn-sm" style={{ flex: 1, height: 32 }} onClick={() => onAction('rejected')}>Reject</button>
        </div>
    </div>
);

export default function Verification() {
    const [selectedId, setSelectedId] = useState(workerVerifications[0].id);
    const worker = workerVerifications.find(v => v.id === selectedId);

    return (
        <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
            {/* List */}
            <div className="card shadow-sm"  style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
                    Verification Queue
                    <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                        {workerVerifications.length} workers pending
                    </div>
                </div>
                {workerVerifications.map(v => (
                    <div
                        key={v.id}
                        onClick={() => setSelectedId(v.id)}
                        style={{
                            padding: '16px 24px', cursor: 'pointer', transition: 'all 0.2s',
                            background: selectedId === v.id ? 'var(--bg-main)' : 'transparent',
                            borderLeft: selectedId === v.id ? '4px solid var(--yellow)' : '4px solid transparent',
                            borderBottom: '1px solid var(--border)'
                        }}
                    >
                        <div style={{ fontWeight: 600, color: selectedId === v.id ? 'var(--yellow-dark)' : 'var(--text-primary)' }}>{v.workerName}</div>
                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                            Applied on: {v.appliedDate}
                        </div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="card shadow-sm"  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#000' }}>
                            {worker.workerName.charAt(0)}
                        </div>
                        <div>
                            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{worker.workerName}</h2>
                            <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{worker.email} · {worker.phone}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button className="btn btn-ghost">Put on Hold</button>
                        <button className="btn btn-primary">Approve All & Activate</button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {/* Work Preferences */}
                    <div className="card shadow-sm" >
                        <SectionHeader title="Work Preferences" />
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>WORK AREAS</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.workPreferences.areas}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>SERVICES</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.workPreferences.services}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>AVAILABILITY</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.workPreferences.availability}</div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Details */}
                    <div className="card shadow-sm" >
                        <SectionHeader title="Bank Details" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>HOLDER NAME</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.bankDetails.holder}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>BANK NAME</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.bankDetails.bankName}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>ACCOUNT NO.</div>
                                <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>{worker.bankDetails.account}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748B' }}>IFSC CODE</div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>{worker.bankDetails.ifsc}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                            <StatusBadge status={worker.bankDetails.status} />
                            <button className="btn btn-ghost btn-sm" style={{ height: 28, fontSize: 11 }}>Verify Bank</button>
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div>
                    <SectionHeader title="Uploaded Documents" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                        <DocCard title="Aadhar Card (Front)" img={worker.documents.aadhar.front} status={worker.documents.aadhar.status} onAction={(s) => { }} />
                        <DocCard title="Aadhar Card (Back)" img={worker.documents.aadhar.back} status={worker.documents.aadhar.status} onAction={(s) => { }} />
                        <DocCard title="Driving License (Front)" img={worker.documents.license.front} status={worker.documents.license.status} onAction={(s) => { }} />
                        <DocCard title="Driving License (Back)" img={worker.documents.license.back} status={worker.documents.license.status} onAction={(s) => { }} />
                        <DocCard title="Selfie / Photo" img={worker.documents.selfie.url} status={worker.documents.selfie.status} onAction={(s) => { }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
