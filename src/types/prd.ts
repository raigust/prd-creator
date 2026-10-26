export type ProjectType =
  | 'landing_page'
  | 'portfolio'
  | 'business_website'
  | 'blog_cms'
  | 'ecommerce'
  | 'admin_dashboard'
  | 'saas'
  | 'booking_app'
  | 'internal_mgmt'
  | 'marketplace'
  | 'api_backend'
  | 'custom';

export type ProjectComplexity = 'simple' | 'standard' | 'advanced';

export type OutputLanguage = 'id' | 'en';

export type FeaturePriority = 'P0' | 'P1' | 'P2' | 'Future';

export interface SuccessMetric {
  id: string;
  metric: string;
  target: string;
  status: 'confirmed' | 'suggested';
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  accessiblePages: string[];
  permissions: {
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    approve: boolean;
  };
  sensitiveActions: string[];
}

export interface SelectedFeature {
  id: string;
  name: string;
  category: string;
  description: string;
  priority: FeaturePriority;
  notes?: string;
}

export interface BusinessRule {
  id: string;
  name: string;
  condition: string;
  requiredBehavior: string;
  failureBehavior: string;
  relatedFeature?: string;
}

export interface UserFlow {
  id: string;
  name: string;
  actor: string;
  startingCondition: string;
  steps: string[];
  alternativePaths?: string;
  failureScenarios?: string;
  finalState: string;
}

export interface PageDefinition {
  id: string;
  name: string;
  route: string;
  purpose: string;
  accessibleRoles: string[];
  mainComponents: string[];
  hasLoadingState: boolean;
  hasEmptyState: boolean;
  hasErrorState: boolean;
}

export interface DataEntityField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'uuid' | 'text' | 'json' | 'relation';
  required: boolean;
  unique?: boolean;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  sensitive?: boolean;
  description?: string;
}

export interface DataEntityRelationship {
  targetEntity: string;
  type: '1:1' | '1:N' | 'N:M';
}

export interface DataEntity {
  id: string;
  name: string;
  purpose: string;
  fields: DataEntityField[];
  relationships: DataEntityRelationship[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  purpose: string;
  requiredAuth: boolean;
  allowedRoles: string[];
  requestBodySummary?: string;
  successResponseSummary?: string;
}

export interface ExternalIntegration {
  id: string;
  provider: string;
  purpose: string;
  required: boolean;
  envVars: string[];
}

export interface AcceptanceCriterion {
  id: string;
  featureName: string;
  given: string;
  when: string;
  then: string;
  alternativeOrError?: string;
}

export interface ProjectConfiguration {
  id: string;
  name: string;
  projectType: ProjectType;
  description: string;
  targetAudience: string;
  complexity: ProjectComplexity;
  outputLanguage: OutputLanguage;
  existingOrNew: 'new' | 'existing';
  designReferenceUrl?: string;
  additionalNotes?: string;

  // Goals & Scope
  problemStatement: string;
  desiredOutcome: string;
  primaryUserNeeds: string[];
  businessObjectives: string[];
  successMetrics: SuccessMetric[];
  inScope: string[];
  outOfScope: string[];
  knownConstraints: string[];
  assumptions: string[];
  openQuestions: string[];

  // Roles
  hasUserAccounts: boolean;
  roles: UserRole[];

  // Features
  selectedFeatures: SelectedFeature[];

  // Business Rules & Flows
  businessRules: BusinessRule[];
  userFlows: UserFlow[];

  // Pages & Navigation
  pages: PageDefinition[];
  navElements: {
    navbar: boolean;
    sidebar: boolean;
    footer: boolean;
    breadcrumbs: boolean;
    mobileNav: boolean;
  };

  // UI/UX & Design
  designPreset: string;
  themeMode: 'light' | 'dark' | 'dual';
  primaryColor: string;
  secondaryColor: string;
  typography: string;
  borderRadius: string;
  spacingDensity: 'compact' | 'normal' | 'generous';
  accessibilityRequirements: string[];

  // Tech Stack & Architecture
  frontendFramework: string;
  stylingSystem: string;
  backendFramework: string;
  database: string;
  orm: string;
  authProvider: string;
  apiStyle: string;
  deploymentPlatform: string;
  architectureStyle: string;

  // Data & API
  dataEntities: DataEntity[];
  apiEndpoints: ApiEndpoint[];

  // Integrations & Security
  integrations: ExternalIntegration[];
  securityControls: string[];
  nonFunctionalTargets: { category: string; target: string; condition?: string }[];

  // Testing & DoD
  testTypes: string[];
  acceptanceCriteria: AcceptanceCriterion[];
  definitionOfDone: string[];

  // AI Agent Instructions
  agentPreset: 'generic' | 'cursor' | 'claude_code' | 'windsurf' | 'codex';
  implementationWorkflow: 'plan_first' | 'incremental' | 'test_driven' | 'strict_approval';
  customAgentRules: string[];

  // Metadata
  createdAt: string;
  updatedAt: string;
  schemaVersion: string;
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  stepIndex: number;
}
