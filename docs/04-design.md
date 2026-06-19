# Design Document — Scriptura

Dokumen ini merancang arsitektur perangkat lunak Scriptura sebelum tahap pengerjaan kode dimulai. Kami merancang sistem ini dengan prinsip **Deep Modules** (Modul Mendalam) dari metodologi *Codebase Design* untuk memastikan kegunaan tinggi bagi pemanggil (*leverage*), kemudahan pemeliharaan (*locality*), dan keterujian yang kuat (*testability*).

---

## 1. Arsitektur Modul & Seams (Batas Modul)

Kami membagi sistem Scriptura menjadi beberapa **Modul** yang berinteraksi melalui **Interface** yang ramping dan didefinisikan pada **Seam** yang jelas.

```
                  ┌──────────────────────────────────────────┐
                  │                 App/UI                   │
                  │   (Home, Reader, Meditate, Quiz, Plans)   │
                  └────────────────────┬─────────────────────┘
                                       │ (Seam UI-Logic)
                  ┌────────────────────▼─────────────────────┐
                  │              State Module                │
                  │      (State Store & Business Logic)      │
                  └────────────────────┬─────────────────────┘
                                       │ (Seam Storage / Web APIs)
             ┌─────────────────────────┼──────────────────────────┐
             ▼                         ▼                          ▼
  ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
  │   Storage Adapter   │   │    Audio Adapter    │   │   Canvas Adapter    │
  │    (localStorage)   │   │   (Web Audio API)   │   │    (HTML5 Canvas)   │
  └─────────────────────┘   └─────────────────────┘   └─────────────────────┘
```

### 1.1 State Module (Modul Utama)
- **Depth**: Tinggi. Modul ini menyembunyikan semua logika perhitungan rumit (streak membaca, tracking progres rencana belajar harian, serta spaced repetition quiz) di balik interface yang sangat sederhana.
- **Interface**:
  - `state.load()`: Memuat seluruh data dari penyimpanan lokal.
  - `state.save()`: Menyimpan seluruh status state saat ini.
  - `state.recordReading(bookId, chapterNum)`: Mencatat tanggal pembacaan, memperbarui streak harian, dan menyimpan referensi kuis.
  - `state.toggleHighlight(verseKey, color)`: Menambah atau menghapus highlight pada ayat.
  - `state.updatePlanProgress(planId, dayIdx, completedStatus)`: Mengubah progres belajar bertema.
- **Implementation**: Mengelola seluruh pembacaan, penulisan, kalkulasi streak, dan validasi data secara internal.

### 1.2 Storage Seam
- **Interface**: `getItem(key)` dan `setItem(key, value)`.
- **Adapter**: 
  1. `LocalStorageAdapter` (Produksi): Menyimpan data secara persisten di browser.
  2. `InMemoryAdapter` (Pengujian/TDD): Menyimpan data di memori (variabel JS objek) agar unit test berjalan cepat tanpa dependensi ke API browser.

### 1.3 Audio Seam (Meditasi)
- **Interface**: `play(soundType)` dan `stop()`.
- **Adapter**:
  1. `WebAudioOceanAdapter` (Produksi): Sintesis frekuensi noise ombak offline.
  2. `MockAudioAdapter` (Pengujian): Adapter kosong agar pengetesan visual tidak terhambat output suara asli.

---

## 2. User Flow (Aliran Navigasi Single Page Application)

Scriptura dirancang sebagai **Single Page Application (SPA)** yang responsif. Navigasi dikendalikan oleh router berbasis state:

```
        ┌────────────────────────────────────────────────────────┐
        │                       Navigation                       │
        │      (Sidebar di Desktop / Bottom Nav di Mobile)       │
        └──────┬──────────┬───────────┬───────────┬──────────┬───┘
               │          │           │           │          │
               ▼          ▼           ▼           ▼          ▼
         [Dashboard]   [Reader]    [Plans]    [Journal]  [Meditasi/Quiz]
              │           │           │
              │           │           │ (Mulai Baca)
              │           │◄──────────┘
              │           │
              │           │ (Klik "Selesai Membaca")
              │           ▼
              │      [Summary Modal]
              │           │
              │           ▼
              └───────────┴──────────► (Kembali ke Dashboard)
```

1. **Dashboard**: View utama yang menyajikan ringkasan panel card: Daily Verse, Streak api, Fact of the Day, dan galeri cerita.
2. **Reader**: Tempat pembacaan Alkitab. Teks Alkitab berada di kiri/tengah, sedangkan panel input jurnal berada di sebelah kanan (berdampingan).
3. **Plans**: Halaman manajemen rencana belajar. Memungkinkan pemilihan rencana aktif dan pengecekan tugas baca harian.
4. **Journal & Meditasi/Quiz**: Tab pendukung refleksi rohani.

---

## 3. Component & View Breakdown

Komponen UI dipecah menjadi unit-unit statis di dalam file `index.html` dan dirender/dikontrol oleh `app.js`:

| View Component | Deskripsi Antarmuka | Modul Logika Terkait |
|---|---|---|
| **NavBar** | Sidebar kiri (Desktop) dan Bottom Nav (Mobile). | Router Module |
| **Hero Card** | Banner Daily Verse utama beserta tombol Verse Card Generator. | VerseCard Module |
| **Streak Panel** | Info api menyala dan 7 indikator bulat kalender harian. | Streak Calculator |
| **Reader View** | Dropdown kitab/pasal, toggle bilingual, dan area teks ayat Alkitab. | Bible Reader |
| **Journal Panel** | Slide-out panel berisi text-area auto-save dan list highlights. | Journal Module |
| **Meditate Studio** | Lingkaran pernapasan bernyawa dan grid pemutar audio teduh. | Meditation Module |
| **Quiz Box** | Kotak dialog kuis interaktif dengan feedback jawaban instan. | Quiz Module |

---

## 4. Data Model (localStorage Schema)

Data disimpan dalam format JSON murni di dalam `localStorage` menggunakan kunci terstruktur:

### 4.1 Streak Log (`readingLog`)
Menyimpan array string tanggal kapan pembacaan diselesaikan:
```json
["2026-06-18", "2026-06-19"]
```

### 4.2 Highlights (`highlights`)
Menyimpan warna highlight yang dipetakan langsung ke kode koordinat ayat (Kitab-Pasal-Ayat):
```json
{
  "GEN-1-1": "yellow",
  "JOH-1-14": "lavender"
}
```

### 4.3 Journals (`journals`)
Menyimpan teks catatan refleksi berdasarkan Kitab dan Pasal:
```json
{
  "GEN-1": "Tuhan menciptakan segala sesuatunya dengan teratur dan indah.",
  "PSA-23": "Merasakan kedamaian yang mendalam lewat ilustrasi Gembala Agung."
}
```

### 4.4 Study Plan Progress (`completedReadings`)
Menyimpan data checklist penyelesaian hari pada study plan tertentu:
```json
{
  "hope-7-0": true,
  "hope-7-1": true
}
```

---

## 5. File & Module Structure

```text
student-project/
├── docs/
│   ├── 01-requirements.md
│   ├── 02-prd.md
│   ├── 03-vertical-slice-issues.md
│   ├── 04-design.md
│   ├── 05-tdd-and-testing.md
│   └── 06-reflection.md
├── src/
│   ├── index.html          # File HTML Tunggal (Struktur)
│   ├── styles.css          # Desain Sistem Glassmorphism & Kustomisasi Tema
│   ├── app.js              # State Store, SPA Router, Controller Logic
│   ├── bibleData.js        # Modul Data Alkitab Offline (JSON & Metadata)
│   ├── bibleStories.js     # Modul Data Kisah Alkitab
│   └── dailyFacts.js       # Modul Data Fakta Alkitab Harian
├── tests/
│   └── app.test.js         # Unit Test untuk State & Business Logic
├── assets/
│   └── screenshots/        # Screenshot pengujian
└── package.json            # Konfigurasi dev server & scripts
```

*Catatan: Sesuai struktur standard tugas kuliah, seluruh source code diletakkan di dalam folder `src/` dan file pengetesan di folder `tests/`.*

---

## 6. Technology Stack & Trade-offs Decision

### 6.1 Keputusan Teknologi
- **Front-end**: Vanilla HTML5, CSS3, dan JavaScript (ES6 Modules). Tanpa framework (React/Vue/Svelte) untuk meminimalkan dependency dan menjaga startup-time super instan.
- **PWA (Progressive Web App)**: Menggunakan Service Worker untuk meng-cache seluruh file statis offline dan `manifest.json` agar aplikasi dapat langsung diinstal di homescreen ponsel.
- **Testing**: Jest (atau runtime JS sederhana) untuk mengevaluasi modul logika.

### 6.2 Trade-offs (Konsekuensi & Mitigasi)
- **Trade-off: Local Storage vs Database Server**
  - *Konsekuensi*: Data jurnal, streak, dan highlights dapat hilang jika pengguna menghapus cache browser total.
  - *Alasan*: Menghindari latensi internet, login form yang mengganggu kedamaian bersaat teduh, serta overhead kompleksitas backend dalam pengerjaan 2 hari.
  - *Mitigasi*: Menjaga antarmuka se-lokal mungkin dan menyiapkan tombol ekspor backup data dalam file `.json` di masa depan.
