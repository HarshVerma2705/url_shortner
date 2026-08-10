const formatShortUrl = (shortUrl) => {
  if (!shortUrl) return '';
  if (shortUrl.startsWith('http://') || shortUrl.startsWith('https://')) {
    return shortUrl;
  }
  return `http://localhost:3000/${shortUrl}`;
};

export const UrlList = ({ urls }) => {
  if (!urls || !urls.length) return <p>No URLs yet.</p>;

  return (
    <div className="url-list">
      {urls.map((url) => {
        const fullShortUrl = formatShortUrl(url.short_url);
        const originalTarget = url.full_url?.startsWith('http') ? url.full_url : `http://${url.full_url}`;
        return (
          <div key={url._id || url.short_url} className="url-card">
            <p><strong>Short:</strong> <a href={fullShortUrl} target="_blank" rel="noreferrer">{fullShortUrl}</a></p>
            <p><strong>Original:</strong> <a href={originalTarget} target="_blank" rel="noreferrer">{url.full_url}</a></p>
            <p><strong>Clicks:</strong> {url.clicks || 0}</p>
          </div>
        );
      })}
    </div>
  );
};