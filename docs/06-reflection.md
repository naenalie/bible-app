# AI Usage Reflection — Scriptura

Refleksi ini mencakup evaluasi jujur dan terperinci mengenai penggunaan asisten AI (Claude/Antigravity) di setiap tahap pengembangan produk Scriptura.

---

## 1. Bagaimana Anda menggunakan AI selama Klarifikasi Persyaratan (Requirements Clarification)?
AI bertindak sebagai pewawancara teknis (*strict interviewer*) yang menanyakan satu per satu pertanyaan kritis mengenai ide produk dasar saya (dari file `Scriptura_GrillMe_v1.0.md` asli). AI membantu menggali pain point utama saya—yaitu rasa mengantuk dan bosan saat membaca Alkitab—dan mengarahkan ide tersebut menjadi solusi fungsional yang konkret seperti *Verse Card*, rotasi fakta menarik harian, kuis trivia spaced-repetition, dan fitur meditasi pernapasan. Hasilnya dirapikan secara terstruktur di [docs/01-requirements.md](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/docs/01-requirements.md).

## 2. Bagaimana Anda menggunakan AI selama Pembuatan PRD (PRD Creation)?
Saya meminta AI untuk mensintesis poin-poin klarifikasi persyaratan menjadi dokumen Product Requirements Document (PRD) formal. AI merancang bagian kriteria penerimaan (*acceptance criteria*) secara mendalam untuk setiap fitur utama dan memisahkan dengan tegas apa yang masuk dalam cakupan proyek (*goals*) dan apa yang berada di luar cakupan (*non-goals*) seperti integrasi database online berat di versi awal, sehingga scope proyek tetap realistis untuk dua hari. Hasilnya disimpan di [docs/02-prd.md](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/docs/02-prd.md).

## 3. Bagaimana Anda menggunakan AI selama Pemecahan Isu (Issue Breakdown)?
AI membantu memecah fungsionalitas PRD menjadi 8 isu irisan vertikal (*vertical-slice issues*). AI dengan sangat baik membedakan mana tugas yang bertipe **AFK** (dapat dikerjakan langsung) dan **HITL** (membutuhkan keputusan produk/manusia). Pembagian ini membantu saya memahami ketergantungan antar-fitur (misalnya, panel jurnalan memblokir/tergantung pada kesiapan modul reader dasar). Hasilnya disimpan di [docs/03-vertical-slice-issues.md](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/docs/03-vertical-slice-issues.md).

## 4. Bagaimana Anda menggunakan AI selama Pengkodean (Coding)?
AI membantu menyusun file logika inti (`src/app.js`), styling UI (`src/styles.css`), serta pembuatan service worker (`src/sw.js`) dan manifes PWA agar aplikasi dapat diinstal. AI juga membantu menyusun kode sintetis audio ombak menggunakan Web Audio API agar meditasi bisa memutar suara menenangkan secara offline penuh. Saya meninjau kembali kode asinkron untuk penarikan API online Alkitab agar tidak terjadi konflik state saat pengguna berpindah pasal dengan cepat.

## 5. Bagaimana Anda menggunakan AI selama Pengujian (Testing)?
AI bertindak sebagai pelatih TDD. AI membantu saya merancang antarmuka publik kelas `BibleReaderCore` dan `StreakCalculator` serta membimbing saya menulis unit test di `tests/app.test.js` menggunakan *Node.js Native Test Runner*. Kami melalui siklus menulis tes yang gagal terlebih dahulu (RED), membuat implementasi minimal (GREEN), lalu merapikan kode (REFACTOR). Laporan lengkap terdokumentasi di [docs/05-tdd-and-testing.md](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/docs/05-tdd-and-testing.md).

## 6. Di mana AI membuat kesalahan atau memberikan saran yang lemah?
AI sempat menulis logika pengambilan API Alkitab online yang langsung digabungkan di dalam komponen UI `app.js` tanpa pemisahan modul. Ini membuat kode sangat sulit diuji (*untestable*) di lingkungan pengujian non-browser (Node.js) karena tidak adanya objek DOM. 
*Koreksi*: Saya menyuruh AI melakukan refaktor menggunakan prinsip *Codebase Design* dengan memisahkan logika data menjadi deep modules (`src/reader.js` dan `src/streak.js`) yang menerima dependensi (*dependency injection*) sehingga bisa diuji dengan mock adapter di server Node.js.

## 7. Apa yang Anda verifikasi secara manual?
Saya memverifikasi antarmuka visual di browser Google Chrome menggunakan Chrome DevTools:
- Memastikan tampilan responsif pada viewport mobile (mode iPhone SE) membungkus menu sidebar menjadi bottom nav.
- Menguji pengoperasian highlighter warna pastel, memastikan penandaan tersimpan di localStorage secara persisten.
- Membuka panel Application -> Service Workers untuk memastikan registrasi PWA sukses dan cache offline berfungsi.
- Memeriksa Console tab untuk memastikan tidak ada warning/error runtime JS.

## 8. Keputusan rekayasa perangkat lunak apa yang paling Anda yakini?
Keputusan memisahkan logika streak kalkulator (`StreakCalculator`) dan database reader (`BibleReaderCore`) menjadi modul tersendiri dengan *dependency injection* untuk adapter penarikan data. Ini membuat kode inti bebas dari ketergantungan langsung terhadap server/browser API, sehingga sangat modular, aman dari perubahan API pihak ketiga di masa depan, dan mudah diuji secara unit test.

## 9. Apa yang akan Anda tingkatkan jika memiliki lebih banyak waktu?
Saya ingin mengimplementasikan fitur ekspor/impor seluruh data pengguna (highlights, catatan jurnal, riwayat kuis, streak) dalam bentuk file enkripsi `.json` agar pengguna dapat membackup data mereka secara aman tanpa takut kehilangan data jika cache browser dibersihkan secara tidak sengaja.
