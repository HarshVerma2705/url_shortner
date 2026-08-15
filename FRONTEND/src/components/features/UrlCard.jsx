import { useState } from 'react';
import { ExternalLink, Copy, Check, BarChart3, Trash2, Loader2 } from 'lucide-react';
import { useUrlActions } from '../../hooks/useUrlActions';

export const UrlCard = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteUrl } = useUrlActions();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!url._id || isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteUrl(url._id);
    } catch (err) {
      console.error('Failed to delete URL:', err);
      setIsDeleting(false);
    }
  };

  // Format date safely
  const formattedDate = (() => {
    if (!url.createdAt) return 'Recently';
    const d = new Date(url.createdAt);
    return isNaN(d.getTime()) ? 'Recently' : d.toLocaleDateString();
  })();

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300 overflow-hidden">
      <div className="flex items-start justify-between gap-4 min-w-0">
        <div className="flex-1 min-w-0 overflow-hidden">
          <a
            href={url.short_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-colors break-all"
          >
            {url.short_url.replace(/^https?:\/\//, '')}
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </a>
          {/* FIX: break-all prevents long URLs from overflowing */}
          <p className="mt-1 text-sm text-slate-500 break-all" title={url.full_url}>
            {url.full_url}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              copied
                ? 'bg-green-50 text-green-700'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          {url._id && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete link"
              className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-slate-500" /> : <Trash2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4" />
          <span>{url.clicks || 0} clicks</span>
        </div>
        <span>•</span>
        {/* FIX: Safe date formatting */}
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};