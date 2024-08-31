import React, { useState } from 'react';
import axios from 'axios';
import { ChevronRightIcon, SparklesIcon, CopyIcon, LoaderIcon, SunIcon, MoonIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import Tooltip from './components/ui/tooltip';
import { motion } from 'framer-motion';

const App = () => {
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Domain Expert Simulation');
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('light'); // New state for theme
  const [history, setHistory] = useState([]); // New state for prompt history

  const templateOptions = [
    'Domain Expert Simulation',
    'Comparative Analysis',
    'Multi-Stakeholder Perspective',
    'Ethical and Societal Impact Evaluation',
    'Future-Oriented Evaluation'
  ];

  const generatePrompt = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCopied(false);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-prompt`, { 
        topic,
        template: selectedTemplate
      });
      setPrompt(response.data.prompt);
      setHistory([response.data.prompt, ...history]); // Add to history
    } catch (err) {
      setError('An error occurred while generating the prompt. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearForm = () => {
    setTopic('');
    setPrompt('');
    setSelectedTemplate('Domain Expert Simulation');
    setCopied(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600' : 'bg-gray-900 text-gray-100'} flex items-center justify-center p-4 relative overflow-hidden`}>
      <motion.div
        className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900'} opacity-70`}
      />
      <motion.div
        className={`bg-${theme === 'light' ? 'white' : 'gray-800'} rounded-3xl shadow-2xl p-10 max-w-4xl w-full relative z-10`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            ⚡️ LLM Evaluation Prompt Generator
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <MoonIcon size={24} className="text-gray-800 dark:text-gray-200" />
            ) : (
              <SunIcon size={24} className="text-yellow-400 dark:text-yellow-300" />
            )}
          </button>
        </div>
        <form onSubmit={generatePrompt} className="mb-6 space-y-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic, domain, or content type"
            className={`p-5 border border-${theme === 'light' ? 'gray-300' : 'gray-600'} rounded-lg focus:ring-4 focus:ring-${theme === 'light' ? 'blue-500' : 'blue-700'} focus:border-transparent outline-none transition-all w-full ${theme === 'light' ? 'text-gray-800 placeholder-gray-500' : 'text-gray-100 placeholder-gray-400'}`}
            required
          />
          <Select onValueChange={setSelectedTemplate} defaultValue={selectedTemplate}>
            <SelectTrigger className={`w-full bg-${theme === 'light' ? 'gray-100' : 'gray-700'} border border-${theme === 'light' ? 'gray-300' : 'gray-600'} rounded-lg text-${theme === 'light' ? 'gray-800' : 'gray-100'} focus:ring-4 focus:ring-${theme === 'light' ? 'blue-500' : 'blue-700'} focus:border-transparent outline-none`}>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: theme === 'light' ? '#f1f5f9' : '#2d2d2d', borderColor: theme === 'light' ? '#d1d5db' : '#444', opacity: 1 }}>
              {templateOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <span className={`flex items-center space-x-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-300'}`}>
                      <SparklesIcon size={18} />
                      {option}
                    </span>
                  </motion.div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            type="submit"
            className={`bg-gradient-to-r from-${theme === 'light' ? 'blue-600' : 'blue-700'} to-${theme === 'light' ? 'purple-600' : 'purple-800'} text-white py-3 rounded-lg hover:from-${theme === 'light' ? 'purple-600' : 'purple-700'} hover:to-${theme === 'light' ? 'blue-600' : 'blue-700'} transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full`}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderIcon className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                Generate
                <ChevronRightIcon size={20} />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className={`bg-${theme === 'light' ? 'gray-500' : 'gray-600'} text-white py-3 rounded-lg hover:bg-${theme === 'light' ? 'gray-600' : 'gray-700'} transition-colors flex items-center justify-center gap-2 w-full`}
          >
            Clear
          </button>
        </form>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {prompt && (
          <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Generated Evaluation Prompt:</h2>
            <div className={`relative bg-${theme === 'light' ? 'gray-100' : 'gray-800'} p-8 rounded-lg shadow-inner whitespace-pre-wrap ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} max-h-96 overflow-auto`}>
              {prompt}
              <Tooltip content={copied ? "Copied!" : "Copy"}>
                <button
                  onClick={copyToClipboard}
                  className={`absolute top-2 right-2 text-${theme === 'light' ? 'gray-600' : 'gray-300'} hover:text-${theme === 'light' ? 'gray-900' : 'gray-100'} transition`}
                >
                  <CopyIcon size={20} />
                </button>
              </Tooltip>
            </div>
          </motion.div>
        )}

        {history.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Prompt History:</h2>
            <ul className="space-y-2">
              {history.map((histPrompt, index) => (
                <li key={index} className={`relative bg-${theme === 'light' ? 'gray-100' : 'gray-800'} p-6 rounded-lg shadow-inner ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                  {histPrompt}
                  <Tooltip content="Copy">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(histPrompt);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className={`absolute top-2 right-2 text-${theme === 'light' ? 'gray-600' : 'gray-300'} hover:text-${theme === 'light' ? 'gray-900' : 'gray-100'} transition`}
                    >
                      <CopyIcon size={20} />
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default App;
