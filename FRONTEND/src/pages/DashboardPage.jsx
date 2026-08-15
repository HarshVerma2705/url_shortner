import { useEffect } from 'react';
import { UrlList } from '../components/features/UrlList';
import { useUrlActions } from '../hooks/useUrlActions';
import { useUrlContext } from '../store/UrlContext';
import { LayoutDashboard, Link2, MousePointerClick } from 'lucide-react';

export const DashboardPage = () => {
  const { fetchMyUrls, isLoading } = useUrlActions();
  const { urls } = useUrlContext();

  useEffect(() => {
    fetchMyUrls();
  }, []);

  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-500">Manage and track all your shortened links</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <StatCard
            icon={<Link2 className="w-5 h-5 text-indigo-600" />}
            label="Total Links"
            value={urls.length}
          />
          <StatCard
            icon={<MousePointerClick className="w-5 h-5 text-emerald-600" />}
            label="Total Clicks"
            value={totalClicks}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-slate-400" />
              Your Links
            </h2>
            {isLoading && (
              <div className="w-5 h-5 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
            )}
          </div>
          <UrlList urls={urls} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-4">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
);