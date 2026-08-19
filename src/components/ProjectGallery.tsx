'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, Project } from '@/data/projects';
import { BookOpen, Laptop, Smartphone, Globe, Layers, ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

type CategoryFilter = 'All' | Project['category'];

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: CategoryFilter[] = ['All', 'Android App', 'PWA', 'Windows App', 'Book', 'Website'];

  // Filter projects
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  // Helper to return specific category styles and icons
  const getCategoryStyles = (category: Project['category']) => {
    switch (category) {
      case 'Android App':
        return {
          icon: <Smartphone className="w-4 h-4 text-white" />,
        };
      case 'PWA':
        return {
          icon: <Layers className="w-4 h-4 text-white" />,
        };
      case 'Windows App':
        return {
          icon: <Laptop className="w-4 h-4 text-white" />,
        };
      case 'Book':
        return {
          icon: <BookOpen className="w-4 h-4 text-white" />,
        };
      case 'Website':
        return {
          icon: <Globe className="w-4 h-4 text-white" />,
        };
    }
  };

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
      
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <span className="text-sm font-medium text-accent uppercase tracking-wider">Work</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Projects & Creations
        </h2>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
          Explore a curated selection of systems development, desktop diagnostics, creative literature, and interactive web tools.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-accent text-white'
                  : 'bg-black text-white dark:bg-muted dark:text-foreground hover:bg-black/80 dark:hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const styles = getCategoryStyles(project.category);
            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={() => setActiveProject(project)}
                className={`rounded-xl overflow-hidden border p-6 flex flex-col justify-between h-[290px] card-shadow hover:card-shadow-hover cursor-pointer group transition-all duration-300 bg-card border-border hover:border-accent/30 hover:-translate-y-1`}
              >
                {/* Card Top: Header details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    {/* Category icon and text */}
                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 bg-accent text-white">
                      {styles.icon}
                      {project.category}
                    </div>
                    {/* Hover Arrow indicator */}
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>

                  {/* Sleek Thumbnail & Title Container */}
                  <div className="flex gap-3 items-center">
                    {project.iconUrl && (
                      <div className="w-14 h-14 rounded-lg border border-border overflow-hidden shrink-0 flex items-center justify-center group-hover:border-accent/30 group-hover:scale-105 transition-all duration-300">
                        <img 
                          src={project.iconUrl} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <h4 className="text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {project.title}
                    </h4>
                  </div>
                </div>

                {/* Card Bottom: Description & Tags */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Built with previews */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-accent text-white font-medium">
                        {tag}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-accent text-white font-medium">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Details / Book Reader Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
