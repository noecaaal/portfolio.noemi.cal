import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const form = useRef<HTMLFormElement>(null)
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    from_email: '',
    subject: 'Collaboriamo?',
    message: 'Ciao Noemi!\n\nHo visto il tuo portfolio, ti piacerebbe collaborare al mio progetto...?\n\n'
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = async () => {
    setSending(true);
    try {
      await emailjs.send(
        'service_8dqweyj',
        'template_afyqsb5',
        formData,
        'GLL375a4mIU3YDBa4'
      );
      setSent(true);
      setTimeout(() => { setSent(false); setIsOpen(false); }, 2000);
    } catch (e) {
      alert('Errore durante l\'invio. Riprova.');
    } finally {
      setSending(false);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'projects', ref: projectsRef },
        { id: 'about', ref: aboutRef },
        { id: 'contact', ref: contactRef }
      ];
      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedProject(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'auto' });
  };

  const categories = [
    {
      name: 'Physical Design',
      color: 'from-purple-500 via-pink-500 to-red-500',
      projects: [
        { id: 1, number: '01', title: 'Ricostruzione 3D di una torcia', subtitle: 'Industrial Design', year: '2023', description: 'AutoCAD, Rhinoceros, Blender, Illustrator', tools: ['AutoCAD', 'Rhinoceros', 'Blender', 'Illustrator'], process: ['Brief e debriefing', 'Studio morfologico', 'Modellazione 3D', 'Rendering e materiali', 'Tavole tecniche'] , hidden: true},
        { id: 2, number: '01', title: 'Sfiorami', subtitle: 'Concept Design', year: '2024', description: 'Illustrator, Procreate, Rhinoceros, Photoshop', tools: ['Illustrator', 'Procreate', 'Rhinoceros', 'Photoshop'], process: ['Brief e debriefing', 'Studio esigenze e requisiti', 'Appunti metaprogettuali', 'Modellazione e verifica', 'Revisione a seguito di feedback', 'Prototipazione e ingegnerizzazione'] , hidden: false}
      ]
    },
    {
      name: 'Digital Design',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      projects: [
        { id: 3, number: '02', title: 'Netway', subtitle: 'Communication e Branding Design', year: '2025', description: 'Illustrator, Photoshop, Figma', tools: ['Illustrator', 'Photoshop', 'Figma'], process: ['Analisi strategica e ricerca', 'Analisi dei competitor', 'Definizione del target', 'Mappatura degli stakeholder', 'Brand positioning e strategy', 'Payoff e naming', 'Definizione dell\'identità visiva', 'Sviluppo del sistema grafico e tone of voice', 'Brand manual / linee guida', 'Design dei supporti e layout', 'Realizzazione degli applicativi e brand experience', 'Strategia di comunicazione social', 'Implementazione digitale sito web'] , hidden: false},
        { id: 4, number: '03', title: 'A Torino si (s)cambia', subtitle: 'Social Media Design', year: '2025', description: 'Figma, Photoshop, Illustrator', tools: ['Figma', 'Photoshop', 'Illustrator'], process: ['Stato dell\'arte e analisi aziendale', 'Benchmarking e analisi dei competitor', 'Analisi del target e personas', 'Definizione obiettivi SMART', 'Digital storytelling e scelta dell\'archetipo', 'Definizione tone of voice e strategia di comunicazione', 'Identificazione touchpoint e canali social', 'Sviluppo content pillar e rubriche', 'Copywriting e produzione dei mockup', 'Pianificazione calendario editoriale mensile', 'Piano di distribuzione per touchpoint', 'Contingency plan e sistemi di monitoring'] , hidden: false}
      ]
    },
    {
      name: 'Visual Design',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      projects: [
        { id: 5, number: '04', title: 'Artelier', subtitle: 'UX/UI Design', year: '2025', description: 'Figma, Illustrator', tools: ['Figma', 'Illustrator'], process: ['Ricerca utente', 'Wireframing', 'Prototipo interattivo', 'Test usabilità', 'UI finale'] , hidden: false},
        { id: 6, number: '06', title: 'Portfolio web', subtitle: 'Web Design', year: '2025', description: 'Visual Studio Code, Figma', tools: ['VS Code', 'Figma', 'React'], process: ['Concept e wireframe', 'Design system', 'Sviluppo frontend', 'Animazioni', 'Deploy'] , hidden: true}
      ]
    },
    {
      name: 'Strategic Design',
      color: 'from-green-500 via-emerald-500 to-lime-500',
      projects: [
        { id: 7, number: '07', title: 'Lo stereo che risuona', subtitle: 'Scenario Design', year: '2024', description: 'Illustrator, Rhinoceros, Procreate', tools: ['Illustrator', 'Rhinoceros', 'Procreate'], process: ['Analisi scenario', 'Vision futura', 'Concept design', 'Narrazione visiva', 'Presentazione'] , hidden: true},
        { id: 8, number: '05', title: 'Hacking di un packaging', subtitle: 'Sustainable Design', year: '2024', description: 'Illustrator, Rhinoceros, Blender', tools: ['Illustrator', 'Rhinoceros', 'Blender'], process: ['Ricerca materiali', 'Analisi ciclo di vita', 'Redesign sostenibile', 'Prototipazione', 'Valutazione impatto'] , hidden: false}
      ]
    }
  ];

  type Project = typeof categories[0]['projects'][0];

  // Mappa colori Tailwind → CSS per i gradienti SVG stroke
  const strokeColors: Record<string, [string, string]> = {
    'from-purple-500 via-pink-500 to-red-500': ['#a855f7', '#ef4444'],
    'from-blue-500 via-cyan-500 to-teal-500': ['#3b82f6', '#14b8a6'],
    'from-orange-500 via-amber-500 to-yellow-500': ['#f97316', '#eab308'],
    'from-green-500 via-emerald-500 to-lime-500': ['#22c55e', '#84cc16'],
  };
/* ... (mappa strokeColors e Project type invariati) ... */

const getExpandedContent = (project: Project, categoryColor: string) => {
  const isSfiorami = project.id === 2;
  
  return (
    <div
      className="relative z-20 p-12 bg-zinc-900"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Container principale in Flex Column per permettere il layout misto */}
      <div className="flex flex-col gap-16">
        
        {/* PARTE SUPERIORE: Testi + Immagine Principale (Layout a 2 colonne) */}
        <div className={`grid gap-16 ${project.id === 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-[1fr_1.4fr]'}`}>
          
          {/* Colonna Sinistra: Descrizioni, Processo e Strumenti */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className={`text-6xl font-black leading-none mb-2 bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
                {project.title}
              </h2>
              <p className="text-xl text-white/40 font-black uppercase tracking-wider mb-8">
                {project.subtitle}
              </p>
              
              {/* Testi descrittivi basati sull'ID */}
              {isSfiorami ? (
                <>
                  <p className="text-white/80 leading-relaxed mb-4">
                    "Sfiorami" è un progetto innovativo ed educativo destinato agli studenti delle scuole superiori, progettato per rendere l'educazione sessuale accessibile, coinvolgente e priva di intimidazioni. L'iniziativa mira a trasformare l'apprendimento in un'esperienza collettiva, migliorando la comprensione e il dialogo tra i giovani su temi fondamentali come la sessualità e l'affettività, con l'obiettivo di formare una generazione più informata e consapevole.
                  </p>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Il packaging creativo include una busta con grafiche accattivanti che racchiude un talloncino pretagliato con un fiore e un set di carte informative e inclusive, rispettose di tutte le identità e orientamenti. Il fiore diventa il fulcro simbolico dell'attività: passando di mano in mano, abilita chi lo detiene a partecipare attivamente alla discussione, stimolando un dialogo aperto e senza giudizi. Attraverso quiz e domande che incoraggiano la partecipazione, il design riduce lo stigma associato a questi argomenti, promuovendo un senso di comunità e rispetto reciproco tra gli studenti.
                  </p>
                </>
              ) : project.id === 3 ? (
                <>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Netway è un progetto di brand identity per una startup che organizza viaggi di istruzione, promossa dall'ONU. Il nostro compito era costruire tutto da zero: naming, logo, identità visiva e una strategia di contenuti social coerente con la visione del brand.
                  </p>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Il nome nasce dalla fusione di Net, networking, connessioni, scambio, e Way, il cammino. Il payoff Embrace your path sintetizza l'anima de
progetto: un invito a vivere il proprio percorso con coraggio. L'identità visiva traduce questi valori in un sistema grafico riconoscibile, con una palette che combina blu profondi, viola intensi e fucsia vibranti. La strategia social accompagna |'utente in ogni fase; dalla scoperta del brand fino alla costruzione di una community attiva, prima, durante e dopo il viaggio.

                  </p>
                </>
              ) : project.id === 4 ? (
                <>
                  <p className="text-white/80 leading-relaxed mb-4">
                    "A Torino si (s)cambia" è una campagna social nata per Swap Party TO con l'obiettivo di rendere l'economia circolare un’abitudine coinvolgente. L'idea è quella di trasformare il baratto in un'esperienza collettiva, parlando direttamente a Gen Z e Millennials. A seguito di uno studio dello stato dell'arte e un attento benchmarking, abbiamo definito un archetipo di brand e un tono di voce fresco e motivazionale, capace di portare le persone dai social agli eventi fisici in città.
                  </p>
                  <p className="text-white/60 leading-relaxed text-sm">
                    La narrazione è strutturata su cinque pillar strategici, declinati in rubriche specifiche per Instagram, TikTok e Facebook. Il lavoro ha prodotto un calendario editoriale mensile completo, includendo la produzione di copywriting, mockup grafici per ogni touchpoint e un contingency plan, garantendo una gestione dinamica dei flussi di comunicazione.
                  </p>
                </>
              ) : null}
            </div>

            {/* Sezione Processo */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-px w-8 bg-gradient-to-r ${categoryColor}`} />
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Processo</p>
              </div>
              <div className="flex flex-col gap-4">
                {project.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className={`text-sm font-black bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent w-8`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-white/60 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sezione Strumenti */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-px w-8 bg-gradient-to-r ${categoryColor}`} />
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Strumenti</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.tools.map(tool => (
                  <span key={tool} className="px-4 py-2 border border-white/10 text-white/50 text-xs uppercase tracking-widest">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Tavole A3 sotto i testi (Colonna Sinistra) */}
            {project.id === 4 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-7">
                  <img src="/progetti/a torino si (s)cambia/indice.png" alt="Indice" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/boa2rd.png" alt="Analisi Boa2rd" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/digital storytelling.png" alt="Digital Storytelling" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/pillar.png" alt="Strategia Social" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/rubriche.png" alt="Rubriche Social" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/monitoring.png" alt="Monitoring" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/contingency plan.png" alt="Contingency Plan" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/practise.png" alt="Conclusioni" className="w-full object-contain" />
                </div>
              </div>
            )}
          </div> {/* Chiusura Colonna Sinistra */}

          {/* Colonna Destra */}
          <div className="flex flex-col gap-4">
            {isSfiorami ? (
              <div className="flex flex-col gap-4 w-full">
                <div className="overflow-hidden rounded-lg">
                  <img src="/progetti/sfiorami/packaging esterno.png" alt="packaging esterno" className="w-full object-contain" />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img src="/progetti/sfiorami/packaging interno.png" alt="packaging interno" className="w-full object-contain" />
                </div>
              </div>
            ) : project.id === 3 ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <img src="/progetti/netway/logo e logotipo.png" alt="Logo e logotipo" className="w-full h-48 object-contain" />
                  <img src="/progetti/netway/tipografia.png" alt="Tipografia" className="w-full h-48 object-contain" />
                  <img src="/progetti/netway/palette.png" alt="Palette" className="w-full h-48 object-contain" />
                  <img src="/progetti/netway/area di rispetto.png" alt="Area di rispetto" className="w-full h-48 object-contain" />
                </div>
                <img src="/progetti/netway/verticalizzazione.png" alt="Verticalizzazione" className="w-full object-contain" />
                <img src="/progetti/netway/2.png" alt="Social media" className="w-full object-contain" />
                <img src="/progetti/netway/3.png" alt="Web e brochure" className="w-full object-contain" />
                <img src="/progetti/netway/4.png" alt="Merchandising" className="w-full object-contain" />
              </div>
            ) : project.id === 4 ? (
              <div className="flex flex-col gap-4">
                <div className="w-full h-[380px] overflow-hidden rounded">
                  <img src="/progetti/a torino si (s)cambia/mockup chiuso.png" alt="Mockup chiuso" className="w-full h-full object-cover object-center scale-[1.4]" />
                </div>
                <div className="w-full h-[380px] overflow-hidden rounded">
                  <img src="/progetti/a torino si (s)cambia/mockup aperto.png" alt="Mockup aperto" className="w-full h-full object-cover object-center scale-[1.4]" />
                </div>
                <div className="flex flex-col gap-4 mt-10">
                  <img src="/progetti/a torino si (s)cambia/post.png" alt="Post" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/stories.png" alt="Stories" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/reel e facebook.png" alt="Reel e Facebook" className="w-full object-contain" />
                  <img src="/progetti/a torino si (s)cambia/tiktok.png" alt="TikTok" className="w-full object-contain" />
                </div>
              </div>
            ) : (
              <div className={`w-full h-80 bg-gradient-to-br ${categoryColor} opacity-10 flex items-center justify-center border border-white/5`}>
                <span className="text-white/20 text-sm uppercase tracking-widest">Immagine principale</span>
              </div>
            )}
          </div> {/* Chiusura Colonna Destra */}
        </div> {/* Chiusura Grid Parte Superiore */}

        {/* PARTE INFERIORE: A tutta larghezza (Solo per Sfiorami) */}
        {isSfiorami && (
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-3 gap-3">
              <img src="/progetti/sfiorami/carte fronte.png" alt="carte fronte" className="w-full object-contain" />
              <img src="/progetti/sfiorami/carte retro.png" alt="carte retro" className="w-full object-contain" />
              <div className="flex flex-col gap-3">
                <img src="/progetti/sfiorami/fiore femmina.png" alt="fiore femmina" className="w-full object-contain" />
                <img src="/progetti/sfiorami/fiore maschio.png" alt="fiore maschio" className="w-full object-contain" />
              </div>
            </div>
            <img src="/progetti/sfiorami/tavola tecnica, esecutiva, tabella esigenziale e di presentazione.png" alt="tavola tecnica" className="w-full object-contain" />
          </div>
        )}
      </div> {/* Chiusura Flex Col principale */}
    </div>
  );
};

  return (
    <div ref={containerRef} className="bg-black text-white" onClick={() => setExpandedProject(null)}>
      <style>{`
        body { overflow-x: hidden; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-line { 0%, 100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 0.6; transform: scaleY(1.1); } }
      `}</style>

      {/* Global Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      {/* Side Navigation */}
      <motion.div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8 }}>
        <div className="flex flex-col items-center gap-4">
          {[
            { id: 'hero', ref: heroRef, label: 'Home' },
            { id: 'projects', ref: projectsRef, label: 'Progetti' },
            { id: 'about', ref: aboutRef, label: 'Chi Sono' },
            { id: 'contact', ref: contactRef, label: 'Contatti' }
          ].map((section) => (
            <motion.button key={section.id} onClick={() => scrollToSection(section.ref)} className="group relative" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id ? `${section.id === 'hero' ? 'bg-purple-500' : section.id === 'projects' ? 'bg-pink-500' : section.id === 'about' ? 'bg-cyan-500' : 'bg-orange-500'} w-3 h-3` : 'bg-white/30 group-hover:bg-white/60'}`} />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{section.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div className="flex items-center gap-4 mb-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
                <motion.div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-pink-500" initial={{ width: 0 }} animate={{ width: '64px' }} transition={{ delay: 0.4, duration: 1 }} />
                <span className="text-sm uppercase tracking-[0.3em] text-white/60">Il mio portfolio</span>
              </motion.div>
              <div className="mb-8">
                <div className="overflow-hidden"><motion.h1 className="text-5xl lg:text-6xl leading-[0.95] font-light tracking-tight text-white/60" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}>Ciao, sono</motion.h1></div>
                <div className="overflow-hidden"><motion.h1 className="text-[18vw] lg:text-[8vw] leading-[0.85] font-black tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}>NOEMI</motion.h1></div>
                <div className="overflow-hidden mt-4"><motion.p className="text-2xl lg:text-3xl font-black text-white/80" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}>Communication Designer</motion.p></div>
              </div>
              <motion.div className="space-y-4 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
                <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">Trasformo idee in esperienze visive audaci. Specializzata in brand identity, editorial design e storytelling digitale.</p>
              </motion.div>
              <motion.button className="group relative px-10 py-5 bg-white text-black text-base font-black uppercase tracking-wider overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0, duration: 0.5 }} onClick={() => scrollToSection(projectsRef)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                <span className="relative z-10">Scopri i miei lavori</span>
              </motion.button>
            </div>
            <div className="relative h-[600px] hidden lg:block">
              <motion.div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-30 blur-2xl" animate={{ x: [0, 120, 0], y: [0, -80, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
              <motion.div className="absolute top-32 right-20 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 opacity-30 blur-2xl" animate={{ x: [0, -100, 0], y: [0, 100, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
              <motion.div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-500 opacity-25 blur-2xl" animate={{ x: [0, 80, 0], y: [0, -60, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
              <motion.div className="absolute top-1/2 left-1/3 w-52 h-52 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 opacity-25 blur-2xl" animate={{ x: [0, -70, 0], y: [0, 70, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
              <motion.div className="absolute top-10 left-1/4 w-44 h-44 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-red-400 opacity-30 blur-2xl" animate={{ x: [0, 90, 0], y: [0, 120, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
            </div>
          </div>
        </div>
        <motion.div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-12 cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} onClick={() => scrollToSection(projectsRef)}>
          <span className="text-xs uppercase tracking-widest text-white/40">Scorri per esplorare</span>
          <motion.div className="w-px h-20 bg-gradient-to-b from-yellow-400 via-pink-500 to-transparent" animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="relative min-h-screen py-16 pb-0 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        <motion.div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none" animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl pointer-events-none" animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div className="mb-24" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-8 mb-4">
              <motion.div className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" initial={{ width: 0 }} whileInView={{ width: '96px' }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} />
              <span className="text-sm uppercase tracking-[0.3em] text-white/40">LAVORI SELEZIONATI</span>
            </div>
            <h2 className="text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">I MIEI PROGETTI</h2>
          </motion.div>

          <div className="space-y-32">
            {categories.map((category, catIndex) => (
              <motion.div key={category.name} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: catIndex * 0.2, duration: 0.8 }}>
                <div className="mb-12 flex items-center gap-8">
                  <motion.div className={`h-1 w-24 bg-gradient-to-r ${category.color}`} initial={{ width: 0 }} whileInView={{ width: '96px' }} viewport={{ once: true }} transition={{ delay: 0, duration: 0.8 }} />
                  <h3 className={`text-4xl font-black bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>{category.name}</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {category.projects.filter(p => !p.hidden).map((project, projIndex) => {
                    const isExpanded = expandedProject === project.id;
                    return (
                      <motion.div
                        key={project.id}
                        layout
                        className={`group relative cursor-pointer bg-zinc-900 ${isExpanded ? 'col-span-2' : 'h-[500px] overflow-hidden'}`}
                        initial={{ opacity: 0, x: projIndex === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          layout: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
                          opacity: { delay: catIndex * 0.2 + projIndex * 0.1, duration: 0.8 },
                          x: { delay: catIndex * 0.2 + projIndex * 0.1, duration: 0.8 }
                        }}
                        onClick={(e) => { e.stopPropagation(); setExpandedProject(isExpanded ? null : project.id); }}
                      >
                        {/* 1. Banda laterale */}
                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${category.color} z-30`} />

                        {/* Stato chiuso */}
                        <AnimatePresence mode="wait">
                          {!isExpanded && (
                            <motion.div
                              key="closed"
                              className="absolute inset-0 overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {/* Background */}
                              <div className="absolute inset-0 bg-zinc-800 transition-transform duration-600 ease-out group-hover:scale-110" />

                              {/* Cerchio Animato */}
                              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-60 scale-0 group-hover:scale-[20] transition-all duration-700 ease-out z-10`} />

                              {/* Numero in alto a destra — solo absolute, z-20 per stare sopra il cerchio */}
                              <div className="absolute top-0 right-0 p-8 transition-transform duration-[1500ms] ease-out group-hover:rotate-[360deg] z-20">
                                <span className="text-[12rem] font-black leading-none text-white/5 group-hover:text-white/10 transition-colors duration-300">
                                  {project.number}
                                </span>
                              </div>

                              {/* Info in basso — z-20 per stare sopra tutto */}
<div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
  <p className={`text-xs uppercase tracking-widest bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-3`}>
    {project.year}
  </p>

  {/* Contenitore Titolo + PNG Decorativo */}
<div className="relative inline-block mb-2">
  <h4 className="text-5xl font-black leading-none text-white">
    {project.title}
  </h4>

  {/* Immagine PNG logo */}
  {project.id === 2 && ( 
    <img 
      src="/progetti/sfiorami/sfiorami logo.png" 
      alt="decorazione"
      className="absolute top-[-250px] left-0 w-full h-auto pointer-events-none 
                 transition-opacity duration-300
                 opacity-100 group-hover:opacity-0 z-30" 
    />
  )}
</div>

  <h5 className="text-3xl font-black leading-none text-white/60 mb-4">
    {project.subtitle}
  </h5>
  
  <p className="text-sm text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    {project.description}
  </p>
</div>

                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Stato espanso */}
                        <AnimatePresence mode="wait">
                          {isExpanded && (
                            <motion.div
                              key="expanded"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                            >
                              {getExpandedContent(project, category.color)}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative min-h-screen py-32 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        <motion.div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div className="mb-20" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-8 mb-4">
              <motion.div className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" initial={{ width: 0 }} whileInView={{ width: '96px' }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} />
              <span className="text-sm uppercase tracking-[0.3em] text-white/40">Conosciamoci</span>
            </div>
            <h2 className="text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">CHI SONO</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed mb-8 font-light">Sono una <span className="font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">communication designer</span> specializzata in narrazioni visive audaci che superano i confini convenzionali.</p>
              <p className="text-xl text-white/60 leading-relaxed mb-8">Con oltre 8 anni di esperienza, ho collaborato con brand e studi in tutto il mondo per creare soluzioni di design d'impatto in molteplici discipline. Il mio lavoro vive all'intersezione tra arte, tecnologia e storytelling.</p>
            </motion.div>
            <motion.div className="flex flex-col gap-6" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              {[
                { label: 'Esperienza', content: 'Brand Identity, Editorial Design, Motion Graphics, Esperienze Digitali', color: 'from-yellow-400 to-orange-500' },
                { label: 'Posizione', content: 'Basata a Milano, Disponibile in tutto il mondo', color: 'from-purple-500 to-indigo-500' }
              ].map((item, index) => (
                <motion.div key={item.label} className="group relative p-6 bg-black/40 border border-white/10 overflow-hidden cursor-pointer flex-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }} whileHover={{ scale: 1.02 }}>
                  <motion.div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10`} transition={{ duration: 0.3 }} />
                  <motion.div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color}`} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }} />
                  <div className="relative z-10">
                    <h3 className={`text-xs uppercase tracking-widest mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-bold`}>{item.label}</h3>
                    <p className="text-lg text-white/80">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="mb-20" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="mb-12">
              <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">COMPETENZE</h3>
              <p className="text-white/60">Le mie aree di specializzazione</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Brand Identity', description: 'Logo design, sistemi di identità visiva', color: 'from-purple-500 to-pink-500' },
                { name: 'Editorial Design', description: 'Layout editoriali, tipografia', color: 'from-blue-500 to-cyan-500' },
                { name: 'Digital Design', description: 'Interfacce web e app', color: 'from-orange-500 to-yellow-500' },
                { name: 'Motion Graphics', description: 'Animazioni, tipografia cinetica', color: 'from-green-500 to-emerald-500' },
                { name: 'Packaging Design', description: 'Sistemi di packaging prodotto', color: 'from-pink-500 to-rose-500' },
                { name: 'Illustration', description: 'Disegno digitale e tradizionale', color: 'from-indigo-500 to-purple-500' }
              ].map((skill) => (
                <motion.div key={skill.name} className="group relative p-6 bg-zinc-900 border border-white/10 cursor-pointer overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "tween", duration: 0.15 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${skill.color}`} />
                  <div className="relative z-10">
                    <h4 className={`text-xl font-black mb-2 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>{skill.name}</h4>
                    <p className="text-sm text-white/60">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="mb-12">
              <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">PROGRAMMI</h3>
              <p className="text-white/60">Software che utilizzo quotidianamente</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Photoshop', category: 'Adobe', color: 'from-blue-500 to-cyan-600' },
                { name: 'Illustrator', category: 'Adobe', color: 'from-orange-500 to-amber-600' },
                { name: 'InDesign', category: 'Adobe', color: 'from-pink-500 to-rose-600' },
                { name: 'After Effects', category: 'Adobe', color: 'from-purple-500 to-violet-600' },
                { name: 'Rhinoceros', category: 'Cad', color: 'from-indigo-500 to-blue-600' },
                { name: 'Figma', category: 'UI/UX', color: 'from-purple-400 to-pink-500' },
                { name: 'Blender', category: '3D', color: 'from-orange-500 to-red-600' },
                { name: 'Procreate', category: 'Illustrazione', color: 'from-pink-500 to-purple-600' }
              ].map((tool, index) => (
                <motion.div key={tool.name} className="group relative p-6 bg-zinc-900 border border-white/10 cursor-pointer overflow-hidden" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.4 }} whileHover={{ scale: 1.05, y: -5 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                  <div className="relative z-10 text-center">
                    <h4 className="text-lg font-black text-white mb-1">{tool.name}</h4>
                    <p className="text-xs uppercase tracking-wider text-white/40">{tool.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        <motion.div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <motion.div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-500/20 via-pink-500/20 to-purple-500/20 blur-3xl" animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360], x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 blur-3xl" animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0], x: [0, -80, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div className="mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div className="h-1 w-16 bg-gradient-to-r from-transparent to-yellow-400" initial={{ width: 0 }} whileInView={{ width: '64px' }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} />
              <span className="text-sm uppercase tracking-[0.3em] text-white/40">Mettiamoci in contatto</span>
              <motion.div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-transparent" initial={{ width: 0 }} whileInView={{ width: '64px' }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} />
            </div>
            <h2 className="text-7xl lg:text-8xl font-black text-white text-center">FACCIAMO DUE CHIACCHERE?</h2>
          </motion.div>

          <motion.p className="text-xl lg:text-2xl text-white/60 mb-16 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}>
            Sei in cerca di nuove idee o vuoi solo scambiare due parole su un progetto? Sono pronta a mettermi in gioco.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}>
            {/* --- SOSTITUISCI IL VECCHIO <motion.a> CON QUESTO --- */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="group relative px-12 py-6 bg-white text-black text-lg font-black uppercase tracking-wider overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Scrivimi</span>
            </motion.button>
            <motion.a
              href="#"
              className="group relative px-12 py-6 bg-transparent border-2 border-white text-white text-lg font-black uppercase tracking-wider overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              <span className="relative z-10">Scarica CV</span>
            </motion.a>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }}>
            {[
              { name: 'Instagram', handle: '@noemicaldera1', color: 'from-pink-500 to-purple-500', url: 'https://www.instagram.com/noemicaldera1/' },
              { name: 'Behance', handle: '/noemicaldera', color: 'from-blue-500 to-cyan-500', url: 'https://www.behance.net/noemicaldera' },
              { name: 'LinkedIn', handle: '/in/noemi-caldera', color: 'from-blue-600 to-indigo-500', url: 'https://www.linkedin.com/in/noemi-caldera-a4a6712b0/' },
              { name: 'Telegram', handle: '@noecaaal', color: 'from-sky-400 to-cyan-400', url: 'https://t.me/noecaaal' }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 bg-zinc-900 border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20`} transition={{ duration: 0.3 }} />
                <motion.div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${social.color}`} initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                <div className="relative z-10">
                  <h4 className="text-lg font-black mb-1 text-white">{social.name}</h4>
                  <p className="text-xs text-white/40 tracking-wider">{social.handle}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="mt-20 pt-12 border-t border-white/10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 0.8 }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
              <p>© 2026 Noemi. Tutti i diritti riservati.</p>
              <p className="uppercase tracking-wider">Milano, Italia</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Popup di Contatto in basso a destra */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] w-full max-w-sm bg-zinc-900 border border-white/10 p-8 shadow-2xl"
          >
            {/* Tasto X per chiudere */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <span className="text-2xl font-light">×</span>
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider">Nuovo Messaggio</h3>
              <p className="text-xs text-white/40 mt-1">A: noemi.cal21@gmail.com</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Il tuo indirizzo email</p>
                <input
                  type="email"
                  value={formData.from_email}
                  onChange={e => setFormData({ ...formData, from_email: e.target.value })}
                  placeholder="tua@email.com"
                  className="w-full p-3 bg-black/50 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Oggetto</p>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 bg-black/50 border border-white/10 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Messaggio</p>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full p-3 bg-black/50 border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <motion.button
                onClick={sendEmail}
                disabled={sending || !formData.from_email}
                className="block w-full py-4 bg-white text-black text-center font-black uppercase tracking-wider text-sm hover:bg-pink-500 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sent ? '✓ Inviato!' : sending ? 'Invio...' : 'Invia Messaggio'}
              </motion.button>

              <p className="text-[9px] text-center text-white/20 uppercase tracking-tighter">
                Il messaggio verrà inviato direttamente a noemi.cal21@gmail.com
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
