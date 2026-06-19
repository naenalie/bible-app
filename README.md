# ✦ Scriptura — Bible Devotional PWA

Scriptura adalah aplikasi membaca Alkitab (bilingual) dan jurnal refleksi bersaat teduh harian berbentuk Progressive Web App (PWA) yang estetik, personal, dan *offline-first*. Aplikasi ini dirancang sebagai pendamping spiritual untuk membantu pengguna konsisten membaca firman Tuhan tanpa kejenuhan.

---

## 🚀 Fitur Utama
1. **Bilingual Bible Reader**: Membaca Alkitab secara berdampingan (Indonesia TB & Inggris KJV/NIV) dilengkapi kustomisasi ukuran teks dan 4 pilihan jenis font elegan.
2. **Cute Highlighters**: Tandai baris ayat Alkitab dengan 4 warna pastel lucu (Kuning, Pink, Lavender, Mint) yang tersimpan secara persisten di browser.
3. **Integrated Side-Journaling**: Tulis catatan refleksi pribadi langsung di sebelah kanan teks Alkitab dengan fitur auto-save per pasal.
4. **Devotional Dashboard**: Panel kartu modern yang memuat *Daily Verse*, *Streak Counter* (ikon api dan kalender mini 7 hari terakhir), *Active Study Plan*, dan *Fact of the Day* (fakta Alkitab harian).
5. **Saat Teduh Meditasi**: Sesi relaksasi visual dengan panduan bernapas (12 detik per siklus) dan audio latar alam (hujan, piano, ombak sintetis offline).
6. **Spaced-Repetition Quiz**: Kuis trivia harian 3 nomor yang dihasilkan secara dinamis berdasarkan pasal yang Anda baca kemarin untuk memperkuat ingatan.
7. **Post-Reading Summary & Verse Card**: Ringkasan pasal instan setelah selesai membaca dan ekspor ayat menjadi kartu gambar estetik (file PNG).

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Glassmorphism styling), Vanilla JavaScript (ES6 Modules)
- **Local Storage**: Persistensi data user (jurnal, highlight, plans, logs) secara offline
- **Audio synthesis**: Web Audio API (untuk efek ombak relaksasi offline)
- **PWA**: Service Worker (`sw.js`) & `manifest.json` untuk dukungan instalasi mobile/desktop
- **Testing**: Node.js Native Test Runner (`node --test`)

---

## ⚙️ Setup & Panduan Menjalankan

### Persyaratan Sistem
- Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (Versi >= 18.0).

### 1. Kloning Repositori
```bash
git clone https://github.com/naenalie/bible-app.git
cd bible-app
```

### 2. Jalankan Server Dev Lokal
Untuk menjalankan aplikasi secara lokal dan menguji fitur PWA, Anda dapat menyalakan server HTTP lokal bawaan script package.json:
```bash
npm run dev
```
Setelah berjalan, buka browser Anda dan akses alamat:
`http://localhost:3000`

### 3. Cara Menginstal PWA (Mobile / Desktop)
- **di Google Chrome (Desktop)**: Klik ikon unduh/instal di sisi kanan bilah alamat (address bar).
- **di Safari (iOS)**: Buka alamat di Safari, tekan tombol *Share*, lalu pilih *Add to Home Screen*.
- **di Chrome (Android)**: Tekan menu titik tiga, lalu pilih *Install App* / *Tambahkan ke Layar Utama*.

### 4. Menjalankan Unit Pengujian (Unit Tests)
Kami menggunakan test runner bawaan Node.js untuk mengevaluasi fungsionalitas logika bisnis secara offline:
```bash
npm test
```

---

## ⚠️ Batasan Aplikasi (Known Limitations)
- **Penyimpanan Lokal**: Dikarenakan menggunakan `localStorage` browser, seluruh data catatan jurnal, highlight, dan streak akan terhapus jika cache peramban dibersihkan secara total oleh pengguna.
- **Data Alkitab Offline**: Data Alkitab offline terbatas pada 5 kitab kunci (Kejadian, Yohanes, Matius, Mazmur, Amsal). Kitab selain itu memerlukan koneksi internet untuk mengunduh ayat dari server pada pembacaan pertama kali (setelahnya akan ter-cache otomatis secara offline).
