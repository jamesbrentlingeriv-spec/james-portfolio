'use client';

import React from 'react';
import EbookReader from './EbookReader';
import { Project } from '@/data/projects';
import { AnimatePresence, motion } from 'framer-motion';

interface BookReaderModalProps {
  project: Project;
  onClose: () => void;
}

export default function BookReaderModal({ project, onClose }: BookReaderModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 select-none">
        {/* Semi-transparent backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container holding the EbookReader */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-6xl z-10"
        >
          <EbookReader project={project} onClose={onClose} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
