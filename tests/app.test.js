import { describe, test } from 'node:test';
import assert from 'node:assert';
import { BibleReaderCore } from '../src/reader.js';
import { StreakCalculator } from '../src/streak.js';

describe('BibleReaderCore - Isu 1', () => {
  test('Should successfully retrieve a local chapter from offline datasets', async () => {
    // Arrange
    const mockOfflineData = {
      "GEN": {
        name: "Kejadian",
        nameEn: "Genesis",
        chapters: [
          {
            chapter: 1,
            verses: [
              { verse: 1, tb: "Pada mulanya...", en: "In the beginning..." }
            ]
          }
        ]
      }
    };
    
    // Jika data offline ada, API online TIDAK boleh dipanggil
    const mockFetchApi = async () => { 
      throw new Error("API online tidak boleh dipanggil untuk data offline"); 
    };
    
    const reader = new BibleReaderCore(mockOfflineData, mockFetchApi);

    // Act
    const result = await reader.loadChapter("GEN", 1);

    // Assert
    assert.strictEqual(result.bookId, "GEN");
    assert.strictEqual(result.chapterNum, 1);
    assert.strictEqual(result.verses.length, 1);
    assert.strictEqual(result.verses[0].tb, "Pada mulanya...");
  });

  test('Should fetch from API and cache if the chapter is not available offline', async () => {
    // Arrange
    const mockOfflineData = {
      "GEN": {
        name: "Kejadian",
        nameEn: "Genesis",
        chapters: [] // Tidak ada chapter secara offline!
      }
    };
    
    // Mock API mengembalikan data ayat
    let apiCalled = false;
    const mockFetchApi = async (bookId, chapterNum) => {
      apiCalled = true;
      return [
        { verse: 1, tb: "Bumi belum berbentuk...", en: "Now the earth was formless..." }
      ];
    };
    
    const reader = new BibleReaderCore(mockOfflineData, mockFetchApi);

    // Act
    const result = await reader.loadChapter("GEN", 2);

    // Assert
    assert.strictEqual(apiCalled, true, "API online harus dipanggil");
    assert.strictEqual(result.bookId, "GEN");
    assert.strictEqual(result.chapterNum, 2);
    assert.strictEqual(result.verses.length, 1);
    assert.strictEqual(result.verses[0].tb, "Bumi belum berbentuk...");
    
    // Pastikan data sekarang di-cache di mockOfflineData
    assert.strictEqual(mockOfflineData["GEN"].chapters.length, 1, "Hasil harus masuk cache offline");
    assert.strictEqual(mockOfflineData["GEN"].chapters[0].chapter, 2);
  });
});

describe('StreakCalculator - Isu 4', () => {
  test('Should return 0 for an empty reading log', () => {
    const calc = new StreakCalculator();
    const result = calc.calculateStreak([]);
    assert.strictEqual(result, 0);
  });

  test('Should return 1 if the user only read today', () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const calc = new StreakCalculator();
    const result = calc.calculateStreak([todayStr]);
    assert.strictEqual(result, 1);
  });

  test('Should return 2 if the user read yesterday and today', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const calc = new StreakCalculator();
    const result = calc.calculateStreak([yesterdayStr, todayStr]);
    assert.strictEqual(result, 2);
  });

  test('Should return 2 if the user read yesterday and day before, but not today yet', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBefore = new Date();
    dayBefore.setDate(dayBefore.getDate() - 2);

    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const dayBeforeStr = dayBefore.toISOString().split('T')[0];

    const calc = new StreakCalculator();
    const result = calc.calculateStreak([dayBeforeStr, yesterdayStr]);
    assert.strictEqual(result, 2);
  });

  test('Should return 0 if the user last read 2 days ago (streak broke)', () => {
    const dayBefore = new Date();
    dayBefore.setDate(dayBefore.getDate() - 2);
    const dayBeforeStr = dayBefore.toISOString().split('T')[0];

    const calc = new StreakCalculator();
    const result = calc.calculateStreak([dayBeforeStr]);
    assert.strictEqual(result, 0);
  });
});
