import React, { useState, useEffect } from 'react';
import { bookings, customers } from '../data/mockData';

export default function BookingHistory({ customerId }) {
    const [data, setData] = useState(bookings);
    const [selectedCustomer, setSelectedCustomer] = useState(customerId || 'all');

    const filtered = data.filter(b => {
        if (selectedCustomer === 'all') return true;
        // Search for customer name in customers mock data to match against booking.customer
        const customer = customers.find(c => c.id === selectedCustomer);
        return b.customer === customer?.name;
    });

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>Complete Booking History</h2>
                <select
                    className="select"
                    style={{ width: 250 }}
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                    <option value="all">All Customers</option>
                    {customers.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.id})</option>
                    ))}
                </select>
            </div>

            <div className="card shadow-sm"  style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Vehicle</th>
                            <th>Service</th>
                            <th>Date & Time</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(b => (
                            <tr key={b.id}>
                                <td><span style={{ fontFamily: 'monospace', color: '#F5C518' }}>{b.id}</span></td>
                                <td style={{ fontWeight: 600 }}>{b.customer}</td>
                                <td style={{ fontSize: 13 }}>{b.vehicle} · {b.vehicleNo}</td>
                                <td style={{ fontSize: 13 }}>{b.service}</td>
                                <td style={{ fontSize: 13 }}>{b.date} · {b.time}</td>
                                <td style={{ fontWeight: 700, color: '#F5C518' }}>₹{b.amount.toLocaleString()}</td>
                                <td>
                                    <span className={`badge badge-${b.status}`}>
                                        {b.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>
                        No bookings found for this customer.
                    </div>
                )}
            </div>
        </div>
    );
}
