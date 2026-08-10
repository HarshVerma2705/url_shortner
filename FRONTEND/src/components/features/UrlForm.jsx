import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

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
    <form onSubmit={handleSubmit} className="url-form">
      <Input
        label="Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/very-long-url"
        required
      />
      <Input
        label="Custom Slug (optional)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="my-link"
      />
      <Button type="submit" isLoading={isLoading}>Shorten</Button>
    </form>
  );
};