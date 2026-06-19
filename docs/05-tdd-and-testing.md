# TDD and Testing Report

Laporan ini mendokumentasikan proses pengembangan berbasis pengujian (Test-Driven Development) menggunakan alur Red-Green-Refactor untuk dua isu vertical-slice utama di Scriptura.

---

## 1. Laporan TDD: Isu 1 (Bible Reader Dasar)

### Issue tested
[Isu #1: Bible Reader Dasar dengan Navigasi Kitab & Pasal](https://github.com/naenalie/bible-app/issues/1)

### Behavior under test
- Mengambil teks ayat Alkitab dari data lokal offline (Kejadian 1) tanpa menghubungi API eksternal.
- Mengambil teks ayat dari API eksternal apabila data belum tersedia offline, kemudian menyimpannya ke dalam cache lokal agar dapat diakses secara offline nantinya.

### Public interface
Kelas `BibleReaderCore` di dalam [src/reader.js](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/src/reader.js) dengan metode:
```javascript
export class BibleReaderCore {
  constructor(offlineBibleData, fetchApiAdapter) { ... }
  async loadChapter(bookId, chapterNum) { ... }
}
```

### RED
- **Test 1**: `Should successfully retrieve a local chapter from offline datasets`
  - *Failing result*: `ERR_MODULE_NOT_FOUND` karena file [src/reader.js](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/src/reader.js) belum dibuat.
- **Test 2**: `Should fetch from API and cache if the chapter is not available offline`
  - *Failing result*: `AssertionError [ERR_ASSERTION]: API online harus dipanggil`. Gagal karena implementasi minimal awal belum memanggil API adapter ketika data offline kosong.

### GREEN
- **Minimal Implementation**:
  - Membuat kelas `BibleReaderCore` yang memeriksa keberadaan data di objek `offlineBibleData`. Jika tidak ditemukan, ia akan memanggil `fetchApiAdapter` secara asinkron, menyimpan hasilnya ke cache `offlineBibleData`, lalu mengembalikannya.
- **Passing result**:
  ```text
  ✔ Should successfully retrieve a local chapter from offline datasets (1.21ms)
  ✔ Should fetch from API and cache if the chapter is not available offline (0.39ms)
  ```

### REFACTOR
- Memastikan pemisahan yang bersih antara data lokal dan logika pemuatan. API adapter diinjeksikan secara penuh agar modul tidak bergantung pada fungsi `fetch` bawaan browser secara langsung, membuat modul ini 100% dapat diuji di lingkungan server Node.js.

### Final result
**PASS**

---

## 2. Laporan TDD: Isu 4 (Pelacak Streak Membaca Harian)

### Issue tested
[Isu #4: Pelacak Streak Membaca Harian](https://github.com/naenalie/bible-app/issues/4)

### Behavior under test
- Menghitung jumlah hari berturut-turut pengguna membaca Alkitab berdasarkan daftar tanggal pembacaan (`readingLogDates`).
- Mengembalikan `0` jika log kosong.
- Mengembalikan `1` jika pengguna hanya membaca hari ini.
- Mengembalikan `2` jika membaca hari ini dan kemarin.
- Menjaga streak tetap aktif (misal `2` hari) jika kemarin membaca tetapi hari ini belum sempat menekan selesai.
- Reset streak menjadi `0` jika aktivitas terakhir lebih lambat dari kemarin (misal 2 hari lalu).

### Public interface
Kelas `StreakCalculator` di dalam [src/streak.js](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/src/streak.js) dengan metode:
```javascript
export class StreakCalculator {
  calculateStreak(readingLogDates) { ... }
}
```

### RED
- *Failing result*: `ERR_MODULE_NOT_FOUND` karena file [src/streak.js](file:///C:/Users/User/.gemini/antigravity/scratch/scriptura/src/streak.js) belum dibuat di dalam folder `src/`.

### GREEN
- **Minimal Implementation**:
  - Mengimplementasikan pencarian mundur hari-demi-hari dari tanggal hari ini menggunakan kelas `Date` JavaScript, mencocokkannya ke dalam `Set` tanggal untuk performa lookup \(O(1)\).
- **Passing result**:
  ```text
  ✔ Should return 0 for an empty reading log (0.79ms)
  ✔ Should return 1 if the user only read today (1.69ms)
  ✔ Should return 2 if the user read yesterday and today (0.31ms)
  ✔ Should return 2 if the user read yesterday and day before, but not today yet (0.21ms)
  ✔ Should return 0 if the user last read 2 days ago (streak broke) (0.33ms)
  ```

### REFACTOR
- Menggunakan konversi format tanggal lokal `YYYY-MM-DD` secara konsisten daripada pembandingan milidetik mentah untuk menghindari bug akibat transisi zona waktu atau pergantian jam.

### Final result
**PASS**
