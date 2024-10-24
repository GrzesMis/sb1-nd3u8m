import React, { useState } from 'react';
import { Search, FileText, Cpu, PenTool } from 'lucide-react';
import KeywordInput from './components/KeywordInput';
import GoogleSearch from './components/GoogleSearch';
import RAGAnalysis from './components/RAGAnalysis';
import ArticleGeneration from './components/ArticleGeneration';

function App() {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [ragAnalysis, setRagAnalysis] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState('');

  const handleKeywordSubmit = async (submittedKeyword: string) => {
    setKeyword(submittedKeyword);
    // Trigger Google Search
    const results = await GoogleSearch(submittedKeyword);
    setSearchResults(results);
  };

  const handleRAGAnalysis = async () => {
    // Perform RAG analysis
    const analysis = await RAGAnalysis(searchResults);
    setRagAnalysis(analysis);
  };

  const handleArticleGeneration = async () => {
    // Generate article using OpenAI
    const article = await ArticleGeneration(ragAnalysis);
    setGeneratedArticle(article);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Article Generator</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <KeywordInput onSubmit={handleKeywordSubmit} />
        
        {searchResults.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Search className="mr-2" /> Search Results
            </h2>
            <ul className="list-disc pl-5">
              {searchResults.map((result, index) => (
                <li key={index} className="mb-2">{result}</li>
              ))}
            </ul>
            <button
              onClick={handleRAGAnalysis}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Perform RAG Analysis
            </button>
          </div>
        )}
        
        {ragAnalysis && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Cpu className="mr-2" /> RAG Analysis
            </h2>
            <p>{ragAnalysis}</p>
            <button
              onClick={handleArticleGeneration}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Generate Article
            </button>
          </div>
        )}
        
        {generatedArticle && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" /> Generated Article
            </h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: generatedArticle }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;