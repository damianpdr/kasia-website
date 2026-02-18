import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Bezpłatna konsultacja',
    description:
      'Poznajemy się, rozmawiamy o Twoich potrzebach i celach. Bez zobowiązań.',
  },
  {
    number: '02',
    title: 'Plan działania',
    description:
      'Wspólnie ustalamy ścieżkę pracy dostosowaną do Twoich indywidualnych potrzeb.',
  },
  {
    number: '03',
    title: 'Regularne sesje',
    description:
      'Pracujemy razem w bezpiecznej przestrzeni, krok po kroku zbliżając się do celu.',
  },
  {
    number: '04',
    title: 'Trwała zmiana',
    description:
      'Zyskujesz narzędzia i pewność siebie, by samodzielnie kontynuować swoją drogę.',
  },
]

export default function StepsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-sand"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-terracotta font-medium tracking-wider text-sm uppercase mb-4">
            Jak to działa
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Cztery kroki do <span className="italic">zmiany</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connector line – desktop only, between circles */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-charcoal/10" />
              )}

              <div className="relative text-center">
                {/* Number bubble */}
                <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6 relative z-10">
                  <span className="font-serif text-2xl text-sage">{step.number}</span>
                </div>

                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-warmgrey leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
