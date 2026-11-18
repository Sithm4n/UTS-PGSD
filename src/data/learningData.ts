import { QuizQuestion, SubjectInfo } from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_learning_desk_1795023629026.jpg';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'ipa',
    numberLabel: '01',
    title: 'Ilmu Pengetahuan Alam',
    shortTitle: 'IPA',
    subtitle: 'Biologi Seluler & Fisika Kelistrikan',
    summary:
      'Uji reaksi fotosintesis tumbuhan dan rakit rangkaian listrik seri maupun paralel secara langsung melalui simulasi interaktif.',
    imagePath: '/src/assets/images/subject_ipa_lab_1795023630079.jpg',
    imageAlt: 'Ilustrasi ilmiah penampang daun tumbuhan dan proses fotosintesis',
    modules: [
      {
        id: 'ipa-fotosintesis',
        title: 'Simulasi Fotosintesis Daun',
        description: 'Atur cahaya, kadar CO2, dan air untuk mengamati laju produksi glukosa dan oksigen.',
      },
      {
        id: 'ipa-listrik',
        title: 'Rangkaian Listrik Seri & Paralel',
        description: 'Bandingkan arus, tegangan, dan nyala lampu pada rangkaian seri dan paralel.',
      },
    ],
    metaItems: ['2 Laboratorium', '5 Latihan Soal', 'Interaktif'],
  },
  {
    id: 'bahasa',
    numberLabel: '02',
    title: 'Bahasa Indonesia & Literasi',
    shortTitle: 'Bahasa',
    subtitle: 'Sintaksis SPOK & Ejaan Yang Disempurnakan',
    summary:
      'Susun struktur kalimat efektif berbasis pola SPOK dan sunting kesalahan kata baku serta imbuhan sesuai kaidah EYD V.',
    imagePath: '/src/assets/images/subject_bahasa_literasi_1795023630610.jpg',
    imageAlt: 'Buku terbuka dengan pena dan kartu indeks tipografi bahasa',
    modules: [
      {
        id: 'bahasa-spok',
        title: 'Penyusun Kalimat Efektif (SPOK)',
        description: 'Susun ulang klausa Subjek, Predikat, Objek, dan Keterangan menjadi kalimat baku.',
      },
      {
        id: 'bahasa-eyd',
        title: 'Laboratorium EYD V & Kata Baku',
        description: 'Temukan dan perbaiki kesalahan ejaan, kata depan, serta kosakata tidak baku dalam teks.',
      },
    ],
    metaItems: ['2 Studio Teks', '5 Latihan Soal', 'EYD V'],
  },
  {
    id: 'matematika',
    numberLabel: '03',
    title: 'Matematika Terapan',
    shortTitle: 'Matematika',
    subtitle: 'Fungsi Aljabar & Geometri Pythagoras',
    summary:
      'Amati perubahan kurva fungsi kuadrat pada bidang Kartesius serta buktikan hubungan luas persegi pada teorema Pythagoras.',
    imagePath: '/src/assets/images/subject_matematika_geometri_1795023631328.jpg',
    imageAlt: 'Bidang koordinat Kartesius dengan kurva biru dan jangka gambar teknis',
    modules: [
      {
        id: 'math-fungsi',
        title: 'Grafik Fungsi Kuadrat & Linear',
        description: 'Eksplorasi koefisien a, b, c untuk melihat titik puncak, diskriminan, dan akar persamaan.',
      },
      {
        id: 'math-pythagoras',
        title: 'Laboratorium Teorema Pythagoras',
        description: 'Ubah panjang sisi segitiga siku-siku dan lihat pembuktian luas kuadrat sisi miring.',
      },
    ],
    metaItems: ['2 Visualisasi', '5 Latihan Soal', 'Kartesius'],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // IPA (5 soal)
  {
    id: 'ipa-q1',
    subject: 'ipa',
    topic: 'Fotosintesis',
    question:
      'Dalam percobaan fotosintesis, apabila intensitas cahaya tinggi dan air melimpah tetapi kadar gas karbon dioksida (CO2) sangat rendah, apa yang terjadi pada laju fotosintesis?',
    options: [
      'Laju fotosintesis tetap meningkat tanpa batas mengikuti cahaya',
      'Laju fotosintesis tertahan oleh CO2 sebagai faktor pembatas',
      'Kloroplas menghasilkan gas karbon monoksida sebagai pengganti glukosa',
      'Akar berhenti menyerap air karena daun kelebihan cahaya',
    ],
    correctIndex: 1,
    explanation:
      'Sesuai hukum faktor pembatas (Law of Limiting Factors), proses fotosintesis membutuhkan cahaya, air, dan CO2 sekaligus. Jika CO2 sangat rendah, laju pembentukan glukosa akan tertahan meskipun cahaya terang.',
  },
  {
    id: 'ipa-q2',
    subject: 'ipa',
    topic: 'Anatomi Daun',
    question:
      'Jaringan pembuluh tumbuhan yang bertugas mengangkut air dan mineral dari akar menuju ke daun untuk bahan baku fotosintesis adalah...',
    options: ['Floem', 'Stomata', 'Xilem', 'Epidermis'],
    correctIndex: 2,
    explanation:
      'Xilem (pembuluh kayu) mengangkut air dan unsur hara dari akar ke daun. Sementara floem mengedarkan hasil fotosintesis (glukosa/sukrosa) ke seluruh tubuh tumbuhan.',
  },
  {
    id: 'ipa-q3',
    subject: 'ipa',
    topic: 'Rangkaian Listrik',
    question:
      'Dua buah lampu identik dirangkai secara paralel ke sebuah baterai 12V. Jika salah satu lampu dilepas atau putus, bagaimana kondisi lampu yang lainnya?',
    options: [
      'Ikut padam karena aliran arus terputus total',
      'Tetap menyala dengan tegangan 12V yang sama',
      'Menyala dua kali lebih redup karena tegangan terbagi dua',
      'Mengalami korsleting karena hambatan total menjadi nol',
    ],
    correctIndex: 1,
    explanation:
      'Pada rangkaian paralel, setiap cabang memiliki jalur arus terpisah yang langsung terhubung ke sumber tegangan 12V. Putusnya satu cabang tidak menghentikan aliran arus di cabang lainnya.',
  },
  {
    id: 'ipa-q4',
    subject: 'ipa',
    topic: 'Hukum Ohm',
    question:
      'Sebuah lampu dengan hambatan 6 Ohm dihubungkan ke baterai 12 Volt. Berapa besar kuat arus listrik yang mengalir pada lampu tersebut?',
    options: ['0,5 Ampere', '2 Ampere', '6 Ampere', '72 Ampere'],
    correctIndex: 1,
    explanation:
      'Berdasarkan Hukum Ohm: I = V / R. Dengan V = 12 V dan R = 6 Ohm, maka kuat arus I = 12 / 6 = 2 Ampere.',
  },
  {
    id: 'ipa-q5',
    subject: 'ipa',
    topic: 'Energi & Gas',
    question:
      'Gas yang dilepaskan melalui stomata daun sebagai hasil sampingan dari pemecahan molekul air (fotolisis) selama fotosintesis adalah...',
    options: ['Nitrogen (N2)', 'Metana (CH4)', 'Oksigen (O2)', 'Karbon dioksida (CO2)'],
    correctIndex: 2,
    explanation:
      'Reaksi terang fotosintesis memecah air (H2O) menggunakan energi cahaya menjadi ion hidrogen, elektron, dan gas oksigen (O2) yang dilepaskan ke udara.',
  },

  // Bahasa Indonesia (5 soal)
  {
    id: 'bahasa-q1',
    subject: 'bahasa',
    topic: 'Kalimat Efektif',
    question: 'Manakah di antara kalimat berikut yang memenuhi kaidah kalimat efektif tanpa pleonasme (pemborosan kata)?',
    options: [
      'Para siswa-siswa diharapkan segera memasuki ruang laboratorium.',
      'Rapat koordinasi sekolah membahas tentang jadwal ujian semester.',
      'Siswa kelas delapan melakukan pengamatan sel daun di laboratorium.',
      'Bagi seluruh peserta lomba harap berkumpul di aula utama.',
    ],
    correctIndex: 2,
    explanation:
      'Kalimat C jelas memiliki Subjek (Siswa kelas delapan), Predikat (melakukan), Objek (pengamatan sel daun), dan Keterangan (di laboratorium). Pilihan A boros kata jamak, B tidak perlu kata "tentang" setelah kata kerja transitif, dan D kehilangan subjek karena kata "Bagi".',
  },
  {
    id: 'bahasa-q2',
    subject: 'bahasa',
    topic: 'Kata Baku (KBBI)',
    question: 'Penulisan deretan kata baku yang paling tepat sesuai Kamus Besar Bahasa Indonesia (KBBI) adalah...',
    options: [
      'apotik, praktek, analisa',
      'apotek, praktik, analisis',
      'apotek, praktek, analisis',
      'apotik, praktik, analisa',
    ],
    correctIndex: 1,
    explanation:
      'Menurut KBBI, bentuk baku yang tepat adalah apotek (bukan apotik), praktik (bukan praktek), dan analisis (bukan analisa).',
  },
  {
    id: 'bahasa-q3',
    subject: 'bahasa',
    topic: 'Kata Depan vs Imbuhan',
    question: 'Penggunaan penulisan "di" sebagai kata depan yang benar ditunjukkan pada kalimat...',
    options: [
      'Buku catatan sains itu diletakkan dimeja belajar.',
      'Praktikum kimia sederhana di lakukan secara berkelompok.',
      'Pengukuran suhu air dilakukan di halaman sekolah.',
      'Hasil pengamatan di tulis rapi dalam laporan ilmiah.',
    ],
    correctIndex: 2,
    explanation:
      'Kata depan "di" yang menunjukkan tempat ditulis terpisah ("di halaman"). Sedangkan imbuhan pasif "di-" harus ditulis serangkai dengan kata kerjanya ("diletakkan", "dilakukan", "ditulis").',
  },
  {
    id: 'bahasa-q4',
    subject: 'bahasa',
    topic: 'Fungsi SPOK',
    question: 'Pada kalimat "Peneliti muda itu mencatat hasil eksperimen dengan teliti", frasa "hasil eksperimen" menduduki fungsi...',
    options: ['Subjek', 'Predikat', 'Objek', 'Keterangan cara'],
    correctIndex: 2,
    explanation:
      'Polanya adalah: Peneliti muda itu (S) + mencatat (P - verba transitif) + hasil eksperimen (O - sasaran langsung predikat) + dengan teliti (Keterangan cara).',
  },
  {
    id: 'bahasa-q5',
    subject: 'bahasa',
    topic: 'Tanda Baca EYD V',
    question: 'Penulisan tanda koma yang tepat sebelum kata penghubung intrakalimat adalah...',
    options: [
      'Ia ingin mengikuti kelas tambahan tetapi, jadwalnya bentrok.',
      'Ia ingin mengikuti kelas tambahan, tetapi jadwalnya bentrok.',
      'Ia ingin mengikuti, kelas tambahan tetapi jadwalnya bentrok.',
      'Ia ingin mengikuti kelas tambahan tetapi jadwalnya, bentrok.',
    ],
    correctIndex: 1,
    explanation:
      'Menurut EYD V, tanda koma dipakai sebelum kata penghubung pertentangan seperti "tetapi", "melainkan", dan "sedangkan" dalam kalimat majemuk setara.',
  },

  // Matematika (5 soal)
  {
    id: 'math-q1',
    subject: 'matematika',
    topic: 'Teorema Pythagoras',
    question:
      'Sebuah tangga sepanjang 13 meter disandarkan ke dinding vertikal. Jika jarak kaki tangga ke dinding adalah 5 meter, berapa tinggi dinding yang dicapai ujung tangga?',
    options: ['8 meter', '10 meter', '12 meter', '18 meter'],
    correctIndex: 2,
    explanation:
      'Menggunakan Teorema Pythagoras: tinggi = akar(13^2 - 5^2) = akar(169 - 25) = akar(144) = 12 meter (Triple Pythagoras 5-12-13).',
  },
  {
    id: 'math-q2',
    subject: 'matematika',
    topic: 'Fungsi Kuadrat',
    question:
      'Pada grafik fungsi kuadrat f(x) = ax^2 + bx + c, nilai koefisien a = -2 menyebabkan bentuk kurva parabola...',
    options: [
      'Terbuka ke atas dan memiliki titik balik minimum',
      'Terbuka ke bawah dan memiliki titik balik maksimum',
      'Berbentuk garis lurus miring ke kiri',
      'Tidak memotong sumbu Y di mana pun',
    ],
    correctIndex: 1,
    explanation:
      'Jika koefisien a < 0 (negatif), kurva parabola terbuka ke bawah sehingga titik puncaknya merupakan nilai balik maksimum.',
  },
  {
    id: 'math-q3',
    subject: 'matematika',
    topic: 'Diskriminan',
    question:
      'Diketahui fungsi kuadrat f(x) = x^2 - 4x + 4. Nilai diskriminan D = b^2 - 4ac dan posisi grafik terhadap sumbu X adalah...',
    options: [
      'D = 0, grafik menyinggung sumbu X di satu titik',
      'D = 16, grafik memotong sumbu X di dua titik berbeda',
      'D = -16, grafik melayang di atas sumbu X',
      'D = 8, grafik memotong sumbu Y di titik (0, 8)',
    ],
    correctIndex: 0,
    explanation:
      'Dengan a = 1, b = -4, dan c = 4, maka D = (-4)^2 - 4(1)(4) = 16 - 16 = 0. Karena D = 0, parabola menyinggung sumbu X tepat di satu titik (x = 2).',
  },
  {
    id: 'math-q4',
    subject: 'matematika',
    topic: 'Persamaan Garis Lurus',
    question: 'Sebuah fungsi linear dinyatakan dengan y = 3x - 6. Di titik manakah garis tersebut memotong sumbu X?',
    options: ['(0, -6)', '(2, 0)', '(-2, 0)', '(3, 0)'],
    correctIndex: 1,
    explanation:
      'Garis memotong sumbu X ketika nilai y = 0. Maka 0 = 3x - 6 => 3x = 6 => x = 2. Jadi titik potong sumbu X adalah (2, 0).',
  },
  {
    id: 'math-q5',
    subject: 'matematika',
    topic: 'Luas Segitiga Siku-Siku',
    question:
      'Jika segitiga siku-siku memiliki panjang alas 8 cm dan sisi miring (hipotenusa) 10 cm, berapakah luas segitiga tersebut?',
    options: ['24 cm^2', '40 cm^2', '48 cm^2', '80 cm^2'],
    correctIndex: 0,
    explanation:
      'Tinggi segitiga = akar(10^2 - 8^2) = akar(100 - 64) = akar(36) = 6 cm. Luas = 1/2 x alas x tinggi = 1/2 x 8 x 6 = 24 cm^2.',
  },
];

export interface SpokChallenge {
  id: string;
  title: string;
  context: string;
  segments: {
    id: string;
    text: string;
    role: 'S' | 'P' | 'O' | 'K';
    roleLabel: string;
  }[];
  correctOrder: string[];
  note: string;
}

export const SPOK_CHALLENGES: SpokChallenge[] = [
  {
    id: 'spok-1',
    title: 'Laporan Praktikum Sains',
    context: 'Susun potongan kata berikut menjadi kalimat aktif efektif berpola S - P - O - K:',
    segments: [
      { id: 's1', text: 'Kelompok belajar kelas delapan', role: 'S', roleLabel: 'Subjek' },
      { id: 'p1', text: 'mengukur', role: 'P', roleLabel: 'Predikat' },
      { id: 'o1', text: 'laju fotosintesis tanaman hidrila', role: 'O', roleLabel: 'Objek' },
      { id: 'k1', text: 'di halaman sekolah', role: 'K', roleLabel: 'Keterangan' },
    ],
    correctOrder: ['s1', 'p1', 'o1', 'k1'],
    note: 'Kalimat aktif transitif menuntut Subjek di awal, diikuti Predikat berimbuhan me-, Objek sasaran langsung, lalu Keterangan tempat.',
  },
  {
    id: 'spok-2',
    title: 'Kalimat Eksperimen Matematika',
    context: 'Susun klausa berikut agar memenuhi struktur S - P - O - K yang baku:',
    segments: [
      { id: 's2', text: 'Para peserta didik', role: 'S', roleLabel: 'Subjek' },
      { id: 'p2', text: 'menggambar', role: 'P', roleLabel: 'Predikat' },
      { id: 'o2', text: 'kurva fungsi kuadrat', role: 'O', roleLabel: 'Objek' },
      { id: 'k2', text: 'dengan penggaris dan jangka', role: 'K', roleLabel: 'Keterangan' },
    ],
    correctOrder: ['s2', 'p2', 'o2', 'k2'],
    note: 'Hindari pemborosan seperti "Para peserta-peserta didik". Frasa "dengan penggaris dan jangka" berfungsi sebagai keterangan alat.',
  },
  {
    id: 'spok-3',
    title: 'Kalimat Pengamatan Listrik',
    context: 'Rangkai unsur kalimat berikut secara runtut (S - P - O - K):',
    segments: [
      { id: 's3', text: 'Guru pembimbing IPA', role: 'S', roleLabel: 'Subjek' },
      { id: 'p3', text: 'menjelaskan', role: 'P', roleLabel: 'Predikat' },
      { id: 'o3', text: 'perbedaan rangkaian seri dan paralel', role: 'O', roleLabel: 'Objek' },
      { id: 'k3', text: 'sebelum praktikum dimulai', role: 'K', roleLabel: 'Keterangan' },
    ],
    correctOrder: ['s3', 'p3', 'o3', 'k3'],
    note: 'Setelah kata kerja transitif "menjelaskan", jangan sisipkan kata depan "tentang" agar Objek tetap terhubung langsung dengan Predikat.',
  },
];

export interface EydCorrectionItem {
  id: string;
  wrongText: string;
  options: string[];
  correctOption: string;
  category: string;
  rule: string;
}

export const EYD_ITEMS: EydCorrectionItem[] = [
  {
    id: 'eyd-1',
    wrongText: 'di lakukan',
    options: ['di lakukan', 'dilakukan'],
    correctOption: 'dilakukan',
    category: 'Imbuhan di-',
    rule: 'Awalan pembentuk kata kerja pasif "di-" harus ditulis serangkai dengan kata dasarnya.',
  },
  {
    id: 'eyd-2',
    wrongText: 'diatas',
    options: ['diatas', 'di atas'],
    correctOption: 'di atas',
    category: 'Kata Depan di',
    rule: 'Kata depan "di" yang menunjukkan letak atau tempat wajib ditulis terpisah dari kata yang mengikutinya.',
  },
  {
    id: 'eyd-3',
    wrongText: 'analisa',
    options: ['analisa', 'analisis'],
    correctOption: 'analisis',
    category: 'Kosakata Baku',
    rule: 'Bentuk serapan baku dalam KBBI adalah "analisis", mengikuti akhiran -sis (seperti sintesis dan hipotesis).',
  },
  {
    id: 'eyd-4',
    wrongText: 'praktek',
    options: ['praktek', 'praktik'],
    correctOption: 'praktik',
    category: 'Kosakata Baku',
    rule: 'Menurut KBBI, kata baku yang tepat adalah "praktik" (menggunakan huruf i), sementara kata sifatnya "praktis".',
  },
  {
    id: 'eyd-5',
    wrongText: 'resiko',
    options: ['resiko', 'risiko'],
    correctOption: 'risiko',
    category: 'Kosakata Baku',
    rule: 'Penulisan baku yang sesuai dengan kaidah KBBI dan EYD V adalah "risiko", bukan "resiko".',
  },
];
