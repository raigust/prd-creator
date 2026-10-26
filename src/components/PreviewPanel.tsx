import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Code, 
  RotateCcw, 
  AlertTriangle, 
  ListTree, 
  X,
  Sparkles
} from 'lucide-react';
import { marked } from 'marked';
import { ProjectConfiguration, ValidationIssue } from '../types/prd';
import { generateMarkdownPRD } from '../utils/markdownGenerator';

interface PreviewPanelProps {
  config: ProjectConfiguration;
  issues: ValidationIssue[];
  onClose?: () => void;
  isModal?: boolean;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  issues,
  onClose,
  isModal = false
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);
  const [manualMarkdown, setManualMarkdown] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(false);

  const generatedMarkdown = useMemo(() => {
    return generateMarkdownPRD(config);
  }, [config]);

  const activeMarkdown = manualMarkdown !== null ? manualMarkdown : generatedMarkdown;

  const renderedHtml = useMemo(() => {
    return marked.parse(activeMarkdown, { async: false, breaks: true }) as string;
  }, [activeMarkdown]);

  const headings = useMemo(() => {
    const lines = activeMarkdown.split('\n');
    const list: { level: number; text: string; id: string }[] = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        list.push({ level, text, id });
      }
    });
    return list;
  }, [activeMarkdown]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(activeMarkdown);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = activeMarkdown;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const filename = `${(config.name || 'Proyek').replace(/[^a-zA-Z0-9_-]/g, '_')}_PRD.md`;
    const blob = new Blob([activeMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const content = (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50/80 border-b border-gray-200 gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-gray-200/60 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-white text-gray-900 shadow-2xs font-bold'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Dokumen PRD</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'raw'
                ? 'bg-white text-gray-900 shadow-2xs font-bold'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-indigo-600" />
            <span>Markdown Mentah</span>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowToc(!showToc)}
            className={`p-2 rounded-lg border border-gray-200 transition-colors cursor-pointer ${
              showToc ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            title="Daftar Isi"
          >
            <ListTree className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 h-9 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Unduh .md</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-4 h-9 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-xs active:scale-98 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin PRD'}</span>
          </button>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex overflow-hidden">
        {showToc && (
          <aside className="w-64 border-r border-gray-200 bg-gray-50/50 p-4 overflow-y-auto custom-scrollbar text-xs shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold block mb-3">
              Daftar Bagian PRD
            </span>
            <nav className="space-y-1">
              {headings.map((h, i) => (
                <a
                  key={i}
                  href={`#${h.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(h.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block truncate hover:text-indigo-600 transition-colors ${
                    h.level === 1
                      ? 'font-bold text-gray-900 pt-1'
                      : h.level === 2
                      ? 'text-gray-700 pl-2 font-medium'
                      : 'text-gray-500 pl-3.5 text-[11px]'
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </aside>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 bg-white">
          {activeTab === 'preview' ? (
            <div
              className="prose prose-slate max-w-none text-gray-700
                [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_h1]:border-b [&_h1]:border-gray-200 [&_h1]:pb-3 [&_h1]:mb-6 [&_h1]:tracking-tight
                [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-gray-100 [&_h2]:tracking-tight
                [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
                [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-gray-900 [&_h4]:mt-4 [&_h4]:mb-1
                [&_p]:text-xs [&_p]:sm:text-sm [&_p]:leading-relaxed [&_p]:text-gray-600 [&_p]:mb-3
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-xs [&_ul]:sm:text-sm [&_ul]:text-gray-600 [&_ul]:space-y-1.5 [&_ul]:mb-4
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-xs [&_ol]:sm:text-sm [&_ol]:text-gray-600 [&_ol]:space-y-1.5 [&_ol]:mb-4
                [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-200 [&_table]:text-xs [&_table]:my-4 [&_table]:rounded-xl [&_table]:overflow-hidden
                [&_th]:bg-gray-50 [&_th]:border [&_th]:border-gray-200 [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-bold [&_th]:text-gray-900
                [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-gray-700
                [&_blockquote]:border-l-3 [&_blockquote]:border-indigo-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:bg-indigo-50/40 [&_blockquote]:py-2 [&_blockquote]:my-3 [&_blockquote]:rounded-r-lg
                [&_code]:font-mono [&_code]:text-xs [&_code]:bg-gray-100 [&_code]:border [&_code]:border-gray-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-indigo-900
                [&_pre]:bg-gray-950 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre]:text-xs
                [&_hr]:border-gray-200 [&_hr]:my-8"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          ) : (
            <textarea
              value={activeMarkdown}
              onChange={(e) => setManualMarkdown(e.target.value)}
              className="w-full h-[650px] p-4 font-mono text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-none resize-y leading-relaxed"
              placeholder="Markdown PRD..."
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="w-full max-w-5xl h-[88vh]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
