import { ProjectConfiguration, ValidationIssue } from '../types/prd';

export function validateProjectConfig(config: ProjectConfiguration): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Step 0: Basics
  if (!config.name || config.name.trim().length === 0) {
    issues.push({
      type: 'error',
      message: 'Nama proyek belum diisi.',
      stepIndex: 0
    });
  }

  if (!config.description || config.description.trim().length < 10) {
    issues.push({
      type: 'warning',
      message: 'Deskripsi proyek terlalu singkat. Berikan 1-2 kalimat agar AI memahami konteks.',
      stepIndex: 0
    });
  }

  // Step 1: Goals & Scope
  if (!config.problemStatement || config.problemStatement.trim().length < 10) {
    issues.push({
      type: 'warning',
      message: 'Masalah utama (Problem Statement) belum dijelaskan secara mendalam.',
      stepIndex: 1
    });
  }

  if (config.inScope.length === 0) {
    issues.push({
      type: 'warning',
      message: 'Belum ada batasan fitur In-Scope yang ditentukan.',
      stepIndex: 1
    });
  }

  // Step 2: Roles
  if (config.hasUserAccounts && (!config.roles || config.roles.length === 0)) {
    issues.push({
      type: 'error',
      message: 'Autentikasi akun diaktifkan tetapi belum ada peran (roles) yang didefinisikan.',
      stepIndex: 2
    });
  }

  // Step 3: Features
  if (!config.selectedFeatures || config.selectedFeatures.length === 0) {
    issues.push({
      type: 'warning',
      message: 'Belum ada fitur fungsional yang dipilih dari katalog.',
      stepIndex: 3
    });
  }

  // Step 6: Tech Stack vs Features compatibility
  const hasDataFeatures = config.selectedFeatures.some(
    (f) => f.category.includes('Manajemen Data') || f.category.includes('Otentikasi') || f.category.includes('Commerce')
  );
  if (hasDataFeatures && config.database === 'Tidak ada') {
    issues.push({
      type: 'error',
      message: 'Fitur memerlukan penyimpanan data (CRUD/Akun), namun database dipilih "Tidak ada".',
      stepIndex: 6
    });
  }

  // Acceptance criteria
  if (!config.acceptanceCriteria || config.acceptanceCriteria.length === 0) {
    issues.push({
      type: 'info',
      message: 'Disarankan menyertakan minimal 1 Kriteria Penerimaan (Given/When/Then) untuk pengujian.',
      stepIndex: 9
    });
  }

  return issues;
}
