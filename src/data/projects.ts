export interface ParsedChapter {
  title: string;
  content: string[];
}

export interface LoadedBook {
  title: string;
  author: string;
  publishedDate: string;
  wordCount: string;
  chapters: ParsedChapter[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Android App' | 'PWA' | 'Windows App' | 'Book' | 'Website';
  description: string;
  details: string;
  tech: string[];
  mediaUrl: string; // MP4 video path
  images: string[];  // JPG/PNG screenshots paths
  iconUrl?: string;  // Project custom card icon
  epubUrl?: string;  // For Book projects
  synopsis?: string; // For Book projects
  chapters?: string[]; // For Book table of contents
  bookData?: LoadedBook; // Fallon Ebook reader data model
}

export const projectsData: Project[] = [
  {
    id: 'post',
    title: 'P.O.S.T. (Pal Optical Slip Tool)',
    category: 'Windows App',
    description: 'A precision engineering tool designed to calculate, simulate, and adjust optical slip values in high-speed lenses.',
    details: 'The Pal Optical Slip Tool (P.O.S.T.) is an industrial-grade engineering application built to address precision optical alignment and lens drift calibration. In high-speed manufacturing environments, optical slip causes minute focal distortions. P.O.S.T. provides real-time simulation algorithms, sub-micron mathematical adjustments, and telemetry exports to correct slip factors instantly. Its low-latency architecture makes it indispensable for lens technicians.',
    tech: ['C++', 'Qt', 'Python', 'OpenCV'],
    mediaUrl: '/projectvid/post.mp4',
    iconUrl: '/projecticon/post.png',
    images: [
      '/screenshot/post/post1.png',
      '/screenshot/post/post2.png',
      '/screenshot/post/post3.png',
      '/screenshot/post/post4.png',
      '/screenshot/post/post5.png',
      '/screenshot/post/post6.png',
      '/screenshot/post/post7.png',
      '/screenshot/post/post8.png'
    ]
  },
  {
    id: 'pal-optical-toolkit',
    title: 'Pal Optical Toolkit',
    category: 'Windows App',
    description: 'An all-in-one desktop environment for lens diagnostics, focal calculations, and digital lens mapping.',
    details: 'The Pal Optical Toolkit is the flagship desktop application for optic specialists. Combining refraction testing simulators, focal length estimators, and automated digital lens mapping, it standardizes laboratory diagnostics. Built with a high-performance C++ backend and a beautiful, modular Qt interface, the toolkit integrates natively with hardware spectrophotometers and diagnostic cameras.',
    tech: ['C++', 'Qt', 'OpenGL', 'Boost'],
    mediaUrl: '/projectvid/palopticaltoolkit.mp4',
    iconUrl: '/projecticon/palopticaltoolkit.png',
    images: [
      '/screenshot/palopticaltoolkit/calc.png',
      '/screenshot/palopticaltoolkit/clo.png',
      '/screenshot/palopticaltoolkit/inv.png',
      '/screenshot/palopticaltoolkit/lensview.png',
      '/screenshot/palopticaltoolkit/lin.png',
      '/screenshot/palopticaltoolkit/pq.png',
      '/screenshot/palopticaltoolkit/receipt.png'
    ]
  },
  {
    id: 'opti-calc-3d',
    title: 'Opti-Calc 3D',
    category: 'Windows App',
    description: 'A hardware-accelerated 3D light refraction and lens grouping calculator for optical architects.',
    details: 'Opti-Calc 3D renders advanced 3D ray-tracing simulations for composite lens groupings. Using GPU-accelerated refraction math, optical architects can model multi-element glass groups and visualize light dispersion paths in real time. It features a customizable preset database, interactive lens shape builders, and high-fidelity 3D graphs.',
    tech: ['C++', 'Qt', 'OpenGL', 'GLSL', 'CUDA'],
    mediaUrl: '/projectvid/opticalc.mp4',
    iconUrl: '/projecticon/opticalc.png',
    images: [
      '/screenshot/opticalc/opticalc1.png',
      '/screenshot/opticalc/opticalc2.png',
      '/screenshot/opticalc/opticalc3.png'
    ]
  },
  {
    id: 'optitrak-remake-manager',
    title: 'OptiTrak Remake Manager',
    category: 'Windows App',
    description: 'An active quality control and inventory tracking dashboard designed for digital optical laboratories.',
    details: 'OptiTrak Remake Manager streamlines the remake lifecycle in optical laboratories. When a lens fails quality assurance, OptiTrak tracks the point of failure, logs diagnostic codes, schedules remake queues, and provides analytics to minimize lens wastage. It features local database integration and network syncing to link lab machinery with administrative terminals.',
    tech: ['C++', 'Qt', 'SQLite', 'Qt Network'],
    mediaUrl: '/projectvid/ocutrack.mp4',
    iconUrl: '/projecticon/ocutrack.png',
    images: [
      '/screenshot/optitrak/optitrak1.png',
      '/screenshot/optitrak/optitrak2.png',
      '/screenshot/optitrak/optitrak3.png',
      '/screenshot/optitrak/optitrak4.png'
    ]
  },
  {
    id: 'optistep-academy',
    title: 'OptiStep Academy',
    category: 'Website',
    description: 'An interactive learning portal and certification platform for apprentice opticians.',
    details: 'OptiStep Academy is a modern, responsive web application offering training modules, practice exams, and visual optics guides for optical professionals. Featuring dynamic quiz generators, interactive refraction playgrounds, and progress tracking, it serves as a bridge between theoretical optics and real-world laboratory practices.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    mediaUrl: '',
    iconUrl: '/projecticon/optistep.png',
    images: [
      '/screenshot/optistep/optistep1.png',
      '/screenshot/optistep/optistep2.png'
    ]
  },
  {
    id: 'ocu-sync-hipaa',
    title: 'Ocu-Sync HIPAA Messaging System',
    category: 'PWA',
    description: 'A fully encrypted, HIPAA-compliant messaging and telemetry sharing application for eye-care clinics.',
    details: 'Ocu-Sync provides secure, end-to-end encrypted messaging designed specifically for eye-care clinics and medical practitioners. Doctors can safely chat, share high-resolution retinal scans, exchange diagnostic telemetry, and manage e-prescriptions. Built as a Progressive Web App (PWA), it supports instant offline loading, desktop notifications, and biometric authentication.',
    tech: ['TypeScript', 'React', 'Node.js', 'WebRTC', 'Tailwind CSS'],
    mediaUrl: '/projectvid/ocusync.mp4',
    iconUrl: '/projecticon/ocu-sync.png',
    images: [
      '/screenshot/ocusync/ocusync1.png',
      '/screenshot/ocusync/ocusync2.png',
      '/screenshot/ocusync/ocusync3.png',
      '/screenshot/ocusync/ocusync4.png'
    ]
  },
  {
    id: 'reading-buddies',
    title: 'Reading Buddies',
    category: 'Android App',
    description: 'A gamified, interactive literacy app for children featuring voice-guided reading challenges.',
    details: 'Reading Buddies is an educational Android application designed to make reading fun for young readers. Children read aloud alongside animated animal buddies. Utilizing speech-to-text algorithms, the app provides real-time pronunciation feedback, unlocks cute achievements, and adapts book difficulty dynamically to match the child’s reading progress.',
    tech: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Google Speech API'],
    mediaUrl: '/projectvid/bluey.mp4',
    iconUrl: '/projecticon/bluey.png',
    images: [
      '/screenshot/bluey/bluey1.png',
      '/screenshot/bluey/bluey2.png',
      '/screenshot/bluey/bluey3.png',
      '/screenshot/bluey/bluey4.png',
      '/screenshot/bluey/bluey5.png',
      '/screenshot/bluey/bluey6.png'
    ]
  },
  {
    id: 'bible-study-suite',
    title: 'Bible Study Suite',
    category: 'Android App',
    description: 'An offline-first scripture analysis app with interlinear transliteration and search capabilities.',
    details: 'Bible Study Suite is a rich mobile environment for deep scriptural exploration. It packs multiple translations, original Hebrew and Greek interlinear tools, morpho-syntactic tagging, and a blazing fast indexed offline search engine. Users can highlight texts, maintain study journals, and create cross-referenced concept maps.',
    tech: ['Kotlin', 'Android SDK', 'Room Database', 'Jetpack Compose'],
    mediaUrl: '/projectvid/biblestudysuite.gif',
    iconUrl: '/projecticon/biblestudy.png',
    images: []
  },
  {
    id: 'sermonflow',
    title: 'SermonFlow',
    category: 'PWA',
    description: 'A sermon transcription, outlines builder, and slide generator workspace for pastors.',
    details: 'SermonFlow is a specialized content creation workspace tailored for speakers and ministers. Using voice-to-text transcription, SermonFlow records spoken audio in real-time, compiles searchable transcripts, helps outline key points, and automatically generates presentation slides. It functions as a PWA, ideal for dynamic editing on tablets or podium laptops.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Speech API'],
    mediaUrl: '/projectvid/sermonflow.mp4',
    iconUrl: '/projecticon/sermonflow.png',
    images: [
      '/screenshot/scriptureflow/scripture1.png',
      '/screenshot/scriptureflow/scripture2.png',
      '/screenshot/scriptureflow/scripture3.png'
    ]
  },
  {
    id: 'visus-space',
    title: 'Visus.Space',
    category: 'Website',
    description: 'A visual arts portfolio showcase and digital museum catalog for 3D modelers and artists.',
    details: 'Visus.Space is an immersive 3D digital museum showcasing contemporary visual arts and high-fidelity 3D assets. Employing Three.js and WebGL, it lets visitors navigate a virtual gallery space, interact with sculptures, and view textured wireframes in real-time. It stands as a premium digital art display platform.',
    tech: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
    mediaUrl: '',
    iconUrl: '/projecticon/visus.png',
    images: [
      '/screenshot/visus/visus1.png',
      '/screenshot/visus/visus2.png',
      '/screenshot/visus/visus3.png',
      '/screenshot/visus/visus4.png',
      '/screenshot/visus/visus5.png'
    ]
  },
  {
    id: 'clockin',
    title: 'ClockIn',
    category: 'PWA',
    description: 'A lightweight geolocation-fenced time tracking utility for remote construction and survey teams.',
    details: 'ClockIn is a highly resilient Progressive Web App designed to track labor hours for mobile workspaces. Utilizing GPS geofencing, it prompts employees to clock in once they arrive at the designated worksite. Supports full offline tracking, automatically syncing timecards once a mobile connection is re-established.',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Service Workers', 'IndexedDB'],
    mediaUrl: '',
    iconUrl: '/projecticon/clockin.png',
    images: [
      '/screenshot/clockin/clock1.png',
      '/screenshot/clockin/clock2.png',
      '/screenshot/clockin/clock3.png',
      '/screenshot/clockin/clock4.png',
      '/screenshot/clockin/clock5.png'
    ]
  },
  {
    id: 'pal-optical-simulator',
    title: 'Pal Optical Simulator',
    category: 'Website',
    description: 'An interactive web-based simulator illustrating how progressive lens zones alter visual fields.',
    details: 'Pal Optical Simulator is an educational web experience designed to showcase progressive lens designs to prospective buyers. Users drag sliders to adjust corridor widths, viewing distances, and astigmatic distortions. Real-time SVG masking and filter overlays visually demonstrate how lens changes affect focus in simulated rooms.',
    tech: ['HTML5 Canvas', 'React', 'Tailwind CSS', 'Framer Motion'],
    mediaUrl: '/projectvid/palsim.mp4',
    iconUrl: '/projecticon/palsim.png',
    images: []
  },
  {
    id: 'optiview',
    title: 'OptiView',
    category: 'Windows App',
    description: 'A digital lens spectrometer interface that displays live light absorption and transmission profiles.',
    details: 'OptiView connects directly to desktop spectrophotometers to graph transmission data for UV, Blue-block, and photochromic lenses. It computes blocking percentages, overlays target transmission curves, and prints comprehensive laboratory certification sheets.',
    tech: ['C++', 'Qt', 'QCustomPlot', 'USB HID API'],
    mediaUrl: '',
    iconUrl: '/projecticon/optiview.png',
    images: [
      '/screenshot/optiview/optiview1.png'
    ]
  },
  {
    id: 'the-shaking-of-my-hands',
    title: 'The Shaking of My Hands',
    category: 'Book',
    description: 'A collection of introspective poetry exploring vulnerability, aging, and the passage of time.',
    details: 'A deeply moving and vulnerable collection of prose and poetry by James Brentlinger. It probes the quiet moments of life, tracking personal growth through physical change, artistic struggle, and a reconciling of the past. The interactive reader includes the complete first three chapters for preview.',
    tech: ['EPUB Reader', 'Typography', 'Creative Writing'],
    mediaUrl: '/projectvid/shaking.mp4',
    iconUrl: '/projecticon/shaking.png',
    images: [],
    epubUrl: '/book/TheShaking.epub',
    synopsis: 'A heartfelt journey into quiet spaces, tracking family memories, creative blocks, and physical tremors that become artistic strokes.',
    chapters: ['Introduction', 'Chapter 1: The First Tremor', 'Chapter 2: Ink and Blood', 'Chapter 3: The Quiet Room', 'Chapter 4: Under the Elm Tree (Locked)', 'Chapter 5: Epilogue (Locked)'],
    bookData: {
      title: "The Shaking of My Hands",
      author: "James Brentlinger",
      publishedDate: "2026",
      wordCount: "12,450 words",
      chapters: [
        {
          title: "Introduction",
          content: [
            "Writing is a way of looking at what we have lost. When my fingers first began to shake, I feared the ink would spill across the page, ruining the lines of thought I had spent hours crafting.",
            "But soon, I realized that the shaking was itself a language. A tremor is just a different kind of rhythm, a cursive written in frequencies we aren't yet trained to understand. This is the collection of those tremors."
          ]
        },
        {
          title: "Chapter 1: The First Tremor",
          content: [
            "It happened on a Tuesday. The coffee was still hot in the ceramic mug James had built in college. The cursor sat blinking on the screen—a silent, mocking beacon.",
            "When I reached for the pen to jot down a marginal note, my thumb twitched. Just a millimeter, but in that millimeter lay the distance between control and surrender.",
            "I looked at the handwriting: it was jagged, like pine needles scattered by a sudden wind. I did not write again for a week, but the needles stayed in my head."
          ]
        },
        {
          title: "Chapter 2: Ink and Blood",
          content: [
            "We often think of creation as an act of pure will, a straight line drawn from the mind to the canvas. But true craft is always negotiation. The wood resisting the chisel, the cello string vibrating against the bow, the neural pathways firing in stuttered loops.",
            "When we accept the resistance, the art changes. My grandfather was a bookbinder, his hands thick with calluses and leather glue.",
            "At eighty, he could barely hold a fork, but when he picked up a binding needle, his fingers found a steady, ancient memory."
          ]
        },
        {
          title: "Chapter 3: The Quiet Room",
          content: [
            "In the heart of the library at Visus, there is a room where no light enters. They call it the focal core. It was there that we calculated the first slip value, realizing that our lenses were not faulty—the universe itself was slipping.",
            "Space-time is not a smooth sheet of glass; it is a layered lens, and we are just particles trapped between the zones.",
            "As I sat in the darkness, the tremor in my hand aligned perfectly with the hum of the cooling fans. We are all calibrated to some frequency. The question is, who controls the dial?"
          ]
        },
        {
          title: "Chapter 4: Under the Elm Tree (Locked)",
          content: ["This chapter is locked in the preview."]
        },
        {
          title: "Chapter 5: Epilogue (Locked)",
          content: ["This chapter is locked in the preview."]
        }
      ]
    }
  },
  {
    id: 'the-sump-dark-eyes',
    title: 'The Sump (Book 1 of Dark Eyes Trilogy)',
    category: 'Book',
    description: 'A suspenseful sci-fi thriller following a team of optical researchers who uncover a cosmic distortion.',
    details: 'A three-part narrative that blends hard science fiction with cosmic horror. When a group of optics scientists build the ultimate deep-space spectrometer, they discover a visual distortion—a cosmic sump—gazing back from the cosmic microwave background. The narrative scales from a laboratory thriller to a universe-spanning space opera.',
    tech: ['EPUB Reader', 'Creative Writing', 'Sci-Fi'],
    mediaUrl: '',
    iconUrl: '/book/The Sump.png',
    images: [],
    epubUrl: '/book/the-sump.epub',
    synopsis: 'They thought they were measuring cosmic background dust. What they found was a visual focal point in the stars that had been looking back for eons.',
    chapters: ['Prologue: The Static', 'Chapter 1: Resolution Limits', 'Chapter 2: The Red Shift Shifted', 'Chapter 3: Deep Lens Calibration', 'Chapter 4: The Sump Opens (Locked)', 'Chapter 5: Absolute Midnight (Locked)'],
    bookData: {
      title: "The Sump (Book 1 of Dark Eyes Trilogy)",
      author: "James Brentlinger",
      publishedDate: "2026",
      wordCount: "48,200 words",
      chapters: [
        {
          title: "Prologue: The Static",
          content: [
            "We were calibrating the array at midnight. The screen presented a standard thermal feed, noise from the edge of the visible sky.",
            "But then, the spectrum altered. A void, absolute and dark, expanded exactly in the center of our measurements. We didn't know it then, but we had just measured the cosmic sump."
          ]
        },
        {
          title: "Chapter 1: Resolution Limits",
          content: [
            "Every lens has a boundary. An aperture limit past which diffraction blurs the finest threads of light into a smooth, featureless haze. In my years at Pal Optical, I had designed three dozen high-index lens groupings, always fighting the boundaries.",
            "When the new telemetry arrived from the orbital station, I loaded the curves. The resolution was perfect, yet the center was blank. It wasn't an aperture limit; it was an eclipse."
          ]
        },
        {
          title: "Chapter 2: The Red Shift Shifted",
          content: [
            "We measured the light shift, expecting standard expansion. What we found was a negative velocity vector.",
            "The stars weren't receding; they were falling. In our focal plane, the redshift was shifting back into a violet glow, a high-frequency telemetry that hummed in the optical circuits like feedback."
          ]
        },
        {
          title: "Chapter 3: Deep Lens Calibration",
          content: [
            "We spent forty hours adjusting the slip tool. Sub-micron calibration on the primary mirror. If there was a distortion, it lay in our glass.",
            "When the last laser alignment finished, the spot remained. Absolute, dark, and perfectly circular. It was looking back at us."
          ]
        },
        {
          title: "Chapter 4: The Sump Opens (Locked)",
          content: ["This chapter is locked in the preview."]
        },
        {
          title: "Chapter 5: Absolute Midnight (Locked)",
          content: ["This chapter is locked in the preview."]
        }
      ]
    }
  },
  {
    id: 'stop-rumpke',
    title: 'StopRumpke.org',
    category: 'Website',
    description: 'A community protest and advocacy platform opposing the massive landfill expansion proposed by Rumpke in Montgomery County, KY.',
    details: 'StopRumpke.org is a dedicated citizen-activism platform built to organize protests, raise local awareness, and contest the proposed landfill expansion by Rumpke in Montgomery County, KY. The site maps the expansion boundaries, records scent and environmental complaints, shares scientific impact studies, and coordinates petition signatures to protect the beautiful bluegrass landscape from toxic environmental runoff.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Leaflet Maps'],
    mediaUrl: '/projectvid/stoprumpke.mp4',
    iconUrl: '/projecticon/stoprumpke.png',
    images: [
      '/screenshot/stoprumpke/rumpke1.png',
      '/screenshot/stoprumpke/rumpke2.png',
      '/screenshot/stoprumpke/rumpke3.png',
      '/screenshot/stoprumpke/rumpke4.png',
      '/screenshot/stoprumpke/rumpke5.png',
      '/screenshot/stoprumpke/rumpke6.png'
    ]
  },
  {
    id: 'optichart',
    title: 'OptiChart Digital Screen System',
    category: 'Windows App',
    description: 'A digital visual acuity chart system designed for modern optometric examination rooms.',
    details: 'OptiChart provides professional optometric charts (Snellen, LogMAR, tumbling E, Astigmatic fan) with fully customized sizing ratios matching room reflection distances. Controlled via local remote or secondary panels, it lets doctors customize contrast, adjust testing sequences, and display children-friendly literacy modules.',
    tech: ['C++', 'Qt Framework', 'OpenGL', 'Serial IO'],
    mediaUrl: '',
    iconUrl: '/projecticon/optichart.png',
    images: [
      '/screenshot/optichart/optichart1.png',
      '/screenshot/optichart/optichart2.png',
      '/screenshot/optichart/optichart3.png',
      '/screenshot/optichart/optichart4.png',
      '/screenshot/optichart/optichart5.png',
      '/screenshot/optichart/optichart6.png',
      '/screenshot/optichart/optichart7.png'
    ]
  },
  {
    id: 'word-witness',
    title: 'Word Witness',
    category: 'PWA',
    description: 'A collaborative, distraction-free markdown prose writing studio with live version diffing.',
    details: 'Word Witness is a writer-first web editor built to encourage seamless creative writing. It provides a clean typography layout, ambient background sounds, focus-writing modes, and a robust micro-versioning system that lets authors easily view color-coded text diffs and revert paragraphs without clutter.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'IndexedDB'],
    mediaUrl: '/projectvid/wordwitness.mp4',
    iconUrl: '/projecticon/ww.png',
    images: []
  },
  {
    id: 'songbook',
    title: 'SongBook',
    category: 'Android App',
    description: 'A mobile chord-sheet organizer with automatic auto-scrolling, key transposition, and midi controller support.',
    details: 'SongBook is a lightweight tool for gigging musicians. It stores chord sheets in ChordPro format, allows instant key transposition, supports scrolling speeds matched to song BPM, and syncs via Bluetooth MIDI to pedal page-turners.',
    tech: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'MIDI API'],
    mediaUrl: '',
    iconUrl: '/projecticon/sb.jpg',
    images: []
  },
  {
    id: 'ancient-bible-reader',
    title: 'Ancient Bible Reader',
    category: 'Android App',
    description: 'A dedicated reading interface displaying scanned photographic codices alongside high-fidelity text.',
    details: 'Ancient Bible Reader bridges the gap between archaeology and scripture reading. It displays high-resolution, scrollable photos of historical manuscripts (such as Codex Sinaiticus or dead sea fragments) side-by-side with parsed, translated digital text. Users can tap words to view ancient dictionary glosses.',
    tech: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'IIIF Image API'],
    mediaUrl: '/projectvid/ancientbiblereader.mp4',
    iconUrl: '/projecticon/abr.png',
    images: []
  }
];
