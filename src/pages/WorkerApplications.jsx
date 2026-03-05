import React, { useState } from 'react';
import { workerApplications } from '../data/mockData';

export default function WorkerApplications() {
    const [data, setData] = useState(workerApplications);

    const handleAction = (id, status) => {
        setData(data.map(app => app.id === id ? { ...app, status } : app));
    };

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>Worker Applications</h2>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Total Applications: {data.length}
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Experience</th>
                            <th>Zone</th>
                            <th>Skills</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(app => (
                            <tr key={app.id}>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{app.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.phone} · {app.email}</div>
                                </td>
                                <td style={{ fontSize: 13 }}>{app.experience}</td>
                                <td style={{ fontSize: 13 }}>{app.zone}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                        {app.skills.map(skill => (
                                            <span key={skill} className="badge badge-yellow" style={{ fontSize: 10 }}>{skill}</span>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ fontSize: 13 }}>{app.appliedDate}</td>
                                <td>
                                    <span className={`badge ${app.status === 'pending' ? 'badge-pending' : app.status === 'accepted' ? 'badge-completed' : 'badge-cancelled'}`}>
                                        {app.status.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    {app.status === 'pending' ? (
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleAction(app.id, 'accepted')}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleAction(app.id, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Handled</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
