import { useEffect, useRef, useState, useCallback } from 'react'

// Breathing cycle phases (seconds)
const INHALE_DURATION = 4
const HOLD_DURATION = 3
const EXHALE_DURATION = 4
const TOTAL_CYCLE = INHALE_DURATION + HOLD_DURATION + EXHALE_DURATION

// Circle sizes as fraction of container (0–1)
const MIN_CIRCLE_RATIO = 0.60   // small circle
const MAX_CIRCLE_RATIO = 0.85   // big circle (lungs inflated)

// Dot colors
const DOT_COLOR_INHALE = '#C5A44E'
const DOT_COLOR_EXHALE = '#C4A0A0'

type Phase = 'inhale' | 'hold' | 'exhale'

function getPhaseState(elapsed: number): { phase: Phase; phaseProgress: number } {
  const cycleTime = elapsed % TOTAL_CYCLE
  if (cycleTime < INHALE_DURATION) {
    return { phase: 'inhale', phaseProgress: cycleTime / INHALE_DURATION }
  } else if (cycleTime < INHALE_DURATION + HOLD_DURATION) {
    return { phase: 'hold', phaseProgress: (cycleTime - INHALE_DURATION) / HOLD_DURATION }
  } else {
    return { phase: 'exhale', phaseProgress: (cycleTime - INHALE_DURATION - HOLD_DURATION) / EXHALE_DURATION }
  }
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

export default function BreathingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState('W D E C H')
  const [size, setSize] = useState(0)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Responsive sizing – observe container width
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const w = el.clientWidth
      // Square canvas, capped at 400 on desktop
      const s = Math.min(w, 400)
      setSize(s)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, s: number, elapsed: number) => {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, s * dpr, s * dpr)
      ctx.save()
      ctx.scale(dpr, dpr)

      const { phase, phaseProgress } = getPhaseState(elapsed)
      const cx = s / 2
      const cy = s / 2
      const half = s / 2

      // Circle radius
      const minR = half * MIN_CIRCLE_RATIO
      const maxR = half * MAX_CIRCLE_RATIO
      let circleRadius: number
      if (phase === 'inhale') {
        circleRadius = minR + (maxR - minR) * easeInOutSine(phaseProgress)
      } else if (phase === 'hold') {
        circleRadius = maxR
      } else {
        circleRadius = maxR - (maxR - minR) * easeInOutSine(phaseProgress)
      }

      // Draw circle
      ctx.beginPath()
      ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2)
      ctx.strokeStyle = '#3D352E'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Dot angle (clock: 0 = top, CW)
      let clockAngle: number
      if (phase === 'inhale') {
        clockAngle = easeInOutSine(phaseProgress) * 180
      } else if (phase === 'hold') {
        clockAngle = 180
      } else {
        clockAngle = 180 + easeInOutSine(phaseProgress) * 180
      }

      const rad = ((clockAngle - 90) * Math.PI) / 180
      const dotRadius = Math.max(8, s * 0.03) // scale dot too
      const dotX = cx + circleRadius * Math.cos(rad)
      const dotY = cy + circleRadius * Math.sin(rad)

      const dotColor = phase === 'exhale' ? DOT_COLOR_EXHALE : DOT_COLOR_INHALE

      ctx.beginPath()
      ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2)
      ctx.fillStyle = dotColor
      ctx.shadowColor = dotColor
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0

      // Update label via state (drawn as HTML overlay for crispness)
      if (phase === 'inhale') setLabel('W D E C H')
      else if (phase === 'hold') setLabel('W S T R Z Y M A J')
      else setLabel('W Y D E C H')

      ctx.restore()
    },
    [],
  )

  // Animation loop – restarts when size changes
  useEffect(() => {
    if (!isVisible || size === 0) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    if (!startTimeRef.current) startTimeRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000
      draw(ctx, size, elapsed)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [isVisible, size, draw])

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-sand relative overflow-hidden">
      <div className="max-w-md mx-auto px-6 lg:px-8">
        <div
          className={`flex flex-col items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* responsive square container */}
          <div ref={containerRef} className="w-full flex justify-center">
            <div className="relative" style={{ width: size || '100%', height: size || 'auto', aspectRatio: '1' }}>
              <canvas ref={canvasRef} className="absolute inset-0" />

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-charcoal font-sans text-sm sm:text-base md:text-lg font-semibold tracking-[0.25em] uppercase select-none">
                  {label}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-warmgrey text-center text-sm tracking-wider uppercase">
            Oddychaj razem ze mną
          </p>
        </div>
      </div>
    </section>
  )
}
