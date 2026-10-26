import { FeaturePriority } from '../types/prd';

export interface CatalogFeature {
  id: string;
  name: string;
  category: string;
  plainExplanation: string;
  defaultPriority: FeaturePriority;
  suggestedComplexity: ('simple' | 'standard' | 'advanced')[];
  recommendedFor: string[];
  markdownTemplateSnippet: string;
}

export const FEATURE_CATEGORIES = [
  'A. Otentikasi & Akun',
  'B. Manajemen Pengguna & RBAC',
  'C. Konten & CMS',
  'D. Manajemen Data (CRUD & Filter)',
  'E. Dashboard & Analitik',
  'F. E-Commerce & Transaksi',
  'G. Booking & Jadwal',
  'H. Komunikasi & Notifikasi',
  'I. Manajemen File & Media',
  'J. Administrasi & Audit',
  'K. Interaksi UI & Modal',
  'L. Integrasi Eksternal',
  'M. Platform & SEO',
  'N. Fitur Kustom'
];

export const CATALOG_FEATURES: CatalogFeature[] = [
  // A. Otentikasi & Akun
  {
    id: 'AUTH-01',
    name: 'Login & Register Email/Password',
    category: 'A. Otentikasi & Akun',
    plainExplanation: 'Pendaftaran akun baru dan proses masuk menggunakan alamat email serta kata sandi terenkripsi.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'ecommerce', 'booking_app', 'internal_mgmt', 'blog_cms'],
    markdownTemplateSnippet: 'Pengguna dapat membuat akun baru dan masuk dengan email/password. Kata sandi harus di-hash (bcrypt/argon2). Validasi format email wajib di sisi klien dan server.'
  },
  {
    id: 'AUTH-02',
    name: 'OAuth / Social Login (Google, GitHub)',
    category: 'A. Otentikasi & Akun',
    plainExplanation: 'Masuk cepat satu klik menggunakan akun Google, GitHub, atau provider pihak ketiga.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'blog_cms', 'ecommerce'],
    markdownTemplateSnippet: 'Mendukung login via Google/GitHub OAuth 2.0. Jika email sudah terdaftar, tautkan akun secara aman.'
  },
  {
    id: 'AUTH-03',
    name: 'Lupa Password & Reset via Email',
    category: 'A. Otentikasi & Akun',
    plainExplanation: 'Alur pemulihan kata sandi dengan mengirimkan tautan token aman berspesifikasi kedaluwarsa ke email pengguna.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'ecommerce', 'booking_app', 'internal_mgmt'],
    markdownTemplateSnippet: 'Alur lupa kata sandi via email dengan token bertenggat waktu (15-60 menit). Lindungi endpoint dengan rate-limiting untuk mencegah spam email.'
  },
  {
    id: 'AUTH-04',
    name: 'Verifikasi Email Akun Baru',
    category: 'A. Otentikasi & Akun',
    plainExplanation: 'Memastikan alamat email valid sebelum pengguna dapat mengakses fitur penuh.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'ecommerce', 'marketplace'],
    markdownTemplateSnippet: 'Kirim tautan konfirmasi setelah pendaftaran. Batasi akses fitur tertentu sampai email terverifikasi.'
  },
  {
    id: 'AUTH-05',
    name: 'Manajemen Sesi & Remember Me',
    category: 'A. Otentikasi & Akun',
    plainExplanation: 'Penyimpanan sesi login yang aman dengan HTTP-Only cookie atau JWT token refresh.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'admin_dashboard', 'internal_mgmt'],
    markdownTemplateSnippet: 'Sesi disimpan menggunakan HttpOnly, Secure, SameSite cookies. Refresh token rotation untuk memperpanjang sesi secara aman.'
  },

  // B. Manajemen Pengguna
  {
    id: 'USER-01',
    name: 'Profil Pengguna & Avatar',
    category: 'B. Manajemen Pengguna & RBAC',
    plainExplanation: 'Halaman bagi pengguna untuk melihat dan memperbarui data diri, nama, nomor telepon, dan foto profil.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'ecommerce', 'booking_app'],
    markdownTemplateSnippet: 'Pengguna dapat mengedit nama, bio, dan mengunggah foto profil (maks 2MB, format JPG/PNG/WebP).'
  },
  {
    id: 'USER-02',
    name: 'Ubah Kata Sandi (In-App)',
    category: 'B. Manajemen Pengguna & RBAC',
    plainExplanation: 'Fasilitas mengganti kata sandi dengan validasi kata sandi lama terlebih dahulu.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'admin_dashboard', 'internal_mgmt'],
    markdownTemplateSnippet: 'Memerlukan kata sandi lama sebelum memasukkan kata sandi baru. Validasi kompleksitas minimal 8 karakter.'
  },
  {
    id: 'USER-03',
    name: 'Hak Akses Berbasis Peran (Role-Based Access Control / RBAC)',
    category: 'B. Manajemen Pengguna & RBAC',
    plainExplanation: 'Pembatasan menu, halaman, dan aksi API berdasarkan peran pengguna (misal Admin vs Staf vs Pengguna Biasa).',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt', 'saas', 'marketplace'],
    markdownTemplateSnippet: 'Sistem harus menegakkan otorisasi peran pada rute frontend dan seluruh API endpoint backend. Pengguna tanpa izin diarahkan ke halaman 403 Forbidden.'
  },

  // C. Konten & CMS
  {
    id: 'CMS-01',
    name: 'Pembuat & Editor Artikel / Post (Rich Text)',
    category: 'C. Konten & CMS',
    plainExplanation: 'Formulir pembuatan artikel dengan format tebal, miring, judul, daftar, tautan, dan penyisipan gambar.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['blog_cms', 'portfolio', 'business_website'],
    markdownTemplateSnippet: 'WYSIWYG / Markdown editor dengan dukungan heading, gambar, list, quote, dan code blocks.'
  },
  {
    id: 'CMS-02',
    name: 'Status Draft & Publikasi',
    category: 'C. Konten & CMS',
    plainExplanation: 'Memungkinkan penulis menyimpan draf sementara sebelum siap diterbitkan ke publik.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['blog_cms', 'portfolio', 'business_website'],
    markdownTemplateSnippet: 'Konten memiliki status "Draft", "Scheduled", dan "Published". Pengunjung publik hanya dapat membaca status "Published".'
  },
  {
    id: 'CMS-03',
    name: 'Kategori, Tag & Taksonomi',
    category: 'C. Konten & CMS',
    plainExplanation: 'Pengelompokan artikel atau produk berdasarkan topik dan label kata kunci agar mudah dijelajahi.',
    defaultPriority: 'P1',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['blog_cms', 'ecommerce', 'portfolio'],
    markdownTemplateSnippet: 'Pengguna dapat memfilter konten berdasarkan kategori utama (1:N) dan tag label berganda (N:M).'
  },
  {
    id: 'CMS-04',
    name: 'Pencarian Konten & Filter Cepat',
    category: 'C. Konten & CMS',
    plainExplanation: 'Kotak pencarian teks penuh untuk menemukan artikel atau halaman dengan cepat.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['blog_cms', 'ecommerce', 'internal_mgmt'],
    markdownTemplateSnippet: 'Pencarian real-time atau debounced (300ms) pada judul, ringkasan, dan konten dengan penyorotan kata kunci.'
  },

  // D. Manajemen Data
  {
    id: 'DATA-01',
    name: 'Tabel Data Interaktif (Sort, Filter, Paging)',
    category: 'D. Manajemen Data (CRUD & Filter)',
    plainExplanation: 'Tabel daftar data dengan pagination, pengurutan kolom (ascending/descending), dan filter multi-kolom.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt', 'saas'],
    markdownTemplateSnippet: 'Tabel mendukung sorting per kolom, filter status/tanggal, serta pagination (10, 25, 50 entri per halaman) dengan state loading skeleton.'
  },
  {
    id: 'DATA-02',
    name: 'Operasi Tambah, Ubah, Hapus (CRUD Lengkap)',
    category: 'D. Manajemen Data (CRUD & Filter)',
    plainExplanation: 'Formulir input untuk membuat rekaman baru, modal edit data, dan konfirmasi penghapusan aman.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt', 'saas', 'booking_app'],
    markdownTemplateSnippet: 'Dukungan CRUD menyeluruh dengan validasi form ketat, dialog konfirmasi sebelum hapus, dan notifikasi toast sukses/gagal.'
  },
  {
    id: 'DATA-03',
    name: 'Soft Delete & Pemulihan (Trash/Archive)',
    category: 'D. Manajemen Data (CRUD & Filter)',
    plainExplanation: 'Data yang dihapus tidak langsung hilang dari database, melainkan ditandai deleted_at dan dapat dipulihkan.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt', 'saas'],
    markdownTemplateSnippet: 'Penerapan soft delete menggunakan kolom `deleted_at`. Data tidak tampil di query utama namun tersimpan di tab "Sampah" untuk dipulihkan.'
  },
  {
    id: 'DATA-04',
    name: 'Ekspor Data ke Excel / CSV',
    category: 'D. Manajemen Data (CRUD & Filter)',
    plainExplanation: 'Mengunduh tabel data yang sedang difilter ke dalam file spreadsheet Excel atau CSV.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt', 'saas'],
    markdownTemplateSnippet: 'Ekspor data sesuai filter aktif ke format CSV/XLSX dengan encoding UTF-8 dan penamaan file tanggal otomatis.'
  },
  {
    id: 'DATA-05',
    name: 'Impor Massal (Bulk Upload CSV)',
    category: 'D. Manajemen Data (CRUD & Filter)',
    plainExplanation: 'Memasukkan ratusan data sekaligus dengan mengunggah template spreadsheet CSV/Excel.',
    defaultPriority: 'P2',
    suggestedComplexity: ['advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt'],
    markdownTemplateSnippet: 'Mendukung impor file CSV dengan pratinjau baris, validasi kesalahan baris per baris, dan laporan baris yang gagal diimpor.'
  },

  // E. Dashboard & Analitik
  {
    id: 'DASH-01',
    name: 'Kartu Ringkasan Metrik (KPI Summary Cards)',
    category: 'E. Dashboard & Analitik',
    plainExplanation: 'Kotak-kotak ringkasan di atas halaman berisi total penjualan, pengguna aktif, pertumbuhan %, dan pesanan baru.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'saas', 'ecommerce', 'booking_app'],
    markdownTemplateSnippet: 'Menampilkan 3-4 metrik utama (Total Pendapatan, Pengguna Aktif, Transaksi, Rasio Sukses) lengkap dengan komparasi periode sebelumnya (persentase naik/turun).'
  },
  {
    id: 'DASH-02',
    name: 'Grafik Interaktif (Tren Penjualan / Aktivitas)',
    category: 'E. Dashboard & Analitik',
    plainExplanation: 'Grafik garis, batang, atau donat visual untuk melihat pola data dari waktu ke waktu.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'saas', 'ecommerce'],
    markdownTemplateSnippet: 'Grafik visual interaktif (Line Chart / Bar Chart) dengan filter rentang tanggal (Hari Ini, 7 Hari, 30 Hari, Kustom) dan tooltip interaktif.'
  },
  {
    id: 'DASH-03',
    name: 'Log Aktivitas Terbaru (Recent Activity Feed)',
    category: 'E. Dashboard & Analitik',
    plainExplanation: 'Daftar riwayat aksi terbaru yang terjadi di sistem (misal "Pesanan #1042 dibayar", "User Budi mendaftar").',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'saas', 'internal_mgmt'],
    markdownTemplateSnippet: 'Daftar kronologis aktivitas sistem dengan stempel waktu relatif ("5 menit lalu") dan tautan cepat ke detail entitas.'
  },

  // F. Commerce & Transaksi
  {
    id: 'COMM-01',
    name: 'Katalog Produk & Varian (Warna/Ukuran)',
    category: 'F. E-Commerce & Transaksi',
    plainExplanation: 'Daftar produk dengan foto, harga, stok, diskon, dan opsi varian (ukuran, warna, kapasitas).',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['ecommerce', 'marketplace'],
    markdownTemplateSnippet: 'Setiap produk mendukung multi-gambar, deskripsi terformat, SKU, harga coret, serta manajemen stok per kombinasi varian.'
  },
  {
    id: 'COMM-02',
    name: 'Keranjang Belanja (Shopping Cart)',
    category: 'F. E-Commerce & Transaksi',
    plainExplanation: 'Daftar belanja sementara dengan kontrol jumlah (+/-), hapus item, dan subtotal real-time.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['ecommerce'],
    markdownTemplateSnippet: 'Keranjang tersinkronisasi di localStorage / database user, kalkulasi diskon otomatis, dan peringatan jika stok menipis.'
  },
  {
    id: 'COMM-03',
    name: 'Checkout & Pilihan Alamat Pengiriman',
    category: 'F. E-Commerce & Transaksi',
    plainExplanation: 'Formulir pengisian alamat penerima, pemilihan kurir, catatan pengiriman, dan ringkasan pembayaran.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['ecommerce'],
    markdownTemplateSnippet: 'Form multi-langkah: Alamat Pengiriman -> Pilihan Kurir -> Metode Pembayaran -> Ringkasan Total. Validasi nomor telepon dan kode pos.'
  },
  {
    id: 'COMM-04',
    name: 'Integrasi Payment Gateway (Midtrans / Xendit / Stripe)',
    category: 'F. E-Commerce & Transaksi',
    plainExplanation: 'Pembayaran otomatis dengan QRIS, Virtual Account bank, E-Wallet (GoPay, OVO), atau Kartu Kredit.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['ecommerce', 'saas', 'booking_app'],
    markdownTemplateSnippet: 'Integrasi webhook notifikasi status pembayaran (pending, settlement, expire, deny). Proteksi idempotency key pada transaksi.'
  },
  {
    id: 'COMM-05',
    name: 'Manajemen Pesanan & Status Pengiriman',
    category: 'F. E-Commerce & Transaksi',
    plainExplanation: 'Pelacakan status pesanan: Menunggu Bayar -> Diproses -> Dikirim (Resi) -> Selesai -> Dibatalkan.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['ecommerce', 'marketplace'],
    markdownTemplateSnippet: 'Status state machine pesanan yang ketat. Input nomor resi pengiriman oleh admin dan tombol konfirmasi terima oleh pembeli.'
  },

  // G. Booking & Jadwal
  {
    id: 'BOOK-01',
    name: 'Pemilihan Slot Waktu & Kalender Reservasi',
    category: 'G. Booking & Jadwal',
    plainExplanation: 'Kalender interaktif untuk memilih tanggal dan jam janji temu yang masih tersedia.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['booking_app'],
    markdownTemplateSnippet: 'Tampilan kalender bulanan/mingguan dengan slot waktu dinamis. Slot yang sudah terisi otomatis dinonaktifkan (disabled).'
  },
  {
    id: 'BOOK-02',
    name: 'Pencegahan Jadwal Bentrok (Conflict Prevention)',
    category: 'G. Booking & Jadwal',
    plainExplanation: 'Sistem memastikan satu slot waktu tidak dapat dipesan oleh dua orang bersamaan.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['booking_app'],
    markdownTemplateSnippet: 'Transaksi atomik pada tingkat database saat penguncian slot untuk mencegah race condition / double-booking.'
  },
  {
    id: 'BOOK-03',
    name: 'Reschedule & Pembatalan Jadwal',
    category: 'G. Booking & Jadwal',
    plainExplanation: 'Fasilitas bagi pengguna untuk memindahkan atau membatalkan jadwal sesuai batas waktu yang ditentukan.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['booking_app'],
    markdownTemplateSnippet: 'Aturan bisnis: Pembatalan/pemindahan hanya diizinkan maksimal 24 jam sebelum jadwal mulai. Notifikasi otomatis ke staf/penyedia jasa.'
  },

  // H. Komunikasi & Notifikasi
  {
    id: 'NOTIF-01',
    name: 'Notifikasi Email Transaksional',
    category: 'H. Komunikasi & Notifikasi',
    plainExplanation: 'Email otomatis saat registrasi sukses, invoice tagihan, perubahan status pesanan, atau konfirmasi booking.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'ecommerce', 'booking_app'],
    markdownTemplateSnippet: 'Pengiriman email HTML responsif menggunakan provider (Resend / SendGrid / Nodemailer) dengan template yang rapi dan dapat disesuaikan.'
  },
  {
    id: 'NOTIF-02',
    name: 'Pusat Notifikasi Dalam Aplikasi (In-App Bell)',
    category: 'H. Komunikasi & Notifikasi',
    plainExplanation: 'Ikon lonceng di header dengan tanda titik belum dibaca dan menu popup daftar pemberitahuan.',
    defaultPriority: 'P1',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'internal_mgmt', 'ecommerce'],
    markdownTemplateSnippet: 'Daftar notifikasi dengan status dibaca/belum dibaca, tombol "Tandai Semua Telah Dibaca", dan filter kategori pesan.'
  },

  // I. Manajemen File
  {
    id: 'FILE-01',
    name: 'Unggah Gambar dengan Pratinjau (Drag & Drop)',
    category: 'I. Manajemen File & Media',
    plainExplanation: 'Area tarik-dan-lepas untuk mengunggah gambar dengan pratinjau instan dan tombol hapus.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['ecommerce', 'portfolio', 'blog_cms', 'saas'],
    markdownTemplateSnippet: 'Komponen Drag & drop upload dengan validasi format (JPG, PNG, WebP) dan ukuran maksimal (maks. 5MB) di browser sebelum diunggah.'
  },
  {
    id: 'FILE-02',
    name: 'Penyimpanan Awan Aman (S3 / Cloudinary / Supabase Storage)',
    category: 'I. Manajemen File & Media',
    plainExplanation: 'Penyimpanan file langsung ke layanan cloud yang andal dan menghasilkan URL publik atau privat.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'ecommerce', 'blog_cms'],
    markdownTemplateSnippet: 'File disimpan di storage bucket dengan penamaan acak unik (UUID) untuk mencegah tabrakan nama file dan penimpaan tidak sengaja.'
  },

  // J. Administrasi
  {
    id: 'ADM-01',
    name: 'Panel Manajemen Pengguna untuk Admin',
    category: 'J. Administrasi & Audit',
    plainExplanation: 'Halaman khusus admin untuk melihat semua pengguna, menonaktifkan akun, atau mengubah peran.',
    defaultPriority: 'P0',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['admin_dashboard', 'internal_mgmt', 'saas'],
    markdownTemplateSnippet: 'Admin dapat mencari pengguna, mengubah role (User, Staff, Admin), mengunci akun bermasalah, dan mereset kata sandi.'
  },
  {
    id: 'ADM-02',
    name: 'Catatan Jejak Audit (Audit Trail Log)',
    category: 'J. Administrasi & Audit',
    plainExplanation: 'Pencatatan riwayat siapa yang mengubah atau menghapus data penting demi keamanan dan akuntabilitas.',
    defaultPriority: 'P1',
    suggestedComplexity: ['advanced'],
    recommendedFor: ['internal_mgmt', 'admin_dashboard', 'saas'],
    markdownTemplateSnippet: 'Setiap aksi sensitif (hapus data, ubah saldo, ubah peran) mencatat user_id, action, timestamp, IP address, dan ringkasan data sebelum/sesudah diubah.'
  },

  // K. Interaksi UI
  {
    id: 'UI-01',
    name: 'Notifikasi Toast (Feedback Aksi Instan)',
    category: 'K. Interaksi UI & Modal',
    plainExplanation: 'Pemberitahuan kecil di pojok layar (Sukses disimpan, Gagal terhubung) yang otomatis hilang setelah beberapa detik.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['landing_page', 'portfolio', 'saas', 'ecommerce', 'admin_dashboard'],
    markdownTemplateSnippet: 'Toast notification non-blocking dengan varian Sukses (hijau), Error (merah), Info (biru), dan Peringatan (kuning).'
  },
  {
    id: 'UI-02',
    name: 'Dialog Konfirmasi Aksi Destruktif',
    category: 'K. Interaksi UI & Modal',
    plainExplanation: 'Jendela popup yang meminta persetujuan sebelum menghapus data atau melakukan tindakan yang tidak bisa dibatalkan.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['saas', 'admin_dashboard', 'internal_mgmt', 'ecommerce'],
    markdownTemplateSnippet: 'Modal konfirmasi dengan tombol Batal dan tombol Hapus merah tegas untuk mencegah klik tidak sengaja.'
  },
  {
    id: 'UI-03',
    name: 'State Kosong (Empty State) & Skeleton Loader',
    category: 'K. Interaksi UI & Modal',
    plainExplanation: 'Tampilan grafis ramah saat belum ada data disertai tombol ajakan bertindak, serta efek skeleton saat data sedang dimuat.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['saas', 'admin_dashboard', 'ecommerce', 'booking_app'],
    markdownTemplateSnippet: 'Seluruh halaman daftar harus memiliki Skeleton Loader saat pending request, serta Empty State visual jika hasil query kosong.'
  },

  // L. Integrasi Eksternal
  {
    id: 'INT-01',
    name: 'Integrasi Google Maps / Pemilih Lokasi',
    category: 'L. Integrasi Eksternal',
    plainExplanation: 'Peta interaktif untuk menampilkan alamat kantor, toko fisik, atau penentuan titik koordinat jemput.',
    defaultPriority: 'P1',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['business_website', 'booking_app', 'ecommerce'],
    markdownTemplateSnippet: 'Peta interaktif dengan pin lokasi, petunjuk arah, dan input pencarian alamat menggunakan geocoding.'
  },
  {
    id: 'INT-02',
    name: 'Analitik Pengunjung (Google Analytics / Plausible)',
    category: 'L. Integrasi Eksternal',
    plainExplanation: 'Pelacakan jumlah pengunjung, halaman populer, dan konversi tombol tanpa memperlambat performa.',
    defaultPriority: 'P1',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['landing_page', 'portfolio', 'business_website', 'ecommerce', 'saas'],
    markdownTemplateSnippet: 'Pemasangan script analitik ringan dengan penanganan persetujuan privasi (GDPR compliant).'
  },

  // M. Platform & SEO
  {
    id: 'SEO-01',
    name: 'Optimasi SEO & Kartu Bagikan Media Sosial (OpenGraph)',
    category: 'M. Platform & SEO',
    plainExplanation: 'Meta tag lengkap agar website tampil bagus dengan judul, deskripsi, dan gambar pratinjau saat dibagikan ke WhatsApp atau Twitter.',
    defaultPriority: 'P0',
    suggestedComplexity: ['simple', 'standard', 'advanced'],
    recommendedFor: ['landing_page', 'portfolio', 'business_website', 'blog_cms', 'ecommerce'],
    markdownTemplateSnippet: 'Setiap halaman memiliki tag title unik, meta description (150-160 char), canonical URL, og:title, og:description, og:image, dan twitter:card.'
  },
  {
    id: 'SEO-02',
    name: 'Dukungan Progressive Web App (PWA) & Mode Offline Ringan',
    category: 'M. Platform & SEO',
    plainExplanation: 'Aplikasi dapat di-install ke layar utama HP/laptop seperti aplikasi native dan membuka halaman dasar tanpa internet.',
    defaultPriority: 'P2',
    suggestedComplexity: ['standard', 'advanced'],
    recommendedFor: ['saas', 'internal_mgmt', 'ecommerce'],
    markdownTemplateSnippet: 'Penyediaan web app manifest.json, ikon splash screen, dan service worker untuk caching asset statis agar cepat dibuka.'
  }
];
