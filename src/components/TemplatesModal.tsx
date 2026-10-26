import React from 'react';
import { X, ArrowRight, Check, Sparkles } from 'lucide-react';
import { PRESET_TEMPLATES, ProjectTemplate } from '../data/templates';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: ProjectTemplate) => void;
  activeTemplateId?: string;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  activeTemplateId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-gray-200 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">
                8 Arketipe Proyek
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mt-1">
              Pilih Cetak Biru Proyek Anda
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESET_TEMPLATES.map((tpl) => {
            const isSelected = activeTemplateId === tpl.id;
            return (
              <div
                key={tpl.id}
                className={`border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                  isSelected 
                    ? 'border-indigo-600 bg-indigo-50/20 ring-1 ring-indigo-500/20 shadow-xs' 
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                      {tpl.badge}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-bold">
                        <Check className="w-3 h-3" />
                        Aktif
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{tpl.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal mb-4 line-clamp-3">
                    {tpl.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectTemplate(tpl);
                    onClose();
                  }}
                  className={`w-full h-9 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Muat Ulang Template' : 'Gunakan Template Ini'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-gray-100 bg-gray-50/70 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>Memilih template akan mengisi otomatis konfigurasi awal yang dapat disesuaikan.</span>
          <button
            onClick={onClose}
            className="px-3 py-1 font-bold text-gray-800 hover:underline cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
