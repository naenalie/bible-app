// app.js - Scriptura Core Logic
import { BIBLE_BOOKS, OFFLINE_BIBLE_DATA, DAILY_VERSES } from './bibleData.js';
import { BIBLE_STORIES } from './bibleStories.js';
import { BIBLE_FACTS } from './dailyFacts.js';
import { BibleReaderCore } from './reader.js';
import { StreakCalculator } from './streak.js';

const streakCalculator = new StreakCalculator();

const fetchOnlineVerses = async (bookId, chapterNum) => {
  const bookObj = BIBLE_BOOKS.find(b => b.id === bookId);
  const url = `https://bible-api.alkitab.or.id/bible-api/api/v1/bible/tb/${bookObj.name.toLowerCase()}/${chapterNum}`;
  const response = await fetch(url);
  const data = await response.json();
  const fetchedVerses = data.verses.map(v => ({
    verse: v.verse,
    tb: v.text,
    en: `[EN Translation loading online...]`
  }));
  fetchEnglishVerses(bookObj.nameEn, chapterNum, fetchedVerses);
  return fetchedVerses;
};

const bibleReader = new BibleReaderCore(OFFLINE_BIBLE_DATA, fetchOnlineVerses);

// --- APP STATE ---
const state = {
  activeView: 'view-dashboard',
  theme: localStorage.getItem('theme') || 'dark',
  currentBook: 'GEN',
  currentChapter: 1,
  bilingual: true,
  fontSize: parseInt(localStorage.getItem('fontSize')) || 18,
  fontFamily: localStorage.getItem('fontFamily') || "'Cormorant Garamond', serif",
  highlights: JSON.parse(localStorage.getItem('highlights')) || {}, // Key: book-chap-verse, Val: color
  readingLog: JSON.parse(localStorage.getItem('readingLog')) || [], // List of YYYY-MM-DD
  activePlan: JSON.parse(localStorage.getItem('activePlan')) || null, // Active plan object
  completedReadings: JSON.parse(localStorage.getItem('completedReadings')) || {}, // Key: planId-dayIndex, Val: true
  journals: JSON.parse(localStorage.getItem('journals')) || {} // Key: book-chap, Val: text
};

// --- STUDY PLANS DATA ---
const STUDY_PLANS = [
  {
    id: "hope-7",
    title: "7 Days of Hope",
    description: "Rencana 7 hari untuk menemukan harapan dan ketenangan pikiran di tengah masa-masa sulit.",
    days: [
      { day: 1, title: "Harapan Baru", reading: "PSA 23", refLabel: "Mazmur 23" },
      { day: 2, title: "Kekuatan dari Tuhan", reading: "GEN 1", refLabel: "Kejadian 1" },
      { day: 3, title: "Firman Hidup", reading: "JOH 1", refLabel: "Yohanes 1" },
      { day: 4, title: "Percaya Sepenuh Hati", reading: "PRO 3", refLabel: "Amsal 3" },
      { day: 5, title: "Tuhan Penolongku", reading: "GEN 2", refLabel: "Kejadian 2" },
      { day: 6, title: "Kemuliaan Firman", reading: "JOH 1", refLabel: "Yohanes 1" },
      { day: 7, title: "Gembala yang Baik", reading: "PSA 23", refLabel: "Mazmur 23" }
    ]
  },
  {
    id: "wisdom-5",
    title: "5 Hari Kebijaksanaan",
    description: "Pelajari hikmat kehidupan sehari-hari dari kitab Amsal.",
    days: [
      { day: 1, title: "Awal Pengetahuan", reading: "PRO 3", refLabel: "Amsal 3" },
      { day: 2, title: "Kepercayaan pada Tuhan", reading: "PRO 3", refLabel: "Amsal 3:5-6" },
      { day: 3, title: "Berkat Penciptaan", reading: "GEN 1", refLabel: "Kejadian 1" },
      { day: 4, title: "Gembala Agung", reading: "PSA 23", refLabel: "Mazmur 23" },
      { day: 5, title: "Firman yang Hidup", reading: "JOH 1", refLabel: "Yohanes 1" }
    ]
  }
];

// --- QUIZ QUESTIONS DATABASE ---
const QUIZ_QUESTIONS = {
  "GEN-1": [
    { q: "Apa yang Allah ciptakan pada Hari Pertama penciptaan?", a: ["Terang", "Cakrawala", "Tumbuhan", "Matahari"], correct: 0 },
    { q: "Bagaimanakah keadaan bumi sebelum penciptaan?", a: ["Indah dan rapi", "Belum berbentuk dan kosong", "Penuh air bersih", "Telah berpenghuni"], correct: 1 },
    { q: "Roh siapa yang melayang-layang di atas permukaan air sebelum penciptaan?", a: ["Roh Kudus", "Roh Manusia", "Roh Allah", "Malaikat"], correct: 2 }
  ],
  "PSA-23": [
    { q: "Di manakah Tuhan membaringkan kita menurut Mazmur 23?", a: ["Di padang rumput hijau", "Di atas bukit berbatu", "Di tepi pantai", "Di dalam istana"], correct: 0 },
    { q: "Gada dan tongkat-Mu, itulah yang...", a: ["Menakuti musuh", "Menghibur aku", "Memukul binatang", "Menghakimi dunia"], correct: 1 },
    { q: "Kepala kita diurapi oleh Tuhan dengan...", a: ["Air jernih", "Minyak wangi", "Minyak", "Mahkota"], correct: 2 }
  ],
  "JOH-1": [
    { q: "Siapakah 'Firman' yang dimaksud pada mulanya dalam Yohanes 1?", a: ["Yohanes Pembaptis", "Musa", "Allah / Yesus", "Malaikat Gabriel"], correct: 2 },
    { q: "Terang itu bercahaya di dalam...", a: ["Kegelapan", "Surga", "Bait Allah", "Awan-awan"], correct: 0 },
    { q: "Firman itu telah menjadi apa dan diam di antara kita?", a: ["Malaikat", "Manusia", "Tulisan", "Raja Dunia"], correct: 1 }
  ],
  "PRO-3": [
    { q: "Janganlah bersandar kepada apa menurut Amsal 3:5?", a: ["Harta kekayaan", "Kekuatan fisik", "Pengertianmu sendiri", "Nasihat raja"], correct: 2 },
    { q: "Jika kita mengakui Tuhan dalam segala laku kita, apa yang akan Dia lakukan?", a: ["Meluruskan jalanmu", "Memberi emas", "Membasmi musuh", "Menulis nama kita"], correct: 0 }
  ],
  "GENERAL": [
    { q: "Berapa jumlah seluruh kitab dalam Alkitab Kristen Protestan?", a: ["66", "73", "39", "27"], correct: 0 },
    { q: "Siapakah yang memimpin bangsa Israel keluar dari Mesir?", a: ["Yosua", "Musa", "Daud", "Abraham"], correct: 1 },
    { q: "Siapakah orang tertua yang dicatat di Alkitab?", a: ["Adam", "Nuh", "Matusalah", "Enokh"], correct: 2 }
  ]
};

// --- CORE SYSTEM INIT ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initDashboard();
  initReaderSelectors();
  initReaderActions();
  initHighlights();
  initPlans();
  initJournals();
  initMeditate();
  initQuiz();
});

// --- THEME MANAGEMENT ---
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
  });
}

// --- ROUTING ---
function initRouting() {
  const navButtons = document.querySelectorAll('.nav-item, .bottom-nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      switchView(target);
    });
  });
}

function switchView(viewId) {
  state.activeView = viewId;
  
  // Update view visibility
  document.querySelectorAll('.view-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  document.getElementById(viewId).classList.add('active');

  // Update navigation items active state
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
    if (item.getAttribute('data-target') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Re-trigger view specific loading if needed
  if (viewId === 'view-dashboard') {
    renderStreak();
    renderActivePlanOnDashboard();
  } else if (viewId === 'view-journals') {
    renderJournalHistory();
  } else if (viewId === 'view-quiz') {
    loadQuizPanel();
  }
}

// --- DASHBOARD (HOME) ---
function initDashboard() {
  // 1. Set Date
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dashboard-date').innerText = new Date().toLocaleDateString('id-ID', dateOptions);

  // 2. Set Daily Verse
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const dailyVerse = DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
  const verseTextEl = document.getElementById('daily-verse-text');
  const verseRefEl = document.getElementById('daily-verse-ref');
  
  verseTextEl.innerText = `"${dailyVerse.tb}"`;
  verseRefEl.innerText = dailyVerse.ref;

  document.getElementById('btn-read-daily').addEventListener('click', () => {
    // Parse book and chapter from ref, e.g. "Yosua 1:9" or "Yohanes 3:16"
    if (dailyVerse.ref.includes("Yosua")) {
      loadChapter('Yosua', 1);
    } else if (dailyVerse.ref.includes("Yohanes")) {
      loadChapter('Yohanes', 3);
    } else if (dailyVerse.ref.includes("Filipi")) {
      loadChapter('Filipi', 4);
    } else if (dailyVerse.ref.includes("Amsal")) {
      loadChapter('Amsal', 3);
    } else {
      loadChapter('Mazmur', 23);
    }
  });

  // Daily Fact
  const factIndex = new Date().getDate() % BIBLE_FACTS.length;
  document.getElementById('daily-fact-text').innerText = BIBLE_FACTS[factIndex];

  // Verse Card Button
  document.getElementById('btn-generate-card').addEventListener('click', () => {
    openVerseCardModal(dailyVerse.tb, dailyVerse.ref);
  });

  // Go to plans link
  document.getElementById('btn-go-to-plans').addEventListener('click', () => {
    switchView('view-plans');
  });

  // 3. Render Stories Carousel
  renderStories();

  // 4. Render Streak & Active Plan
  renderStreak();
  renderActivePlanOnDashboard();
}

function renderStories() {
  const container = document.getElementById('stories-carousel-container');
  container.innerHTML = '';
  
  BIBLE_STORIES.forEach(story => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <div>
        <div style="font-size: 32px; margin-bottom: 12px;">${story.emoji}</div>
        <h4 style="font-size:16px; font-weight:bold; margin-bottom:8px;">${story.title}</h4>
        <p style="font-size:12px; color:var(--text-secondary); line-height:1.4;">${story.summary}</p>
      </div>
      <div style="margin-top:16px; font-size:11px; font-weight:bold; color:${story.themeColor};">
        ${story.reference}
      </div>
    `;
    card.addEventListener('click', () => {
      // Load story chapter
      if (story.id === 'creation') loadChapter('Kejadian', 1);
      else if (story.id === 'noah') loadChapter('Kejadian', 6);
      else if (story.id === 'david-goliath') loadChapter('1 Samuel', 17);
      else if (story.id === 'prodigal-son') loadChapter('Lukas', 15);
    });
    container.appendChild(card);
  });
}

// --- STREAK TRACKER ---
function renderStreak() {
  const log = state.readingLog;
  const streakCountNum = document.getElementById('streak-count-num');
  const calendarGrid = document.getElementById('streak-calendar-grid');
  
  const currentStreak = streakCalculator.calculateStreak(log);
  streakCountNum.innerText = `${currentStreak} Hari`;

  // Render Last 7 Days Mini Calendar
  calendarGrid.innerHTML = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = getLocalDateString(d);
    const completed = log.includes(dStr);
    const dayLabel = d.toLocaleDateString('id-ID', { weekday: 'narrow' });
    
    const dot = document.createElement('div');
    dot.className = `streak-day-dot ${completed ? 'completed' : ''}`;
    dot.innerText = dayLabel;
    calendarGrid.appendChild(dot);
  }
}

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// --- BIBLE READER & HIGHLIGHTS ---
function initReaderSelectors() {
  const bookSelect = document.getElementById('reader-book-select');
  const chapterSelect = document.getElementById('reader-chapter-select');

  // Populate Books Select
  bookSelect.innerHTML = '';
  BIBLE_BOOKS.forEach(book => {
    const option = document.createElement('option');
    option.value = book.id;
    option.innerText = book.name;
    bookSelect.appendChild(option);
  });

  // Selector Event Listeners
  bookSelect.addEventListener('change', () => {
    state.currentBook = bookSelect.value;
    state.currentChapter = 1;
    populateChaptersSelector();
    renderBibleText();
    loadJournalForCurrent();
  });

  chapterSelect.addEventListener('change', () => {
    state.currentChapter = parseInt(chapterSelect.value);
    renderBibleText();
    loadJournalForCurrent();
  });

  // Initialize
  bookSelect.value = state.currentBook;
  populateChaptersSelector();
  loadJournalForCurrent();
}

function populateChaptersSelector() {
  const chapterSelect = document.getElementById('reader-chapter-select');
  const book = BIBLE_BOOKS.find(b => b.id === state.currentBook);
  
  chapterSelect.innerHTML = '';
  for (let i = 1; i <= book.chapters; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = `Pasal ${i}`;
    chapterSelect.appendChild(option);
  }
  chapterSelect.value = state.currentChapter;
}

function loadChapter(bookName, chapterNum) {
  const book = BIBLE_BOOKS.find(b => b.name === bookName || b.nameEn === bookName);
  if (book) {
    state.currentBook = book.id;
    state.currentChapter = chapterNum;
    
    const bookSelect = document.getElementById('reader-book-select');
    bookSelect.value = book.id;
    populateChaptersSelector();
    renderBibleText();
    loadJournalForCurrent();
    switchView('view-reader');
  }
}

async function renderBibleText() {
  const versesDisplay = document.getElementById('bible-verses-display');
  versesDisplay.innerHTML = '';
  versesDisplay.style.fontFamily = state.fontFamily;
  versesDisplay.style.fontSize = `${state.fontSize}px`;

  versesDisplay.innerHTML = `<p style="color:var(--text-secondary); font-size:14px; text-align:center;">Mengunduh ayat...</p>`;
  
  try {
    const result = await bibleReader.loadChapter(state.currentBook, state.currentChapter);
    if (result && result.verses) {
      renderChapterVerses(result.verses);
    } else {
      throw new Error("Gagal memuat ayat.");
    }
  } catch (e) {
    console.error(e);
    versesDisplay.innerHTML = `
      <div style="text-align:center; padding:40px 0;">
        <p style="color:var(--text-secondary); margin-bottom:16px;">Gagal memuat pasal secara offline/online.</p>
        <button class="btn btn-secondary" id="btn-retry-fetch">Coba Lagi</button>
      </div>
    `;
    document.getElementById('btn-retry-fetch').addEventListener('click', renderBibleText);
  }
}

async function fetchEnglishVerses(bookEn, chapter, localVerses) {
  try {
    const res = await fetch(`https://bible-api.com/${bookEn}+${chapter}`);
    const data = await res.json();
    data.verses.forEach((v, idx) => {
      if (localVerses[idx]) {
        localVerses[idx].en = v.text;
      }
    });
    // Trigger re-render once English loaded
    if (state.currentBook === BIBLE_BOOKS.find(b => b.nameEn === bookEn).id && state.currentChapter === chapter) {
      renderChapterVerses(localVerses);
    }
  } catch (e) {
    console.error("Failed to load English text online", e);
  }
}

function renderChapterVerses(verses) {
  const versesDisplay = document.getElementById('bible-verses-display');
  versesDisplay.innerHTML = '';
  
  verses.forEach(v => {
    const row = document.createElement('div');
    row.className = 'verse-row';
    row.setAttribute('data-verse', v.verse);
    
    // Highlight check
    const highlightKey = `${state.currentBook}-${state.currentChapter}-${v.verse}`;
    const highlightColor = state.highlights[highlightKey];
    if (highlightColor) {
      row.classList.add(`highlight-${highlightColor}`);
    }

    row.innerHTML = `
      <div class="verse-text-container">
        <div>
          <span class="verse-num">${v.verse}</span>
          <span class="verse-text">${v.tb}</span>
        </div>
        ${state.bilingual ? `<div class="verse-text-en">${v.en}</div>` : ''}
      </div>
    `;

    // Handle clicking a verse to show highlighter
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      showHighlighterBubble(row, v.verse);
    });

    versesDisplay.appendChild(row);
  });
}

function initReaderActions() {
  // Bilingual switch toggle
  const bilingualBtn = document.getElementById('reader-bilingual-btn');
  bilingualBtn.addEventListener('click', () => {
    state.bilingual = !state.bilingual;
    bilingualBtn.innerText = `Bilingual (TB & EN): ${state.bilingual ? 'ON' : 'OFF'}`;
    renderBibleText();
  });

  // Font family selector
  const fontFamilySelect = document.getElementById('reader-font-family');
  fontFamilySelect.value = state.fontFamily;
  fontFamilySelect.addEventListener('change', () => {
    state.fontFamily = fontFamilySelect.value;
    localStorage.setItem('fontFamily', state.fontFamily);
    renderBibleText();
  });

  // Font size actions
  document.getElementById('font-decrease-btn').addEventListener('click', () => {
    if (state.fontSize > 12) {
      state.fontSize -= 2;
      localStorage.setItem('fontSize', state.fontSize);
      renderBibleText();
    }
  });

  document.getElementById('font-increase-btn').addEventListener('click', () => {
    if (state.fontSize < 36) {
      state.fontSize += 2;
      localStorage.setItem('fontSize', state.fontSize);
      renderBibleText();
    }
  });

  // Finished reading button
  document.getElementById('btn-finish-reading').addEventListener('click', () => {
    triggerReadingFinish();
  });
}

// --- HIGHLIGHTER SYSTEM ---
let activeHighlightVerse = null;

function showHighlighterBubble(rowElement, verseNum) {
  activeHighlightVerse = verseNum;
  const bubble = document.getElementById('highlighter-popup');
  
  // Calculate position above the clicked verse row
  const rect = rowElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  bubble.style.display = 'flex';
  bubble.style.top = `${rect.top + scrollTop - 45}px`;
  bubble.style.left = `${rect.left + (rect.width / 2) - 80}px`;
  
  // Global click to close bubble
  const closeBubble = () => {
    bubble.style.display = 'none';
    document.removeEventListener('click', closeBubble);
  };
  
  setTimeout(() => {
    document.addEventListener('click', closeBubble);
  }, 10);
}

function initHighlights() {
  const dots = document.querySelectorAll('.color-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const color = dot.getAttribute('data-color');
      const highlightKey = `${state.currentBook}-${state.currentChapter}-${activeHighlightVerse}`;
      const row = document.querySelector(`.verse-row[data-verse="${activeHighlightVerse}"]`);
      
      // Clear previous classes
      if (row) {
        row.className = 'verse-row';
      }

      if (color === 'clear') {
        delete state.highlights[highlightKey];
      } else {
        state.highlights[highlightKey] = color;
        if (row) {
          row.classList.add(`highlight-${color}`);
        }
      }

      localStorage.setItem('highlights', JSON.stringify(state.highlights));
      document.getElementById('highlighter-popup').style.display = 'none';
      renderCurrentHighlightsList();
    });
  });
}

function renderCurrentHighlightsList() {
  const container = document.getElementById('journal-highlights-list');
  container.innerHTML = '';
  
  const prefix = `${state.currentBook}-${state.currentChapter}-`;
  let count = 0;
  
  Object.keys(state.highlights).forEach(key => {
    if (key.startsWith(prefix)) {
      count++;
      const verseNum = key.split('-')[2];
      const color = state.highlights[key];
      const bookObj = BIBLE_BOOKS.find(b => b.id === state.currentBook);
      
      const item = document.createElement('div');
      item.style.padding = '4px 8px';
      item.style.borderRadius = '6px';
      item.className = `highlight-${color}`;
      item.style.color = '#000';
      item.style.fontSize = '11px';
      item.style.fontWeight = 'bold';
      item.innerText = `Ayat ${verseNum}`;
      container.appendChild(item);
    }
  });

  if (count === 0) {
    container.innerHTML = `<span style="color:var(--text-secondary); font-style:italic;">Belum ada ayat ditandai.</span>`;
  }
}

// --- SIDE-JOURNALING ---
function loadJournalForCurrent() {
  const journalInput = document.getElementById('journal-input');
  const journalKey = `${state.currentBook}-${state.currentChapter}`;
  const book = BIBLE_BOOKS.find(b => b.id === state.currentBook);
  
  document.getElementById('journal-chapter-label').innerText = `${book.name} ${state.currentChapter}`;
  journalInput.value = state.journals[journalKey] || '';
  renderCurrentHighlightsList();
}

function initJournals() {
  const journalInput = document.getElementById('journal-input');
  const savedStatus = document.getElementById('journal-saved-status');
  let autoSaveTimeout = null;

  journalInput.addEventListener('input', () => {
    savedStatus.innerText = 'Menyimpan...';
    
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      const journalKey = `${state.currentBook}-${state.currentChapter}`;
      state.journals[journalKey] = journalInput.value;
      localStorage.setItem('journals', JSON.stringify(state.journals));
      savedStatus.innerText = 'Tersimpan';
    }, 1000);
  });
}

function renderJournalHistory() {
  const container = document.getElementById('journal-history-container');
  container.innerHTML = '';
  
  let journalKeys = Object.keys(state.journals).filter(key => state.journals[key].trim() !== '');
  
  if (journalKeys.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px 0; color:var(--text-secondary);">
        <p>Anda belum menulis jurnal apapun. Mulai membaca dan tulis refleksi Anda!</p>
      </div>
    `;
    return;
  }

  journalKeys.forEach(key => {
    const parts = key.split('-');
    const bookId = parts[0];
    const chapter = parts[1];
    const text = state.journals[key];
    const book = BIBLE_BOOKS.find(b => b.id === bookId);
    
    const card = document.createElement('div');
    card.className = 'journal-history-item';
    card.innerHTML = `
      <div class="journal-item-header">
        <span class="journal-item-ref">${book.name} ${chapter}</span>
        <span class="journal-item-date">Tersimpan</span>
      </div>
      <p class="journal-item-body">${text.replace(/\n/g, '<br>')}</p>
    `;
    container.appendChild(card);
  });
}

// --- STUDY PLANS & PROGRESS ---
function initPlans() {
  const container = document.getElementById('plans-container');
  container.innerHTML = '';
  
  STUDY_PLANS.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'plan-card';
    
    // Calculate progress
    let completedCount = 0;
    plan.days.forEach((day, idx) => {
      if (state.completedReadings[`${plan.id}-${idx}`]) {
        completedCount++;
      }
    });
    const progressPercent = plan.days.length > 0 ? Math.round((completedCount / plan.days.length) * 100) : 0;

    card.innerHTML = `
      <h3 style="font-family:'Cormorant Garamond', serif; font-size:22px; margin-bottom:8px; color:var(--accent-mauve);">${plan.title}</h3>
      <p style="font-size:13px; color:var(--text-secondary); line-height:1.4; margin-bottom:16px;">${plan.description}</p>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${progressPercent}%;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-top:12px;">
        <span style="color:var(--text-secondary);">${completedCount} dari ${plan.days.length} hari</span>
        <button class="btn btn-secondary btn-start-plan" style="padding:6px 12px; font-size:11px;" data-plan-id="${plan.id}">
          ${state.activePlan && state.activePlan.id === plan.id ? 'Sedang Aktif' : 'Mulai Rencana'}
        </button>
      </div>
    `;

    card.querySelector('.btn-start-plan').addEventListener('click', (e) => {
      e.stopPropagation();
      selectActivePlan(plan.id);
    });

    card.addEventListener('click', () => {
      openPlanDetailView(plan);
    });

    container.appendChild(card);
  });
}

function selectActivePlan(planId) {
  const plan = STUDY_PLANS.find(p => p.id === planId);
  state.activePlan = plan;
  localStorage.setItem('activePlan', JSON.stringify(state.activePlan));
  renderActivePlanOnDashboard();
  initPlans(); // Redraw main lists
}

function renderActivePlanOnDashboard() {
  const planCard = document.getElementById('dashboard-plan-card');
  const planTitle = document.getElementById('dashboard-plan-title');
  const planProgress = document.getElementById('dashboard-plan-progress');
  const planDesc = document.getElementById('dashboard-plan-desc');
  
  if (state.activePlan) {
    let completedCount = 0;
    state.activePlan.days.forEach((day, idx) => {
      if (state.completedReadings[`${state.activePlan.id}-${idx}`]) {
        completedCount++;
      }
    });
    
    const progressPercent = Math.round((completedCount / state.activePlan.days.length) * 100);
    planTitle.innerText = state.activePlan.title;
    planProgress.style.width = `${progressPercent}%`;
    planDesc.innerText = `Progress: ${progressPercent}% selesai (${completedCount}/${state.activePlan.days.length} hari).`;
  } else {
    planTitle.innerText = 'Belum Ada Rencana Aktif';
    planProgress.style.width = '0%';
    planDesc.innerText = 'Pilih rencana belajar di tab Study Plans untuk memulai pelacakan.';
  }
}

function openPlanDetailView(plan) {
  const container = document.getElementById('plans-container');
  
  // Render plan details instead of list
  let completedCount = 0;
  plan.days.forEach((day, idx) => {
    if (state.completedReadings[`${plan.id}-${idx}`]) {
      completedCount++;
    }
  });

  let html = `
    <div style="grid-column: 1 / -1; background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:24px; padding:32px;">
      <button class="btn btn-secondary" id="btn-back-to-plans" style="margin-bottom:20px;">← Kembali ke Rencana</button>
      <h2 style="font-family:'Cormorant Garamond', serif; font-size:32px; color:var(--accent-mauve); margin-bottom:8px;">${plan.title}</h2>
      <p style="color:var(--text-secondary); margin-bottom:24px;">${plan.description}</p>
      
      <div style="display:flex; flex-direction:column; gap:12px;">
  `;

  plan.days.forEach((day, idx) => {
    const isDone = state.completedReadings[`${plan.id}-${idx}`];
    html += `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background-color:var(--bg-surface); border-radius:16px; border:1px solid ${isDone ? 'var(--accent-mauve)' : 'transparent'}">
        <div style="display:flex; gap:16px; align-items:center;">
          <input type="checkbox" class="day-checkbox" data-idx="${idx}" ${isDone ? 'checked' : ''} style="width:20px; height:20px; accent-color:var(--accent-mauve);">
          <div>
            <div style="font-weight:bold; font-size:15px; color:${isDone ? 'var(--accent-mauve)' : 'var(--text-primary)'}">Hari ${day.day}: ${day.title}</div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Bacaan: ${day.refLabel}</div>
          </div>
        </div>
        <button class="btn btn-secondary btn-read-day" data-idx="${idx}" style="padding:6px 12px; font-size:11px;">Baca Sekarang</button>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Bind events
  document.getElementById('btn-back-to-plans').addEventListener('click', initPlans);
  
  document.querySelectorAll('.day-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const idx = cb.getAttribute('data-idx');
      state.completedReadings[`${plan.id}-${idx}`] = cb.checked;
      localStorage.setItem('completedReadings', JSON.stringify(state.completedReadings));
      renderActivePlanOnDashboard();
    });
  });

  document.querySelectorAll('.btn-read-day').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-idx');
      const reading = plan.days[idx].reading; // e.g. "PSA 23"
      const parts = reading.split(' ');
      const bookId = parts[0];
      const chapter = parseInt(parts[1]) || 1;
      
      // Auto active plan setting on click read
      selectActivePlan(plan.id);

      const book = BIBLE_BOOKS.find(b => b.id === bookId);
      loadChapter(book.name, chapter);
    });
  });
}

// --- MEDITATION MODE ---
function initMeditate() {
  const statusText = document.getElementById('breathing-status-text');
  let cycle = 0; // 0: inhale, 1: hold, 2: exhale
  
  // Set breathing text loop
  setInterval(() => {
    cycle = (cycle + 1) % 3;
    if (cycle === 0) {
      statusText.innerText = "Tarik Napas";
    } else if (cycle === 1) {
      statusText.innerText = "Tahan";
    } else {
      statusText.innerText = "Hembuskan";
    }
  }, 4000);

  // Audio Playback
  const rainAudio = document.getElementById('audio-rain');
  const pianoAudio = document.getElementById('audio-piano');
  
  const soundBtns = document.querySelectorAll('.sound-btn');
  soundBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const soundType = btn.getAttribute('data-sound');
      const isActive = btn.classList.contains('active');
      
      // Stop all first
      rainAudio.pause();
      pianoAudio.pause();
      soundBtns.forEach(b => b.classList.remove('active'));
      
      if (!isActive) {
        btn.classList.add('active');
        if (soundType === 'rain') {
          rainAudio.play();
        } else if (soundType === 'piano') {
          pianoAudio.play();
        } else if (soundType === 'ocean') {
          // Play a synthesised ocean noise node for PWA offline compatibility
          playSyntheticOcean();
        }
      } else {
        stopSyntheticOcean();
      }
    });
  });
}

// Synthetic Audio Synthesiser for Offline ambient (White noise filtered)
let audioCtx = null;
let noiseNode = null;
let filterNode = null;

function playSyntheticOcean() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create buffer filled with white noise
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  
  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = noiseBuffer;
  noiseNode.loop = true;
  
  // Filter for wave sweeping sound
  filterNode = audioCtx.createBiquadFilter();
  filterNode.type = 'lowpass';
  filterNode.frequency.value = 400;
  
  noiseNode.connect(filterNode);
  filterNode.connect(audioCtx.destination);
  
  noiseNode.start();
  
  // Modulate frequency to simulate sweeping waves
  let waveCycle = 0;
  window.oceanWaveInterval = setInterval(() => {
    waveCycle += 0.05;
    // sweep filter frequency between 200Hz and 800Hz
    filterNode.frequency.value = 400 + Math.sin(waveCycle) * 300;
  }, 100);
}

function stopSyntheticOcean() {
  if (window.oceanWaveInterval) {
    clearInterval(window.oceanWaveInterval);
  }
  if (noiseNode) {
    try { noiseNode.stop(); } catch(e) {}
    noiseNode = null;
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}

// --- POST READING & Q&A QUIZ ---
const CHAPTER_SUMMARIES = {
  "GEN-1": "Kitab Kejadian 1 menceritakan keagungan Allah yang merancang bumi dengan teratur dari kekacauan total menjadi tempat yang siap dihuni oleh manusia. Setiap tahap adalah berkat yang baik di mata-Nya.",
  "GEN-2": "Kejadian 2 menceritakan hubungan erat Allah dengan manusia pertama, Adam dan Hawa. Ini menunjukkan perhentian Sabat dan institusi keluarga yang dirancang suci oleh Allah.",
  "PSA-23": "Mazmur 23 melukiskan kepedulian Allah sebagai Gembala yang menyediakan segala kebutuhan kita, memberikan damai tenteram di tengah bahaya, dan memberkati hidup kita hingga melimpah.",
  "PRO-3": "Amsal 3 mengajarkan pentingnya menaruh rasa percaya penuh kepada Tuhan, tidak bersandar pada pemikiran terbatas diri sendiri, dan melangkah bersama petunjuk-Nya yang mendatangkan kedamaian."
};

function triggerReadingFinish() {
  const summaryModal = document.getElementById('summary-modal');
  const summaryText = document.getElementById('modal-summary-content');
  
  const key = `${state.currentBook}-${state.currentChapter}`;
  const summary = CHAPTER_SUMMARIES[key] || "Hebat! Teruslah membaca dan merenungkan firman-Nya setiap hari untuk memelihara keteduhan hati.";
  
  summaryText.innerText = summary;
  summaryModal.classList.add('active');

  // Log today's reading date for Streak
  const todayStr = getLocalDateString(new Date());
  if (!state.readingLog.includes(todayStr)) {
    state.readingLog.push(todayStr);
    localStorage.setItem('readingLog', JSON.stringify(state.readingLog));
  }

  // Log this chapter as yesterday's reading for the Quiz next day
  localStorage.setItem('lastReadChapterKey', key);
  
  // Close handler
  document.getElementById('btn-close-summary-modal').addEventListener('click', () => {
    summaryModal.classList.remove('active');
    switchView('view-dashboard');
  });
}

function initQuiz() {
  // Bind close buttons
  document.getElementById('btn-close-summary-modal').addEventListener('click', () => {
    document.getElementById('summary-modal').classList.remove('remove');
  });
}

function loadQuizPanel() {
  const quizBox = document.getElementById('quiz-content-box');
  const lastReadChapter = localStorage.getItem('lastReadChapterKey') || "GENERAL";
  
  const questions = QUIZ_QUESTIONS[lastReadChapter] || QUIZ_QUESTIONS["GENERAL"];
  
  let html = `
    <p style="color:var(--text-secondary); text-align:center; margin-bottom:24px; font-size:13px;">
      Berdasarkan bacaan terakhir Anda (${lastReadChapter === 'GENERAL' ? 'Alkitab Umum' : lastReadChapter.replace('-', ' ')}).
    </p>
    <div id="quiz-question-container"></div>
  `;
  quizBox.innerHTML = html;
  
  let currentQIdx = 0;
  let score = 0;

  function showQuestion() {
    const qContainer = document.getElementById('quiz-question-container');
    if (currentQIdx >= questions.length) {
      qContainer.innerHTML = `
        <div style="text-align:center; padding:24px 0;">
          <h3 style="color:var(--accent-mauve); margin-bottom:16px;">Kuis Selesai! 🎉</h3>
          <p style="font-size:24px; font-weight:bold; margin-bottom:12px;">Skor: ${Math.round((score / questions.length) * 100)}%</p>
          <p style="font-size:14px; color:var(--text-secondary); margin-bottom:24px;">Luar biasa! Refleksi harian Anda membantu firman-Nya tertanam di hati.</p>
          <button class="btn btn-primary" id="btn-restart-quiz">Main Lagi</button>
        </div>
      `;
      document.getElementById('btn-restart-quiz').addEventListener('click', () => {
        loadQuizPanel();
      });
      return;
    }

    const qData = questions[currentQIdx];
    qContainer.innerHTML = `
      <div class="quiz-question-box">
        <h3>Pertanyaan ${currentQIdx + 1} dari ${questions.length}:<br>${qData.q}</h3>
        <div class="quiz-options-list">
          ${qData.a.map((option, idx) => `
            <button class="quiz-option-btn" data-idx="${idx}">${option}</button>
          `).join('')}
        </div>
      </div>
    `;

    document.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedIdx = parseInt(btn.getAttribute('data-idx'));
        const optionsBtns = document.querySelectorAll('.quiz-option-btn');
        
        // Disable all
        optionsBtns.forEach(b => b.disabled = true);
        
        if (selectedIdx === qData.correct) {
          btn.classList.add('correct');
          score++;
        } else {
          btn.classList.add('incorrect');
          optionsBtns[qData.correct].classList.add('correct');
        }

        setTimeout(() => {
          currentQIdx++;
          showQuestion();
        }, 1500);
      });
    });
  }

  showQuestion();
}

// --- VERSE CARD GENERATOR ---
function openVerseCardModal(text, ref) {
  const modal = document.getElementById('verse-card-modal');
  const preview = document.getElementById('card-preview-container');
  const previewText = document.getElementById('card-preview-text');
  const previewRef = document.getElementById('card-preview-ref');
  
  previewText.innerText = text;
  previewRef.innerText = ref;
  
  modal.classList.add('active');

  // Change background style options
  const styleBtns = document.querySelectorAll('[data-style]');
  styleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const styleId = btn.getAttribute('data-style');
      preview.className = `verse-card-preview bg-style-${styleId}`;
    });
  });

  // Download Card Canvas Action
  document.getElementById('btn-download-card').onclick = () => {
    generatePngCard(text, ref, preview.className);
  };

  document.getElementById('btn-close-card-modal').onclick = () => {
    modal.classList.remove('active');
  };
}

function generatePngCard(text, ref, styleClass) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // 1. Draw Background Gradients
  let gradient = ctx.createLinearGradient(0, 0, 600, 600);
  if (styleClass.includes('bg-style-2')) {
    gradient.addColorStop(0, '#0D1612');
    gradient.addColorStop(0.5, '#1C3328');
    gradient.addColorStop(1, '#2E4C3E');
  } else if (styleClass.includes('bg-style-3')) {
    gradient.addColorStop(0, '#1C1111');
    gradient.addColorStop(0.5, '#3C2222');
    gradient.addColorStop(1, '#4D3333');
  } else {
    gradient.addColorStop(0, '#130C1A');
    gradient.addColorStop(0.5, '#251B33');
    gradient.addColorStop(1, '#3B2E4A');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 600);

  // 2. Draw Text (Cormorant Garamond styled Serif)
  ctx.fillStyle = '#EDE8E4';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Wrap text
  ctx.font = 'italic 28px Georgia, "Cormorant Garamond", serif';
  wrapText(ctx, `"${text}"`, 300, 260, 480, 40);

  // 3. Draw Reference (Gold Accent)
  ctx.fillStyle = '#C9A9A6';
  ctx.font = 'bold 16px "Inter", Arial, sans-serif';
  ctx.fillText(ref.toUpperCase(), 300, 500);

  // Trigger Download Link
  const link = document.createElement('a');
  link.download = `Scriptura-${ref.replace(/[:\s]/g, '-')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// Canvas Text Wrap Helper
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);

  // Draw lines centered around y
  let startY = y - ((lines.length - 1) * lineHeight) / 2;
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i].trim(), x, startY + (i * lineHeight));
  }
}
