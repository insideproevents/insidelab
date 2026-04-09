import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const line = lineRef.current;
    const text = textRef.current;

    if (!section || !image || !line || !text) return;

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
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          line,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none' },
          0.08
        )
        .fromTo(
          text.querySelectorAll('.animate-item'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03 },
          0.1
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          text,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          image,
          { x: 0, scale: 1, opacity: 1 },
          { x: '10vw', scale: 1.04, opacity: 0.35, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-navy-900 z-30 min-h-screen">
      {/* Text Block */}
      <div
        ref={textRef}
        className="absolute left-[7vw] top-[22vh] w-[40vw] z-10"
      >
        <p className="animate-item font-mono text-xs tracking-[0.12em] text-white/60 uppercase mb-6">
          Nosotros
        </p>
        <h2 className="animate-item font-display text-section text-white mb-8 leading-tight">
          Construimos eventos que se sienten vivos.
        </h2>
        <p className="animate-item text-base lg:text-lg text-white/70 leading-relaxed mb-8">
          INSIDE:LAB es un equipo pequeño con grandes capacidades—diseño de producción, 
          rental de backline, iluminación y crew. Planeamos inteligente, cargamos limpio 
          y mantenemos la sala conectada desde la primera señal hasta el último llamado.
        </p>
        <div className="animate-item flex flex-wrap gap-4">
          <a
            href="#team"
            className="inline-flex items-center gap-2 text-white/80 hover:text-lime-400 text-sm font-medium transition-colors duration-300"
          >
            Conoce al equipo <ArrowRight size={16} />
          </a>
          <a
            href="#work"
            className="px-5 py-2.5 border border-lime-400 text-lime-400 text-sm font-medium rounded-lg hover:bg-lime-400 hover:text-navy-900 transition-all duration-300"
          >
            Ver nuestro trabajo
          </a>
        </div>
      </div>

      {/* Vertical Line */}
      <div
        ref={lineRef}
        className="absolute left-[56vw] top-[10vh] w-px h-[80vh] bg-white/10 origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Image Panel */}
      <div
        ref={imageRef}
        className="absolute left-[56vw] top-0 w-[44vw] h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/about_mixer.jpg"
          alt="Audio mixer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/30 to-transparent" />
      </div>
    </section>
  );
};

export default About;
