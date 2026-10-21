/**
 * ============================================================
 * PROJECT 02 - SISTEM INFORMASI JADWAL PELAJARAN
 * File        : AddScheduleScreen.tsx
 * Lokasi file : src/screens/AddScheduleScreen.tsx
 * Fungsi      : Menyediakan form untuk menambah dan mengubah
 *               jadwal perkuliahan dengan memilih hari, waktu,
 *               Dosen, Mata Kuliah, Kelas, dan Ruang.
 * Dibuat oleh : Amrizal, S.Kom., M.Kom.
 * ============================================================
 *
 * Fitur utama:
 *
 * 1. Tambah Jadwal.
 * 2. Edit Jadwal.
 * 3. Pemilihan hari perkuliahan.
 * 4. Pemilihan jam mulai dan jam selesai.
 * 5. Pemilihan Mata Kuliah.
 * 6. Pemilihan Dosen.
 * 7. Pemilihan Kelas.
 * 8. Pemilihan Ruang.
 * 9. Validasi kelengkapan master data.
 * 10. Validasi jam mulai dan jam selesai.
 * 11. Menampilkan pesan jika jadwal bentrok.
 * 12. Reusable TimeField.
 * 13. Reusable DropdownField.
 *
 * Konsep pembelajaran:
 *
 * - React Functional Component
 * - TypeScript Props
 * - Optional Props
 * - React State / useState
 * - Controlled Input
 * - Conditional Rendering
 * - Callback Function
 * - DateTimePicker
 * - Modal
 * - Array map()
 * - Array find()
 * - Nullish Coalescing Operator (??)
 * - Optional Chaining (?.)
 * - Ternary Operator
 * - Reusable Component
 * - Form Validation
 * - StyleSheet
 * - Expo Vector Icons / Ionicons
 */


// ============================================================
// IMPORT
// ============================================================

// React dan useState.
// useState digunakan untuk menyimpan perubahan data sementara
// selama pengguna mengisi form.
import React, {
  useState,
} from 'react';


// Komponen bawaan React Native.
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


// DateTimePicker digunakan untuk memilih waktu perkuliahan.
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';


// Ionicons digunakan untuk menampilkan icon pada antarmuka.
import { Ionicons } from '@expo/vector-icons';


// Konstanta warna bersama dari UI.tsx.
import { C } from '../components/UI';


// Type TypeScript yang digunakan oleh screen.
import {
  Room,
  Schedule,
  ScheduleInput,
  SchoolClass,
  Subject,
  Teacher,
} from '../types';


// ============================================================
// DATA HARI
// ============================================================

/**
 * Daftar hari yang dapat dipilih pada form Jadwal.
 *
 * Array ini digunakan untuk membuat tombol hari
 * menggunakan fungsi map().
 */
const days = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
];


// ============================================================
// TYPE PICKER ITEM
// ============================================================

/**
 * PickerItem
 *
 * Menentukan struktur data yang digunakan oleh
 * komponen DropdownField.
 *
 * id
 *   ID data yang akan disimpan.
 *
 * name
 *   Nama utama yang ditampilkan.
 *
 * meta?
 *   Informasi tambahan yang bersifat optional.
 *
 * Contoh:
 *
 * {
 *   id: 1,
 *   name: 'Workshop Pemrograman Mobile',
 *   meta: 'MK-001'
 * }
 */
type PickerItem = {
  id: number;
  name: string;
  meta?: string;
};


// ============================================================
// HELPER FUNCTION - KONVERSI DATE MENJADI WAKTU
// ============================================================

/**
 * toTime()
 *
 * Mengubah object Date menjadi string waktu
 * dengan format:
 *
 * HH:mm
 *
 * Contoh:
 *
 * Date → "08:00"
 * Date → "09:40"
 *
 * padStart() memastikan angka jam dan menit
 * selalu memiliki dua digit.
 */
function toTime(
  date: Date
) {

  const hours =
    String(date.getHours()).padStart(
      2,
      '0'
    );

  const minutes =
    String(date.getMinutes()).padStart(
      2,
      '0'
    );

  return `${hours}:${minutes}`;
}


// ============================================================
// HELPER FUNCTION - MEMBUAT OBJECT DATE BERDASARKAN WAKTU
// ============================================================

/**
 * createTime()
 *
 * Membuat object Date dengan jam dan menit tertentu.
 *
 * Fungsi ini diperlukan karena DateTimePicker
 * menggunakan object Date sebagai value.
 *
 * Parameter:
 *
 * hours
 *   Jam.
 *
 * minutes
 *   Menit.
 */
function createTime(
  hours: number,
  minutes: number
) {

  const date = new Date();

  date.setHours(
    hours,
    minutes,
    0,
    0
  );

  return date;
}


// ============================================================
// COMPONENT UTAMA - ADD / EDIT SCHEDULE
// ============================================================

/**
 * Add()
 *
 * Component utama untuk:
 *
 * - menambahkan Jadwal baru;
 * - mengubah Jadwal yang sudah tersedia.
 *
 * Mode component ditentukan oleh initialSchedule.
 *
 * initialSchedule tersedia
 *        ↓
 *     MODE EDIT
 *
 * initialSchedule tidak tersedia
 *        ↓
 *     MODE TAMBAH
 */
export default function Add({
  teachers,
  subjects,
  classes,
  rooms,
  onBack,
  onSave,
  initialSchedule,
}: {
  teachers: Teacher[];
  subjects: Subject[];
  classes: SchoolClass[];
  rooms: Room[];
  onBack: () => void;
  onSave: (input: ScheduleInput) => boolean;
  initialSchedule?: Schedule | null;
}) {

  // ==========================================================
  // HELPER FUNCTION - PARSE WAKTU
  // ==========================================================

  /**
   * parseTime()
   *
   * Mengubah string waktu seperti:
   *
   * "08:00"
   *
   * menjadi object Date.
   *
   * Fungsi ini terutama digunakan ketika membuka
   * Jadwal dalam MODE EDIT.
   *
   * Jika value tidak tersedia, digunakan waktu fallback.
   */
  const parseTime = (
    value: string | undefined,
    fallbackHour: number,
    fallbackMinute: number
  ) => {

    // Jika value belum tersedia,
    // gunakan waktu default.
    if (!value) {

      return createTime(
        fallbackHour,
        fallbackMinute
      );

    }


    /**
     * Contoh:
     *
     * "08:00"
     *
     * split(':')
     *
     * ["08", "00"]
     *
     * map(Number)
     *
     * [8, 0]
     */
    const [hours, minutes] =
      value
        .split(':')
        .map(Number);


    return createTime(
      hours,
      minutes
    );
  };


  // ==========================================================
  // STATE FORM
  // ==========================================================

  /**
   * State Hari.
   *
   * Jika MODE EDIT:
   * gunakan hari dari initialSchedule.
   *
   * Jika MODE TAMBAH:
   * gunakan "Senin".
   */
  const [day, setDay] =
    useState(
      initialSchedule?.day ?? 'Senin'
    );


  /**
   * State Jam Mulai.
   *
   * Default:
   * 08:00
   */
  const [start, setStart] =
    useState(
      parseTime(
        initialSchedule?.start_time,
        8,
        0
      )
    );


  /**
   * State Jam Selesai.
   *
   * Default:
   * 09:40
   */
  const [end, setEnd] =
    useState(
      parseTime(
        initialSchedule?.end_time,
        9,
        40
      )
    );


  /**
   * State Dosen.
   *
   * Prioritas nilai:
   *
   * initialSchedule.teacher_id
   *          ↓
   * teachers[0].id
   *          ↓
   * 0
   */
  const [teacher, setTeacher] =
    useState(
      initialSchedule?.teacher_id ??
        teachers[0]?.id ??
        0
    );


  /**
   * State Mata Kuliah.
   */
  const [subject, setSubject] =
    useState(
      initialSchedule?.subject_id ??
        subjects[0]?.id ??
        0
    );


  /**
   * State Kelas.
   */
  const [schoolClass, setSchoolClass] =
    useState(
      initialSchedule?.class_id ??
        classes[0]?.id ??
        0
    );


  /**
   * State Ruang.
   */
  const [room, setRoom] =
    useState(
      initialSchedule?.room_id ??
        rooms[0]?.id ??
        0
    );


  // ==========================================================
  // STATE DATETIME PICKER
  // ==========================================================

  /**
   * showStart
   *
   * true  → tampilkan DateTimePicker Jam Mulai.
   * false → sembunyikan DateTimePicker.
   */
  const [showStart, setShowStart] =
    useState(false);


  /**
   * showEnd
   *
   * true  → tampilkan DateTimePicker Jam Selesai.
   * false → sembunyikan DateTimePicker.
   */
  const [showEnd, setShowEnd] =
    useState(false);


  // ==========================================================
  // FUNCTION SAVE
  // ==========================================================

  /**
   * save()
   *
   * Menangani proses penyimpanan form.
   *
   * Alur:
   *
   * 1. Konversi waktu.
   * 2. Validasi master data.
   * 3. Validasi jam.
   * 4. Bentuk ScheduleInput.
   * 5. Jalankan onSave().
   * 6. Periksa hasil penyimpanan.
   * 7. Jika berhasil → kembali.
   * 8. Jika gagal → tampilkan Jadwal Bentrok.
   */
  const save = () => {

    // Ubah object Date menjadi format HH:mm.
    const startTime =
      toTime(start);

    const endTime =
      toTime(end);


    // ========================================================
    // VALIDASI 1 - MASTER DATA
    // ========================================================

    /**
     * Semua master data harus tersedia.
     *
     * Jika salah satu bernilai 0 / false,
     * form tidak dapat disimpan.
     */
    if (
      !teacher ||
      !subject ||
      !schoolClass ||
      !room
    ) {

      Alert.alert(
        'Data Belum Lengkap',
        'Pastikan master Dosen, Mata Kuliah, Kelas, dan Ruang tersedia.'
      );

      return;
    }


    // ========================================================
    // VALIDASI 2 - WAKTU
    // ========================================================

    /**
     * Jam selesai harus lebih besar
     * daripada jam mulai.
     *
     * Contoh VALID:
     *
     * 08:00 < 09:40
     *
     * Contoh TIDAK VALID:
     *
     * 10:00 >= 09:00
     */
    if (startTime >= endTime) {

      Alert.alert(
        'Validasi Waktu',
        'Jam selesai harus lebih besar daripada jam mulai.'
      );

      return;
    }


    // ========================================================
    // CALLBACK SAVE
    // ========================================================

    /**
     * Data form dikemas menjadi ScheduleInput
     * kemudian dikirim ke parent melalui onSave().
     *
     * onSave() mengembalikan boolean:
     *
     * true
     *   Jadwal berhasil diproses.
     *
     * false
     *   Jadwal gagal, misalnya karena bentrok.
     */
    const success =
      onSave({
        day,
        start_time: startTime,
        end_time: endTime,
        teacher_id: teacher,
        subject_id: subject,
        class_id: schoolClass,
        room_id: room,
      });


    // ========================================================
    // HASIL SAVE
    // ========================================================

    if (success) {

      // Jika berhasil, kembali ke halaman sebelumnya.
      onBack();

      return;
    }


    /**
     * Jika onSave() mengembalikan false,
     * tampilkan informasi bentrok.
     */
    Alert.alert(
      'Jadwal Bentrok',
      'Dosen, kelas, atau ruang sudah digunakan pada waktu tersebut.'
    );
  };


  // ==========================================================
  // FUNCTION HANDLE TIME CHANGE
  // ==========================================================

  /**
   * handleTimeChange()
   *
   * Menangani hasil pemilihan waktu dari DateTimePicker.
   *
   * Parameter:
   *
   * event
   *   Informasi event DateTimePicker.
   *
   * selectedDate
   *   Waktu yang dipilih pengguna.
   *
   * type
   *   Menentukan apakah picker digunakan untuk:
   *
   *   'start' → Jam Mulai
   *   'end'   → Jam Selesai
   */
  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
    type: 'start' | 'end'
  ) => {

    // ========================================================
    // KHUSUS ANDROID
    // ========================================================

    /**
     * Pada Android, picker ditutup setelah
     * pengguna memilih atau menutup dialog.
     */
    if (Platform.OS === 'android') {

      type === 'start'
        ? setShowStart(false)
        : setShowEnd(false);

    }


    // ========================================================
    // PICKER DIBATALKAN
    // ========================================================

    /**
     * Jika pengguna membatalkan picker atau
     * selectedDate tidak tersedia, proses dihentikan.
     */
    if (
      event.type === 'dismissed' ||
      !selectedDate
    ) {

      return;
    }


    // ========================================================
    // SIMPAN WAKTU YANG DIPILIH
    // ========================================================

    /**
     * Jika type === 'start'
     * simpan ke state start.
     *
     * Jika tidak,
     * simpan ke state end.
     */
    type === 'start'
      ? setStart(selectedDate)
      : setEnd(selectedDate);
  };


  // ==========================================================
  // RENDER SCREEN
  // ==========================================================

  return (
    <ScrollView
      contentContainerStyle={styles.wrap}
      keyboardShouldPersistTaps="handled"
    >

      {/* =====================================================
          HEADER SCREEN
          ===================================================== */}

      <View style={styles.header}>

        {/* Tombol kembali */}
        <Pressable
          onPress={onBack}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={21}
            color={C.maroon}
          />
        </Pressable>


        {/* Judul dan subjudul berubah sesuai mode */}
        <View>

          <Text style={styles.title}>
            {
              initialSchedule
                ? 'Edit Jadwal'
                : 'Tambah Jadwal'
            }
          </Text>

          <Text style={styles.subtitle}>
            {
              initialSchedule
                ? 'Perbarui data jadwal perkuliahan'
                : 'Pilih master data dan waktu perkuliahan'
            }
          </Text>

        </View>

      </View>


      {/* =====================================================
          PILIH HARI
          ===================================================== */}

      <Text style={styles.label}>
        Hari
      </Text>


      <View style={styles.days}>

        {days.map((item) => (

          <Pressable
            key={item}
            onPress={() => setDay(item)}
            style={[
              styles.day,
              day === item &&
                styles.dayActive,
            ]}
          >

            <Text
              style={[
                styles.dayText,
                day === item &&
                  styles.dayTextActive,
              ]}
            >
              {item.slice(0, 3)}
            </Text>

          </Pressable>

        ))}

      </View>


      {/* =====================================================
          PILIH JAM MULAI DAN JAM SELESAI
          ===================================================== */}

      <View style={styles.timeRow}>

        <TimeField
          label="Jam Mulai"
          value={toTime(start)}
          onPress={() =>
            setShowStart(true)
          }
        />


        <TimeField
          label="Jam Selesai"
          value={toTime(end)}
          onPress={() =>
            setShowEnd(true)
          }
        />

      </View>


      {/* =====================================================
          DATETIME PICKER - JAM MULAI
          ===================================================== */}

      {showStart && (

        <DateTimePicker
          value={start}
          mode="time"
          is24Hour
          display="default"
          onChange={(event, date) =>
            handleTimeChange(
              event,
              date,
              'start'
            )
          }
        />

      )}


      {/* =====================================================
          DATETIME PICKER - JAM SELESAI
          ===================================================== */}

      {showEnd && (

        <DateTimePicker
          value={end}
          mode="time"
          is24Hour
          display="default"
          onChange={(event, date) =>
            handleTimeChange(
              event,
              date,
              'end'
            )
          }
        />

      )}


      {/* =====================================================
          DROPDOWN MATA KULIAH
          ===================================================== */}

      <DropdownField
        label="Mata Kuliah"
        icon="book-outline"
        items={
          subjects.map((item) => ({
            id: item.id,
            name: item.name,
            meta: item.code,
          }))
        }
        value={subject}
        onChange={setSubject}
      />


      {/* =====================================================
          DROPDOWN DOSEN
          ===================================================== */}

      <DropdownField
        label="Dosen"
        icon="person-outline"
        items={
          teachers.map((item) => ({
            id: item.id,
            name: item.name,
            meta: item.expertise,
          }))
        }
        value={teacher}
        onChange={setTeacher}
      />


      {/* =====================================================
          DROPDOWN KELAS
          ===================================================== */}

      <DropdownField
        label="Kelas"
        icon="school-outline"
        items={
          classes.map((item) => ({
            id: item.id,
            name: item.name,
            meta: item.program,
          }))
        }
        value={schoolClass}
        onChange={setSchoolClass}
      />


      {/* =====================================================
          DROPDOWN RUANG
          ===================================================== */}

      <DropdownField
        label="Ruang"
        icon="business-outline"
        items={
          rooms.map((item) => ({
            id: item.id,
            name: item.name,
            meta: item.building,
          }))
        }
        value={room}
        onChange={setRoom}
      />


      {/* =====================================================
          TOMBOL SIMPAN
          ===================================================== */}

      <Pressable
        onPress={save}
        style={styles.saveButton}
      >

        <Ionicons
          name="checkmark-circle"
          size={20}
          color="#FFFFFF"
        />

        <Text style={styles.saveText}>
          {
            initialSchedule
              ? 'Simpan Perubahan'
              : 'Simpan Jadwal'
          }
        </Text>

      </Pressable>

    </ScrollView>
  );
}


// ============================================================
// REUSABLE COMPONENT - TIME FIELD
// ============================================================

/**
 * TimeField()
 *
 * Komponen reusable untuk menampilkan pilihan waktu.
 *
 * Props:
 *
 * label
 *   Nama field.
 *
 * value
 *   Waktu yang ditampilkan.
 *
 * onPress
 *   Callback ketika field ditekan.
 *
 * Komponen digunakan dua kali:
 *
 * - Jam Mulai
 * - Jam Selesai
 */
function TimeField({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {

  return (
    <View style={styles.timeColumn}>

      <Text style={styles.label}>
        {label}
      </Text>


      <Pressable
        onPress={onPress}
        style={styles.timeButton}
      >

        <Ionicons
          name="time-outline"
          size={20}
          color={C.maroon}
        />


        <Text style={styles.timeText}>
          {value}
        </Text>


        <Ionicons
          name="chevron-down"
          size={16}
          color={C.muted}
        />

      </Pressable>

    </View>
  );
}


// ============================================================
// REUSABLE COMPONENT - DROPDOWN FIELD
// ============================================================

/**
 * DropdownField()
 *
 * Komponen dropdown reusable untuk memilih satu item
 * dari master data.
 *
 * Digunakan untuk:
 *
 * - Mata Kuliah
 * - Dosen
 * - Kelas
 * - Ruang
 *
 * Props:
 *
 * label
 *   Nama field.
 *
 * icon
 *   Nama Ionicons yang digunakan.
 *
 * items
 *   Daftar pilihan PickerItem.
 *
 * value
 *   ID item yang sedang dipilih.
 *
 * onChange
 *   Callback untuk mengirim ID pilihan baru.
 */
function DropdownField({
  label,
  icon,
  items,
  value,
  onChange,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: PickerItem[];
  value: number;
  onChange: (id: number) => void;
}) {

  // ==========================================================
  // STATE MODAL
  // ==========================================================

  /**
   * open:
   *
   * true  → Modal pilihan tampil.
   * false → Modal ditutup.
   */
  const [open, setOpen] =
    useState(false);


  // ==========================================================
  // MENCARI ITEM AKTIF
  // ==========================================================

  /**
   * find() mencari item yang ID-nya sama
   * dengan value yang sedang dipilih.
   */
  const selected =
    items.find(
      (item) =>
        item.id === value
    );


  // ==========================================================
  // RENDER DROPDOWN
  // ==========================================================

  return (
    <View style={styles.dropdownGroup}>

      {/* Label dropdown */}
      <Text style={styles.label}>
        {label}
      </Text>


      {/* =====================================================
          TOMBOL MEMBUKA DROPDOWN
          ===================================================== */}

      <Pressable
        onPress={() =>
          setOpen(true)
        }
        style={styles.dropdownButton}
      >

        {/* Icon dropdown */}
        <View style={styles.dropdownIcon}>

          <Ionicons
            name={icon}
            size={19}
            color={C.maroon}
          />

        </View>


        {/* Nilai dropdown */}
        <View style={styles.dropdownTextBox}>

          <Text style={styles.dropdownValue}>
            {
              selected?.name ??
                `Pilih ${label}`
            }
          </Text>


          {/* Meta hanya ditampilkan jika tersedia */}
          {!!selected?.meta && (

            <Text style={styles.dropdownMeta}>
              {selected.meta}
            </Text>

          )}

        </View>


        {/* Icon dropdown */}
        <Ionicons
          name="chevron-down"
          size={18}
          color={C.muted}
        />

      </Pressable>


      {/* =====================================================
          MODAL PILIHAN
          ===================================================== */}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setOpen(false)
        }
      >

        {/* Overlay Modal */}
        <Pressable
          style={styles.modalOverlay}
          onPress={() =>
            setOpen(false)
          }
        >

          {/* Card Modal */}
          <Pressable style={styles.modalCard}>

            {/* =================================================
                HEADER MODAL
                ================================================= */}

            <View style={styles.modalHeader}>

              <Text style={styles.modalTitle}>
                Pilih {label}
              </Text>


              {/* Tombol menutup Modal */}
              <Pressable
                onPress={() =>
                  setOpen(false)
                }
              >

                <Ionicons
                  name="close"
                  size={23}
                  color={C.text}
                />

              </Pressable>

            </View>


            {/* =================================================
                DAFTAR PILIHAN
                ================================================= */}

            <ScrollView
              style={styles.optionList}
              showsVerticalScrollIndicator={false}
            >

              {items.map((item) => {

                /**
                 * active bernilai true jika item
                 * merupakan pilihan saat ini.
                 */
                const active =
                  item.id === value;


                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {

                      // Kirim ID item ke parent.
                      onChange(item.id);

                      // Tutup Modal.
                      setOpen(false);

                    }}
                    style={[
                      styles.option,
                      active &&
                        styles.optionActive,
                    ]}
                  >

                    {/* Informasi pilihan */}
                    <View style={styles.optionTextBox}>

                      <Text
                        style={[
                          styles.optionTitle,
                          active &&
                            styles.optionTitleActive,
                        ]}
                      >
                        {item.name}
                      </Text>


                      {/* Meta bersifat optional */}
                      {!!item.meta && (

                        <Text style={styles.optionMeta}>
                          {item.meta}
                        </Text>

                      )}

                    </View>


                    {/* Checkmark hanya untuk item aktif */}
                    {active && (

                      <Ionicons
                        name="checkmark-circle"
                        size={21}
                        color={C.maroon}
                      />

                    )}

                  </Pressable>
                );
              })}

            </ScrollView>

          </Pressable>

        </Pressable>

      </Modal>

    </View>
  );
}


// ============================================================
// STYLES
// ============================================================

/**
 * StyleSheet.create()
 *
 * Seluruh style screen dikelompokkan pada bagian ini
 * agar struktur JSX tetap terpisah dari konfigurasi tampilan.
 */
const styles = StyleSheet.create({

  // ==========================================================
  // SCREEN CONTAINER
  // ==========================================================

  wrap: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: C.bg,
    minHeight: '100%',
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: C.maroonSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '900',
    color: C.text,
  },

  subtitle: {
    fontSize: 11,
    color: C.muted,
    marginTop: 2,
  },


  // ==========================================================
  // LABEL
  // ==========================================================

  label: {
    fontSize: 12,
    fontWeight: '800',
    color: C.text,
    marginBottom: 8,
  },


  // ==========================================================
  // PILIHAN HARI
  // ==========================================================

  days: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
  },

  day: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.line,
  },

  dayActive: {
    backgroundColor: C.maroon,
    borderColor: C.maroon,
  },

  dayText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.muted,
  },

  dayTextActive: {
    color: '#FFFFFF',
  },


  // ==========================================================
  // TIME FIELD
  // ==========================================================

  timeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 17,
  },

  timeColumn: {
    flex: 1,
  },

  timeButton: {
    height: 50,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 7,
  },

  timeText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: C.text,
  },


  // ==========================================================
  // DROPDOWN
  // ==========================================================

  dropdownGroup: {
    marginBottom: 16,
  },

  dropdownButton: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  dropdownIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#EAF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdownTextBox: {
    flex: 1,
    marginHorizontal: 10,
  },

  dropdownValue: {
    fontSize: 13,
    fontWeight: '800',
    color: C.text,
  },

  dropdownMeta: {
    marginTop: 3,
    fontSize: 10,
    color: C.muted,
  },


  // ==========================================================
  // SAVE BUTTON
  // ==========================================================

  saveButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: C.maroon,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },


  // ==========================================================
  // MODAL
  // ==========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 31, 25, 0.42)',
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: C.text,
  },


  // ==========================================================
  // OPTION LIST
  // ==========================================================

  optionList: {
    flexGrow: 0,
  },

  option: {
    minHeight: 58,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 7,
    backgroundColor: '#F7FAF9',
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionActive: {
    backgroundColor: '#E7F3EE',
  },

  optionTextBox: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: C.text,
  },

  optionTitleActive: {
    color: C.green,
    fontWeight: '900',
  },

  optionMeta: {
    marginTop: 3,
    fontSize: 10,
    color: C.muted,
  },

});