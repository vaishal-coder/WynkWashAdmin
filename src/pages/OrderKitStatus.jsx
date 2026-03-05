import React, { useState } from 'react';
import { bookings } from '../data/mockData';

export default function OrderKitStatus() {
    // Initialize state with bookings, adding kitProvided if missing
    const [data, setData] = useState(bookings.map(b => ({
        ...b,
        kitProvided: b.status === 'completed' || b.status === 'inprogress'
    })));

    const toggleKitStatus = (id) => {
        setData(data.map(item =>
            item.id === id ? { ...item, kitProvided: !item.kitProvided } : item
        ));
    };

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>Order Kit Status</h2>
                <div style={{ fontSize: 13, color: '#64748B' }}>
                    Tracks whether the worker kit is provided or not for each order.
                </div>
            </div>

            <div className="card shadow-sm"  style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Worker</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Kit Provided</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td><span style={{ fontFamily: 'monospace', color: '#F5C518' }}>{item.id}</span></td>
                                <td style={{ fontWeight: 600 }}>{item.customer}</td>
                                <td style={{ fontSize: 13 }}>{item.worker}</td>
                                <td style={{ fontSize: 13 }}>{item.service}</td>
                                <td style={{ fontSize: 13 }}>{item.date}</td>
                                <td>
                                    <span className={`badge ${item.kitProvided ? 'badge-completed' : 'badge-danger'}`}>
                                        {item.kitProvided ? 'YES' : 'NO'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={`btn btn-sm ${item.kitProvided ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => toggleKitStatus(item.id)}
                                    >
                                        {item.kitProvided ? 'Mark Not Provided' : 'Mark Provided'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
