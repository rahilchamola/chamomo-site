import { useState } from 'react';

export default function FederatedVsUnified() {
  const [unified, setUnified] = useState(false);

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
            background: '#D4920A',
            border: 'none',
            color: '#000',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#e5a41f'}
          onMouseLeave={(e) => e.target.style.background = '#D4920A'}
        >
          {unified ? 'Show Federated' : 'Show Unified'}
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <svg width={svgDims.width} height={svgDims.height} style={{ overflow: 'visible' }}>
          {!unified ? (
            // Federated view
            <>
              {/* Messy connection lines */}
              <line x1="50" y1="50" x2="200" y2="150" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
              <line x1="100" y1="40" x2="180" y2="180" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
              <line x1="350" y1="60" x2="200" y2="150" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
              <line x1="380" y1="150" x2="220" y2="140" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
              <line x1="300" y1="280" x2="180" y2="170" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
              <line x1="50" y1="250" x2="140" y2="160" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
              <line x1="100" y1="280" x2="200" y2="160" stroke="#444" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />

              {/* Scattered nodes */}
              <circle cx="50" cy="50" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="50" y="56" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">Todo</text>

              <circle cx="100" cy="40" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="100" y="46" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">Habit</text>

              <circle cx="350" cy="60" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="350" y="66" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">Journal</text>

              <circle cx="380" cy="150" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="380" y="156" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">Cal</text>

              <circle cx="300" cy="280" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="300" y="286" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">Mail</text>

              <circle cx="50" cy="250" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="50" y="256" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">Notes</text>

              <circle cx="100" cy="280" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" />
              <text x="100" y="286" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">Music</text>

              <circle cx="200" cy="150" r="28" fill="#5a6b7c" stroke="#444" strokeWidth="2" opacity="0.5" />
              <text x="200" y="154" textAnchor="middle" fontSize="10" fill="#999" fontWeight="600">Brain?</text>
            </>
          ) : (
            // Unified view
            <>
              {/* Outer circle with segments */}
              <circle cx="200" cy="150" r="90" fill="none" stroke="#D4920A" strokeWidth="2" opacity="0.3" />

              {/* Segment lines */}
              <line x1="200" y1="60" x2="200" y2="150" stroke="#D4920A" strokeWidth="1.5" opacity="0.4" />
              <line x1="200" y1="150" x2="273" y2="150" stroke="#D4920A" strokeWidth="1.5" opacity="0.4" />
              <line x1="200" y1="150" x2="200" y2="240" stroke="#D4920A" strokeWidth="1.5" opacity="0.4" />
              <line x1="200" y1="150" x2="127" y2="150" stroke="#D4920A" strokeWidth="1.5" opacity="0.4" />

              {/* Segment labels */}
              <g>
                <circle cx="200" cy="85" r="22" fill="#2a2a2a" stroke="#D4920A" strokeWidth="1.5" />
                <text x="200" y="89" textAnchor="middle" fontSize="9" fill="#D4920A" fontWeight="600">Todo</text>
              </g>
              <g>
                <circle cx="265" cy="150" r="22" fill="#2a2a2a" stroke="#D4920A" strokeWidth="1.5" />
                <text x="265" y="154" textAnchor="middle" fontSize="9" fill="#D4920A" fontWeight="600">Cal</text>
              </g>
              <g>
                <circle cx="200" cy="215" r="22" fill="#2a2a2a" stroke="#D4920A" strokeWidth="1.5" />
                <text x="200" y="219" textAnchor="middle" fontSize="9" fill="#D4920A" fontWeight="600">Journal</text>
              </g>
              <g>
                <circle cx="135" cy="150" r="22" fill="#2a2a2a" stroke="#D4920A" strokeWidth="1.5" />
                <text x="135" y="154" textAnchor="middle" fontSize="9" fill="#D4920A" fontWeight="600">Habit</text>
              </g>

              {/* Central AI node */}
              <circle cx="200" cy="150" r="35" fill="#1a1a1a" stroke="#D4920A" strokeWidth="2" />
              <text x="200" y="148" textAnchor="middle" fontSize="11" fill="#D4920A" fontWeight="700">AI</text>
              <text x="200" y="161" textAnchor="middle" fontSize="9" fill="#999">Context</text>
            </>
          )}
        </svg>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ flex: 1, maxWidth: '200px' }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            fontWeight: 600,
            color: unified ? '#666' : '#D4920A',
            transition: 'color 0.3s ease'
          }}>
            {unified ? 'Federated' : 'Context Switches'}
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: unified ? '#666' : '#D4920A',
            transition: 'color 0.3s ease'
          }}>
            {unified ? '7+' : '7'}
          </p>
        </div>
        <div style={{ flex: 1, maxWidth: '200px' }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            fontWeight: 600,
            color: !unified ? '#666' : '#D4920A',
            transition: 'color 0.3s ease'
          }}>
            {!unified ? 'Unified' : 'Context Switches'}
          </p>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: !unified ? '#666' : '#D4920A',
            transition: 'color 0.3s ease'
          }}>
            {!unified ? '0' : '0'}
          </p>
        </div>
      </div>
    </div>
  );
}
