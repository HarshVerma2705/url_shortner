import { useState } from 'react';
import { Button } from '../ui/Button';
import { LinkIcon, Wand2 } from 'lucide-react';

export const UrlForm = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url, slug || undefined);
    setUrl('');
    setSlug('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-lg transition-all duration-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:outline-none"
        />
      </div>
      
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Custom slug (optional)"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:outline-none"
          />
        </div>
        <Button type="submit" isLoading={isLoading} className="px-8 py-3 text-lg">
          Shorten
        </Button>
      </div>
    </form>
  );
};