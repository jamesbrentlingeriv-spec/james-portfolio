export interface LyricLine {
  time: number;
  text: string;
}

export interface AudioParams {
  tempo: number;
  type: 'synthwave' | 'acoustic' | 'ambient';
  chords: number[][]; // MIDI note progressions
}

export interface Song {
  id: string; // Keep string IDs as provided
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  audioUrl: string; // MP3 path
  coverUrl: string; // Album cover path
  lyrics: LyricLine[];
  audioParams?: AudioParams;
}

export const PLAYLIST: Song[] = [
  {
    id: "user-take-you-home",
    coverUrl: "/albumicon/takeyouhome.png",
    title: "Take You Home",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 180,
    audioUrl: "/music/Take You Home.mp3",
    lyrics: [
      { time: 0.1, text: "Take you home," },
      { time: 4.64, text: "back to bed." },
      { time: 8.4, text: "Take off your clothes" },
      { time: 12.66, text: "and give me head." },
      { time: 16.56, text: "Baby, what was that?" },
      { time: 21.08, text: "What I said?" },
      { time: 26.26, text: "You're mine when the lights dim red." },
      { time: 36.1, text: "Let's get it started." },
      { time: 40.34, text: "Let's get it started." },
      { time: 44.26, text: "Baby, let's get naughty." },
      { time: 48.02, text: "I'm gonna make you say you're sorry 'cause you're a bad, bad girl." },
      { time: 68.64, text: "Scream my name at the top of your lungs. Let the whole world know you've come." },
      { time: 82.76, text: "Call the neighbors, priests, and nuns 'cause I'm your god, baby, I'm the one." },
      { time: 92.64, text: "The one to tame a bad, bad girl." },
      { time: 99.12, text: "[upbeat music]" }
    ],
    audioParams: {
      tempo: 120,
      type: 'synthwave',
      chords: [
        [53, 57, 60], // F
        [55, 59, 62], // G
        [48, 52, 55], // C
        [57, 60, 64]  // Am
      ]
    }
  },
  {
    id: "user-by-and-by",
    coverUrl: "/albumicon/byandby.png",
    title: "by and by",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 195,
    audioUrl: "/music/by and by.mp3",
    lyrics: [
      { time: 0.1, text: "[upbeat country music]" },
      { time: 5.46, text: "If it get any hotter I'ma jump in that water" },
      { time: 8.28, text: "with a current that'll pull you down." },
      { time: 11.3, text: "If I don't make it home, tell my mama I love her" },
      { time: 13.8, text: "'cause I surely will have drowned." },
      { time: 16.7, text: "In a week or so, if you find my clothes" },
      { time: 19.4, text: "at the mouth of the riverbank." },
      { time: 22.28, text: "It means the good Lord has called me home" },
      { time: 24.96, text: "and the current's stronger than you think." },
      { time: 27.5, text: "Oh, I go" },
      { time: 29.2, text: "from the bottom of that river floor" },
      { time: 33.28, text: "to a great shining place up in the sky." },
      { time: 38.28, text: "And when I get there," },
      { time: 39.76, text: "I'll have no pain and no more tears." },
      { time: 44.42, text: "Yes, Lord, I've reached the by-and-by." },
      { time: 48.66, text: "[upbeat country music]" },
      { time: 71.58, text: "At my funeral, my family was there" },
      { time: 74.1, text: "but I heard Mama make an awful sound." },
      { time: 77.38, text: "She was cryin' 'bout her lost little baby," },
      { time: 80.22, text: "but Mama, I'm with Jesus now." },
      { time: 83.7, text: "I may have left you for a little while," },
      { time: 85.67, text: "but if there's one thing I know." },
      { time: 89.02, text: "One day the Lord will call you home" },
      { time: 91.26, text: "and I'll meet you on God's golden shore." },
      { time: 93.88, text: "Oh, I go" },
      { time: 95.66, text: "from the bottom of that river floor" },
      { time: 97.78, text: "to a great shining place up in the sky." },
      { time: 104.8, text: "And when I get there," },
      { time: 106.26, text: "I'll have no pain and no more tears." },
      { time: 110.9, text: "Yes, Lord, I've reached the by-and-by." },
      { time: 116.4, text: "[upbeat country music]" }
    ],
    audioParams: {
      tempo: 95,
      type: 'acoustic',
      chords: [
        [48, 52, 55], // C
        [53, 57, 60], // F
        [48, 52, 55], // C
        [55, 59, 62]  // G
      ]
    }
  },
  {
    id: "user-whyd-you-have-to-go",
    coverUrl: "/albumicon/why'd you have to go.png",
    title: "whyd you have to go",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 210,
    audioUrl: "/music/whyd you have to go.mp3",
    lyrics: [
      { time: 0, text: "Why'd you have to go?" },
      { time: 5, text: "Now I'm so alone, ooh" },
      { time: 10, text: "To go? Why'd you have to go?" },
      { time: 15, text: "Now I'm so alone" },
      { time: 20, text: "Ooh. Why'd you have to go?" },
      { time: 25, text: "Why'd you have to go?" },
      { time: 30, text: "Now I'm so alone. Ooh" }
    ],
    audioParams: {
      tempo: 85,
      type: 'ambient',
      chords: [
        [57, 60, 64], // Am
        [50, 53, 57], // Dm
        [55, 59, 62], // G
        [48, 52, 55]  // C
      ]
    }
  },
  {
    id: "user-ill-live-for-him",
    coverUrl: "/albumicon/illliveforhim.png",
    title: "I'll live for him",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 200,
    audioUrl: "/music/I'll live for him.mp3",
    lyrics: [
      { time: 0, text: "[singing]" },
      { time: 14.26, text: "I walked in shadows, lost and alone." },
      { time: 20.38, text: "My heart was heavy, my spirit like stone." },
      { time: 26.56, text: "But then a whisper broke through the night." },
      { time: 32.66, text: '"Child, I love you, come into the light."' },
      { time: 39.46, text: "Amazing grace, oh, how sweet the sound. Oh, how sweet the sound." },
      { time: 48, text: "Was I was lost, but now I'm found. But now I'm found." },
      { time: 51.91, text: "Through Jesus' love, my chains are gone. My chains are gone." },
      { time: 58.2, text: "I live for Him, my heart's His throne." },
      { time: 66.72, text: "I ran with the sinners, I chased after lies." },
      { time: 72.94, text: "But mercy found me, wiped tears from my eyes." },
      { time: 79.58, text: "Now every day, I'll sing His praise" },
      { time: 82.7, text: "For I am His, forever I'll raise." },
      { time: 92.04, text: "Amazing grace, oh, how sweet the sound. Oh, how sweet the sound." },
      { time: 101.03, text: "I was lost, but now I'm found. But now I'm found." },
      { time: 104.31, text: "Through Jesus' love, my chains are gone. My chains are gone." },
      { time: 111.08, text: "I live for Him, my heart's His throne." },
      { time: 118.58, text: "Oh, the cross has won my victory. He's my victory." },
      { time: 131.1, text: "In His embrace, I am finally free. I am free." },
      { time: 137.12, text: "Every step I take, I'll follow His way. I'll follow His way." },
      { time: 144.98, text: "Jesus, my Savior. I live for today. I live for today." },
      { time: 157.86, text: "Amazing grace, oh, how sweet the sound. Oh, how sweet the sound." },
      { time: 164.45, text: "I was lost, but now I'm found. But now I'm found." },
      { time: 170.24, text: "Through Jesus' love, my chains are gone. My chains are gone." },
      { time: 176.519, text: "I live for Him, my heart's His throne." },
      { time: 182.88, text: "Amazing grace. Forever I'll sing. Forever I'll sing." },
      { time: 189.02, text: "In His love and mercy, my soul takes wing. My soul takes wing." },
      { time: 195.26, text: "Through every trial, I will proclaim. I will proclaim." },
      { time: 201.42, text: "I'm saved by grace, and I'll bless His name. I'll bless His name." }
    ],
    audioParams: {
      tempo: 90,
      type: 'ambient',
      chords: [
        [48, 52, 55], // C
        [53, 57, 60], // F
        [55, 59, 62], // G
        [48, 52, 55]  // C
      ]
    }
  },
  {
    id: "user-dead-and-gone",
    coverUrl: "/albumicon/deadandgone.png",
    title: "Dead and Gone (And So's Her Nagging)",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 220,
    audioUrl: "/music/Dead and Gone (And So's Her Nagging).mp3",
    lyrics: [
      { time: 0, text: "[singing]" },
      { time: 13.98, text: "She used to scowl when I'd crack a beer" },
      { time: 17.66, text: "her voice like a chainsaw buzzing near." },
      { time: 23.63, text: '"Put down that whiskey, lay off that blow."' },
      { time: 27.6, text: "Now she's six feet under," },
      { time: 32.98, text: "and she'll never know." },
      { time: 38.3, text: "Dead and gone, she's dead and gone." },
      { time: 42.5, text: "Now I can drink 'til the break of dawn." },
      { time: 47.52, text: "No more screaming, no more cries." },
      { time: 52.3, text: "Just peace and powder" },
      { time: 57.48, text: "under open skies." },
      { time: 62.92, text: "She hated my boots on the kitchen floor" },
      { time: 67.02, text: "and my shotgun leaned by the bedroom door." },
      { time: 72.92, text: "Now the house is quiet, the whiskey flows." },
      { time: 77.1, text: "She don't gripe no more," },
      { time: 80.38, text: "that's how it goes." },
      { time: 83.34, text: "It ain't love," },
      { time: 85.84, text: "it ain't hate." },
      { time: 88.2, text: "It's just silence, my clean slate." },
      { time: 92.3, text: "Dead and gone, she's dead and gone." },
      { time: 96.92, text: "I'm a free man with the curtains drawn." },
      { time: 102.58, text: "No more sermons, no more sighs." },
      { time: 107.14, text: "Just me and my vices" },
      { time: 112.86, text: "cutting ties." },
      { time: 118.08, text: "I" },
      { time: 138.18, text: "ain't saying I didn't love her," },
      { time: 142.56, text: "but Lord, she'd smother like no other." },
      { time: 146.7, text: "Now her lips are sealed," },
      { time: 149.5, text: "her judging's done," },
      { time: 151.8, text: "and I'm chasing stars" },
      { time: 156.5, text: "with the devil's fun." },
      { time: 159.87, text: "[outro music]" }
    ],
    audioParams: {
      tempo: 100,
      type: 'acoustic',
      chords: [
        [57, 60, 64], // Am
        [53, 57, 60], // F
        [48, 52, 55], // C
        [55, 59, 62]  // G
      ]
    }
  },
  {
    id: "user-never-say-scared",
    coverUrl: "/albumicon/neversayyourescared.png",
    title: "Never Say You're Scared",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 420,
    audioUrl: "/music/Never Say You're Scared.mp3",
    lyrics: [
      { time: 0, text: "[singing]" },
      { time: 25, text: "In the dim light of the evening," },
      { time: 31.34, text: "shadows stretch and sway." },
      { time: 37.16, text: "I catch the echoes of your laughter," },
      { time: 42.38, text: "but they're fading away." },
      { time: 49.78, text: "You sit in your old chair like a ghost in a frame." },
      { time: 61.04, text: "Words hang heavy in the silence," },
      { time: 66.08, text: "but you never speak my name." },
      { time: 72.18, text: "And I watch you slip through fingers" },
      { time: 79.42, text: "like the smoke in the air." },
      { time: 85.12, text: "You wear a mask of bravado," },
      { time: 90.88, text: "but I see the weight you bear." },
      { time: 97.08, text: "Each moment feels like a whisper," },
      { time: 103.06, text: "a soft, forgotten prayer." },
      { time: 109.78, text: "You're fading in the twilight," },
      { time: 114.08, text: "but you'll never say you're scared." },
      { time: 121.72, text: "The stories that you told me," },
      { time: 127.4, text: "now they tremble in the breeze." },
      { time: 133.08, text: "I trace the lines of your hand" },
      { time: 139.36, text: "where the memories freeze." },
      { time: 145.8, text: "You smile like you're invincible," },
      { time: 151.02, text: "but I see the cracks inside." },
      { time: 157.76, text: "A warrior in a battle" },
      { time: 162.26, text: "with nowhere left to hide." },
      { time: 168.82, text: "And I watch you slip through fingers" },
      { time: 175.34, text: "like the smoke in the air." },
      { time: 181.14, text: "You wear a mask of bravado," },
      { time: 186.86, text: "but I see the weight you bear." },
      { time: 193, text: "Each moment feels like a whisper," },
      { time: 199, text: "a soft, forgotten prayer." },
      { time: 205.78, text: "You're fading in the twilight," },
      { time: 209.92, text: "but you'll never say you're scared." },
      { time: 214.38, text: "Time is a thief stealing pieces of your grace." },
      { time: 220.9, text: "I wish I could hold you, but you turn away." },
      { time: 226.82, text: "Your eyes are a window to the truths you won't embrace." },
      { time: 232.2, text: "And I'm left here watching as the colors turn to gray." },
      { time: 238.9, text: "I gather all the fragments, the laughter and the tears." },
      { time: 244.76, text: "The man who taught me courage, now lost within his fear." },
      { time: 250.6, text: "But I'll carry every heartbeat, every lesson that you gave." },
      { time: 255.98, text: "Even as you're fading softly, I will learn to be brave." },
      { time: 264.84, text: "And I watch you slip through fingers" },
      { time: 270.9, text: "like the smoke in the air." },
      { time: 277.08, text: "You wear a mask of bravado," },
      { time: 282.82, text: "but I see the weight you bear." },
      { time: 289.06, text: "Each moment feels like a whisper," },
      { time: 295.04, text: "a soft, forgotten prayer." },
      { time: 301.78, text: "You're fading in the twilight," },
      { time: 306.08, text: "but you'll never say you're scared." },
      { time: 312.82, text: "So I'll stand here in the shadows," },
      { time: 318.66, text: "holding on to what remains." },
      { time: 325.04, text: "A love that's never spoken," },
      { time: 329.88, text: "but it flows through all the pain." },
      { time: 336.98, text: "And though you might be fading," },
      { time: 342.66, text: "I'll remember every day." },
      { time: 348.98, text: "The man behind the silence" },
      { time: 353.92, text: "who never turned away." },
      { time: 358.94, text: "[singing]" }
    ],
    audioParams: {
      tempo: 135,
      type: 'synthwave',
      chords: [
        [57, 60, 64], // Am
        [55, 59, 62], // G
        [53, 57, 60], // F
        [52, 56, 59]  // E
      ]
    }
  },
  {
    id: "user-one-last-goodbye",
    coverUrl: "/albumicon/onelastgoodbye.png",
    title: "One Last Goodbye (Remastered) (Remix) (Remix)",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 280,
    audioUrl: "/music/One Last Goodbye (Remastered) (Remix) (Remix).mp3",
    lyrics: [
      { time: 0.26, text: "One day I'll have" },
      { time: 4.12, text: "to bury you." },
      { time: 7.06, text: "That's not a day I look forward to." },
      { time: 13.94, text: "You're the one who brought me onto this earth." },
      { time: 27.52, text: "Now I must lay you down" },
      { time: 34.36, text: "onto her cold and sorrowed ground" },
      { time: 41.14, text: "as I return you to the dirt." },
      { time: 51.66, text: "Oh, oh, oh" },
      { time: 55.04, text: "how I'll miss you." },
      { time: 58.5, text: "You're the one who gave me my name," },
      { time: 65.44, text: "and your laughter filled these halls," },
      { time: 70.54, text: "but now I'm alone and so withdrawn." },
      { time: 76.18, text: "I don't think that I'll ever be the same," },
      { time: 85.9, text: "but the memory remains." },
      { time: 95.64, text: "Sit up front. I don't know how to act." },
      { time: 102.52, text: "You look so beautiful dressed in black." },
      { time: 109.14, text: "I hold your hand one last time." },
      { time: 119.66, text: "I guess this is really the end." },
      { time: 127.32, text: "I have lost my best friend." },
      { time: 132.42, text: "I've never been in so much pain," },
      { time: 142.96, text: "but the memory remains." },
      { time: 152.64, text: "Every day," },
      { time: 155.48, text: "walking down the street," },
      { time: 159.22, text: "I see your face in the people I meet." },
      { time: 165.47, text: "It almost feels like you're by my side." },
      { time: 174.04, text: '"Love everyone, and make them your friend."' },
      { time: 181.28, text: "That's what you said to me when I was ten." },
      { time: 188.68, text: "I live by these words, or at least I try" },
      { time: 197.08, text: "to keep the memory alive." },
      { time: 206.38, text: "Remember when" },
      { time: 210.52, text: "I was eighteen?" },
      { time: 213.56, text: "We lost your mom to C.O.P.D." },
      { time: 219.94, text: "That was the first time I'd heard you cry." },
      { time: 229.04, text: "I barely remember how she talked." },
      { time: 234.86, text: "Sometimes I can't hear her voice at all." },
      { time: 241.8, text: "I'm afraid that will happen to you someday," },
      { time: 251.82, text: "and the memory will fade away." }
    ],
    audioParams: {
      tempo: 110,
      type: 'synthwave',
      chords: [
        [48, 52, 55], // C
        [55, 59, 62], // G
        [57, 60, 64], // Am
        [53, 57, 60]  // F
      ]
    }
  },
  {
    id: "user-grace-feedback",
    coverUrl: "/albumicon/graceinthefeedback.png",
    title: "Grace in the Feedback",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 240,
    audioUrl: "/music/Grace in the Feedback.mp3",
    lyrics: [
      { time: 11.26, text: "[singing]" },
      { time: 16.219, text: "Woke up in the static of my thoughts." },
      { time: 22.04, text: "Same four walls, same old ache." },
      { time: 29.26, text: "Eyes on the ceiling, counting faults." },
      { time: 34.48, text: "Heart like a heartbreak." },
      { time: 39.18, text: "I chased every shadow in the room." },
      { time: 42.48, text: "Made friends with the fear I fed." },
      { time: 45.64, text: "Hands on my head in the afternoon." },
      { time: 49.62, text: "Praying words I'd never said." },
      { time: 52.94, text: "And Your grace cut through the noise." },
      { time: 56.5, text: "Pulled my soul up from the void." },
      { time: 59.6, text: "In the dark, I heard Your name, Jesus." },
      { time: 67.2, text: "All the weight fell off my chest." },
      { time: 70.22, text: "Like a storm that's finally spent." },
      { time: 74.32, text: "In Your arms, I lay my fear down." },
      { time: 79.82, text: "Jesus, I found peace." },
      { time: 88.24, text: "I found peace." },
      { time: 95.36, text: "I was all edges, glass, and wire." },
      { time: 98.46, text: "Every breath felt much too loud." },
      { time: 102.48, text: "Running on fumes and burned-out fire." },
      { time: 106.46, text: "Drowning in the crowd." },
      { time: 109.36, text: "You took my shame, every jagged piece." },
      { time: 113.12, text: "Spoke my name over the blame." },
      { time: 116.68, text: "Silent room filled with gentle peace." },
      { time: 121.12, text: "Nothing felt the same." },
      { time: 124.01, text: "'Cause Your grace cut through the noise." },
      { time: 127.16, text: "Pulled my soul up from the void." },
      { time: 130.88, text: "In the dark, I heard Your name, Jesus." },
      { time: 138.08, text: "All the weight fell off my chest." },
      { time: 141.8, text: "Like a storm that's finally spent." },
      { time: 145.38, text: "In Your arms, I lay my fear down." },
      { time: 150.88, text: "Jesus, I found peace." },
      { time: 159.3, text: "I found peace." },
      { time: 165.84, text: "When the voices in my head get loud, so loud." },
      { time: 170.42, text: "I remember how You held me close, so close." },
      { time: 173.92, text: "When I couldn't stand, You stood for me." },
      { time: 177.08, text: "You bled for me, You sing through me." },
      { time: 180.8, text: "Now Your grace rides on my breath." },
      { time: 183.66, text: "Every step in life and death." },
      { time: 187.18, text: "In the dark, I'll call Your name," },
      { time: 194.72, text: "Jesus." },
      { time: 198.46, text: "All the lies fall off like dust." },
      { time: 202, text: "In Your goodness, I can trust." },
      { time: 205.52, text: "In Your love, I lay my fear down." },
      { time: 214.46, text: "Jesus, I found peace." },
      { time: 222.9, text: "I found peace." },
      { time: 226.38, text: "Yeah, I found peace." },
      { time: 234.54, text: "[outro music]" }
    ],
    audioParams: {
      tempo: 125,
      type: 'synthwave',
      chords: [
        [48, 52, 55], // C
        [50, 53, 57], // Dm
        [57, 60, 64], // Am
        [55, 59, 62]  // G
      ]
    }
  },
  {
    id: "user-death",
    coverUrl: "/albumicon/death.png",
    title: "Death",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 220,
    audioUrl: "/music/Death.mp3",
    lyrics: [
      { time: 0, text: "[singing] Oh," },
      { time: 12.04, text: "Death." },
      { time: 17.02, text: "[upbeat music] Whoa, Death." },
      { time: 23.7, text: "Won't you spare me over till another year?" },
      { time: 32.2, text: "Well, what is this that I can't see?" },
      { time: 35.52, text: "With ice cold hands taking hold of me." },
      { time: 39.86, text: "Well, I'm Death, none can excel." },
      { time: 43.48, text: "I'll open the door to Heaven or Hell." },
      { time: 48.04, text: "Oh, Death, someone would pray." },
      { time: 51.02, text: "Could you wait to call me another day?" },
      { time: 56.08, text: "The children prayed, the preacher preached." },
      { time: 59.9, text: "Time and mercy is out of your reach." },
      { time: 63.7, text: "I'll fix your feet till you can't walk." },
      { time: 68, text: "I'll lock your jaw till you can't talk." },
      { time: 71.86, text: "I'll close your eyes so you can't see." },
      { time: 76.08, text: "This very hour, come and go with me." },
      { time: 81.4, text: "Death, I come to take the soul." },
      { time: 85.24, text: "Leave the body and leave it cold." },
      { time: 88.84, text: "To drop the flesh off of the frame." },
      { time: 92.9, text: "The earth and worms both have a claim." },
      { time: 100.72, text: "Oh, Death." },
      { time: 104.72, text: "Whoa, Death." },
      { time: 109.24, text: "Won't you spare me over till another year?" },
      { time: 118.18, text: "My mother came to my bed." },
      { time: 121.73, text: "Placed a cold towel upon my head." },
      { time: 125.28, text: "My head is warm, my feet are cold." },
      { time: 129.82, text: "Death is moving upon my soul." },
      { time: 133.48, text: "Oh, Death, how you're treating me." },
      { time: 136.9, text: "You close my eyes so I can't see." },
      { time: 140.6, text: "Well, you're hurting my body, you make me cold." },
      { time: 144.98, text: "You run my life right out of my soul." },
      { time: 150.46, text: "Oh, Death, please consider my age." },
      { time: 153.98, text: "Please don't take me at this stage." },
      { time: 157.54, text: "My wealth is all at your command." },
      { time: 161.56, text: "If you will move your icy hands." },
      { time: 166.16, text: "Old or young, the rich or poor," },
      { time: 170.16, text: "all are like me, you know." },
      { time: 173.6, text: "No wealth, no land, no silver, no gold." },
      { time: 177.86, text: "Nothing satisfies me but your soul." },
      { time: 185.48, text: "Oh, Death." },
      { time: 189.36, text: "Whoa, Death." },
      { time: 193.78, text: "Won't you spare me over till another year?" },
      { time: 201.9, text: "Won't you spare me over till another tear-stained year?" },
      { time: 209.92, text: "Won't you spare me over till another year of fear?" },
      { time: 215.92, text: "[upbeat music fades out]" }
    ],
    audioParams: {
      tempo: 80,
      type: 'ambient',
      chords: [
        [50, 53, 57], // Dm
        [46, 50, 53], // Bb
        [48, 52, 55], // C
        [45, 48, 52]  // Am
      ]
    }
  },
  {
    id: "user-pal-optical",
    coverUrl: "/albumicon/paloptical.png",
    title: "Pal Optical",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 290,
    audioUrl: "/music/Pal Optical.mp3",
    lyrics: [
      { time: 0, text: "[singing]" },
      { time: 16.64, text: "Fluorescent hum in the ceiling tiles." },
      { time: 20.1, text: "Name tag pinned to my flannel shirt." },
      { time: 24.08, text: "Frames all lined like tiny cages." },
      { time: 28.32, text: "Waiting on faces and quiet hurt." },
      { time: 31.78, text: "Can you fix this scratch? It's driving me crazy." },
      { time: 36.36, text: 'I just nod, say, "Take a seat."' },
      { time: 40.78, text: "Watch the world blur through other people." },
      { time: 44.22, text: "Trying to see what they see in me." },
      { time: 48.78, text: "I'm killing time at Pal Optical." },
      { time: 52.24, text: "Polishing ghost of plastic glass." },
      { time: 56.24, text: "Wiping down yesterday's fingerprints." },
      { time: 59.9, text: "Like I can clean my crooked past." },
      { time: 64.22, text: "Holding up lenses to the window." },
      { time: 68.2, text: "Check the glare then let it fall." },
      { time: 71.69, text: "Guess I'm just here," },
      { time: 76.36, text: "going nowhere." },
      { time: 79.38, text: "Under the sign that says Pal Optical." },
      { time: 92.82, text: "Coffee stain on the backroom counter." },
      { time: 96.8, text: "Sticker chart on the bathroom wall." },
      { time: 100.08, text: "Clock hands drag like a heavy weekend." },
      { time: 104.2, text: "Phone barely ringing at all." },
      { time: 108.62, text: "Trips and slips through prescription numbers." },
      { time: 112.28, text: "Every box, a little life. Is this better, one or two?" },
      { time: 119.66, text: "Now I'm still stuck on choosing right." },
      { time: 124.68, text: "I'm killing time at Pal Optical." },
      { time: 128.16, text: "Polishing ghost of plastic glass." },
      { time: 132.16, text: "Wiping down yesterday's fingerprints." },
      { time: 135.88, text: "Like I can clean my crooked past." },
      { time: 140.08, text: "Holding up lenses to the window." },
      { time: 144.56, text: "Check the glare then let it fall." },
      { time: 147.58, text: "Guess I'm just here," },
      { time: 152.3, text: "going nowhere." },
      { time: 154.7, text: "Under the sign that says Pal Optical." },
      { time: 167.34, text: "Maybe one day I'll walk out early. Walk out early." },
      { time: 176.92, text: "Leave the keys by the register drawer." },
      { time: 183.66, text: "But tonight I'll flip the open sign over." },
      { time: 191.38, text: "Lock the door, sweep the floor." },
      { time: 196.18, text: "And stare at my face in the front display door." },
      { time: 202.68, text: "Still killing time at Pal Optical." },
      { time: 206.2, text: "Polishing ghost of plastic glass." },
      { time: 209.92, text: "Wiping down yesterday's fingerprints." },
      { time: 213.94, text: "Like I can clean my crooked past." },
      { time: 218.14, text: "Holding up lenses to the window." },
      { time: 222.6, text: "Till the streetlights start to crawl." },
      { time: 225.7, text: "Guess I'm just here, year after year." },
      { time: 233.5, text: "Under the sign that says Pal Optical." },
      { time: 243.06, text: "Mm, Pal Optical." },
      { time: 248.14, text: "[outro music]" }
    ],
    audioParams: {
      tempo: 115,
      type: 'synthwave',
      chords: [
        [52, 55, 59], // Em
        [53, 57, 60], // F
        [48, 52, 55], // C
        [50, 53, 57]  // Dm
      ]
    }
  },
  {
    id: "user-last-breath-glass",
    coverUrl: "/albumicon/lastbreathglass.png",
    title: "Last Breath Glass",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 360,
    audioUrl: "/music/Last Breath Glass.mp3",
    lyrics: [
      { time: 11, text: "[singing]" },
      { time: 17.08, text: "You've got a chair by the window," },
      { time: 20.78, text: "and your hands are paper-thin." },
      { time: 24.48, text: "I bring you soup in little bowls." },
      { time: 27.3, text: "You smile, then drift again." },
      { time: 31.74, text: "The clock keeps chewing through the room." },
      { time: 35.42, text: "The blinds make stripes on the floor." },
      { time: 38.56, text: "I count the breaths you haven't lost" },
      { time: 41.92, text: "like I can save one more." },
      { time: 46.9, text: "And I learn your face by shadows." },
      { time: 50.24, text: "I learn your pain by sound." },
      { time: 54.5, text: "Every day gets smaller." },
      { time: 58.16, text: "Every day pulls down." },
      { time: 62.2, text: "Don't go. Don't go." },
      { time: 66.04, text: "Stay in my arms." },
      { time: 69.38, text: "Don't go. Don't go." },
      { time: 72.6, text: "You're my only home. My only home." },
      { time: 78.02, text: "Don't go. Leave me the dark." },
      { time: 83.58, text: "If you have to leave," },
      { time: 87.96, text: "take my heart." },
      { time: 90.48, text: "[rock music]" },
      { time: 104.49, text: "I fold your coat in careful squares." },
      { time: 107.34, text: "It still smells like the rain." },
      { time: 111.7, text: "You call my name like it's far away," },
      { time: 114.48, text: "then let it fade again." },
      { time: 118.94, text: "I watch the garden bend and brown." },
      { time: 121.66, text: "I watch the cup go cold." },
      { time: 126.16, text: "I watch the truth sit on your chest" },
      { time: 129.2, text: "like a stone too old." },
      { time: 133.78, text: "And I hear the night above us" },
      { time: 137.36, text: "like water in the walls." },
      { time: 140.78, text: "I keep thinking if I hold you," },
      { time: 144.76, text: "something here won't fall." },
      { time: 148.8, text: "Don't go. Don't go." },
      { time: 152.6, text: "Stay in my arms." },
      { time: 155.95, text: "Don't go. Don't go." },
      { time: 158.54, text: "You're my only home. My only home." },
      { time: 165.04, text: "Don't go." },
      { time: 166.88, text: "Leave me the dark." },
      { time: 170.06, text: "If you have to leave," },
      { time: 174.42, text: "take my heart." },
      { time: 177.2, text: "[rock music]" },
      { time: 192.93, text: "And the room turns white with nothing." },
      { time: 196.74, text: "Your fingers lose their fire." },
      { time: 199.46, text: "I feel the world split open." },
      { time: 203.92, text: "I feel it climb up higher." },
      { time: 206.86, text: "No, no, not you." },
      { time: 210.4, text: "Not the last warm thing." },
      { time: 214.04, text: "Not the light I bled for." },
      { time: 217.64, text: "Not the only name I'd say." },
      { time: 224.34, text: "Don't go." },
      { time: 226.12, text: "Don't go." },
      { time: 228.04, text: "Stay in my arms." },
      { time: 231.52, text: "Don't go. Don't go." },
      { time: 234.48, text: "You're my only home. My only home." },
      { time: 240.46, text: "Don't go." },
      { time: 242.28, text: "Leave me the dark." },
      { time: 245.54, text: "If you have to leave, take my heart." },
      { time: 253.06, text: "Don't go. Don't go." },
      { time: 254.9, text: "Don't go. I'm breaking in two." },
      { time: 257.519, text: "Don't go. Don't go." },
      { time: 259.16, text: "I can't follow you." },
      { time: 261.18, text: "Don't go. Don't go." },
      { time: 262.919, text: "The whole room roars when you slip away." },
      { time: 270.56, text: "And I become war." },
      { time: 277.74, text: "And I scream at the ceiling," },
      { time: 283.58, text: "at the bed, at the quiet, at your name." },
      { time: 288.06, text: "I scream for the years." },
      { time: 291.7, text: "I scream for the pain." },
      { time: 295.32, text: "I scream because loving you" },
      { time: 299.82, text: "was the only thing that stayed." },
      { time: 304.36, text: "[outro music]" }
    ],
    audioParams: {
      tempo: 95,
      type: 'ambient',
      chords: [
        [50, 53, 57], // Dm
        [45, 48, 52], // Am
        [46, 50, 53], // Bb
        [48, 51, 55]  // Cm
      ]
    }
  },
  {
    id: "user-entre-pasillos",
    coverUrl: "/albumicon/entrepasillos.png",
    title: "Entre Pasillos",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 230,
    audioUrl: "/music/Entre Pasillos.mp3",
    lyrics: [
      { time: 0.58, text: "[intro musical suave]" },
      { time: 16.24, text: "Te vi caer entre el ruido gris," },
      { time: 20.06, text: "yo iba de paso y tú mirándome así." },
      { time: 23.62, text: "Tu risa torció mi plan otra vez," },
      { time: 27.4, text: "en el lugar menos pensado encontré tu fe." },
      { time: 32.58, text: "Y se abrió la noche sin pedir perdón," },
      { time: 36.14, text: "tu mano en la mía cambió la dirección." },
      { time: 40.36, text: "Yo no lo esperaba ni un segundo así," },
      { time: 42.88, text: "pero en ese rincón me quedé por ti." },
      { time: 48.11, text: "¿Quién diría, amor," },
      { time: 51.92, text: "en un sitio así?" },
      { time: 55.62, text: "¿Quién diría, amor," },
      { time: 59.2, text: "te ibas a venir?" },
      { time: 63.02, text: "En lo menos probable," },
      { time: 66.72, text: "me aprendí a rendir." },
      { time: 70.69, text: "¿Quién diría, amor," },
      { time: 74.26, text: "te elegía a ti? [eco]" },
      { time: 76.67, text: "Te elegía a ti." },
      { time: 78.45, text: "Había mil caras y ninguna eras tú," },
      { time: 81.44, text: "pero tu calma llegó rompiendo la multitud." },
      { time: 86, text: "Tú con tu forma de mirar sin huir," },
      { time: 89.18, text: "yo con la suerte de dejarme sentir." },
      { time: 94.64, text: "Y se abrió la noche sin pedir perdón," },
      { time: 98.14, text: "tu voz en la mía cambió la dirección." },
      { time: 102.34, text: "Yo no me esperaba ni un segundo así," },
      { time: 105.1, text: "pero en ese rincón me quedé por ti." },
      { time: 109.04, text: "¿Quién diría, amor," },
      { time: 113.68, text: "en un sitio así?" },
      { time: 117.28, text: "¿Quién diría, amor," },
      { time: 120.82, text: "te ibas a venir?" },
      { time: 124.56, text: "En lo menos probable," },
      { time: 126.98, text: "me aprendí a rendir." },
      { time: 132.08, text: "¿Quién diría, amor," },
      { time: 135.58, text: "te elegía a ti? [eco]" },
      { time: 137.609, text: "Te elegía a ti." },
      { time: 140.18, text: "Y si mañana se apaga el salón," },
      { time: 143.4, text: "yo voy contigo donde marque el corazón." },
      { time: 147.46, text: "Porque entre sombras te logré encontrar," },
      { time: 150.86, text: "y hasta lo raro" },
      { time: 153.58, text: "se dejó amar." },
      { time: 157.64, text: "¿Quién diría, amor," },
      { time: 161.3, text: "en un sitio así?" },
      { time: 162.66, text: "¿Quién diría, amor," },
      { time: 168.3, text: "te ibas a venir?" },
      { time: 171.98, text: "En lo menos probable," },
      { time: 175.56, text: "me aprendí a rendir." },
      { time: 179.36, text: "¿Quién diría, amor," },
      { time: 182.78, text: "te elegía a ti? [eco]" },
      { time: 184.67, text: "Te elegía a ti." },
      { time: 185.93, text: "[outro musical]" }
    ],
    audioParams: {
      tempo: 110,
      type: 'acoustic',
      chords: [
        [57, 60, 64], // Am
        [53, 57, 60], // F
        [57, 60, 64], // Am
        [52, 56, 59]  // E
      ]
    }
  },
  {
    id: "user-stone-and-fire",
    coverUrl: "/albumicon/stoneandfire.png",
    title: "Stone And Fire",
    artist: "James Brentlinger",
    album: "Self-Released",
    duration: 275,
    audioUrl: "/music/Stone And Fire.mp3",
    lyrics: [
      { time: 0, text: "[singing]" },
      { time: 14.73, text: "I came in with dust on my hands," },
      { time: 17.66, text: "carried a room full of night." },
      { time: 20.98, text: "You met me by the broken fence" },
      { time: 24.12, text: "like dawn on a blade of light." },
      { time: 28.48, text: "I heard my name in the ruin," },
      { time: 31.68, text: "soft as rain on stone." },
      { time: 34.64, text: "You took the fear from my mouth" },
      { time: 36.6, text: "and made it home." },
      { time: 38.92, text: "So I will lift my eyes" },
      { time: 41.22, text: "to the One who still calls." },
      { time: 44.94, text: "When the shadows press close," },
      { time: 48.28, text: "You don't let me fall." },
      { time: 51.14, text: "My heart beats back Your name" },
      { time: 53.72, text: "till the dark loses ground." },
      { time: 59.36, text: "Holy, holy, hold me now." },
      { time: 62.92, text: "You are near, You are near." },
      { time: 64.8, text: "Stone and fire break me down." },
      { time: 69.1, text: "You are here, You are here." },
      { time: 71.74, text: "I was lost, now I'm found," },
      { time: 75.3, text: "in Your love, in Your love." },
      { time: 77.44, text: "Holy, holy, lift me high." },
      { time: 81.46, text: "You are enough, enough." },
      { time: 88.8, text: "[singing]" },
      { time: 99.31, text: "There was ash on my tongue again" },
      { time: 101.82, text: "and a crack in my song." },
      { time: 105.54, text: "But You planted a pulse in me" },
      { time: 107.82, text: "where the cold had grown long." },
      { time: 111.78, text: "Now the old lies shiver" },
      { time: 114, text: "at the edge of Your voice." },
      { time: 117.64, text: "You turn my fear to a banner" },
      { time: 120.86, text: "and my grief to joy." },
      { time: 123.12, text: "So I will lift my eyes to the One who still calls." },
      { time: 129.12, text: "When the shadows press close," },
      { time: 132.44, text: "You don't let me fall." },
      { time: 135.34, text: "My heart beats back Your name" },
      { time: 137.8, text: "till the dark loses ground." },
      { time: 143.52, text: "Holy, holy, hold me now." },
      { time: 147.06, text: "You are near, You are near." },
      { time: 149.1, text: "Stone and fire break me down." },
      { time: 153.32, text: "You are here, You are here." },
      { time: 156.46, text: "I was lost, now I'm found," },
      { time: 159.56, text: "in Your love, in Your love." },
      { time: 161.44, text: "Holy, holy, lift me high." },
      { time: 165.62, text: "You are enough, enough." },
      { time: 171.22, text: "[singing] And if the night comes hard," },
      { time: 184.52, text: "I will take You through it." },
      { time: 186.76, text: "If the valley stays long," },
      { time: 189.92, text: "Your hand will move it." },
      { time: 193.8, text: "Breathe on the bones again," },
      { time: 196.9, text: "bring the dead to singing." },
      { time: 199.62, text: "Jesus, Jesus, reign" },
      { time: 203.06, text: "till the whole world's ringing." },
      { time: 207.56, text: "[singing]" },
      { time: 230.8, text: "Holy, holy, hold me now." },
      { time: 233.78, text: "You are near, You are near." },
      { time: 236.28, text: "Stone and fire break me down." },
      { time: 240, text: "You are here, You are here." },
      { time: 243.74, text: "I was lost, now I'm found," },
      { time: 246.24, text: "in Your love, in Your love." },
      { time: 249.46, text: "Holy, holy, lift me high." },
      { time: 252.88, text: "You are enough, enough." }
    ],
    audioParams: {
      tempo: 110,
      type: 'synthwave',
      chords: [
        [50, 53, 57], // Dm
        [48, 52, 55], // C
        [46, 50, 53], // Bb
        [45, 49, 52]  // A
      ]
    }
  }
];
