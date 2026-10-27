import { AgentConfiguration } from '../types/agent';
import { ProjectConfiguration } from '../types/prd';

export function createDefaultAgentConfig(prdConfig?: ProjectConfiguration): AgentConfiguration {
  return {
    id: 'agent-' + Date.now(),
    projectName: prdConfig?.name || 'Aplikasi Web Modern',
    targetFormat: 'universal_agents_md',
    rolePersona: 'senior_fullstack',
    toneAndCommunication: 'concise_code_first',
    workflowApproach: 'plan_first',
    
    approvals: {
      requirePlanApproval: true,
      askBeforeNewDependencies: true,
      askBeforeDatabaseMigrations: true,
      askBeforeDestructiveDeletions: true,
      forbidSecretCommits: true
    },

    techStack: {
      primaryLanguage: 'TypeScript',
      frontendFramework: prdConfig?.frontendFramework || 'React 19 + Vite',
      stylingSystem: prdConfig?.stylingSystem || 'Tailwind CSS',
      backendFramework: prdConfig?.backendFramework || 'Node.js Express / TSX',
      database: prdConfig?.database || 'PostgreSQL / Supabase',
      packageManager: 'npm'
    },

    codeQualityRules: {
      strictTypeScript: true,
      maxFileLines: 250,
      enforceTailwindOnly: true,
      antiSlopDesign: true,
      handleLoadingAndErrors: true,
      modularComponents: true
    },

    verification: {
      buildCommand: 'npm run build',
      lintCommand: 'npm run lint',
      testCommand: 'npm run test',
      runChecksBeforeDone: true
    },

    customRules: [
      'Gunakan pendekatan modular dan pecah komponen besar menjadi sub-komponen terpisah.',
      'Pastikan setiap tombol dan kontrol interaktif memiliki event handler yang aktif (tidak boleh dead clicks).',
      'Jangan menghapus atau menimpa kode lama yang tidak berkaitan dengan task saat ini.'
    ]
  };
}
