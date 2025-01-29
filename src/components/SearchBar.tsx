"use client";

import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { SearchResults, SnippetInfo } from '@/types';
import { SearchResultsComponent, NoResults } from './Cards';
import { getTopSnippets } from '@/app/utils';

// SearchBar Component
const SearchBar = ({ value, onChange, onKeyDown }) => (
  <div className="relative">
    <div className="relative flex items-center">
      <Search className="absolute left-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        className="w-full rounded-lg py-2 pl-10 pr-4
        focus:outline-none focus:ring-1 focus:ring-blue-500
        text-gray-800 placeholder:text-gray-500"
        placeholder="Search documentation..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  </div>
);

// Main Component
export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultQuery, setSearchResultQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SnippetInfo[] | null>();
  const [isLoading, setIsLoading] = useState(false);


  const handleSearch = async () => {
    if (!searchQuery) return;
    
    setIsLoading(true);
    setSearchResultQuery(searchQuery);
    
    try {
      const collection_name = "guidelines";
      const response = await getTopSnippets(collection_name, searchQuery);

      switch (response.type) {
        case "Success":
          setSearchResults(response.results);
          break;
        case "Error":
          console.log("an error occurred");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  // Render search interface
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 min-h-[calc(100vh-4rem)]">
        {searchQuery.length > 0 ? (
          searchResults && searchResults.length > 0 ? (
            <SearchResultsComponent
              results={searchResults}
              currentQuery={searchQuery}
              resultQuery={searchResultQuery}
            />
            ) : (
              <div className="text-center py-8 text-gray-600">
                No results found for "{searchResultQuery}"
              </div>
            )
        ) : (
          <NoResults
            suggestedQueries={['crawler', 'pricing', 'support']}
          />
        )}
      </main>
    </div>
  );
};

export default SearchPage;
