import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Code2, 
  ChevronRight,
  Check,
  Globe,
  Sliders,
  Laptop,
  FileText,
  Terminal,
  Bot,
  Zap
} from 'lucide-react';
import { PRESET_TEMPLATES, ProjectTemplate } from '../data/templates';

interface LandingPageProps {
  onStartNew: () => void;
  onOpenAgentBuilder?: () => void;
  onSelectTemplate: (template: ProjectTemplate) => void;
  onExploreTemplates: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartNew,
  onOpenAgentBuilder,
  onSelectTemplate,
  onExploreTemplates
}) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111827] relative overflow-hidden bg-mesh-glow">
      {/* Hero: Compact, Catchy & Visual */}
      <section className="pt-10 sm:pt-14 pb-12 px-4 sm:px-8 max-w-6xl mx-auto text-center">
        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={onStartNew}
            className="w-full sm:w-auto px-7 h-12 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mulai Buat PRD Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenAgentBuilder && (
            <button
              onClick={onOpenAgentBuilder}
              className="w-full sm:w-auto px-6 h-12 text-sm font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>Konfigurasi AGENTS.md</span>
              <span className="text-[10px] bg-purple-200/70 text-purple-800 font-bold px-1.5 py-0.5 rounded-full">
                Baru
              </span>
            </button>
          )}

          <button
            onClick={onExploreTemplates}
            className="w-full sm:w-auto px-6 h-12 text-sm font-bold text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
          >
            <span>Pilih dari 8 Template</span>
          </button>
        </div>

        {/* Visual Workflow Illustration: [Ide Wizard] -> [Dokumen PRD] -> [Website Jadi] */}
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200/90 shadow-xl p-5 sm:p-8 text-left">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="text-xs font-mono text-gray-500 font-semibold ml-2">
                Alur Kerja: Ide Produk ➔ Dokumen PRD ➔ Website Siap Jadi
              </span>
            </div>
            <span className="text-[11px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Automated AI Pipeline
            </span>
          </div>

          {/* 3-Stage Connected Pipeline Illustration */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            {/* STAGE 1: Ide & Wizard Pilihan */}
            <div className="lg:col-span-3 bg-gray-50 rounded-2xl border border-gray-200 p-4 shadow-2xs hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-md font-mono">
                  1. Pilihan Ide
                </span>
                <Sliders className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-800 block">Tipe Aplikasi</span>
                    <span className="text-[10px] text-gray-400">SaaS / E-Commerce</span>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-indigo-200 bg-indigo-50/20 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-indigo-900 block">Fitur: Checkout & DB</span>
                    <span className="text-[10px] text-indigo-500">Prioritas P0 (Wajib)</span>
                  </div>
                  <span className="w-6 h-3.5 rounded-full bg-indigo-600 p-0.5 flex items-center justify-end">
                    <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-800 block">Hak Akses (RBAC)</span>
                    <span className="text-[10px] text-gray-400">Admin, User, Staf</span>
                  </div>
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
                </div>
              </div>
            </div>

            {/* CONNECTOR 1 */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center text-indigo-600">
              <div className="hidden lg:flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Generate</span>
                <div className="w-full h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-600 to-indigo-200 relative">
                  <ArrowRight className="w-4 h-4 text-indigo-600 absolute -right-2 -top-1.5" />
                </div>
              </div>
              <div className="lg:hidden flex justify-center py-1">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* STAGE 2: Dokumen PRD Markdown */}
            <div className="lg:col-span-3 bg-gray-950 text-gray-200 rounded-2xl border border-gray-800 p-4 shadow-md font-mono text-xs">
              <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  2. Dokumen PRD.md
                </span>
                <span className="text-[10px] text-gray-400">Siap AI Agent</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-gray-300">
                <div className="text-indigo-400 font-bold"># PRODUCT REQUIREMENTS</div>
                <div className="text-gray-400">## 1. Functional Requirements</div>
                <div className="text-emerald-400 pl-2">✓ [FR-001] Role-Based Access</div>
                <div className="text-emerald-400 pl-2">✓ [FR-002] Atomic DB Lock</div>
                <div className="text-gray-400">## 2. Acceptance Criteria</div>
                <div className="text-amber-300 pl-2">Given: Valid credentials</div>
                <div className="text-amber-300 pl-2">When: User submits form</div>
                <div className="text-amber-300 pl-2">Then: Store record & token</div>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
                <span>16 Bab Spesifikasi</span>
                <span className="text-emerald-400 font-bold">100% Valid ✓</span>
              </div>
            </div>

            {/* CONNECTOR 2 */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center text-indigo-600">
              <div className="hidden lg:flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Prompt AI</span>
                <div className="w-full h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-600 to-indigo-200 relative">
                  <ArrowRight className="w-4 h-4 text-indigo-600 absolute -right-2 -top-1.5" />
                </div>
              </div>
              <div className="lg:hidden flex justify-center py-1">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* STAGE 3: Website Jadi (Live Preview Web UI) */}
            <div className="lg:col-span-3 bg-white rounded-2xl border-2 border-indigo-600 p-3.5 shadow-lg relative">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-[11px] font-mono font-bold text-gray-800">3. Website Jadi!</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Mini Website Mockup UI */}
              <div className="space-y-2 bg-gray-50 rounded-xl p-2.5 border border-gray-100 text-left">
                {/* Mini Navbar */}
                <div className="h-5 bg-white rounded border border-gray-200 px-2 flex items-center justify-between text-[9px] font-bold text-gray-700">
                  <span>AppStore</span>
                  <span className="bg-indigo-600 text-white px-1.5 py-0.2 rounded text-[8px]">Login</span>
                </div>
                {/* Mini Hero */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded p-2 text-center">
                  <span className="text-[10px] font-extrabold block">Website Berfungsi Penuh</span>
                  <span className="text-[8px] opacity-80 block">Dibangun akurat tanpa revisi</span>
                </div>
                {/* Mini Metric Cards */}
                <div className="grid grid-cols-2 gap-1.5 text-[8px]">
                  <div className="bg-white p-1 rounded border border-gray-200 text-center">
                    <span className="text-gray-400 block">Total Pesanan</span>
                    <span className="font-bold text-gray-900">1,240</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-gray-200 text-center">
                    <span className="text-gray-400 block">Uptime</span>
                    <span className="font-bold text-emerald-600">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-center">
                <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  Akurat Sesuai Kebutuhan
                </span>
              </div>
            </div>
          </div>

          {/* Quick Explainer Strip at bottom of illustration */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>Pilih kebutuhan dengan klik & toggle</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Dapatkan file .md yang terstruktur</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span>Tempel ke Cursor / Claude Code untuk langsung jadi website</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Pre-built Template Presets */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Template Instan
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mt-0.5">
              8 Cetak Biru Proyek Siap Pakai
            </h2>
          </div>
          <button
            onClick={onExploreTemplates}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Template</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESET_TEMPLATES.slice(0, 4).map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block mb-3">
                  {tpl.badge}
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-5 font-normal">
                  {tpl.description}
                </p>
              </div>

              <button
                onClick={() => onSelectTemplate(tpl)}
                className="w-full h-9 text-xs font-bold text-gray-800 bg-gray-50 hover:bg-indigo-600 hover:text-white border border-gray-200 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Pakai Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">PRD Studio</span>
            <span>·</span>
            <span>Generator Dokumen PRD untuk AI Coding Agent</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onExploreTemplates} className="hover:text-black cursor-pointer">
              Templates
            </button>
            <button onClick={onStartNew} className="hover:text-black cursor-pointer font-semibold text-indigo-600">
              Mulai Wizard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
