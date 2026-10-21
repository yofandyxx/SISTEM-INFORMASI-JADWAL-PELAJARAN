/**
 * ============================================================
 * PROJECT 02 - SISTEM INFORMASI JADWAL PELAJARAN
 * File        : ScheduleScreen.tsx
 * Lokasi file : src/screens/ScheduleScreen.tsx
 * Fungsi      : Menampilkan daftar jadwal dan menyediakan
 *               tindakan tambah, edit, serta hapus melalui
 *               callback dari komponen induk.
 * Dibuat oleh : Amrizal, S.Kom., M.Kom.
 * ============================================================
 *
 * Fitur utama:
 *
 * 1. Menampilkan header halaman Jadwal Pelajaran.
 * 2. Menampilkan jumlah jadwal dari props items.
 * 3. Menampilkan daftar jadwal menggunakan ScheduleCard.
 * 4. Menampilkan Empty State jika jadwal kosong.
 * 5. Meneruskan tindakan edit melalui callback onEdit.
 * 6. Meminta konfirmasi sebelum menghapus jadwal.
 * 7. Meneruskan tindakan hapus melalui callback onDelete.
 * 8. Membuka penambahan jadwal melalui FAB dan callback onAdd.
 *
 * Konsep pembelajaran:
 *
 * - React Functional Component
 * - TypeScript Props dan Callback Props
 * - Array length dan Array map()
 * - Conditional Rendering dan Ternary Operator
 * - Reusable Component dan Component Composition
 * - Event Handling dan Alert Confirmation
 * - ScrollView dan StyleSheet
 *
 * Catatan: Screen ini tidak mengakses SQLite secara langsung.
 * ============================================================
 */

/**
 * ============================================================
 * IMPORT
 * ============================================================
 * React       : Membentuk Functional Component.
 * Alert       : Dialog konfirmasi penghapusan.
 * ScrollView  : Membuat daftar dapat digulir.
 * StyleSheet  : Mendefinisikan konfigurasi tampilan.
 * Text, View  : Komponen dasar React Native.
 * C           : Palet warna aplikasi.
 * Empty       : Tampilan saat data jadwal kosong.
 * Fab         : Tombol aksi mengambang untuk menambah jadwal.
 * Header      : Header yang digunakan kembali.
 * ScheduleCard: Kartu tampilan setiap jadwal.
 * Schedule    : Kontrak tipe data jadwal dari TypeScript.
 * ============================================================
 */
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, Empty, Fab, Header } from '../components/UI';
import ScheduleCard from '../components/ScheduleCard';
import { Schedule } from '../types';

/**
 * ============================================================
 * COMPONENT UTAMA - SCHEDULE SCREEN
 * ============================================================
 * items    : Array jadwal yang dikirim komponen induk.
 * onDelete : Callback penghapusan berdasarkan ID jadwal.
 * onEdit   : Callback yang menerima jadwal yang dipilih.
 * onAdd    : Callback untuk membuka form tambah jadwal.
 *
 * Semua operasi perubahan data diteruskan melalui callback.
 * ============================================================
 */
export default function ScheduleScreen({
  items,
  onDelete,
  onEdit,
  onAdd,
}: {
  items: Schedule[];
  onDelete: (id: number) => void;
  onEdit: (item: Schedule) => void;
  onAdd: () => void;
}) {
  /**
   * ==========================================================
   * RENDER HALAMAN JADWAL
   * ==========================================================
   * ScrollView berisi header, ringkasan, dan daftar jadwal.
   * FAB diletakkan di luar ScrollView agar menjadi aksi halaman.
   * ==========================================================
   */
  return (
    <View style={styles.page}>
      {/* Area daftar yang dapat digulir. */}
      <ScrollView contentContainerStyle={styles.wrap}>
        {/* Header reusable untuk identitas halaman. */}
        <Header
          title="Jadwal Pelajaran"
          subtitle="Kelola jadwal perkuliahan TRK"
        />

        {/* Ringkasan jumlah seluruh jadwal yang diterima. */}
        <View style={styles.info}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoNumber}>{items.length}</Text>
          </View>

          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Jadwal Aktif</Text>
            <Text style={styles.infoSub}>
              Gunakan ikon edit untuk memperbarui dan ikon hapus
              untuk menghapus jadwal.
            </Text>
          </View>
        </View>

        {/*
          Conditional Rendering:
          Jika items.length bernilai lebih dari nol, tampilkan
          ScheduleCard untuk setiap item menggunakan map().
          Jika kosong, tampilkan komponen Empty.
        */}
        {items.length ? (
          items.map((item) => (
            <ScheduleCard
              key={item.id}
              item={item}
              onEdit={() => onEdit(item)}
              onDelete={() =>
                Alert.alert(
                  'Hapus Jadwal',
                  'Yakin ingin menghapus jadwal ini?',
                  [
                    {
                      text: 'Batal',
                      style: 'cancel',
                    },
                    {
                      text: 'Hapus',
                      style: 'destructive',
                      onPress: () => onDelete(item.id),
                    },
                  ]
                )
              }
            />
          ))
        ) : (
          <Empty text="Belum ada jadwal" />
        )}
      </ScrollView>

      {/* FAB meneruskan aksi tambah melalui callback onAdd. */}
      <Fab onPress={onAdd} />
    </View>
  );
}

/**
 * ============================================================
 * STYLESHEET
 * ============================================================
 * Seluruh nilai style dipertahankan sesuai source yang dikirim.
 * ============================================================
 */
const styles = StyleSheet.create({
  /** Container utama yang memenuhi ruang layar tersedia. */
  page: {
    flex: 1,
    backgroundColor: C.bg,
  },

  /** Ruang bawah agar daftar tidak terlalu dekat dengan FAB. */
  wrap: {
    paddingBottom: 100,
  },

  /** Kartu informasi jumlah jadwal aktif. */
  info: {
    marginHorizontal: 20,
    backgroundColor: C.maroonSoft,
    padding: 14,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  /** Kotak yang menampung angka jumlah jadwal. */
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: C.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** Tampilan angka items.length. */
  infoNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },

  /** Bagian teks pada kartu ringkasan. */
  infoText: {
    flex: 1,
  },

  /** Judul kartu ringkasan. */
  infoTitle: {
    fontWeight: '900',
    color: C.maroon,
  },

  /** Petunjuk penggunaan tombol edit dan hapus. */
  infoSub: {
    fontSize: 11,
    lineHeight: 16,
    color: C.muted,
    marginTop: 3,
  },
});
