import React from 'react';
import { Wrench, Compass, Radio, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #1d1813, #120f0c)',
        border: '1px solid #3d3226',
        borderRadius: '16px',
        padding: '3rem',
        maxWidth: '600px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#f59e0b' }}>
          <Wrench size={32} />
          <Compass size={32} />
          <Radio size={32} />
        </div>
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '2.5rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Vintage Rides
        </h1>
        <p style={{ color: '#9c9285', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Nostalgic Interactive Retro Indian Motorcycle Garage Experience
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1.2rem',
          backgroundColor: '#272018',
          border: '1px solid #4a3c2c',
          borderRadius: '20px',
          color: '#fbbf24',
          fontSize: '0.9rem',
          fontFamily: 'JetBrains Mono, monospace'
        }}>
          <Sparkles size={16} />
          <span>Project Initialized Successfully</span>
        </div>
      </div>
    </div>
  );
}
