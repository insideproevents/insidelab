import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Búsqueda de venue & visitas',
  'Diseño de escenario + integración AV',
  'Run-of-show & soporte a speakers',
];

const Corporate = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const panel = panelRef.current;
    const line = lineRef.current;

    if (!section || !image || !panel || !line) return;

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
        .fromTo(
          image,
          { x: '-70vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          panel,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.06
        )
        .fromTo(
          line,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none' },
          0.12
        )
        .fromTo(
          panel.querySelectorAll('.animate-item'),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02 },
          0.14
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          image,
          { x: 0, scale: 1, opacity: 1 },
          { x: '-10vw', scale: 1.05, opacity: 0.35, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          panel,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="corporate" className="section-pinned bg-navy-900 z-40">
      {/* Left Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[56vw] h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/corporate_panel.jpg"
          alt="Corporate event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900/50" />
      </div>

      {/* Vertical Line */}
      <div
        ref={lineRef}
        className="absolute left-[56vw] top-[12vh] w-px h-[76vh] bg-white/10 origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Right Text Panel */}
      <div
        ref={panelRef}
        className="absolute left-[56vw] top-0 w-[44vw] h-full bg-navy-900 flex items-center"
        style={{ opacity: 0 }}
      >
        <div className="px-[6vw]">
          <p className="animate-item font-mono text-xs tracking-[0.12em] text-white/60 uppercase mb-6">
            Eventos Corporativos
          </p>
          <h2 className="animate-item font-display text-section text-white mb-6 leading-tight">
            Conferencias, lanzamientos & experiencias de marca
          </h2>
          <p className="animate-item text-base text-white/70 leading-relaxed mb-8">
            Desde la agenda hasta el AV—manejamos logística, escenografía y 
            coordinación on-site para que tu equipo pueda mantenerse presente.
          </p>

          {/* Features */}
          <ul className="animate-item space-y-3 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-white/80">
                <Check className="w-4 h-4 text-lime-400 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="animate-item flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-sm font-medium rounded-lg hover:border-white/60 transition-colors duration-300">
              <Download size={16} /> Descargar capacidades
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-400 text-navy-900 text-sm font-semibold rounded-lg hover:bg-lime-300 transition-colors duration-300"
            >
              Solicitar cotización <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Corporate;
