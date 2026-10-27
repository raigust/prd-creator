export type AgentTargetFormat = 
  | 'universal_agents_md'
  | 'claude_md'
  | 'cursor_rules'
  | 'windsurf_rules'
  | 'copilot_instructions';

export type AgentRolePersona = 
  | 'senior_fullstack'
  | 'clean_architecture'
  | 'rapid_prototyper'
  | 'security_first'
  | 'qa_testing';

export interface AgentConfiguration {
  id: string;
  projectName: string;
  targetFormat: AgentTargetFormat;
  rolePersona: AgentRolePersona;
  customPersonaTitle?: string;
  toneAndCommunication: 'concise_code_first' | 'collaborative_exploratory' | 'strict_pedantic';
  workflowApproach: 'plan_first' | 'incremental_steps' | 'test_driven' | 'direct_execution';
  
  // Guardrails & Human-in-the-loop approvals
  approvals: {
    requirePlanApproval: boolean;
    askBeforeNewDependencies: boolean;
    askBeforeDatabaseMigrations: boolean;
    askBeforeDestructiveDeletions: boolean;
    forbidSecretCommits: boolean;
  };

  // Technical constraints
  techStack: {
    primaryLanguage: string;
    frontendFramework: string;
    stylingSystem: string;
    backendFramework: string;
    database: string;
    packageManager: 'npm' | 'pnpm' | 'yarn' | 'bun';
  };

  // Code quality & standards
  codeQualityRules: {
    strictTypeScript: boolean;
    maxFileLines: number;
    enforceTailwindOnly: boolean;
    antiSlopDesign: boolean;
    handleLoadingAndErrors: boolean;
    modularComponents: boolean;
  };

  // Verification commands
  verification: {
    buildCommand: string;
    lintCommand: string;
    testCommand: string;
    runChecksBeforeDone: boolean;
  };

  // Custom user rules
  customRules: string[];
}
