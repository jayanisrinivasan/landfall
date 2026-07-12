import { useEffect, useRef } from 'react'
import { getRiskColor, RiskLevel } from '../data/occupations'

interface DISBarProps {
  score: number
  level: RiskLevel
  size?: 'small' | 'large'
  animated?: boolean
}

export default function DISBar({ score, level, size = 'small', animated = true }: DISBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated || !barRef.current) return
    const bar = barRef.current
    bar.style.width = '0%'
    const timeout = setTimeout(() => {
      bar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      bar.style.width = `${score * 100}%`
    }, 100)
    return () => clearTimeout(timeout)
  }, [score, animated])

  const color = getRiskColor(level)
  const height = size === 'large' ? '6px' : '3px'

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        height,
        background: 'var(--navy-border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={barRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: animated ? '0%' : `${score * 100}%`,
            background: color,
          }}
        />
      </div>
    </div>
  )
}
