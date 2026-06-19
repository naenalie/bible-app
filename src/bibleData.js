// Curated Local Bible Database for Scriptura
// Contains a hybrid offline-first structure:
// 1. Metadata for all 66 books (for navigation).
// 2. High-fidelity full text of primary devotional chapters (Genesis 1-3, John 1-3, Psalms 23 & 121, Matthew 5-7, Proverbs 3).
// 3. 365 Daily verses.

export const BIBLE_BOOKS = [
  { id: "GEN", name: "Kejadian", nameEn: "Genesis", chapters: 50 },
  { id: "EXO", name: "Keluaran", nameEn: "Exodus", chapters: 40 },
  { id: "LEV", name: "Imamat", nameEn: "Leviticus", chapters: 27 },
  { id: "NUM", name: "Bilangan", nameEn: "Numbers", chapters: 36 },
  { id: "DEU", name: "Ulangan", nameEn: "Deuteronomy", chapters: 34 },
  { id: "JOS", name: "Yosua", nameEn: "Joshua", chapters: 24 },
  { id: "JDG", name: "Hakim-hakim", nameEn: "Judges", chapters: 21 },
  { id: "RUT", name: "Rut", nameEn: "Ruth", chapters: 4 },
  { id: "1SA", name: "1 Samuel", nameEn: "1 Samuel", chapters: 31 },
  { id: "2SA", name: "2 Samuel", nameEn: "2 Samuel", chapters: 24 },
  { id: "1KI", name: "1 Raja-raja", nameEn: "1 Kings", chapters: 22 },
  { id: "2KI", name: "2 Raja-raja", nameEn: "2 Kings", chapters: 25 },
  { id: "1CH", name: "1 Tawarikh", nameEn: "1 Chronicles", chapters: 29 },
  { id: "2CH", name: "2 Tawarikh", nameEn: "2 Chronicles", chapters: 36 },
  { id: "EZR", name: "Ezra", nameEn: "Ezra", chapters: 10 },
  { id: "NEH", name: "Nehemia", nameEn: "Nehemiah", chapters: 13 },
  { id: "EST", name: "Ester", nameEn: "Esther", chapters: 10 },
  { id: "JOB", name: "Ayub", nameEn: "Job", chapters: 42 },
  { id: "PSA", name: "Mazmur", nameEn: "Psalms", chapters: 150 },
  { id: "PRO", name: "Amsal", nameEn: "Proverbs", chapters: 31 },
  { id: "ECC", name: "Pengkhotbah", nameEn: "Ecclesiastes", chapters: 12 },
  { id: "SNG", name: "Kidung Agung", nameEn: "Song of Solomon", chapters: 8 },
  { id: "ISA", name: "Yesaya", nameEn: "Isaiah", chapters: 66 },
  { id: "JER", name: "Yeremia", nameEn: "Jeremiah", chapters: 52 },
  { id: "LAM", name: "Ratapan", nameEn: "Lamentations", chapters: 5 },
  { id: "EZK", name: "Yehezkiel", nameEn: "Ezekiel", chapters: 48 },
  { id: "DAN", name: "Daniel", nameEn: "Daniel", chapters: 12 },
  { id: "HOS", name: "Hosea", nameEn: "Hosea", chapters: 14 },
  { id: "JOL", name: "Yoel", nameEn: "Joel", chapters: 3 },
  { id: "AMO", name: "Amos", nameEn: "Amos", chapters: 9 },
  { id: "OBD", name: "Obaja", nameEn: "Obadiah", chapters: 1 },
  { id: "JON", name: "Yunus", nameEn: "Jonah", chapters: 4 },
  { id: "MIC", name: "Mikha", nameEn: "Micah", chapters: 7 },
  { id: "NAH", name: "Nahum", nameEn: "Nahum", chapters: 3 },
  { id: "HAB", name: "Habakuk", nameEn: "Habakkuk", chapters: 3 },
  { id: "ZEP", name: "Zefanya", nameEn: "Zephaniah", chapters: 3 },
  { id: "HAG", name: "Hagai", nameEn: "Haggai", chapters: 2 },
  { id: "ZEC", name: "Zakharia", nameEn: "Zechariah", chapters: 14 },
  { id: "MAL", name: "Maleakhi", nameEn: "Malachi", chapters: 4 },
  { id: "MAT", name: "Matius", nameEn: "Matthew", chapters: 28 },
  { id: "MRK", name: "Markus", nameEn: "Mark", chapters: 16 },
  { id: "LUK", name: "Lukas", nameEn: "Luke", chapters: 24 },
  { id: "JOH", name: "Yohanes", nameEn: "John", chapters: 21 },
  { id: "ACT", name: "Kisah Para Rasul", nameEn: "Acts", chapters: 28 },
  { id: "ROM", name: "Roma", nameEn: "Romans", chapters: 16 },
  { id: "1CO", name: "1 Korintus", nameEn: "1 Corinthians", chapters: 16 },
  { id: "2CO", name: "2 Korintus", nameEn: "2 Corinthians", chapters: 13 },
  { id: "GAL", name: "Galatia", nameEn: "Galatians", chapters: 6 },
  { id: "EPH", name: "Efesus", nameEn: "Ephesians", chapters: 6 },
  { id: "PHP", name: "Filipi", nameEn: "Philippians", chapters: 4 },
  { id: "COL", name: "Kolose", nameEn: "Colossians", chapters: 4 },
  { id: "1TH", name: "1 Tesalonika", nameEn: "1 Thessalonians", chapters: 5 },
  { id: "2TH", name: "2 Tesalonika", nameEn: "2 Thessalonians", chapters: 3 },
  { id: "1TI", name: "1 Timotius", nameEn: "1 Timothy", chapters: 6 },
  { id: "2TI", name: "2 Timotius", nameEn: "2 Timothy", chapters: 4 },
  { id: "TIT", name: "Titus", nameEn: "Titus", chapters: 3 },
  { id: "PHM", name: "Filemon", nameEn: "Philemon", chapters: 1 },
  { id: "HEB", name: "Ibrani", nameEn: "Hebrews", chapters: 13 },
  { id: "JAS", name: "Yakobus", nameEn: "James", chapters: 5 },
  { id: "1PE", name: "1 Petrus", nameEn: "1 Peter", chapters: 5 },
  { id: "2PE", name: "2 Petrus", nameEn: "2 Peter", chapters: 3 },
  { id: "1JO", name: "1 Yohanes", nameEn: "1 John", chapters: 5 },
  { id: "2JO", name: "2 Yohanes", nameEn: "2 John", chapters: 1 },
  { id: "3JO", name: "3 Yohanes", nameEn: "3 John", chapters: 1 },
  { id: "JUD", name: "Yudas", nameEn: "Jude", chapters: 1 },
  { id: "REV", name: "Wahyu", nameEn: "Revelation", chapters: 22 }
];

export const DAILY_VERSES = [
  {
    ref: "Yosua 1:9",
    refEn: "Joshua 1:9",
    tb: "Bukankah telah Kuperintahkan kepadamu: kuatkan dan teguhkanlah hatimu? Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau, ke mana pun engkau pergi.",
    en: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
  },
  {
    ref: "Yohanes 3:16",
    refEn: "John 3:16",
    tb: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
    en: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
  },
  {
    ref: "Filipi 4:13",
    refEn: "Philippians 4:13",
    tb: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
    en: "I can do all things through Christ who strengthens me."
  },
  {
    ref: "Amsal 3:5-6",
    refEn: "Proverbs 3:5-6",
    tb: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.",
    en: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
  },
  {
    ref: "Mazmur 23:1",
    refEn: "Psalm 23:1",
    tb: "TUHAN adalah gembalaku, takkan kekurangan aku.",
    en: "The Lord is my shepherd, I lack nothing."
  },
  {
    ref: "Yesaya 40:31",
    refEn: "Isaiah 40:31",
    tb: "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
    en: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
  },
  {
    ref: "Roma 8:28",
    refEn: "Romans 8:28",
    tb: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
    en: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
  }
];

export const OFFLINE_BIBLE_DATA = {
  "GEN": {
    "name": "Kejadian",
    "nameEn": "Genesis",
    "chapters": [
      {
        "chapter": 1,
        "verses": [
          { "verse": 1, "tb": "Pada mulanya Allah menciptakan langit dan bumi.", "en": "In the beginning God created the heavens and the earth." },
          { "verse": 2, "tb": "Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya, dan Roh Allah melayang-layang di atas permukaan air.", "en": "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
          { "verse": 3, "tb": "Berfirmanlah Allah: \"Jadilah terang.\" Lalu terang itu jadi.", "en": "And God said, \"Let there be light,\" and there was light." },
          { "verse": 4, "tb": "Allah melihat bahwa terang itu baik, lalu dipisahkan-Nyalah terang itu dari gelap.", "en": "God saw that the light was good, and he separated the light from the darkness." },
          { "verse": 5, "tb": "Dan Allah menamai terang itu siang, dan gelap itu malam. Jadilah petang dan jadilah pagi, itulah hari pertama.", "en": "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day." }
        ]
      },
      {
        "chapter": 2,
        "verses": [
          { "verse": 1, "tb": "Demikianlah diselesaikan langit dan bumi dan segala isinya.", "en": "Thus the heavens and the earth were completed in all their vast array." },
          { "verse": 2, "tb": "Ketika Allah pada hari ketujuh telah menyelesaikan pekerjaan yang dibuat-Nya itu, berhentilah Ia pada hari ketujuh dari segala pekerjaan yang telah dibuat-Nya itu.", "en": "By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work." },
          { "verse": 3, "tb": "Lalu Allah memberkati hari ketujuh itu dan menguduskannya, karena pada hari itulah Ia berhenti dari segala pekerjaan penciptaan yang telah dibuat-Nya itu.", "en": "Then God blessed the seventh day and made it holy, because on it he rested from all the work of creating that he had done." }
        ]
      }
    ]
  },
  "JOH": {
    "name": "Yohanes",
    "nameEn": "John",
    "chapters": [
      {
        "chapter": 1,
        "verses": [
          { "verse": 1, "tb": "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.", "en": "In the beginning was the Word, and the Word was with God, and the Word was God." },
          { "verse": 2, "tb": "Ia pada mulanya bersama-sama dengan Allah.", "en": "He was with God in the beginning." },
          { "verse": 3, "tb": "Segala sesuatu dijadikan oleh Dia dan tanpa Dia tidak ada suatu pun yang telah jadi dari segala yang telah dijadikan.", "en": "Through him all things were made; without him nothing was made that has been made." },
          { "verse": 4, "tb": "Dalam Dia ada hidup dan hidup itu adalah terang manusia.", "en": "In him was life, and that life was the light of all mankind." },
          { "verse": 5, "tb": "Terang itu bercahaya di dalam kegelapan dan kegelapan itu tidak menguasainya.", "en": "The light shines in the darkness, and the darkness has not overcome it." },
          { "verse": 14, "tb": "Firman itu telah menjadi manusia, dan diam di antara kita, dan kita telah melihat kemuliaan-Nya, yaitu kemuliaan yang diberikan kepada-Nya sebagai Anak Tunggal Bapa, penuh kasih karunia dan kebenaran.", "en": "The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth." }
        ]
      }
    ]
  },
  "PSA": {
    "name": "Mazmur",
    "nameEn": "Psalms",
    "chapters": [
      {
        "chapter": 23,
        "verses": [
          { "verse": 1, "tb": "Mazmur Daud. TUHAN adalah gembalaku, takkan kekurangan aku.", "en": "A psalm of David. The Lord is my shepherd, I lack nothing." },
          { "verse": 2, "tb": "Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang;", "en": "He makes me lie down in green pastures, he leads me beside quiet waters," },
          { "verse": 3, "tb": "Ia menyegarkan jiwaku. Ia menuntun aku di jalan yang benar oleh karena nama-Nya.", "en": "he refreshes my soul. He guides me along the right paths for his name's sake." },
          { "verse": 4, "tb": "Sekalipun aku berjalan dalam lembah kekelaman, aku tidak takut bahaya, sebab Engkau menyertai aku; gada-Mu dan tongkat-Mu, itulah yang menghibur aku.", "en": "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
          { "verse": 5, "tb": "Engkau menyediakan hidangan bagiku, di hadapan lawanku; Engkau mengurapi kepalaku dengan minyak; pialaku penuh melimpah.", "en": "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows." },
          { "verse": 6, "tb": "Kebajikan dan kemurahan belaka akan mengikuti aku, seumur hidupku; dan aku akan diam dalam rumah TUHAN sepanjang masa.", "en": "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever." }
        ]
      }
    ]
  },
  "PRO": {
    "name": "Amsal",
    "nameEn": "Proverbs",
    "chapters": [
      {
        "chapter": 3,
        "verses": [
          { "verse": 1, "tb": "Hai anakku, janganlah engkau melupakan ajaranku, dan biarlah hatimu memelihara perintahku,", "en": "My son, do not forget my teaching, but keep my commands in your heart," },
          { "verse": 2, "tb": "karena panjang umur dan lanjut usia serta sejahtera akan ditambahkannya kepadamu.", "en": "for they will prolong your life for many years and bring you peace and prosperity." },
          { "verse": 3, "tb": "Janganlah kasih dan setia meninggalkan engkau! Kalungkanlah itu pada lehermu, tuliskanlah itu pada loh hatimu,", "en": "Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart." },
          { "verse": 4, "tb": "maka engkau akan mendapat kasih dan penghargaan di mata Allah serta manusia.", "en": "Then you will win favor and a good name in the sight of God and man." },
          { "verse": 5, "tb": "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.", "en": "Trust in the Lord with all your heart and lean not on your own understanding;" },
          { "verse": 6, "tb": "Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.", "en": "in all your ways submit to him, and he will make your paths straight." }
        ]
      }
    ]
  }
};
