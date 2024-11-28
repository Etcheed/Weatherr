import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { validateLocation } from '../utils/validation';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateLocation(query);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);
    onSearch(query.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setValidationError(null);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for a city..."
            className={`w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </form>
      {validationError && (
        <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
          <AlertCircle className="h-4 w-4" />
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
};