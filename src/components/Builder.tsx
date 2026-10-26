import React, { useState, useMemo } from 'react';
import { 
  ProjectConfiguration, 
  ProjectType, 
  ProjectComplexity, 
  OutputLanguage, 
  FeaturePriority,
  ValidationIssue 
} from '../types/prd';
import { CATALOG_FEATURES, FEATURE_CATEGORIES } from '../data/featureCatalog';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Layers, 
  Shield, 
  Sparkles, 
  Sliders, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Calendar, 
  BarChart3, 
  Database, 
  Code2, 
  Search, 
  Plus, 
  Trash2, 
  RotateCcw,
  Layout,
  Lock,
  Users,
  Cpu,
  FileCheck2,
  Copy,
  Download
} from 'lucide-react';

interface BuilderProps {
  config: ProjectConfiguration;
  onChange: (newConfig: ProjectConfiguration) => void;
  issues: ValidationIssue[];
  onOpenTemplates: () => void;
  onOpenPreview: () => void;
  onReset: () => void;
}

// 5 Consolidated, Intuitive Stages to eliminate user fatigue
export const STAGES = [
  { id: 0, key: 'welcome', label: 'Fondasi', title: 'Informasi Dasar', subtitle: 'Tentukan nama proyek, tipe aplikasi, dan tingkat kompleksitas.' },
  { id: 1, key: 'scope', label: 'Ruang Lingkup', title: 'Tujuan & Batasan Scope', subtitle: 'Jelaskan masalah yang ingin diselesaikan dan apa yang termasuk dalam MVP.' },
  { id: 2, key: 'features', label: 'Fitur & Akses', title: 'Fitur & Hak Akses Pengguna', subtitle: 'Pilih fitur dari katalog dan tentukan apakah aplikasi butuh autentikasi.' },
  { id: 3, key: 'architecture', label: 'Teknologi', title: 'Stack & Arsitektur Sistem', subtitle: 'Pilih teknologi frontend, backend, database, dan struktur data.' },
  { id: 4, key: 'done', label: 'Siap AI', title: 'Kriteria Selesai & Ekspor AI', subtitle: 'Tinjau ringkasan dokumen dan instruksi untuk AI coding agent.' }
];

export const Builder: React.FC<BuilderProps> = ({
  config,
  onChange,
  issues,
  onOpenTemplates,
  onOpenPreview,
  onReset
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [featureSearch, setFeatureSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const updateField = <K extends keyof ProjectConfiguration>(
    key: K,
    value: ProjectConfiguration[K]
  ) => {
    onChange({
      ...config,
      [key]: value,
      updatedAt: new Date().toISOString()
    });
  };

  const isFeatureSelected = (id: string) => {
    return config.selectedFeatures.some((f) => f.id === id);
  };

  const toggleFeature = (feat: typeof CATALOG_FEATURES[0]) => {
    const exists = isFeatureSelected(feat.id);
    if (exists) {
      updateField(
        'selectedFeatures',
        config.selectedFeatures.filter((f) => f.id !== feat.id)
      );
    } else {
      updateField('selectedFeatures', [
        ...config.selectedFeatures,
        {
          id: feat.id,
          name: feat.name,
          category: feat.category,
          description: feat.plainExplanation,
          priority: feat.defaultPriority
        }
      ]);
    }
  };

  const updateFeaturePriority = (id: string, priority: FeaturePriority) => {
    updateField(
      'selectedFeatures',
      config.selectedFeatures.map((f) => (f.id === id ? { ...f, priority } : f))
    );
  };

  const filteredFeatures = useMemo(() => {
    return CATALOG_FEATURES.filter((feat) => {
      const matchCategory = selectedCategory === 'Semua' || feat.category === selectedCategory;
      const matchSearch =
        featureSearch === '' ||
        feat.name.toLowerCase().includes(featureSearch.toLowerCase()) ||
        feat.plainExplanation.toLowerCase().includes(featureSearch.toLowerCase()) ||
        feat.id.toLowerCase().includes(featureSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [featureSearch, selectedCategory]);

  const addArrayItem = (key: 'inScope' | 'outOfScope' | 'securityControls' | 'definitionOfDone') => {
    updateField(key, [...(config[key] || []), '']);
  };

  const updateArrayItem = (
    key: 'inScope' | 'outOfScope' | 'securityControls' | 'definitionOfDone',
    index: number,
    value: string
  ) => {
    const updated = [...(config[key] || [])];
    updated[index] = value;
    updateField(key, updated);
  };

  const removeArrayItem = (
    key: 'inScope' | 'outOfScope' | 'securityControls' | 'definitionOfDone',
    index: number
  ) => {
    updateField(
      key,
      config[key].filter((_, i) => i !== index)
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* 1. Stepper Navigation Header (matching image_b4d2f734.png) */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3 sm:gap-6">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < activeStage;
            const isActive = idx === activeStage;

            return (
              <React.Fragment key={stage.id}>
                <button
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all shadow-2xs ${
                      isCompleted
                        ? 'bg-indigo-600 text-white'
                        : isActive
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 font-bold'
                        : 'bg-white border-2 border-gray-200 text-gray-400 group-hover:border-gray-300'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-1.5 transition-colors whitespace-nowrap ${
                      isActive ? 'text-indigo-600 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {stage.label}
                  </span>
                </button>

                {/* Connection line between steps */}
                {idx < STAGES.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mb-5 transition-colors ${
                      idx < activeStage ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Centered Elevated Card (Matching Untitled UI / Framer style) */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-10 transition-all">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {STAGES[activeStage].title}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-normal">
            {STAGES[activeStage].subtitle}
          </p>
        </div>

        {/* STAGE 0: Fondasi & Identitas Proyek */}
        {activeStage === 0 && (
          <div className="space-y-7">
            {/* Project Name Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Nama Proyek / Aplikasi <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Misal: Acme Corp Workspace, TokoKriya, ClinicCare"
                className="w-full h-11 px-4 text-sm bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* Selectable Cards: Workspace / Project Complexity (like image_b4d2f734.png) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Tingkat Kompleksitas Spesifikasi
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'simple',
                    title: 'Simple',
                    icon: Layers,
                    desc: 'Untuk landing page, portofolio & situs ringkas. Tanpa konfigurasi database rumit.'
                  },
                  {
                    id: 'standard',
                    title: 'Standard',
                    icon: Sliders,
                    desc: 'Aplikasi multi-halaman dengan form input, CRUD data, dan autentikasi umum.'
                  },
                  {
                    id: 'advanced',
                    title: 'Advanced',
                    icon: Shield,
                    desc: 'SaaS multi-role, skema relasi database (1:N, N:M), REST API, dan audit trail.'
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = config.complexity === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => updateField('complexity', item.id as ProjectComplexity)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                            <Icon className="w-4 h-4" />
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-indigo-600 font-bold" />}
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selectable Cards: Tipe Aplikasi */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Tipe Aplikasi / Website
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'saas', label: 'SaaS Web App', icon: Layers },
                  { id: 'ecommerce', label: 'E-Commerce Store', icon: ShoppingCart },
                  { id: 'booking_app', label: 'Booking & Jadwal', icon: Calendar },
                  { id: 'admin_dashboard', label: 'Admin Dashboard', icon: BarChart3 },
                  { id: 'landing_page', label: 'Landing Page', icon: Globe },
                  { id: 'internal_mgmt', label: 'Sistem Internal', icon: Database },
                  { id: 'blog_cms', label: 'Blog / Headless CMS', icon: Code2 },
                  { id: 'portfolio', label: 'Portofolio Digital', icon: Sparkles }
                ].map((type) => {
                  const Icon = type.icon;
                  const isSelected = config.projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => updateField('projectType', type.id as ProjectType)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20 text-indigo-900 font-semibold'
                          : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                      <span className="text-xs truncate">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Ringkasan Solusi Produk <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={config.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Jelaskan dalam 1-3 kalimat fungsi utama aplikasi dan siapa yang menggunakannya..."
                className="w-full p-3.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 focus:outline-none transition-all placeholder:text-gray-400 font-normal leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* STAGE 1: Scope & Target */}
        {activeStage === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Masalah Utama yang Diselesaikan (Problem Statement)
              </label>
              <textarea
                rows={3}
                value={config.problemStatement}
                onChange={(e) => updateField('problemStatement', e.target.value)}
                placeholder="Apa kesulitan atau friksi utama yang dialami pengguna saat ini?"
                className="w-full p-3.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 focus:outline-none transition-all placeholder:text-gray-400 font-normal leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Hasil yang Diharapkan (Desired Outcome)
              </label>
              <textarea
                rows={2}
                value={config.desiredOutcome}
                onChange={(e) => updateField('desiredOutcome', e.target.value)}
                placeholder="Bagaimana kondisi ideal pengguna setelah aplikasi ini berjalan?"
                className="w-full p-3.5 text-sm bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100 focus:outline-none transition-all placeholder:text-gray-400 font-normal leading-relaxed"
              />
            </div>

            {/* In-Scope checklist */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Fitur Termasuk Dalam Lingkup (In-Scope MVP)
                  </h4>
                  <span className="text-xs text-gray-500">
                    Fitur esensial yang harus dibangun di rilis pertama.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addArrayItem('inScope')}
                  className="px-3 h-8 text-xs font-semibold bg-indigo-600 text-white rounded-lg flex items-center gap-1.5 hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {config.inScope.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('inScope', idx, e.target.value)}
                      placeholder="Misal: Otentikasi login email, Keranjang belanja..."
                      className="flex-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('inScope', idx)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Out-of-Scope checklist */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Tegas Di Luar Lingkup (Out-of-Scope)
                  </h4>
                  <span className="text-xs text-gray-500">
                    Instruksikan coding agent agar TIDAK membuat fitur ini.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addArrayItem('outOfScope')}
                  className="px-3 h-8 text-xs font-semibold bg-gray-900 text-white rounded-lg flex items-center gap-1.5 hover:bg-black transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {config.outOfScope.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('outOfScope', idx, e.target.value)}
                      placeholder="Misal: Aplikasi native iOS/Android, Pembayaran kripto..."
                      className="flex-1 h-9 px-3 text-xs bg-white border border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('outOfScope', idx)}
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

        {/* STAGE 2: Fitur & Hak Akses (Feature Selector & Permission Preset like image_b4d2f734.png) */}
        {activeStage === 2 && (
          <div className="space-y-7">
            {/* Permission Presets (Matching Screenshot) */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Hak Akses Akun & Presets Otorisasi
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => updateField('hasUserAccounts', true)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                    config.hasUserAccounts
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${config.hasUserAccounts ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Perlu Login & Role Matrix</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Mendukung Admin, Staf, Member, dan otorisasi data.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('hasUserAccounts', false)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                    !config.hasUserAccounts
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg ${!config.hasUserAccounts ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Publik Terbuka (Tanpa Akun)</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">Semua halaman dapat diakses tanpa login.</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Feature Catalog Selector (with toggles & status like Connect Integrations in screenshot) */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Katalog Fitur Produk ({config.selectedFeatures.length} Dipilih)
                  </h3>
                  <span className="text-xs text-gray-500">
                    Aktifkan modul yang Anda butuhkan dengan sakelar.
                  </span>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={featureSearch}
                    onChange={(e) => setFeatureSearch(e.target.value)}
                    placeholder="Cari fitur..."
                    className="w-full pl-8 pr-3 h-8 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Semua')}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === 'Semua'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Semua
                </button>
                {FEATURE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Feature Grid with Toggles (Matching screenshot style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto custom-scrollbar p-1">
                {filteredFeatures.map((feat) => {
                  const selected = isFeatureSelected(feat.id);
                  const currentFeat = config.selectedFeatures.find((f) => f.id === feat.id);

                  return (
                    <div
                      key={feat.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                        selected
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-2xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-gray-900">{feat.name}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {feat.plainExplanation}
                          </p>
                        </div>

                        {/* Toggle switch like screenshot */}
                        <button
                          type="button"
                          onClick={() => toggleFeature(feat)}
                          className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                            selected ? 'bg-indigo-600' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                              selected ? 'translate-x-4.5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                        <span className="font-mono text-gray-400">{feat.id}</span>
                        {selected && currentFeat ? (
                          <div className="flex items-center gap-1">
                            {(['P0', 'P1', 'P2'] as FeaturePriority[]).map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => updateFeaturePriority(feat.id, p)}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                                  currentFeat.priority === p
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-500 hover:text-black'
                                }`}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">Nonaktif</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: Teknologi & Arsitektur */}
        {activeStage === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Frontend Framework & UI
                </label>
                <input
                  type="text"
                  value={config.frontendFramework}
                  onChange={(e) => updateField('frontendFramework', e.target.value)}
                  placeholder="React 19 + TypeScript + Vite"
                  className="w-full h-10 px-3.5 text-xs bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Styling Engine
                </label>
                <input
                  type="text"
                  value={config.stylingSystem}
                  onChange={(e) => updateField('stylingSystem', e.target.value)}
                  placeholder="Tailwind CSS"
                  className="w-full h-10 px-3.5 text-xs bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Backend Runtime / API
                </label>
                <input
                  type="text"
                  value={config.backendFramework}
                  onChange={(e) => updateField('backendFramework', e.target.value)}
                  placeholder="Node.js Express / TSX"
                  className="w-full h-10 px-3.5 text-xs bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Penyimpanan Database
                </label>
                <input
                  type="text"
                  value={config.database}
                  onChange={(e) => updateField('database', e.target.value)}
                  placeholder="PostgreSQL / Supabase"
                  className="w-full h-10 px-3.5 text-xs bg-white border border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Quick Entity Table preview */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Entitas Database ({config.dataEntities.length} Tabel)
                </span>
                <span className="text-xs text-indigo-600 font-semibold font-mono">
                  Drizzle / Prisma Ready
                </span>
              </div>
              <div className="space-y-1.5">
                {config.dataEntities.map((ent) => (
                  <div key={ent.id} className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-gray-800">{ent.name}</span>
                    <span className="text-gray-500 text-[11px]">{ent.fields.length} kolom ({ent.purpose})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: Siap AI & Ekspor */}
        {activeStage === 4 && (
          <div className="space-y-6">
            {/* Target Agent Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Pilih Target Coding Agent
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'cursor', label: 'Cursor AI' },
                  { id: 'claude_code', label: 'Claude Code' },
                  { id: 'windsurf', label: 'Windsurf IDE' },
                  { id: 'generic', label: 'Generic Agent' }
                ].map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => updateField('agentPreset', agent.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer font-semibold text-xs ${
                      config.agentPreset === agent.id
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-1 ring-indigo-500/20'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {agent.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ready summary badge card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileCheck2 className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-sm text-gray-900">Spesifikasi PRD Telah Lengkap!</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dokumen PRD telah digenerate secara otomatis mencakup 16 bagian spesifikasi teknis, aturan bisnis, dan instruksi AI.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenPreview}
                className="px-5 h-10 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs flex items-center gap-2 shrink-0"
              >
                <span>Buka Pratinjau PRD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. Card Bottom Navigation (matching image_b4d2f734.png) */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
          {/* Left: Skip / Reset */}
          <button
            type="button"
            onClick={onOpenTemplates}
            className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors cursor-pointer"
          >
            Pilih Template Siap Pakai
          </button>

          {/* Right: Back & Continue buttons */}
          <div className="flex items-center gap-3">
            {activeStage > 0 && (
              <button
                type="button"
                onClick={() => setActiveStage(activeStage - 1)}
                className="px-4 h-10 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
            )}

            {activeStage < STAGES.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveStage(activeStage + 1)}
                className="px-5 h-10 text-xs font-semibold text-white bg-gray-900 hover:bg-black rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-xs active:scale-98"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenPreview}
                className="px-5 h-10 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-xs active:scale-98"
              >
                <span>Lihat & Salin PRD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
