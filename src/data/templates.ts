import { ProjectConfiguration } from '../types/prd';

export interface ProjectTemplate {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  accentColor: string;
  config: Partial<ProjectConfiguration>;
}

export const PRESET_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'saas-b2b',
    name: 'SaaS Dashboard B2B & Analytics',
    badge: 'Multi-Tenant',
    tagline: 'Platform manajemen tim, analitik metrik real-time, dan kontrol hak akses',
    description: 'Cocok untuk platform software berbasis langganan dengan multi-role (Owner, Admin, Member), grafik KPI analitik, API keys, dan export laporan CSV.',
    accentColor: '#c5b0f4', // lilac
    config: {
      name: 'PulseFlow — B2B Operations Intelligence',
      projectType: 'saas',
      description: 'Platform analitik operasional terpusat bagi tim engineering & product untuk memantau throughput rilis dan incident response time.',
      complexity: 'advanced',
      outputLanguage: 'id',
      targetAudience: 'Engineering Lead, DevOps, CTO perusahaan teknologi berkembang',
      problemStatement: 'Tim operasional menggunakan banyak tool terpisah (Jira, GitHub, Datadog) sehingga kesulitan melacak metrik efisiensi dan bottleneck secara holistik.',
      desiredOutcome: 'Dashboard tunggal terintegrasi yang menyajikan metrik DORA, status pipeline, dan alert insiden dalam satu tampilan jernih.',
      primaryUserNeeds: [
        'Melihat ringkasan metrik kesehatan sistem dalam 5 detik pertama',
        'Mengatur izin akses anggota tim sesuai departemen',
        'Mengekspor laporan performa bulanan ke CSV/PDF untuk rapat pimpinan'
      ],
      businessObjectives: [
        'Mencapai 85% retensi pengguna aktif mingguan',
        'Mempercepat onboarding tim baru di bawah 10 menit'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Daily Active Users (DAU/MAU)', target: '> 40%', status: 'confirmed' },
        { id: 'SM-2', metric: 'Page Load Latency (p95)', target: '< 400ms', status: 'confirmed' },
        { id: 'SM-3', metric: 'CSAT Score pengguna tim', target: '>= 4.7/5.0', status: 'suggested' }
      ],
      inScope: [
        'Otentikasi aman (Email/Password & Google OAuth) dengan sesi HttpOnly',
        'Role-Based Access Control (Admin, Member, Viewer)',
        'Dashboard metrik interaktif dengan filter rentang waktu (7d, 30d, 90d)',
        'Tabel log aktivitas dengan fitur filter, search, dan export CSV',
        'Pengaturan profil organisasi dan webhook eksternal'
      ],
      outOfScope: [
        'Integrasi sistem penagihan otomatis Stripe (fase 2)',
        'Aplikasi mobile native Android/iOS (hanya web responsif)',
        'Fitur chat instan internal antar tim'
      ],
      knownConstraints: [
        'Harus dapat dijalankan di PostgreSQL dan Node.js / Next.js',
        'Tidak boleh menyimpan password pengguna dalam bentuk plain-text'
      ],
      assumptions: [
        'Sebagian besar pengguna mengakses dashboard melalui monitor desktop resolusi 1440px'
      ],
      openQuestions: [
        'Apakah perlu sistem kuota API request per tier langganan?'
      ],
      hasUserAccounts: true,
      roles: [
        {
          id: 'role-admin',
          name: 'Administrator',
          description: 'Akses penuh ke semua konfigurasi, billing, dan manajemen user',
          accessiblePages: ['/', '/dashboard', '/analytics', '/users', '/settings', '/audit-logs'],
          permissions: { view: true, create: true, update: true, delete: true, approve: true },
          sensitiveActions: ['Hapus Akun Anggota', 'Reset Kunci API Tim', 'Ubah Nama Organisasi']
        },
        {
          id: 'role-member',
          name: 'Member / Operator',
          description: 'Dapat melihat analitik dan menginput data catatan incident',
          accessiblePages: ['/', '/dashboard', '/analytics', '/incidents'],
          permissions: { view: true, create: true, update: true, delete: false, approve: false },
          sensitiveActions: []
        },
        {
          id: 'role-viewer',
          name: 'Viewer',
          description: 'Hanya dapat melihat ringkasan dashboard tanpa hak edit',
          accessiblePages: ['/', '/dashboard'],
          permissions: { view: true, create: false, update: false, delete: false, approve: false },
          sensitiveActions: []
        }
      ],
      frontendFramework: 'React 19 + TypeScript + Vite',
      stylingSystem: 'Tailwind CSS (Editorial Print Magazine)',
      backendFramework: 'Node.js Express / Next.js Server Route',
      database: 'PostgreSQL',
      orm: 'Drizzle ORM / Prisma',
      authProvider: 'Sesi Database aman / JWT HttpOnly Cookie',
      apiStyle: 'RESTful JSON API',
      deploymentPlatform: 'Vercel / Cloud Run',
      architectureStyle: 'Modular Single-Page Application (SPA) with API Backend'
    }
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce / Toko Online Modern',
    badge: 'Komersial',
    tagline: 'Katalog produk, varian, keranjang belanja, dan integrasi payment gateway',
    description: 'Dokumen lengkap untuk toko online retail dengan multi-gambar, stok varian (ukuran/warna), kalkulasi ongkir, checkout multi-langkah, dan pelacakan pesanan.',
    accentColor: '#dceeb1', // lime
    config: {
      name: 'Nusantara Heritage — Artisan Store',
      projectType: 'ecommerce',
      description: 'Platform toko online modern untuk produk kriya dan batik lokal dengan pengalaman belanja mulus dari katalog hingga checkout QRIS.',
      complexity: 'standard',
      outputLanguage: 'id',
      targetAudience: 'Konsumen pecinta produk kriya lokal, kolektor, pembeli kado',
      problemStatement: 'Pembelian produk kriya saat ini banyak mengandalkan WhatsApp manual yang rentan salah catat varian stok dan lambat konfirmasi transfer.',
      desiredOutcome: 'Website toko online otomatis yang menyajikan stok real-time, varian jelas, dan checkout otomatis dengan konfirmasi instan.',
      primaryUserNeeds: [
        'Melihat foto detail produk dari berbagai sudut pandang',
        'Memilih varian ukuran dan motif dengan harga yang langsung menyesuaikan',
        'Membayar via QRIS / Virtual Account dengan verifikasi instan tanpa kirim bukti struk'
      ],
      businessObjectives: [
        'Meningkatkan konversi kunjungan menjadi pembelian dari 1.2% menjadi 3.5%',
        'Mengurangi waktu pemrosesan pesanan dari 4 jam menjadi di bawah 15 menit'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Cart-to-Checkout Conversion', target: '>= 45%', status: 'confirmed' },
        { id: 'SM-2', metric: 'Checkout Abandonment Rate', target: '< 30%', status: 'confirmed' }
      ],
      inScope: [
        'Katalog produk dengan filter kategori, harga, dan rating',
        'Halaman detail produk dengan pemilih varian dan pengingat stok menipis',
        'Keranjang belanja lokal dengan kalkulasi subtotal otomatis',
        'Alur checkout: input alamat penerima, pemilihan kurir, dan payment gateway',
        'Halaman cek resi dan riwayat pesanan pelanggan',
        'Panel admin untuk kelola stok produk dan input nomor resi pengiriman'
      ],
      outOfScope: [
        'Sistem multi-vendor / marketplace terbuka untuk umum',
        'Integrasi gudang dropship otomatis pihak ketiga'
      ],
      knownConstraints: [
        'Payment gateway harus mendukung QRIS dan Bank Transfer Indonesia (Midtrans/Xendit)',
        'Aplikasi harus ringan dimuat di jaringan seluler 4G'
      ],
      assumptions: [
        'Sebagian besar pesanan (70%+) dilakukan via smartphone'
      ],
      openQuestions: [],
      hasUserAccounts: true,
      roles: [
        {
          id: 'role-admin',
          name: 'Admin Toko',
          description: 'Kelola produk, update resi pengiriman, laporan keuangan',
          accessiblePages: ['/', '/admin/products', '/admin/orders', '/admin/customers'],
          permissions: { view: true, create: true, update: true, delete: true, approve: true },
          sensitiveActions: ['Ubah Status Pesanan ke Selesai', 'Refund Dana Pesanan']
        },
        {
          id: 'role-customer',
          name: 'Pelanggan',
          description: 'Menjelajahi toko, membuat pesanan, dan melacak status',
          accessiblePages: ['/', '/products', '/cart', '/checkout', '/account/orders'],
          permissions: { view: true, create: true, update: false, delete: false, approve: false },
          sensitiveActions: []
        }
      ],
      frontendFramework: 'React 19 + TypeScript + Vite',
      stylingSystem: 'Tailwind CSS',
      backendFramework: 'Node.js Express / Next.js API Routes',
      database: 'PostgreSQL / Supabase',
      orm: 'Drizzle ORM',
      authProvider: 'Email/Password + Google OAuth',
      apiStyle: 'RESTful API with Webhooks',
      deploymentPlatform: 'Vercel',
      architectureStyle: 'Modern Full-Stack Web Application'
    }
  },
  {
    id: 'booking-app',
    name: 'Aplikasi Reservasi & Booking Jadwal',
    badge: 'Jadwal & Slot',
    tagline: 'Kalender interaktif, anti-bentrok slot, dan konfirmasi otomatis',
    description: 'Sangat cocok untuk klinik medis, salon kecantikan, konsultasi hukum, atau persewaan fasilitas olahraga. Dilengkapi aturan pembatalan dan notifikasi.',
    accentColor: '#c8e6cd', // mint
    config: {
      name: 'KlinikCare — Appointment Booking',
      projectType: 'booking_app',
      description: 'Aplikasi reservasi online jadwal konsultasi dokter dan layanan medis dengan kalender ketersediaan real-time.',
      complexity: 'standard',
      outputLanguage: 'id',
      targetAudience: 'Pasien klinik, resepsionis, dan staf dokter',
      problemStatement: 'Antrean fisik yang menumpuk di ruang tunggu klinik dan jadwal dokter yang sering bentrok akibat pencatatan manual di buku agenda.',
      desiredOutcome: 'Sistem booking mandiri di mana pasien memilih jam konsultasi yang pasti, mendapatkan pengingat via WhatsApp/Email, dan dokter memiliki jadwal teratur.',
      primaryUserNeeds: [
        'Melihat ketersediaan jadwal dokter spesialis dalam tampilan kalender',
        'Memilih jam kunjungan tanpa khawatir jadwal bentrok',
        'Mendapatkan bukti nomor antrean dan pengingat 2 jam sebelum kunjungan'
      ],
      businessObjectives: [
        'Mengurangi waktu tunggu pasien di klinik hingga 60%',
        'Menghilangkan 100% kasus jadwal dokter ganda (double booking)'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Double Booking Incidents', target: '0 kejadian', status: 'confirmed' },
        { id: 'SM-2', metric: 'No-Show Rate Pasien', target: '< 8%', status: 'suggested' }
      ],
      inScope: [
        'Daftar dokter spesialis beserta profil, jadwal praktik, dan tarif',
        'Pemilihan slot tanggal & jam dengan penguncian atomik anti-bentrok',
        'Formulir keluhan awal pasien dan nomor kontak darurat',
        'Konfirmasi booking instan dengan kode QR booking',
        'Panel staf resepsionis untuk check-in pasien di lokasi'
      ],
      outOfScope: [
        'Sistem rekam medis elektronik terhubung BPJS (fase lanjutan)',
        'Video telekonsultasi streaming di dalam aplikasi'
      ],
      knownConstraints: [
        'Penguncian slot waktu harus menggunakan transaksi database agar tidak dapat di-klik 2 pengguna bersamaan'
      ],
      assumptions: [
        'Setiap sesi konsultasi dokter berdurasi rata-rata 20 menit'
      ],
      openQuestions: [],
      hasUserAccounts: true,
      roles: [
        {
          id: 'role-staff',
          name: 'Staf Resepsionis / Admin',
          description: 'Kelola jadwal dokter, check-in pasien, pembatalan darurat',
          accessiblePages: ['/', '/admin/schedule', '/admin/patients', '/admin/doctors'],
          permissions: { view: true, create: true, update: true, delete: true, approve: true },
          sensitiveActions: ['Batalkan Jadwal Praktik Dokter']
        },
        {
          id: 'role-patient',
          name: 'Pasien Terdaftar',
          description: 'Booking jadwal konsultasi dan cek riwayat reservasi',
          accessiblePages: ['/', '/doctors', '/book', '/my-appointments'],
          permissions: { view: true, create: true, update: true, delete: false, approve: false },
          sensitiveActions: []
        }
      ],
      frontendFramework: 'React 19 + TypeScript',
      stylingSystem: 'Tailwind CSS',
      backendFramework: 'Node.js + Express',
      database: 'PostgreSQL',
      orm: 'Drizzle ORM',
      authProvider: 'Sesi Nomor Telepon / OTP atau Email',
      apiStyle: 'RESTful API',
      deploymentPlatform: 'Cloud Run / Vercel',
      architectureStyle: 'Single-Page App with Realtime Slot Validation'
    }
  },
  {
    id: 'landing-page',
    name: 'Landing Page Produk & Waitlist',
    badge: 'Marketing',
    tagline: 'Hero konversi tinggi, pendaftaran waitlist, social proof, dan FAQ',
    description: 'Spesifikasi fokus pada desain editorial tajam, copywriting persuasif, formulir penangkap prospek (lead capture), dan optimasi kecepatan SEO.',
    accentColor: '#f3c9b6', // coral
    config: {
      name: 'Kroma Studio — Creative AI Landing Page',
      projectType: 'landing_page',
      description: 'Halaman arahan marketing berkonversi tinggi untuk peluncuran produk kreatif baru dengan sistem penangkap email waitlist dan referral viral.',
      complexity: 'simple',
      outputLanguage: 'id',
      targetAudience: 'Desainer grafis, video editor, agensi kreatif independen',
      problemStatement: 'Banyak software baru gagal mendapatkan antrean pengguna awal karena landing page mereka generik, membosankan, dan tidak memiliki penawaran bernilai.',
      desiredOutcome: 'Landing page yang memukau secara visual, menjelaskan nilai produk dalam 10 detik, dan berhasil mengumpulkan 5.000 email waitlist sebelum peluncuran.',
      primaryUserNeeds: [
        'Memahami apa fungsi unik produk dalam 1 scroll pertama',
        'Melihat contoh hasil output nyata tanpa harus mendaftar dulu',
        'Mendaftarkan email ke waitlist dengan satu klik tanpa verifikasi rumit'
      ],
      businessObjectives: [
        'Mencapai tingkat konversi pendaftaran waitlist > 18% dari total pengunjung'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Waitlist Conversion Rate', target: '>= 18%', status: 'confirmed' },
        { id: 'SM-2', metric: 'Google Lighthouse Performance', target: '>= 95/100', status: 'confirmed' }
      ],
      inScope: [
        'Hero section editorial dengan CTA pill tegas dan showcase visual produk',
        'Bento-grid fitur utama dengan animasi interaktif mikro',
        'Kalkulator perbandingan efisiensi waktu kerja',
        'Formulir pendaftaran waitlist dengan feedback instan dan nomor antrean unik',
        'Testimonial social proof dan logo mitra terpercaya',
        'Accordion FAQ yang menjawab pertanyaan harga dan privasi data'
      ],
      outOfScope: [
        'Sistem login member (hanya formulir waitlist)',
        'Pembayaran online (fase beta)'
      ],
      knownConstraints: [
        'Asset gambar harus dioptimasi WebP agar skor Lighthouse tetap di atas 90'
      ],
      assumptions: [
        'Traffic akan banyak bersumber dari media sosial (X/Twitter, LinkedIn, TikTok)'
      ],
      openQuestions: [],
      hasUserAccounts: false,
      roles: [],
      frontendFramework: 'React 19 + TypeScript + Vite',
      stylingSystem: 'Tailwind CSS (Figma Editorial Design System)',
      backendFramework: 'Serverless Functions (Cloudflare Workers / Vercel Functions)',
      database: 'Supabase / SQLite ringkas untuk email waitlist',
      orm: 'Drizzle ORM',
      authProvider: 'Tidak ada (Form Publik)',
      apiStyle: 'Lightweight POST Endpoint /api/waitlist',
      deploymentPlatform: 'Vercel / Cloudflare Pages',
      architectureStyle: 'Static Site Generation (SSG) / Jamstack'
    }
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard & Internal Management',
    badge: 'Internal Tool',
    tagline: 'Manajemen operasional data, soft delete, audit log, dan tabel berkinerja tinggi',
    description: 'Dirancang untuk aplikasi backend operasional staf perusahaan. Menyediakan pencarian data instan, validasi form berstandar enterprise, dan ekspor excel.',
    accentColor: '#1f1d3d', // navy
    config: {
      name: 'OmniDesk — Enterprise Operations Console',
      projectType: 'admin_dashboard',
      description: 'Sistem informasi manajemen internal untuk memantau data inventaris barang, approval pengajuan anggaran, dan hak akses karyawan.',
      complexity: 'advanced',
      outputLanguage: 'id',
      targetAudience: 'Tim Finance, HRD, Supervisor Logistik, Direksi Perusahaan',
      problemStatement: 'Pengelolaan approval dokumen kantor masih berserakan di spreadsheet terpisah dan pesan chat personal, menyebabkan keterlambatan persetujuan dan risiko kecurangan.',
      desiredOutcome: 'Sistem admin terpusat dengan alur persetujuan bertingkat (multi-level approval), jejak audit forensik, dan laporan inventaris otomatis.',
      primaryUserNeeds: [
        'Menyetujui atau menolak permohonan anggaran dengan satu klik disertai catatan',
        'Mengetahui siapa yang mengubah data inventaris melalui log aktivitas',
        'Mencari data transaksi lama berdasarkan rentang tanggal dan nomor surat'
      ],
      businessObjectives: [
        'Mengurangi waktu tunggu approval pengajuan dana dari 3 hari kerja menjadi < 3 jam'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Approval Turnaround Time', target: '< 3 jam', status: 'confirmed' },
        { id: 'SM-2', metric: 'Audit Trail Coverage', target: '100% mutasi data', status: 'confirmed' }
      ],
      inScope: [
        'Dashboard ringkasan dengan indikator pengajuan menunggu persetujuan',
        'Tabel data mutasi barang dengan pagination server-side dan sorting fleksibel',
        'Alur persetujuan bertingkat (Staff -> Manager -> Finance)',
        'Audit trail log mencatat IP, User, Timestamp, dan Payload data lama vs baru',
        'Soft delete dan pemulihan data dari tempat sampah (Trash Archive)',
        'Ekspor laporan keuangan format Excel (.xlsx)'
      ],
      outOfScope: [
        'Koneksi fisik ke mesin barcode scanner kabel (hanya input manual & webcam scanner)'
      ],
      knownConstraints: [
        'Hanya dapat diakses melalui jaringan internal VPN kantor atau IP Whitelisting'
      ],
      assumptions: [
        'Seluruh pengguna sudah memiliki akun email korporat perusahaan'
      ],
      openQuestions: [],
      hasUserAccounts: true,
      roles: [
        {
          id: 'role-superadmin',
          name: 'Super Administrator',
          description: 'Akses tanpa batas ke konfigurasi sistem, peran pengguna, dan audit log',
          accessiblePages: ['/', '/dashboard', '/inventory', '/approvals', '/users', '/audit', '/settings'],
          permissions: { view: true, create: true, update: true, delete: true, approve: true },
          sensitiveActions: ['Hapus Permanen Data', 'Ubah Hak Akses Pengguna', 'Reset Database']
        },
        {
          id: 'role-manager',
          name: 'Manager Departemen',
          description: 'Dapat mereview dan menyetujui pengajuan anggaran tim di bawahnya',
          accessiblePages: ['/', '/dashboard', '/inventory', '/approvals'],
          permissions: { view: true, create: true, update: true, delete: false, approve: true },
          sensitiveActions: ['Setujui Anggaran > Rp 10.000.000']
        },
        {
          id: 'role-staff',
          name: 'Staff Operasional',
          description: 'Mengajukan permohonan inventaris dan menginput barang masuk',
          accessiblePages: ['/', '/dashboard', '/inventory', '/my-requests'],
          permissions: { view: true, create: true, update: false, delete: false, approve: false },
          sensitiveActions: []
        }
      ],
      frontendFramework: 'React 19 + TypeScript + Vite',
      stylingSystem: 'Tailwind CSS',
      backendFramework: 'Node.js Express + TSX',
      database: 'PostgreSQL',
      orm: 'Drizzle ORM',
      authProvider: 'Corporate SSO / Session Database Cookie',
      apiStyle: 'RESTful API with RBAC Middleware',
      deploymentPlatform: 'Internal Docker Server / Google Cloud Run',
      architectureStyle: 'Modular Enterprise SPA'
    }
  },
  {
    id: 'school-management',
    name: 'Sistem Informasi Akademik / Sekolah',
    badge: 'Edukasi',
    tagline: 'Manajemen siswa, nilai rapor, absensi kelas, dan portal wali murid',
    description: 'Spesifikasi terstruktur untuk institusi pendidikan dengan 3 peran berbeda: Guru (input nilai & absen), Siswa/Wali (pantau rapor), dan Tata Usaha (administrasi SPP).',
    accentColor: '#efd4d4', // pink
    config: {
      name: 'EduNusantara — Sistem Informasi Akademik Terpadu',
      projectType: 'internal_mgmt',
      description: 'Aplikasi web manajemen sekolah untuk pencatatan absensi harian, buku nilai rapor semester, dan laporan pembayaran SPP transparan.',
      complexity: 'standard',
      outputLanguage: 'id',
      targetAudience: 'Guru, Wali Kelas, Siswa, Orang Tua Murid, Petugas Tata Usaha',
      problemStatement: 'Pencatatan nilai dan absensi masih menggunakan lembaran kertas fisik yang lambat direkapitulasi saat pembagian rapor semester.',
      desiredOutcome: 'Portal web yang memudahkan guru mengisi nilai dari ponsel/laptop dan memungkinkan orang tua memantau kehadiran anak secara transparan.',
      primaryUserNeeds: [
        'Guru dapat menginput absensi kelas dalam 1 menit',
        'Orang tua menerima notifikasi jika anak tidak hadir di sekolah',
        'Pencetakan lembar rapor otomatis sesuai format kurikulum resmi'
      ],
      businessObjectives: [
        'Menghemat waktu rekapitulasi nilai rapor akhir semester hingga 80%'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Kelengkapan Input Absensi', target: '>= 98% setiap hari sekolah', status: 'confirmed' }
      ],
      inScope: [
        'Manajemen data induk Siswa, Guru, Mata Pelajaran, dan Ruang Kelas',
        'Formulir checklist absensi harian per jam pelajaran',
        'Buku nilai: Tugas, Ulangan Harian, UTS, UAS dengan bobot kalkulasi otomatis',
        'Portal login khusus wali murid untuk cek perkembangan nilai dan absensi',
        'Cetak raport format PDF standar dinas pendidikan'
      ],
      outOfScope: [
        'Ujian online berbasis komputer (CBT) dengan anti-cheat browser'
      ],
      knownConstraints: [
        'Aplikasi harus tetap mudah digunakan oleh guru senior yang kurang terbiasa dengan teknologi rumit'
      ],
      assumptions: [],
      openQuestions: [],
      hasUserAccounts: true,
      roles: [
        {
          id: 'role-admin',
          name: 'Staff Tata Usaha (Admin)',
          description: 'Kelola data siswa, pembagian kelas, tahun ajaran baru',
          accessiblePages: ['/', '/admin/students', '/admin/teachers', '/admin/classes'],
          permissions: { view: true, create: true, update: true, delete: true, approve: true },
          sensitiveActions: ['Kenaikan Kelas Massal', 'Kunci Rapor Semester']
        },
        {
          id: 'role-teacher',
          name: 'Guru Mata Pelajaran',
          description: 'Input absensi harian dan rekap nilai ujian',
          accessiblePages: ['/', '/teacher/classes', '/teacher/grades', '/teacher/attendance'],
          permissions: { view: true, create: true, update: true, delete: false, approve: false },
          sensitiveActions: []
        },
        {
          id: 'role-parent',
          name: 'Wali Murid / Siswa',
          description: 'Melihat rapor anak, kehadiran, dan pengumuman sekolah',
          accessiblePages: ['/', '/student/grades', '/student/attendance'],
          permissions: { view: true, create: false, update: false, delete: false, approve: false },
          sensitiveActions: []
        }
      ],
      frontendFramework: 'React 19 + TypeScript',
      stylingSystem: 'Tailwind CSS',
      backendFramework: 'Node.js Express',
      database: 'PostgreSQL / MySQL',
      orm: 'Drizzle ORM',
      authProvider: 'NISN / NIP + Password',
      apiStyle: 'RESTful API',
      deploymentPlatform: 'Vercel / VPS Lokal',
      architectureStyle: 'Clean Monolithic Application'
    }
  },
  {
    id: 'portfolio-creative',
    name: 'Website Portofolio & Jasa Kreatif',
    badge: 'Portofolio',
    tagline: 'Showcase karya visual, studi kasus mendalam, dan inquiry formulir proyek',
    description: 'Cocok untuk desainer UI/UX, software engineer, arsitek, atau agensi kreatif. Menyajikan galeri beresolusi tinggi, filter kategori proyek, dan formulir konsultasi.',
    accentColor: '#f4ecd6', // cream
    config: {
      name: 'Atelier Studio — Creative Showcase',
      projectType: 'portfolio',
      description: 'Website portofolio interaktif bagi desainer produk digital untuk memamerkan studi kasus karya, metodologi riset, dan menerima penawaran proyek klien.',
      complexity: 'simple',
      outputLanguage: 'id',
      targetAudience: 'Design Director, Startup Founder, Recruiter internasional',
      problemStatement: 'Portofolio PDF statis sulit diperbarui, tidak interaktif, dan sering lambat diunduh oleh calon klien.',
      desiredOutcome: 'Website portofolio yang cepat, elegan, menampilkan cerita studi kasus mendalam, dan mempermudah klien menjadwalkan sesi wawancara.',
      primaryUserNeeds: [
        'Membaca alur studi kasus dari masalah, riset, hingga hasil akhir metrik',
        'Menyaring proyek berdasarkan kategori (Design System, Mobile App, Web)',
        'Mengirim pesan penawaran kerja langsung ke email desainer'
      ],
      businessObjectives: [
        'Meningkatkan inquiry proyek berkualitas minimal 5 penawaran per bulan'
      ],
      successMetrics: [
        { id: 'SM-1', metric: 'Formulir Kontak Terkirim', target: '>= 5 per bulan', status: 'confirmed' }
      ],
      inScope: [
        'Hero section editorial dengan pengenalan profil singkat dan tautan resume',
        'Galeri studi kasus dengan filter kategori (Web, Mobile, Branding)',
        'Halaman detail studi kasus kaya visual dengan perbandingan sebelum/sesudah',
        'Formulir kontak inquiry proyek dengan validasi budget dan deadline',
        'Footer dengan tautan LinkedIn, GitHub, Dribbble, dan email langsung'
      ],
      outOfScope: [
        'Sistem login klien atau portal pembayaran invoice proyek'
      ],
      knownConstraints: [],
      assumptions: [],
      openQuestions: [],
      hasUserAccounts: false,
      roles: [],
      frontendFramework: 'React 19 + TypeScript + Vite',
      stylingSystem: 'Tailwind CSS (Monochrome Editorial)',
      backendFramework: 'Tanpa backend kompleks / Serverless API untuk kontak',
      database: 'Tidak ada / Local JSON untuk konten proyek',
      orm: 'Tidak ada',
      authProvider: 'Tidak ada',
      apiStyle: 'Formspree / Resend API untuk formulir kontak',
      deploymentPlatform: 'Vercel / GitHub Pages',
      architectureStyle: 'Static Site'
    }
  },
  {
    id: 'blank-canvas',
    name: 'Mulai dari Kanvas Kosong (Custom)',
    badge: 'Kustom',
    tagline: 'Mulai dari awal tanpa konfigurasi bawaan untuk proyek spesifik Anda',
    description: 'Pilihan kanvas bersih untuk mendefinisikan aplikasi dari nol sesuai kebutuhan unik produk Anda.',
    accentColor: '#000000',
    config: {
      name: 'Aplikasi Kustom Baru',
      projectType: 'custom',
      description: 'Deskripsikan ide produk digital Anda secara bebas dan tentukan persyaratannya langkah demi langkah.',
      complexity: 'standard',
      outputLanguage: 'id',
      targetAudience: '',
      problemStatement: '',
      desiredOutcome: '',
      primaryUserNeeds: [],
      businessObjectives: [],
      successMetrics: [],
      inScope: [],
      outOfScope: [],
      knownConstraints: [],
      assumptions: [],
      openQuestions: [],
      hasUserAccounts: false,
      roles: [],
      frontendFramework: 'React 19 + TypeScript + Vite',
      stylingSystem: 'Tailwind CSS',
      backendFramework: 'Node.js Express',
      database: 'PostgreSQL',
      orm: 'Drizzle ORM',
      authProvider: 'Session Cookie / Auth.js',
      apiStyle: 'RESTful API',
      deploymentPlatform: 'Vercel / Cloud Run',
      architectureStyle: 'Single-Page Application (SPA)'
    }
  }
];
