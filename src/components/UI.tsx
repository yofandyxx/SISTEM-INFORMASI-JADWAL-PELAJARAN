/**
 * ============================================================
 * PROJECT 02 - SISTEM INFORMASI JADWAL PELAJARAN
 * File        : UI.tsx
 * Lokasi file : src/components/UI.tsx
 * Fungsi      : Menyediakan konstanta warna dan beberapa
 *               komponen antarmuka yang dapat digunakan ulang
 *               pada berbagai screen aplikasi.
 * Dibuat oleh : Amrizal, S.Kom., M.Kom.
 *
 * Komponen yang tersedia:
 * 1. C
 *    -> Kumpulan konstanta warna aplikasi.
 *
 * 2. Header
 *    -> Header standar pada halaman aplikasi.
 *
 * 3. Stat
 *    -> Card statistik untuk dashboard.
 *
 * 4. Empty
 *    -> Tampilan ketika data tidak tersedia.
 *
 * 5. Fab
 *    -> Floating Action Button untuk aksi tambah data.
 *
 * Konsep penting:
 * - Reusable Component
 * - Design System sederhana
 * - Shared UI Component
 * - TypeScript Props
 * - Optional Props
 * - Callback Function
 * - Dynamic Style
 * - Nullish Coalescing Operator (??)
 * - Conditional Style
 * - React Native StyleSheet
 * - Expo Vector Icons
 */


// ============================================================
// IMPORT
// ============================================================

// React digunakan untuk membangun komponen React.
import React from 'react';

// Komponen dasar React Native.
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Ionicons digunakan sebagai sumber icon aplikasi.
import { Ionicons } from '@expo/vector-icons';


/**
 * ============================================================
 * COLOR PALETTE / DESIGN SYSTEM
 * ============================================================
 *
 * Object C menyimpan kumpulan warna yang digunakan secara
 * konsisten pada berbagai komponen dan screen aplikasi.
 *
 * Keuntungan menggunakan konstanta warna:
 *
 * 1. Warna tidak perlu ditulis berulang kali.
 * 2. Tampilan aplikasi menjadi lebih konsisten.
 * 3. Perubahan tema lebih mudah dilakukan.
 * 4. Mengurangi kemungkinan perbedaan kode warna.
 *
 * Contoh penggunaan:
 *
 * color: C.maroon
 * backgroundColor: C.maroonSoft
 */
export const C = {

  // ----------------------------------------------------------
  // WARNA UTAMA PROJECT 02
  // ----------------------------------------------------------

  // Warna maroon utama.
  maroon: '#7A1832',

  // Variasi maroon.
  maroon2: '#9B2948',

  // Maroon lembut untuk background.
  maroonSoft: '#F7E9ED',


  // ----------------------------------------------------------
  // WARNA DASAR INTERFACE
  // ----------------------------------------------------------

  // Background utama aplikasi.
  bg: '#F7F5F6',

  // Background card.
  card: '#FFFFFF',

  // Warna teks utama.
  text: '#2B2024',

  // Warna teks sekunder.
  muted: '#776A6F',

  // Warna garis / border.
  line: '#EAE1E4',


  // ----------------------------------------------------------
  // WARNA STATUS DAN AKSEN
  // ----------------------------------------------------------

  // Warna untuk aksi berbahaya seperti Delete.
  danger: '#D64545',

  // Biru.
  blue: '#2F6FED',

  // Background biru lembut.
  blueSoft: '#EAF1FF',

  // Orange.
  orange: '#E67E22',

  // Background orange lembut.
  orangeSoft: '#FFF0E2',

  // Teal.
  teal: '#16857B',

  // Background teal lembut.
  tealSoft: '#E4F5F2',

  // Ungu.
  purple: '#7652B5',

  // Background ungu lembut.
  purpleSoft: '#F0EBFA',

  // Hijau.
  green: '#176B4D',

  // Variasi hijau.
  green2: '#2E8B68',
};


/**
 * ============================================================
 * HEADER COMPONENT
 * ============================================================
 *
 * Header merupakan reusable component untuk menampilkan
 * bagian atas halaman aplikasi.
 *
 * Struktur Header:
 *
 * [Calendar Icon] [Title + Subtitle] [Notification Icon]
 *
 * Props:
 *
 * title
 * -> Judul halaman.
 *
 * subtitle
 * -> Keterangan singkat halaman.
 */
export function Header({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (

    <View style={styles.header}>


      {/* =====================================================
          LOGO / ICON HEADER
          ===================================================== */}
      <View style={styles.logo}>

        <Ionicons
          name="calendar"
          size={25}
          color="#FFFFFF"
        />

      </View>


      {/* =====================================================
          TITLE DAN SUBTITLE
          ===================================================== */}
      <View style={styles.headerText}>

        {/* Judul utama halaman */}
        <Text style={styles.title}>
          {title}
        </Text>


        {/* Subjudul / keterangan halaman */}
        <Text style={styles.sub}>
          {subtitle}
        </Text>

      </View>


      {/* =====================================================
          NOTIFICATION ICON
          ===================================================== */}
      <View style={styles.bell}>

        <Ionicons
          name="notifications-outline"
          size={21}
          color={C.orange}
        />

      </View>

    </View>
  );
}


/**
 * ============================================================
 * STAT COMPONENT
 * ============================================================
 *
 * Stat digunakan untuk menampilkan informasi statistik
 * berbentuk card pada dashboard.
 *
 * Contoh:
 *
 * [Icon]
 *
 * 5
 * Total Jadwal
 *
 * Beberapa warna dibuat optional agar setiap card statistik
 * dapat memiliki identitas visual yang berbeda.
 */
export function Stat({
  icon,
  value,
  label,
  backgroundColor,
  iconColor,
  iconBackgroundColor,
}: {

  /**
   * Nama icon harus berasal dari daftar icon Ionicons
   * yang valid.
   */
  icon: keyof typeof Ionicons.glyphMap;

  // Nilai statistik dapat berupa number atau string.
  value: number | string;

  // Label / keterangan statistik.
  label: string;

  // Background card bersifat optional.
  backgroundColor?: string;

  // Warna icon bersifat optional.
  iconColor?: string;

  // Background icon bersifat optional.
  iconBackgroundColor?: string;
}) {
  return (

    <View
      style={[
        styles.stat,

        /**
         * Jika backgroundColor diberikan oleh parent,
         * gunakan warna tersebut.
         *
         * Jika tidak diberikan, tidak ada dynamic style
         * tambahan yang digunakan.
         */
        backgroundColor
          ? { backgroundColor }
          : null,
      ]}
    >


      {/* =====================================================
          ICON STATISTIK
          ===================================================== */}
      <View
        style={[
          styles.statIcon,

          /**
           * Background icon dapat ditentukan dari parent.
           */
          iconBackgroundColor
            ? {
                backgroundColor:
                  iconBackgroundColor,
              }
            : null,
        ]}
      >

        <Ionicons
          name={icon}
          size={20}

          /**
           * Jika iconColor tidak tersedia,
           * gunakan C.maroon sebagai warna default.
           */
          color={iconColor ?? C.maroon}
        />

      </View>


      {/* =====================================================
          NILAI STATISTIK
          ===================================================== */}
      <Text style={styles.value}>
        {value}
      </Text>


      {/* =====================================================
          LABEL STATISTIK
          ===================================================== */}
      <Text style={styles.label}>
        {label}
      </Text>

    </View>
  );
}


/**
 * ============================================================
 * EMPTY STATE COMPONENT
 * ============================================================
 *
 * Empty digunakan ketika suatu halaman atau daftar
 * tidak memiliki data untuk ditampilkan.
 *
 * Contoh penggunaan:
 *
 * <Empty text="Belum ada jadwal." />
 *
 * Dengan reusable component ini, tampilan empty state
 * dapat dibuat konsisten pada berbagai halaman.
 */
export function Empty({
  text,
}: {
  text: string;
}) {
  return (

    <View style={styles.empty}>


      {/* Icon kondisi data kosong */}
      <Ionicons
        name="calendar-outline"
        size={42}
        color="#B79AA4"
      />


      {/* Pesan kepada pengguna */}
      <Text style={styles.emptyText}>
        {text}
      </Text>

    </View>
  );
}


/**
 * ============================================================
 * FLOATING ACTION BUTTON (FAB)
 * ============================================================
 *
 * Fab merupakan tombol aksi yang berada mengambang
 * pada bagian kanan bawah layar.
 *
 * Pada aplikasi ini FAB umumnya digunakan untuk membuka
 * proses penambahan data baru.
 *
 * Props:
 *
 * onPress
 * -> Callback yang dijalankan ketika tombol ditekan.
 */
export function Fab({
  onPress,
}: {
  onPress: () => void;
}) {
  return (

    <Pressable
      onPress={onPress}
      style={styles.fab}
    >

      {/* Icon tambah */}
      <Ionicons
        name="add"
        size={28}
        color="#FFFFFF"
      />

    </Pressable>
  );
}


/**
 * ============================================================
 * STYLE
 * ============================================================
 *
 * StyleSheet menyimpan seluruh aturan tampilan untuk
 * komponen-komponen reusable di dalam UI.tsx.
 *
 * Pemisahan style dari JSX membantu kode menjadi:
 *
 * - lebih rapi,
 * - mudah dibaca,
 * - mudah dipelihara,
 * - dan lebih mudah dipelajari.
 */
const styles = StyleSheet.create({


  // ==========================================================
  // HEADER
  // ==========================================================

  /**
   * Container utama Header.
   *
   * flexDirection: 'row'
   * membuat logo, teks, dan notification icon berada
   * dalam satu baris horizontal.
   */
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,

    flexDirection: 'row',
    alignItems: 'center',

    gap: 12,
  },


  /**
   * Container icon calendar pada Header.
   */
  logo: {
    width: 46,
    height: 46,

    borderRadius: 14,

    backgroundColor: C.maroon,

    alignItems: 'center',
    justifyContent: 'center',
  },


  /**
   * Container Title dan Subtitle.
   *
   * flex: 1 membuat area teks menggunakan ruang
   * horizontal yang tersedia.
   */
  headerText: {
    flex: 1,
  },


  /**
   * Style judul Header.
   */
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: C.text,
  },


  /**
   * Style subtitle Header.
   */
  sub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 2,
  },


  /**
   * Container notification icon.
   */
  bell: {
    width: 40,
    height: 40,

    borderRadius: 13,

    backgroundColor: C.orangeSoft,

    alignItems: 'center',
    justifyContent: 'center',
  },


  // ==========================================================
  // STAT CARD
  // ==========================================================

  /**
   * Container card statistik.
   *
   * flex: 1 memungkinkan beberapa card Stat membagi
   * ruang horizontal secara proporsional.
   */
  stat: {
    flex: 1,

    borderRadius: 18,
    padding: 13,
    minHeight: 112,

    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },


  /**
   * Container icon pada card statistik.
   */
  statIcon: {
    width: 34,
    height: 34,

    borderRadius: 11,

    backgroundColor: C.maroonSoft,

    alignItems: 'center',
    justifyContent: 'center',
  },


  /**
   * Nilai utama statistik.
   *
   * Contoh:
   *
   * 5
   * 3
   * 4
   */
  value: {
    fontSize: 21,
    fontWeight: '900',
    color: C.text,
    marginTop: 8,
  },


  /**
   * Label statistik.
   *
   * Contoh:
   *
   * Total Jadwal
   * Kelas Aktif
   * Ruang
   */
  label: {
    fontSize: 11,
    color: C.muted,
    marginTop: 2,
  },


  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  /**
   * Container ketika data kosong.
   */
  empty: {
    alignItems: 'center',
    padding: 35,
  },


  /**
   * Pesan empty state.
   */
  emptyText: {
    color: C.muted,
    marginTop: 10,
  },


  // ==========================================================
  // FLOATING ACTION BUTTON
  // ==========================================================

  /**
   * Tombol FAB.
   *
   * position: 'absolute'
   * membuat tombol dapat ditempatkan secara mengambang.
   *
   * right dan bottom menentukan posisi tombol dari
   * sisi kanan dan bawah parent container.
   */
  fab: {
    position: 'absolute',

    right: 20,
    bottom: 18,

    width: 58,
    height: 58,

    borderRadius: 20,

    backgroundColor: C.maroon,

    alignItems: 'center',
    justifyContent: 'center',

    // Memberikan efek bayangan pada Android.
    elevation: 6,
  },
});