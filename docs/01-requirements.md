# Requirements Clarification — Scriptura

**Date:** June 19, 2026  
**Author:** Gwendeline (naenalie)  
**Project:** Scriptura — Bible Reading Web & Mobile App

---

## 1. Product Idea
Scriptura adalah aplikasi membaca Alkitab (Bible reader) dan jurnal devotional harian berbasis web dan mobile (PWA) yang dirancang secara personal dan estetik untuk membantu pengguna konsisten bersaat teduh, merenungkan firman Tuhan, dan melacak pertumbuhan spiritual mereka.

## 2. Problem Statement
Target pengguna (mahasiswi Adventist) sering mengalami hambatan untuk konsisten membaca Alkitab harian karena beberapa kendala utama:
- **Overwhelmed**: 66 kitab terasa terlalu tebal dan membingungkan untuk menentukan titik mulai.
- **Bosan & Mengantuk**: Tampilan Alkitab tradisional berupa teks panjang tanpa konteks/warna sering kali membuat jenuh dan mengantuk.
- **Kurang Reflektif**: Membaca cepat tanpa mencatat membuat renungan mudah terlupakan.
- **Kehilangan Motivasi**: Tidak adanya pelacakan konsistensi (*streak*) membuat kebiasaan membaca sulit terbentuk secara disiplin.

## 3. Target Users
- **Nama**: Gwendeline (naenalie)
- **Usia**: 19–21 tahun
- **Profil**: Mahasiswi teologi/umum di lingkungan kampus Adventist, aktif menggunakan smartphone, menyukai desain minimalis yang estetik (*mauve/dusty rose accent*) serta terstruktur.

## 4. User Goals
- Memiliki entry point bersaat teduh yang terarah setiap hari melalui ayat harian terpilih (*Daily Verse*) dan rencana bacaan (*Study Plan*).
- Menulis jurnal/refleksi dengan nyaman secara langsung bersebelahan dengan teks Alkitab saat membaca.
- Menandai ayat-ayat bermakna menggunakan warna-warna highlighter pastel yang lucu.
- Mengingat kembali apa yang dibaca kemarin melalui kuis tanya jawab ringan harian (*spaced repetition*).
- Membangun kebiasaan disiplin melalui pelacakan *Reading Streak* harian.

## 5. Functional Requirements
- **Bible Reader**: Navigasi kitab/pasal yang mulus, tampilan teks bilingual (Bahasa Indonesia TB & Inggris KJV/NIV), kustomisasi font (serif/sans-serif), dan pengaturan ukuran teks.
- **Cute Highlighter**: Menandai ayat Alkitab dengan 4 warna pastel lucu (Yellow, Pink, Lavender, Mint) dan menyimpannya secara permanen.
- **Integrated Side-Journaling**: Panel catatan/refleksi di sebelah kanan teks Alkitab (atau meluncur dari bawah pada mobile) yang otomatis menyimpan ketikan pengguna per pasal.
- **Journal History**: Halaman khusus untuk meninjau kembali seluruh riwayat jurnaling yang pernah ditulis.
- **Study Plans**: Memilih rencana bacaan terstruktur bertema dengan progress bar interaktif.
- **Streak Tracker**: Ikon api penanda streak harian dan kalender visual 7 hari terakhir yang tercentang otomatis setelah menyelesaikan pembacaan pasal.
- **Meditate Mode**: Halaman saat teduh dengan panduan pernapasan visual (animasi Tarik-Tahan-Hembus) disertai pilihan audio latar belakang yang menenangkan.
- **Bible Stories (Recent Collections)**: Galeri cerita-cerita Alkitab klasik yang diringkas dengan visualisasi sederhana berbentuk panel card.
- **Daily Bible Facts**: Menampilkan fakta unik seputar Alkitab di dashboard yang berganti secara dinamis setiap harinya.
- **Daily Quiz**: Pertanyaan trivia 3 nomor setiap hari baru berdasarkan pasal yang dibaca hari sebelumnya untuk memperkuat memori.
- **Post-Reading Summary**: Pop-up ringkasan poin penting dari pasal setelah pengguna menekan tombol "Selesai Membaca".
- **Verse Card Generator**: Mengekspor ayat harian pilihan menjadi gambar berlatar belakang gradasi estetik untuk dibagikan ke media sosial.

## 6. Non-Functional Requirements
- **Offline-First**: Aplikasi dapat diakses secara penuh tanpa koneksi internet (menggunakan data Alkitab lokal & localStorage).
- **Glassmorphic UI**: Desain modern menggunakan visual kaca transparan (*slate-mauve*), skema warna gelap default (ramah mata di malam hari), dan micro-animations.
- **Responsive Layout**: Menyesuaikan tampilan dengan sempurna baik di laptop/desktop maupun di layar ponsel cerdas.
- **PWA (Progressive Web App)**: Dapat "diinstal" langsung dari browser ke HP tanpa melalui App Store/Play Store.

## 7. Assumptions
- Pengguna bersaat teduh di malam hari sehingga mode gelap (*dark mode*) menjadi tampilan utama.
- Penyimpanan lokal browser (`localStorage`) aman dan cukup untuk menampung riwayat jurnal, highlight, dan log streak selama penggunaan personal.

## 8. Constraints
- Proyek harus dapat diselesaikan dan dideploy dalam durasi **2 hari** menggunakan HTML/CSS/JS murni (tanpa setup database eksternal yang rumit).
- Teks Alkitab offline difokuskan pada kitab-kitab penting sebagai contoh representatif (Kejadian, Yohanes, Matius, Mazmur, Amsal) guna menghemat ukuran bundel offline.

## 9. Open Questions
- Apakah perlu diintegrasikan tombol unduh backup data localStorage dalam format JSON jika pengguna ingin memindahkan datanya ke perangkat lain? (Ditetapkan sebagai fitur opsional di masa mendatang).
