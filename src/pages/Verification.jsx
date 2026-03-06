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
        <div style={{ width: 4, height: 14, background: 'var(--navy)', borderRadius: 2 }} />
        {title.toUpperCase()}
    </div>
);

const DocCard = ({ title, img, status, onAction }) => (
    <div className="card shadow-sm" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
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
    const [verificationData, setVerificationData] = useState(workerVerifications);
    const [selectedId, setSelectedId] = useState(workerVerifications[0]?.id);
    const [approveModal, setApproveModal] = useState(false); // kept for backward-compat but no longer used as overlay
    const [assignOpen, setAssignOpen] = useState(false);
    const [selectedHub, setSelectedHub] = useState('');

    const [holdData, setHoldData] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');

    const worker = verificationData.find(v => v.id === selectedId) || holdData.find(v => v.id === selectedId) || verificationData[0] || holdData[0];

    if (!worker) return (
        <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>No pending applications.</div>
    );

    const handleHold = (w) => {
        if (holdData.find(v => v.id === w.id)) return;
        setHoldData(prev => [...prev, w]);
        const n = verificationData.filter(v => v.id !== w.id);
        setVerificationData(n);
        setAssignOpen(false);
        setSelectedHub('');
        if (n.length) setSelectedId(n[0].id);
        else if (holdData.length) setSelectedId(holdData[0].id); // this will select the held worker, but that's fine
    };

    const handleReject = (w) => {
        const n = verificationData.filter(v => v.id !== w.id);
        const h = holdData.filter(v => v.id !== w.id);
        setVerificationData(n);
        setHoldData(h);
        setAssignOpen(false);
        setSelectedHub('');
        if (n.length) setSelectedId(n[0].id);
        else if (h.length) setSelectedId(h[0].id);
        else setSelectedId(null);
    };

    const handleApprove = (w, hub) => {
        setSuccessMsg('Worker successfully approved.');
        setTimeout(() => setSuccessMsg(''), 3000);
        const n = verificationData.filter(v => v.id !== w.id);
        const h = holdData.filter(v => v.id !== w.id);
        setVerificationData(n);
        setHoldData(h);
        setAssignOpen(false);
        setSelectedHub('');
        if (n.length) setSelectedId(n[0].id);
        else if (h.length) setSelectedId(h[0].id);
        else setSelectedId(null);
    };

    return (
        <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
            {/* Lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
                        Worker Applications
                        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                            {verificationData.length} workers pending
                        </div>
                    </div>
                    <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                        {verificationData.map(v => (
                            <div
                                key={v.id}
                                onClick={() => setSelectedId(v.id)}
                                style={{
                                    padding: '16px 24px', cursor: 'pointer', transition: 'all 0.2s',
                                    background: selectedId === v.id ? 'var(--bg-main)' : 'transparent',
                                    borderLeft: selectedId === v.id ? '4px solid var(--navy)' : '4px solid transparent',
                                    borderBottom: '1px solid var(--border)'
                                }}
                            >
                                <div style={{ fontWeight: 600, color: selectedId === v.id ? 'var(--navy)' : 'var(--text-primary)' }}>{v.workerName}</div>
                                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                                    Pref Location: {v.workPreferences?.areas}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hold Section */}
                {holdData.length > 0 && (
                    <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden', height: 'fit-content' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>
                            On Hold Applications
                            <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                                {holdData.length} workers on hold
                            </div>
                        </div>
                        <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                            {holdData.map(v => (
                                <div
                                    key={v.id}
                                    onClick={() => setSelectedId(v.id)}
                                    style={{
                                        padding: '16px 24px', cursor: 'pointer', transition: 'all 0.2s',
                                        background: selectedId === v.id ? 'var(--bg-main)' : 'transparent',
                                        borderLeft: selectedId === v.id ? '4px solid var(--navy)' : '4px solid transparent',
                                        borderBottom: '1px solid var(--border)'
                                    }}
                                >
                                    <div style={{ fontWeight: 600, color: selectedId === v.id ? 'var(--navy)' : 'var(--text-primary)' }}>{v.workerName}</div>
                                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                                        {v.phone} · {v.workPreferences?.areas}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="card shadow-sm" style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden' }}>
                    {/* Worker header row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
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
                            <button className="btn btn-danger" onClick={() => handleReject(worker)}>Reject</button>
                            <button className="btn btn-ghost" onClick={() => handleHold(worker)}>Put on Hold</button>
                            <button
                                className="btn btn-primary"
                                onClick={() => { setAssignOpen(v => !v); setSelectedHub(''); }}
                            >
                                {assignOpen ? 'Cancel' : 'Assign'}
                            </button>
                        </div>
                    </div>

                    {/* Inline Assign & Approve panel */}
                    {assignOpen && (
                        <div style={{
                            margin: '0 24px 24px',
                            background: '#F8FAFC',
                            border: '1px solid var(--border)',
                            borderRadius: 12,
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16
                        }}>
                            <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A', marginBottom: 4 }}>Assign &amp; Approve Worker</div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#000', flexShrink: 0 }}>
                                    {worker.workerName.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 14 }}>{worker.workerName}</div>
                                    <div style={{ fontSize: 12, color: '#64748B' }}>{worker.phone}</div>
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 700, marginBottom: 8 }}>ASSIGN OPERATIONAL HUB *</div>
                                <select className="select" value={selectedHub} onChange={e => setSelectedHub(e.target.value)}>
                                    <option value="">— Select Hub —</option>
                                    <option value="North Bangalore">North Bangalore</option>
                                    <option value="South Bangalore">South Bangalore</option>
                                    <option value="East Bangalore">East Bangalore</option>
                                    <option value="West Bangalore">West Bangalore</option>
                                    <option value="Central Bangalore">Central Bangalore</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                <button className="btn btn-ghost" onClick={() => { setAssignOpen(false); setSelectedHub(''); }}>Cancel</button>
                                <button
                                    className="btn btn-success"
                                    disabled={!selectedHub}
                                    onClick={() => handleApprove(worker, selectedHub)}
                                >
                                    Approve Worker
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {/* Personal Details & History Log */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="card shadow-sm" >
                            <SectionHeader title="Personal Details" />
                            <div style={{ display: 'grid', gap: 12 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: '#64748B' }}>FULL NAME</div>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.workerName}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, color: '#64748B' }}>PHONE NUMBER</div>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.phone}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, color: '#64748B' }}>PREFERRED LOCATION</div>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.workPreferences?.areas || 'Unspecified'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm" >
                            <SectionHeader title="Application History" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>Application Submitted</div>
                                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{worker.appliedDate} · via Mobile App</div>
                                    </div>
                                </div>
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
                                <div style={{ fontSize: 11, color: '#64748B' }}>BRANCH NAME</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>{worker.bankDetails.branchName}</div>
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
                    </div>
                </div>

                {/* Documents */}
                <div>
                    <SectionHeader title="Uploaded Documents" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                        <DocCard title="Aadhar Card" img={worker.documents.aadhar.front} status={worker.documents.aadhar.status} onAction={(s) => { }} />
                        <DocCard title="Driving License" img={worker.documents.license.front} status={worker.documents.license.status} onAction={(s) => { }} />
                        <DocCard title="Selfie / Photo" img={worker.documents.selfie.url} status={worker.documents.selfie.status} onAction={(s) => { }} />
                    </div>
                </div>
            </div>




            {
                successMsg && (
                    <div style={{
                        position: 'fixed', bottom: 24, right: 24,
                        background: '#10B981', color: '#FFF',
                        padding: '16px 24px', borderRadius: 8,
                        fontWeight: 600, boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                        zIndex: 9999, transition: 'all 0.3s'
                    }}>
                        ✓ {successMsg}
                    </div>
                )
            }
        </div >
    );
}
