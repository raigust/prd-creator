import { ProjectConfiguration } from '../types/prd';

/**
 * Generates a complete, deterministic, AI-ready Product Requirements Document (PRD) in Markdown.
 * Operates offline without external AI API dependencies.
 */
export function generateMarkdownPRD(config: ProjectConfiguration): string {
  const isId = config.outputLanguage === 'id';
  const now = new Date().toISOString().split('T')[0];

  const sections: string[] = [];

  // Header / Document Metadata
  sections.push(`# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# ${config.name || 'Proyek Tanpa Judul'}

> **Versi Dokumen:** 1.0.0  
> **Status:** Final Spesifikasi Teknis Siap Implementasi  
> **Tipe Produk:** ${formatProjectType(config.projectType, isId)}  
> **Kompleksitas:** ${config.complexity.toUpperCase()}  
> **Target Pengguna:** ${config.targetAudience || 'Pengguna Umum / Profesional'}  
> **Bahasa Keluaran:** ${isId ? 'Bahasa Indonesia' : 'English'}  
> **Tanggal Pembuatan:** ${now}  
> **Generator:** PRD Studio (Describe less. Specify better. Build with clarity.)

---
`);

  // 1. Executive Summary & Problem Statement
  sections.push(`## 1. IKHTISAR PRODUK & PERMASALAHAN

### 1.1 Deskripsi Produk
${config.description || 'Aplikasi digital yang dirancang untuk memberikan solusi andal, terstruktur, dan efisien bagi pengguna.'}

### 1.2 Masalah yang Diselesaikan (Problem Statement)
${config.problemStatement || 'Banyak pengguna menghadapi inefisiensi akibat alur kerja manual, kurangnya visibilitas data, serta sistem yang terfragmentasi.'}

### 1.3 Hasil yang Diharapkan (Desired Outcome)
${config.desiredOutcome || 'Menyediakan platform terpadu yang memangkas waktu kerja, meminimalkan kesalahan manusia, dan menyajikan pengalaman pengguna yang intuitif.'}
`);

  // 2. Goals & Success Metrics
  sections.push(`## 2. TUJUAN PRODUK & METRIK KEBERHASILAN

### 2.1 Kebutuhan Utama Pengguna (User Needs)
${
  config.primaryUserNeeds && config.primaryUserNeeds.length > 0
    ? config.primaryUserNeeds.map((need, idx) => `${idx + 1}. ${need}`).join('\n')
    : '1. Akses mudah dan cepat melalui browser web modern.\n2. Alur navigasi yang jelas tanpa hambatan teknis.'
}

### 2.2 Sasaran Bisnis / Operasional
${
  config.businessObjectives && config.businessObjectives.length > 0
    ? config.businessObjectives.map((obj, idx) => `- ${obj}`).join('\n')
    : '- Mempercepat penyelesaian tugas pengguna hingga 50%.\n- Mengurangi angka kesalahan input data.'
}

### 2.3 Metrik Keberhasilan Terukur (Success Metrics)
| ID | Metrik | Target Kuantitatif | Status Validasi |
|---|---|---|---|
${
  config.successMetrics && config.successMetrics.length > 0
    ? config.successMetrics
        .map(
          (m, idx) =>
            `| SM-${String(idx + 1).padStart(2, '0')} | ${m.metric} | ${m.target} | ${m.status === 'confirmed' ? 'Terkonfirmasi (Confirmed)' : 'Diusulkan (Proposed)'} |`
        )
        .join('\n')
    : '| SM-01 | Waktu Pemuatan Halaman (Page Load p95) | < 800ms | Terkonfirmasi (Confirmed) |\n| SM-02 | Tingkat Keberhasilan Alur Utama | > 95% | Terkonfirmasi (Confirmed) |'
}
`);

  // 3. Product Scope
  sections.push(`## 3. RUANG LINGKUP PRODUK (SCOPE)

### 3.1 Termasuk dalam Lingkup MVP (In-Scope)
${
  config.inScope && config.inScope.length > 0
    ? config.inScope.map((item) => `- [x] **${item}**`).join('\n')
    : '- [x] Fitur utama dan antarmuka responsif.'
}

### 3.2 Di Luar Lingkup MVP (Explicitly Out-of-Scope)
> *Peringatan untuk AI Agent: Jangan mengimplementasikan fitur di bawah ini kecuali diinstruksikan secara eksplisit.*
${
  config.outOfScope && config.outOfScope.length > 0
    ? config.outOfScope.map((item) => `- [ ] ${item}`).join('\n')
    : '- [ ] Sistem automasi eksternal tingkat lanjut.\n- [ ] Integrasi analitik pihak ketiga yang belum dikonfirmasi.'
}

### 3.3 Batasan Teknis & Asumsi (Constraints & Assumptions)
**Batasan yang Diketahui:**
${
  config.knownConstraints && config.knownConstraints.length > 0
    ? config.knownConstraints.map((c) => `- ${c}`).join('\n')
    : '- Menggunakan web browser modern (Chrome, Safari, Firefox, Edge).'
}

**Asumsi Desain:**
${
  config.assumptions && config.assumptions.length > 0
    ? config.assumptions.map((a) => `- ${a}`).join('\n')
    : '- Pengguna memiliki koneksi internet stabil.'
}
`);

  // 4. Roles & Permissions (if accounts enabled or has roles)
  if (config.hasUserAccounts && config.roles && config.roles.length > 0) {
    sections.push(`## 4. PERAN PENGGUNA & MATRIKS HAK AKSES (RBAC)

${config.roles
  .map(
    (role) => `### Peran: ${role.name}
- **Deskripsi:** ${role.description}
- **Halaman yang Dapat Diakses:** ${role.accessiblePages.length > 0 ? role.accessiblePages.join(', ') : 'Semua Halaman Publik'}
- **Aksi Sensitif Tertutup:** ${role.sensitiveActions && role.sensitiveActions.length > 0 ? role.sensitiveActions.join(', ') : 'Tidak ada'}
`
  )
  .join('\n')}

### Matriks Otorisasi
| Peran (Role) | Lihat (View) | Buat (Create) | Edit (Update) | Hapus (Delete) | Setujui (Approve) |
|---|:---:|:---:|:---:|:---:|:---:|
${config.roles
  .map(
    (r) =>
      `| **${r.name}** | ${r.permissions.view ? 'Ya' : 'Tidak'} | ${r.permissions.create ? 'Ya' : 'Tidak'} | ${r.permissions.update ? 'Ya' : 'Tidak'} | ${r.permissions.delete ? 'Ya' : 'Tidak'} | ${r.permissions.approve ? 'Ya' : 'Tidak'} |`
  )
  .join('\n')}
`);
  } else {
    sections.push(`## 4. PERAN PENGGUNA & HAK AKSES
Produk ini tidak memerlukan autentikasi login atau akun pengguna terdaftar pada fase MVP. Seluruh fungsi dapat diakses oleh **Pengunjung Publik** secara terbuka.`);
  }

  // 5. Functional Requirements (Features)
  sections.push(`## 5. PERSYARATAN FUNGSIONAL (FUNCTIONAL REQUIREMENTS)

Setiap kebutuhan memiliki identitas unik permanen (*stable ID*) dan prioritas implementasi yang jelas.`);

  if (config.selectedFeatures && config.selectedFeatures.length > 0) {
    // Group by category
    const grouped: { [cat: string]: typeof config.selectedFeatures } = {};
    config.selectedFeatures.forEach((f) => {
      if (!grouped[f.category]) grouped[f.category] = [];
      grouped[f.category].push(f);
    });

    let frCounter = 1;
    Object.keys(grouped).forEach((cat) => {
      sections.push(`\n### Kategori: ${cat}\n`);
      grouped[cat].forEach((feat) => {
        const frId = `FR-${String(frCounter++).padStart(3, '0')}`;
        sections.push(`#### [${frId}] ${feat.name}
- **Prioritas:** **${feat.priority}**
- **Penjelasan Fungsi:** ${feat.description}
${feat.notes ? `- **Catatan Khusus Pengguna:** ${feat.notes}` : ''}
`);
      });
    });
  } else {
    sections.push(`#### [FR-001] Antarmuka Utama & Interaksi Dasar
- **Prioritas:** **P0**
- **Penjelasan Fungsi:** Pengguna dapat mengakses halaman utama, melihat informasi produk, dan menjalankan navigasi interaktif.
`);
  }

  // 6. Business Rules
  sections.push(`## 6. ATURAN BISNIS (BUSINESS RULES)

Aturan sistem yang wajib ditegakkan oleh kode logika aplikasi.`);

  if (config.businessRules && config.businessRules.length > 0) {
    config.businessRules.forEach((rule, idx) => {
      const brId = `BR-${String(idx + 1).padStart(3, '0')}`;
      sections.push(`### [${brId}] ${rule.name}
- **Kondisi / Pemicu:** ${rule.condition}
- **Perilaku Sistem yang Diharapkan:** ${rule.requiredBehavior}
- **Penanganan Kesalahan / Kegagalan:** ${rule.failureBehavior}
${rule.relatedFeature ? `- **Fitur Terkait:** ${rule.relatedFeature}` : ''}
`);
    });
  } else {
    sections.push(`### [BR-001] Validasi Input Pengguna
- **Kondisi / Pemicu:** Pengguna mengirimkan data melalui formulir.
- **Perilaku Sistem yang Diharapkan:** Sistem memvalidasi kelengkapan bidang wajib, tipe data, dan batas panjang karakter sebelum memproses.
- **Penanganan Kesalahan / Kegagalan:** Menampilkan pesan error spesifik di bawah bidang yang tidak valid tanpa menghapus data input lain.`);
  }

  // 7. Pages, Routing & Navigation
  sections.push(`## 7. STRUKTUR HALAMAN & NAVIGASI (PAGES & ROUTING)

### 7.1 Daftar Halaman Aplikasi
| Rute URL | Nama Halaman | Tujuan / Fungsi | Akses Peran | State yang Didukung |
|---|---|---|---|---|
${
  config.pages && config.pages.length > 0
    ? config.pages
        .map(
          (p) =>
            `| \`${p.route}\` | **${p.name}** | ${p.purpose} | ${p.accessibleRoles.join(', ') || 'Publik'} | ${[
              p.hasLoadingState ? 'Loading' : '',
              p.hasEmptyState ? 'Empty' : '',
              p.hasErrorState ? 'Error' : ''
            ]
              .filter(Boolean)
              .join(', ') || 'Standard'} |`
        )
        .join('\n')
    : '| `/` | **Beranda** | Halaman pendaratan utama dan pengenalan produk | Publik | Loading, Error |'
}

### 7.2 Elemen Navigasi & Tata Letak
- **Top Navigation Bar:** ${config.navElements?.navbar ? 'Aktif (1-line Brand Wordmark, Link Halaman, 1 CTA Utama)' : 'Nonaktif'}
- **Sidebar Navigasi:** ${config.navElements?.sidebar ? 'Aktif (Menu vertikal kolapsibel)' : 'Nonaktif'}
- **Footer:** ${config.navElements?.footer ? 'Aktif (Link legal, hak cipta, dan navigasi pelengkap)' : 'Nonaktif'}
- **Breadcrumb Trail:** ${config.navElements?.breadcrumbs ? 'Aktif (Navigasi riwayat hirarki rute)' : 'Nonaktif'}
- **Responsif Mobile:** ${config.navElements?.mobileNav ? 'Aktif (Menu drawer / bottom sheet sentuh)' : 'Nonaktif'}
`);

  // 8. User Flows
  sections.push(`## 8. ALUR PERJALANAN PENGGUNA (USER FLOWS)
`);
  if (config.userFlows && config.userFlows.length > 0) {
    config.userFlows.forEach((flow, idx) => {
      const ufId = `UF-${String(idx + 1).padStart(3, '0')}`;
      sections.push(`### [${ufId}] ${flow.name}
- **Aktor:** ${flow.actor}
- **Kondisi Awal:** ${flow.startingCondition}
- **Langkah-Langkah Alur:**
${flow.steps.map((st, sIdx) => `  ${sIdx + 1}. ${st}`).join('\n')}
${flow.alternativePaths ? `- **Alur Alternatif:** ${flow.alternativePaths}` : ''}
${flow.failureScenarios ? `- **Skenario Kegagalan:** ${flow.failureScenarios}` : ''}
- **Kondisi Akhir Sukses:** ${flow.finalState}
`);
    });
  } else {
    sections.push(`### [UF-001] Penjelajahan Pengunjung Publik
- **Aktor:** Pengunjung Baru
- **Kondisi Awal:** Pengunjung membuka rute utama \`/\`.
- **Langkah-Langkah Alur:**
  1. Halaman utama dimuat dengan hero section yang menjelaskan nilai produk.
  2. Pengunjung menjelajahi ringkasan fitur atau mencoba demo interaktif.
  3. Pengunjung mengeklik tombol aksi utama (CTA).
- **Kondisi Akhir Sukses:** Pengunjung berhasil menyelesaikan interaksi atau mendaftar.`);
  }

  // 9. UI/UX Design System
  sections.push(`## 9. SISTEM DESAIN & PANDUAN UI/UX

### 9.1 Arah Gaya Visual (Design Direction)
- **Preset Desain:** ${config.designPreset || 'Editorial Print Magazine (ElevenLabs Style)'}
- **Mode Tema:** ${config.themeMode === 'dual' ? 'Dukungan Light & Dark Mode' : config.themeMode === 'dark' ? 'Dark Mode' : 'Light Off-White Canvas'}
- **Warna Primer:** \`${config.primaryColor || '#292524'}\` (Tinta Gelap Hangat & Tombol Pill)
- **Warna Dasar Kanvas:** \`${config.secondaryColor || '#f5f5f5'}\` (Off-White Bersih & Lembut)
- **Tipografi:** ${config.typography || 'EB Garamond / Waldenburg (Display 300 Light), Inter (Body 400/500), JetBrains Mono (Data)'}
- **Bentuk Sudut (Border Radius):** ${config.borderRadius || 'rounded-full untuk tombol pill, rounded-2xl untuk kartu konten'}
- **Kepadatan Tata Letak:** ${config.spacingDensity || 'normal'}

### 9.2 Prinsip Anti-AI Slop & Disiplin Visual
- **Display Tipografi Ringan (Bobot 300):** Judul display menggunakan font serif berbobot 300 ringan elegan — dilarang membold judul utama.
- **Zero-Pill Static Metadata:** Label metadata (tanggal, kategori, durasi baca) tidak dibungkus dalam kapsul chip sempit. Gunakan teks bersih dengan pemisah tipografis (\`·\` atau \`/\`).
- **Pill Hanya untuk Tombol Aksi:** Bentuk pill (\`rounded-full\`) dikhususkan untuk elemen interaktif seperti tombol CTA primer (\`#292524\`) dan tab filter aktif.
- **Atmospheric Gradient Orbs:** Ornamen visual hanya berupa soft radial-gradient orbs atmosferik (mint, peach, lavender) di latar belakang, bukan warna tombol yang mencolok.
- **Tanpa Header Komentar Kode:** Dilarang menggunakan awalan pseudo-teknis seperti \`// 01 ARCHITECTURE\` atau \`>_ SYSTEM\`. Gunakan judul natural *Title Case*.
`);

  // 10. Technical Stack & Architecture
  sections.push(`## 10. SPESIFIKASI TEKNOLOGI & ARSITEKTUR

### 10.1 Konfigurasi Stack
- **Frontend Framework:** ${config.frontendFramework || 'React 19 + TypeScript + Vite'}
- **Styling System:** ${config.stylingSystem || 'Tailwind CSS'}
- **Backend Framework:** ${config.backendFramework || 'Node.js Express / TSX'}
- **Database:** ${config.database || 'PostgreSQL / Supabase (atau tidak diperlukan untuk static)'}
- **ORM / Query Builder:** ${config.orm || 'Drizzle ORM'}
- **Autentikasi:** ${config.authProvider || 'Session Cookie HttpOnly / Auth.js'}
- **Gaya Komunikasi API:** ${config.apiStyle || 'RESTful JSON API'}
- **Platform Deployment:** ${config.deploymentPlatform || 'Vercel / Cloud Run'}
- **Pola Arsitektur:** ${config.architectureStyle || 'Modular Single Page Application (SPA)'}
`);

  // 11. Database Design (if applicable)
  if (config.dataEntities && config.dataEntities.length > 0) {
    sections.push(`## 11. DESAIN BASIS DATA (DATA MODEL)
`);
    config.dataEntities.forEach((ent) => {
      sections.push(`### Entitas: \`${ent.name}\`
*Tujuan: ${ent.purpose}*

| Nama Kolom | Tipe Data | Wajib | Kunci / Constraint | Keterangan |
|---|---|:---:|---|---|
${ent.fields
  .map(
    (f) =>
      `| \`${f.name}\` | \`${f.type}\` | ${f.required ? 'Ya' : 'Opsional'} | ${
        f.isPrimaryKey ? '**Primary Key**' : f.isForeignKey ? 'Foreign Key' : f.unique ? 'Unique' : '-'
      } | ${f.description || '-'} |`
  )
  .join('\n')}

${
  ent.relationships && ent.relationships.length > 0
    ? `**Relasi Entitas:**\n` +
      ent.relationships.map((r) => `- Relasi **${r.type}** dengan entitas \`${r.targetEntity}\``).join('\n')
    : ''
}
`);
    });
  }

  // 12. API Specification (if applicable)
  if (config.apiEndpoints && config.apiEndpoints.length > 0) {
    sections.push(`## 12. SPESIFIKASI ENDPOINT API
`);
    config.apiEndpoints.forEach((api) => {
      sections.push(`### \`${api.method} ${api.path}\`
- **Fungsi:** ${api.purpose}
- **Perlu Autentikasi:** ${api.requiredAuth ? 'Ya (Bearer Token / Cookie Sesi)' : 'Tidak (Endpoint Publik)'}
${api.allowedRoles && api.allowedRoles.length > 0 ? `- **Peran yang Diizinkan:** ${api.allowedRoles.join(', ')}` : ''}
${api.requestBodySummary ? `- **Struktur Payload Request:** \`${api.requestBodySummary}\`` : ''}
${api.successResponseSummary ? `- **Contoh Response Sukses (200/201):** \`${api.successResponseSummary}\`` : ''}
`);
    });
  }

  // 13. Integrations, Security & NFR
  sections.push(`## 13. KEAMANAN & KUALITAS SISTEM (SECURITY & NON-FUNCTIONAL)

### 13.1 Kontrol Keamanan (Security Controls)
${
  config.securityControls && config.securityControls.length > 0
    ? config.securityControls.map((sc) => `- [x] **${sc}**`).join('\n')
    : `- [x] Sanitasi dan validasi seluruh input formulir di sisi server.
- [x] Pencegahan serangan Cross-Site Scripting (XSS) dan CSRF.
- [x] Penyimpanan kata sandi ter-hash menggunakan bcrypt/argon2.
- [x] Penggunaan HTTPS ketat dan header keamanan modern.`
}

### 13.2 Target Kualitas Non-Fungsional (NFR)
${
  config.nonFunctionalTargets && config.nonFunctionalTargets.length > 0
    ? config.nonFunctionalTargets.map((nfr) => `- **${nfr.category}:** ${nfr.target} ${nfr.condition ? `(${nfr.condition})` : ''}`).join('\n')
    : `- **Performa:** Waktu respon p95 API < 200ms di bawah beban 100 request/detik.
- **Ketersediaan (Availability):** Target uptime 99.9%.
- **Aksesibilitas:** Memenuhi kriteria standar WCAG 2.1 Level AA.`
}
`);

  // 14. Testing & Acceptance Criteria
  sections.push(`## 14. PENGUJIAN & KRITERIA PENERIMAAN (ACCEPTANCE CRITERIA)

### 14.1 Format Given / When / Then
`);
  if (config.acceptanceCriteria && config.acceptanceCriteria.length > 0) {
    config.acceptanceCriteria.forEach((tc, idx) => {
      const tcId = `AC-${String(idx + 1).padStart(3, '0')}`;
      sections.push(`#### [${tcId}] Fitur: ${tc.featureName}
- **Given (Kondisi Awal):** ${tc.given}
- **When (Tindakan Pengguna):** ${tc.when}
- **Then (Respon Sistem):** ${tc.then}
${tc.alternativeOrError ? `- **Skenario Alternatif / Error:** ${tc.alternativeOrError}` : ''}
`);
    });
  } else {
    sections.push(`#### [AC-001] Pengiriman Formulir Utama
- **Given:** Pengguna berada di halaman formulir dengan kredensial atau input yang valid.
- **When:** Pengguna menekan tombol submit.
- **Then:** Sistem menyimpan data, menampilkan notifikasi toast sukses, dan memperbarui tampilan antarmuka.
- **Skenario Error:** Jika ada isian wajib yang kosong, sistem menampilkan batas merah pada input dan memblokir pengiriman.
`);
  }

  // 15. Definition of Done
  sections.push(`## 15. DEFINISI SELESAI (DEFINITION OF DONE)

Kode dianggap selesai jika memenuhi seluruh checklist berikut:
${
  config.definitionOfDone && config.definitionOfDone.length > 0
    ? config.definitionOfDone.map((d) => `- [ ] ${d}`).join('\n')
    : `- [ ] Seluruh kriteria penerimaan (Acceptance Criteria) teruji dan lulus.
- [ ] Proses build (\`npm run build\`) berhasil tanpa error kompilasi TypeScript.
- [ ] Tidak ada dead links atau tombol tanpa aksi (handler).
- [ ] Tampilan responsif diverifikasi pada resolusi Mobile (375px), Tablet (768px), dan Desktop (1440px).
- [ ] State loading, empty, dan error telah diimplementasikan dengan pesan jelas.`
}
`);

  // 16. AI Agent Implementation Instructions
  sections.push(`## 16. INSTRUKSI UNTUK AI CODING AGENT

> **Target Coding Agent Preset:** \`${config.agentPreset.toUpperCase()}\`  
> **Metodologi Kerja:** \`${config.implementationWorkflow.replace('_', ' ').toUpperCase()}\`

### Aturan Eksekusi Wajib:
1. **Baca PRD ini secara menyeluruh** sebelum menulis atau memodifikasi file kode.
2. **Inspeksi struktur repositori yang ada** terlebih dahulu; pertahankan konvensi penamaan dan dependensi yang sudah terpasang.
3. **Dilarang menambahkan fitur spekulatif** yang berada di luar cakupan (*Out-of-Scope*) tanpa persetujuan eksplisit.
4. **Validasi input & otorisasi peran:** Pastikan setiap endpoint dan mutasi data dilindungi validasi tipe yang ketat.
5. **Implementasi bertahap:** Tulis fungsionalitas secara terorganisir per komponen, lalu jalankan verifikasi build di akhir turn.
6. **Laporkan hasil nyata:** Sampaikan file yang dimodifikasi, fitur yang telah berfungsi, serta batasan yang belum selesai secara jujur.

${
  config.customAgentRules && config.customAgentRules.length > 0
    ? `### Instruksi Tambahan Khusus Proyek:\n` + config.customAgentRules.map((r) => `- ${r}`).join('\n')
    : ''
}

---
*Dokumen ini dibuat secara otomatis oleh PRD Studio. Dapat langsung disalin ke prompt Cursor, Claude Code, Windsurf, atau AI Assistant lainnya.*
`);

  return sections.join('\n');
}

function formatProjectType(type: string, isId: boolean): string {
  const map: { [key: string]: { id: string; en: string } } = {
    landing_page: { id: 'Landing Page Produk & Marketing', en: 'Landing Page' },
    portfolio: { id: 'Website Portofolio & Showcase', en: 'Portfolio' },
    business_website: { id: 'Website Profil Perusahaan / Usaha', en: 'Business Website' },
    blog_cms: { id: 'Blog / Headless CMS', en: 'Blog / CMS' },
    ecommerce: { id: 'Toko Online / E-Commerce', en: 'E-Commerce' },
    admin_dashboard: { id: 'Admin Console & Dashboard Internal', en: 'Admin Dashboard' },
    saas: { id: 'SaaS Web Application', en: 'SaaS Application' },
    booking_app: { id: 'Aplikasi Reservasi & Booking Jadwal', en: 'Booking Application' },
    internal_mgmt: { id: 'Sistem Informasi Manajemen Internal', en: 'Internal Management' },
    marketplace: { id: 'Platform Marketplace Multi-Pihak', en: 'Marketplace' },
    api_backend: { id: 'API / Backend Service', en: 'API Service' },
    custom: { id: 'Aplikasi Digital Kustom', en: 'Custom Application' }
  };

  return map[type] ? (isId ? map[type].id : map[type].en) : type;
}
