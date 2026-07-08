import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getLenis } from '../lib/lenis';

export default function Hero() {
  const magneticBtn = useRef(null);
  const magneticContent = useRef(null);

  // Entrance animation, once on mount
  useEffect(() => {
    gsap.set('.hero-title-line', { yPercent: 100, opacity: 0 });
    gsap.set('.hero-el', { y: 20, opacity: 0 });
    gsap.set('.nav-item', { y: -10, opacity: 0 });

    const tl = gsap.timeline();
    tl.to('.nav-item', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
      .to('.hero-title-line', { yPercent: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power4.out' }, '-=0.5')
      .to('.hero-el', { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all' }, '-=0.6');

    return () => tl.kill();
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const btn = magneticBtn.current;
    const content = magneticContent.current;
    if (!btn || !content) return;

    function onMove(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: 'power3.out' });
      gsap.to(content, { x: x * 0.1, y: y * 0.1, duration: 0.4, ease: 'power3.out' });
    }
    function onLeave() {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      gsap.to(content, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    }
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <header className="relative h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#fafafa] pt-20">
      <div className="hero-bg absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-accent-light/20 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse-slow"></div>
      <div className="hero-bg absolute bottom-[10%] right-[20%] w-[400px] h-[400px] bg-brand-200/40 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div className="hero-el inline-flex items-center space-x-2 border border-brand-200/50 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase shiny-text">New Collection 2026</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] text-brand-950 leading-[1.1] mb-6 tracking-tight overflow-hidden">
          <span className="block hero-title-line">Elevate your</span>
          <span className="block hero-title-line text-brand-500 italic">everyday.</span>
        </h1>

        <p className="hero-el text-lg md:text-xl text-brand-600 mb-12 max-w-2xl mx-auto font-light">
          Discover meticulously crafted essentials designed for the modern aesthete. Where form meets flawless function.
        </p>

        <div className="hero-el magnetic-btn relative inline-block p-4 cursor-pointer" ref={magneticBtn}>
          <a href="#catalog" className="magnetic-content relative z-10 inline-flex items-center justify-center px-10 py-5 bg-brand-950 text-white text-sm font-medium rounded-full transition-colors duration-300 hover:bg-brand-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" ref={magneticContent}>
            Shop Collection
            <i className="ph ph-arrow-right ml-3"></i>
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => getLenis()?.scrollTo('#featured')}
      >
        <i className="ph ph-arrow-down text-2xl"></i>
      </div>
    </header>
  );
}
