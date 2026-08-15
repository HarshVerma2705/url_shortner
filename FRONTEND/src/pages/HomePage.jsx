import { useState } from 'react';
import { UrlForm } from '../components/features/UrlForm';
import { UrlList } from '../components/features/UrlList';
import { useUrlActions } from '../hooks/useUrlActions';
import { useUrlContext } from '../store/UrlContext';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { shortenUrl, isLoading, error } = useUrlActions();
  const { recentUrl, urls } = useUrlContext();
  const [showRecent, setShowRecent] = useState(true);

  const handleSubmit = async (url, slug) => {
    await shortenUrl(url, slug);
    setShowRecent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-sm text-slate-600 mb-8 shadow-sm">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Simple, fast, and free URL shortening</span>
        </div>
        
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Make your links<br />
          <span className="text-indigo-600">shorter & smarter</span>
        </h1>
        
        <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Transform long, messy URLs into clean, shareable links in seconds. 
          Track clicks and manage all your links in one place.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-4">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-2 border border-slate-100">
          <div className="p-6">
            <UrlForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm text-center animate-fade-in">
            {error}
          </div>
        )}

        {recentUrl && showRecent && (
          <div className="mt-6 animate-slide-up">
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
              <p className="text-sm font-medium text-indigo-900 mb-2">Your shortened link is ready</p>
              <div className="flex items-center gap-3">
                <a
                  href={recentUrl.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors"
                >
                  {recentUrl.short_url}
                </a>
                <ArrowRight className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
          </div>
        )}

        {urls.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Links</h2>
            <UrlList urls={urls.slice(0, 5)} />
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-amber-500" />}
            title="Lightning Fast"
            description="Generate short URLs instantly with our optimized backend infrastructure."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-emerald-500" />}
            title="Secure by Default"
            description="Your links are protected with secure authentication and encrypted cookies."
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-indigo-500" />}
            title="Track Everything"
            description="Monitor click counts and manage all your links from a personal dashboard."
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="bg-slate-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold">Ready to start?</h2>
          <p className="mt-4 text-slate-400 text-lg">
            Create an account to save your links and access them anytime.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            Create free account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-slate-500 leading-relaxed">{description}</p>
  </div>
);