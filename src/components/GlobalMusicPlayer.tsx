'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  SkipForward, 
  SkipBack, 
  ListMusic
} from 'lucide-react';
import { PLAYLIST, Song } from '@/data/playlist';
import MusicPlayer from './MusicPlayer';

export default function GlobalMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Collapsed Capsule States
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // MusicPlayer overlay state

  const activeTrack = PLAYLIST[currentTrackIndex] || PLAYLIST[0];

  // Initialize volume in collapsed bar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Audio track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
    setCurrentTime(0);
  }, [currentTrackIndex]);

  // Pause collapsed player when expanding the advanced synthesizer player
  useEffect(() => {
    if (isExpanded && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [isExpanded]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.log("Audio play blocked:", e);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    handleNext();
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev === PLAYLIST.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg select-none">
      {/* Hidden Audio Element for collapsed capsule */}
      <audio
        ref={audioRef}
        src={activeTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {/* 1. EXPANDED MUSIC PLAYER STAGE */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="mb-4 w-full rounded-2xl overflow-hidden shadow-2xl border border-border relative bg-card"
          >
            <MusicPlayer onClose={() => setIsExpanded(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING CAPSULE BAR (COLLAPSED STATE) */}
      <div className="bg-card border border-border rounded-full py-3 px-5 flex items-center gap-3 shadow-lg select-none">
        
        {/* Play/Pause Trigger */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          )}
        </button>

        {/* Dynamic metadata & scrubber */}
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-center text-[9px] font-mono text-muted-foreground mb-0.5">
            <span className="truncate font-semibold text-foreground flex items-center gap-1">
              {isPlaying && (
                <span className="flex gap-0.5 items-end h-2 w-2 mr-1">
                  <span className="w-0.5 h-1.5 bg-accent animate-[pulse_0.8s_infinite]" />
                  <span className="w-0.5 h-2.5 bg-accent animate-[pulse_0.5s_infinite_0.2s]" />
                  <span className="w-0.5 h-1 bg-accent animate-[pulse_0.9s_infinite_0.4s]" />
                </span>
              )}
              {activeTrack.title}
            </span>
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>

          <div className="flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleScrub}
              className="custom-scrubber flex-grow h-1"
            />
          </div>
        </div>

        {/* Skippers & volume panel */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Skip Back */}
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
            title="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Skip Forward */}
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Expanded Drawer Toggle */}
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className={`p-1.5 rounded-full hover:bg-muted cursor-pointer transition-colors ${isExpanded ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-foreground'}`}
            title="Toggle Expanded Studio"
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Volume control block */}
          <div className="flex items-center gap-1 group/vol relative">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-accent" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-accent" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-0 group-hover/vol:w-16 h-1 accent-accent transition-all duration-300 opacity-0 group-hover/vol:opacity-100 rounded-full cursor-pointer bg-muted"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
