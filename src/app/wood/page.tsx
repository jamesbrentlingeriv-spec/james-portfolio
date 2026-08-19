'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WoodPortfolio() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-background text-foreground">
      {/* Wood background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'url(/woodbg.png)',
        backgroundSize: '100% auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(2px)',
        opacity: 0.6
      }} />
      <div className="fixed inset-0 bg-background/70 backdrop-blur-sm pointer-events-none z-0" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Portfolio</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight">
            Woodwork Portfolio
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 mb-12"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Craftsmanship</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Woodwork Portfolio
          </h2>
          <p className="text-muted-foreground max-w-xl text-base leading-relaxed">
            Handcrafted wood pieces showcasing attention to detail and quality craftsmanship.
          </p>
        </motion.div>

        {/* Placeholder gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: item * 0.1 }}
              className="aspect-square rounded-xl border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center hover:border-accent/30 transition-all duration-300"
            >
              <div className="text-center space-y-2 p-6">
                <div className="w-16 h-16 mx-auto rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Photo coming soon</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 py-12 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 James Brentlinger. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}