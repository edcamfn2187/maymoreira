import React, { useState, useEffect, useRef } from "react";
import { PERSONAL_INFO } from "./constants";
import VideoGrid from "./components/VideoGrid";
import AdminGate  from "./admin/AdminGate";
import StudentGate  from "./student/StudentGate";
import AnamneseForm from "./components/AnamneseForm";
import { Link } from "react-router-dom";



const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [adminOpen, setAdminOpen] = useState(false);
  const [alunoOpen, setalunoOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (adminOpen) {
    return (
      <div className="min-h-screen bg-slate-950">
        <button
          onClick={() => setAdminOpen(false)}
          className="m-6 bg-pink-600 text-white px-6 py-2 rounded-full font-bold"
        >
          Voltar para o site
        </button>

        <AdminGate />
      </div>
    );
  }

    if (alunoOpen) {
    return (
      <div className="min-h-screen bg-slate-950">
        <button
          onClick={() => setalunoOpen(false)}
          className="m-6 bg-pink-600 text-white px-6 py-2 rounded-full font-bold"
        >
          Voltar para o site
        </button>

        <StudentGate />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-pink-500 selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled
            ? "translate-y-0 opacity-100 bg-slate-950/90 backdrop-blur-md py-4 shadow-xl border-b border-pink-500/20"
            : "-translate-y-full opacity-0 py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-pink-600/20">
              <div
                className="w-10 h-10 rounded-full bg-center bg-cover"
                style={{ backgroundImage: `url(${PERSONAL_INFO.photoUrl})` }}
              />
            </div>
            <span className="text-2xl font-oswald font-bold tracking-tighter text-white uppercase">
              Mayara<span className="text-pink-500">Moreira</span>
            </span>
          </div>

         {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="menu-link">
              Início
            </a>

            <a href="#videos" className="menu-link">
              Treinos
            </a>

            <button
              onClick={() => setalunoOpen(true)}
              className="menu-button">
              Área do Aluno
            </button>

            <button
              onClick={() => setAdminOpen(true)}
              className="menu-button"
            >
              Área Administrativa
            </button>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1 w-10 h-10"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>


      {menuOpen && (
        <div className="md:hidden mt-6 bg-slate-900 rounded-2xl p-6 flex flex-col gap-4">
          <a href="#home" className="menu-link">
            Início
          </a>

          <a href="#videos" className="menu-link">
            Treinos
          </a>

          <button className="menu-button w-full">
            Área do Aluno
          </button>

          <button
            onClick={() => setAdminOpen(true)}
            className="menu-button w-full"
          >
            Área Administrativa
          </button>
        </div>
      )}


      {/* Hero Section with requested Photo and Swipe Up */}
      <header id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={PERSONAL_INFO.photoUrl} 
            alt="Mayara Moreira - Especialista em Treinamento" 
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Overlay escuro para garantir que o texto branco seja legível sobre o fundo claro da foto */}
          <div className="absolute inset-0 bg-slate-950/40 backdrop-brightness-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block border border-pink-500/50 bg-pink-600/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-1000 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
              Premium Training Experience
            </div>
            <h1 className="text-6xl md:text-9xl font-oswald font-bold text-white mb-2 leading-[0.85] uppercase animate-in fade-in zoom-in duration-1000 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              Mayara <br /> <span className="text-pink-500">Moreira</span>
            </h1>
            <p className="text-sm md:text-lg text-white font-bold tracking-[0.5em] uppercase mt-8 opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 drop-shadow-lg">
              {PERSONAL_INFO.specialty}
            </p>
          </div>
        </div>

        {/* Botão Arrasta para Cima */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500"
        >
          <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-4 group-hover:text-pink-500 transition-colors drop-shadow-md">
            Arrasta para cima
          </span>
          <div className="relative w-8 h-12 rounded-full border-2 border-white/40 flex justify-center p-1 group-hover:border-pink-500 group-hover:bg-pink-500/10 transition-all duration-300">
            <div className="w-1 h-2 bg-pink-500 rounded-full animate-bounce mt-1 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
          </div>
        </button>
      </header>

      {/* Main Content */}
      <main ref={contentRef} className="relative z-10">
        <section className="bg-slate-950 py-24 px-6 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-16 h-1 bg-pink-600 mx-auto mb-12 rounded-full"></div>
             <h2 className="text-3xl md:text-6xl font-oswald font-bold text-white mb-8 uppercase tracking-tight leading-tight">
               Foco em <span className="text-pink-500">Performance</span> & <br /> Movimento.
             </h2>
             <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
               {PERSONAL_INFO.bio}
             </p>
          </div>
        </section>

        <VideoGrid />

        <section className="py-24 px-6 bg-slate-950">
          <AnamneseForm />
        </section>

        <section className="bg-slate-900/50 py-20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-pink-500 mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Personalizado</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-pink-500 mb-2 group-hover:scale-110 transition-transform">100+</div>
              <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Vídeos Exclusivos</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-pink-500 mb-2 group-hover:scale-110 transition-transform">PRO</div>
              <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Metodologia</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-pink-500 mb-2 group-hover:scale-110 transition-transform">TRAINING</div>
              <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Performace</div>
            </div>
          </div>
        </section>

        
        <section className="bg-pink-600 py-32 px-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-8xl font-oswald font-bold mb-8 uppercase tracking-tighter leading-none">Alcance seu</h2>
            <h2 className="text-5xl md:text-8xl font-oswald font-bold mb-8 uppercase tracking-tighter leading-none">potencial máximo</h2>
            <p className="text-xl mb-12 font-medium opacity-95 max-w-xl mx-auto leading-relaxed">
              Junte-se à minha consultoria e tenha um plano desenhado especificamente para as suas necessidades e rotina.
            </p>
            <a 
              href="https://wa.me/33988922017?text=Olá%20Mayara,%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="bg-slate-900 text-white font-bold px-12 py-5 rounded-full text-xl hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 mx-auto uppercase tracking-[0.2em]">
                Falar com Mayara Moreira
              </button>
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${PERSONAL_INFO.photoUrl})` }}
                />
              </div>

              <span className="text-2xl font-oswald font-bold tracking-tighter text-white uppercase">Mayara<span className="text-pink-500">Moreira</span></span>
            </div>
            <p className="text-slate-600 text-[10px] tracking-[0.3em] font-black uppercase">Official Personal Training Platform</p>
          </div>
          
          <p className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} Mayara Moreira Vieira.</p>

          <div className="flex gap-12">
             <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors font-black uppercase text-[10px] tracking-[0.2em]">Instagram</a>
             <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors font-black uppercase text-[10px] tracking-[0.2em]">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
