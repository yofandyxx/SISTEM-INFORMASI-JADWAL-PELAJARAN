/**
 
 *
 * Fitur utama:
 *
 * 1. Menginisialisasi database SQLite saat aplikasi dimuat.
 * 2. Memuat data Jadwal, Dosen, Mata Kuliah, Kelas, dan Ruang.
 * 3. Mengelola state navigasi dan status database.
 * 4. Menampilkan indikator loading dan pesan kesalahan.
 * 5. Menambah, mengedit, dan menghapus Jadwal.
 * 6. Memeriksa bentrok sebelum menambah/mengubah Jadwal.
 * 7. Membuka dan menutup form Tambah/Edit Jadwal.
 * 8. Mengelola CRUD Dosen dan Mata Kuliah melalui callback.
 * 9. Memperbarui data setelah operasi database berhasil.
 * 10. Menampilkan Dashboard, Jadwal, Master, dan Cari.
 * 11. Mengelola Bottom Navigation berbasis React State.
 * 12. Menampilkan ikon dan gaya menu aktif secara dinamis.
 *
 * Konsep pembelajaran:
 *
 * - React Functional Component
 * - React Hooks: useState dan useEffect
 * - TypeScript State dan Props
 * - Callback Function dan Event Handling
 * - Conditional Rendering dan Ternary Operator
 * - Array map() dan Object Array
 * - CRUD SQLite dan Separation of Concerns
 * - Conflict Detection dan Validasi Data
 * - Error Handling dengan try/catch
 * - Reusable Component dan Component Composition
 * - Dynamic Styling dan StyleSheet
 * - Safe Area dan Bottom Navigation Manual
 * ============================================================
 */

/**
 * ============================================================
 * IMPORT REACT DAN REACT HOOKS
 * ============================================================
 *
 * React
 * → library utama untuk membangun component.
 *
 * useEffect
 * → menjalankan proses inisialisasi ketika aplikasi pertama
 *   kali dimuat.
 *
 * useState
 * → menyimpan berbagai state utama aplikasi.
 */
import React, {
  useEffect,
  useState,
} from 'react';

/**
 * ============================================================
 * IMPORT COMPONENT REACT NATIVE
 * ============================================================
 *
 * ActivityIndicator
 * → indikator loading saat database sedang disiapkan.
 *
 * Alert
 * → menampilkan pesan berhasil atau gagal.
 *
 * Pressable
 * → tombol interaktif pada Bottom Navigation.
 *
 * StyleSheet
 * → mengelola style aplikasi.
 *
 * Text dan View
 * → component dasar antarmuka.
 */
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * StatusBar digunakan untuk mengatur tampilan status bar
 * pada perangkat.
 */
import { StatusBar } from 'expo-status-bar';

/**
 * SafeAreaProvider dan SafeAreaView memastikan tampilan
 * aplikasi berada pada area layar yang aman.
 */
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

/**
 * Ionicons digunakan untuk icon Bottom Navigation
 * dan icon status error database.
 */
import { Ionicons } from '@expo/vector-icons';

/**
 * ============================================================
 * IMPORT DATABASE FUNCTIONS
 * ============================================================
 *
 * Seluruh operasi SQLite dipisahkan ke database layer.
 *
 * App.tsx menggunakan fungsi-fungsi berikut untuk:
 *
 * - inisialisasi database
 * - membaca data
 * - menambah data
 * - mengubah data
 * - menghapus data
 * - memeriksa konflik Jadwal
 */
import {
  addSchedule,
  addSubject,
  addTeacher,
  deleteSchedule,
  deleteSubject,
  deleteTeacher,
  getClasses,
  getRooms,
  getSchedules,
  getSubjects,
  getTeachers,
  hasConflict,
  initDatabase,
  updateSchedule,
  updateSubject,
  updateTeacher,
} from './src/database/db';

/**
 * Design System warna aplikasi.
 */
import { C } from './src/components/UI';

/**
 * ============================================================
 * IMPORT SCREEN
 * ============================================================
 *
 * Dashboard
 * → halaman dashboard.
 *
 * ScheduleScreen
 * → halaman pengelolaan Jadwal.
 *
 * Master
 * → halaman Master Data.
 *
 * Search
 * → halaman pencarian Jadwal.
 *
 * Add
 * → form Tambah/Edit Jadwal.
 */
import Dashboard from './src/screens/DashboardScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import Master from './src/screens/MasterScreen';
import Search from './src/screens/SearchScreen';
import Add from './src/screens/AddScheduleScreen';

/**
 * ============================================================
 * IMPORT TYPES
 * ============================================================
 *
 * TypeScript type digunakan untuk memastikan struktur state,
 * input, props, dan callback konsisten dengan kontrak data
 * aplikasi.
 */
import {
  Room,
  Schedule,
  ScheduleInput,
  SchoolClass,
  Subject,
  SubjectInput,
  TabName,
  Teacher,
  TeacherInput,
} from './src/types';

/**
 * ============================================================
 * COMPONENT UTAMA APLIKASI
 * ============================================================
 *
 * App merupakan root component Project 02.
 *
 * Tanggung jawab utamanya:
 *
 * 1. Menginisialisasi database.
 * 2. Memuat data dari SQLite.
 * 3. Menyimpan state data utama.
 * 4. Mengelola Tambah/Edit/Hapus Jadwal.
 * 5. Mengelola CRUD Dosen.
 * 6. Mengelola CRUD Mata Kuliah.
 * 7. Memeriksa konflik Jadwal.
 * 8. Mengatur screen yang aktif.
 * 9. Mengatur form Tambah/Edit Jadwal.
 * 10. Menampilkan Bottom Navigation.
 */

export default function App() {
  /**
   * ==========================================================
   * STATE NAVIGASI
   * ==========================================================
   *
   * tab menentukan menu utama yang sedang aktif.
   *
   * Nilai awal:
   *
   * Dashboard
   */
  const [tab, setTab] = useState<TabName>('Dashboard');
  /**
   * Menentukan apakah form Tambah/Edit Jadwal sedang
   * ditampilkan.
   */
  const [showAddSchedule, setShowAddSchedule] =
    useState(false);
  /**
   * Menyimpan Jadwal yang sedang diedit.
   *
   * null
   * → tidak ada Jadwal yang sedang diedit.
   *
   * Schedule
   * → form sedang digunakan untuk mengedit Jadwal tersebut.
   */
  const [editingSchedule, setEditingSchedule] =
    useState<Schedule | null>(null);
  /**
   * ==========================================================
   * STATE STATUS DATABASE
   * ==========================================================
   */
  /**
   * ready menunjukkan apakah proses persiapan database
   * telah selesai.
   */
  const [ready, setReady] = useState(false);
  /**
   * error menyimpan pesan kesalahan jika proses inisialisasi
   * database gagal.
   */
  const [error, setError] = useState<string | null>(null);
  /**
   * ==========================================================
   * STATE DATA APLIKASI
   * ==========================================================
   *
   * Data yang dibaca dari SQLite kemudian disimpan pada
   * state agar dapat diteruskan ke screen melalui props.
   */
  const [schedules, setSchedules] =
    useState<Schedule[]>([]);
  const [teachers, setTeachers] =
    useState<Teacher[]>([]);
  const [subjects, setSubjects] =
    useState<Subject[]>([]);
  const [classes, setClasses] =
    useState<SchoolClass[]>([]);
  const [rooms, setRooms] =
    useState<Room[]>([]);
  /**
   * ==========================================================
   * LOAD DATA
   * ==========================================================
   *
   * loadData membaca seluruh data yang dibutuhkan aplikasi
   * dari database layer kemudian memperbarui state.
   *
   * Database
   *    ↓
   * getter functions
   *    ↓
   * setState()
   *    ↓
   * UI memperoleh data terbaru
   */
  const loadData = () => {
    setSchedules(getSchedules());
    setTeachers(getTeachers());
    setSubjects(getSubjects());
    setClasses(getClasses());
    setRooms(getRooms());
  };
  /**
   * ==========================================================
   * INISIALISASI DATABASE
   * ==========================================================
   *
   * useEffect dengan dependency [] dijalankan ketika
   * component App pertama kali dimuat.
   *
   * Alur:
   *
   * App Mount
   *    ↓
   * initDatabase()
   *    ↓
   * loadData()
   *    ↓
   * setReady(true)
   *
   * Jika terjadi error:
   *
   * catch
   *    ↓
   * setError(...)
   */
  useEffect(() => {
    try {
      /**
       * Membuka dan menyiapkan struktur database SQLite.
       */
      initDatabase();
      /**
       * Membaca data setelah database berhasil disiapkan.
       */
      loadData();
      /**
       * Menandai bahwa aplikasi siap digunakan.
       */
      setReady(true);
    } catch (databaseError) {
      /**
       * Jika object error merupakan instance Error,
       * gunakan message yang tersedia.
       *
       * Jika tidak, gunakan pesan default.
       */
      setError(
        databaseError instanceof Error
          ? databaseError.message
          : 'Database gagal diinisialisasi.'
      );
    }
  }, []);
  /**
   * ==========================================================
   * TAMBAH JADWAL
   * ==========================================================
   *
   * saveSchedule menerima ScheduleInput dari form.
   *
   * Sebelum data disimpan, program memeriksa konflik Jadwal.
   *
   * Jika bentrok:
   * → return false.
   *
   * Jika tidak bentrok:
   * → addSchedule()
   * → loadData()
   * → return true.
   */
  const saveSchedule = (input: ScheduleInput) => {
    /**
     * Validasi konflik dilakukan sebelum INSERT.
     */
    if (hasConflict(input)) {
      return false;
    }
    /**
     * Menambahkan Jadwal ke database.
     */
    addSchedule(input);
    /**
     * Memuat ulang data agar UI menggunakan data terbaru.
     */
    loadData();
    return true;
  };
  /**
   * ==========================================================
   * HAPUS JADWAL
   * ==========================================================
   *
   * removeSchedule menerima ID Jadwal.
   *
   * Setelah data dihapus, loadData() dipanggil agar state
   * schedules diperbarui.
   */
  const removeSchedule = (id: number) => {
    deleteSchedule(id);
    loadData();
  };
  /**
   * ==========================================================
   * EDIT JADWAL
   * ==========================================================
   *
   * saveEditedSchedule digunakan ketika pengguna menyimpan
   * perubahan pada Jadwal.
   *
   * Alur:
   *
   * editingSchedule tersedia?
   *       ↓
   * periksa konflik
   *       ↓
   * updateSchedule()
   *       ↓
   * loadData()
   *       ↓
   * return true
   */
  const saveEditedSchedule = (
    input: ScheduleInput
  ) => {
    /**
     * Edit tidak dapat dilakukan jika tidak ada Jadwal
     * yang sedang dipilih.
     */
    if (!editingSchedule) {
      return false;
    }
    /**
     * ID Jadwal yang sedang diedit dikirim sebagai ignoreId.
     *
     * Dengan demikian Jadwal tidak dianggap bentrok
     * dengan dirinya sendiri ketika proses validasi.
     */
    if (
      hasConflict(
        input,
        editingSchedule.id
      )
    ) {
      return false;
    }
    /**
     * Memperbarui data Jadwal.
     */
    updateSchedule(
      editingSchedule.id,
      input
    );
    /**
     * Refresh seluruh data.
     */
    loadData();
    return true;
  };
  /**
   * ==========================================================
   * BUKA FORM TAMBAH JADWAL
   * ==========================================================
   *
   * editingSchedule di-reset menjadi null agar Add screen
   * bekerja sebagai form Tambah.
   */
  const openAddSchedule = () => {
    setEditingSchedule(null);
    setShowAddSchedule(true);
  };
  /**
   * ==========================================================
   * BUKA FORM EDIT JADWAL
   * ==========================================================
   *
   * Jadwal yang dipilih disimpan ke editingSchedule.
   *
   * AddScheduleScreen kemudian menerima data tersebut melalui
   * initialSchedule.
   */
  const openEditSchedule = (
    item: Schedule
  ) => {
    setEditingSchedule(item);
    setShowAddSchedule(true);
  };
  /**
   * ==========================================================
   * TUTUP FORM JADWAL
   * ==========================================================
   *
   * Mengembalikan state form ke kondisi awal.
   */
  const closeScheduleForm = () => {
    setEditingSchedule(null);
    setShowAddSchedule(false);
  };
  /**
   * ==========================================================
   * HELPER MASTER DATA ACTION
   * ==========================================================
   *
   * executeMasterAction digunakan untuk mengurangi duplikasi
   * pola CRUD Dosen dan Mata Kuliah.
   *
   * Parameter:
   *
   * action
   * → fungsi database yang akan dijalankan.
   *
   * successMessage
   * → pesan yang ditampilkan jika operasi berhasil.
   *
   * Alur:
   *
   * action()
   *    ↓
   * loadData()
   *    ↓
   * Alert Berhasil
   *
   * Jika gagal:
   *
   * catch
   *    ↓
   * Alert Error
   */
  const executeMasterAction = (
    action: () => void,
    successMessage: string
  ) => {
    try {
      action();
      loadData();
      Alert.alert(
        'Berhasil',
        successMessage
      );
    } catch (actionError) {
      Alert.alert(
        'Data Tidak Dapat Diproses',
        actionError instanceof Error
          ? actionError.message
          : 'Terjadi kesalahan pada database.'
      );
    }
  };
  /**
   * ==========================================================
   * CRUD DOSEN - CREATE
   * ==========================================================
   */
  const createTeacher = (
    input: TeacherInput
  ) => {
    executeMasterAction(
      () => addTeacher(input),
      'Data dosen berhasil ditambahkan.'
    );
  };
  /**
   * ==========================================================
   * CRUD DOSEN - UPDATE
   * ==========================================================
   */
  const editTeacher = (
    id: number,
    input: TeacherInput
  ) => {
    executeMasterAction(
      () => updateTeacher(id, input),
      'Data dosen berhasil diperbarui.'
    );
  };
  /**
   * ==========================================================
   * CRUD DOSEN - DELETE
   * ==========================================================
   */
  const removeTeacher = (
    id: number
  ) => {
    executeMasterAction(
      () => deleteTeacher(id),
      'Data dosen berhasil dihapus.'
    );
  };
  /**
   * ==========================================================
   * CRUD MATA KULIAH - CREATE
   * ==========================================================
   */
  const createSubject = (
    input: SubjectInput
  ) => {
    executeMasterAction(
      () => addSubject(input),
      'Mata kuliah berhasil ditambahkan.'
    );
  };
  /**
   * ==========================================================
   * CRUD MATA KULIAH - UPDATE
   * ==========================================================
   */
  const editSubject = (
    id: number,
    input: SubjectInput
  ) => {
    executeMasterAction(
      () => updateSubject(id, input),
      'Mata kuliah berhasil diperbarui.'
    );
  };
  /**
   * ==========================================================
   * CRUD MATA KULIAH - DELETE
   * ==========================================================
   */
  const removeSubject = (
    id: number
  ) => {
    executeMasterAction(
      () => deleteSubject(id),
      'Mata kuliah berhasil dihapus.'
    );
  };
  /**
   * ==========================================================
   * LOADING / DATABASE ERROR SCREEN
   * ==========================================================
   *
   * Selama ready masih false, aplikasi belum menampilkan
   * screen utama.
   *
   * Terdapat dua kemungkinan:
   *
   * error tersedia
   * → tampilkan Error State.
   *
   * error tidak tersedia
   * → tampilkan Loading State.
   */
  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={[
            styles.safe,
            styles.center,
          ]}
        >
          <StatusBar style="dark" />
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons
                name="alert-circle-outline"
                size={34}
                color="#B42318"
              />
              <Text style={styles.errorTitle}>
                Database belum dapat dibuka
              </Text>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : (
            <>
              <ActivityIndicator
                size="large"
                color={C.maroon}
              />
              <Text style={styles.loadingTitle}>
                PPNP School Schedule
              </Text>
              <Text style={styles.loadingText}>
                Menyiapkan database jadwal...
              </Text>
            </>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
  /**
   * ==========================================================
   * MAIN APPLICATION
   * ==========================================================
   *
   * Bagian ini hanya ditampilkan setelah ready = true.
   */
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.safe}
        edges={[
          'top',
          'left',
          'right',
        ]}
      >
        <StatusBar style="dark" />
        {/*
         * ====================================================
         * FORM JADWAL vs MAIN SCREEN
         * ====================================================
         *
         * showAddSchedule menentukan tampilan utama:
         *
         * true
         * → tampilkan AddScheduleScreen.
         *
         * false
         * → tampilkan screen sesuai tab dan Bottom Navigation.
         */}
        {showAddSchedule ? (
          <Add
            teachers={teachers}
            subjects={subjects}
            classes={classes}
            rooms={rooms}
            onBack={closeScheduleForm}
            onSave={
              editingSchedule
                ? saveEditedSchedule
                : saveSchedule
            }
            initialSchedule={editingSchedule}
          />
        ) : (
          <>
            {/*
             * ================================================
             * CONTENT AREA
             * ================================================
             *
             * Screen yang ditampilkan ditentukan oleh
             * nilai state tab.
             */}
            <View style={styles.content}>
              {/*
               * ==============================================
               * TAB DASHBOARD
               * ==============================================
               */}
              {tab === 'Dashboard' && (
                <Dashboard
                  schedules={schedules}
                />
              )}
              {/*
               * ==============================================
               * TAB JADWAL
               * ==============================================
               *
               * ScheduleScreen menerima data Jadwal dan
               * callback Tambah/Edit/Hapus dari App.
               */}
              {tab === 'Jadwal' && (
                <ScheduleScreen
                  items={schedules}
                  onDelete={removeSchedule}
                  onEdit={openEditSchedule}
                  onAdd={openAddSchedule}
                />
              )}
              {/*
               * ==============================================
               * TAB MASTER
               * ==============================================
               *
               * Master menerima seluruh master data dan
               * callback CRUD Dosen serta Mata Kuliah.
               */}
              {tab === 'Master' && (
                <Master
                  teachers={teachers}
                  subjects={subjects}
                  classes={classes}
                  rooms={rooms}
                  onAddTeacher={
                    createTeacher
                  }
                  onUpdateTeacher={
                    editTeacher
                  }
                  onDeleteTeacher={
                    removeTeacher
                  }
                  onAddSubject={
                    createSubject
                  }
                  onUpdateSubject={
                    editSubject
                  }
                  onDeleteSubject={
                    removeSubject
                  }
                />
              )}
              {/*
               * ==============================================
               * TAB CARI
               * ==============================================
               *
               * Search menerima seluruh Jadwal melalui
               * props items.
               */}
              {tab === 'Cari' && (
                <Search
                  items={schedules}
                />
              )}
            </View>
            {/*
             * ================================================
             * BOTTOM NAVIGATION
             * ================================================
             *
             * BottomNavigation menerima:
             *
             * tab
             * → tab aktif saat ini.
             *
             * setTab
             * → callback untuk mengganti tab.
             */}
            <BottomNavigation
              tab={tab}
              setTab={setTab}
            />
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

/**
 * ============================================================
 * BOTTOM NAVIGATION COMPONENT
 * ============================================================
 *
 * BottomNavigation merupakan component internal App.tsx
 * yang menyediakan empat menu:
 *
 * 1. Dashboard / Beranda
 * 2. Jadwal
 * 3. Master
 * 4. Cari
 *
 * Component menerima:
 *
 * tab
 * → menu aktif.
 *
 * setTab
 * → fungsi untuk mengganti menu aktif.
 */

function BottomNavigation({
  tab,
  setTab,
}: {
  tab: TabName;
  setTab: (tab: TabName) => void;
}) {
  /**
   * ==========================================================
   * KONFIGURASI MENU NAVIGASI
   * ==========================================================
   *
   * Setiap object mempunyai:
   *
   * tab
   * → nilai TabName.
   *
   * icon
   * → nama icon Ionicons.
   *
   * label
   * → teks yang ditampilkan kepada pengguna.
   *
   * keyof typeof Ionicons.glyphMap memastikan nama icon
   * sesuai dengan daftar icon yang tersedia pada Ionicons.
   */
  const navigation: {
    tab: TabName;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }[] = [
    {
      tab: 'Dashboard',
      icon: 'grid-outline',
      label: 'Beranda',
    },
    {
      tab: 'Jadwal',
      icon: 'calendar-outline',
      label: 'Jadwal',
    },
    {
      tab: 'Master',
      icon: 'layers-outline',
      label: 'Master',
    },
    {
      tab: 'Cari',
      icon: 'search-outline',
      label: 'Cari',
    },
  ];
  /**
   * ==========================================================
   * RENDER BOTTOM NAVIGATION
   * ==========================================================
   */
  return (
    <View style={styles.bottom}>
      {navigation.map((item) => {
        /**
         * Membandingkan tab aktif dengan tab pada item.
         *
         * Jika sama:
         * active = true.
         *
         * Jika berbeda:
         * active = false.
         */
        const active =
          tab === item.tab;
        return (
          <Pressable
            key={item.tab}
              onPress={() =>
              setTab(item.tab)
            }
            style={styles.nav}
          >
            {/*
             * ================================================
             * NAVIGATION ICON
             * ================================================
             *
             * Style aktif hanya ditambahkan jika active=true.
             */}
            <View
              style={[
                styles.navIcon,
                active &&
                  styles.navIconActive,
              ]}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={
                  active
                    ? '#7A1230'
                    : '#F3CAD7'
                }
              />
            </View>
            {/*
             * ================================================
             * NAVIGATION LABEL
             * ================================================
             *
             * Label aktif menggunakan style tambahan
             * navTextActive.
             */}
            <Text
              style={[
                styles.navText,
                active &&
                  styles.navTextActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * ============================================================
 * STYLESHEET
 * ============================================================
 *
 * Style berikut mengatur:
 *
 * - Safe Area
 * - Content
 * - Loading State
 * - Error State
 * - Bottom Navigation
 * - Active Navigation
 *
 * Seluruh nilai style dipertahankan dari source asli.
 */

const styles = StyleSheet.create({
  /**
   * Container utama aplikasi.
   */
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  /**
   * Area screen utama.
   */
  content: {
    flex: 1,
  },
  /**
   * Digunakan pada Loading/Error State agar content
   * berada di tengah layar.
   */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  /**
   * Judul Loading State.
   */
  loadingTitle: {
    marginTop: 16,
    fontSize: 19,
    fontWeight: '800',
    color: C.text,
  },
  /**
   * Deskripsi Loading State.
   */
  loadingText: {
    marginTop: 6,
    fontSize: 13,
    color: C.muted,
  },
  /**
   * Container Error State.
   */
  errorBox: {
    alignItems: 'center',
    backgroundColor: '#FFF4F2',
    borderRadius: 18,
    padding: 20,
    width: '100%',
  },
  /**
   * Judul Error State.
   */
  errorTitle: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '800',
    color: '#B42318',
  },
  /**
   * Pesan detail error.
   */
  errorText: {
    marginTop: 6,
    textAlign: 'center',
    color: C.muted,
  },
  /**
   * ==========================================================
   * BOTTOM NAVIGATION
   * ==========================================================
   *
   * Menggunakan warna maroon gelap sebagai identitas
   * visual Project 02.
   */
  bottom: {
    height: 78,
    backgroundColor: '#4A1024',
    borderTopWidth: 1,
    borderTopColor: '#6F1B38',
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 6,
  },
  /**
   * Setiap menu menggunakan ruang yang sama.
   */
  nav: {
    flex: 1,
    alignItems: 'center',
  },
  /**
   * Container icon menu.
   */
  navIcon: {
    width: 42,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /**
   * Background icon ketika menu aktif.
   */
  navIconActive: {
    backgroundColor: '#F7C6D6',
  },
  /**
   * Label menu dalam kondisi normal.
   */
  navText: {
    fontSize: 10,
    color: '#F4DDE5',
    marginTop: 4,
    fontWeight: '600',
  },
  /**
   * Label menu ketika aktif.
   */
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
