# Product Requirements Document (PRD) — Scriptura

**Version:** 1.0  
**Date:** June 2026  
**Author:** Gwendeline (naenalie)

---

## 1. Product Overview
Scriptura adalah aplikasi devotional harian berbasis Progressive Web App (PWA) yang menggabungkan pembaca Alkitab bilingual, pencatatan jurnal interaktif, penanda highlight warna-warni pastel, pelacak streak kebiasaan membaca, mode meditasi, kuis trivia harian, serta ringkasan bacaan instan. Didesain dengan estetika modern dark-slate dan aksen mauve untuk menciptakan suasana saat teduh yang intim dan menenangkan.

---

## 2. Goals
- Membantu mahasiswi Kristen konsisten membaca Alkitab setiap hari.
- Mengurangi hambatan rasa bosan atau kantuk melalui interface yang visual-engaging dan kustomisasi teks.
- Membantu pemahaman dan refleksi firman Tuhan melalui journaling terintegrasi berdampingan dengan ayat Alkitab.
- Melacak pertumbuhan kedisiplinan bersaat teduh secara visual.

---

## 3. Non-Goals
- Aplikasi tidak ditujukan untuk menjadi media sosial multi-user (tidak ada fitur follow, comment, feed publik, atau login akun di v1.0).
- Aplikasi tidak memuat seluruh 66 kitab secara offline penuh untuk menghindari kendala ukuran asset (menggunakan strategi hybrid: 5 kitab inti offline penuh, kitab lainnya membutuhkan koneksi online).

---

## 4. Target Users
- **Pengguna Primer**: Mahasiswi Kristen (khususnya dilingkungan universitas/institusi Adventist) yang ingin meningkatkan disiplin hidup bersaat teduh.

---

## 5. User Stories

### US-01: Bible Reading & Aesthetics
Sebagai pembaca, aku ingin membaca Alkitab dalam terjemahan Indonesia dan Inggris secara berdampingan, serta mengganti jenis font dan ukuran teks, supaya aku bisa memahami ayat dengan lebih mendalam dan nyaman bagi mataku.

### US-02: Cute Highlight System
Sebagai pembaca yang menyukai keteraturan visual, aku ingin menandai ayat-ayat penting dengan pilihan warna pastel (kuning, merah muda, lavender, mint), supaya aku bisa dengan mudah melihat kembali ayat emas favoritku.

### US-03: Side-Journaling & History
Sebagai orang yang ingin bertumbuh secara rohani, aku ingin menulis catatan refleksi di sebelah ayat yang sedang kubaca dan melihat riwayat tulisan lamaku, supaya aku tidak lupa berkat rohani yang kudapatkan hari ini.

### US-04: Habit Streak & Progress
Sebagai orang yang ingin membangun kebiasaan baru, aku ingin melacak berapa hari berturut-turut aku membaca Alkitab melalui indikator streak (api) dan progres belajar, supaya aku termotivasi untuk terus konsisten.

### US-05: Meditation Mode
Sebagai orang yang sering cemas atau sibuk, aku ingin memiliki mode meditasi dengan panduan pernapasan dan musik latar teduh, supaya aku bisa menenangkan pikiran sebelum mulai berdoa atau membaca Alkitab.

### US-06: Facts, Quiz & Summaries
Sebagai pembaca yang ingin mengingat apa yang dibaca, aku ingin mendapatkan fakta menarik setiap hari, kuis ulasan bacaan di hari berikutnya, serta ringkasan setelah selesai membaca pasal, supaya pembacaan Alkitabku lebih interaktif dan tertanam di pikiran.

---

## 6. Core Features & Acceptance Criteria

### 6.1 Bible Reader
- **Deskripsi**: Tampilan ayat per kitab & pasal dengan layout bersih.
- **Kriteria Penerimaan**:
  - Terdapat dropdown navigasi Kitab & Pasal.
  - Tombol toggle Bilingual menampilkan/menyembunyikan terjemahan Inggris di bawah terjemahan Indonesia per ayat.
  - Dropdown font-family (Cormorant Garamond, Merriweather, Playfair, Inter) dan tombol pengubah ukuran font (+/-) berfungsi seketika.

### 6.2 Cute Highlighter
- **Deskripsi**: Penandaan baris ayat Alkitab menggunakan palet warna pastel.
- **Kriteria Penerimaan**:
  - Klik pada baris ayat memunculkan pop-up menu highlighter di atas ayat tersebut.
  - Memilih warna (Yellow, Pink, Lavender, Mint) mengubah warna latar belakang baris ayat tersebut.
  - Pilihan warna tersimpan di localStorage dan tetap muncul saat halaman direfresh.
  - Terdapat tombol hapus highlight (tanda silang) untuk membersihkan penanda.

### 6.3 Side-Journaling & History
- **Deskripsi**: Kotak input catatan di samping kanan teks Alkitab dan riwayat catatan.
- **Kriteria Penerimaan**:
  - Area input jurnaling otomatis mendeteksi pasal yang sedang dibuka dan menyimpan catatan secara berkala (auto-save ke localStorage).
  - Menampilkan indikator "Menyimpan..." dan "Tersimpan".
  - Halaman "Riwayat Jurnal" memuat daftar semua catatan yang diarsipkan lengkap dengan referensi kitab & pasal.

### 6.4 Streak & Study Plans
- **Deskripsi**: Modul pelacak streak membaca dan progress plan.
- **Kriteria Penerimaan**:
  - Menyelesaikan pembacaan pasal (klik "Selesai Membaca") mencatat tanggal hari ini di log pembacaan.
  - Ikon streak (api) di dashboard menampilkan jumlah hari berturut-turut yang dihitung secara dinamis.
  - Menampilkan baris kalender 7 hari terakhir dengan centang hijau pada hari-hari pembacaan yang sukses.
  - Rencana bacaan (*Study Plan*) menampilkan list hari bacaan beserta checkbox penyelesaian dan progress bar persentase.

### 6.5 Meditate Mode
- **Deskripsi**: Sesi pernapasan terpandu dengan iringan suara alam.
- **Kriteria Penerimaan**:
  - Lingkaran pernapasan membesar dan mengecil secara halus mengikuti ritme Tarik Napas (4s), Tahan (4s), Hembuskan (4s).
  - Tombol ambient audio (Hujan, Piano, Ombak) dapat menyala dan memutar klip suara secara berulang (*loop*).

### 6.6 Facts, Quiz, and Summaries
- **Deskripsi**: Fitur interaktivitas harian dan review.
- **Kriteria Penerimaan**:
  - Kotak fakta menarik (*Fact of the Day*) menampilkan teks fakta baru berdasarkan tanggal hari ini.
  - Menekan tombol "Selesai Membaca" memicu munculnya modal rangkuman pasal (*Summary*) yang relevan.
  - Tab "Daily Quiz" menampilkan kuis pilihan ganda 3 nomor berdasarkan pasal yang dibaca hari kemarin (atau pertanyaan Alkitab umum jika hari kemarin kosong).

---

## 7. Success Criteria
- Aplikasi 100% fungsional dalam kondisi offline setelah instalasi PWA.
- Semua data pengguna (jurnal, highlight, streak, progress rencana) bertahan secara konsisten setelah browser ditutup/direfresh.
- Kecepatan pemuatan halaman di bawah 1.5 detik.

---

## 8. Risks & Mitigation
- **Risks**: Pengguna membersihkan cache browser secara total sehingga data `localStorage` terhapus.
- **Mitigation**: Menampilkan peringatan halus di footer/settings tentang penyimpanan berbasis browser lokal, serta merencanakan fitur export/import backup data di versi selanjutnya.

---

## 9. Out-of-Scope Items
- Sinkronisasi data cloud / database server.
- Fitur audio alkitab (*text-to-speech*).
- Login akun media sosial.
