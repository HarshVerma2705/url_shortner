import { UrlForm } from '../components/features/UrlForm';
import { useUrlActions } from '../hooks/useUrlActions';
import { useUrlContext } from '../store/UrlContext';

export const HomePage = () => {
  const { shortenUrl, isLoading, error } = useUrlActions();
  const { recentUrl } = useUrlContext();

  return (
    <div className="home-page">
      <h1>URL Shortener</h1>
      <p>Paste your long URL and get a short one instantly.</p>
      
      <UrlForm onSubmit={shortenUrl} isLoading={isLoading} />
      
      {error && <p className="error">{error}</p>}
      
      {recentUrl && (
        <div className="result">
          <h3>Your Short URL:</h3>
          <a href={recentUrl.short_url} target="_blank">{recentUrl.short_url}</a>
        </div>
      )}
    </div>
  );
};