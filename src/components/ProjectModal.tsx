'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Cpu, Layers } from 'lucide-react';
import { Project } from '@/data/projects';
import BookReaderModal from './BookReaderModal';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeZoomMedia, setActiveZoomMedia] = useState<{ type: 'video' | 'image'; url: string } | null>(null);

  if (!project) return null;

  // Book Category Override: If it's a Book, render the BookReaderModal instead
  if (project.category === 'Book') {
    return <BookReaderModal project={project} onClose={onClose} />;
  }

  // Sample screenshots/video if the project media arrays are empty (for high aesthetic fallback)
  const defaultVideo = 'https://assets.mixkit.co/videos/preview/mixkit-nebula-in-outer-space-dark-background-31908-large.mp4';
  const defaultImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  ];

  const videoUrl = project.mediaUrl || defaultVideo;
  const screenshots = project.images.length > 0 ? project.images : defaultImages;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Semi-transparent backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-6xl h-[85vh] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Media Gallery (Scrollable) */}
          <div className="w-full md:w-[55%] h-1/2 md:h-full overflow-y-auto border-b md:border-b-0 md:border-r border-border p-6 space-y-6">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" /> Media Showcase
            </h3>

            {/* Video Showcase at Top */}
            <motion.div
              layoutId={`video-${project.id}`}
              onClick={() => setActiveZoomMedia({ type: 'video', url: videoUrl })}
              className="relative aspect-video rounded-xl overflow-hidden border border-border bg-muted group cursor-zoom-in"
            >
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-medium bg-accent/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5" /> Fullscreen Demo
                </span>
              </div>
            </motion.div>

            {/* Screenshots Grid below */}
            <div className="grid grid-cols-2 gap-4">
              {screenshots.map((src, idx) => (
                <motion.div
                  key={idx}
                  layoutId={`image-${project.id}-${idx}`}
                  onClick={() => setActiveZoomMedia({ type: 'image', url: src })}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted group cursor-zoom-in hover:border-accent/30 transition-colors"
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Panel: Project Details (Scrollable) */}
          <div className="w-full md:w-[45%] h-1/2 md:h-full overflow-y-auto p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/10 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {project.category}
              </div>

              {/* Bold Hero Project Title */}
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                {project.title}
              </h2>

              {/* Rich descriptions */}
              <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p className="font-medium text-foreground">
                  {project.description}
                </p>
                <div className="h-px bg-border my-4" />
                <p className="opacity-90">
                  {project.details}
                </p>
              </div>
            </div>

            {/* Built With Tech Stack section */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent" /> Built With
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nested Fullscreen Media Overlay */}
        <AnimatePresence>
          {activeZoomMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveZoomMedia(null)}
              className="absolute inset-0 bg-black/95 z-30 flex items-center justify-center p-4 cursor-zoom-out"
            >
              {activeZoomMedia.type === 'video' ? (
                <motion.video
                  layoutId={`video-${project.id}`}
                  src={activeZoomMedia.url}
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg border border-border shadow-2xl"
                />
              ) : (
                <motion.img
                  layoutId={activeZoomMedia.url} // layoutId maps to the image trigger
                  src={activeZoomMedia.url}
                  alt="Fullscreen view"
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg border border-border shadow-2xl"
                />
              )}
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border">
                Click anywhere to close full view
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
