import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)

  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeSection, setActiveSection] = useState('hero');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Update active section
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

      // Update scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') setExpandedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeyDown);
    };
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'auto' });
  };

  const categories = [
    {
      name: 'Physical Design',
      color: 'from-purple-500 via-pink-500 to-red-500',
      projects: [
        {
          id: 1,
          number: '01',
          title: 'Ricostruzione 3D di una torcia',
          subtitle: 'Industrial Design',
          year: '2023',
          description: 'AutoCAD, Rhinoceros, Blender, Illustrator'
        },
        {
          id: 2,
          number: '02',
          title: 'Sfiorami',
          subtitle: 'Concept Design',
          year: '2024',
          description: 'Illustrator, Procreate, Rhinoceros, Photoshop'
        }
      ]
    },
    {
      name: 'Digital Design',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      projects: [
        {
          id: 3,
          number: '03',
          title: 'Netway',
          subtitle: 'Communication e Branding Design',
          year: '2025',
          description: 'Illustrator, Photoshop, Figma'
        },
        {
          id: 4,
          number: '04',
          title: 'A Torino si (s)cambia',
          subtitle: 'Social Media Design',
          year: '2025',
          description: 'Figma, Photoshop, Illustrator'
        }
      ]
    },
    {
      name: 'Visual Design',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      projects: [
        {
          id: 5,
          number: '05',
          title: 'Artelier',
          subtitle: 'UX/UI Design',
          year: '2025',
          description: 'Figma, Illustrator'
        },
        {
          id: 6,
          number: '06',
          title: 'Portfolio web',
          subtitle: 'Web Design',
          year: '2025',
          description: 'Visual Studio Code, Figma'
        }
      ]
    },
    {
      name: 'Strategic Design',
      color: 'from-green-500 via-emerald-500 to-lime-500',
      projects: [
        {
          id: 7,
          number: '07',
          title: 'Lo stereo che risuona',
          subtitle: 'Scenario Design',
          year: '2024',
          description: 'Illustrator, Rhinoceros, Procreate'
        },
        {
          id: 8,
          number: '08',
          title: 'Hacking di un packaging',
          subtitle: 'Sustainable Design',
          year: '2024',
          description: 'Illustrator, Rhonoceros, Blender'
        }
      ]
    }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white" onClick={() => setExpandedProject(null)}>
      <style>{`
        body {
          overflow-x: hidden;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(1.1); }
        }
      `}</style>

      {/* Side Navigation */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-4">
          {[
            { id: 'hero', ref: heroRef, label: 'Home' },
            { id: 'projects', ref: projectsRef, label: 'Progetti' },
            { id: 'about', ref: aboutRef, label: 'Chi Sono' },
            { id: 'contact', ref: contactRef, label: 'Contatti' }
          ].map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.ref)}
              className="group relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
  activeSection === section.id
    ? `${
        section.id === 'hero' ? 'bg-purple-500' :
        section.id === 'projects' ? 'bg-pink-500' :
        section.id === 'about' ? 'bg-cyan-500' :
        'bg-orange-500'
      } w-3 h-3`
    : 'bg-white/30 group-hover:bg-white/60'
}`} />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {section.label}
              </span>
            </motion.button>
          ))}
        </div>

        
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        </div> 
        

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              {/* Eyebrow */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div
                  className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: '64px' }}
                  transition={{ delay: 0.4, duration: 1 }}
                />
                <span className="text-sm uppercase tracking-[0.3em] text-white/60">Il mio portfolio</span>
              </motion.div>

              {/* Main Title */}
              <div className="mb-8">
                <div className="overflow-hidden">
                  <motion.h1
                    className="text-5xl lg:text-6xl leading-[0.95] font-light tracking-tight text-white/60"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  >
                    Ciao, sono
                  </motion.h1>
                </div>

                <div className="overflow-hidden">
                  <motion.h1
                    className="text-[18vw] lg:text-[8vw] leading-[0.85] font-black tracking-tight bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  >
                    NOEMI
                  </motion.h1>
                </div>

                <div className="overflow-hidden mt-4">
                  <motion.p
                    className="text-2xl lg:text-3xl font-black text-white/80"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  >
                    Communication Designer
                  </motion.p>
                </div>
              </div>

              {/* Description */}
              <motion.div
                className="space-y-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
                  Trasformo idee in esperienze visive audaci. Specializzata in brand identity, editorial design e storytelling digitale.
                </p>
                
              </motion.div>

              {/* CTA Button */}
              <motion.button
                className="group relative px-10 py-5 bg-white text-black text-base font-black uppercase tracking-wider overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
                onClick={() => scrollToSection(projectsRef)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Scopri i miei lavori</span>
              </motion.button>
            </div>

            {/* Right Side - Animated Orbs */}
            <div className="relative h-[600px] hidden lg:block">
              {/* Purple-Pink Orb */}
              <motion.div
                className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-30 blur-2xl"
                animate={{
                  x: [0, 120, 0],
                  y: [0, -80, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Blue-Cyan Orb */}
              <motion.div
                className="absolute top-32 right-20 w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 opacity-30 blur-2xl"
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Orange-Yellow Orb */}
              <motion.div
                className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gradient-to-br from-orange-500 via-yellow-500 to-amber-500 opacity-25 blur-2xl"
                animate={{
                  x: [0, 80, 0],
                  y: [0, -60, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />

              {/* Green-Emerald Orb */}
              <motion.div
                className="absolute top-1/2 left-1/3 w-52 h-52 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 opacity-25 blur-2xl"
                animate={{
                  x: [0, -70, 0],
                  y: [0, 70, 0],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Pink-Rose Orb */}
              <motion.div
                className="absolute top-10 left-1/4 w-44 h-44 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-red-400 opacity-30 blur-2xl"
                animate={{
                  x: [0, 90, 0],
                  y: [0, 120, 0],
                }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-12 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          onClick={() => scrollToSection(projectsRef)}
        >
          <span className="text-xs uppercase tracking-widest text-white/40">Scorri per esplorare</span>
          <motion.div
            className="w-px h-20 bg-gradient-to-b from-yellow-400 via-pink-500 to-transparent"
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="relative min-h-screen py-16 pb-0 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        {/* Background Orbs */}
        <motion.div
         className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none"
         animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
         transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
        className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl pointer-events-none"
         animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
         transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-8 mb-4">
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: '96px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <span className="text-sm uppercase tracking-[0.3em] text-white/40">LAVORI SELEZIONATI</span>
            </div>
            <h2 className="text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              I MIEI PROGETTI
            </h2>
          </motion.div>

          {/* Categories Grid */}
          <div className="space-y-32">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: catIndex * 0.2, duration: 0.8 }}
              >
                {/* Category Title */}
                <div className="mb-12 flex items-center gap-8">
                  <motion.div
                    className={`h-1 w-24 bg-gradient-to-r ${category.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '96px' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0, duration: 0.8 }}
                  />
                  <h3 className={`text-4xl font-black bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                  </h3>
                </div>

                {/* Projects in Category */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {category.projects.map((project, projIndex) => (
                    <motion.div
                    key={project.id}
                     className={`group relative overflow-hidden cursor-pointer bg-zinc-900 transition-all duration-500 ${
                     expandedProject === project.id
                   ? 'col-span-2 h-[900px]'
                 : 'h-[500px]'
                    }`}
                   onClick={(e) => {
                  e.stopPropagation();
                  setExpandedProject(expandedProject === project.id ? null : project.id);
                 }}
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-zinc-800 transition-transform duration-600 ease-out group-hover:scale-110" />

                      {/* Lateral Colored Line */}
                      <motion.div
                        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${category.color} origin-top`}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.2 + 0.3, duration: 0.8 }}
                      />

                      {/* Expanding Circle on Hover */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-60 scale-0 group-hover:scale-[20] transition-all duration-700 ease-out`} />

                      {/* Giant Rotating Number */}
                      <div className="absolute top-0 right-0 p-8 transition-transform duration-[1500ms] ease-out group-hover:rotate-[360deg]">
                        <span className="text-[12rem] font-black leading-none text-white/5 group-hover:text-white/10 transition-colors duration-300">
                          {project.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <div className="relative z-10">
                          <p className={`text-xs uppercase tracking-widest bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-3`}>
                            {project.year}
                          </p>

                          <h4 className="text-5xl font-black leading-none mb-2">
                            {project.title}
                          </h4>

                          <h5 className="text-3xl font-black leading-none text-white/60 mb-4">
                            {project.subtitle}
                          </h5>

                          <p className="text-sm text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative min-h-screen py-32 px-8 bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-8 mb-4">
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: '96px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <span className="text-sm uppercase tracking-[0.3em] text-white/40">Conosciamoci</span>
            </div>
            <h2 className="text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              CHI SONO
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20 items-center">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed mb-8 font-light">
                Sono una <span className="font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">communication designer</span> specializzata in narrazioni visive audaci che superano i confini convenzionali.
              </p>
              <p className="text-xl text-white/60 leading-relaxed mb-8">
                Con oltre 8 anni di esperienza, ho collaborato con brand e studi in tutto il mondo per creare soluzioni di design d'impatto in molteplici discipline. Il mio lavoro vive all'intersezione tra arte, tecnologia e storytelling.
              </p>
              
            </motion.div>

            {/* Info Cards */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {[
                {
                  label: 'Esperienza',
                  content: 'Brand Identity, Editorial Design, Motion Graphics, Esperienze Digitali',
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  label: 'Posizione',
                  content: 'Basata a Milano, Disponibile in tutto il mondo',
                  color: 'from-purple-500 to-indigo-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group relative p-6 bg-black/40 border border-white/10 overflow-hidden cursor-pointer flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color}`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scaleX: 3 }}
                  />
                  <div className="relative z-10">
                    <h3 className={`text-xs uppercase tracking-widest mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-bold`}>
                      {item.label}
                    </h3>
                    <p className="text-lg text-white/80">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                COMPETENZE
              </h3>
              <p className="text-white/60">Le mie aree di specializzazione</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Brand Identity', description: 'Logo design, sistemi di identità visiva', color: 'from-purple-500 to-pink-500', fast: true },
                { name: 'Editorial Design', description: 'Layout editoriali, tipografia', color: 'from-blue-500 to-cyan-500', fast: true },
                { name: 'Digital Design', description: 'Interfacce web e app', color: 'from-orange-500 to-yellow-500', fast: true },
                { name: 'Motion Graphics', description: 'Animazioni, tipografia cinetica', color: 'from-green-500 to-emerald-500', fast: true },
                { name: 'Packaging Design', description: 'Sistemi di packaging prodotto', color: 'from-pink-500 to-rose-500', fast: true },
                { name: 'Illustration', description: 'Disegno digitale e tradizionale', color: 'from-indigo-500 to-purple-500', fast: true }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group relative p-6 bg-zinc-900 border border-white/10 cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "tween", duration: 0.15 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity ${skill.fast ? `duration-300` : 'duration-300'}`} />
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${skill.color}`} />
                  <div className="relative z-10">
                    <h4 className={`text-xl font-black mb-2 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                      {skill.name}
                    </h4>
                    <p className="text-sm text-white/60">{skill.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-12">
              <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                PROGRAMMI
              </h3>
              <p className="text-white/60">Software che utilizzo quotidianamente</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Photoshop', category: 'Adobe', color: 'from-blue-500 to-cyan-600' },
                { name: 'Illustrator', category: 'Adobe', color: 'from-orange-500 to-amber-600' },
                { name: 'InDesign', category: 'Adobe', color: 'from-pink-500 to-rose-600' },
                { name: 'After Effects', category: 'Adobe', color: 'from-purple-500 to-violet-600' },
                { name: 'Premiere Pro', category: 'Adobe', color: 'from-indigo-500 to-blue-600' },
                { name: 'Figma', category: 'Design', color: 'from-purple-400 to-pink-500' },
                { name: 'Blender', category: '3D', color: 'from-orange-500 to-red-600' },
                { name: 'Procreate', category: 'Illustration', color: 'from-pink-500 to-purple-600' }
              ].map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className="group relative p-6 bg-zinc-900 border border-white/10 cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                  <div className="relative z-10 text-center">
                    <h4 className="text-lg font-black text-white mb-1">
                      {tool.name}
                    </h4>
                    <p className="text-xs uppercase tracking-wider text-white/40">{tool.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative min-h-screen flex items-center justify-center px-8 bg-black overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-500/20 via-pink-500/20 to-purple-500/20 blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -80, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Section Title */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div
                className="h-1 w-16 bg-gradient-to-r from-transparent to-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: '64px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <span className="text-sm uppercase tracking-[0.3em] text-white/40">Mettiamoci in contatto</span>
              <motion.div
                className="h-1 w-16 bg-gradient-to-r from-pink-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '64px' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
            <h2 className="text-7xl lg:text-8xl font-black text-white text-center">
              CREIAMO INSIEME
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-xl lg:text-2xl text-white/60 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Hai un progetto in mente? Collaboriamo per dare vita alla tua visione con un design audace e creativo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a
              href="mailto:hello@example.com"
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
              <span className="relative z-10">
                Scrivimi
              </span>
            </motion.a>

            <motion.a
              href="#"
              className="group relative px-12 py-6 bg-transparent border-2 border-white text-white text-lg font-black uppercase tracking-wider overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">
                Scarica CV
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { name: 'Instagram', handle: '@designer', color: 'from-pink-500 to-purple-500' },
              { name: 'Behance', handle: '/designer', color: 'from-blue-500 to-cyan-500' },
              { name: 'LinkedIn', handle: '/in/designer', color: 'from-blue-600 to-indigo-500' },
              { name: 'Dribbble', handle: '/designer', color: 'from-pink-500 to-rose-500' }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                className="group relative p-6 bg-zinc-900 border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20`}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${social.color}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.h4
                    className="text-lg font-black mb-1 text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.name}
                  </motion.h4>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{social.handle}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-20 pt-12 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
              <p>© 2026 Noemi. Tutti i diritti riservati.</p>
              <p className="uppercase tracking-wider">Milano, Italia</p>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
}
