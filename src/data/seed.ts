/**
 
 * ============================================================
 *
 * File ini berisi data awal yang digunakan oleh aplikasi,
 * yaitu:
 *
 * 1. Data Dosen
 * 2. Data Mata Kuliah
 * 3. Data Kelas
 * 4. Data Ruang
 *
 * Data disusun dalam bentuk array agar dapat digunakan
 * sebagai sumber data awal pada aplikasi.
 *
 * Data dari file ini selanjutnya digunakan oleh database.ts
 * pada proses inisialisasi database SQLite.
 *
 * Konsep pembelajaran:
 *
 * - Array
 * - Nested Array
 * - Export
 * - Seed Data
 * - Master Data
 * - Data Initialization
 * - Shared Data
 * ============================================================
 */


/**
 * ============================================================
 * 1. DATA DOSEN
 * ============================================================
 *
 * teachers
 *
 * Menyimpan data awal Dosen yang akan digunakan sebagai
 * master data pada aplikasi.
 *
 * Struktur setiap data Dosen:
 *
 * [
 *   kode_dosen,
 *   nama_dosen,
 *   bidang_keahlian
 * ]
 *
 * Contoh:
 *
 * [
 *   'DSN-001',
 *   'Amrizal, S.Kom., M.Kom.',
 *   'Pemrograman Mobile'
 * ]
 *
 * Penjelasan:
 *
 * kode_dosen
 *   Digunakan sebagai kode unik Dosen.
 *
 * nama_dosen
 *   Menyimpan nama lengkap Dosen.
 *
 * bidang_keahlian
 *   Menyimpan bidang keahlian Dosen.
 * ============================================================
 */
export const teachers = [
  [
    'DSN-001',
    'Amrizal, S.Kom., M.Kom.',
    'Pemrograman Mobile',
  ],
  [
    'DSN-002',
    'Dr. Hendra Alfi, S.P., M.P.',
    'Sistem Informasi',
  ],
  [
    'DSN-003',
    'Debby Syukriani, M.P.',
    'Basis Data',
  ],
  [
    'DSN-004',
    'Dr. Iis Ismawati, S.Hut., M.Si.',
    'Teknologi Informasi',
  ],
];


/**
 * ============================================================
 * 2. DATA MATA KULIAH
 * ============================================================
 *
 * subjects
 *
 * Menyimpan data awal Mata Kuliah yang digunakan sebagai
 * master data pada aplikasi.
 *
 * Struktur setiap data Mata Kuliah:
 *
 * [
 *   kode_mata_kuliah,
 *   nama_mata_kuliah,
 *   warna_jadwal
 * ]
 *
 * Contoh:
 *
 * [
 *   'MK-001',
 *   'Workshop Pemrograman Mobile',
 *   '#2E7D5B'
 * ]
 *
 * Penjelasan:
 *
 * kode_mata_kuliah
 *   Digunakan sebagai kode unik Mata Kuliah.
 *
 * nama_mata_kuliah
 *   Menyimpan nama Mata Kuliah.
 *
 * warna_jadwal
 *   Menyimpan warna identitas Mata Kuliah dalam format HEX.
 *
 * Warna tersebut dapat digunakan sebagai identitas visual
 * Mata Kuliah pada kartu Jadwal.
 * ============================================================
 */
export const subjects = [
  [
    'MK-001',
    'Workshop Pemrograman Mobile',
    '#2E7D5B',
  ],
  [
    'MK-002',
    'Basis Data',
    '#3B82F6',
  ],
  [
    'MK-003',
    'Sistem Informasi',
    '#8B5CF6',
  ],
  [
    'MK-004',
    'Pemrograman Web',
    '#F59E0B',
  ],
  [
    'MK-005',
    'Jaringan Komputer',
    '#EF4444',
  ],
];


/**
 * ============================================================
 * 3. DATA KELAS
 * ============================================================
 *
 * classes
 *
 * Menyimpan data awal Kelas yang digunakan sebagai salah
 * satu master data ketika membuat Jadwal perkuliahan.
 *
 * Struktur setiap data Kelas:
 *
 * [
 *   kode_kelas,
 *   nama_program_studi
 * ]
 *
 * Contoh:
 *
 * [
 *   'TRK-4A',
 *   'Teknologi Rekayasa Komputer'
 * ]
 *
 * Penjelasan:
 *
 * kode_kelas
 *   Menyimpan nama/kode Kelas.
 *
 * nama_program_studi
 *   Menyimpan nama Program Studi dari Kelas tersebut.
 * ============================================================
 */
export const classes = [
  [
    'TRK-4A',
    'Teknologi Rekayasa Komputer',
  ],
  [
    'TRK-4B',
    'Teknologi Rekayasa Komputer',
  ],
  [
    'TRK-2A',
    'Teknologi Rekayasa Komputer',
  ],
];


/**
 * ============================================================
 * 4. DATA RUANG
 * ============================================================
 *
 * rooms
 *
 * Menyimpan data awal Ruang yang digunakan untuk menentukan
 * lokasi pelaksanaan perkuliahan pada sebuah Jadwal.
 *
 * Struktur setiap data Ruang:
 *
 * [
 *   nama_ruang,
 *   nama_gedung
 * ]
 *
 * Contoh:
 *
 * [
 *   'Lab Komputer 1',
 *   'Gedung Teknologi Informasi'
 * ]
 *
 * Penjelasan:
 *
 * nama_ruang
 *   Menyimpan nama Ruang atau Laboratorium.
 *
 * nama_gedung
 *   Menyimpan informasi Gedung tempat Ruang berada.
 * ============================================================
 */
export const rooms = [
  [
    'Lab Komputer 1',
    'Gedung Teknologi Informasi',
  ],
  [
    'Lab Komputer 2',
    'Gedung Teknologi Informasi',
  ],
  [
    'Ruang Kuliah A',
    'Gedung Perkuliahan',
  ],
  [
    'Ruang Kuliah B',
    'Gedung Perkuliahan',
  ],
];
