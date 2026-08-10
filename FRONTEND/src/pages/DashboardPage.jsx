import { useEffect } from 'react';
import { UrlList } from '../components/features/UrlList';
import { useUrlActions } from '../hooks/useUrlActions';
import { useUrlContext } from '../store/UrlContext';

export const DashboardPage = () => {
  const { fetchMyUrls, isLoading } = useUrlActions();
  const { urls } = useUrlContext();

  useEffect(() => {
    fetchMyUrls();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>My URLs</h2>
      {isLoading ? <p>Loading...</p> : <UrlList urls={urls} />}
    </div>
  );
};