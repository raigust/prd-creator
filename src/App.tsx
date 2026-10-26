import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Builder } from './components/Builder';
import { PreviewPanel } from './components/PreviewPanel';
import { TemplatesModal } from './components/TemplatesModal';
import { ProjectConfiguration } from './types/prd';
import { createDefaultProjectConfig } from './utils/defaults';
import { validateProjectConfig } from './utils/validator';
import { ProjectTemplate } from './data/templates';
import { Eye, Sparkles, LayoutTemplate, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'prd_studio_draft_v3';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder' | 'templates'>('landing');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('Tersimpan di browser');

  // Draft state with local persistence
  const [config, setConfig] = useState<ProjectConfiguration>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load draft from localStorage', e);
    }
    return createDefaultProjectConfig();
  });

  // Autosave
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setSaveStatus(`Tersimpan otomatis · ${timeStr}`);
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [config]);

  // Validation
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
    setCurrentView('builder');
  };

  const handleStartNew = () => {
    setCurrentView('builder');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan konfigurasi ke setelan awal bawaan?')) {
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
        onTogglePreviewDrawer={() => setIsPreviewModalOpen(true)}
        previewCount={config.selectedFeatures?.length || 0}
      />

      {/* Main View */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onStartNew={handleStartNew}
            onSelectTemplate={handleSelectTemplate}
            onExploreTemplates={() => setIsTemplatesModalOpen(true)}
          />
        )}

        {currentView === 'builder' && (
          <div className="flex-1 flex flex-col w-full py-4 px-2 sm:px-6">
            {/* Top Toolbar in Builder */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gray-900 truncate max-w-[200px] sm:max-w-md">
                  {config.name || 'Proyek Tanpa Judul'}
                </span>
                <span className="text-[11px] font-mono text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full hidden sm:inline shadow-2xs">
                  {config.complexity.toUpperCase()}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-[11px] font-mono text-gray-400">
                  {saveStatus}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSplitView(!isSplitView)}
                  className={`hidden xl:inline-flex items-center gap-1.5 px-3 h-8 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    isSplitView
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{isSplitView ? 'Mode Kartu Tunggal' : 'Bagi Layar (Split View)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
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
                    onOpenPreview={() => setIsPreviewModalOpen(true)}
                    onReset={handleResetToDefault}
                  />
                </div>
                <div className="col-span-12 xl:col-span-6 h-[85vh] sticky top-20">
                  <PreviewPanel
                    config={config}
                    issues={validationIssues}
                  />
                </div>
              </div>
            ) : (
              <Builder
                config={config}
                onChange={setConfig}
                issues={validationIssues}
                onOpenTemplates={() => setIsTemplatesModalOpen(true)}
                onOpenPreview={() => setIsPreviewModalOpen(true)}
                onReset={handleResetToDefault}
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

      {/* Live PRD Preview Modal Drawer */}
      {isPreviewModalOpen && (
        <PreviewPanel
          config={config}
          issues={validationIssues}
          isModal={true}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  );
}
