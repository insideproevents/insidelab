import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteIconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quoteIcon = quoteIconRef.current;
    const text = textRef.current;
    const avatar = avatarRef.current;
    const name = nameRef.current;

    if (!section || !quoteIcon || !text || !avatar || !name) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          quoteIcon,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 0.06, ease: 'none' },
          0
        )
        .fromTo(
          text,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          avatar,
          { y: '18vh', scale: 0.85, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.14
        )
        .fromTo(
          name,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          text,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          [avatar, name],
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-navy-900 z-[80] min-h-screen">
      {/* Quote Icon Background */}
      <div
        ref={quoteIconRef}
        className="absolute left-1/2 top-[46vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <Quote className="w-[220px] h-[220px] text-white" strokeWidth={1} />
      </div>

      {/* Quote Text */}
      <div className="absolute left-1/2 top-[46vh] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,980px)] text-center z-10">
        <p
          ref={textRef}
          className="font-display text-2xl lg:text-4xl text-white leading-snug mb-12"
          style={{ opacity: 0 }}
        >
          "INSIDE:LAB convirtió nuestro lanzamiento en una experiencia real—señales precisas, 
          sonido limpio y un equipo que realmente resuelve problemas sobre la marcha."
        </p>

        {/* Avatar */}
        <div
          ref={avatarRef}
          className="mx-auto mb-4"
          style={{ opacity: 0 }}
        >
          <img
            src="/testimonial_portrait.jpg"
            alt="Daniela Rios"
            className="w-24 h-24 rounded-full object-cover border-2 border-white/20 mx-auto"
          />
        </div>

        {/* Name & Role */}
        <div ref={nameRef} style={{ opacity: 0 }}>
          <p className="font-display text-lg text-white font-semibold">
            Daniela Rios
          </p>
          <p className="text-sm text-white/60">
            Marketing Director, North Region
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
