import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Brand names for the carousel (using text instead of images for reliability)
const brands = [
  'Pioneer DJ',
  'Allen & Heath',
  'Yamaha',
  'JBL',
  'Shure',
  'Sennheiser',
  'Martin Audio',
  'Chauvet',
  'MA Lighting',
  'Avolites',
  'DAS Audio',
  'LD Systems',
];

const Brands = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const carousel = carouselRef.current;

    if (!section || !title || !carousel) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel animation
      gsap.fromTo(
        carousel,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative bg-navy-900 py-20 z-[85]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12">
          <p className="font-mono text-xs tracking-[0.12em] text-white/60 uppercase mb-4">
            Marcas que confían
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-white">
            Equipamiento profesional de las mejores marcas
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative overflow-hidden">
          {/* First row - scrolling left */}
          <div className="flex animate-scroll-left mb-6">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 px-8 py-4 mx-3 bg-navy-800/50 rounded-lg border border-white/5 hover:border-lime-400/30 transition-colors duration-300"
              >
                <span className="font-display text-lg text-white/80 whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>

          {/* Second row - scrolling right */}
          <div className="flex animate-scroll-right">
            {[...brands.reverse(), ...brands].map((brand, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 px-8 py-4 mx-3 bg-navy-800/50 rounded-lg border border-white/5 hover:border-lime-400/30 transition-colors duration-300"
              >
                <span className="font-display text-lg text-white/80 whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Brands;
