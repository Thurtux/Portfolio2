import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Github, Linkedin, Mail, Phone, Languages, ArrowDown, Code, Palette, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Galaxy from './components/Galaxy';
import Earth from './components/Earth';
import Section from './components/Section';
import ProjectModal from './components/ProjectModal';

interface Project {
  title: string;
  description: string;
  details: string[];
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
}

const translations = {
  en: {
    about: "About Me",
    aboutText: "I am a developer passionate about transforming ideas into innovative digital experiences. With expertise in web development and 3D graphics, I combine technology and creativity to create dynamic, engaging, and impactful projects. My goal is to always go beyond the conventional, delivering solutions that uniquely combine functionality and design.",
    projects: "Projects",
    contact: "Contact",
    contactText: "Interested in working together? Get in touch!",
    sendEmail: "Send Email",
    seeMore: "See more →",
    visitSite: "Visit Site",
    features: "Features",
    technologies: "Technologies",
  },
  pt: {
    about: "Sobre Mim",
    aboutText: "Sou um desenvolvedor apaixonado por transformar ideias em experiências digitais inovadoras. Com expertise em desenvolvimento web e gráficos 3D, combino tecnologia e criatividade para criar projetos dinâmicos, envolventes e impactantes. Meu objetivo é sempre ir além do convencional, entregando soluções que unem funcionalidade e design de forma única.",
    projects: "Projetos",
    contact: "Contato",
    contactText: "Interessado em trabalhar juntos? Entre em contato!",
    sendEmail: "Enviar Email",
    seeMore: "Ver mais →",
    visitSite: "Visitar Site",
    features: "Funcionalidades",
    technologies: "Tecnologias",
  }
};

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const projects: Project[] = [
    {
      title: "Maison Elara",
      description: language === 'pt' 
        ? "Site completo para salão de beleza com agendamento para o whatssap, apresentando todos os serviços disponíveis, galeria de foto."
        : "Complete website for a beauty salon with WhatsApp booking, showcasing all available services and a photo gallery.",
      details: language === 'pt' ? [
        "Sistema de agendamento",
        "Catálogo completo de produtos e serviços",
        "Depoimentos de clientes satisfeitos",
        "Informações sobre a equipe e instalações",
        "Localização e horário de funcionamento"
      ] : [
        "Online scheduling system",
        "Photo gallery",
        "Complete product and service catalog",
        "Customer testimonials",
        "Team and facility information",
        "Location and business hours"
      ],
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Node.js",
        "Express"
      ],
      imageUrl: "https://i.postimg.cc/QC9qDDbb/Captura-de-tela-2026-05-27-125348.png",
      liveUrl: "https://maison-elara-nu.vercel.app/"
    },
    {
  title: "Gustha · Consultoria de Estilo",
  description: language === 'pt'
    ? "Site para consultor de estilo pessoal com sistema de reserva de consultorias, apresentando os serviços de styling e uma galeria de looks."
    : "Website for a personal style consultant with a consultation booking system, showcasing styling services and a lookbook gallery.",
  details: language === 'pt' ? [
    "Sistema de reserva de consultorias",
    "Catálogo de serviços de consultoria de estilo",
    "Galeria de looks e transformações",
    "Apresentação do consultor e da metodologia",
    "Depoimentos de clientes",
    "Contato direto via WhatsApp"
  ] : [
    "Consultation booking system",
    "Style consulting service catalog",
    "Lookbook and transformation gallery",
    "Consultant bio and methodology",
    "Client testimonials",
    "Direct WhatsApp contact"
  ],
  technologies: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Express"
  ],
  imageUrl: "https://i.postimg.cc/43q5zbP8/5a642669-22c9-4c88-a0b2-7034d11351aa.jpg", 
  liveUrl: "https://g7-nvr1.vercel.app/"
}
  ];

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full">
        <Canvas camera={{ position: [3, 3, 3] }}>
          {scrollProgress < 0.3 ? (
            <Earth scale={1 - scrollProgress * 3} />
          ) : (
            <Galaxy opacity={Math.min((scrollProgress - 0.3) * 3, 1)} />
          )}
          <OrbitControls enableDamping enableZoom={false} />
        </Canvas>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
        className="fixed top-6 right-6 z-50 glass-card px-4 py-3 rounded-full flex items-center gap-2 text-white/80 hover:text-white shadow-lg"
      >
        <Languages size={20} />
        <span className="text-sm font-semibold tracking-wide">{language.toUpperCase()}</span>
      </motion.button>

      <div className="relative z-10">
        <Section className="text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-4"
          >
            <motion.h1 
              className="text-8xl font-black mb-8 gradient-text section-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Arthur Santos Lopes
            </motion.h1>
            <motion.p 
              className={`text-3xl mb-12 text-gray-200 font-light ${isTyping ? 'typing-effect' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {language === 'pt' ? 'Desenvolvedor Full Stack' : 'Full Stack Developer'}
            </motion.p>
            
            <motion.div 
              className="flex justify-center items-center space-x-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center space-x-2 text-gray-300">
                <Code size={20} className="text-blue-400" />
                <span className="font-medium">React</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Palette size={20} className="text-purple-400" />
                <span className="font-medium">3D Graphics</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Zap size={20} className="text-yellow-400" />
                <span className="font-medium">Innovation</span>
              </div>
            </motion.div>
            
            <div className="flex justify-center space-x-8 mb-16">
              <motion.a 
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                href="https://github.com/Thurtux" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon p-4 glass-card rounded-full"
              >
                <Github size={32} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                href="https://www.linkedin.com/in/arthur-lopes-309841292/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon p-4 glass-card rounded-full"
              >
                <Linkedin size={32} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                href="mailto:arthurdeveloperprime@gmail.com" 
                className="social-icon p-4 glass-card rounded-full"
              >
                <Mail size={32} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                href="https://wa.me/5511971492891" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon p-4 glass-card rounded-full"
              >
                <Phone size={32} />
              </motion.a>
            </div>
            
            <motion.div
              className="floating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <ArrowDown size={32} className="text-white/60 mx-auto animate-bounce" />
            </motion.div>
          </motion.div>
        </Section>

        <Section className="text-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2 
              className="text-6xl font-black mb-12 gradient-text section-title text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t.about}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl leading-relaxed text-gray-200 text-center font-light"
            >
              {t.aboutText}
            </motion.p>
          </div>
        </Section>

        <Section className="text-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2 
              className="text-6xl font-black mb-16 gradient-text section-title text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t.projects}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 rounded-2xl cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="overflow-hidden rounded-xl mb-6">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-56 object-cover project-image"
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 gradient-text group-hover:scale-105 transition-transform">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-gray-200 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-400 hover:text-blue-300 transition-all flex items-center font-semibold text-lg"
                  >
                    {t.seeMore}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="text-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2 
              className="text-6xl font-black mb-16 gradient-text section-title text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {t.contact}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-12 rounded-2xl text-center"
            >
              <p className="text-2xl mb-12 text-gray-200 font-light">
                {t.contactText}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.a
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=arthurdeveloperprime@gmail.com"
                  className="glow-button text-white px-10 py-5 rounded-xl font-semibold text-lg shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    <Mail size={28} />
                    {t.sendEmail}
                  </span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  href="https://wa.me/5511971492891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-10 py-5 rounded-xl hover:from-green-600 hover:to-green-800 transition-all duration-300 font-semibold text-lg shadow-lg glow-button"
                >
                  <span className="flex items-center gap-3">
                    <Phone size={28} />
                    WhatsApp
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject!}
        language={language}
      />
    </div>
  );
}

export default App;