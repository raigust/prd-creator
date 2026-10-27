import { AgentConfiguration, AgentTargetFormat } from '../types/agent';
import { ProjectConfiguration } from '../types/prd';

/**
 * Generates an AGENTS.md (or CLAUDE.md, .cursorrules) based on user-configured rules.
 */
export function generateAgentMarkdown(config: AgentConfiguration, prdConfig?: ProjectConfiguration): string {
  const target = config.targetFormat;
  const isClaude = target === 'claude_md';
  const isCursor = target === 'cursor_rules';
  const isWindsurf = target === 'windsurf_rules';
  const isCopilot = target === 'copilot_instructions';

  const titleHeader = isClaude 
    ? `# CLAUDE.md — Project Guide & Agent Instructions` 
    : isCursor 
    ? `# .cursorrules — AI Assistant Guidelines` 
    : isWindsurf 
    ? `# .windsurfrules — Windsurf Cascade Directives` 
    : isCopilot 
    ? `# GitHub Copilot Custom Instructions` 
    : `# AGENTS.md — AI Coding Agent Operating Directives`;

  const sections: string[] = [];

  // Header & Identity
  sections.push(`${titleHeader}
<!-- Generated via PRD Creator on ${new Date().toISOString().split('T')[0]} -->

## 1. Agent Persona & Working Identity
- **Project Name:** ${config.projectName || (prdConfig?.name ?? 'Application')}
- **Target Persona:** ${getPersonaTitle(config.rolePersona, config.customPersonaTitle)}
- **Tone & Communication:** ${getToneDescription(config.toneAndCommunication)}
- **Execution Workflow:** ${getWorkflowDescription(config.workflowApproach)}
`);

  // Core Boundaries & Approvals
  sections.push(`## 2. Decision Boundaries & Approval Thresholds
${config.approvals.requirePlanApproval ? `- **Plan First:** Always propose a concise technical plan before modifying or creating files. Wait for confirmation on non-trivial architecture changes.` : `- **Autonomous Execution:** Implement requested changes directly with clear verification.`}
${config.approvals.askBeforeNewDependencies ? `- **Dependencies:** NEVER run \`npm install <package>\` without user approval. Prioritize using already-installed libraries first.` : `- **Dependencies:** Install missing dependencies only when strictly necessary.`}
${config.approvals.askBeforeDatabaseMigrations ? `- **Database & Schemas:** Do NOT alter database migrations, table definitions, or drop tables without explicit approval.` : ''}
${config.approvals.askBeforeDestructiveDeletions ? `- **Destructive Actions:** Prohibited from deleting non-empty directories, git history, or existing configuration files without confirmation.` : ''}
${config.approvals.forbidSecretCommits ? `- **Secrets & Credentials:** NEVER hardcode API keys, tokens, or environment secrets into source code or test files. Use environment variables exclusively (\`.env.example\`).` : ''}
`);

  // Tech Stack & Environment
  const lang = config.techStack.primaryLanguage || (prdConfig?.frontendFramework ? 'TypeScript' : 'TypeScript');
  const frontend = config.techStack.frontendFramework || (prdConfig?.frontendFramework ?? 'React 19 + Vite');
  const styling = config.techStack.stylingSystem || (prdConfig?.stylingSystem ?? 'Tailwind CSS');
  const backend = config.techStack.backendFramework || (prdConfig?.backendFramework ?? 'Node.js Express / Server Routes');
  const database = config.techStack.database || (prdConfig?.database ?? 'PostgreSQL / Supabase');

  sections.push(`## 3. Technology Stack & Environment
- **Primary Language:** ${lang}
- **Frontend Framework:** ${frontend}
- **Styling Engine:** ${styling}
- **Backend / Runtime:** ${backend}
- **Database & Persistence:** ${database}
- **Package Manager:** ${config.techStack.packageManager} (Always use \`${config.techStack.packageManager}\` commands)
`);

  // Code Standards & Quality Rules
  sections.push(`## 4. Code Quality & Architectural Discipline
${config.codeQualityRules.strictTypeScript ? `- **Type Safety:** Enforce strict TypeScript. Never use \`any\`. Use explicit interface/type definitions and proper return types.` : ''}
${config.codeQualityRules.maxFileLines ? `- **File Sizing:** Avoid giant files. Keep modules and components under ~${config.codeQualityRules.maxFileLines} lines. Split logic into composable hooks, utilities, and child components.` : ''}
${config.codeQualityRules.enforceTailwindOnly ? `- **Styling Discipline:** Use Tailwind CSS exclusively. No arbitrary inline CSS or scattered .css files unless strictly required for third-party widgets.` : ''}
${config.codeQualityRules.antiSlopDesign ? `- **Anti-AI Slop:** Avoid generic AI aesthetic clichés (e.g., pill badges inside pill badges, code-comment headings like \`// 01 ARCHITECTURE\`, fake metric tickers, or broken contrast). Keep UI clean, polished, and purposeful.` : ''}
${config.codeQualityRules.handleLoadingAndErrors ? `- **State Completeness:** Every asynchronous action and data view must handle Loading (skeletons), Empty states, and Error messages gracefully.` : ''}
${config.codeQualityRules.modularComponents ? `- **Single Responsibility:** Separate presentation components from business logic / data fetching layers.` : ''}
`);

  // Verification & Testing Checklist
  sections.push(`## 5. Verification Commands & Definition of Done
Before concluding an implementation turn, you must verify the codebase:

\`\`\`bash
# 1. Type Check & Linting
${config.verification.lintCommand || 'npm run lint'}

# 2. Build Compilation
${config.verification.buildCommand || 'npm run build'}

${config.verification.testCommand ? `# 3. Automated Tests\n${config.verification.testCommand}` : ''}
\`\`\`

- [ ] All interactive buttons and handlers must be wired (zero dead clicks).
- [ ] No compilation or TypeScript errors.
- [ ] State changes survive user actions without unexpected unmounts.
- [ ] Report real verification results honestly (never claim checks passed if they were skipped).
`);

  // Custom User Directives
  if (config.customRules && config.customRules.length > 0) {
    sections.push(`## 6. Project-Specific Directives
${config.customRules.map((rule) => `- ${rule}`).join('\n')}
`);
  }

  // PRD Cross-Reference if available
  if (prdConfig) {
    sections.push(`## 7. Product Requirements Reference
- **Active PRD Document:** Refer to the accompanied PRD for full functional requirement IDs (\`FR-001\`, etc.), database schema details, and Given/When/Then acceptance criteria.
- **Scope Compliance:** Strictly respect the In-Scope features. Features flagged as Out-of-Scope in the PRD must NOT be implemented.
`);
  }

  return sections.join('\n');
}

function getPersonaTitle(persona: string, customTitle?: string): string {
  if (customTitle && customTitle.trim().length > 0) return customTitle;
  switch (persona) {
    case 'senior_fullstack':
      return 'Senior Full-Stack Software Engineer (Pragmatic, End-to-End focus)';
    case 'clean_architecture':
      return 'Clean Architecture & Code Quality Specialist (Modular, Highly Maintainable)';
    case 'rapid_prototyper':
      return 'Rapid MVP Prototyper (Speed-oriented, High velocity, Intuitive UX)';
    case 'security_first':
      return 'Security & Hardening Engineer (Defensive coding, Zero-trust, Strict validation)';
    case 'qa_testing':
      return 'Test & Reliability Architect (TDD, Edge-case coverage, Zero-defect)';
    default:
      return 'Autonomous Senior Software Engineer';
  }
}

function getToneDescription(tone: string): string {
  switch (tone) {
    case 'concise_code_first':
      return 'Concise, technical, and code-first. Minimize chat pleasantries and focus on direct implementation.';
    case 'collaborative_exploratory':
      return 'Collaborative and transparent. Explain trade-offs and options before making consequential decisions.';
    case 'strict_pedantic':
      return 'Strict and defensive. Explicitly verify assumptions, flag edge-cases, and enforce rigorous quality gates.';
    default:
      return 'Professional, helpful, and concise.';
  }
}

function getWorkflowDescription(workflow: string): string {
  switch (workflow) {
    case 'plan_first':
      return 'Plan First. Outline changes before touching code; write files in clean atomic edits.';
    case 'incremental_steps':
      return 'Incremental. Make small, focused changes per file and verify compilation after each step.';
    case 'test_driven':
      return 'Test-Driven. Define test cases / assertions first, then implement matching functionality.';
    case 'direct_execution':
      return 'Direct Execution. Implement end-to-end features swiftly with immediate build verification.';
    default:
      return 'Structured and incremental.';
  }
}
