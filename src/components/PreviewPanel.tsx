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
  Sparkles,
  Bot,
  FolderArchive
} from 'lucide-react';
import { marked } from 'marked';
import { ProjectConfiguration, ValidationIssue } from '../types/prd';
import { AgentConfiguration } from '../types/agent';
import { generateMarkdownPRD } from '../utils/markdownGenerator';
import { generateAgentMarkdown } from '../utils/agentMdGenerator';

interface PreviewPanelProps {
  config: ProjectConfiguration;
  agentConfig?: AgentConfiguration;
  issues: ValidationIssue[];
  onClose?: () => void;
  isModal?: boolean;
  defaultDoc?: 'prd' | 'agent';
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  config,
  agentConfig,
  issues,
  onClose,
  isModal = false,
  defaultDoc = 'prd'
}) => {
  const [selectedDoc, setSelectedDoc] = useState<'prd' | 'agent'>(defaultDoc);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);
  const [manualPrdMarkdown, setManualPrdMarkdown] = useState<string | null>(null);
  const [manualAgentMarkdown, setManualAgentMarkdown] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(false);

  // Auto-generate PRD
  const generatedPrd = useMemo(() => {
    return generateMarkdownPRD(config);
  }, [config]);

  // Auto-generate AGENTS.md
  const generatedAgent = useMemo(() => {
    if (!agentConfig) return '';
    return generateAgentMarkdown(agentConfig, config);
  }, [agentConfig, config]);

  const activeMarkdown = selectedDoc === 'prd'
    ? (manualPrdMarkdown !== null ? manualPrdMarkdown : generatedPrd)
    : (manualAgentMarkdown !== null ? manualAgentMarkdown : generatedAgent);

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

  const handleDownloadActive = () => {
    let filename = '';
    if (selectedDoc === 'prd') {
      filename = `${(config.name || 'Proyek').replace(/[^a-zA-Z0-9_-]/g, '_')}_PRD.md`;
    } else {
      filename = agentConfig?.targetFormat === 'claude_md' 
        ? 'CLAUDE.md' 
        : agentConfig?.targetFormat === 'cursor_rules' 
        ? '.cursorrules' 
        : agentConfig?.targetFormat === 'windsurf_rules' 
        ? '.windsurfrules' 
        : agentConfig?.targetFormat === 'copilot_instructions' 
        ? 'copilot-instructions.md' 
        : 'AGENTS.md';
    }

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

  const handleDownloadBoth = () => {
    // Download PRD
    const prdFilename = `${(config.name || 'Proyek').replace(/[^a-zA-Z0-9_-]/g, '_')}_PRD.md`;
    const prdBlob = new Blob([manualPrdMarkdown !== null ? manualPrdMarkdown : generatedPrd], { type: 'text/markdown;charset=utf-8' });
    const prdUrl = URL.createObjectURL(prdBlob);
    const prdLink = document.createElement('a');
    prdLink.href = prdUrl;
    prdLink.download = prdFilename;
    document.body.appendChild(prdLink);
    prdLink.click();
    document.body.removeChild(prdLink);
    URL.revokeObjectURL(prdUrl);

    // Download AGENTS.md
    if (agentConfig) {
      const agentFilename = agentConfig.targetFormat === 'claude_md' 
        ? 'CLAUDE.md' 
        : agentConfig.targetFormat === 'cursor_rules' 
        ? '.cursorrules' 
        : agentConfig.targetFormat === 'windsurf_rules' 
        ? '.windsurfrules' 
        : agentConfig.targetFormat === 'copilot_instructions' 
        ? 'copilot-instructions.md' 
        : 'AGENTS.md';

      setTimeout(() => {
        const agentBlob = new Blob([manualAgentMarkdown !== null ? manualAgentMarkdown : generatedAgent], { type: 'text/markdown;charset=utf-8' });
        const agentUrl = URL.createObjectURL(agentBlob);
        const agentLink = document.createElement('a');
        agentLink.href = agentUrl;
        agentLink.download = agentFilename;
        document.body.appendChild(agentLink);
        agentLink.click();
        document.body.removeChild(agentLink);
        URL.revokeObjectURL(agentUrl);
      }, 200);
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-gray-50/90 border-b border-gray-200 gap-3">
        {/* Document Selector & Render mode */}
        <div className="flex items-center gap-2">
          {/* Document Switcher: PRD vs AGENTS.md */}
          <div className="flex items-center p-0.5 bg-gray-200/70 rounded-lg text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedDoc('prd')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedDoc === 'prd'
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PRD.md</span>
            </button>

            {agentConfig && (
              <button
                type="button"
                onClick={() => setSelectedDoc('agent')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedDoc === 'agent'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AGENTS.md</span>
              </button>
            )}
          </div>

          <div className="h-4 w-px bg-gray-300 hidden sm:block" />

          {/* Render Mode: Preview vs Raw */}
          <div className="flex items-center p-0.5 bg-gray-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-white text-gray-900 shadow-2xs font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('raw')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeTab === 'raw'
                  ? 'bg-white text-gray-900 shadow-2xs font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Raw
            </button>
          </div>
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

          {agentConfig && (
            <button
              type="button"
              onClick={handleDownloadBoth}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 h-8 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="Unduh PRD.md dan AGENTS.md sekaligus"
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span>Unduh Bundle (PRD + Agent)</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownloadActive}
            className="inline-flex items-center gap-1.5 px-3 h-8 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Unduh {selectedDoc === 'prd' ? '.md' : 'Agent'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3.5 h-8 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-xs active:scale-98 text-white ${
              copied ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : `Salin ${selectedDoc === 'prd' ? 'PRD' : 'AGENTS.md'}`}</span>
          </button>

          {isModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {showToc && (
          <aside className="w-64 border-r border-gray-200 bg-gray-50/50 p-4 overflow-y-auto custom-scrollbar text-xs shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold block mb-3">
              Daftar Bagian ({selectedDoc.toUpperCase()})
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
              onChange={(e) => {
                if (selectedDoc === 'prd') {
                  setManualPrdMarkdown(e.target.value);
                } else {
                  setManualAgentMarkdown(e.target.value);
                }
              }}
              className="w-full h-[650px] p-4 font-mono text-xs text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-none resize-y leading-relaxed"
              placeholder="Markdown content..."
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
