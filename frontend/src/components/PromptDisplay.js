import React from 'react';

const PromptDisplay = ({ prompt }) => {
  if (!prompt) return null;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Generated Evaluation Prompt:</h2>
      <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{prompt}</div>
    </div>
  );
};

export default PromptDisplay;