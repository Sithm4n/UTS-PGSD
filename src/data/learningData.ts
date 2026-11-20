import { QuizQuestion, TopicInfo } from '../types';

export const COVER_IMAGE_PATH = '/src/assets/images/subject_matematika_geometri_1795023631328.jpg';

export const TOPICS: TopicInfo[] = [
  {
    id: 'bilangan',
    numberLabel: '01',
    title: 'Operasi Bilangan Bulat & Pecahan',
    shortDesc: 'Penjumlahan dan pengurangan garis bilangan bulat serta operasi pecahan senilai.',
    keyFormula: 'a + (-b) = a - b  ·  a/b + c/d = (ad + bc)/bd',
  },
  {
    id: 'rasio',
    numberLabel: '02',
    title: 'Rasio & Skala',
    shortDesc: 'Menyederhanakan perbandingan dua besaran serta menghitung jarak pada peta dan jarak sebenarnya.',
    keyFormula: 'Skala = Jarak Peta : Jarak Sebenarnya',
  },
  {
    id: 'bangun-datar',
    numberLabel: '03',
    title: 'Bangun Datar',
    shortDesc: 'Menghitung keliling dan luas persegi, persegi panjang, segitiga, serta lingkaran.',
    keyFormula: 'Luas Lingkaran = π × r²  ·  Keliling = 2 × π × r',
  },
  {
    id: 'bangun-ruang',
    numberLabel: '04',
    title: 'Bangun Ruang',
    shortDesc: 'Menghitung volume dan luas permukaan kubus, balok, serta tabung dalam satuan kubik.',
    keyFormula: 'Volume Balok = p × l × t  ·  Volume Tabung = π × r² × t',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'bilangan',
    topicLabel: 'Bilangan Bulat',
    question: 'Hasil dari -8 + 14 - (-3) adalah...',
    options: ['3', '6', '9', '19'],
    correctIndex: 2,
    explanation:
      'Pertama hitung -8 + 14 = 6. Kemudian dikurangi bilangan negatif sama dengan ditambah: 6 - (-3) = 6 + 3 = 9.',
  },
  {
    id: 'q2',
    topicId: 'bilangan',
    topicLabel: 'Operasi Bilangan Bulat',
    question:
      'Suhu di dalam lemari pendingin mula-mula -4°C. Setelah listrik padam selama 2 jam, suhunya naik 9°C. Suhu lemari pendingin sekarang adalah...',
    options: ['-13°C', '-5°C', '5°C', '13°C'],
    correctIndex: 2,
    explanation:
      'Suhu naik berarti ditambah: -4 + 9 = 5°C. Pada garis bilangan, melangkah 9 satuan ke kanan dari -4 berhenti di titik 5.',
  },
  {
    id: 'q3',
    topicId: 'bilangan',
    topicLabel: 'Operasi Pecahan',
    question: 'Ibu membeli 3/4 kg tepung dan menggunakan 1/2 kg untuk membuat kue. Sisa tepung Ibu sekarang adalah...',
    options: ['1/4 kg', '2/4 kg', '1/2 kg', '5/4 kg'],
    correctIndex: 0,
    explanation:
      'Samakan penyebut menjadi 4: 1/2 = 2/4. Maka 3/4 - 2/4 = 1/4 kg.',
  },
  {
    id: 'q4',
    topicId: 'rasio',
    topicLabel: 'Rasio',
    question:
      'Di kelas 6 terdapat 16 siswa laki-laki dan 24 siswa perempuan. Perbandingan paling sederhana antara siswa laki-laki dan perempuan adalah...',
    options: ['2 : 3', '3 : 2', '4 : 6', '8 : 12'],
    correctIndex: 0,
    explanation:
      'Bagi kedua bilangan dengan FPB-nya yaitu 8. 16 ÷ 8 = 2 dan 24 ÷ 8 = 3, sehingga rasio paling sederhananya adalah 2 : 3.',
  },
  {
    id: 'q5',
    topicId: 'rasio',
    topicLabel: 'Skala Peta',
    question:
      'Jarak dua kota pada peta adalah 5 cm. Jika peta tersebut menggunakan skala 1 : 400.000, berapakah jarak sebenarnya kedua kota tersebut?',
    options: ['2 km', '20 km', '200 km', '2.000 km'],
    correctIndex: 1,
    explanation:
      'Jarak sebenarnya = 5 cm × 400.000 = 2.000.000 cm. Karena 1 km = 100.000 cm, maka 2.000.000 ÷ 100.000 = 20 km.',
  },
  {
    id: 'q6',
    topicId: 'bangun-datar',
    topicLabel: 'Bangun Datar (Lingkaran)',
    question:
      'Sebuah taman berbentuk lingkaran memiliki jari-jari 14 m. Dengan π = 22/7, berapakah luas taman tersebut?',
    options: ['88 m²', '154 m²', '308 m²', '616 m²'],
    correctIndex: 3,
    explanation:
      'Luas lingkaran = π × r × r = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 m².',
  },
  {
    id: 'q7',
    topicId: 'bangun-datar',
    topicLabel: 'Bangun Datar (Segitiga)',
    question:
      'Sebuah papan rambu berbentuk segitiga memiliki panjang alas 20 cm dan tinggi 15 cm. Luas papan rambu tersebut adalah...',
    options: ['70 cm²', '150 cm²', '300 cm²', '600 cm²'],
    correctIndex: 1,
    explanation:
      'Luas segitiga = 1/2 × alas × tinggi = 1/2 × 20 × 15 = 10 × 15 = 150 cm².',
  },
  {
    id: 'q8',
    topicId: 'bangun-datar',
    topicLabel: 'Bangun Datar (Persegi Panjang)',
    question:
      'Lapangan sekolah berbentuk persegi panjang dengan panjang 30 m dan lebar 18 m. Jika siswa berlari mengelilingi lapangan 1 putaran penuh, jarak yang ditempuh adalah...',
    options: ['48 m', '96 m', '270 m', '540 m'],
    correctIndex: 1,
    explanation:
      'Keliling persegi panjang = 2 × (p + l) = 2 × (30 + 18) = 2 × 48 = 96 meter.',
  },
  {
    id: 'q9',
    topicId: 'bangun-ruang',
    topicLabel: 'Bangun Ruang (Balok)',
    question:
      'Sebuah akuarium berbentuk balok berukuran panjang 50 cm, lebar 30 cm, dan tinggi 40 cm. Volume air maksimal yang dapat ditampung akuarium adalah...',
    options: ['12.000 cm³', '30.000 cm³', '60.000 cm³', '120.000 cm³'],
    correctIndex: 2,
    explanation:
      'Volume balok = p × l × t = 50 × 30 × 40 = 60.000 cm³ (atau setara dengan 60 liter).',
  },
  {
    id: 'q10',
    topicId: 'bangun-ruang',
    topicLabel: 'Bangun Ruang (Tabung)',
    question:
      'Sebuah kaleng susu berbentuk tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm (π = 22/7). Volume kaleng tersebut adalah...',
    options: ['220 cm³', '440 cm³', '1.540 cm³', '3.080 cm³'],
    correctIndex: 2,
    explanation:
      'Volume tabung = π × r² × t = (22/7) × 7 × 7 × 10 = 22 × 7 × 10 = 1.540 cm³.',
  },
];
