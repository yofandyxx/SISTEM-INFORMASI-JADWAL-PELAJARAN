/**

 *
 * Fitur utama:
 * 1. Menampilkan nama mata kuliah.
 * 2. Menampilkan hari perkuliahan.
 * 3. Menampilkan jam mulai dan jam selesai.
 * 4. Menampilkan kelas.
 * 5. Menampilkan ruang.
 * 6. Menampilkan nama dosen.
 * 7. Menggunakan warna mata kuliah sebagai indikator visual.
 * 8. Menyediakan tombol Edit jika onEdit diberikan.
 * 9. Menyediakan tombol Hapus jika onDelete diberikan.
 * 10. Menggunakan komponen Meta untuk mengurangi kode berulang.
 *
 * Konsep penting:
 * - React Functional Component
 * - TypeScript Props
 * - Optional Props
 * - Conditional Rendering
 * - Reusable Component
 * - Nullish Coalescing Operator (??)
 * - Logical OR Operator (||)
 * - Callback / Event Handler
 * - Dynamic Style
 * - React Native StyleSheet
 * - Expo Vector Icons
 */


// ============================================================
// IMPORT
// ============================================================

// React digunakan untuk membuat komponen React.
import React from 'react';

// Komponen dasar React Native yang digunakan pada card.
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Ionicons digunakan untuk menampilkan ikon pada card.
import { Ionicons } from '@expo/vector-icons';

// Type Schedule mendefinisikan struktur data jadwal.
import { Schedule } from '../types';

// C berisi kumpulan konstanta warna aplikasi.
import { C } from './UI';


/**
 * ============================================================
 * SCHEDULE CARD
 * ============================================================
 *
 * ScheduleCard merupakan reusable component yang digunakan
 * untuk menampilkan satu record jadwal perkuliahan.
 *
 * Komponen menerima:
 *
 * item
 * -> Data jadwal yang akan ditampilkan.
 *
 * onEdit
 * -> Callback opsional ketika tombol Edit ditekan.
 *
 * onDelete
 * -> Callback opsional ketika tombol Hapus ditekan.
 *
 * Karena onEdit dan onDelete bersifat opsional, ScheduleCard
 * juga dapat digunakan hanya sebagai card informasi tanpa
 * menampilkan tombol aksi.
 */
export default function ScheduleCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Schedule;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (

    // ========================================================
    // CONTAINER CARD JADWAL
    // ========================================================
    <View style={styles.card}>


      {/**
       * ======================================================
       * COLOR INDICATOR
       * ======================================================
       *
       * Garis vertikal di sebelah kiri digunakan sebagai
       * indikator warna mata kuliah.
       *
       * item.subject_color
       * -> warna yang berasal dari data mata kuliah.
       *
       * Jika subject_color tidak tersedia, aplikasi
       * menggunakan warna default C.maroon.
       */}
      <View
        style={[
          styles.bar,
          {
            backgroundColor:
              item.subject_color || C.maroon,
          },
        ]}
      />


      {/* =====================================================
          CONTENT
          ===================================================== */}
      <View style={styles.content}>


        {/* ===================================================
            BAGIAN ATAS: MATA KULIAH DAN HARI
            =================================================== */}
        <View style={styles.top}>

          {/* Nama mata kuliah */}
          <Text style={styles.subject}>
            {item.subject_name}
          </Text>


          {/* Badge hari perkuliahan */}
          <View style={styles.day}>
            <Text style={styles.dayText}>
              {item.day}
            </Text>
          </View>

        </View>


        {/* ===================================================
            INFORMASI WAKTU
            =================================================== */}
        <View style={styles.timeLine}>

          {/* Icon jam */}
          <View style={styles.timeIcon}>
            <Ionicons
              name="time-outline"
              size={15}
              color={C.maroon}
            />
          </View>


          {/* Jam mulai dan jam selesai */}
          <Text style={styles.time}>
            {item.start_time} - {item.end_time}
          </Text>

        </View>


        {/* ===================================================
            INFORMASI KELAS DAN RUANG
            =================================================== */}
        <View style={styles.metaGrid}>


          {/**
           * Informasi kelas.
           *
           * Operator ??
           * digunakan untuk memberikan nilai fallback '-'
           * apabila class_name bernilai null atau undefined.
           */}
          <Meta
            icon="people-outline"
            text={item.class_name ?? '-'}
            color={C.blue}
          />


          {/* Informasi ruang perkuliahan */}
          <Meta
            icon="location-outline"
            text={item.room_name ?? '-'}
            color={C.orange}
          />

        </View>


        {/* ===================================================
            BAGIAN BAWAH: DOSEN DAN ACTION BUTTON
            =================================================== */}
        <View style={styles.bottom}>


          {/* Informasi dosen pengampu */}
          <Meta
            icon="person-outline"
            text={item.teacher_name ?? '-'}
            color={C.teal}
          />


          {/**
           * =================================================
           * CONDITIONAL RENDERING ACTION
           * =================================================
           *
           * Container tombol hanya ditampilkan apabila
           * onEdit atau onDelete tersedia.
           *
           * Dengan cara ini ScheduleCard dapat digunakan pada:
           *
           * 1. Screen Jadwal
           *    -> tombol Edit dan Hapus dapat ditampilkan.
           *
           * 2. Screen Beranda / Cari
           *    -> card dapat digunakan tanpa tombol aksi.
           */}
          {(onEdit || onDelete) && (

            <View style={styles.actions}>


              {/**
               * =============================================
               * TOMBOL EDIT
               * =============================================
               *
               * Tombol hanya muncul jika callback onEdit
               * diberikan oleh parent component.
               */}
              {onEdit && (

                <Pressable
                  onPress={onEdit}
                  hitSlop={8}
                  style={[
                    styles.actionButton,
                    styles.editButton,
                  ]}
                >
                  <Ionicons
                    name="create-outline"
                    size={17}
                    color={C.blue}
                  />
                </Pressable>

              )}


              {/**
               * =============================================
               * TOMBOL DELETE
               * =============================================
               *
               * Tombol hanya muncul jika callback onDelete
               * diberikan oleh parent component.
               */}
              {onDelete && (

                <Pressable
                  onPress={onDelete}
                  hitSlop={8}
                  style={[
                    styles.actionButton,
                    styles.deleteButton,
                  ]}
                >
                  <Ionicons
                    name="trash-outline"
                    size={17}
                    color={C.danger}
                  />
                </Pressable>

              )}

            </View>

          )}

        </View>

      </View>

    </View>
  );
}


/**
 * ============================================================
 * META COMPONENT
 * ============================================================
 *
 * Meta merupakan reusable component kecil yang digunakan
 * untuk menampilkan pasangan:
 *
 * ICON + TEXT
 *
 * Contoh:
 *
 * 👥 TRK-4A
 * 📍 Lab Komputer 1
 * 👤 Amrizal, S.Kom., M.Kom.
 *
 * Dengan komponen ini struktur View + Ionicons + Text
 * tidak perlu ditulis berulang kali.
 */
function Meta({
  icon,
  text,
  color,
}: {
  /**
   * keyof typeof Ionicons.glyphMap memastikan nilai icon
   * harus merupakan nama icon yang valid dari Ionicons.
   */
  icon: keyof typeof Ionicons.glyphMap;

  // Teks informasi yang akan ditampilkan.
  text: string;

  // Warna icon.
  color: string;
}) {
  return (

    <View style={styles.metaItem}>

      {/* Icon informasi */}
      <Ionicons
        name={icon}
        size={15}
        color={color}
      />


      {/* Teks informasi */}
      <Text style={styles.meta}>
        {text}
      </Text>

    </View>
  );
}


/**
 * ============================================================
 * STYLE
 * ============================================================
 *
 * Seluruh style komponen ScheduleCard dikelompokkan pada
 * StyleSheet agar struktur tampilan terpisah dari logika
 * rendering komponen.
 */
const styles = StyleSheet.create({


  /**
   * ==========================================================
   * CARD UTAMA
   * ==========================================================
   *
   * Container utama untuk satu jadwal.
   */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,

    // Membuat bar dan content tersusun horizontal.
    flexDirection: 'row',

    gap: 12,

    borderWidth: 1,
    borderColor: C.line,

    // Memberikan efek bayangan pada Android.
    elevation: 1,
  },


  /**
   * Garis indikator warna mata kuliah.
   */
  bar: {
    width: 5,
    borderRadius: 4,
  },


  /**
   * Container utama informasi jadwal.
   *
   * flex: 1 membuat content menggunakan ruang yang tersedia.
   */
  content: {
    flex: 1,
  },


  /**
   * Baris bagian atas:
   *
   * Nama Mata Kuliah               Hari
   */
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },


  /**
   * Nama mata kuliah.
   */
  subject: {
    fontSize: 15,
    fontWeight: '900',
    color: C.text,

    // Memungkinkan nama mata kuliah menggunakan ruang tersisa.
    flex: 1,
  },


  /**
   * Container badge hari.
   */
  day: {
    backgroundColor: C.maroonSoft,
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },


  /**
   * Teks pada badge hari.
   */
  dayText: {
    fontSize: 10,
    fontWeight: '800',
    color: C.maroon,
  },


  /**
   * Container informasi waktu.
   *
   * Contoh:
   *
   * 🕘 07:20 - 10:45
   */
  timeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
    gap: 6,
  },


  /**
   * Background kecil untuk icon waktu.
   */
  timeIcon: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: C.maroonSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },


  /**
   * Teks jam mulai dan selesai.
   */
  time: {
    fontSize: 13,
    fontWeight: '800',
    color: C.maroon,
  },


  /**
   * Container metadata kelas dan ruang.
   *
   * flexWrap memungkinkan item berpindah baris jika ruang
   * horizontal pada perangkat tidak mencukupi.
   */
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },


  /**
   * Container reusable untuk:
   *
   * Icon + Text
   */
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    maxWidth: '100%',
  },


  /**
   * Teks metadata.
   */
  meta: {
    fontSize: 11,
    color: C.muted,
  },


  /**
   * ==========================================================
   * BAGIAN BAWAH CARD
   * ==========================================================
   *
   * Menampilkan:
   *
   * Nama Dosen                 Edit | Hapus
   */
  bottom: {
    marginTop: 10,
    paddingTop: 10,

    borderTopWidth: 1,
    borderTopColor: C.line,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    gap: 8,
  },


  /**
   * Container tombol Edit dan Hapus.
   */
  actions: {
    flexDirection: 'row',
    gap: 7,
  },


  /**
   * Style dasar yang digunakan bersama oleh tombol
   * Edit dan Hapus.
   */
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },


  /**
   * Background tombol Edit.
   */
  editButton: {
    backgroundColor: C.blueSoft,
  },


  /**
   * Background tombol Hapus.
   */
  deleteButton: {
    backgroundColor: '#FDECEC',
  },
});
