import type { Track } from "@/components/TrackAccordion";

/** Central content store — keeps page.tsx focused on layout, not copy. */

export const SCOREBOARDS = [
  {
    title: "Business Health",
    description:
      "Sustainable growth, profitability, and operational excellence built to endure beyond any single season.",
  },
  {
    title: "Leadership Capacity",
    description:
      "The ability to cast vision, develop people, and carry weight with composure as influence expands.",
  },
  {
    title: "Character & Integrity",
    description:
      "Who you are when no one is watching — the quiet foundation every other scoreboard rests upon.",
  },
  {
    title: "Generosity & Stewardship",
    description:
      "Holding resources with open hands and deploying them deliberately for lasting Kingdom impact.",
  },
  {
    title: "Spiritual Vitality",
    description:
      "A living, unhurried walk with God that keeps the soul anchored while the enterprise grows.",
  },
];

export const RHYTHM = [
  {
    eyebrow: "Annual Retreat",
    title: "Kingdom Summit",
    intro:
      "A three-day annual gathering of 25–40 leaders in settings chosen for beauty and stillness.",
    details: [
      { label: "Locations", value: "Pebble Beach · Scottsdale · Coeur d'Alene · Sea Island · Palm Desert" },
      { label: "Morning", value: "Bible teaching, leadership sessions, and business strategy." },
      { label: "Afternoon", value: "Golf, adventure, unhurried conversation, and networking." },
      { label: "Evening", value: "Fireside interviews, generosity stories, prayer, worship, and great meals." },
    ],
    outcome:
      "an annual life plan, business growth plan, generosity plan, and spiritual growth plan.",
  },
  {
    eyebrow: "Monthly Gathering",
    title: "Leadership Roundtable",
    intro:
      "A focused two-hour monthly session that keeps formation and strategy in steady rhythm.",
    details: [
      { label: "Teaching", value: "Pastoral leadership teaching grounded in scripture." },
      { label: "Interview", value: "A guest business leader, candidly examined." },
      { label: "Breakouts", value: "Small group breakouts for real conversation." },
      { label: "Close", value: "Prayer and a single monthly challenge to carry forward." },
    ],
    outcome: "a clear monthly challenge and a sharpened sense of next steps.",
  },
  {
    eyebrow: "Daily Practice",
    title: "Daily App Experience",
    intro:
      "A weekday rhythm that integrates faith and leadership into the texture of ordinary days.",
    details: [
      { label: "Morning", value: "Scripture, devotional, a leadership thought, reflection, and prayer." },
      { label: "Midday", value: "A leadership quote and a practical business challenge." },
      { label: "Evening", value: "Reflection, gratitude, a journal prompt, and prayer." },
    ],
    outcome: "a consistent, examined life — one day at a time.",
  },
];

export const APP_PANELS = [
  {
    time: "Morning",
    items: [
      { label: "Scripture", body: "A passage to set the day's foundation." },
      { label: "Devotional", body: "A short reading that connects text to leadership." },
      { label: "Reflection", body: "One question to carry into the work ahead." },
    ],
  },
  {
    time: "Midday",
    items: [
      { label: "Leadership Quote", body: "A line worth pausing on at the desk." },
      { label: "Business Challenge", body: "A practical prompt to apply before evening." },
    ],
  },
  {
    time: "Evening",
    items: [
      { label: "Gratitude", body: "Three things worth naming from the day." },
      { label: "Journal", body: "A prompt to process decisions and tension." },
      { label: "Prayer", body: "A close that hands the day back to God." },
    ],
  },
];

export const TRACKS: Track[] = [
  {
    id: "business",
    title: "Business Excellence",
    summary:
      "The full discipline of building an enterprise that lasts — from first principles to succession.",
    topics: [
      "vision", "scaling", "hiring", "culture", "sales", "marketing", "finance",
      "negotiation", "AI", "technology", "boards", "succession", "innovation",
      "exit planning", "acquisitions", "decision making", "case studies",
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    summary:
      "How influence is earned, multiplied, and entrusted to the next generation of leaders.",
    topics: [
      "influence", "communication", "executive presence", "emotional intelligence",
      "delegation", "accountability", "conflict", "meetings", "time", "energy",
      "coaching", "teams", "developing leaders", "leading change",
    ],
  },
  {
    id: "character",
    title: "Character",
    summary:
      "The interior life of a leader — formed quietly, tested constantly, and worth more than any metric.",
    topics: [
      "humility", "integrity", "purity", "courage", "discipline", "honesty",
      "forgiveness", "emotional health", "marriage", "family", "friendships",
      "boundaries", "contentment", "faithfulness",
    ],
  },
  {
    id: "generosity",
    title: "Generosity",
    summary:
      "Moving from giving occasionally to living generously — the signature distinctive of the Collective.",
    topics: [
      "biblical stewardship", "open hands", "Kingdom investing", "lifestyle giving",
      "non-cash giving", "business giving", "family legacy", "teaching children generosity",
      "charitable trusts", "donor-advised funds", "succession", "estate planning",
      "giving while living", "generosity stories",
    ],
  },
  {
    id: "spiritual",
    title: "Spiritual Health",
    summary:
      "The practices that keep a leader rooted in God amid the relentless pull of the enterprise.",
    topics: [
      "prayer", "scripture", "silence", "Sabbath", "fasting", "evangelism",
      "sharing faith", "serving", "listening to God", "worship",
      "spiritual friendships", "mentoring others",
    ],
  },
];

export const GENEROSITY_DELIVERABLES = [
  {
    title: "Personal Generosity Vision",
    description: "A clear, written conviction for what your giving is ultimately meant to accomplish.",
  },
  {
    title: "Family Giving Plan",
    description: "A shared framework that aligns spouse and children around generous living.",
  },
  {
    title: "Legacy Plan",
    description: "Estate and succession decisions made on purpose, well before they're forced.",
  },
  {
    title: "Kingdom Impact Plan",
    description: "A deliberate strategy for deploying influence and capital toward eternal return.",
  },
];

export const RESOURCES = [
  "Video Library", "Masterclasses", "Templates", "Hiring Guide",
  "Leadership Playbooks", "Meeting Agendas", "Board Templates", "Budget Templates",
  "Succession Planning", "Generosity Toolkit", "Estate Planning Guide", "Prayer Library",
  "Book Summaries", "Business Assessments", "Spiritual Health Assessments",
  "Leadership Assessments", "DISC", "Working Genius", "Strengths",
  "Personal Rule of Life", "Annual Planning Workbook",
];

export const MENTOR_QUESTIONS = [
  "What has God taught you?",
  "What mistake cost you the most?",
  "What investment has produced the greatest eternal return?",
];

export const ACCOUNTABILITY_AREAS = [
  "Business", "Marriage", "Family", "Health",
  "Finances", "Generosity", "Spiritual Life", "Prayer Requests",
];

export const DASHBOARD = [
  { label: "Business", value: 78, caption: "Revenue health, margin discipline, and operational clarity." },
  { label: "Leadership", value: 64, caption: "Capacity built through delegation and developing others." },
  { label: "Character", value: 71, caption: "Integrity practices and interior health, honestly assessed." },
  { label: "Generosity", value: 52, caption: "Movement from occasional gifts toward a generous life." },
  { label: "Spiritual Health", value: 69, caption: "Consistency of prayer, scripture, and unhurried rhythm." },
];

export const DIFFERENT_QUESTIONS = [
  "How is your soul?",
  "How is your marriage?",
  "Who are you discipling?",
  "How are your employees flourishing because you lead?",
  "What story of generosity are you writing?",
  "If your company doubled tomorrow, would your character be ready?",
];

export const EXPERIENCES = [
  "Personal AI Coach", "Quarterly Business Reviews", "Annual Life Audit",
  "Prayer Partners", "Legacy Interviews", "Service Projects", "Spouse Track",
  "Business Site Visits", "Capstone Kingdom Project", "Alumni Network",
];
