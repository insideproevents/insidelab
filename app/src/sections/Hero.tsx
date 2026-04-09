import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, MessageCircle, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const nav = navRef.current;
    const scrollCue = scrollCueRef.current;
    const socials = socialsRef.current;

    if (!section || !bg || !content || !nav || !scrollCue || !socials) return;

    const ctx = gsap.context(() => {
      // Load animation timeline
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(bg, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.2 })
        .fromTo(nav, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.2)
        .fromTo(
          content.querySelectorAll('.animate-item'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          0.4
        )
        .fromTo(
          [scrollCue, socials],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.8
        );

      // Scroll-driven animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([bg, content, nav, scrollCue, socials], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(
          content,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bg,
          { scale: 1, x: 0 },
          { scale: 1.06, x: '-6vw', ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [nav, scrollCue, socials],
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.85
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-navy-900 z-10 min-h-screen"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_event_crowd.jpg"
          alt="Event crowd"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,10,18,0.85) 0%, rgba(7,10,18,0.5) 55%, rgba(7,10,18,0.7) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute left-[7vw] top-[28vh] w-[46vw] z-10"
      >
        <p className="animate-item font-mono text-xs tracking-[0.12em] text-white/60 uppercase mb-6">
          Producción de Eventos & Rental
        </p>
        <h1 className="animate-item font-display text-hero text-white uppercase mb-6">
          INSIDE<span className="text-lime-400">:</span>LAB
        </h1>
        <p className="animate-item text-lg lg:text-xl text-white/80 max-w-md mb-8 leading-relaxed">
          Desde backline hasta iluminación—construido para el momento.
        </p>
        <div className="animate-item flex flex-wrap gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-lime-400 text-navy-900 font-semibold rounded-lg hover:bg-lime-300 transition-colors duration-300"
          >
            Solicitar cotización
          </a>
          <a
            href="#equipment"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#equipment')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:border-white/60 transition-colors duration-300"
          >
            Ver equipos
          </a>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute left-[4vw] bottom-[6vh] z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="font-mono text-xs tracking-[0.12em] text-white/50 uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>

      {/* Socials */}
      <div
        ref={socialsRef}
        className="absolute right-[4vw] bottom-[6vh] z-20 flex items-center gap-4"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-lime-400 transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-lime-400 transition-colors duration-300"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/50 hover:text-lime-400 transition-colors duration-300"
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
