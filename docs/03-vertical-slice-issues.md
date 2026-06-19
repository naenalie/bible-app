# Vertical-Slice Issues — Scriptura

Dokumen ini memuat pecahan 8 isu irisan vertikal untuk pengembangan aplikasi Scriptura. Setiap isu dirancang sebagai unit pekerjaan terkecil yang memotong seluruh arsitektur sistem (UI, logika, data) agar dapat diuji secara independen.

---

# Isu 1: Bible Reader Dasar dengan Navigasi Kitab & Pasal
## Type
AFK

## What to build
Membuat pembaca Alkitab yang memungkinkan pengguna memilih kitab dan pasal, melihat ayat dalam Bahasa Indonesia (TB) dan Inggris (KJV/NIV), serta mengubah jenis font dan ukuran teks.

## User stories covered
- As a reader, I want to read the Bible in bilingual translations, so that I can study scriptures deeply.

## Acceptance criteria
- [ ] Dropdown pemilihan Kitab dan Pasal terisi secara lengkap sesuai daftar kitab.
- [ ] Teks Alkitab ditampilkan per ayat dengan terjemahan Indonesia dan Inggris (jika bilingual aktif).
- [ ] Tombol toggle bilingual berfungsi menyembunyikan/menampilkan teks terjemahan Inggris.
- [ ] Pengaturan jenis font (Cormorant, Merriweather, Playfair, Inter) dan ukuran font berfungsi seketika.

## Blocked by
None

## Testing notes
- Pilih kitab "Yohanes" pasal "1", periksa apakah ayat 1-5 muncul dalam dua bahasa.
- Matikan bilingual, periksa apakah teks Inggris tersembunyi.
- Ubah ukuran font, periksa apakah ukuran teks bertambah besar/kecil.

## AI usage notes
- AI dapat digunakan untuk merancang struktur database `bibleData.js` dan rendering DOM dasar. Verifikasi manual transisi font dan penataan layout di mobile.

---

# Isu 2: Sistem Highlighter Warna-Warni Pastel
## Type
AFK

## What to build
Membuat sistem penandaan ayat. Ketika baris ayat diklik, pop-up pilihan warna pastel muncul di atasnya. Memilih warna akan mewarnai baris ayat tersebut secara permanen.

## User stories covered
- As a reader who loves aesthetics, I want to highlight verses in cute pastel colors, so that I can bookmark my favorite golden verses.

## Acceptance criteria
- [ ] Klik pada baris ayat memicu kemunculan pop-up gelembung highlighter.
- [ ] Gelembung memuat 4 pilihan warna pastel (Kuning, Pink, Lavender, Mint) dan tombol "clear" (tanda silang).
- [ ] Memilih warna mengubah warna latar belakang baris ayat tersebut.
- [ ] Status highlight disimpan ke `localStorage` dan bertahan setelah halaman direfresh.

## Blocked by
Isu 1

## Testing notes
- Klik ayat 1 Kejadian 1, pilih warna kuning, periksa apakah baris ayat berubah kuning.
- Refresh halaman, pastikan ayat tersebut tetap berlatar belakang kuning.
- Klik kembali ayat tersebut, pilih "clear" (tanda silang), periksa apakah warna latar belakang kembali normal.

## AI usage notes
- AI dapat menyusun kode deteksi letak klik elemen dan penyimpanan JSON. Verifikasi manual posisi pop-up agar tidak keluar dari area layar mobile.

---

# Isu 3: Integrated Side-Journaling Panel & Riwayat Catatan
## Type
AFK

## What to build
Membuat panel input catatan di sebelah kanan area baca Alkitab yang menyimpan catatan refleksi pengguna secara otomatis per pasal, serta halaman khusus untuk melihat riwayat jurnal.

## User stories covered
- As a devotional reader, I want to write notes next to the verses I read, so that I can capture my spiritual reflections instantly.

## Acceptance criteria
- [ ] Panel jurnal tampil di sisi kanan layar (desktop) atau di bagian bawah (mobile).
- [ ] Area teks auto-save perubahan ke `localStorage` (menggunakan teknik debounce/delay 1 detik setelah selesai mengetik).
- [ ] Indikator status menampilkan "Menyimpan..." saat mengetik dan "Tersimpan" setelah penyimpanan berhasil.
- [ ] Halaman "Riwayat Jurnal" memuat daftar lengkap catatan yang dikelompokkan berdasarkan Kitab dan Pasal.

## Blocked by
Isu 1

## Testing notes
- Buka Kejadian pasal 1, ketik "Tuhan merancang segalanya secara teratur." di kotak jurnal.
- Tunggu 1 detik, pastikan teks "Tersimpan" muncul.
- Pindah ke tab "Bible Journal" di menu utama, verifikasi apakah catatan "Kejadian 1" muncul dalam riwayat.

## AI usage notes
- AI dapat memprogram fungsi debounce JavaScript dan pembacaan list riwayat jurnal. Verifikasi manual bahwa input jurnaling tidak menghapus catatan pasal lain saat berpindah pasal.

---

# Isu 4: Pelacak Streak Membaca Harian
## Type
AFK

## What to build
Membuat kartu pelacakan konsistensi membaca di dashboard, menampilkan jumlah hari berturut-turut pengguna bersaat teduh dan kalender mini 7 hari terakhir.

## User stories covered
- As a habit builder, I want to track my daily reading streak, so that I stay motivated to read the Bible every day.

## Acceptance criteria
- [ ] Dashboard menampilkan ikon api dan angka hari streak (misal: "3 Hari").
- [ ] Menampilkan kalender visual 7 hari terakhir dengan lingkaran tercentang untuk hari yang telah diselesaikan.
- [ ] Streak bertambah saat pengguna menekan tombol "Selesai Membaca" di halaman pembaca.
- [ ] Streak tetap berlanjut jika dibaca di hari yang sama atau hari berikutnya, dan reset ke 0 jika terlewat lebih dari 1 hari.

## Blocked by
Isu 1

## Testing notes
- Manipulasi data log membaca di `localStorage` untuk mensimulasikan pembacaan kemarin.
- Klik "Selesai Membaca" hari ini, periksa apakah streak naik menjadi 2 Hari.
- Periksa kalender mini apakah hari kemarin dan hari ini telah tercentang.

## AI usage notes
- AI dapat memformulasikan logika penanggalan JavaScript (UTC/Local date comparisons). Verifikasi secara manual penanganan zona waktu lokal agar streak tidak mendadak reset di pagi hari.

---

# Isu 5: Mode Meditasi dengan Panduan Napas dan Musik Teduh
## Type
AFK

## What to build
Membuat halaman meditasi dengan panduan pernapasan lingkaran visual yang membesar/mengecil secara dinamis dan pemutar audio latar belakang yang menenangkan.

## User stories covered
- As a busy student, I want to meditate with breathing exercises and peaceful sounds, so that I can quiet my mind before reading the Bible.

## Acceptance criteria
- [ ] Lingkaran meditasi bernapas membesar selama 4 detik (Tarik Napas), diam selama 4 detik (Tahan), dan mengecil selama 4 detik (Hembuskan).
- [ ] Terdapat 3 tombol pilihan audio latar belakang (Hujan, Piano, Ombak).
- [ ] Menekan tombol audio memutar musik secara berulang (*loop*). Menekan kembali mematikan musik.
- [ ] Suara ombak dihasilkan secara lokal menggunakan Web Audio API agar tetap berfungsi penuh dalam kondisi offline.

## Blocked by
None

## Testing notes
- Buka tab Meditasi, periksa apakah teks di dalam lingkaran berubah seiring perubahan animasi.
- Klik tombol audio "Hujan", periksa suara keluar. Klik tombol yang sama lagi, pastikan suara mati.

## AI usage notes
- AI dapat membantu menghasilkan kode Web Audio API untuk suara ombak sintetis. Verifikasi manual transisi animasi CSS agar terasa halus (*smooth*).

---

# Isu 6: Sistem Kuis Harian Spaced-Repetition
## Type
HITL

## What to build
Membuat halaman kuis trivia harian 3 pertanyaan. Pertanyaan yang diajukan disesuaikan berdasarkan pasal yang dibaca oleh pengguna kemarin. Jika hari kemarin kosong, tampilkan trivia Alkitab umum.

## User stories covered
- As a reader who wants to remember scriptures, I want to review what I read yesterday through a short quiz, so that I can solidify my learning.

## Acceptance criteria
- [ ] Halaman kuis secara cerdas mendeteksi riwayat pasal yang dibaca pada tanggal kemarin.
- [ ] Menampilkan 3 pertanyaan pilihan ganda yang relevan dengan pasal kemarin (jika didukung offline) atau memuat pertanyaan umum jika tidak ada riwayat.
- [ ] Menampilkan feedback warna hijau (benar) dan merah (salah) sesaat setelah opsi ditekan.
- [ ] Menampilkan persentase skor akhir di akhir kuis.

## Blocked by
Isu 1, Isu 4

## Testing notes
- Selesaikan membaca "Mazmur 23". Ubah tanggal sistem komputer ke esok hari.
- Masuk ke tab Quiz, verifikasi bahwa pertanyaan yang muncul adalah seputar Mazmur 23 (gembala, gada/tongkat, cangkir melimpah).
- Jawab kuis dan verifikasi tampilan feedback serta skor akhir.

## AI usage notes
- **HITL Decision Required**: Pengguna dan pengembang harus menyepakati batasan bank soal. Karena aplikasi offline, kami menyusun bank soal statis untuk pasal-pasal kunci (Kejadian 1, Mazmur 23, Yohanes 1, Amsal 3) dan bank soal umum sebagai fallback.

---

# Isu 7: Rencana Bacaan bertema (Study Plans) & Tracker
## Type
AFK

## What to build
Membuat halaman Study Plans yang menampilkan daftar rencana belajar bertema (misal: "7 Days of Hope"). Memilih rencana akan mengaktifkannya di dashboard dan melacak progres hari yang dicentang.

## User stories covered
- As a structured learner, I want to follow a themed reading plan, so that I know where to start and can track my progress.

## Acceptance criteria
- [ ] Menampilkan daftar kartu rencana bacaan beserta deskripsi singkatnya.
- [ ] Klik "Mulai Rencana" menetapkannya sebagai rencana aktif di Dashboard.
- [ ] Di dalam detail rencana, menampilkan daftar hari, judul harian, referensi pasal, checkbox selesai, dan tombol "Baca Sekarang".
- [ ] Progress bar di dashboard dan detail rencana terupdate otomatis berdasarkan persentase hari yang dicentang selesai.

## Blocked by
Isu 1

## Testing notes
- Buka detail rencana "7 Days of Hope", centang hari 1 dan 2.
- Periksa apakah progress bar meningkat menjadi 28% (2 dari 7 hari).
- Kembali ke Dashboard, pastikan kartu rencana aktif menampilkan judul "7 Days of Hope" dengan progress 28%.

## AI usage notes
- AI dapat merancang layout grid plans dan logika persentase progress. Verifikasi manual keselarasan data progress bar antara halaman dashboard dan detail rencana.

---

# Isu 8: Rangkuman Sesi Membaca & Verse Card PNG Generator
## Type
AFK

## What to build
Membuat modal rangkuman yang muncul setelah menyelesaikan pembacaan pasal, serta tombol ekspor ayat harian menjadi gambar estetik (verse card) menggunakan elemen `<canvas>`.

## User stories covered
- As a reflective reader, I want to see a summary of what I read and share beautiful verse cards, so that I can consolidate my thoughts and inspire others.

## Acceptance criteria
- [ ] Klik tombol "Selesai Membaca" di reader memunculkan modal dengan ringkasan pasal.
- [ ] Klik tombol "Verse Card" di dashboard membuka preview kartu ayat.
- [ ] Menyediakan 3 gaya latar belakang gradasi warna untuk kartu ayat.
- [ ] Menekan tombol "Unduh Gambar" membuat canvas, menggambar teks ayat & referensi, dan mendownloadnya sebagai file PNG secara lokal.

## Blocked by
Isu 1

## Testing notes
- Buka Kejadian 1, klik "Selesai Membaca", periksa apakah pop-up rangkuman penciptaan muncul.
- Di dashboard, klik "Verse Card", ganti gaya gradasi ke pilihan kedua, lalu klik "Unduh Gambar". Pastikan file PNG terunduh dan teks terpusat rapi di gambar.

## AI usage notes
- AI dapat merancang kalkulasi pemenggalan kata (*word wrapping*) pada HTML5 Canvas. Pengembang harus memverifikasi secara manual bahwa gambar PNG yang dihasilkan memiliki resolusi yang tajam dan teks tidak terpotong di berbagai browser.
