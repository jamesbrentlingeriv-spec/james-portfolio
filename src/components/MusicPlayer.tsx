/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Music, 
  List, 
  Volume2, 
  Sparkles, 
  Languages, 
  X 
} from 'lucide-react';
import { Song, PLAYLIST as SONGS_DATA } from '@/data/playlist';

interface MusicPlayerProps {
  onClose?: () => void;
}

export default function MusicPlayer({ onClose }: MusicPlayerProps) {
  const [songs] = useState<Song[]>(SONGS_DATA);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [showQueue, setShowQueue] = useState(false);
  const [synthNodeActive, setSynthNodeActive] = useState(false);

  const activeSong = songs[currentSongIndex];
  const [duration, setDuration] = useState(activeSong.duration);
  
  // Refs for Synthesizer scheduler
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const synthIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const lyricContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync state duration & reset timeline when currentSongIndex changes
  useEffect(() => {
    setCurrentTime(0);
    setDuration(activeSong.duration);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentSongIndex, songs]);

  // Handle Volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Auto-scroll lyrics
  useEffect(() => {
    // Find active lyric idx
    const activeIdx = activeSong.lyrics.findIndex((l, idx) => {
      const nextL = activeSong.lyrics[idx + 1];
      return currentTime >= l.time && (!nextL || currentTime < nextL.time);
    });

    if (activeIdx !== -1 && lyricContainerRef.current) {
      const activeElement = lyricContainerRef.current.children[activeIdx] as HTMLElement;
      if (activeElement) {
        lyricContainerRef.current.scrollTo({
          top: activeElement.offsetTop - lyricContainerRef.current.clientHeight / 2 + activeElement.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentTime, activeSong]);

  // Real-time progress tracker - fires every 100ms for accurate lyric sync
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      if (activeSong.audioUrl && audioRef.current) {
        // Use exact currentTime from audio element (no floor, keep decimal precision)
        setCurrentTime(audioRef.current.currentTime);
      } else if (!activeSong.audioUrl) {
        // Synthesizer mode: increment by 1 second
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, activeSong.audioUrl, duration]);

  // Handle Play/Pause and Song playback logic
  useEffect(() => {
    // Stop synthesis pulse
    stopSynthesizer();

    // Clear simulated clock timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (activeSong.audioUrl) {
      // PLAYING REAL MP3 FILE
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch((err) => {
            console.warn("Playback prevented by gesture restriction:", err);
          });
        } else {
          audioRef.current.pause();
        }
      }
    } else {
      // PLAYING SYNTHESIZER SIMULATOR TRACKS
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (isPlaying) {
        // Start synthesizer pulse
        startSynthesizer();
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      stopSynthesizer();
    };
  }, [isPlaying, currentSongIndex, activeSong, duration]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setTimeout(() => {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
      setIsPlaying(true);
    }, 150);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setTimeout(() => {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      setIsPlaying(true);
    }, 150);
  };

  // Web Audio API Synthesizer
  const startSynthesizer = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      setSynthNodeActive(true);

      const params = activeSong.audioParams;
      if (!params) {
        console.warn("Synthesizer params missing on audio track.");
        return;
      }
      const bpm = params.tempo;
      const beatRateMs = (60 / bpm) * 1000;

      // Repeat chord notes on the beat!
      let chordIndex = 0;
      synthIntervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        
        // Retrieve chords list
        const chord = params.chords[chordIndex % params.chords.length];
        chordIndex++;

        // Trigger polyphonic oscillators
        chord.forEach((midiNote, idx) => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          
          // Pitch converter (MIDI value to frequency hz)
          const freq = Math.pow(2, (midiNote - 69) / 12) * 440;
          osc.frequency.setValueAtTime(freq, now);
          
          if (params.type === 'synthwave') {
            osc.type = idx === 0 ? 'sawtooth' : 'triangle';
            gain.gain.setValueAtTime(0.02 * volume, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + (beatRateMs / 1000) * 0.9);
          } else if (params.type === 'acoustic') {
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.04 * volume, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + (beatRateMs / 1000) * 0.7);
          } else {
            // Ambient soft waves
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.03 * volume, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + (beatRateMs / 1000) * 0.95);
          }

          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          
          osc.start();
          osc.stop(now + beatRateMs / 1000);
          
          // Store oscillator notes reference
          oscsRef.current.push(osc);
        });

        // Trigger a cute subtle hi-hat/noise click on 'ambient' or 'synthwave'
        if (params.type === 'synthwave') {
          triggerBeatHiss();
        }

      }, beatRateMs);

    } catch (e) {
      console.warn("Synthesis state blocked.", e);
    }
  };

  const triggerBeatHiss = () => {
    if (!audioCtxRef.current) return;
    const now = audioCtxRef.current.currentTime;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(12000, now);
    gain.gain.setValueAtTime(0.005 * volume, now);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.05);
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    osc.start();
    osc.stop(now + 0.05);
  };

  const stopSynthesizer = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    oscsRef.current.forEach((osc) => {
      try { osc.stop(); } catch(e) {}
    });
    oscsRef.current = [];
  };

  const handleScrub = (seconds: number) => {
    setCurrentTime(seconds);
    if (activeSong.audioUrl && audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
    const audioCtx = audioCtxRef.current;
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const formatTime = (secs: number) => {
    const validSecs = Math.floor(secs || 0);
    const mins = Math.floor(validSecs / 60);
    const remaining = validSecs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  // Fallback covers in case paths are blank
  const getCoverArt = (index: number) => {
    const gradients = [
      'from-indigo-600 via-purple-700 to-pink-500',
      'from-cyan-500 via-blue-600 to-blue-500',
      'from-amber-500 via-rose-600 to-violet-700'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white select-none rounded-b-xl overflow-hidden border-t border-white/10 relative">
      
      {/* Absolute top close button for mobile overlays */}
      {onClose && (
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-4 z-40 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer lg:hidden border border-white/10"
          title="Collapse Player"
        >
          <X size={16} />
        </button>
      )}

      {/* Hidden real audio element for playing actual files */}
      <audio 
        ref={audioRef}
        src={activeSong.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current && activeSong.audioUrl) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && activeSong.audioUrl) {
            const realDur = audioRef.current.duration;
            if (realDur && !isNaN(realDur) && realDur > 0) {
              setDuration(realDur);
            }
          }
        }}
        onEnded={() => {
          handleNext();
        }}
      />

      {/* Mini Unmute Header if audio is suspended */}
      {!synthNodeActive && (
        <div className="bg-accent/10 border-b border-accent/20 text-accent py-1.5 px-4 text-center text-xs flex items-center justify-center gap-2 animate-pulse shrink-0">
          <Sparkles size={13} className="shrink-0" />
          <span>Tap Play or adjust slider to initialize Real-Time Web Audio Synthesizer!</span>
        </div>
      )}

      {/* Main Panel layout */}
      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden h-[420px] md:h-[450px]">
        
        {/* Left pane: Player, disks, track details */}
        <div className="flex-grow flex flex-col justify-center items-center p-6 border-b lg:border-b-0 lg:border-r border-white/5 relative bg-gradient-to-b from-[#181818] to-[#121212] min-w-0">
          
          {/* CD Art disk */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center shadow-2xl mb-4 group cursor-pointer border border-white/10 shrink-0">
            {/* Album Cover Background */}
            <div 
              className={`absolute inset-0 rounded-full ${activeSong.coverUrl ? 'bg-cover bg-center' : `bg-gradient-to-br ${getCoverArt(currentSongIndex)}`} opacity-80 ${isPlaying ? 'animate-[spin_12s_linear_infinite]' : 'animate-pulse-slow'}`}
              style={activeSong.coverUrl ? { backgroundImage: `url("${activeSong.coverUrl}")` } : undefined}
            />
            
            {/* Vinyl record rings */}
            <div className="absolute inset-1.5 rounded-full border border-black/30 bg-gradient-to-br from-transparent via-black/40 to-black/80" />
            <div className="absolute inset-6 rounded-full border border-black/20" />
            <div className="absolute inset-12 rounded-full border border-black/25" />
            
            {/* Center Cover */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cover bg-center border-4 border-[#121212] z-10 overflow-hidden flex items-center justify-center bg-zinc-900 shadow-inner">
              <Music size={20} className="text-white/40 group-hover:text-white/80 transition-colors" />
            </div>

            {/* Spinner when active */}
            <div className={`absolute inset-0 rounded-full border-t-2 border-accent/30 -z-10 ${isPlaying ? 'animate-spin-slow' : ''}`} />
          </div>

          <div className="text-center w-full max-w-sm mb-3">
            <h2 className="text-base sm:text-lg font-bold tracking-tight truncate">{activeSong.title}</h2>
            <p className="text-zinc-400 text-xs mt-0.5 flex items-center justify-center gap-1">
              <span>{activeSong.artist}</span>
              <span className="text-zinc-600">•</span>
              <span className="italic text-[10px]">{activeSong.album}</span>
            </p>
          </div>

          {/* Interactive scrubbing bar */}
          <div className="w-full max-w-md flex flex-col gap-1 px-2">
            <input 
              type="range"
              id="music-progress"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => handleScrub(parseFloat(e.target.value))}
              className="w-full accent-accent h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono select-none">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-5 mt-2">
            <button 
              type="button"
              id="music-prev"
              onClick={handlePrev} 
              className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer"
            >
              <SkipBack size={20} />
            </button>
            <button 
              type="button"
              id="music-play-pause"
              onClick={() => {
                if (!audioCtxRef.current) {
                  audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                }
                setIsPlaying(!isPlaying);
              }} 
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shrink-0"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>
            <button 
              type="button"
              id="music-next"
              onClick={handleNext} 
              className="text-zinc-400 hover:text-white p-1.5 transition-colors cursor-pointer"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>

        {/* Right pane: Scrolling Synchronized Lyrics */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col bg-[#161616] p-4 overflow-hidden h-[200px] lg:h-full select-none">
          <header className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-3 shrink-0">
            <div className="flex items-center gap-1.5 font-semibold text-xs tracking-wide text-zinc-300">
              <Languages size={14} className="text-accent" />
              <span>LYRICS SYNC SHEET</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                id="music-queue-toggle"
                onClick={() => { setShowQueue(!showQueue); }}
                className={`p-1 rounded transition-all cursor-pointer flex items-center gap-1 text-[10px] border ${
                  showQueue 
                    ? 'border-accent bg-accent/10 text-accent' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <List size={12} /> Queue ({songs.length})
              </button>
              {onClose && (
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800/50 cursor-pointer hidden lg:inline-block"
                  title="Collapse Player"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </header>

          <div className="flex-grow relative overflow-hidden">
            {showQueue ? (
              // List queue of songs
              <div className="absolute inset-0 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar select-none">
                {songs.map((song, i) => (
                  <button 
                    key={song.id}
                    type="button"
                    id={`song-select-${song.id}`}
                    onClick={() => {
                      setCurrentSongIndex(i);
                      setCurrentTime(0);
                      setIsPlaying(true);
                      setShowQueue(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg flex items-center gap-2 transition-colors ${
                      i === currentSongIndex 
                        ? 'bg-accent/10 border border-accent/30 text-accent' 
                        : 'bg-zinc-900/40 border border-transparent hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded bg-gradient-to-br ${getCoverArt(i)} flex items-center justify-center shrink-0`}>
                      <Music size={11} className="text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs truncate">{song.title}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{song.artist}</div>
                    </div>
                    {i === currentSongIndex && isPlaying && (
                      <div className="flex gap-0.5 items-end h-2.5 shrink-0">
                        <span className="w-0.5 h-full bg-accent rounded-sm animate-pulse-slow" />
                        <span className="w-0.5 h-2/3 bg-accent rounded-sm animate-pulse" />
                        <span className="w-0.5 h-1/2 bg-accent rounded-sm animate-pulse-slow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              // Real-time scrolling lyrics
              <div 
                ref={lyricContainerRef}
                className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar space-y-4 flex flex-col scroll-py-8 select-text"
              >
                {activeSong.lyrics.map((lyric, idx) => {
                  const nextLyric = activeSong.lyrics[idx + 1];
                  const isActive = currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
                  
                  return (
                    <button
                      key={idx}
                      type="button"
                      id={`lyric-${idx}`}
                      onClick={() => handleScrub(lyric.time)}
                      className={`text-left block cursor-pointer transition-all duration-300 ${
                        isActive 
                          ? 'text-accent text-xs sm:text-sm font-bold leading-normal drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                          : 'text-zinc-500 hover:text-zinc-300 hover:scale-101 text-xs sm:text-sm font-medium'
                      }`}
                    >
                      {lyric.text}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <footer className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-2.5 text-[10px] text-zinc-400 font-medium select-none shrink-0">
            <Volume2 size={12} className="text-zinc-500" />
            <input 
              type="range"
              id="volume-slider"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => {
                const volts = parseFloat(e.target.value);
                setVolume(volts);
                try {
                  const ctx = audioCtxRef.current;
                  if (ctx && ctx.state !== 'suspended') {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(440, ctx.currentTime);
                    gain.gain.setValueAtTime(0.04 * volts, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.05);
                  }
                } catch (err) {}
              }}
              className="flex-1 accent-accent h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <span className="font-mono w-5 text-right shrink-0">{Math.round(volume * 100)}%</span>
          </footer>

        </div>
      </div>
    </div>
  );
}
