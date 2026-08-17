'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import ProjectGallery from '@/components/ProjectGallery';
import { 
  Sun, 
  Moon, 
  Code, 
  BookOpen, 
  Music, 
  Mail, 
  Briefcase,
  ArrowRight,
  MapPin
} from 'lucide-react';

export default function PortfolioHome() {
  const { theme, toggleTheme } = useTheme();

  const technicalSkills = [
    { name: 'C++', level: '90%' },
    { name: 'Qt Framework', level: '85%' },
    { name: 'Python', level: '80%' },
    { name: 'TypeScript', level: '85%' },
    { name: 'React / Next.js', level: '90%' },
    { name: 'Tailwind CSS', level: '95%' },
    { name: 'HTML / CSS', level: '95%' },
    { name: 'JavaScript', level: '90%' }
  ];

  const creativeSkills = [
    { name: 'Creative Prose & Fiction', description: 'Cosmic sci-fi, thriller anthologies' },
    { name: 'Poetry & Lyric Composition', description: 'Introspective, structural stanzas' },
    { name: 'Music Production', description: 'Synthwave, cinematic ambient tracks' },
    { name: 'Audio Engineering', description: 'Audio processing, dynamic sync tools' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-background text-foreground pb-24">
      {/* 1. NAVIGATION BAR - Clean & Professional */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <h1 className="text-xl font-bold tracking-tight">
              James Brentlinger
            </h1>
          </motion.div>

          <nav className="flex items-center gap-8 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block">About</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block">Skills</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent/10 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* 2. HERO SECTION - Clean & Professional */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Available for freelance work</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Developer, Author,<br />
            <span className="text-accent">and Musician</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            I build precision engineering tools, craft speculative fiction, and compose synthwave music. 
            Blending systems-level C++ expertise with creative expression.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="mailto:james@iamjames.lol" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent/5 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>

      {/* 3. ABOUT ME SECTION - Clean & Professional */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">About</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Multi-disciplinary Creator
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a systems developer with deep expertise in C++ and Qt Framework, building industrial-grade 
                engineering applications for optical diagnostics and precision manufacturing. My work demands 
                sub-micron accuracy and real-time performance.
              </p>
              <p>
                Beyond code, I'm a speculative fiction author exploring cosmic horror and thriller narratives, 
                and a synthwave musician composing cinematic ambient tracks. This blend of technical precision 
                and creative expression defines my approach to every project.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Engineering Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    C++, Qt, Python, TypeScript — building tools that solve real problems
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Creative Writing</h3>
                  <p className="text-sm text-muted-foreground">
                    Speculative fiction, cosmic horror, and thriller anthologies
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Music Production</h3>
                  <p className="text-sm text-muted-foreground">
                    Synthwave compositions and cinematic ambient soundscapes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. SKILLS MATRIX SECTION - Clean Grid */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Skills</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Technical & Creative Toolkit
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-accent" />
                Technical Engineering
              </h3>
              <div className="space-y-4">
                {technicalSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative Skills */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Creative Synthesis
              </h3>
              <div className="space-y-4">
                {creativeSkills.map((skill) => (
                  <div key={skill.name} className="flex gap-4 p-4 rounded-lg border border-border hover:border-accent/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      {skill.name.includes('Music') || skill.name.includes('Audio') ? (
                        <Music className="w-5 h-5 text-accent" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. PROJECT GALLERY SECTION */}
      <ProjectGallery />

      {/* 6. FOOTER - Clean & Professional */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2026 James Brentlinger. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Developer, Author, and Musician
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="mailto:james@iamjames.lol" 
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/iamjameslol" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              aria-label="GitHub"
            >
              <Code className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/iamjameslol" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              aria-label="LinkedIn"
            >
              <Briefcase className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
