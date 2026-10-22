/**

 * Fitur utama:
 *
 * 1. Menampilkan halaman utama Master Data.
 * 2. Menampilkan jumlah Dosen, Mata Kuliah, Kelas, dan Ruang.
 * 3. Menyediakan pengelolaan CRUD Dosen.
 * 4. Menyediakan pengelolaan CRUD Mata Kuliah.
 * 5. Mencari Dosen berdasarkan kode, nama, atau keahlian.
 * 6. Mencari Mata Kuliah berdasarkan kode atau nama.
 * 7. Menampilkan form tambah dan edit melalui Modal.
 * 8. Memvalidasi field wajib pada form.
 * 9. Meminta konfirmasi sebelum penghapusan data.
 * 10. Memilih warna untuk Mata Kuliah.
 * 11. Menampilkan Kelas dan Ruang sebagai referensi saja.
 * 12. Meneruskan operasi CRUD melalui callback parent.
 *
 * Konsep pembelajaran:
 *
 * - React Functional Component
 * - TypeScript Props dan Optional Props
 * - React useState dan useMemo
 * - React useEffect
 * - Conditional Rendering
 * - Array filter() dan map()
 * - Callback Function dan Event Handling
 * - Controlled Form dan Form Validation
 * - Reusable Component dan Component Composition
 * - Modal, Alert, dan Dynamic Styling
 * - StyleSheet
 * ============================================================
 */

/**

 * ============================================================

 * IMPORT LIBRARY REACT

 * ============================================================

 *

 * useMemo

 * Digunakan untuk menyimpan hasil proses pencarian/filter agar

 * hanya dihitung ulang ketika data atau keyword berubah.

 *

 * useState

 * Digunakan untuk mengelola state lokal component.

 */

import React, { useMemo, useState } from 'react';

/**

 * ============================================================

 * IMPORT COMPONENT REACT NATIVE

 * ============================================================

 */

import {

  Alert,

  Modal,

  Pressable,

  ScrollView,

  StyleSheet,

  Text,

  TextInput,

  View,

} from 'react-native';

/**

 * Ionicons digunakan sebagai sumber icon pada antarmuka.

 */

import { Ionicons } from '@expo/vector-icons';

/**

 * Mengambil Design System warna dan Header reusable.

 */

import { C, Header } from '../components/UI';

/**

 * ============================================================

 * IMPORT TYPE TYPESCRIPT

 * ============================================================

 *

 * Type digunakan agar struktur data yang diterima component

 * dapat diperiksa oleh TypeScript.

 */

import {

  Room,

  SchoolClass,

  Subject,

  SubjectInput,

  Teacher,

  TeacherInput,

} from '../types';

/**

 * ============================================================

 * MODE HALAMAN MASTER DATA

 * ============================================================

 *

 * MasterMode membatasi nilai mode hanya menjadi:

 *

 * home     = halaman utama Master Data

 * teachers = halaman pengelolaan Dosen

 * subjects = halaman pengelolaan Mata Kuliah

 */

type MasterMode = 'home' | 'teachers' | 'subjects';

/**

 * ============================================================

 * PROPS COMPONENT MASTER

 * ============================================================

 *

 * Component Master menerima:

 *

 * 1. Data Dosen.

 * 2. Data Mata Kuliah.

 * 3. Data Kelas.

 * 4. Data Ruang.

 * 5. Callback CRUD Dosen.

 * 6. Callback CRUD Mata Kuliah.

 *

 * Proses penyimpanan sebenarnya tidak dilakukan langsung pada

 * screen ini. Screen meneruskan data melalui callback yang

 * diberikan oleh parent component.

 */

type Props = {

  teachers: Teacher[];

  subjects: Subject[];

  classes: SchoolClass[];

  rooms: Room[];

  onAddTeacher: (input: TeacherInput) => void;

  onUpdateTeacher: (id: number, input: TeacherInput) => void;

  onDeleteTeacher: (id: number) => void;

  onAddSubject: (input: SubjectInput) => void;

  onUpdateSubject: (id: number, input: SubjectInput) => void;

  onDeleteSubject: (id: number) => void;

};

/**

 * ============================================================

 * PILIHAN WARNA MATA KULIAH

 * ============================================================

 *

 * Warna digunakan untuk membedakan Mata Kuliah secara visual

 * pada aplikasi.

 */

const SUBJECT_COLORS = [

  '#167D5A',

  '#2563EB',

  '#7C3AED',

  '#D97706',

  '#DC2626',

  '#0891B2',

];

/**

 * ============================================================

 * COMPONENT UTAMA MASTER

 * ============================================================

 *

 * Component ini bertindak sebagai pengatur halaman Master Data.

 *

 * mode = home

 * → menampilkan daftar kategori Master Data.

 *

 * mode = teachers

 * → menampilkan TeacherManager.

 *

 * mode = subjects

 * → menampilkan SubjectManager.

 */

export default function Master(props: Props) {

  /**

   * Menyimpan halaman Master Data yang sedang aktif.

   *

   * Nilai awal adalah "home".

   */

  const [mode, setMode] = useState<MasterMode>('home');

  /**

   * ==========================================================

   * MODE DATA DOSEN

   * ==========================================================

   *

   * Jika pengguna memilih Data Dosen, component utama

   * mengembalikan TeacherManager.

   */

  if (mode === 'teachers') {

    return (

      <TeacherManager

        items={props.teachers}

        onBack={() => setMode('home')}

        onAdd={props.onAddTeacher}

        onUpdate={props.onUpdateTeacher}

        onDelete={props.onDeleteTeacher}

      />

    );

  }

  /**

   * ==========================================================

   * MODE DATA MATA KULIAH

   * ==========================================================

   *

   * Jika pengguna memilih Mata Kuliah, component utama

   * mengembalikan SubjectManager.

   */

  if (mode === 'subjects') {

    return (

      <SubjectManager

        items={props.subjects}

        onBack={() => setMode('home')}

        onAdd={props.onAddSubject}

        onUpdate={props.onUpdateSubject}

        onDelete={props.onDeleteSubject}

      />

    );

  }

  /**

   * ==========================================================

   * DATA CARD MASTER

   * ==========================================================

   *

   * Empat card ditampilkan pada halaman utama Master Data.

   *

   * Dosen dan Mata Kuliah:

   * enabled = true

   * → dapat dibuka dan dikelola.

   *

   * Kelas dan Ruang:

   * enabled = false

   * → hanya digunakan sebagai data referensi.

   */

  const cards = [

    {

      icon: 'people' as const,

      title: 'Data Dosen',

      count: props.teachers.length,

      subtitle: 'CRUD data pengajar',

      action: () => setMode('teachers'),

      enabled: true,

    },

    {

      icon: 'book' as const,

      title: 'Mata Kuliah',

      count: props.subjects.length,

      subtitle: 'CRUD mata kuliah',

      action: () => setMode('subjects'),

      enabled: true,

    },

    {

      icon: 'school' as const,

      title: 'Data Kelas',

      count: props.classes.length,

      subtitle: 'Referensi kelas aktif',

      action: () => undefined,

      enabled: false,

    },

    {

      icon: 'business' as const,

      title: 'Data Ruang',

      count: props.rooms.length,

      subtitle: 'Referensi ruang pembelajaran',

      action: () => undefined,

      enabled: false,

    },

  ];

  /**

   * ==========================================================

   * RENDER HALAMAN UTAMA MASTER DATA

   * ==========================================================

   */

  return (

    <ScrollView contentContainerStyle={styles.wrap}>

      <Header

        title="Master Data"

        subtitle="Referensi utama penjadwalan"

      />

      <Text style={styles.description}>

        Kelola dosen dan mata kuliah. Data yang tersimpan langsung

        tersedia pada form pembuatan jadwal.

      </Text>

      {/*

       * Melakukan iterasi terhadap array cards.

       *

       * Setiap item menghasilkan satu card Master Data.

       */}

      {cards.map((item) => (

        <Pressable

          key={item.title}

          onPress={item.action}

          disabled={!item.enabled}

          style={styles.card}

        >

          <View style={styles.iconBox}>

            <Ionicons

              name={item.icon}

              size={23}

              color={C.green}

            />

          </View>

          <View style={styles.cardText}>

            <Text style={styles.cardTitle}>

              {item.title}

            </Text>

            <Text style={styles.cardSubtitle}>

              {item.subtitle}

            </Text>

          </View>

          <Text style={styles.count}>

            {item.count}

          </Text>

          {/*

           * Icon berbeda berdasarkan status card.

           *

           * enabled = true

           * → chevron-forward

           *

           * enabled = false

           * → lock-closed-outline

           */}

          <Ionicons

            name={

              item.enabled

                ? 'chevron-forward'

                : 'lock-closed-outline'

            }

            size={18}

            color="#9BAAA5"

          />

        </Pressable>

      ))}

      <View style={styles.infoBox}>

        <Ionicons

          name="information-circle-outline"

          size={20}

          color={C.green}

        />

        <Text style={styles.infoText}>

          Project 02 memfokuskan CRUD pada Dosen dan Mata Kuliah.

          Kelas dan Ruang tetap digunakan sebagai data referensi SQLite.

        </Text>

      </View>

    </ScrollView>

  );

}

/**

 * ============================================================

 * COMPONENT TEACHER MANAGER

 * ============================================================

 *

 * Bertanggung jawab terhadap antarmuka pengelolaan Dosen:

 *

 * - menampilkan data Dosen;

 * - mencari Dosen;

 * - membuka form tambah;

 * - membuka form edit;

 * - meminta konfirmasi sebelum hapus;

 * - meneruskan proses CRUD melalui callback.

 */

function TeacherManager({

  items,

  onBack,

  onAdd,

  onUpdate,

  onDelete,

}: {

  items: Teacher[];

  onBack: () => void;

  onAdd: (input: TeacherInput) => void;

  onUpdate: (id: number, input: TeacherInput) => void;

  onDelete: (id: number) => void;

}) {

  /**

   * query

   * → keyword pencarian.

   *

   * editing

   * → Dosen yang sedang diedit.

   * → null berarti mode Tambah.

   *

   * formOpen

   * → menentukan apakah modal form tampil.

   */

  const [query, setQuery] = useState('');

  const [editing, setEditing] = useState<Teacher | null>(null);

  const [formOpen, setFormOpen] = useState(false);

  /**

   * ==========================================================

   * FILTER / PENCARIAN DOSEN

   * ==========================================================

   *

   * useMemo menghitung filtered kembali jika:

   *

   * - items berubah; atau

   * - query berubah.

   *

   * Pencarian dilakukan terhadap:

   *

   * code + name + expertise

   *

   * Seluruh teks diubah menjadi lowercase agar pencarian

   * tidak sensitif terhadap huruf besar/kecil.

   */

  const filtered = useMemo(() => {

    const keyword = query.toLowerCase();

    return items.filter((item) =>

      `${item.code} ${item.name} ${item.expertise}`

        .toLowerCase()

        .includes(keyword)

    );

  }, [items, query]);

  /**

   * ==========================================================

   * BUKA FORM TAMBAH DOSEN

   * ==========================================================

   *

   * editing diubah menjadi null agar TeacherForm mengetahui

   * bahwa pengguna sedang menambahkan data baru.

   */

  const openAdd = () => {

    setEditing(null);

    setFormOpen(true);

  };

  /**

   * ==========================================================

   * BUKA FORM EDIT DOSEN

   * ==========================================================

   *

   * Data Dosen yang dipilih disimpan pada editing.

   */

  const openEdit = (item: Teacher) => {

    setEditing(item);

    setFormOpen(true);

  };

  /**

   * ==========================================================

   * KONFIRMASI HAPUS DOSEN

   * ==========================================================

   *

   * Alert digunakan agar data tidak langsung dihapus ketika

   * tombol hapus ditekan.

   */

  const confirmDelete = (item: Teacher) => {

    Alert.alert(

      'Hapus Dosen',

      `Hapus ${item.name}?`,

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

    );

  };

  /**

   * ==========================================================

   * RENDER TEACHER MANAGER

   * ==========================================================

   */

  return (

    <ScrollView contentContainerStyle={styles.wrap}>

      <SubHeader

        title="Data Dosen"

        subtitle={`${items.length} dosen tersimpan`}

        onBack={onBack}

        onAdd={openAdd}

      />

      <SearchBox

        value={query}

        onChange={setQuery}

        placeholder="Cari kode, nama, atau bidang..."

      />

      {/*

       * filtered berisi data Dosen yang sudah melewati

       * proses pencarian.

       */}

      {filtered.map((item) => (

        <View

          key={item.id}

          style={styles.dataCard}

        >

          <View style={styles.avatar}>

            <Ionicons

              name="person-outline"

              size={20}

              color={C.green}

            />

          </View>

          <View style={styles.dataContent}>

            <Text style={styles.dataTitle}>

              {item.name}

            </Text>

            <Text style={styles.dataMeta}>

              {item.code} • {item.expertise}

            </Text>

          </View>

          <ActionButton

            icon="create-outline"

            onPress={() => openEdit(item)}

          />

          <ActionButton

            icon="trash-outline"

            danger

            onPress={() => confirmDelete(item)}

          />

        </View>

      ))}

      {/*

       * TeacherForm digunakan untuk dua kebutuhan:

       *

       * editing === null

       * → Tambah Dosen.

       *

       * editing berisi Teacher

       * → Edit Dosen.

       */}

      <TeacherForm

        visible={formOpen}

        item={editing}

        onClose={() => setFormOpen(false)}

        onSubmit={(input) => {

          if (editing) {

            onUpdate(editing.id, input);

          } else {

            onAdd(input);

          }

          setFormOpen(false);

        }}

      />

    </ScrollView>

  );

}

/**

 * ============================================================

 * COMPONENT SUBJECT MANAGER

 * ============================================================

 *

 * Bertanggung jawab terhadap antarmuka pengelolaan

 * Mata Kuliah.

 */

function SubjectManager({

  items,

  onBack,

  onAdd,

  onUpdate,

  onDelete,

}: {

  items: Subject[];

  onBack: () => void;

  onAdd: (input: SubjectInput) => void;

  onUpdate: (id: number, input: SubjectInput) => void;

  onDelete: (id: number) => void;

}) {

  /**

   * State pencarian, data yang sedang diedit,

   * dan status modal form.

   */

  const [query, setQuery] = useState('');

  const [editing, setEditing] = useState<Subject | null>(null);

  const [formOpen, setFormOpen] = useState(false);

  /**

   * ==========================================================

   * FILTER / PENCARIAN MATA KULIAH

   * ==========================================================

   *

   * Pencarian dilakukan berdasarkan:

   *

   * code + name

   */

  const filtered = useMemo(() => {

    const keyword = query.toLowerCase();

    return items.filter((item) =>

      `${item.code} ${item.name}`

        .toLowerCase()

        .includes(keyword)

    );

  }, [items, query]);

  /**

   * ==========================================================

   * KONFIRMASI HAPUS MATA KULIAH

   * ==========================================================

   */

  const confirmDelete = (item: Subject) => {

    Alert.alert(

      'Hapus Mata Kuliah',

      `Hapus ${item.name}?`,

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

    );

  };

  /**

   * ==========================================================

   * RENDER SUBJECT MANAGER

   * ==========================================================

   */

  return (

    <ScrollView contentContainerStyle={styles.wrap}>

      <SubHeader

        title="Mata Kuliah"

        subtitle={`${items.length} mata kuliah tersimpan`}

        onBack={onBack}

        onAdd={() => {

          setEditing(null);

          setFormOpen(true);

        }}

      />

      <SearchBox

        value={query}

        onChange={setQuery}

        placeholder="Cari kode atau mata kuliah..."

      />

      {filtered.map((item) => (

        <View

          key={item.id}

          style={styles.dataCard}

        >

          {/*

           * Warna Mata Kuliah berasal dari item.color.

           */}

          <View

            style={[

              styles.subjectColor,

              {

                backgroundColor: item.color,

              },

            ]}

          />

          <View style={styles.dataContent}>

            <Text style={styles.dataTitle}>

              {item.name}

            </Text>

            <Text style={styles.dataMeta}>

              {item.code}

            </Text>

          </View>

          <ActionButton

            icon="create-outline"

            onPress={() => {

              setEditing(item);

              setFormOpen(true);

            }}

          />

          <ActionButton

            icon="trash-outline"

            danger

            onPress={() => confirmDelete(item)}

          />

        </View>

      ))}

      <SubjectForm

        visible={formOpen}

        item={editing}

        onClose={() => setFormOpen(false)}

        onSubmit={(input) => {

          if (editing) {

            onUpdate(editing.id, input);

          } else {

            onAdd(input);

          }

          setFormOpen(false);

        }}

      />

    </ScrollView>

  );

}

/**

 * ============================================================

 * REUSABLE COMPONENT - SUB HEADER

 * ============================================================

 *

 * Digunakan pada halaman Data Dosen dan Mata Kuliah.

 *

 * Menyediakan:

 *

 * - tombol kembali;

 * - judul;

 * - subjudul;

 * - tombol tambah.

 */

function SubHeader({

  title,

  subtitle,

  onBack,

  onAdd,

}: {

  title: string;

  subtitle: string;

  onBack: () => void;

  onAdd: () => void;

}) {

  return (

    <View style={styles.subHeader}>

      <Pressable

        onPress={onBack}

        style={styles.backButton}

      >

        <Ionicons

          name="arrow-back"

          size={21}

          color={C.green}

        />

      </Pressable>

      <View style={styles.subHeaderText}>

        <Text style={styles.pageTitle}>

          {title}

        </Text>

        <Text style={styles.pageSubtitle}>

          {subtitle}

        </Text>

      </View>

      <Pressable

        onPress={onAdd}

        style={styles.addButton}

      >

        <Ionicons

          name="add"

          size={23}

          color="#FFFFFF"

        />

      </Pressable>

    </View>

  );

}

/**

 * ============================================================

 * REUSABLE COMPONENT - SEARCH BOX

 * ============================================================

 *

 * Component input pencarian yang dapat digunakan kembali.

 */

function SearchBox({

  value,

  onChange,

  placeholder,

}: {

  value: string;

  onChange: (value: string) => void;

  placeholder: string;

}) {

  return (

    <View style={styles.searchBox}>

      <Ionicons

        name="search-outline"

        size={19}

        color={C.muted}

      />

      <TextInput

        value={value}

        onChangeText={onChange}

        placeholder={placeholder}

        placeholderTextColor="#9BAAA5"

        style={styles.searchInput}

      />

    </View>

  );

}

/**

 * ============================================================

 * REUSABLE COMPONENT - ACTION BUTTON

 * ============================================================

 *

 * Digunakan untuk tombol aksi seperti:

 *

 * - Edit.

 * - Hapus.

 *

 * danger merupakan Optional Props.

 *

 * danger = true

 * → menggunakan tampilan tombol berbahaya / destructive.

 *

 * danger tidak diberikan

 * → nilai default false.

 */

function ActionButton({

  icon,

  onPress,

  danger = false,

}: {

  icon: keyof typeof Ionicons.glyphMap;

  onPress: () => void;

  danger?: boolean;

}) {

  return (

    <Pressable

      onPress={onPress}

      style={[

        styles.actionButton,

        danger && styles.actionDanger,

      ]}

    >

      <Ionicons

        name={icon}

        size={18}

        color={danger ? '#C2413B' : C.green}

      />

    </Pressable>

  );

}

/**

 * ============================================================

 * COMPONENT FORM DOSEN

 * ============================================================

 *

 * Satu form digunakan untuk:

 *

 * - Tambah Dosen.

 * - Edit Dosen.

 *

 * Mode ditentukan berdasarkan nilai item.

 */

function TeacherForm({

  visible,

  item,

  onClose,

  onSubmit,

}: {

  visible: boolean;

  item: Teacher | null;

  onClose: () => void;

  onSubmit: (input: TeacherInput) => void;

}) {

  const [code, setCode] = useState('');

  const [name, setName] = useState('');

  const [expertise, setExpertise] = useState('');

  /**

   * ==========================================================

   * SINKRONISASI FORM

   * ==========================================================

   *

   * useEffect dijalankan ketika visible atau item berubah.

   *

   * Jika mode Edit:

   * → form diisi menggunakan data item.

   *

   * Jika mode Tambah:

   * → item bernilai null sehingga field menjadi kosong.

   *

   * Operator ?? menggunakan nilai di sebelah kanan jika

   * nilai di sebelah kiri null atau undefined.

   */

  React.useEffect(() => {

    if (visible) {

      setCode(item?.code ?? '');

      setName(item?.name ?? '');

      setExpertise(item?.expertise ?? '');

    }

  }, [visible, item]);

  /**

   * ==========================================================

   * VALIDASI DAN SUBMIT DOSEN

   * ==========================================================

   *

   * Semua field wajib diisi.

   *

   * trim() digunakan agar input yang hanya berisi spasi

   * dianggap kosong.

   */

  const submit = () => {

    if (!code.trim() || !name.trim() || !expertise.trim()) {

      Alert.alert(

        'Validasi',

        'Kode, nama dosen, dan bidang keahlian wajib diisi.'

      );

      return;

    }

    onSubmit({

      code,

      name,

      expertise,

    });

  };

  return (

    <FormModal

      visible={visible}

      title={item ? 'Edit Dosen' : 'Tambah Dosen'}

      onClose={onClose}

      onSubmit={submit}

    >

      <FormInput

        label="Kode Dosen"

        value={code}

        onChange={setCode}

        placeholder="Contoh: DSN-006"

      />

      <FormInput

        label="Nama Dosen"

        value={name}

        onChange={setName}

        placeholder="Nama lengkap dosen"

      />

      <FormInput

        label="Bidang Keahlian"

        value={expertise}

        onChange={setExpertise}

        placeholder="Contoh: Pemrograman Mobile"

      />

    </FormModal>

  );

}

/**

 * ============================================================

 * COMPONENT FORM MATA KULIAH

 * ============================================================

 *

 * Digunakan untuk:

 *

 * - Tambah Mata Kuliah.

 * - Edit Mata Kuliah.

 *

 * Selain kode dan nama, pengguna dapat memilih warna Jadwal.

 */

function SubjectForm({

  visible,

  item,

  onClose,

  onSubmit,

}: {

  visible: boolean;

  item: Subject | null;

  onClose: () => void;

  onSubmit: (input: SubjectInput) => void;

}) {

  const [code, setCode] = useState('');

  const [name, setName] = useState('');

  const [color, setColor] = useState(SUBJECT_COLORS[0]);

  /**

   * Mengisi ulang form setiap modal dibuka atau item berubah.

   *

   * Jika item null:

   * - code = ''

   * - name = ''

   * - color = warna pertama SUBJECT_COLORS

   */

  React.useEffect(() => {

    if (visible) {

      setCode(item?.code ?? '');

      setName(item?.name ?? '');

      setColor(item?.color ?? SUBJECT_COLORS[0]);

    }

  }, [visible, item]);

  /**

   * ==========================================================

   * VALIDASI DAN SUBMIT MATA KULIAH

   * ==========================================================

   */

  const submit = () => {

    if (!code.trim() || !name.trim()) {

      Alert.alert(

        'Validasi',

        'Kode dan nama mata kuliah wajib diisi.'

      );

      return;

    }

    onSubmit({

      code,

      name,

      color,

    });

  };

  return (

    <FormModal

      visible={visible}

      title={

        item

          ? 'Edit Mata Kuliah'

          : 'Tambah Mata Kuliah'

      }

      onClose={onClose}

      onSubmit={submit}

    >

      <FormInput

        label="Kode Mata Kuliah"

        value={code}

        onChange={setCode}

        placeholder="Contoh: MK-006"

      />

      <FormInput

        label="Nama Mata Kuliah"

        value={name}

        onChange={setName}

        placeholder="Nama mata kuliah"

      />

      <Text style={styles.formLabel}>

        Warna Jadwal

      </Text>

      <View style={styles.colorRow}>

        {/*

         * Menampilkan seluruh warna pada SUBJECT_COLORS.

         *

         * Warna yang sedang dipilih mendapatkan style

         * colorSelected dan icon checkmark.

         */}

        {SUBJECT_COLORS.map((itemColor) => (

          <Pressable

            key={itemColor}

            onPress={() => setColor(itemColor)}

            style={[

              styles.colorChoice,

              {

                backgroundColor: itemColor,

              },

              color === itemColor && styles.colorSelected,

            ]}

          >

            {color === itemColor && (

              <Ionicons

                name="checkmark"

                size={18}

                color="#FFFFFF"

              />

            )}

          </Pressable>

        ))}

      </View>

    </FormModal>

  );

}

/**

 * ============================================================

 * REUSABLE COMPONENT - FORM MODAL

 * ============================================================

 *

 * FormModal menjadi container reusable untuk form.

 *

 * children: React.ReactNode

 * memungkinkan component lain menyisipkan isi form berbeda

 * ke dalam modal yang sama.

 */

function FormModal({

  visible,

  title,

  onClose,

  onSubmit,

  children,

}: {

  visible: boolean;

  title: string;

  onClose: () => void;

  onSubmit: () => void;

  children: React.ReactNode;

}) {

  return (

    <Modal

      visible={visible}

      transparent

      animationType="slide"

      onRequestClose={onClose}

    >

      <View style={styles.modalOverlay}>

        <View style={styles.modalCard}>

          <View style={styles.modalHeader}>

            <Text style={styles.modalTitle}>

              {title}

            </Text>

            <Pressable onPress={onClose}>

              <Ionicons

                name="close"

                size={24}

                color={C.text}

              />

            </Pressable>

          </View>

          {/*

           * children berisi FormInput atau component lain

           * yang dikirim dari parent FormModal.

           */}

          {children}

          <Pressable

            onPress={onSubmit}

            style={styles.saveButton}

          >

            <Ionicons

              name="checkmark-circle-outline"

              size={20}

              color="#FFFFFF"

            />

            <Text style={styles.saveText}>

              Simpan Data

            </Text>

          </Pressable>

        </View>

      </View>

    </Modal>

  );

}

/**

 * ============================================================

 * REUSABLE COMPONENT - FORM INPUT

 * ============================================================

 *

 * Membentuk satu field input yang terdiri dari:

 *

 * label

 * +

 * TextInput

 *

 * Component ini digunakan kembali oleh TeacherForm dan

 * SubjectForm.

 */

function FormInput({

  label,

  value,

  onChange,

  placeholder,

}: {

  label: string;

  value: string;

  onChange: (value: string) => void;

  placeholder: string;

}) {

  return (

    <View style={styles.formGroup}>

      <Text style={styles.formLabel}>

        {label}

      </Text>

      <TextInput

        value={value}

        onChangeText={onChange}

        placeholder={placeholder}

        placeholderTextColor="#9BAAA5"

        style={styles.formInput}

      />

    </View>

  );

}

/**

 * ============================================================

 * STYLESHEET

 * ============================================================

 *

 * StyleSheet digunakan untuk memisahkan logika program dari

 * konfigurasi tampilan.

 *

 * Tidak terdapat perubahan nilai style dari source asli.

 */

const styles = StyleSheet.create({

  wrap: {

    paddingHorizontal: 20,

    paddingBottom: 110,

    backgroundColor: C.bg,

    minHeight: '100%',

  },

  description: {

    fontSize: 12,

    lineHeight: 18,

    color: C.muted,

    marginBottom: 16,

  },

  card: {

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: C.line,

    borderRadius: 18,

    padding: 15,

    marginBottom: 11,

    flexDirection: 'row',

    alignItems: 'center',

    gap: 12,

  },

  iconBox: {

    width: 44,

    height: 44,

    borderRadius: 14,

    backgroundColor: '#E7F3EE',

    alignItems: 'center',

    justifyContent: 'center',

  },

  cardText: {

    flex: 1,

  },

  cardTitle: {

    fontWeight: '800',

    color: C.text,

  },

  cardSubtitle: {

    fontSize: 11,

    color: C.muted,

    marginTop: 3,

  },

  count: {

    fontSize: 18,

    fontWeight: '900',

    color: C.green,

  },

  infoBox: {

    flexDirection: 'row',

    gap: 9,

    backgroundColor: '#EAF5F0',

    borderRadius: 16,

    padding: 14,

    marginTop: 6,

  },

  infoText: {

    flex: 1,

    fontSize: 11,

    lineHeight: 17,

    color: C.muted,

  },

  subHeader: {

    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 8,

    marginBottom: 18,

  },

  backButton: {

    width: 42,

    height: 42,

    borderRadius: 13,

    backgroundColor: '#E6F3EE',

    alignItems: 'center',

    justifyContent: 'center',

  },

  subHeaderText: {

    flex: 1,

    marginLeft: 12,

  },

  pageTitle: {

    fontSize: 20,

    fontWeight: '900',

    color: C.text,

  },

  pageSubtitle: {

    marginTop: 2,

    fontSize: 11,

    color: C.muted,

  },

  addButton: {

    width: 42,

    height: 42,

    borderRadius: 13,

    backgroundColor: C.green,

    alignItems: 'center',

    justifyContent: 'center',

  },

  searchBox: {

    height: 48,

    borderWidth: 1,

    borderColor: C.line,

    borderRadius: 15,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 14,

    marginBottom: 14,

  },

  searchInput: {

    flex: 1,

    marginLeft: 8,

    color: C.text,

  },

  dataCard: {

    minHeight: 70,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: C.line,

    borderRadius: 17,

    padding: 12,

    marginBottom: 10,

    flexDirection: 'row',

    alignItems: 'center',

    gap: 9,

  },

  avatar: {

    width: 42,

    height: 42,

    borderRadius: 13,

    backgroundColor: '#E7F3EE',

    alignItems: 'center',

    justifyContent: 'center',

  },

  subjectColor: {

    width: 9,

    height: 42,

    borderRadius: 8,

  },

  dataContent: {

    flex: 1,

  },

  dataTitle: {

    fontSize: 13,

    fontWeight: '800',

    color: C.text,

  },

  dataMeta: {

    marginTop: 4,

    fontSize: 10,

    color: C.muted,

  },

  actionButton: {

    width: 34,

    height: 34,

    borderRadius: 11,

    backgroundColor: '#EAF5F0',

    alignItems: 'center',

    justifyContent: 'center',

  },

  actionDanger: {

    backgroundColor: '#FFF0EF',

  },

  modalOverlay: {

    flex: 1,

    backgroundColor: 'rgba(13, 31, 25, 0.42)',

    justifyContent: 'flex-end',

  },

  modalCard: {

    backgroundColor: '#FFFFFF',

    borderTopLeftRadius: 26,

    borderTopRightRadius: 26,

    padding: 22,

    paddingBottom: 34,

  },

  modalHeader: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 20,

  },

  modalTitle: {

    fontSize: 19,

    fontWeight: '900',

    color: C.text,

  },

  formGroup: {

    marginBottom: 14,

  },

  formLabel: {

    fontSize: 12,

    fontWeight: '800',

    color: C.text,

    marginBottom: 8,

  },

  formInput: {

    height: 48,

    borderWidth: 1,

    borderColor: C.line,

    borderRadius: 14,

    paddingHorizontal: 13,

    color: C.text,

    backgroundColor: '#FAFCFB',

  },

  colorRow: {

    flexDirection: 'row',

    gap: 10,

    marginBottom: 20,

  },

  colorChoice: {

    width: 38,

    height: 38,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',

  },

  colorSelected: {

    borderWidth: 3,

    borderColor: '#D8EEE6',

  },

  saveButton: {

    height: 52,

    borderRadius: 16,

    backgroundColor: C.green,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 8,

    marginTop: 4,

  },

  saveText: {

    color: '#FFFFFF',

    fontWeight: '800',

  },

});
