import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      borderBottom: '1px solid',
      borderColor: scrolled ? 'var(--navy-border)' : 'transparent',
      background: scrolled ? 'rgba(10, 15, 30, 0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.2s ease',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px',
            background: 'var(--signal-red)',
            borderRadius: '50%',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--off-white)',
          }}>LANDFALL</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[
            { href: '/', label: 'Forecast' },
            { href: '/methodology', label: 'Methodology' },
            { href: '/signals', label: 'Signals' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              fontSize: '13px',
              color: 'var(--mid-grey)',
              letterSpacing: '0.04em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--off-white)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--mid-grey)')}
            >{label}</Link>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '11px',
              fontFamily: 'Space Mono, monospace',
              letterSpacing: '0.08em',
              color: 'var(--signal-red)',
              border: '1px solid var(--signal-red)',
              padding: '4px 10px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--signal-red)'
              e.currentTarget.style.color = 'var(--off-white)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--signal-red)'
            }}
          >PACKAGE ↗</a>
        </div>
      </div>
    </nav>
  )
}
