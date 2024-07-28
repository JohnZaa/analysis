import React, { useState } from 'react';
import AddSourceForm from './AddSourceForm';

const initialSources = [
  {
    id: 1,
    name: '信源一',
    description: '这是第一个信源的描述。',
    url: 'https://example.com/1',
  },
  {
    id: 2,
    name: '信源二',
    description: '这是第二个信源的描述。',
    url: 'https://example.com/2',
  },
  {
    id: 3,
    name: '信源三',
    description: '这是第三个信源的描述。',
    url: 'https://example.com/3',
  },
];

const SourceManagement: React.FC = () => {
  const [sources, setSources] = useState(initialSources);
  const [showForm, setShowForm] = useState(false);

  const addNewSource = (data: { name: string; type: string; description: string; tags: string; endpoint?: string; apiKey?: string }) => {
    const newSource = {
      id: sources.length + 1,
      name: data.name,
      description: data.description,
      url: data.type === 'http' || data.type === 'https' ? data.endpoint || '' : `https://example.com/${sources.length + 1}`,
      tags: data.tags,
      apiKey: data.type === 'internalApi' ? data.apiKey : undefined,
    };
    setSources([...sources, newSource]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">信源管理</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          增加信源
        </button>
      </div>
      {showForm && <AddSourceForm onSubmit={addNewSource} onClose={() => setShowForm(false)} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => (
          <div key={source.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">{source.name}</h2>
            <p className="text-gray-700 mb-4">{source.description}</p>
            <a href={source.url} className="text-green-500 hover:text-green-700">访问信源</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceManagement;