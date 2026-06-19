export class BibleReaderCore {
  constructor(offlineBibleData, fetchApiAdapter) {
    this.offlineBibleData = offlineBibleData;
    this.fetchApiAdapter = fetchApiAdapter;
  }

  async loadChapter(bookId, chapterNum) {
    const book = this.offlineBibleData[bookId];
    if (!book) return null;
    
    let chapterData = book.chapters.find(c => c.chapter === chapterNum);
    
    if (!chapterData) {
      // Jika tidak ada offline, panggil API adapter
      const fetchedVerses = await this.fetchApiAdapter(bookId, chapterNum);
      if (!fetchedVerses) return null;

      chapterData = {
        chapter: chapterNum,
        verses: fetchedVerses
      };

      // Simpan hasil ke cache offline
      book.chapters.push(chapterData);
    }

    return {
      bookId,
      chapterNum,
      verses: chapterData.verses
    };
  }
}
