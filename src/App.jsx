import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Pointer, ArrowRight, CircleDashed, LayoutTemplate, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NoiseMap = () => (
  <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
  </svg>
);

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -10%',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-[3rem] w-[90%] max-w-5xl transition-all duration-500 text-background bg-transparent fill-mode-forwards [&.nav-scrolled]:bg-background/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:text-dark [&.nav-scrolled]:border [&.nav-scrolled]:border-dark/10 [&.nav-scrolled]:shadow-xl"
    >
      <div className="font-heading font-bold text-xl uppercase tracking-wider">Digiprinta</div>
      <div className="hidden md:flex items-center gap-8 font-heading text-sm font-semibold">
        <a href="#services" className="hover:-translate-y-[1px] transition-transform">Services</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
        <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Protocol</a>
      </div>
      <button className="magnetic-button bg-accent text-primary px-6 py-2 rounded-[2rem] font-heading font-bold text-sm">
        <span>Get a Quote</span>
      </button>
    </nav>
  );
};

const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-[100dvh] w-full overflow-hidden flex items-end">
      {/* Luxury Dark Marble / Architectural Shadows Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607688960-e095ff83135c?q=80&w=2670&auto=format&fit=crop")' }}
      />
      {/* Heavy primary-to-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10" />
      
      <div className="relative z-20 w-full px-6 md:px-16 pb-16 md:pb-24 max-w-7xl mx-auto flex flex-col items-start text-background">
        <h1 className="hero-element font-heading font-bold text-3xl md:text-5xl lg:text-7xl leading-tight tracking-tight mb-2">
          Digiprinta meets
        </h1>
        <h2 className="hero-element font-drama italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] text-accent mb-8">
          precision.
        </h2>
        <p className="hero-element font-heading text-lg md:text-xl text-background/80 max-w-xl mb-10 font-medium">
          Full service B2B merch company powered by experience.
        </p>
        <button className="hero-element magnetic-button bg-accent text-primary px-8 py-4 rounded-[2rem] font-heading font-bold text-lg flex items-center gap-2 group">
          <span>Get a Quote</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const ShufflerCard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Intuitive Sourcing', desc: 'Curated products that align with target aesthetics.', color: 'bg-dark text-background', offset: 0, scale: 1, zIndex: 3 },
    { id: 2, title: 'Rapid Prototyping', desc: 'Physical samples shipped to your office in 48 hours.', color: 'bg-accent text-primary', offset: -16, scale: 0.95, zIndex: 2 },
    { id: 3, title: 'Quality Assurance', desc: 'Every run is rigorously verified before final delivery.', color: 'bg-background text-dark border border-dark/20', offset: -32, scale: 0.9, zIndex: 1 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        
        // Recalculate styles
        return newCards.map((c, i) => ({
          ...c,
          offset: i === 0 ? 0 : i === 1 ? -16 : -32,
          scale: i === 0 ? 1 : i === 1 ? 0.95 : 0.9,
          zIndex: 3 - i
        }));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border border-dark/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col min-h-[400px]">
      <div className="mb-8">
        <h3 className="font-heading font-bold text-2xl text-dark mb-2">Diagnostic Shuffler</h3>
        <p className="font-heading text-dark/60 text-sm">We make merch easy to get right.</p>
      </div>
      <div className="relative flex-1 flex items-center justify-center">
        <div className="w-full max-w-[240px] relative h-[180px]">
          {cards.map((c) => (
            <div 
              key={c.id}
              className={`absolute inset-0 rounded-2xl p-5 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${c.color} shadow-xl flex flex-col justify-end`}
              style={{
                transform: `translateY(${c.offset}px) scale(${c.scale})`,
                zIndex: c.zIndex
              }}
            >
              <h4 className="font-heading font-bold mb-1">{c.title}</h4>
              <p className="opacity-80 text-xs font-heading font-medium">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const text = "> Initiating transparent pricing model...\n> Validating execution timelines...\n> Establishing direct communication channels...\n> Process: CLEAR.";
  const [displayed, setDisplayed] = useState("");
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 80%",
        onEnter: () => {
          let i = 0;
          const typing = setInterval(() => {
            setDisplayed(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(typing);
          }, 30);
          return () => clearInterval(typing);
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="bg-primary text-background rounded-[2rem] p-8 shadow-2xl relative flex flex-col min-h-[400px]">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h3 className="font-heading font-bold text-2xl text-background mb-2">Telemetry Typewriter</h3>
          <p className="font-heading text-background/60 text-sm">Clear process, pricing, communication.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-dark rounded-full">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-data text-[10px] text-accent tracking-widest uppercase">Live Feed</span>
        </div>
      </div>
      <div className="flex-1 bg-dark/50 rounded-xl p-5 border border-white/5 font-data text-sm text-[#A0A0B0] whitespace-pre-wrap flex flex-col justify-end">
        <span>{displayed}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" /></span>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const wrap = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Cursor enter
      tl.fromTo('.anim-cursor', 
        { x: -50, y: 150, opacity: 0 }, 
        { x: 140, y: 55, opacity: 1, duration: 1, ease: 'power2.inOut' }
      )
      // Click day
      .to('.anim-cursor', { scale: 0.9, duration: 0.1 })
      .to('.day-cell-4', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.1 }, "<")
      .to('.anim-cursor', { scale: 1, duration: 0.1 })
      // Move to save
      .to('.anim-cursor', { x: 220, y: 130, duration: 0.8, ease: 'power2.inOut', delay: 0.2 })
      // Click save
      .to('.anim-cursor', { scale: 0.9, duration: 0.1 })
      .to('.save-btn', { scale: 0.95, duration: 0.1 }, "<")
      .to('.anim-cursor', { scale: 1, duration: 0.1 })
      .to('.save-btn', { scale: 1, duration: 0.1 }, "<")
      // Fade out
      .to('.anim-cursor', { y: 200, opacity: 0, duration: 0.5 });
      
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="bg-background border border-dark/10 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col min-h-[400px]">
      <div className="mb-8">
        <h3 className="font-heading font-bold text-2xl text-dark mb-2">Protocol Scheduler</h3>
        <p className="font-heading text-dark/60 text-sm">Reliable execution protecting brand.</p>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <div className="w-full max-w-[280px]">
          <div className="grid grid-cols-7 gap-2 mb-6">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className={`h-10 rounded-lg border border-dark/10 flex items-center justify-center font-data text-xs font-bold text-dark/40 day-cell-${i}`}>
                {d}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="save-btn px-4 py-2 bg-dark text-background text-xs font-heading font-bold rounded-lg pointer-events-none">
              Deploy Brand
            </button>
          </div>
        </div>
        <Pointer className="anim-cursor absolute w-8 h-8 text-dark z-10 -ml-4 -mt-4 drop-shadow-xl" fill="currentColor" />
      </div>
    </div>
  );
};

const Features = () => (
  <section id="services" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <ShufflerCard />
      <TypewriterCard />
      <SchedulerCard />
    </div>
  </section>
);

const Philosophy = () => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-element', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="philosophy" className="relative w-full py-40 px-6 bg-primary overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620207418302-439b387441b0?q=80&w=2600&auto=format&fit=crop")' }} />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="phil-element font-heading text-xl md:text-2xl text-background/50 mb-8 font-medium">
          Most merch companies focus on: generic catalogs.
        </p>
        <h2 className="phil-element font-drama italic text-5xl md:text-7xl lg:text-[6rem] leading-[1.1] text-background">
          We focus on: <span className="text-accent underline decoration-accent/40 underline-offset-[16px]">precision</span> experiences.
        </h2>
      </div>
    </section>
  );
};

const ProtocolArchive = () => {
  const container = useRef(null);

  useEffect(() => {
    // If on very small mobile, ScrollTrigger pinning can be janky, but we'll apply it anyway as requested.
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // last card doesn't scale away
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          endTrigger: container.current,
          end: 'bottom bottom',
          animation: gsap.to(card, {
            scale: 0.9,
            filter: 'blur(20px)',
            opacity: 0.5,
            ease: 'none',
          }),
          scrub: true,
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Consult & Align', desc: 'Deep dive into your brand aesthetics and goals.', Icon: CircleDashed },
    { num: '02', title: 'Curate & Source', desc: 'Selecting premium items that perfectly match your identity.', Icon: LayoutTemplate },
    { num: '03', title: 'Produce & Deliver', desc: 'Flawless execution that protects your brand integrity.', Icon: Layers },
  ];

  return (
    <section ref={container} id="protocol" className="bg-background relative">
      {steps.map((step, i) => (
        <div key={i} className="protocol-card h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center border-t border-dark/10 bg-background pb-16 md:pb-0 px-6">
          <div className="flex-1 w-full flex justify-center items-center h-1/2 md:h-full">
            <step.Icon className="w-48 h-48 md:w-80 md:h-80 text-dark/5" strokeWidth={1} />
          </div>
          <div className="flex-1 w-full max-w-xl mx-auto md:pr-24 flex flex-col mt-8 md:mt-0">
            <span className="font-data text-accent text-xl mb-4 opacity-80">STEP {step.num}</span>
            <h2 className="font-heading font-bold text-5xl md:text-7xl text-dark tracking-tight mb-6">{step.title}</h2>
            <p className="font-heading text-dark/70 text-xl md:text-2xl font-medium leading-relaxed">
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

const CTA = () => (
  <section className="py-40 px-6 max-w-4xl mx-auto text-center border-t border-dark/10">
    <h2 className="font-heading font-bold text-5xl md:text-7xl text-dark tracking-tight mb-8">Ready to elevate your brand?</h2>
    <p className="font-heading text-xl text-dark/60 mb-12 max-w-2xl mx-auto">
      Experience merch done right. Clear process, reliable execution.
    </p>
    <button className="magnetic-button bg-accent text-primary px-10 py-5 rounded-[3rem] font-heading font-bold text-xl inline-flex items-center gap-3">
      <span>Get a Quote Today</span>
      <ArrowRight className="w-6 h-6" />
    </button>
  </section>
);

const Footer = () => (
  <footer className="bg-primary pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] text-background mt-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-background/10 pb-16 mb-12">
      <div className="lg:col-span-2">
        <h3 className="font-heading font-bold text-3xl uppercase tracking-wider mb-4">Digiprinta</h3>
        <p className="font-heading text-background/60 max-w-sm mb-12">
          Full service B2B merch company powered by experience.
        </p>
        <div className="flex items-center gap-3 px-4 py-2 bg-dark rounded-[2rem] inline-flex">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="font-data text-xs tracking-widest uppercase opacity-80">System Operational</span>
        </div>
      </div>
      <div>
        <h4 className="font-data text-sm opacity-50 mb-6 uppercase tracking-widest">Navigation</h4>
        <ul className="space-y-4 font-heading font-medium text-background/80">
          <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
          <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a></li>
          <li><a href="#protocol" className="hover:text-accent transition-colors">Protocol</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-data text-sm opacity-50 mb-6 uppercase tracking-widest">Legal</h4>
        <ul className="space-y-4 font-heading font-medium text-background/80">
          <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Cookie Tracking</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-40 font-data text-xs">
      <p>© {new Date().getFullYear()} Digiprinta. All rights reserved.</p>
      <p className="mt-4 md:mt-0">Design Pattern: Midnight Luxe</p>
    </div>
  </footer>
);

function App() {
  return (
    <div className="relative">
      <NoiseMap />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <ProtocolArchive />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
