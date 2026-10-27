import React, { useState } from 'react';
import { 
  AgentConfiguration, 
  AgentTargetFormat, 
  AgentRolePersona 
} from '../types/agent';
import { ProjectConfiguration } from '../types/prd';
import { 
  Bot, 
  ShieldCheck, 
  Sliders, 
  Code2, 
  Terminal, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Eye, 
  Copy, 
  Download, 
  RefreshCw,
  Lock,
  Layers,
  Cpu,
  FileCode,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { generateAgentMarkdown } from '../utils/agentMdGenerator';

interface AgentBuilderProps {
  config: AgentConfiguration;
  onChange: (newConfig: AgentConfiguration) => void;
  prdConfig?: ProjectConfiguration;
  onOpenPreview: () => void;
}

export const AgentBuilder: React.FC<AgentBuilderProps> = ({
  config,
  onChange,
  prdConfig,
  onOpenPreview
}) => {
  const [activeTab, setActiveTab] = useState<'persona' | 'boundaries' | 'standards' | 'directives'>('persona');
  const [copied, setCopied] = useState(false);

  const updateField = <K extends keyof AgentConfiguration>(
    key: K,
    value: AgentConfiguration[K]
  ) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  const syncWithPrd = () => {
    if (!prdConfig) return;
    onChange({
      ...config,
      projectName: prdConfig.name || config.projectName,
      techStack: {
        ...config.techStack,
        frontendFramework: prdConfig.frontendFramework || config.techStack.frontendFramework,
        stylingSystem: prdConfig.stylingSystem || config.techStack.stylingSystem,
        backendFramework: prdConfig.backendFramework || config.techStack.backendFramework,
        database: prdConfig.database || config.techStack.database
      }
    });
  };

  const addCustomRule = () => {
    onChange({
      ...config,
      customRules: [...config.customRules, '']
    });
  };

  const updateCustomRule = (index: number, val: string) => {
    const updated = [...config.customRules];
    updated[index] = val;
    onChange({
      ...config,
      customRules: updated
    });
  };

  const removeCustomRule = (index: number) => {
    onChange({
      ...config,
      customRules: config.customRules.filter((_, i) => i !== index)
    });
  };

  const handleCopy = async () => {
    const md = generateAgentMarkdown(config, prdConfig);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(md);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = md;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const md = generateAgentMarkdown(config, prdConfig);
    const filename = config.targetFormat === 'claude_md' 
      ? 'CLAUDE.md' 
      : config.targetFormat === 'cursor_rules' 
      ? '.cursorrules' 
      : config.targetFormat === 'windsurf_rules' 
      ? '.windsurfrules' 
      : config.targetFormat === 'copilot_instructions' 
      ? 'copilot-instructions.md' 
      : 'AGENTS.md';

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              AGENTS.MD CONFIGURATOR
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-500 font-medium">Instruksi AI Coding Agent</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Kustomisasi Aturan Agent
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Susun instruksi operasional agar Cursor, Claude Code, atau Windsurf bekerja sesuai standar Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {prdConfig && (
            <button
              type="button"
              onClick={syncWithPrd}
              className="inline-flex items-center gap-1.5 px-3 h-9 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="Sinkronkan nama proyek dan tech stack dari PRD yang sedang dibuka"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Sinkronkan PRD</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 h-9 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Unduh</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3.5 h-9 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-xs active:scale-98 text-white ${
              copied ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin AGENTS.md'}</span>
          </button>
        </div>
      </div>

      {/* Main Elevated Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-10 transition-all">
        {/* Navigation Tabs (Untitled UI pill style) */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl mb-8 overflow-x-auto scrollbar-none text-xs font-semibold">
          {[
            { id: 'persona', label: '1. Format & Peran', icon: Bot },
            { id: 'boundaries', label: '2. Batasan & Izin', icon: ShieldCheck },
            { id: 'standards', label: '3. Standar Kode', icon: Code2 },
            { id: 'directives', label: '4. Aturan Khusus', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-2xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Format & Peran */}
        {activeTab === 'persona' && (
          <div className="space-y-7">
            {/* Target File Format */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Pilih Format File Target
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'universal_agents_md', label: 'AGENTS.md', desc: 'Standar universal untuk Devin, Aider, Windsurf, & Agent CLI modern.' },
                  { id: 'claude_md', label: 'CLAUDE.md', desc: 'Format resmi untuk Anthropic Claude Code CLI.' },
                  { id: 'cursor_rules', label: '.cursorrules', desc: 'Format khusus untuk Cursor AI Editor.' },
                  { id: 'windsurf_rules', label: '.windsurfrules', desc: 'Format konfigurasi untuk Windsurf Cascade.' },
                  { id: 'copilot_instructions', label: 'copilot-instructions.md', desc: 'Format resmi untuk GitHub Copilot Chat.' }
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => updateField('targetFormat', fmt.id as AgentTargetFormat)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      config.targetFormat === fmt.id
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-xs text-gray-900">{fmt.label}</span>
                        {config.targetFormat === fmt.id && <Check className="w-3.5 h-3.5 text-indigo-600 font-bold" />}
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-normal">{fmt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Persona Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Persona & Karakter Rekayasa Agent
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'senior_fullstack',
                    name: 'Senior Full-Stack Engineer',
                    desc: 'Pragmatis, fokus solusi menyeluruh end-to-end, menulis kode bersih dan minim bug.'
                  },
                  {
                    id: 'clean_architecture',
                    name: 'Clean Code & Architecture Specialist',
                    desc: 'Sangat disiplin pada modularitas, pemisahan layer, penamaan konsisten, dan refactoring.'
                  },
                  {
                    id: 'rapid_prototyper',
                    name: 'Rapid MVP Prototyper',
                    desc: 'Kecepatan tinggi, langsung mengimplementasikan fitur inti dengan UX modern dan instan.'
                  },
                  {
                    id: 'security_first',
                    name: 'Security & Hardening Engineer',
                    desc: 'Fokus defensif: sanitasi input ketat, validasi otorisasi data, zero-trust mindset.'
                  },
                  {
                    id: 'qa_testing',
                    name: 'Test & Reliability Architect',
                    desc: 'Menekankan cakupan pengujian, penanganan edge-case, dan verifikasi build sebelum selesai.'
                  }
                ].map((persona) => {
                  const isSelected = config.rolePersona === persona.id;
                  return (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={() => updateField('rolePersona', persona.id as AgentRolePersona)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-gray-900">{persona.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 font-bold" />}
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{persona.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tone & Communication */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Gaya Komunikasi & Respons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'concise_code_first',
                    title: 'Concise & Code-First',
                    desc: 'Tanpa basa-basi atau sapaan panjang. Langsung fokus ke eksekusi kode dan perubahan file.'
                  },
                  {
                    id: 'collaborative_exploratory',
                    title: 'Collaborative & Exploratory',
                    desc: 'Menjelaskan opsi arsitektur dan trade-offs sebelum membuat keputusan besar.'
                  },
                  {
                    id: 'strict_pedantic',
                    title: 'Strict & Defensive',
                    desc: 'Sangat teliti, memverifikasi asumsi, dan memperingatkan potensi resiko sistem.'
                  }
                ].map((tone) => (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => updateField('toneAndCommunication', tone.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      config.toneAndCommunication === tone.id
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="font-bold text-xs text-gray-900 block mb-1">{tone.title}</span>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{tone.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Batasan & Izin (Approval Boundaries - with toggles like screenshot) */}
        {activeTab === 'boundaries' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                Batasan Izin & Konfirmasi Pengguna
              </h3>
              <p className="text-xs text-gray-500">
                Atur tindakan sensitif apa saja yang mewajibkan AI coding agent meminta persetujuan manusia.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: 'requirePlanApproval',
                  title: 'Wajib Minta Persetujuan Rencana (Plan First)',
                  desc: 'Agent harus menyajikan rencana langkah demi langkah dan menunggu konfirmasi sebelum mengedit kode.'
                },
                {
                  key: 'askBeforeNewDependencies',
                  title: 'Konfirmasi Sebelum Menambah Library Baru (npm install)',
                  desc: 'Agent dilarang menginstal package npm baru tanpa persetujuan pengguna; wajib memanfaatkan library yang sudah ada.'
                },
                {
                  key: 'askBeforeDatabaseMigrations',
                  title: 'Proteksi Perubahan Skema Basis Data (Database Migrations)',
                  desc: 'Agent tidak boleh mengubah skema tabel, menghapus kolom, atau menjalankan migrasi destruktif tanpa konfirmasi.'
                },
                {
                  key: 'askBeforeDestructiveDeletions',
                  title: 'Cegah Penghapusan File & Direktori Destruktif',
                  desc: 'Agent dilarang menghapus file non-kosong atau mengubah riwayat git tanpa izin eksplisit.'
                },
                {
                  key: 'forbidSecretCommits',
                  title: 'Larangan Keras Menyimpan Kredensial & API Key',
                  desc: 'Agent dilarang memasukkan rahasia API key langsung ke file kode sumber; wajib gunakan file .env.'
                }
              ].map((item) => {
                const isChecked = config.approvals[item.key as keyof typeof config.approvals];
                return (
                  <div
                    key={item.key}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      isChecked ? 'border-indigo-600 bg-indigo-50/20' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Toggle switch (matching image_b4d2f734.png style) */}
                    <button
                      type="button"
                      onClick={() => {
                        updateField('approvals', {
                          ...config.approvals,
                          [item.key]: !isChecked
                        });
                      }}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                        isChecked ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Standar Kode & Kualitas */}
        {activeTab === 'standards' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                Disiplin Arsitektur & Aturan Kode
              </h3>
              <p className="text-xs text-gray-500">
                Instruksikan agent untuk mematuhi konvensi arsitektur proyek dan standar anti-slop.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  key: 'strictTypeScript',
                  title: 'Strict TypeScript (No any)',
                  desc: 'Wajib type definition eksplisit untuk props, API response, dan return types.'
                },
                {
                  key: 'enforceTailwindOnly',
                  title: 'Tailwind CSS Eksklusif',
                  desc: 'Dilarang menulis CSS inline berantakan atau file style terpisah; gunakan class Tailwind.'
                },
                {
                  key: 'antiSlopDesign',
                  title: 'Anti-AI Slop Design Discipline',
                  desc: 'Hindari badge pill berlebih di dalam badge, komentar kode palsu // ARCHITECTURE, dan kontras buruk.'
                },
                {
                  key: 'handleLoadingAndErrors',
                  title: 'Wajib Tangani Loading, Empty & Error',
                  desc: 'Setiap komponen async harus memiliki visual skeleton loading dan pesan error informatif.'
                },
                {
                  key: 'modularComponents',
                  title: 'Pemisahan Komponen Modular',
                  desc: 'Pisahkan komponen presentasi visual dari logic state management dan pemanggilan fetch API.'
                }
              ].map((rule) => {
                const isChecked = config.codeQualityRules[rule.key as keyof typeof config.codeQualityRules];
                return (
                  <div
                    key={rule.key}
                    className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isChecked ? 'border-indigo-600 bg-indigo-50/20' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{rule.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{rule.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        updateField('codeQualityRules', {
                          ...config.codeQualityRules,
                          [rule.key]: !isChecked
                        });
                      }}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 mt-0.5 ${
                        isChecked ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                          isChecked ? 'translate-x-4.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Max file lines */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Batas Maksimal Baris File</h4>
                <p className="text-[11px] text-gray-500">Mencegah AI membuat file raksasa yang sulit dimaintain.</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={100}
                  max={600}
                  step={50}
                  value={config.codeQualityRules.maxFileLines}
                  onChange={(e) => {
                    updateField('codeQualityRules', {
                      ...config.codeQualityRules,
                      maxFileLines: parseInt(e.target.value) || 250
                    });
                  }}
                  className="w-24 h-9 px-3 text-xs bg-white border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none font-mono font-bold text-center"
                />
                <span className="text-xs text-gray-500 font-mono">baris/file</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Perintah Verifikasi & Custom Rules */}
        {activeTab === 'directives' && (
          <div className="space-y-6">
            {/* Commands */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Perintah Verifikasi Otomatis (Definition of Done)
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Agent diwajibkan menjalankan perintah ini sebelum menyatakan perubahan selesai.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-500 mb-1">Perintah Build:</label>
                  <input
                    type="text"
                    value={config.verification.buildCommand}
                    onChange={(e) => {
                      updateField('verification', {
                        ...config.verification,
                        buildCommand: e.target.value
                      });
                    }}
                    placeholder="npm run build"
                    className="w-full h-9 px-3 text-xs bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-500 mb-1">Perintah Lint / Type Check:</label>
                  <input
                    type="text"
                    value={config.verification.lintCommand}
                    onChange={(e) => {
                      updateField('verification', {
                        ...config.verification,
                        lintCommand: e.target.value
                      });
                    }}
                    placeholder="npm run lint"
                    className="w-full h-9 px-3 text-xs bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Custom Rules List */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Aturan Khusus Proyek Tambahan (Custom Directives)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Instruksi bebas yang ingin Anda tambahkan langsung ke file AGENTS.md.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addCustomRule}
                  className="px-3 h-8 text-xs font-semibold bg-indigo-600 text-white rounded-lg flex items-center gap-1.5 hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Aturan</span>
                </button>
              </div>

              <div className="space-y-2">
                {config.customRules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => updateCustomRule(idx, e.target.value)}
                      placeholder="Misal: Selalu gunakan komponen lucide-react untuk icon..."
                      className="flex-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomRule(idx)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Format: <strong>{config.targetFormat}</strong> ({config.rolePersona})</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenPreview}
              className="flex-1 sm:flex-none px-4 h-10 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>Lihat Preview</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-none px-5 h-10 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Tersalin!' : 'Salin File'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
