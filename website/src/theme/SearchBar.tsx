import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Array<{id: string, title: string, path: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const location = useLocation();
  const allDocsData = useAllDocsData();

  // Get all documents for search
  const searchData = useMemo(() => {
    const docs: Array<{id: string, title: string, path: string}> = [];
    
    Object.values(allDocsData).forEach(pluginData => {
      Object.values(pluginData.versions).forEach(version => {
        Object.values(version.docs).forEach(doc => {
          docs.push({
            id: doc.id,
            title: doc.title || doc.id,
            path: doc.path
          });
        });
      });
    });
    
    return docs;
  }, [allDocsData]);

  // Simple search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    setResults(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && results.length > 0) {
      history.push(results[0].path);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleResultClick = (path: string) => {
    history.push(path);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    performSearch(query);
  }, [query, searchData]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="navbar__search" style={{ position: 'relative' }}>
      <form onSubmit={handleSearch}>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search scrapbook... (Ctrl+K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          style={{
            width: isOpen ? '250px' : '200px',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            background: 'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
            transition: 'width 0.2s ease',
            fontSize: '0.9rem'
          }}
        />
      </form>
      {isOpen && query && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--ifm-background-color)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '4px',
          marginTop: '4px',
          padding: '0.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          minWidth: '250px'
        }}>
          {results.length > 0 ? (
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  onMouseDown={() => handleResultClick(result.path)}
                  style={{
                    padding: '0.5rem',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginBottom: index < results.length - 1 ? '4px' : 0,
                    background: 'var(--ifm-color-emphasis-100)',
                    fontSize: '0.85rem',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--ifm-color-emphasis-200)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--ifm-color-emphasis-100)';
                  }}
                >
                  <div style={{ fontWeight: 500 }}>{result.title}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{result.path}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
