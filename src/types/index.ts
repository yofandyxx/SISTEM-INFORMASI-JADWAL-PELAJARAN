
/**
 
 *
 * Fitur utama:
 *
 * 1. Mendefinisikan empat nama tab navigasi aplikasi.
 * 2. Mendefinisikan struktur data Dosen.
 * 3. Mendefinisikan tipe input tambah/edit Dosen.
 * 4. Mendefinisikan struktur data Mata Kuliah.
 * 5. Mendefinisikan tipe input tambah/edit Mata Kuliah.
 * 6. Mendefinisikan struktur data Kelas.
 * 7. Mendefinisikan struktur data Ruang.
 * 8. Mendefinisikan struktur data Jadwal.
 * 9. Menyediakan property opsional hasil relasi database.
 * 10. Mendefinisikan tipe input tambah/edit Jadwal.
 * 11. Menjaga konsistensi struktur data antarcomponent.
 *
 * Konsep pembelajaran:
 *
 * - TypeScript Type Alias
 * - Type Annotation
 * - String Literal Union Type
 * - Object Type
 * - Number dan String
 * - Utility Type Omit<Type, Keys>
 * - Optional Property (?)
 * - Type Reusability
 * - Type Safety
 * - Data Modeling
 * - Relational Data
 * - Foreign Key Reference
 * - Separation of Concerns
 *
 * ============================================================
 * CATATAN PENTING
 * ============================================================
 *
 * File ini hanya mendefinisikan kontrak tipe data.
 *
 * File ini TIDAK:
 *
 * 1. Membuat tabel SQLite.
 * 2. Menjalankan query SQL.
 * 3. Menyimpan atau menghapus data.
 * 4. Melakukan validasi input saat runtime.
 * 5. Menampilkan antarmuka pengguna.
 *
 * TypeScript memeriksa kesesuaian tipe ketika kode diperiksa
 * atau dikompilasi, bukan sebagai pengganti validasi runtime.
 *
 * ============================================================
 */


/**
 * ============================================================
 * 1. TYPE TAB NAME
 * ============================================================
 *
 * TabName digunakan untuk membatasi nama halaman utama
 * yang dapat dipilih pada navigasi aplikasi.
 *
 * Konsep:
 *
 * STRING LITERAL UNION TYPE
 *
 * Simbol "|" berarti nilai dapat berupa salah satu
 * pilihan yang telah ditentukan.
 *
 * Pilihan yang diperbolehkan:
 *
 * Dashboard
 * Jadwal
 * Master
 * Cari
 *
 * Contoh penggunaan:
 *
 * const tab: TabName = 'Dashboard';
 *
 * Nilai selain empat pilihan tersebut akan ditolak
 * oleh pemeriksaan tipe TypeScript.
 *
 * Pada Project 02, perpindahan tab dikelola menggunakan
 * React State dan Conditional Rendering pada App.tsx.
 * ============================================================
 */

export type TabName =
  | 'Dashboard'
  | 'Jadwal'
  | 'Master'
  | 'Cari';


/**
 * ============================================================
 * 2. TYPE TEACHER
 * ============================================================
 *
 * Teacher mendefinisikan struktur satu record Dosen.
 *
 * Property:
 *
 * id
 *   Nomor identitas unik record Dosen.
 *
 * code
 *   Kode Dosen.
 *
 * name
 *   Nama lengkap Dosen.
 *
 * expertise
 *   Bidang keahlian Dosen.
 *
 * Konsep pembelajaran:
 *
 * - Object Type
 * - Property
 * - Type Annotation
 * - Data Master
 *
 * Teacher digunakan sebagai kontrak data Dosen
 * pada komponen, state, dan fungsi database.
 * ============================================================
 */

export type Teacher = {
  id: number;
  code: string;
  name: string;
  expertise: string;
};


/**
 * ============================================================
 * 3. TYPE TEACHER INPUT
 * ============================================================
 *
 * TeacherInput mendefinisikan data yang dikirim ketika
 * pengguna menambah atau mengubah Dosen.
 *
 * TeacherInput dibuat dari Teacher menggunakan:
 *
 * Omit<Type, Keys>
 *
 * Omit digunakan untuk menghilangkan property tertentu
 * dari suatu tipe.
 *
 * Struktur Teacher:
 *
 * Teacher
 * |
 * +-- id
 * +-- code
 * +-- name
 * +-- expertise
 *
 *          |
 *          v
 *
 *      Omit<'id'>
 *
 *          |
 *          v
 *
 * TeacherInput
 * |
 * +-- code
 * +-- name
 * +-- expertise
 *
 * Property id tidak dimasukkan ke dalam tipe input
 * karena identitas record dikelola secara terpisah.
 *
 * Keuntungan:
 *
 * - Menghindari pengulangan definisi property.
 * - Menjaga konsistensi antara Teacher dan TeacherInput.
 * - Mempermudah pemeliharaan tipe data.
 *
 * ============================================================
 */

export type TeacherInput = Omit<
  Teacher,
  'id'
>;


/**
 * ============================================================
 * 4. TYPE SUBJECT
 * ============================================================
 *
 * Subject mendefinisikan struktur data Mata Kuliah.
 *
 * Property:
 *
 * id
 *   Identitas unik record Mata Kuliah.
 *
 * code
 *   Kode Mata Kuliah.
 *
 * name
 *   Nama Mata Kuliah.
 *
 * color
 *   Warna identitas visual Mata Kuliah.
 *
 * Property color digunakan untuk membantu membedakan
 * kartu Jadwal berdasarkan Mata Kuliah.
 *
 * Konsep pembelajaran:
 *
 * - Master Data
 * - Object Type
 * - Visual Data Attribute
 * - Reusable Type
 *
 * ============================================================
 */

export type Subject = {
  id: number;
  code: string;
  name: string;
  color: string;
};


/**
 * ============================================================
 * 5. TYPE SUBJECT INPUT
 * ============================================================
 *
 * SubjectInput digunakan pada proses tambah dan edit
 * data Mata Kuliah.
 *
 * Tipe ini diperoleh dari Subject dengan menghilangkan id.
 *
 * Struktur awal:
 *
 * Subject
 * |
 * +-- id
 * +-- code
 * +-- name
 * +-- color
 *
 *          |
 *          v
 *
 *      Omit<'id'>
 *
 *          |
 *          v
 *
 * SubjectInput
 * |
 * +-- code
 * +-- name
 * +-- color
 *
 * Dengan Omit, struktur input tetap mengikuti
 * definisi utama Subject.
 *
 * ============================================================
 */

export type SubjectInput = Omit<
  Subject,
  'id'
>;


/**
 * ============================================================
 * 6. TYPE SCHOOL CLASS
 * ============================================================
 *
 * SchoolClass mendefinisikan struktur data Kelas.
 *
 * Property:
 *
 * id
 *   Identitas unik Kelas.
 *
 * name
 *   Nama Kelas.
 *
 * program
 *   Nama Program Studi yang terkait dengan Kelas.
 *
 * Contoh informasi Kelas:
 *
 * Nama Kelas   : TRK-4A
 * Program      : Teknologi Rekayasa Komputer
 *
 * Pada Project 02, Kelas digunakan sebagai master
 * referensi ketika pengguna membuat Jadwal.
 *
 * File ini tidak mendefinisikan SchoolClassInput karena
 * Project 02 tidak menyediakan CRUD Kelas pada layar
 * Master Data.
 *
 * ============================================================
 */

export type SchoolClass = {
  id: number;
  name: string;
  program: string;
};


/**
 * ============================================================
 * 7. TYPE ROOM
 * ============================================================
 *
 * Room mendefinisikan struktur data Ruang.
 *
 * Property:
 *
 * id
 *   Identitas unik Ruang.
 *
 * name
 *   Nama Ruang.
 *
 * building
 *   Nama Gedung tempat Ruang berada.
 *
 * Contoh informasi Ruang:
 *
 * Nama Ruang : Lab Komputer 1
 * Gedung     : Gedung Teknologi Informasi
 *
 * Data Ruang digunakan sebagai referensi pada form
 * tambah dan edit Jadwal.
 *
 * Room juga berperan dalam pemeriksaan konflik.
 * Ruang yang sama tidak boleh digunakan oleh dua
 * Jadwal pada hari dan waktu yang bertumpang tindih.
 *
 * Pemeriksaan konflik dilakukan oleh logika aplikasi
 * dan database, bukan oleh definisi tipe Room.
 *
 * ============================================================
 */

export type Room = {
  id: number;
  name: string;
  building: string;
};


/**
 * ============================================================
 * 8. TYPE SCHEDULE
 * ============================================================
 *
 * Schedule merupakan tipe data utama untuk satu Jadwal
 * Pelajaran atau Perkuliahan.
 *
 * Schedule menghubungkan empat master data:
 *
 * 1. Teacher
 * 2. Subject
 * 3. SchoolClass
 * 4. Room
 *
 * Hubungan data:
 *
 * TEACHER -----------+
 *                    |
 * SUBJECT -----------+
 *                    |
 * SCHOOL CLASS ------+----> SCHEDULE
 *                    |
 * ROOM --------------+
 *
 * ============================================================
 * KELOMPOK PROPERTY
 * ============================================================
 *
 * A. DATA UTAMA
 *
 * id
 * day
 * start_time
 * end_time
 * teacher_id
 * subject_id
 * class_id
 * room_id
 *
 * B. DATA TAMBAHAN HASIL RELASI
 *
 * teacher_name
 * subject_name
 * subject_color
 * class_name
 * room_name
 *
 * Property kelompok B menggunakan tanda "?".
 *
 * Tanda tersebut berarti property bersifat optional.
 *
 * Informasi tambahan dapat diperoleh melalui relasi
 * data, misalnya menggunakan SQL JOIN.
 *
 * ============================================================
 * KONSEP RELATIONAL DATA
 * ============================================================
 *
 * Schedule menyimpan referensi ID ke master data.
 *
 * Contoh:
 *
 * teacher_id = 1
 *
 * Nilai tersebut mengacu pada record Dosen
 * dengan id = 1.
 *
 * Nama Dosen dapat diperoleh melalui relasi
 * dengan tabel teachers.
 *
 * Dengan cara ini nama Dosen tidak perlu disalin
 * berulang kali ke setiap record Jadwal.
 *
 * ============================================================
 */

export type Schedule = {

  /**
   * ========================================================
   * PRIMARY IDENTIFIER
   * ========================================================
   *
   * ID unik record Jadwal.
   *
   * Digunakan untuk mengidentifikasi Jadwal tertentu,
   * termasuk ketika melakukan edit atau hapus.
   */

  id: number;


  /**
   * ========================================================
   * DAY
   * ========================================================
   *
   * Hari pelaksanaan Jadwal.
   *
   * Contoh:
   *
   * Senin
   * Selasa
   * Rabu
   *
   * Tipe string tidak otomatis membatasi nilai hari.
   * Pilihan hari dikendalikan oleh logika form aplikasi.
   */

  day: string;


  /**
   * ========================================================
   * START TIME
   * ========================================================
   *
   * Waktu mulai Jadwal.
   *
   * Contoh:
   *
   * 08:00
   *
   * Aplikasi menggunakan representasi HH:mm.
   *
   * TypeScript hanya memastikan nilainya string,
   * bukan memvalidasi format waktu secara otomatis.
   */

  start_time: string;


  /**
   * ========================================================
   * END TIME
   * ========================================================
   *
   * Waktu selesai Jadwal.
   *
   * Contoh:
   *
   * 09:40
   *
   * Pada form Jadwal, jam selesai harus lebih besar
   * daripada jam mulai.
   *
   * Aturan tersebut diperiksa oleh logika form,
   * bukan oleh tipe string ini.
   */

  end_time: string;


  /**
   * ========================================================
   * FOREIGN KEY REFERENCE - TEACHER
   * ========================================================
   *
   * ID Dosen yang mengajar pada Jadwal.
   *
   * Menghubungkan Jadwal dengan master Dosen.
   */

  teacher_id: number;


  /**
   * ========================================================
   * FOREIGN KEY REFERENCE - SUBJECT
   * ========================================================
   *
   * ID Mata Kuliah pada Jadwal.
   *
   * Menghubungkan Jadwal dengan master Mata Kuliah.
   */

  subject_id: number;


  /**
   * ========================================================
   * FOREIGN KEY REFERENCE - CLASS
   * ========================================================
   *
   * ID Kelas yang mengikuti perkuliahan.
   *
   * Menghubungkan Jadwal dengan master Kelas.
   */

  class_id: number;


  /**
   * ========================================================
   * FOREIGN KEY REFERENCE - ROOM
   * ========================================================
   *
   * ID Ruang tempat perkuliahan berlangsung.
   *
   * Menghubungkan Jadwal dengan master Ruang.
   */

  room_id: number;


  /**
   * ========================================================
   * OPTIONAL PROPERTIES
   * ========================================================
   *
   * Property berikut menggunakan simbol "?".
   *
   * Contoh:
   *
   * teacher_name?: string
   *
   * Artinya object Schedule boleh memiliki atau tidak
   * memiliki property teacher_name.
   *
   * Property ini membantu menampilkan data Jadwal
   * yang lebih mudah dibaca pengguna.
   *
   * Contohnya:
   *
   * teacher_id   = 1
   * teacher_name = Nama Dosen
   *
   * Data nama dapat diperoleh melalui SQL JOIN.
   *
   * ========================================================
   */


  /**
   * Nama Dosen yang diperoleh dari data relasi.
   */

  teacher_name?: string;


  /**
   * Nama Mata Kuliah yang diperoleh dari data relasi.
   */

  subject_name?: string;


  /**
   * Warna identitas Mata Kuliah.
   *
   * Dapat digunakan oleh ScheduleCard untuk
   * membedakan tampilan setiap Mata Kuliah.
   */

  subject_color?: string;


  /**
   * Nama Kelas yang diperoleh dari data relasi.
   */

  class_name?: string;


  /**
   * Nama Ruang yang diperoleh dari data relasi.
   */

  room_name?: string;
};


/**
 * ============================================================
 * 9. TYPE SCHEDULE INPUT
 * ============================================================
 *
 * ScheduleInput mendefinisikan data yang diperlukan
 * untuk menambah atau memperbarui Jadwal.
 *
 * Tipe ini dibuat menggunakan utility type Omit.
 *
 * ============================================================
 * PROPERTY YANG DIHILANGKAN
 * ============================================================
 *
 * 1. id
 * 2. teacher_name
 * 3. subject_name
 * 4. subject_color
 * 5. class_name
 * 6. room_name
 *
 * id tidak menjadi bagian dari object input.
 *
 * Informasi nama dan warna hasil relasi juga tidak
 * diperlukan ketika menyimpan referensi Jadwal.
 *
 * ============================================================
 * PROPERTY YANG DIPERTAHANKAN
 * ============================================================
 *
 * 1. day
 * 2. start_time
 * 3. end_time
 * 4. teacher_id
 * 5. subject_id
 * 6. class_id
 * 7. room_id
 *
 * ============================================================
 * ALUR DATA
 * ============================================================
 *
 * USER MEMILIH DATA PADA FORM
 *              |
 *              v
 *       ScheduleInput
 *              |
 *              v
 *    VALIDASI DAN CEK KONFLIK
 *              |
 *              v
 *        DATABASE SQLite
 *              |
 *              v
 *       DATA HASIL RELASI
 *              |
 *              v
 *          Schedule
 *              |
 *              v
 *        ScheduleCard
 *
 * ============================================================
 * KONSEP PEMBELAJARAN
 * ============================================================
 *
 * - Utility Type
 * - Type Derivation
 * - Data Transfer Object
 * - Relational Data
 * - Separation of Concerns
 * - Reusable Data Contract
 *
 * ScheduleInput hanya mendefinisikan bentuk data.
 * Proses validasi dan penyimpanan dilakukan
 * pada bagian aplikasi lainnya.
 *
 * ============================================================
 */

export type ScheduleInput = Omit<
  Schedule,
  | 'id'
  | 'teacher_name'
  | 'subject_name'
  | 'subject_color'
  | 'class_name'
  | 'room_name'
>;
