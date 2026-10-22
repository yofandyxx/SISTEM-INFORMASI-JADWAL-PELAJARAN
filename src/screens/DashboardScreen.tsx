/**
 
 * Fitur utama:
 *
 * 1. Menampilkan Header aplikasi.
 * 2. Menampilkan informasi Program Studi.
 * 3. Menampilkan Semester aktif.
 * 4. Menghitung Total Jadwal.
 * 5. Menghitung jumlah Kelas Aktif.
 * 6. Menghitung jumlah Ruang yang digunakan.
 * 7. Memfilter Jadwal berdasarkan hari.
 * 8. Menampilkan Jadwal Hari Ini.
 * 9. Menggunakan reusable component Header.
 * 10. Menggunakan reusable component Stat.
 * 11. Menggunakan reusable component ScheduleCard.
 *
 * Konsep pembelajaran:
 *
 * - React Functional Component
 * - TypeScript Props
 * - Array
 * - Array filter()
 * - Array map()
 * - JavaScript Set
 * - Derived Data
 * - Reusable Component
 * - Component Composition
 * - Dynamic Data
 * - StyleSheet

/**
 * ============================================================
 * IMPORT
 * ============================================================
 *
 * React
 *   Digunakan untuk membangun Functional Component.
 *
 * ScrollView
 *   Container yang memungkinkan halaman digulir.
 *
 * StyleSheet
 *   Digunakan untuk mendefinisikan style.
 *
 * Text dan View
 *   Komponen dasar antarmuka React Native.
 * ============================================================
 */
import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


/**
 * ============================================================
 * IMPORT REUSABLE UI COMPONENT
 * ============================================================
 *
 * C
 *   Kumpulan konstanta warna aplikasi.
 *
 * Header
 *   Komponen reusable untuk menampilkan Header screen.
 *
 * Stat
 *   Komponen reusable untuk menampilkan kartu statistik.
 * ============================================================
 */
import {
  C,
  Header,
  Stat,
} from '../components/UI';


/**
 * ============================================================
 * IMPORT SCHEDULE CARD
 * ============================================================
 *
 * ScheduleCard digunakan untuk menampilkan informasi
 * sebuah Jadwal dalam bentuk kartu.
 * ============================================================
 */
import ScheduleCard from '../components/ScheduleCard';


/**
 * ============================================================
 * IMPORT TYPESCRIPT TYPE
 * ============================================================
 *
 * Schedule merupakan TypeScript type yang menentukan
 * struktur sebuah data Jadwal.
 * ============================================================
 */
import {
  Schedule,
} from '../types';


/**
 * ============================================================
 * COMPONENT UTAMA - DASHBOARD
 * ============================================================
 *
 * Dashboard()
 *
 * Component ini menerima seluruh data Jadwal melalui props:
 *
 * schedules: Schedule[]
 *
 * Data tersebut kemudian digunakan untuk:
 *
 * 1. Menghitung Total Jadwal.
 * 2. Menghitung Kelas Aktif.
 * 3. Menghitung Ruang yang digunakan.
 * 4. Memfilter Jadwal Hari Ini.
 * 5. Menampilkan ScheduleCard.
 *
 * Alur sederhana:
 *
 * schedules[]
 *      ↓
 * Dashboard
 *      ↓
 * ┌─────────────────────────────┐
 * │ Statistik                   │
 * │ - Total Jadwal              │
 * │ - Kelas Aktif               │
 * │ - Ruang                     │
 * └─────────────────────────────┘
 *      ↓
 * Filter berdasarkan Hari
 *      ↓
 * ScheduleCard
 * ============================================================
 */
export default function Dashboard({
  schedules,
}: {
  schedules: Schedule[];
}) {

  /**
   * ==========================================================
   * MENENTUKAN HARI YANG DITAMPILKAN
   * ==========================================================
   *
   * Variabel today digunakan sebagai acuan untuk
   * menampilkan Jadwal Hari Ini.
   *
   * Pada implementasi saat ini nilai hari ditetapkan:
   *
   * 'Senin'
   *
   * Nilai ini kemudian digunakan pada proses filter().
   * ==========================================================
   */
  const today = 'Senin';


  /**
   * ==========================================================
   * FILTER JADWAL HARI INI
   * ==========================================================
   *
   * filter() digunakan untuk mengambil Jadwal yang
   * nilai item.day sama dengan nilai today.
   *
   * Contoh:
   *
   * today = 'Senin'
   *
   * schedules[]
   *      ↓
   * filter()
   *      ↓
   * item.day === 'Senin'
   *      ↓
   * list[]
   *
   * Hanya Jadwal hari Senin yang masuk ke dalam list.
   * ==========================================================
   */
  const list =
    schedules.filter(
      (item) =>
        item.day === today
    );


  /**
   * ==========================================================
   * RENDER DASHBOARD
   * ==========================================================
   */
  return (
    <ScrollView
      contentContainerStyle={styles.wrap}
    >

      {/**
       * ======================================================
       * HEADER APLIKASI
       * ======================================================
       *
       * Menggunakan reusable component Header dari UI.tsx.
       * ======================================================
       */}
      <Header
        title="PPNP Schedule"
        subtitle="Sistem Informasi Jadwal Pelajaran"
      />


      {/**
       * ======================================================
       * HERO / INFORMASI PROGRAM STUDI
       * ======================================================
       *
       * Bagian Hero memberikan identitas utama Dashboard.
       *
       * Informasi:
       *
       * - TRK
       * - Semester Ganjil 2026/2027
       * - Teknologi Rekayasa Komputer
       * - Deskripsi singkat aplikasi
       * ======================================================
       */}
      <View style={styles.hero}>

        {/**
         * Label singkat Program Studi.
         */}
        <View style={styles.heroIcon}>

          <Text style={styles.heroIconText}>
            TRK
          </Text>

        </View>


        {/**
         * Informasi Semester.
         */}
        <Text style={styles.heroSmall}>
          SEMESTER GANJIL 2026/2027
        </Text>


        {/**
         * Nama Program Studi.
         */}
        <Text style={styles.heroTitle}>
          Teknologi Rekayasa Komputer
        </Text>


        {/**
         * Deskripsi singkat aplikasi.
         */}
        <Text style={styles.heroSub}>
          Kelola jadwal, ruang, kelas, dan dosen dalam satu aplikasi.
        </Text>

      </View>


      {/**
       * ======================================================
       * STATISTIK DASHBOARD
       * ======================================================
       *
       * Terdapat tiga informasi statistik:
       *
       * 1. Total Jadwal
       * 2. Kelas Aktif
       * 3. Ruang
       *
       * Ketiganya menggunakan reusable component Stat.
       * ======================================================
       */}
      <View style={styles.stats}>

        {/**
         * ====================================================
         * STATISTIK 1 - TOTAL JADWAL
         * ====================================================
         *
         * schedules.length menghitung seluruh jumlah
         * data Jadwal yang diterima Dashboard.
         *
         * schedules[]
         *      ↓
         * .length
         *      ↓
         * Total Jadwal
         * ====================================================
         */}
        <Stat
          icon="calendar-number-outline"
          value={schedules.length}
          label="Total Jadwal"
          backgroundColor={C.blueSoft}
          iconBackgroundColor="#D7E5FF"
          iconColor={C.blue}
        />


        {/**
         * ====================================================
         * STATISTIK 2 - KELAS AKTIF
         * ====================================================
         *
         * Proses:
         *
         * schedules
         *      ↓
         * map(item => item.class_id)
         *      ↓
         * Array class_id
         *      ↓
         * new Set(...)
         *      ↓
         * ID Kelas unik
         *      ↓
         * .size
         *      ↓
         * Jumlah Kelas Aktif
         *
         * Set digunakan karena satu Kelas dapat muncul
         * pada beberapa Jadwal.
         *
         * Set menghilangkan nilai class_id yang sama.
         * ====================================================
         */}
        <Stat
          icon="people-circle-outline"
          value={
            new Set(
              schedules.map(
                (item) =>
                  item.class_id
              )
            ).size
          }
          label="Kelas Aktif"
          backgroundColor={C.orangeSoft}
          iconBackgroundColor="#FFE0C2"
          iconColor={C.orange}
        />


        {/**
         * ====================================================
         * STATISTIK 3 - RUANG
         * ====================================================
         *
         * Proses:
         *
         * schedules
         *      ↓
         * map(item => item.room_id)
         *      ↓
         * Array room_id
         *      ↓
         * new Set(...)
         *      ↓
         * ID Ruang unik
         *      ↓
         * .size
         *      ↓
         * Jumlah Ruang
         *
         * Jika satu Ruang digunakan pada banyak Jadwal,
         * Ruang tersebut tetap dihitung satu kali.
         * ====================================================
         */}
        <Stat
          icon="business-outline"
          value={
            new Set(
              schedules.map(
                (item) =>
                  item.room_id
              )
            ).size
          }
          label="Ruang"
          backgroundColor={C.tealSoft}
          iconBackgroundColor="#CDEDE8"
          iconColor={C.teal}
        />

      </View>


      {/**
       * ======================================================
       * SECTION - JADWAL HARI INI
       * ======================================================
       *
       * Menampilkan:
       *
       * Judul : Jadwal Hari Ini
       * Badge : nilai dari variabel today
       *
       * Pada program saat ini:
       *
       * today = 'Senin'
       * ======================================================
       */}
      <View style={styles.section}>

        <Text style={styles.h2}>
          Jadwal Hari Ini
        </Text>


        <Text style={styles.badge}>
          {today}
        </Text>

      </View>


      {/**
       * ======================================================
       * MENAMPILKAN DAFTAR JADWAL
       * ======================================================
       *
       * list merupakan hasil filter Jadwal berdasarkan
       * nilai today.
       *
       * map() melakukan perulangan terhadap list.
       *
       * Setiap item kemudian dikirim ke reusable component:
       *
       * ScheduleCard
       *
       * melalui props:
       *
       * item={item}
       *
       * key={item.id}
       *
       * digunakan React sebagai identitas unik setiap
       * component dalam sebuah list.
       * ======================================================
       */}
      {list.map((item) => (

        <ScheduleCard
          key={item.id}
          item={item}
        />

      ))}

    </ScrollView>
  );
}


/**
 * ============================================================
 * STYLES
 * ============================================================
 *
 * StyleSheet.create() digunakan untuk mengelompokkan seluruh
 * style yang digunakan pada DashboardScreen.
 *
 * Pemisahan antara JSX dan StyleSheet membuat kode:
 *
 * - lebih rapi;
 * - lebih mudah dibaca;
 * - lebih mudah dipelihara;
 * - lebih mudah digunakan sebagai bahan pembelajaran.
 * ============================================================
 */
const styles = StyleSheet.create({

  /**
   * ==========================================================
   * SCREEN CONTAINER
   * ==========================================================
   *
   * wrap merupakan container utama Dashboard.
   *
   * paddingBottom memberikan ruang tambahan pada bagian bawah,
   * terutama ketika aplikasi menggunakan navigasi bawah.
   * ==========================================================
   */
  wrap: {
    paddingBottom: 100,
    backgroundColor: C.bg,
    minHeight: '100%',
  },


  /**
   * ==========================================================
   * HERO
   * ==========================================================
   *
   * Card utama yang menampilkan identitas Program Studi
   * dan informasi singkat aplikasi.
   * ==========================================================
   */
  hero: {
    marginHorizontal: 20,
    backgroundColor: C.maroon,
    borderRadius: 26,
    padding: 22,
    overflow: 'hidden',
  },


  /**
   * Label TRK pada bagian Hero.
   */
  heroIcon: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.14)',
    marginBottom: 13,
  },


  /**
   * Teks TRK.
   */
  heroIconText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1,
  },


  /**
   * Teks Semester.
   */
  heroSmall: {
    fontSize: 10,
    fontWeight: '800',
    color: '#F3C8D3',
    letterSpacing: 1,
  },


  /**
   * Judul Program Studi.
   */
  heroTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
    maxWidth: 310,
  },


  /**
   * Deskripsi singkat pada Hero.
   */
  heroSub: {
    fontSize: 12,
    lineHeight: 18,
    color: '#F6DEE4',
    marginTop: 8,
    maxWidth: 290,
  },


  /**
   * ==========================================================
   * STATISTICS CONTAINER
   * ==========================================================
   *
   * flexDirection: 'row'
   *
   * membuat tiga kartu statistik ditampilkan
   * secara horizontal.
   * ==========================================================
   */
  stats: {
    flexDirection: 'row',
    gap: 9,
    margin: 20,
  },


  /**
   * ==========================================================
   * SECTION HEADER
   * ==========================================================
   *
   * Digunakan untuk menempatkan:
   *
   * "Jadwal Hari Ini"     "Senin"
   *
   * pada sisi kiri dan kanan.
   * ==========================================================
   */
  section: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  /**
   * Judul section.
   */
  h2: {
    fontSize: 17,
    fontWeight: '800',
    color: C.text,
  },


  /**
   * ==========================================================
   * BADGE HARI
   * ==========================================================
   *
   * Menampilkan nilai variabel today dalam bentuk badge.
   * ==========================================================
   */
  badge: {
    fontSize: 11,
    fontWeight: '800',
    color: C.maroon,
    backgroundColor: C.maroonSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

});
