import { useState } from 'react';

export default function FederatedVsUnified() {
  const [unified, setUnified] = useState(false);

  const accent = '#D4920A';
  const svgDims = { width: 400, height: 300 };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setUnified(!unified)}
          style={{
            background: unified ? accent : 'rgba(255,255,255,0.03)',
            border: unified ? `1px solid ${accent}40` : '1px solid rgba(255,255,255,0.06)',
            color: unified ? '#000' : '#f4f4f5',
            padding: '0.5rem 1.25rem',
            borderRadius: '1rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {unified ? 'Show Federated' : 'Show Unified'}
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <svg width="100%" viewBox={`0 0 ${svgDims.width} ${svgDims.height}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block', overflow: 'visible' }}>
          {!unified ? (
            <>
              <line x1="50" y1="50" x2="200" y2="150" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />
              <line x1="100" y1="40" x2="180" y2="180" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />
              <line x1="350" y1="60" x2="200" y2="150" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />
              <line x1="380" y1="150" x2="220" y2="140" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />
              <line x1="300" y1="280" x2="180" y2="170" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />
              <line x1="50" y1="250" x2="140" y2="160" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />
              <line x1="100" y1="280" x2="200" y2="160" stroke={`${accent}20`} strokeWidth="1" strokeDasharray="4,4" />

              <circle cx="50" cy="50" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="50" y="54" textAnchor="middle" fontSize="10" fill="#f4f4f5" fontWeight="600">Todo</text>

              <circle cx="100" cy="40" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="100" y="44" textAnchor="middle" fontSize="10" fill="#f4f4f5" fontWeight="600">Habit</text>

              <circle cx="350" cy="60" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="350" y="64" textAnchor="middle" fontSize="9" fill="#f4f4f5" fontWeight="600">Journal</text>

              <circle cx="380" cy="150" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="380" y="154" textAnchor="middle" fontSize="9" fill="#f4f4f5" fontWeight="600">Cal</text>

              <circle cx="300" cy="280" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="300" y="284" textAnchor="middle" fontSize="9" fill="#f4f4f5" fontWeight="600">Mail</text>

              <circle cx="50" cy="250" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="50" y="254" textAnchor="middle" fontSize="9" fill="#f4f4f5" fontWeight="600">Notes</text>

              <circle cx="100" cy="280" r="22" fill="rgba(255,255,255,0.03)" stroke={`${accent}40`} strokeWidth="1" />
              <text x="100" y="284" textAnchor="middle" fontSize="9" fill="#f4f4f5" fontWeight="600">Music</text>

              <circle cx="200" cy="150" r="22" fill="rgba(255,255,255,0.02)" stroke={`${accent}20`} strokeWidth="1" opacity="0.4" />
              <text x="200" y="152" textAnchor="middle" fontSize="8" fill="#a1a1aa" fontWeight="500">Brain?</text>
            </>
          ) : (
            <>
              <circle cx="200" cy="150" r="90" fill="none" stroke={`${accent}20`} strokeWidth="1" />

              <line x1="200" y1="60" x2="200" y2="150" stroke={`${accent}20`} strokeWidth="1" />
              <line x1="200" y1="150" x2="273" y2="150" stroke={`${accent}20`} strokeWidth="1" />
              <line x1="200" y1="150" x2="200" y2="240" stroke={`${accent}20`} strokeWidth="1" />
              <line x1="200" y1="150" x2="127" y2="150" stroke={`${accent}20`} strokeWidth="1" />

              <circle cx="200" cy="85" r="18" fill="rgba(255,255,255,0.02)" stroke={accent} strokeWidth="1" />
              <text x="200" y="88" textAnchor="middle" fontSize="9" fill={accent} fontWeight="600">Todo</text>

              <circle cx="265" cy="150" r="18" fill="rgba(255,255,255,0.02)" stroke={accent} strokeWidth="1" />
              <text x="265" y="153" textAnchor="middle" fontSize="9" fill={accent} fontWeight="600">Cal</text>

              <circle cx="200" cy="215" r="18" fill="rgba(255,255,255,0.02)" stroke={accent} strokeWidth="1" />
              <text x="200" y="218" textAnchor="middle" fontSize="9" fill={accent} fontWeight="600">Journal</text>

              <circle cx="135" cy="150" r="18" fill="rgba(255,255,255,0.02)" stroke={accent} strokeWidth="1" />
              <text x="135" y="153" textAnchor="middle" fontSize="9" fill={accent} fontWeight="600">Habit</text>

              <circle cx="200" cy="150" r="30" fill="rgba(255,255,255,0.02)" stroke={accent} strokeWidth="1.5" />
              <text x="200" y="147" textAnchor="middle" fontSize="10" fill={accent} fontWeight="700">AI</text>
              <text x="200" y="159" textAnchor="middle" fontSize="8" fill="#a1a1aa">Context</text>
            </>
          )}
        </svg>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        textAlign: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: unified ? '#71717a' : accent,
            transition: 'color 0.3s ease',
            marginBottom: '0.5rem'
          }}>
            Federated
          </p>
          <p style={{
            margin: 0,
            fontSize: '1.8rem',
            fontFamily: 'monospace',
            fontWeight: 700,
            color: unified ? '#71717a' : accent,
            transition: 'color 0.3s ease'
          }}>
            7+
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.75rem',
            color: '#a1a1aa'
          }}>
            context switches
          </p>
        </div>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <p style={{
            margin: 0,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: !unified ? '#71717a' : accent,
            transition: 'color 0.3s ease',
            marginBottom: '0.5rem'
          }}>
            Unified
          </p>
          <p style={{
            margin: 0,
            fontSize: '1.8rem',
            fontFamily: 'monospace',
            fontWeight: 700,
            color: !unified ? '#71717a' : accent,
            transition: 'color 0.3s ease'
          }}>
            0
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.75rem',
            color: '#a1a1aa'
          }}>
            context switches
          </p>
        </div>
      </div>
    </div>
  );
}
