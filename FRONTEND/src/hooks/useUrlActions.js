import { useState } from 'react';
import { useUrlContext } from '../store/UrlContext';
import { urlService } from '../services/url.service';

export const useUrlActions = () => {
  const { addUrl, setUserUrls } = useUrlContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async (url, slug) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await urlService.createShortUrl(url, slug);
      addUrl({ full_url: url, short_url: data.shortUrl, createdAt: new Date() });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyUrls = async () => {
    setIsLoading(true);
    try {
      const data = await urlService.getMyUrls();
      setUserUrls(data.urls);
      return data.urls;
    } catch (err) {
      setError(err.message);
} finally {
      setIsLoading(false);
    }
  };

  return { shortenUrl, fetchMyUrls, isLoading, error };
};