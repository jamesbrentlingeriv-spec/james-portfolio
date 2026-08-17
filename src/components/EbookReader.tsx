/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  Type, 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Check, 
  Loader2, 
  Upload, 
  AlertCircle,
  X,
  Lock
} from 'lucide-react';
import { Project } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';

interface EbookReaderProps {
  project: Project;
  onClose?: () => void;
}

interface ParsedChapter {
  title: string;
  content: string[];
}

interface LoadedBook {
  title: string;
  author: string;
  publishedDate: string;
  wordCount: string;
  chapters: ParsedChapter[];
}

// Helper to resolve relative paths in the zip archive
function resolveRelativePath(base: string, relative: string): string {
  if (!base) return relative;
  if (relative.startsWith("/")) return relative.substring(1);
  const baseParts = base.split('/').filter(Boolean);
  const relativeParts = relative.split('/');
  
  const stack = [...baseParts];
  for (const part of relativeParts) {
    if (part === '.' || part === '') continue;
    if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  return stack.join('/');
}

export default function EbookReader({ project, onClose }: EbookReaderProps) {
  // Reader states
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl' | '2xl'>('lg');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [readerTheme, setReaderTheme] = useState<'cream' | 'sepia' | 'charcoal' | 'dark'>('cream');
  const [bookmarkIdx, setBookmarkIdx] = useState<number | null>(null);

  // Parsing and dynamic load states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [parsedBook, setParsedBook] = useState<LoadedBook | null>(null);
  
  // Restriction system lock
  const [isPreviewLocked, setIsPreviewLocked] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map theme values
  const themeClasses = {
    cream: 'bg-[#fcf8f2] text-[#2c2720] border-amber-900/10',
    sepia: 'bg-[#f4ecd8] text-[#433422] border-amber-900/15',
    charcoal: 'bg-[#1a1c1e] text-[#e2e2e4] border-zinc-800',
    dark: 'bg-[#0b0c10] text-[#c5c6c7] border-zinc-900'
  };

  const currentThemeClass = themeClasses[readerTheme];

  const fontStyleClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono'
  };

  const fontSizeClasses = {
    sm: 'text-sm leading-6 sm:leading-7',
    base: 'text-base leading-7 sm:leading-8',
    lg: 'text-lg leading-8 sm:leading-9',
    xl: 'text-xl leading-8 sm:leading-9',
    '2xl': 'text-2xl leading-9 sm:leading-10'
  };

  // 1. Resolve preset EPUB file path based on project catalog definitions
  const getEpubPath = () => {
    if (project.id === 'the-shaking-of-my-hands') {
      return '/book/TheShaking.epub';
    }
    if (project.id === 'the-sump-dark-eyes') {
      return '/book/the-sump.epub';
    }
    return project.epubUrl || '';
  };

  // Helper to parse ebook binary buffer
  const loadAndParseEpub = async (arrayBuffer: ArrayBuffer, nameFallback: string) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      // Look for META-INF/container.xml
      const containerFile = zip.file("META-INF/container.xml");
      if (!containerFile) {
        throw new Error("Missing META-INF/container.xml file archive.");
      }
      const containerText = await containerFile.async("text");
      
      const parser = new DOMParser();
      const containerDoc = parser.parseFromString(containerText, "application/xml");
      const rootfiles = containerDoc.getElementsByTagName("rootfile");
      if (!rootfiles.length) {
        throw new Error("No publication rootfile declared in EPUB container.");
      }
      
      const opfPath = rootfiles[0].getAttribute("full-path");
      if (!opfPath) {
        throw new Error("Package descriptor has empty root reference path.");
      }
      
      const opfFile = zip.file(opfPath);
      if (!opfFile) {
        throw new Error(`Package descriptor catalog file item not found at ${opfPath}`);
      }
      
      const opfText = await opfFile.async("text");
      const opfDoc = parser.parseFromString(opfText, "application/xml");
      
      // Try to parse basic metadata info
      let bookTitle = nameFallback;
      let bookAuthor = "James Brentlinger";
      let bookDate = "June 2026";
      
      const titleEl = opfDoc.getElementsByTagName("dc:title")[0] || opfDoc.getElementsByTagName("title")[0];
      if (titleEl && titleEl.textContent) {
        bookTitle = titleEl.textContent.trim();
      }
      
      const creatorEl = opfDoc.getElementsByTagName("dc:creator")[0] || opfDoc.getElementsByTagName("creator")[0];
      if (creatorEl && creatorEl.textContent) {
        bookAuthor = creatorEl.textContent.trim();
      }
      
      const dateEl = opfDoc.getElementsByTagName("dc:date")[0] || opfDoc.getElementsByTagName("date")[0];
      if (dateEl && dateEl.textContent) {
        bookDate = dateEl.textContent.trim();
      }
      
      // Parse manifest items
      const manifestItems: Record<string, { href: string; mediaType: string }> = {};
      const xmlItems = opfDoc.getElementsByTagName("item");
      for (let i = 0; i < xmlItems.length; i++) {
        const id = xmlItems[i].getAttribute("id");
        const href = xmlItems[i].getAttribute("href");
        const mediaType = xmlItems[i].getAttribute("media-type");
        if (id && href) {
          manifestItems[id] = { href, mediaType: mediaType || "" };
        }
      }
      
      // Load Spine order
      const xmlItemrefs = opfDoc.getElementsByTagName("itemref");
      const spinePaths: string[] = [];
      const opfBaseDir = opfPath.includes("/") ? opfPath.substring(0, opfPath.lastIndexOf("/") + 1) : "";
      
      for (let i = 0; i < xmlItemrefs.length; i++) {
        const idref = xmlItemrefs[i].getAttribute("idref");
        if (idref && manifestItems[idref]) {
          const cleanHref = manifestItems[idref].href.split("#")[0];
          const resolved = resolveRelativePath(opfBaseDir, cleanHref);
          if (!spinePaths.includes(resolved)) {
            spinePaths.push(resolved);
          }
        }
      }
      
      if (spinePaths.length === 0) {
        throw new Error("Reading spine order is empty.");
      }
      
      // Traverse spine files and extract textual materials
      const chaptersList: ParsedChapter[] = [];
      let totalWordsLoaded = 0;
      
      for (let i = 0; i < spinePaths.length; i++) {
        const filePath = spinePaths[i];
        const fileContent = zip.file(filePath);
        if (!fileContent) continue;
        
        const rawHtmlStr = await fileContent.async("text");
        const htmlDoc = parser.parseFromString(rawHtmlStr, "text/html");
        
        // Match headers for chapter names
        let chapHeading = "";
        const potentialHeaders = ["h1", "h2", "h3", "h4", "title"];
        for (const tag of potentialHeaders) {
          const el = htmlDoc.getElementsByTagName(tag)[0];
          if (el && el.textContent && el.textContent.trim().length > 1) {
            chapHeading = el.textContent.trim();
            break;
          }
        }
        
        if (!chapHeading) {
          chapHeading = `Section ${chaptersList.length + 1}`;
        } else if (chapHeading.length > 75) {
          chapHeading = chapHeading.substring(0, 75) + "...";
        }
        
        const paragraphTexts: string[] = [];
        const pTags = htmlDoc.getElementsByTagName("p");
        
        if (pTags.length > 0) {
          for (let pIdx = 0; pIdx < pTags.length; pIdx++) {
            const txt = pTags[pIdx].textContent?.trim();
            if (txt && txt.length > 3) {
              if (txt === chapHeading) continue;
              paragraphTexts.push(txt);
              totalWordsLoaded += txt.split(/\s+/).length;
            }
          }
        } else {
          // Fallback parsing body divisions
          const bodyDivs = htmlDoc.getElementsByTagName("div");
          for (let dIdx = 0; dIdx < bodyDivs.length; dIdx++) {
            const txt = bodyDivs[dIdx].textContent?.trim();
            if (txt && txt.length > 12 && !txt.includes("\n\n")) {
              paragraphTexts.push(txt);
              totalWordsLoaded += txt.split(/\s+/).length;
            }
          }
        }
        
        if (paragraphTexts.length > 0) {
          chaptersList.push({
            title: chapHeading,
            content: paragraphTexts
          });
        }
      }
      
      if (chaptersList.length === 0) {
        throw new Error("No readable chapters or paragraph paragraphs detected inside the EPUB.");
      }
      
      let simpleDate = bookDate;
      if (/^\d{4}-\d{2}-\d{2}/.test(simpleDate)) {
        simpleDate = simpleDate.substring(0, 4);
      }
      
      setParsedBook({
        title: bookTitle,
        author: bookAuthor,
        publishedDate: simpleDate,
        wordCount: `${totalWordsLoaded.toLocaleString()} words`,
        chapters: chaptersList
      });
      setActiveChapterIndex(0);
      setBookmarkIdx(null);
      setIsPreviewLocked(false);
    } catch (err: any) {
      console.error("EPUB Loading Error: ", err);
      setErrorMsg(err.message || 'Failed parsing EPUB archive payload.');
    } finally {
      setLoading(false);
    }
  };

  // Automount load call for current projects
  useEffect(() => {
    const presetPath = getEpubPath();
    if (presetPath) {
      const loadPreset = async () => {
        try {
          setLoading(true);
          setErrorMsg(null);
          const res = await fetch(presetPath);
          if (!res.ok) {
            throw new Error(`Failed to load background binary. HTTP Error code: ${res.status}`);
          }
          const buf = await res.arrayBuffer();
          await loadAndParseEpub(buf, project.title);
        } catch (err: any) {
          console.warn("Preset EPUB fetch failed, using fallback database model.");
          // Reset to null to use beautiful mock data fallback automatically
          setParsedBook(null);
          setLoading(false);
        }
      };
      
      loadPreset();
    } else {
      // Not a preset, reset to fallback data
      setParsedBook(null);
      setErrorMsg(null);
    }
  }, [project.id]);

  // Handle local filesystem import
  const handleUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setLoading(true);
      setErrorMsg(null);
      const ab = await file.arrayBuffer();
      await loadAndParseEpub(ab, file.name.replace(".epub", ""));
    } catch (err: any) {
      setErrorMsg("Failed to upload/parse local file. " + err.message);
      setLoading(false);
    }
  };

  // Trigger file click helper
  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Resolve currently active metadata object (either parsed or fallback)
  const currentBook = parsedBook || project.bookData;

  // Reset bookmark when page slides
  useEffect(() => {
    setBookmarkIdx(null);
  }, [activeChapterIndex]);

  const handlePrevChapter = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex((prev) => prev - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentBook && activeChapterIndex < currentBook.chapters.length - 1) {
      setActiveChapterIndex((prev) => prev + 1);
    }
  };

  // Let's decide what content text to show
  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center w-full h-[80vh] md:h-[85vh] p-8 text-center bg-[#fcf8f2] text-[#2c2720] border-amber-900/10 transition-colors duration-200 rounded-b-2xl rounded-t-2xl relative`}>
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-slate-800"
            title="Close"
          >
            <X size={18} />
          </button>
        )}
        <Loader2 className="w-10 h-10 text-amber-600 animate-spin mb-4" />
        <h3 className="font-extrabold text-base tracking-wide uppercase font-mono">PARSING EPUB BINARY ARCHIVE</h3>
        <p className="text-xs opacity-70 mt-2 max-w-xs leading-normal">Extracting XML spine tags, stylesheet nodes, and compiling page layout nodes dynamically...</p>
      </div>
    );
  }

  if (!currentBook) {
    return (
      <div className={`flex flex-col items-center justify-center w-full h-[80vh] md:h-[85vh] p-8 text-center bg-[#fcf8f2] text-[#2c2720] border-amber-900/10 transition-colors duration-200 rounded-b-2xl rounded-t-2xl relative`}>
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-slate-800"
            title="Close"
          >
            <X size={18} />
          </button>
        )}
        <BookOpen size={48} className="mb-4 text-amber-700/60" />
        <h3 className="font-bold text-lg">No Preloaded eBook Found</h3>
        <p className="text-xs opacity-75 max-w-sm mt-1 leading-normal">
          This container terminal doesn't have local eBook cache parsed. You can upload any EPUB file directly from your device below:
        </p>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          accept=".epub" 
          className="hidden" 
          onChange={handleUploadChange} 
        />
        <button
          type="button"
          onClick={triggerUploadClick}
          className="mt-4 px-4 py-2 text-xs font-bold uppercase rounded-lg border border-amber-600 text-amber-700 bg-amber-600/10 hover:bg-amber-600 hover:text-white transition-all duration-150 flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Upload size={14} /> Upload Custom EPUB
        </button>

        {errorMsg && (
          <div className="mt-4 text-xs text-red-500 flex items-center gap-1 max-w-xs font-mono border border-red-500/20 p-2 bg-red-950/10 rounded">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    );
  }

  const activeChapter = currentBook.chapters[activeChapterIndex] || { title: "Untiled Section", content: [] };

  return (
    <div className={`flex flex-col md:flex-row w-full h-[90vh] overflow-hidden select-none border border-slate-700/40 relative shadow-2xl ${currentThemeClass} transition-colors duration-200 rounded-2xl glow-green`}>
      
      {/* Absolute top close button for mobile layouts */}
      {onClose && (
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-4 z-40 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-current transition-colors cursor-pointer md:hidden"
          title="Close Reader"
        >
          <X size={18} />
        </button>
      )}

      {/* Left panel: Book info, chapters list, text parameters */}
      <div className="w-full md:w-[280px] h-[35%] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-current/10 p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4 select-none bg-black/10">
        
        {/* Book cover header */}
        <header className="flex flex-col gap-1.5 pr-6 md:pr-0">
          <div className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-wider opacity-85 font-mono">Real-Time Book Node</span>
          </div>
          <h2 className="text-base font-extrabold tracking-tight leading-tight mt-1 truncate">{parsedBook ? parsedBook.title : project.title}</h2>
          <div className="text-[11px] opacity-75">
            By <strong className="font-semibold">{currentBook.author}</strong>
          </div>
        </header>

        {/* Real book cover art if iconUrl is present */}
        {project.iconUrl && (
          <div className="hidden md:flex justify-center my-1 select-none">
            <div className="w-24 h-32 rounded-lg border border-blue-500/20 bg-slate-900 shadow-md relative overflow-hidden group">
              <img 
                src={project.iconUrl} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="w-1.5 h-full bg-black/20 absolute left-0 top-0 border-r border-white/5 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Diagnostic Metadata Grid */}
        <div className="border border-current/15 rounded-xl p-3 text-[10px] leading-4 space-y-0.5 bg-current/2 font-mono">
          <div className="font-bold border-b border-current/10 pb-1 mb-1.5 uppercase tracking-wider flex items-center gap-1">
            <Info size={10} /> FILE DIAGNOSTICS
          </div>
          <div>• YEAR NODE: {currentBook.publishedDate}</div>
          <div>• WORDCOUNT: {currentBook.wordCount}</div>
          <div>• FORMAT: Standard ePUB Form</div>
          <div>• DATA ENGINE: Binary JSZip Extractor</div>
        </div>

        {/* Custom EPUB File Upload Switcher */}
        <div className="pb-1 border-b border-current/10 hidden md:block">
          <input 
            type="file" 
            ref={fileInputRef} 
            accept=".epub" 
            className="hidden" 
            onChange={handleUploadChange} 
          />
          <button
            type="button"
            onClick={triggerUploadClick}
            className="w-full py-1.5 border rounded-lg font-bold font-sans text-[10px] tracking-wide uppercase transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer hover:bg-current/5 border-current/15 hover:border-current/30 text-current/80"
          >
            <Upload size={10} /> Upload EPUB
          </button>
        </div>

        {/* Chapter Table of Contents */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-60 flex items-center gap-1 font-mono">
            <span>📚 INDEX ({currentBook.chapters.length})</span>
          </div>
          <div className="space-y-1 max-h-36 md:max-h-48 overflow-y-auto pr-1">
            {currentBook.chapters.map((chapter, idx) => {
              const isLocked = idx >= 3 || chapter.title.toLowerCase().includes('locked');
              
              return (
                <button 
                  key={idx}
                  type="button"
                  id={`chapter-${idx}`}
                  onClick={() => {
                    if (isLocked) {
                      setIsPreviewLocked(true);
                      return;
                    }
                    setIsPreviewLocked(false);
                    setActiveChapterIndex(idx);
                    setBookmarkIdx(null);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold font-sans transition-all cursor-pointer border flex justify-between items-center ${
                    idx === activeChapterIndex && !isPreviewLocked
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/10' 
                      : 'bg-black/10 border-transparent hover:bg-black/20 text-current'
                  }`}
                >
                  <span className="truncate">{idx + 1}. {chapter.title}</span>
                  {isLocked && <Lock size={10} className="text-amber-500 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography Settings Toolbar */}
        <div className="flex flex-col gap-2 pt-2 border-t border-current/10 mt-auto hidden md:flex">
          <div className="text-[9px] uppercase font-bold tracking-wider opacity-60 flex items-center gap-1 font-mono">
            <Sliders size={10} /> FORMAT CONTROLS
          </div>
          
          {/* Font selection */}
          <div className="flex p-0.5 bg-black/15 rounded-lg border border-current/5">
            {(['serif', 'sans', 'mono'] as const).map((font) => (
              <button
                key={font}
                type="button"
                id={`font-${font}`}
                onClick={() => setFontFamily(font)}
                className={`flex-1 py-0.5 text-center rounded text-[10px] px-1 font-bold capitalize transition-all cursor-pointer ${
                  fontFamily === font ? 'bg-amber-500 text-white shadow-sm' : 'text-current/80 hover:bg-black/10'
                }`}
              >
                {font}
              </button>
            ))}
          </div>

          {/* Size selection */}
          <div className="flex items-center justify-between bg-black/15 px-2.5 py-1 rounded-lg border border-current/5 text-[10px]">
            <button 
              type="button"
              id="fsize-down"
              onClick={() => {
                if (fontSize === '2xl') setFontSize('xl');
                else if (fontSize === 'xl') setFontSize('lg');
                else if (fontSize === 'lg') setFontSize('base');
                else if (fontSize === 'base') setFontSize('sm');
              }}
              className="px-1.5 font-bold cursor-pointer text-xs hover:scale-110"
            >
              A-
            </button>
            <span className="font-mono uppercase font-bold opacity-80">SIZE: {fontSize.toUpperCase()}</span>
            <button 
              type="button"
              id="fsize-up"
              onClick={() => {
                if (fontSize === 'sm') setFontSize('base');
                else if (fontSize === 'base') setFontSize('lg');
                else if (fontSize === 'lg') setFontSize('xl');
                else if (fontSize === 'xl') setFontSize('2xl');
              }}
              className="px-1.5 font-bold cursor-pointer text-xs hover:scale-110"
            >
              A+
            </button>
          </div>

          {/* Themes selectors */}
          <div className="grid grid-cols-4 gap-1 pt-0.5">
            {([
              { key: 'cream', color: 'bg-[#fcf8f2] border-amber-900/20' },
              { key: 'sepia', color: 'bg-[#f4ecd8] border-amber-900/30' },
              { key: 'charcoal', color: 'bg-[#1a1c1e] border-zinc-800' },
              { key: 'dark', color: 'bg-[#0b0c10] border-zinc-900' }
            ] as const).map((theme) => (
              <button
                key={theme.key}
                type="button"
                id={`theme-select-${theme.key}`}
                onClick={() => setReaderTheme(theme.key)}
                className={`h-6 rounded border relative flex items-center justify-center cursor-pointer ${theme.color}`}
                title={`Select ${theme.key} theme`}
              >
                {readerTheme === theme.key && (
                  <Check size={10} className={theme.key === 'cream' || theme.key === 'sepia' ? 'text-amber-850' : 'text-blue-400'} />
                )}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Right panel: Readable Page content wrapper */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-12 py-6 flex flex-col justify-between custom-scrollbar select-text bg-white/1 relative h-[65%] md:h-full">
        
        {/* Sync Lock Overlay for restricted previews */}
        <AnimatePresence>
          {isPreviewLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center select-none bg-slate-950/95 backdrop-blur-md text-white"
            >
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-500 shadow-lg shadow-amber-500/10 animate-pulse">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-400">
                Preview Chapter Limit Reached
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mt-2 mb-6 font-sans leading-relaxed">
                You have reached the preview limit for <strong className="text-slate-200">"{currentBook.title}"</strong>. The complete manuscript contains the full creative and speculative journey by James Brentlinger.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsPreviewLocked(false);
                    setActiveChapterIndex(2); // Retain active safety zone
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                >
                  Go Back to Preview
                </button>
                <a
                  href="mailto:james@iamjames.lol?subject=Purchase%20Book"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-xs font-mono text-white hover:scale-105 active:scale-95 shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Purchase Full Book
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page typography area */}
        <article className="max-w-2xl mx-auto w-full pt-1.5 flex-grow">
          <header className="border-b border-current/10 pb-2 mb-5 flex justify-between items-center text-[10px] opacity-70 select-none">
            <span className="font-semibold uppercase tracking-wide truncate max-w-[200px] md:max-w-xs">{activeChapter.title}</span>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-mono uppercase">CH. {activeChapterIndex + 1} OF {currentBook.chapters.length}</span>
              {onClose && (
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-current/10 transition-colors cursor-pointer text-current/80 hover:text-current hidden md:inline-block"
                  title="Close Ebook Reader"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </header>

          <h3 className="text-lg sm:text-xl font-black tracking-tight mb-5 select-none">{activeChapter.title}</h3>

          <div className={`space-y-5 ${fontStyleClasses[fontFamily]} ${fontSizeClasses[fontSize]} text-left tracking-normal pr-1`}>
            {activeChapter.content.map((paragraph, pIdx) => (
              <p 
                key={pIdx} 
                className={`relative group pr-2 rounded-sm transition-all duration-150 py-0.5 ${
                  bookmarkIdx === pIdx 
                    ? 'border-l-4 border-amber-500 bg-amber-500/10 pl-3 py-1.5 font-medium' 
                    : 'hover:bg-current/5'
                }`}
              >
                {paragraph}
                
                {/* Visual Bookmark targeter on hover */}
                <button
                  type="button"
                  id={`bookmark-${pIdx}`}
                  onClick={() => setBookmarkIdx(pIdx === bookmarkIdx ? null : pIdx)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                  title="Bookmark paragraph node"
                >
                  <Bookmark size={12} className={bookmarkIdx === pIdx ? 'fill-current text-amber-500 opacity-100' : 'text-current/30 hover:text-amber-500'} />
                </button>
              </p>
            ))}
          </div>
        </article>

        {/* Readable Footer / chapter navigator */}
        <footer className="max-w-2xl mx-auto w-full border-t border-current/10 mt-10 pt-4 flex items-center justify-between text-[10px] select-none shrink-0">
          <button 
            type="button"
            id="chapter-prev-btn"
            disabled={activeChapterIndex === 0}
            onClick={handlePrevChapter}
            className="flex items-center gap-1 cursor-pointer font-bold border border-current/20 hover:border-current px-2.5 py-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5"
          >
            <ChevronLeft size={14} /> PREV CHAPTER
          </button>
          
          <div className="font-bold opacity-80 uppercase tracking-widest font-mono">
            {Math.round(((activeChapterIndex + 1) / currentBook.chapters.length) * 100)}% READ {bookmarkIdx !== null && '• [SAVED]'}
          </div>

          <button 
            type="button"
            id="chapter-next-btn"
            disabled={activeChapterIndex === currentBook.chapters.length - 1}
            onClick={() => {
              const nextIndex = activeChapterIndex + 1;
              const nextChapter = currentBook.chapters[nextIndex];
              const isLocked = nextIndex >= 3 || (nextChapter && nextChapter.title.toLowerCase().includes('locked'));
              
              if (isLocked) {
                setIsPreviewLocked(true);
                return;
              }
              handleNextChapter();
            }}
            className="flex items-center gap-1 cursor-pointer font-bold border border-current/20 hover:border-current px-2.5 py-1.5 rounded-lg disabled:opacity-30 disabled:pointer-events-none hover:bg-black/5"
          >
            NEXT CHAPTER <ChevronRight size={14} />
          </button>
        </footer>

      </div>

    </div>
  );
}
