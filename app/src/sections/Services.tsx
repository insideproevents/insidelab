import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Eventos Corporativos',
    description: 'Conferencias, lanzamientos y experiencias de marca—planificados de principio a fin.',
    image: '/service_corporate.jpg',
    href: '#corporate',
  },
  {
    title: 'Bodas',
    description: 'Diseño, coordinación y proveedores—para que tu día sea perfecto y sin estrés.',
    image: '/service_wedding.jpg',
    href: '#weddings',
  },
  {
    title: 'Fiestas Privadas',
    description: 'Backline, iluminación y equipo—construido para la pista de baile.',
    image: '/service_party.jpg',
    href: '#parties',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !label || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(label, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0)
        .fromTo(
          cards[0],
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          cards[1],
          { y: '100vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          cards[2],
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // Card content stagger
      cards.forEach((card, i) => {
        const content = card?.querySelectorAll('.card-content');
        if (content) {
          scrollTl.fromTo(
            content,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02 },
            0.14 + i * 0.02
          );
        }
      });

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          cards[0],
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cards[1],
          { y: 0, opacity: 1 },
          { y: '-35vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cards[2],
          { x: 0, opacity: 1 },
          { x: '40vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-pinned bg-navy-900 z-30 min-h-screen"
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="absolute left-[7vw] top-[10vh] font-mono text-xs tracking-[0.12em] text-white/60 uppercase z-10"
      >
        Servicios
      </p>

      {/* Service Cards */}
      <div className="absolute inset-0 flex">
        {services.map((service, index) => (
          <div
            key={service.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="relative h-full overflow-hidden group cursor-pointer"
            style={{
              width: index === 0 ? '34vw' : '33vw',
              left: index === 0 ? 0 : index === 1 ? '34vw' : '67vw',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-[14vh] left-[2.2vw] right-[2.2vw]">
              <h3 className="card-content font-display text-2xl lg:text-3xl text-white font-bold mb-3">
                {service.title}
              </h3>
              <p className="card-content text-sm lg:text-base text-white/70 mb-4 leading-relaxed max-w-[90%]">
                {service.description}
              </p>
              <a
                href={service.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(service.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="card-content inline-flex items-center gap-2 text-lime-400 text-sm font-medium hover:gap-3 transition-all duration-300"
              >
                Explorar <ArrowRight size={16} />
              </a>
            </div>

            {/* Hover Border */}
            <div className="absolute inset-0 border-2 border-lime-400/0 group-hover:border-lime-400/30 transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
