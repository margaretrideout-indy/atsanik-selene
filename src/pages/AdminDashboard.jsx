import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

// Access restricted to admin role only

const cell = {
  padding: '12px 16px',
  borderBottom: '1px solid #1e0a3c',
  color: '#c4b5fd',
  fontSize: '12px',
  fontFamily: 'serif',
  verticalAlign: 'top',
};

const headCell = {
  ...cell,
  color: '#7c3aed',
  fontSize: '9px',
  textTransform: 'uppercase',
  letterSpacing: '3px',
  fontFamily: 'sans-serif',
  borderBottom: '1px solid #3b0764',
};

export default function AdminDashboard() {
  const { user, isLoadingAuth, authChecked } = useAuth();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [totalUsers, setTotalUsers] = useState('—');
  const [totalRituals, setTotalRituals] = useState('—');
  const [activeToday, setActiveToday] = useState('—');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authChecked || isLoadingAuth) return;
    if (!user || user.role !== 'admin') {
      navigate('/', { replace: true });
      return;
    }
    loadData();
  }, [user, authChecked, isLoadingAuth]);

  const loadData = async () => {
    setLoading(true);
    const [activity, users] = await Promise.all([
      base44.entities.UserActivity.list('-created_date', 200),
      base44.entities.User.list(),
    ]);

    setLogs(activity);
    setTotalUsers(users.length);

    const rituals = activity.filter(a => a.action === 'Saved to Grimoire');
    setTotalRituals(rituals.length);

    const todayStr = new Date().toDateString();
    const todayEmails = new Set(
      activity
        .filter(a => new Date(a.created_date).toDateString() === todayStr)
        .map(a => a.user_email)
    );
    setActiveToday(todayEmails.size);
    setLoading(false);
  };

  if (!authChecked || isLoadingAuth || !user) return null;
  if (user.role !== 'admin') return null;

  const cards = [
    { label: 'Total Users', value: totalUsers },
    { label: 'Total Rituals Saved', value: totalRituals },
    { label: 'Active Users Today', value: activeToday },
  ];

  return (
    <div style={{
      backgroundColor: '#0c0118', minHeight: '100vh',
      color: '#c4b5fd', fontFamily: 'serif', padding: '48px 32px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '5px', margin: '0 0 8px' }}>
          ✦ Restricted Access
        </p>
        <h1 style={{ color: 'white', fontSize: '2rem', fontStyle: 'italic', fontWeight: 300, margin: 0 }}>
          Admin Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
        {cards.map(card => (
          <div key={card.label} style={{
            background: '#12022a',
            border: '1px solid #3b0764',
            borderRadius: '6px',
            padding: '28px 32px',
            minWidth: '160px',
            flex: '1',
          }}>
            <p style={{ fontSize: '8px', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 12px', fontFamily: 'sans-serif' }}>
              {card.label}
            </p>
            <p style={{ fontSize: '2.4rem', color: 'white', margin: 0, fontWeight: 300 }}>
              {loading ? '·' : card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Activity Log Table */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '8px', color: '#4c1d95', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 20px', fontFamily: 'sans-serif' }}>
          Activity Log
        </p>
      </div>

      <div style={{ border: '1px solid #1e0a3c', borderRadius: '6px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#0e0120' }}>
              <th style={headCell}>User Email</th>
              <th style={headCell}>Action</th>
              <th style={headCell}>Details</th>
              <th style={headCell}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ ...cell, textAlign: 'center', color: '#4c1d95', fontStyle: 'italic' }}>Loading…</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={4} style={{ ...cell, textAlign: 'center', color: '#4c1d95', fontStyle: 'italic' }}>No activity recorded yet.</td></tr>
            ) : (
              logs.map(log => (
                <tr key={log.id} style={{ transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#12022a'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={cell}>{log.user_email}</td>
                  <td style={{ ...cell, color: '#e9d5ff' }}>{log.action}</td>
                  <td style={{ ...cell, color: '#6d28d9', fontSize: '11px' }}>{log.metadata || '—'}</td>
                  <td style={{ ...cell, color: '#4c1d95', fontFamily: 'sans-serif', fontSize: '11px' }}>
                    {new Date(log.created_date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '48px', background: 'none', border: 'none',
          color: '#3b0764', fontSize: '9px', textTransform: 'uppercase',
          letterSpacing: '4px', cursor: 'pointer', fontFamily: 'sans-serif',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
        onMouseLeave={e => e.currentTarget.style.color = '#3b0764'}
      >
        ← Return to the Garden
      </button>
    </div>
  );
}