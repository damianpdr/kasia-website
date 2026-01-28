import { useEffect, useRef, useState } from 'react'
import './App.css'
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  Instagram, 
  ArrowRight,
  Quote,
  Brain,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Determine active section
      const sections = ['hero', 'about', 'quote', 'services', 'process', 'testimonials', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-sand/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('hero')}
              className={`font-serif text-2xl transition-colors ${
                scrolled ? 'text-charcoal hover:text-terracotta' : 'text-white hover:text-terracotta'
              }`}
            >
              Kasia Podraza
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'about', label: 'O mnie' },
                { id: 'services', label: 'Oferta' },
                { id: 'process', label: 'Jak pracuję' },
                { id: 'testimonials', label: 'Opinie' },
                { id: 'contact', label: 'Kontakt' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === item.id 
                      ? 'text-terracotta' 
                      : scrolled 
                        ? 'text-charcoal hover:text-terracotta'
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                  )}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-animated-gradient flex items-center gap-2 text-charcoal text-sm font-semibold px-4 py-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M27.333 32h-19.333c-2.205 0-4-1.795-4-4v-24c0-2.252 2.508-4 4.667-4h18c0.367 0 0.667 0.299 0.667 0.667s-0.3 0.667-0.667 0.667h-18c-1.5 0-3.333 1.231-3.333 2.667v1.333c0 1.436 1.833 2.667 3.333 2.667h18.667c0.367 0 0.667 0.299 0.667 0.667v22.667c0 0.367-0.3 0.667-0.667 0.667zM5.333 8.017v19.983c0 1.472 1.196 2.667 2.667 2.667h18.667v-21.333h-18c-1.157 0-2.416-0.503-3.333-1.316zM25.333 5.333h-17.333c-0.368 0-0.667-0.299-0.667-0.667s0.299-0.667 0.667-0.667h17.333c0.367 0 0.667 0.299 0.667 0.667s-0.3 0.667-0.667 0.667z"/>
                </svg>
                Umów wizytę
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-charcoal"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-sand/98 backdrop-blur-md border-t border-border">
            <div className="px-6 py-6 space-y-4">
              {[
                { id: 'about', label: 'O mnie' },
                { id: 'services', label: 'Oferta' },
                { id: 'process', label: 'Jak pracuję' },
                { id: 'testimonials', label: 'Opinie' },
                { id: 'contact', label: 'Kontakt' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-lg font-serif text-charcoal hover:text-terracotta transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Quote Section */}
      <QuoteSection />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA/Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

// Hero Section
function HeroSection({ scrollToSection }: { scrollToSection: (id: string) => void }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero_portrait.jpg" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Brain Illustration - Top Right */}
      <div className="absolute -top-40 right-0 translate-x-1/3 w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] opacity-[0.25] z-10 pointer-events-none">
        <img 
          src="/images/brain_hero.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Text Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className={`max-w-xl space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-sm tracking-[0.3em] uppercase text-white/70">
            Psycholog &nbsp;•&nbsp; Coach
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
            Jeśli chcesz lepiej
            <br />
            <span className="italic text-terracotta">poznać siebie</span>
            <br />
            i odważyć się na
            <br />
            <span className="italic text-terracotta">zmiany</span>
          </h1>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-terracotta hover:bg-terracotta/90 text-white rounded-full px-8 py-5 text-sm font-medium tracking-wider uppercase"
            >
              Umów bezpłatną sesję
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-sand"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-4">
              <p className="text-terracotta font-medium tracking-wider text-sm uppercase">
                O mnie
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
                Wierzę w potencjał 
                <span className="italic"> każdego człowieka</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-warmgrey leading-relaxed">
              <p>
                Niedawno ukończyłam studia z psychologii, co pozwoliło mi pogłębić 
                moje zrozumienie funkcjonowania umysłu i mechanizmów, które kształtują 
                nasze myśli, emocje i zachowania.
              </p>
              <p>
                Wierzę, że każdy z nas ma w sobie potencjał do rozwoju i zmiany. 
                Moja praca polega na towarzyszeniu Ci w odkrywaniu Twoich zasobów 
                i budowaniu życia, które jest dla Ciebie autentyczne i satysfakcjonujące.
              </p>
              <p>
                Łączę wiedzę akademicką z empatią i autentycznością, tworząc 
                przestrzeń, w której możesz poczuć się bezpiecznie i zrozumiany.
              </p>
            </div>
          </div>
          
          {/* Right Column */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h3 className="font-serif text-2xl text-charcoal mb-6">
                Moje kwalifikacje
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Magister Psychologii', desc: 'Uniwersytet Jagielloński' },
                  { title: 'Coach ACC', desc: 'International Coaching Federation' },
                  { title: 'Terapeuta', desc: 'Certyfikowany specjalista' },
                  { title: 'Trener Umiejętności', desc: 'Komunikacja i rozwój osobisty' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">{item.title}</p>
                      <p className="text-sm text-warmgrey">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Quote Section
function QuoteSection() {
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="quote" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-sage relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <Quote className="w-12 h-12 text-white/40 mx-auto mb-8" />
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-relaxed mb-8">
            W moim podejściu łączę empatię z profesjonalizmem, 
            tworząc przestrzeń, w której możesz poczuć się 
            <span className="italic"> bezpiecznie i zrozumiany.</span>
          </blockquote>
          <p className="text-white/80 font-medium">— Kasia Podraza</p>
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      image: '/images/service_therapy.jpg',
      title: 'Konsultacje psychologiczne',
      description: 'Indywidualne spotkania, podczas których wspólnie eksplorujemy Twoje potrzeby, wyzwania i cele. Pierwszy krok do zmiany.',
      icon: Brain,
    },
    {
      image: '/images/service_nature.jpg',
      title: 'Terapia indywidualna',
      description: 'Regularna praca nad głębszymi wzorami, emocjami i przekonaniami. Proces transformacji prowadzący do trwałych zmian.',
      icon: Heart,
    },
    {
      image: '/images/service_growth.jpg',
      title: 'Rozwój osobisty',
      description: 'Coaching i wsparcie w realizacji celów, budowaniu pewności siebie i odkrywaniu własnego potencjału.',
      icon: Sparkles,
    },
  ]

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-sand relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-terracotta font-medium tracking-wider text-sm uppercase mb-4">
            Oferta
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Jak mogę Ci <span className="italic">pomóc</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-terracotta" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-warmgrey text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <button className="inline-flex items-center text-terracotta text-sm font-medium group/btn">
                  Dowiedz się więcej
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Section
function ProcessSection() {
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: '01',
      title: 'Pierwsze spotkanie',
      subtitle: 'Poznanie Twoich potrzeb',
      description: 'Na pierwszej konsultacji skupiamy się na poznaniu Ciebie, Twojej sytuacji i tego, co chcesz zmienić. To czas, abyśmy mogli ustalić, jak mogę Ci najlepiej pomóc.',
      image: '/images/process_1.jpg',
    },
    {
      number: '02',
      title: 'Proces terapeutyczny',
      subtitle: 'Praca nad zmianą',
      description: 'Wspólnie pracujemy nad głębszym zrozumieniem Twoich wzorów, emocji i przekonań. To proces, który wymaga zaangażowania, ale prowadzi do trwałych zmian.',
      image: '/images/process_2.jpg',
    },
  ]

  return (
    <section 
      id="process" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-sand"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-terracotta font-medium tracking-wider text-sm uppercase mb-4">
            Jak pracuję
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Twoja <span className="italic">ścieżka</span> do zmiany
          </h2>
        </div>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-20' : 'translate-x-20'}`
              }`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="relative rounded-2xl overflow-hidden shadow-soft">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                </div>
                {/* Large number watermark */}
                <div className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-4' : '-left-4'} text-[8rem] lg:text-[10rem] font-serif text-terracotta/10 leading-none select-none`}>
                  {step.number}
                </div>
              </div>
              
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-first' : ''} transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? 'translate-x-20' : '-translate-x-20'}`
              }`} style={{ transitionDelay: `${index * 200 + 100}ms` }}>
                <div className="space-y-2">
                  <p className="text-terracotta font-medium">{step.subtitle}</p>
                  <h3 className="font-serif text-3xl lg:text-4xl text-charcoal">
                    {step.title}
                  </h3>
                </div>
                <p className="text-warmgrey leading-relaxed text-lg">
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

// Testimonials Section
function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      quote: 'Kasia pomogła mi zrozumieć siebie na nowo. Dzięki niej odzyskałam pewność siebie i nauczyłam się dbać o swoje granice.',
      author: 'Anna K.',
      role: 'Klientka terapii indywidualnej',
    },
    {
      quote: 'Profesjonalne podejście połączone z ogromną empatią. Czułem się zrozumiany i wspierany na każdym etapie.',
      author: 'Michał P.',
      role: 'Klient coachingu',
    },
    {
      quote: 'Pierwsza osoba, która naprawdę mnie wysłuchała. Kasia ma dar do tworzenia bezpiecznej przestrzeni.',
      author: 'Karolina M.',
      role: 'Klientka terapii',
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-terracotta font-medium tracking-wider text-sm uppercase mb-4">
            Opinie
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
            Co mówią <span className="italic">o mnie</span>
          </h2>
        </div>
        
        <div className={`relative transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Testimonial Card */}
          <div className="bg-sand rounded-3xl p-8 lg:p-12 text-center">
            <Quote className="w-10 h-10 text-terracotta/40 mx-auto mb-6" />
            <blockquote className="font-serif text-2xl lg:text-3xl text-charcoal leading-relaxed mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div>
              <p className="font-medium text-charcoal">{testimonials[currentIndex].author}</p>
              <p className="text-sm text-warmgrey">{testimonials[currentIndex].role}</p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-terracotta w-6' : 'bg-charcoal/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-terracotta relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className={`space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
            Rozpocznij swoją <span className="italic">podróż</span>
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Pierwszy krok jest najtrudniejszy, ale warto go postawić. 
            Skontaktuj się ze mną i umów na bezpłatną konsultację.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-terracotta hover:bg-white/90 rounded-full px-8 py-6 text-base"
            >
              <Mail className="mr-2 w-4 h-4" />
              Napisz do mnie
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-terracotta rounded-full px-8 py-6 text-base"
            >
              <Phone className="mr-2 w-4 h-4" />
              Zadzwoń
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <a href="mailto:kontakt@kasiapodraza.pl" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                kontakt@kasiapodraza.pl
              </a>
              <a href="tel:+48600000000" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +48 600 000 000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="font-serif text-2xl text-white/90">
            Kasia Podraza
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="mailto:kontakt@kasiapodraza.pl"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="tel:+48600000000"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-white/50 text-sm">
            © 2025 Kasia Podraza. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
