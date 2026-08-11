import { UrlCard } from './UrlCard';
import { Link2 } from 'lucide-react';

export const UrlList = ({ urls }) => {
  if (!urls?.length) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Link2 className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">No URLs yet</h3>
        <p className="text-slate-500 mt-1">Shorten your first link above</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 animate-fade-in">
      {urls.map((url, index) => (
        <div key={url._id || url.short_url || index} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
          <UrlCard url={url} />
        </div>
      ))}
    </div>
  );
};