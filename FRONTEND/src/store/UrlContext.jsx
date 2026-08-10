import { createContext, useContext, useState } from 'react';

const UrlContext = createContext(null);

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [recentUrl, setRecentUrl] = useState(null);

  const addUrl = (url) => {
    setUrls((prev) => [url, ...prev]);
    setRecentUrl(url);
  };

  const setUserUrls = (urlList) => {
    setUrls(urlList);
  };

  return (
    <UrlContext.Provider value={{ urls, recentUrl, addUrl, setUserUrls }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => useContext(UrlContext);