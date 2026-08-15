import { useState } from 'react';
import { useUrlContext } from '../store/UrlContext';
import { urlService } from '../services/url.service';

export const useUrlActions = () => {
  const { addUrl, setUserUrls, removeUrl } = useUrlContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async (url, slug) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await urlService.createShortUrl(url, slug);
      const newUrlObj = {
        _id: data?._id || data?.url?._id,
        full_url: url,
        short_url: data?.shortUrl || data?.url?.short_url,
        clicks: 0,
        createdAt: new Date(),
      };
      addUrl(newUrlObj);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
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

  const deleteUrl = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await urlService.deleteUrl(id);
      removeUrl(id);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { shortenUrl, fetchMyUrls, deleteUrl, isLoading, error };
};