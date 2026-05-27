import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'pt';
  project: {
    title: string;
    description: string;
    details: string[];
    technologies: string[];
    imageUrl: string;
    liveUrl: string;
  };
}

const translations = {
  en: {
    features: "Features",
    technologies: "Technologies",
    visitSite: "Visit Site"
  },
  pt: {
    features: "Funcionalidades",
    technologies: "Tecnologias",
    visitSite: "Visitar Site"
  }
};

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project, language }) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative glass-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 p-3 hover:bg-white/20 rounded-full transition-all duration-300 z-10"
          >
            <X size={28} />
          </motion.button>
          
          <div className="p-10">
            <div className="overflow-hidden rounded-2xl mb-8">
              <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-80 object-cover"
              />
            </div>
            
            <h3 className="text-4xl font-black mb-6 gradient-text section-title">{project.title}</h3>
            <p className="text-2xl mb-10 text-gray-200 leading-relaxed font-light">{project.description}</p>
            
            <div className="mb-10">
              <h4 className="text-3xl font-bold mb-6 gradient-text">{t.features}:</h4>
              <ul className="space-y-4">
                {project.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start text-gray-200 text-lg"
                  >
                    <span className="mr-4 text-blue-400 text-2xl leading-none">•</span>
                    <span className="leading-relaxed">{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="mb-12">
              <h4 className="text-3xl font-bold mb-6 gradient-text">{t.technologies}:</h4>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="tech-tag px-6 py-3 rounded-full text-base"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <motion.a
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button text-white px-12 py-6 rounded-xl font-bold text-xl shadow-xl"
            >
              {t.visitSite}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;