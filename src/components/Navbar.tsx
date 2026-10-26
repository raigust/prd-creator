import React from 'react';
import { Eye, LayoutTemplate, ArrowRight, Sparkles, FileText } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'builder' | 'templates';
  onNavigate: (view: 'landing' | 'builder' | 'templates') => void;
  onOpenTemplates: () => void;
  onTogglePreviewDrawer?: () => void;
  previewCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenTemplates,
  onTogglePreviewDrawer,
  previewCount = 0
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 h-16 transition-colors">
      <div className="max-w-[1240px] mx-auto h-full flex items-center justify-between gap-4">
        {/* Brand Mark (Double circle icon like Untitled UI + text) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-indigo-600/20 absolute -left-0.5 top-0.5" />
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold relative z-10 shadow-xs group-hover:scale-105 transition-transform">
                P
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-gray-900 tracking-tight whitespace-nowrap">
                PRD Creator
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                AI Ready
              </span>
            </div>
          </button>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button
            onClick={() => onNavigate('landing')}
            className={`hover:text-gray-900 transition-colors cursor-pointer py-1 ${
              currentView === 'landing' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => onNavigate('builder')}
            className={`hover:text-gray-900 transition-colors cursor-pointer py-1 ${
              currentView === 'builder' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Wizard Generator
          </button>
          <button
            onClick={onOpenTemplates}
            className="hover:text-gray-900 transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <span>8 Template</span>
            <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">Baru</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {currentView === 'builder' && onTogglePreviewDrawer && (
            <button
              onClick={onTogglePreviewDrawer}
              className="inline-flex items-center gap-1.5 px-3.5 h-9 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>Pratinjau PRD</span>
              {previewCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {previewCount}
                </span>
              )}
            </button>
          )}

          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('builder')}
              className="inline-flex items-center gap-2 px-4 h-9 text-xs font-semibold text-white bg-gray-900 hover:bg-black rounded-lg transition-all cursor-pointer shadow-xs active:scale-98 whitespace-nowrap"
            >
              <span>Mulai Buat PRD</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          ) : (
            <button
              onClick={onOpenTemplates}
              className="inline-flex items-center gap-1.5 px-3.5 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-all cursor-pointer whitespace-nowrap shadow-2xs"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Pilih Template</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
