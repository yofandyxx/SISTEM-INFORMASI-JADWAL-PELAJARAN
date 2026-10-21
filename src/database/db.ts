/**
 * ============================================================
 * PROJECT 02 - SISTEM INFORMASI JADWAL PELAJARAN
 * File        : db.ts
 * Lokasi file : src/database/db.ts
 * Fungsi      : Mengelola database lokal SQLite aplikasi.
 * Dibuat oleh : Amrizal, S.Kom., M.Kom.
 * ============================================================
 *
 * File ini bertanggung jawab terhadap:
 *
 * 1. Membuka database SQLite.
 * 2. Membuat tabel database.
 * 3. Mengaktifkan Foreign Key.
 * 4. Mengisi data awal / seed.
 * 5. Membaca data master.
 * 6. CRUD Data Dosen.
 * 7. CRUD Mata Kuliah.
 * 8. Membaca Jadwal menggunakan JOIN.
 * 9. Memeriksa bentrok jadwal.
 * 10. Menambah, mengubah, dan menghapus Jadwal.
 *
 * Tabel yang digunakan:
 *
 * teachers
 * subjects
 * classes
 * rooms
 * schedules
 *
 * Relasi utama:
 *
 * teachers  ─┐
 * subjects  ─┤
 * classes   ─┼──> schedules
 * rooms     ─┘
 *
 * Konsep pembelajaran:
 *
 * - SQLite
 * - Relational Database
 * - Primary Key
 * - Foreign Key
 * - Seed Data
 * - CRUD
 * - SQL JOIN
 * - Parameterized Query
 * - Data Integrity
 * - Conflict Detection
 * - TypeScript Generic
 *
 */


// ============================================================
// IMPORT
// ============================================================

// Library SQLite dari Expo.
// Digunakan untuk membuat dan mengakses database lokal.
import * as SQLite from 'expo-sqlite';


// Data awal / seed untuk mengisi tabel master.
import {
  classes,
  rooms,
  subjects,
  teachers,
} from '../data/seed';


// Type TypeScript yang digunakan oleh fungsi database.
import {
  Room,
  Schedule,
  ScheduleInput,
  SchoolClass,
  Subject,
  SubjectInput,
  Teacher,
  TeacherInput,
} from '../types';


// ============================================================
// MEMBUKA DATABASE
// ============================================================

/**
 * Membuka database SQLite secara synchronous.
 *
 * Jika file database belum tersedia, SQLite akan membuatnya.
 *
 * Nama database:
 *
 * ppnp_schedule.db
 */
const db = SQLite.openDatabaseSync(
  'ppnp_schedule.db'
);


// ============================================================
// INISIALISASI DATABASE
// ============================================================

/**
 * initDatabase()
 *
 * Fungsi ini dijalankan untuk menyiapkan struktur database.
 *
 * Proses:
 *
 * 1. Mengaktifkan Foreign Key.
 * 2. Membuat tabel teachers.
 * 3. Membuat tabel subjects.
 * 4. Membuat tabel classes.
 * 5. Membuat tabel rooms.
 * 6. Membuat tabel schedules.
 * 7. Memeriksa apakah database masih kosong.
 * 8. Mengisi seed data jika database masih kosong.
 */
export function initDatabase() {

  // ==========================================================
  // MEMBUAT STRUKTUR DATABASE
  // ==========================================================

  db.execSync(`
    PRAGMA foreign_keys = ON;


    -- ========================================================
    -- TABEL TEACHERS
    -- Menyimpan master data Dosen.
    -- ========================================================

    CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      expertise TEXT NOT NULL
    );


    -- ========================================================
    -- TABEL SUBJECTS
    -- Menyimpan master data Mata Kuliah.
    -- ========================================================

    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      color TEXT NOT NULL
    );


    -- ========================================================
    -- TABEL CLASSES
    -- Menyimpan master data Kelas.
    -- ========================================================

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      program TEXT NOT NULL
    );


    -- ========================================================
    -- TABEL ROOMS
    -- Menyimpan master data Ruang.
    -- ========================================================

    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      building TEXT NOT NULL
    );


    -- ========================================================
    -- TABEL SCHEDULES
    -- Menyimpan transaksi / data Jadwal.
    --
    -- Tabel ini memiliki Foreign Key yang menghubungkan:
    --
    -- teacher_id -> teachers.id
    -- subject_id -> subjects.id
    -- class_id   -> classes.id
    -- room_id    -> rooms.id
    -- ========================================================

    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      day TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,

      teacher_id INTEGER NOT NULL,
      subject_id INTEGER NOT NULL,
      class_id INTEGER NOT NULL,
      room_id INTEGER NOT NULL,

      FOREIGN KEY (teacher_id)
        REFERENCES teachers(id),

      FOREIGN KEY (subject_id)
        REFERENCES subjects(id),

      FOREIGN KEY (class_id)
        REFERENCES classes(id),

      FOREIGN KEY (room_id)
        REFERENCES rooms(id)
    );
  `);


  // ==========================================================
  // MEMERIKSA APAKAH DATABASE MASIH KOSONG
  // ==========================================================

  /**
   * Hitung jumlah record pada tabel teachers.
   *
   * getFirstSync() mengambil satu baris hasil query.
   *
   * Generic:
   *
   * <{ count: number }>
   *
   * memberi tahu TypeScript bahwa hasil query memiliki
   * property count bertipe number.
   */
  const teacherCount =
    db.getFirstSync<{ count: number }>(
      `
        SELECT COUNT(*) AS count
        FROM teachers
      `
    )?.count ?? 0;


  /**
   * Seed hanya dimasukkan jika tabel teachers masih kosong.
   *
   * Tujuannya agar data awal tidak dimasukkan berulang kali
   * setiap aplikasi dijalankan.
   */
  if (teacherCount === 0) {

    // ========================================================
    // SEED DATA DOSEN
    // ========================================================

    teachers.forEach((item) => {

      db.runSync(
        `
          INSERT INTO teachers(
            code,
            name,
            expertise
          )
          VALUES (?, ?, ?)
        `,
        ...item
      );

    });


    // ========================================================
    // SEED DATA MATA KULIAH
    // ========================================================

    subjects.forEach((item) => {

      db.runSync(
        `
          INSERT INTO subjects(
            code,
            name,
            color
          )
          VALUES (?, ?, ?)
        `,
        ...item
      );

    });


    // ========================================================
    // SEED DATA KELAS
    // ========================================================

    classes.forEach((item) => {

      db.runSync(
        `
          INSERT INTO classes(
            name,
            program
          )
          VALUES (?, ?)
        `,
        ...item
      );

    });


    // ========================================================
    // SEED DATA RUANG
    // ========================================================

    rooms.forEach((item) => {

      db.runSync(
        `
          INSERT INTO rooms(
            name,
            building
          )
          VALUES (?, ?)
        `,
        ...item
      );

    });


    // ========================================================
    // SAMPLE DATA JADWAL
    // ========================================================

    /**
     * Struktur setiap sample jadwal:
     *
     * [
     *   hari,
     *   jam_mulai,
     *   jam_selesai,
     *   teacher_id,
     *   subject_id,
     *   class_id,
     *   room_id
     * ]
     */
    const sampleSchedules = [
      [
        'Senin',
        '08:00',
        '09:40',
        1,
        1,
        1,
        1,
      ],
      [
        'Senin',
        '10:00',
        '11:40',
        3,
        2,
        2,
        2,
      ],
      [
        'Selasa',
        '08:00',
        '09:40',
        2,
        3,
        1,
        3,
      ],
      [
        'Rabu',
        '13:00',
        '14:40',
        4,
        4,
        3,
        1,
      ],
      [
        'Kamis',
        '10:00',
        '11:40',
        1,
        5,
        2,
        4,
      ],
    ];


    // ========================================================
    // INSERT SAMPLE JADWAL
    // ========================================================

    sampleSchedules.forEach((item) => {

      db.runSync(
        `
          INSERT INTO schedules(
            day,
            start_time,
            end_time,
            teacher_id,
            subject_id,
            class_id,
            room_id
          )
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        ...item
      );

    });

  }
}


// ============================================================
// QUERY DASAR JADWAL
// ============================================================

/**
 * scheduleSql
 *
 * Query dasar untuk mengambil Jadwal lengkap.
 *
 * Tabel schedules hanya menyimpan ID relasi seperti:
 *
 * teacher_id
 * subject_id
 * class_id
 * room_id
 *
 * Agar aplikasi dapat menampilkan nama Dosen,
 * Mata Kuliah, Kelas, dan Ruang, digunakan SQL JOIN.
 *
 * Relasi:
 *
 * schedules.teacher_id
 *        ↓
 * teachers.id
 *
 * schedules.subject_id
 *        ↓
 * subjects.id
 *
 * schedules.class_id
 *        ↓
 * classes.id
 *
 * schedules.room_id
 *        ↓
 * rooms.id
 */
const scheduleSql = `
  SELECT
    s.*,

    t.name AS teacher_name,

    m.name AS subject_name,
    m.color AS subject_color,

    c.name AS class_name,

    r.name AS room_name

  FROM schedules s

  JOIN teachers t
    ON t.id = s.teacher_id

  JOIN subjects m
    ON m.id = s.subject_id

  JOIN classes c
    ON c.id = s.class_id

  JOIN rooms r
    ON r.id = s.room_id
`;


// ============================================================
// READ DATA JADWAL
// ============================================================

/**
 * getSchedules()
 *
 * Mengambil seluruh jadwal beserta data hasil JOIN.
 *
 * Jadwal diurutkan berdasarkan:
 *
 * Senin
 * Selasa
 * Rabu
 * Kamis
 * Jumat
 *
 * kemudian berdasarkan jam mulai.
 */
export function getSchedules() {

  return db.getAllSync<Schedule>(
    scheduleSql +
      `
        ORDER BY

          CASE s.day

            WHEN 'Senin' THEN 1
            WHEN 'Selasa' THEN 2
            WHEN 'Rabu' THEN 3
            WHEN 'Kamis' THEN 4
            WHEN 'Jumat' THEN 5

            ELSE 6

          END,

          s.start_time
      `
  );

}


// ============================================================
// READ MASTER DATA DOSEN
// ============================================================

/**
 * Mengambil seluruh Dosen.
 *
 * Data diurutkan berdasarkan nama.
 */
export function getTeachers() {

  return db.getAllSync<Teacher>(
    `
      SELECT *
      FROM teachers
      ORDER BY name
    `
  );

}


// ============================================================
// READ MASTER DATA MATA KULIAH
// ============================================================

/**
 * Mengambil seluruh Mata Kuliah.
 *
 * Data diurutkan berdasarkan nama.
 */
export function getSubjects() {

  return db.getAllSync<Subject>(
    `
      SELECT *
      FROM subjects
      ORDER BY name
    `
  );

}


// ============================================================
// READ MASTER DATA KELAS
// ============================================================

/**
 * Mengambil seluruh Kelas.
 */
export function getClasses() {

  return db.getAllSync<SchoolClass>(
    `
      SELECT *
      FROM classes
      ORDER BY name
    `
  );

}


// ============================================================
// READ MASTER DATA RUANG
// ============================================================

/**
 * Mengambil seluruh Ruang.
 */
export function getRooms() {

  return db.getAllSync<Room>(
    `
      SELECT *
      FROM rooms
      ORDER BY name
    `
  );

}


// ============================================================
// CRUD DATA DOSEN
// ============================================================


// ------------------------------------------------------------
// CREATE DOSEN
// ------------------------------------------------------------

/**
 * addTeacher()
 *
 * Menambahkan Dosen baru.
 *
 * trim() digunakan untuk menghapus spasi yang tidak
 * diperlukan pada awal dan akhir input.
 */
export function addTeacher(
  input: TeacherInput
) {

  return db.runSync(
    `
      INSERT INTO teachers(
        code,
        name,
        expertise
      )
      VALUES (?, ?, ?)
    `,
    input.code.trim(),
    input.name.trim(),
    input.expertise.trim()
  );

}


// ------------------------------------------------------------
// UPDATE DOSEN
// ------------------------------------------------------------

/**
 * updateTeacher()
 *
 * Memperbarui data Dosen berdasarkan ID.
 */
export function updateTeacher(
  id: number,
  input: TeacherInput
) {

  return db.runSync(
    `
      UPDATE teachers

      SET
        code = ?,
        name = ?,
        expertise = ?

      WHERE id = ?
    `,
    input.code.trim(),
    input.name.trim(),
    input.expertise.trim(),
    id
  );

}


// ------------------------------------------------------------
// DELETE DOSEN
// ------------------------------------------------------------

/**
 * deleteTeacher()
 *
 * Sebelum Dosen dihapus, aplikasi memeriksa apakah
 * Dosen tersebut masih digunakan pada tabel schedules.
 *
 * Jika masih digunakan:
 *
 * DELETE DITOLAK.
 *
 * Ini merupakan salah satu bentuk perlindungan
 * integritas data.
 */
export function deleteTeacher(
  id: number
) {

  // Hitung berapa Jadwal menggunakan Dosen tersebut.
  const used =
    db.getFirstSync<{ count: number }>(
      `
        SELECT COUNT(*) AS count
        FROM schedules
        WHERE teacher_id = ?
      `,
      id
    )?.count ?? 0;


  // ----------------------------------------------------------
  // VALIDASI PENGGUNAAN DOSEN
  // ----------------------------------------------------------

  if (used > 0) {

    throw new Error(
      'Dosen tidak dapat dihapus karena sudah digunakan pada jadwal.'
    );

  }


  // Jika tidak digunakan, data boleh dihapus.
  return db.runSync(
    `
      DELETE FROM teachers
      WHERE id = ?
    `,
    id
  );

}


// ============================================================
// CRUD DATA MATA KULIAH
// ============================================================


// ------------------------------------------------------------
// CREATE MATA KULIAH
// ------------------------------------------------------------

/**
 * addSubject()
 *
 * Menambahkan Mata Kuliah baru.
 */
export function addSubject(
  input: SubjectInput
) {

  return db.runSync(
    `
      INSERT INTO subjects(
        code,
        name,
        color
      )
      VALUES (?, ?, ?)
    `,
    input.code.trim(),
    input.name.trim(),
    input.color
  );

}


// ------------------------------------------------------------
// UPDATE MATA KULIAH
// ------------------------------------------------------------

/**
 * updateSubject()
 *
 * Memperbarui data Mata Kuliah berdasarkan ID.
 */
export function updateSubject(
  id: number,
  input: SubjectInput
) {

  return db.runSync(
    `
      UPDATE subjects

      SET
        code = ?,
        name = ?,
        color = ?

      WHERE id = ?
    `,
    input.code.trim(),
    input.name.trim(),
    input.color,
    id
  );

}


// ------------------------------------------------------------
// DELETE MATA KULIAH
// ------------------------------------------------------------

/**
 * deleteSubject()
 *
 * Mata Kuliah tidak boleh dihapus jika masih digunakan
 * oleh data Jadwal.
 */
export function deleteSubject(
  id: number
) {

  // Hitung penggunaan Mata Kuliah pada Jadwal.
  const used =
    db.getFirstSync<{ count: number }>(
      `
        SELECT COUNT(*) AS count
        FROM schedules
        WHERE subject_id = ?
      `,
      id
    )?.count ?? 0;


  // ----------------------------------------------------------
  // VALIDASI PENGGUNAAN MATA KULIAH
  // ----------------------------------------------------------

  if (used > 0) {

    throw new Error(
      'Mata kuliah tidak dapat dihapus karena sudah digunakan pada jadwal.'
    );

  }


  // Jika tidak digunakan, Mata Kuliah boleh dihapus.
  return db.runSync(
    `
      DELETE FROM subjects
      WHERE id = ?
    `,
    id
  );

}


// ============================================================
// VALIDASI BENTROK JADWAL
// ============================================================

/**
 * hasConflict()
 *
 * Memeriksa apakah Jadwal yang akan disimpan memiliki
 * bentrok dengan Jadwal lain.
 *
 * Bentrok diperiksa berdasarkan:
 *
 * 1. Hari yang sama.
 * 2. Rentang waktu saling bertabrakan.
 * 3. Dosen sama, ATAU
 * 4. Kelas sama, ATAU
 * 5. Ruang sama.
 *
 * ignoreId digunakan ketika proses EDIT.
 *
 * Jadwal yang sedang diedit harus diabaikan agar tidak
 * dianggap bentrok dengan dirinya sendiri.
 */
export function hasConflict(
  input: ScheduleInput,
  ignoreId?: number
) {

  const rows =
    db.getAllSync<{ id: number }>(
      `
        SELECT id

        FROM schedules

        WHERE day = ?

          AND id != ?

          AND (
            ? < end_time
            AND
            ? > start_time
          )

          AND (
            teacher_id = ?
            OR class_id = ?
            OR room_id = ?
          )
      `,
      input.day,

      // Jika ignoreId tidak tersedia,
      // gunakan -1 agar tidak cocok dengan ID normal.
      ignoreId ?? -1,

      input.start_time,
      input.end_time,

      input.teacher_id,
      input.class_id,
      input.room_id
    );


  /**
   * Jika query menghasilkan minimal satu record,
   * berarti ditemukan bentrok.
   *
   * true  = bentrok ditemukan
   * false = tidak ada bentrok
   */
  return rows.length > 0;

}


// ============================================================
// CREATE JADWAL
// ============================================================

/**
 * addSchedule()
 *
 * Menambahkan Jadwal baru ke tabel schedules.
 *
 * Data master disimpan menggunakan ID relasi,
 * bukan nama dalam bentuk teks.
 */
export function addSchedule(
  input: ScheduleInput
) {

  return db.runSync(
    `
      INSERT INTO schedules(
        day,
        start_time,
        end_time,
        teacher_id,
        subject_id,
        class_id,
        room_id
      )

      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    input.day,
    input.start_time,
    input.end_time,
    input.teacher_id,
    input.subject_id,
    input.class_id,
    input.room_id
  );

}


// ============================================================
// UPDATE JADWAL
// ============================================================

/**
 * updateSchedule()
 *
 * Memperbarui Jadwal berdasarkan ID.
 */
export function updateSchedule(
  id: number,
  input: ScheduleInput
) {

  return db.runSync(
    `
      UPDATE schedules

      SET
        day = ?,
        start_time = ?,
        end_time = ?,
        teacher_id = ?,
        subject_id = ?,
        class_id = ?,
        room_id = ?

      WHERE id = ?
    `,
    input.day,
    input.start_time,
    input.end_time,
    input.teacher_id,
    input.subject_id,
    input.class_id,
    input.room_id,
    id
  );

}


// ============================================================
// DELETE JADWAL
// ============================================================

/**
 * deleteSchedule()
 *
 * Menghapus Jadwal berdasarkan ID.
 */
export function deleteSchedule(
  id: number
) {

  return db.runSync(
    `
      DELETE FROM schedules
      WHERE id = ?
    `,
    id
  );

}