import { ProjectConfiguration } from '../types/prd';

export function createDefaultProjectConfig(): ProjectConfiguration {
  return {
    id: 'draft-' + Date.now(),
    name: 'Aplikasi Web Modern',
    projectType: 'saas',
    description: 'Aplikasi web produktivitas yang membantu pengguna menyelesaikan pekerjaan harian secara efisien dan terorganisir.',
    targetAudience: 'Pengguna umum, profesional mandiri, dan tim kecil',
    complexity: 'standard',
    outputLanguage: 'id',
    existingOrNew: 'new',
    designReferenceUrl: '',
    additionalNotes: '',

    problemStatement: 'Proses manual saat ini memakan waktu lama, rawan salah hitung, dan sulit dilacak riwayatnya.',
    desiredOutcome: 'Menyediakan satu aplikasi web terintegrasi dengan antarmuka yang bersih, cepat, dan responsif di semua perangkat.',
    primaryUserNeeds: [
      'Melihat ringkasan informasi penting segera setelah membuka aplikasi',
      'Menginput data dengan validasi otomatis agar tidak ada kolom terlewat',
      'Mengekspor atau membagikan hasil pekerjaan dengan mudah'
    ],
    businessObjectives: [
      'Mengurangi waktu pengerjaan tugas pengguna hingga 60%',
      'Mencapai tingkat kepuasan kemudahan penggunaan (CSAT) >= 4.5/5.0'
    ],
    successMetrics: [
      { id: 'SM-01', metric: 'Kecepatan Pemuatan (Page Load)', target: '< 600ms', status: 'confirmed' },
      { id: 'SM-02', metric: 'Tingkat Keberhasilan Alur Pengguna', target: '> 90%', status: 'confirmed' }
    ],
    inScope: [
      'Halaman beranda pengenalan dan penjelasan fitur',
      'Otentikasi pengguna aman dan proteksi rute',
      'Dasbor interaktif dengan visualisasi data utama',
      'Penyimpanan data lokal atau database dengan validasi ketat'
    ],
    outOfScope: [
      'Aplikasi native iOS / Android pada rilis awal',
      'Sistem pembayaran multi-mata uang internasional'
    ],
    knownConstraints: [
      'Dapat dijalankan di lingkungan Node.js 20+ dan peramban web modern'
    ],
    assumptions: [
      'Pengguna mengakses menggunakan koneksi internet standar'
    ],
    openQuestions: [],

    hasUserAccounts: true,
    roles: [
      {
        id: 'role-admin',
        name: 'Administrator',
        description: 'Pengelola penuh sistem dan konfigurasi umum',
        accessiblePages: ['/', '/dashboard', '/users', '/settings'],
        permissions: { view: true, create: true, update: true, delete: true, approve: true },
        sensitiveActions: ['Hapus Pengguna', 'Reset Data']
      },
      {
        id: 'role-user',
        name: 'Pengguna Terdaftar',
        description: 'Pengguna yang membuat dan mengelola data pribadinya',
        accessiblePages: ['/', '/dashboard', '/my-items', '/profile'],
        permissions: { view: true, create: true, update: true, delete: false, approve: false },
        sensitiveActions: []
      }
    ],

    selectedFeatures: [
      {
        id: 'AUTH-01',
        name: 'Login & Register Email/Password',
        category: 'A. Otentikasi & Akun',
        description: 'Pendaftaran akun baru dan login aman dengan email dan password.',
        priority: 'P0'
      },
      {
        id: 'USER-01',
        name: 'Profil Pengguna & Avatar',
        category: 'B. Manajemen Pengguna & RBAC',
        description: 'Halaman untuk melihat dan mengubah profil, foto, serta nama akun.',
        priority: 'P1'
      },
      {
        id: 'DATA-02',
        name: 'Operasi Tambah, Ubah, Hapus (CRUD Lengkap)',
        category: 'D. Manajemen Data (CRUD & Filter)',
        description: 'Formulir input data, modal edit, dan konfirmasi hapus data.',
        priority: 'P0'
      },
      {
        id: 'DASH-01',
        name: 'Kartu Ringkasan Metrik (KPI Summary Cards)',
        category: 'E. Dashboard & Analitik',
        description: 'Ringkasan metrik statistik utama di bagian atas dashboard.',
        priority: 'P0'
      },
      {
        id: 'UI-01',
        name: 'Notifikasi Toast (Feedback Aksi Instan)',
        category: 'K. Interaksi UI & Modal',
        description: 'Pesan popup kecil di sudut layar yang otomatis hilang saat aksi sukses/gagal.',
        priority: 'P0'
      }
    ],

    businessRules: [
      {
        id: 'BR-001',
        name: 'Pencegahan Duplikasi Email',
        condition: 'Pengguna baru mendaftar dengan alamat email.',
        requiredBehavior: 'Sistem memeriksa apakah email sudah terdaftar. Jika ada, tampilkan pesan ramah untuk login.',
        failureBehavior: 'Tolak registrasi dan beri tautan "Lupa Kata Sandi".'
      },
      {
        id: 'BR-002',
        name: 'Konfirmasi Penghapusan Data',
        condition: 'Pengguna mengeklik tombol hapus rekaman.',
        requiredBehavior: 'Tampilkan dialog modal konfirmasi dengan peringatan jelas sebelum mengeksekusi penghapusan.',
        failureBehavior: 'Jika pengguna membatalkan, tidak ada perubahan yang dieksekusi.'
      }
    ],

    userFlows: [
      {
        id: 'UF-001',
        name: 'Registrasi dan Onboarding Pertama Kali',
        actor: 'Pengguna Baru',
        startingCondition: 'Pengguna berada di halaman registrasi',
        steps: [
          'Pengguna mengisi formulir nama, email, dan kata sandi minimal 8 karakter',
          'Sistem memvalidasi kredensial dan membuat akun terenkripsi',
          'Sistem mengarahkan pengguna ke halaman Dasbor dengan ucapan selamat datang'
        ],
        finalState: 'Pengguna masuk dan siap menggunakan fitur utama'
      }
    ],

    pages: [
      {
        id: 'pg-1',
        name: 'Halaman Beranda',
        route: '/',
        purpose: 'Memperkenalkan nilai produk dan tombol ajakan registrasi',
        accessibleRoles: ['Publik'],
        mainComponents: ['Hero Section', 'Fitur Utama', 'FAQ', 'Footer'],
        hasLoadingState: false,
        hasEmptyState: false,
        hasErrorState: false
      },
      {
        id: 'pg-2',
        name: 'Dasbor Utama',
        route: '/dashboard',
        purpose: 'Menampilkan metrik utama dan pintasan cepat',
        accessibleRoles: ['Administrator', 'Pengguna Terdaftar'],
        mainComponents: ['Kartu Metrik', 'Tabel Data Terbaru', 'Tombol Aksi Cepat'],
        hasLoadingState: true,
        hasEmptyState: true,
        hasErrorState: true
      }
    ],

    navElements: {
      navbar: true,
      sidebar: true,
      footer: true,
      breadcrumbs: true,
      mobileNav: true
    },

    designPreset: 'Editorial Print Magazine (ElevenLabs Style)',
    themeMode: 'light',
    primaryColor: '#292524',
    secondaryColor: '#f5f5f5',
    typography: 'EB Garamond (Display 300), Inter (Body 400/500), JetBrains Mono (Data)',
    borderRadius: 'rounded-full (Button), rounded-2xl (Cards)',
    spacingDensity: 'normal',
    accessibilityRequirements: [
      'Kontras teks minimal rasio 4.5:1 (WCAG AA)',
      'Dukungan navigasi penuh via keyboard',
      'Visible focus indicator pada setiap kontrol interaktif'
    ],

    frontendFramework: 'React 19 + TypeScript + Vite',
    stylingSystem: 'Tailwind CSS',
    backendFramework: 'Node.js Express / TSX',
    database: 'PostgreSQL',
    orm: 'Drizzle ORM',
    authProvider: 'HttpOnly Secure Cookie Session',
    apiStyle: 'RESTful JSON API',
    deploymentPlatform: 'Vercel / Cloud Run',
    architectureStyle: 'Modular Single-Page Application (SPA)',

    dataEntities: [
      {
        id: 'ent-user',
        name: 'users',
        purpose: 'Menyimpan identitas akun pengguna dan peran',
        fields: [
          { id: 'f1', name: 'id', type: 'uuid', required: true, isPrimaryKey: true, description: 'ID unik pengguna' },
          { id: 'f2', name: 'name', type: 'string', required: true, description: 'Nama lengkap pengguna' },
          { id: 'f3', name: 'email', type: 'string', required: true, unique: true, description: 'Alamat surel unik' },
          { id: 'f4', name: 'password_hash', type: 'string', required: true, sensitive: true, description: 'Hash bcrypt' },
          { id: 'f5', name: 'role', type: 'string', required: true, description: 'Peran pengguna (admin/user)' },
          { id: 'f6', name: 'created_at', type: 'date', required: true, description: 'Waktu pembuatan akun' }
        ],
        relationships: []
      }
    ],

    apiEndpoints: [
      {
        id: 'api-1',
        method: 'POST',
        path: '/api/auth/login',
        purpose: 'Otentikasi kredensial pengguna dan pembuatan sesi cookie',
        requiredAuth: false,
        allowedRoles: ['Publik'],
        requestBodySummary: '{ email, password }',
        successResponseSummary: '{ user: { id, name, role } }'
      },
      {
        id: 'api-2',
        method: 'GET',
        path: '/api/items',
        purpose: 'Mengambil daftar data dengan dukungan query filter dan pagination',
        requiredAuth: true,
        allowedRoles: ['Administrator', 'Pengguna Terdaftar'],
        successResponseSummary: '{ items: [...], total: 42, page: 1 }'
      }
    ],

    integrations: [],
    securityControls: [
      'Validasi tipe data dan sanitasi input pada semua endpoint',
      'Proteksi CSRF dan penegakan header CORS yang ketat',
      'Enkripsi kata sandi dengan salt menggunakan bcrypt/argon2',
      'Rate-limiting pada rute login untuk mencegah serangan brute force'
    ],
    nonFunctionalTargets: [
      { category: 'Performa', target: 'Pemuatan halaman utama di bawah 600ms', condition: 'Koneksi 4G standar' },
      { category: 'Aksesibilitas', target: 'Skor Lighthouse Aksesibilitas >= 95/100' }
    ],

    testTypes: ['Unit Testing', 'End-to-End (E2E) Flow Testing', 'Responsive Viewport Testing'],
    acceptanceCriteria: [
      {
        id: 'AC-001',
        featureName: 'Login Pengguna',
        given: 'Pengguna terdaftar berada di halaman login',
        when: 'Pengguna memasukkan email dan password yang benar lalu klik Masuk',
        then: 'Sistem membuat sesi cookie aman dan mengarahkan ke halaman Dasbor',
        alternativeOrError: 'Jika kredensial salah, sistem menampilkan teks merah "Email atau password salah" tanpa menghapus isi input email'
      }
    ],
    definitionOfDone: [
      'Seluruh alur fitur utama teruji tanpa dead click',
      'Kompilasi TypeScript (npm run build) lolos 100% tanpa error',
      'Tampilan teruji rapi di layar ponsel (375px), tablet (768px), dan desktop (1440px)',
      'Dokumen instruksi AI agent terlampir dan lengkap'
    ],

    agentPreset: 'cursor',
    implementationWorkflow: 'plan_first',
    customAgentRules: [
      'Gunakan komponen modular dan jangan membuat file raksasa melebihi 400 baris.',
      'Pertahankan skema warna monochrome dengan blok warna pastel sesuai panduan desain.'
    ],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    schemaVersion: '1.0.0'
  };
}
