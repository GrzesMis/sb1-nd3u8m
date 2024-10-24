import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface KeywordInputProps {
  onSubmit: (keyword: string) => void;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword..."
        className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default KeywordInput;