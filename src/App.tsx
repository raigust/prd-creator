import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Builder } from './components/Builder';
import { AgentBuilder } from './components/AgentBuilder';
import { PreviewPanel } from './components/PreviewPanel';
import { TemplatesModal } from './components/TemplatesModal';
import { ProjectConfiguration } from './types/prd';
import { AgentConfiguration } from './types/agent';
import { createDefaultProjectConfig } from './utils/defaults';
import { createDefaultAgentConfig } from './utils/defaultAgent';
import { validateProjectConfig } from './utils/validator';
import { ProjectTemplate } from './data/templates';
import { Eye, Sparkles, LayoutTemplate, RotateCcw, Bot, FileText, ArrowRight } from 'lucide-react';

const PRD_STORAGE_KEY = 'prd_studio_draft_v3';
const AGENT_STORAGE_KEY = 'agent_builder_config_v1';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder' | 'templates' | 'agents'>('landing');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewDefaultDoc, setPreviewDefaultDoc] = useState<'prd' | 'agent'>('prd');
  const [isSplitView, setIsSplitView] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('Tersimpan di browser');

  // PRD Draft state with local persistence
  const [config, setConfig] = useState<ProjectConfiguration>(() => {
    try {
      const saved = localStorage.getItem(PRD_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load PRD draft from localStorage', e);
    }
    return createDefaultProjectConfig();
  });

  // Agent Config state with local persistence
  const [agentConfig, setAgentConfig] = useState<AgentConfiguration>(() => {
    try {
      const saved = localStorage.getItem(AGENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load agent config from localStorage', e);
    }
    return createDefaultAgentConfig();
  });

  // Autosave PRD
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(PRD_STORAGE_KEY, JSON.stringify(config));
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setSaveStatus(`Tersimpan otomatis · ${timeStr}`);
      } catch (e) {
        console.error('Failed to save PRD to localStorage', e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [config]);

  // Autosave Agent Config
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agentConfig));
      } catch (e) {
        console.error('Failed to save agent config to localStorage', e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [agentConfig]);

  // Validation for PRD
  const validationIssues = useMemo(() => {
    return validateProjectConfig(config);
  }, [config]);

  const handleSelectTemplate = (template: ProjectTemplate) => {
    const fresh = createDefaultProjectConfig();
    const merged: ProjectConfiguration = {
      ...fresh,
      ...template.config,
      id: 'proj-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as ProjectConfiguration;

    setConfig(merged);
    
    // Also sync agent config project name & stack
    setAgentConfig((prev) => ({
      ...prev,
      projectName: merged.name,
      techStack: {
        ...prev.techStack,
        frontendFramework: merged.frontendFramework || prev.techStack.frontendFramework,
        stylingSystem: merged.stylingSystem || prev.techStack.stylingSystem,
        backendFramework: merged.backendFramework || prev.techStack.backendFramework,
        database: merged.database || prev.techStack.database
      }
    }));

    setCurrentView('builder');
  };

  const handleStartNew = () => {
    setCurrentView('builder');
  };

  const handleOpenPreviewFor = (doc: 'prd' | 'agent') => {
    setPreviewDefaultDoc(doc);
    setIsPreviewModalOpen(true);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan konfigurasi PRD ke setelan awal bawaan?')) {
      const fresh = createDefaultProjectConfig();
      setConfig(fresh);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#111827] font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'templates') {
            setIsTemplatesModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        onTogglePreviewDrawer={() => handleOpenPreviewFor(currentView === 'agents' ? 'agent' : 'prd')}
        previewCount={config.selectedFeatures?.length || 0}
      />

      {/* Main View */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onStartNew={handleStartNew}
            onOpenAgentBuilder={() => setCurrentView('agents')}
            onSelectTemplate={handleSelectTemplate}
            onExploreTemplates={() => setIsTemplatesModalOpen(true)}
          />
        )}

        {currentView === 'builder' && (
          <div className="flex-1 flex flex-col w-full py-4 px-2 sm:px-6">
            {/* Top Toolbar in Builder with mode switcher pill */}
            <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mb-3">
              <div className="flex items-center gap-2">
                {/* Mode segmented toggle */}
                <div className="inline-flex items-center p-0.5 bg-gray-200/80 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setCurrentView('builder')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-indigo-700 shadow-2xs font-bold"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>PRD</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('agents')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5 text-purple-600" />
                    <span>AGENTS.md</span>
                  </button>
                </div>

                <span className="font-bold text-sm text-gray-900 truncate max-w-[160px] sm:max-w-xs">
                  {config.name || 'Proyek Tanpa Judul'}
                </span>
                <span className="text-[11px] font-mono text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full hidden md:inline shadow-2xs">
                  {config.complexity.toUpperCase()}
                </span>
                <span className="text-gray-300 hidden sm:inline">·</span>
                <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
                  {saveStatus}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsSplitView(!isSplitView)}
                  className={`hidden xl:inline-flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    isSplitView
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{isSplitView ? 'Kartu Tunggal' : 'Bagi Layar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenPreviewFor('prd')}
                  className="inline-flex items-center gap-1.5 px-3.5 h-8 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat PRD</span>
                </button>
              </div>
            </div>

            {/* Content Area: Single Centered Card or Split View */}
            {isSplitView ? (
              <div className="grid grid-cols-12 gap-5 max-w-[1600px] mx-auto w-full flex-1">
                <div className="col-span-12 xl:col-span-6">
                  <Builder
                    config={config}
                    onChange={setConfig}
                    issues={validationIssues}
                    onOpenTemplates={() => setIsTemplatesModalOpen(true)}
                    onOpenPreview={() => handleOpenPreviewFor('prd')}
                    onReset={handleResetToDefault}
                  />
                </div>
                <div className="col-span-12 xl:col-span-6 h-[85vh] sticky top-20">
                  <PreviewPanel
                    config={config}
                    agentConfig={agentConfig}
                    issues={validationIssues}
                    defaultDoc="prd"
                  />
                </div>
              </div>
            ) : (
              <Builder
                config={config}
                onChange={setConfig}
                issues={validationIssues}
                onOpenTemplates={() => setIsTemplatesModalOpen(true)}
                onOpenPreview={() => handleOpenPreviewFor('prd')}
                onReset={handleResetToDefault}
              />
            )}
          </div>
        )}

        {currentView === 'agents' && (
          <div className="flex-1 flex flex-col w-full py-4 px-2 sm:px-6">
            {/* Top Toolbar in AGENTS.md Builder */}
            <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 mb-3">
              <div className="flex items-center gap-2">
                {/* Mode segmented toggle */}
                <div className="inline-flex items-center p-0.5 bg-gray-200/80 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setCurrentView('builder')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>PRD</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('agents')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-purple-700 shadow-2xs font-bold"
                  >
                    <Bot className="w-3.5 h-3.5 text-purple-600" />
                    <span>AGENTS.md</span>
                  </button>
                </div>

                <span className="font-bold text-sm text-gray-900 truncate max-w-[160px] sm:max-w-xs">
                  {agentConfig.projectName || config.name || 'Proyek Tanpa Judul'}
                </span>
                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full hidden md:inline font-semibold">
                  {agentConfig.targetFormat.toUpperCase().replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsSplitView(!isSplitView)}
                  className={`hidden xl:inline-flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    isSplitView
                      ? 'bg-purple-50 border-purple-200 text-purple-700'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{isSplitView ? 'Kartu Tunggal' : 'Bagi Layar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenPreviewFor('agent')}
                  className="inline-flex items-center gap-1.5 px-3.5 h-8 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat AGENTS.md</span>
                </button>
              </div>
            </div>

            {/* Content Area: Single Centered Card or Split View */}
            {isSplitView ? (
              <div className="grid grid-cols-12 gap-5 max-w-[1600px] mx-auto w-full flex-1">
                <div className="col-span-12 xl:col-span-6">
                  <AgentBuilder
                    config={agentConfig}
                    onChange={setAgentConfig}
                    prdConfig={config}
                    onOpenPreview={() => handleOpenPreviewFor('agent')}
                  />
                </div>
                <div className="col-span-12 xl:col-span-6 h-[85vh] sticky top-20">
                  <PreviewPanel
                    config={config}
                    agentConfig={agentConfig}
                    issues={validationIssues}
                    defaultDoc="agent"
                  />
                </div>
              </div>
            ) : (
              <AgentBuilder
                config={agentConfig}
                onChange={setAgentConfig}
                prdConfig={config}
                onOpenPreview={() => handleOpenPreviewFor('agent')}
              />
            )}
          </div>
        )}
      </main>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Live Preview Modal Drawer (Supports PRD & AGENTS.md) */}
      {isPreviewModalOpen && (
        <PreviewPanel
          config={config}
          agentConfig={agentConfig}
          issues={validationIssues}
          isModal={true}
          defaultDoc={previewDefaultDoc}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  );
}
