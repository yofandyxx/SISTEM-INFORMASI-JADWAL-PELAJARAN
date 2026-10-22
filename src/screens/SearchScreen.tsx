/**
 
 *
 * Fitur utama:
 *
 * 1. Menampilkan halaman Cari Jadwal.
 * 2. Menerima data jadwal melalui props items.
 * 3. Menyimpan kata kunci pencarian pada state q.
 * 4. Mencari berdasarkan Mata Kuliah, Dosen, Kelas, Ruang, dan Hari.
 * 5. Melakukan pencarian tanpa membedakan huruf besar/kecil.
 * 6. Memperbarui hasil pencarian saat kata kunci berubah.
 * 7. Menghapus kata kunci melalui ikon Clear.
 * 8. Menampilkan jumlah jadwal yang ditemukan.
 * 9. Menampilkan hasil dengan reusable component ScheduleCard.
 * 10. Menampilkan Empty State jika tidak ada hasil.
 *
 * Konsep pembelajaran:
 *
 * - React Functional Component
 * - TypeScript Props
 * - React Hooks: useState() dan useMemo()
 * - Controlled TextInput
 * - Array filter() dan map()
 * - String interpolation / template literal
 * - String toLowerCase() dan includes()
 * - Case-insensitive multi-field search
 * - Dependency Array
 * - Conditional Rendering dan Ternary Operator
 * - Reusable Component dan Component Composition
 * - Derived Data
 * - StyleSheet
 *
 * Catatan arsitektur:
 * Pencarian dilakukan pada array items yang diterima dari parent,
 * bukan melalui query SQL langsung di dalam screen ini.
 * ============================================================
 */

/**
 * ============================================================
 * IMPORT REACT DAN REACT HOOKS
 * ============================================================
 * React    : membangun Functional Component.
 * useState : menyimpan kata kunci yang diketik pengguna.
 * useMemo  : menghitung ulang hasil pencarian hanya ketika
 *            q atau items berubah.
 * ============================================================
 */
import React, { useMemo, useState } from 'react';

/**
 * ============================================================
 * IMPORT KOMPONEN REACT NATIVE
 * ============================================================
 * ScrollView : membuat halaman dapat digulir.
 * StyleSheet : mendefinisikan gaya antarmuka.
 * Text       : menampilkan jumlah hasil pencarian.
 * TextInput  : menerima kata kunci pencarian.
 * View       : menyusun komponen pada halaman.
 * ============================================================
 */
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

/**
 * Ionicons digunakan untuk ikon pencarian dan ikon hapus kata kunci.
 */
import { Ionicons } from '@expo/vector-icons';

/**
 * ============================================================
 * IMPORT REUSABLE COMPONENT
 * ============================================================
 * C      : kumpulan warna yang dipakai aplikasi.
 * Empty  : informasi ketika tidak ada jadwal yang cocok.
 * Header : judul dan subjudul halaman.
 * ============================================================
 */
import { C, Empty, Header } from '../components/UI';

/**
 * ScheduleCard menampilkan informasi sebuah jadwal secara konsisten.
 */
import ScheduleCard from '../components/ScheduleCard';

/**
 * Schedule adalah kontrak tipe data untuk setiap objek jadwal.
 */
import { Schedule } from '../types';

/**
 * ============================================================
 * COMPONENT UTAMA - SEARCH SCREEN
 * ============================================================
 * Props items berisi seluruh jadwal yang menjadi sumber pencarian.
 *
 * Alur data:
 * items[] + q -> useMemo() -> filter() -> rows[]
 *            -> ScheduleCard atau Empty.
 * ============================================================
 */
export default function Search({
  items,
}: {
  /** Array jadwal yang diterima dari parent component. */
  items: Schedule[];
}) {
  /**
   * ==========================================================
   * STATE KATA KUNCI PENCARIAN
   * ==========================================================
   * q dimulai dengan string kosong, sehingga seluruh jadwal
   * ditampilkan sebelum pengguna memasukkan kata kunci.
   * setQ memperbarui nilai q setiap kali input berubah.
   * ==========================================================
   */
  const [q, setQ] = useState('');

  /**
   * ==========================================================
   * MEMFILTER DATA JADWAL
   * ==========================================================
   * 1. filter() memeriksa setiap objek jadwal pada items.
   * 2. Lima field digabungkan menjadi satu string pencarian:
   *    subject_name, teacher_name, class_name, room_name, day.
   * 3. toLowerCase() menyamakan kapitalisasi data dan keyword.
   * 4. includes() memeriksa kecocokan keyword dalam string.
   * 5. useMemo() menghitung ulang saat q atau items berubah.
   *
   * Hasil rows merupakan derived data, bukan state terpisah.
   * ==========================================================
   */
  const rows = useMemo(
    () =>
      items.filter((x) =>
        `${x.subject_name} ${x.teacher_name} ${x.class_name} ${x.room_name} ${x.day}`
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [q, items]
  );

  /**
   * ==========================================================
   * RENDER HALAMAN PENCARIAN
   * ==========================================================
   * ScrollView membuat konten dapat digulir.
   * keyboardShouldPersistTaps="handled" membantu interaksi sentuh
   * dengan konten ketika keyboard masih terbuka.
   * ==========================================================
   */
  return (
    <ScrollView
      contentContainerStyle={s.wrap}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header halaman menggunakan komponen bersama. */}
      <Header
        title="Cari Jadwal"
        subtitle="Temukan jadwal dengan cepat"
      />

      {/*
        SEARCH BOX
        Ikon pencarian, input terkontrol, dan tombol Clear
        disusun secara horizontal di dalam satu View.
      */}
      <View style={s.search}>
        <Ionicons
          name="search"
          size={20}
          color={C.muted}
        />

        {/*
          value={q} menghubungkan TextInput dengan state.
          onChangeText={setQ} memperbarui keyword saat diketik.
        */}
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Mata pelajaran, dosen, kelas, ruang..."
          style={s.input}
        />

        {/*
          Tombol Clear hanya muncul ketika q tidak kosong.
          Menekan ikon mengembalikan q ke string kosong.
        */}
        {q ? (
          <Ionicons
            onPress={() => setQ('')}
            name="close-circle"
            size={19}
            color="#A2ADA9"
          />
        ) : null}
      </View>

      {/* rows.length menunjukkan jumlah jadwal yang cocok. */}
      <Text style={s.result}>
        {rows.length} hasil ditemukan
      </Text>

      {/*
        CONDITIONAL RENDERING
        Jika rows berisi data, tampilkan satu ScheduleCard per jadwal.
        Jika kosong, tampilkan pesan "Jadwal tidak ditemukan".
        key={x.id} membantu React mengenali item dalam daftar.
      */}
      {rows.length ? (
        rows.map((x) => (
          <ScheduleCard
            key={x.id}
            item={x}
          />
        ))
      ) : (
        <Empty text="Jadwal tidak ditemukan" />
      )}
    </ScrollView>
  );
}

/**
 * ============================================================
 * STYLESHEET
 * ============================================================
 * StyleSheet memisahkan pengaturan visual dari logika pencarian.
 * Semua nilai style dipertahankan sesuai source yang diberikan.
 * ============================================================
 */
const s = StyleSheet.create({
  /** Kontainer halaman dan ruang di bawah hasil pencarian. */
  wrap: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: C.bg,
    minHeight: '100%',
  },

  /** Kotak pencarian dengan susunan horizontal. */
  search: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  /** Input mengambil ruang tersisa di antara kedua ikon. */
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 13,
    color: C.text,
  },

  /** Keterangan jumlah hasil pencarian. */
  result: {
    fontSize: 11,
    color: C.muted,
    marginVertical: 14,
  },
});
