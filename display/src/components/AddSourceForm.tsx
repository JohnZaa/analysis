import React, { useState } from 'react';

interface AddSourceFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const AddSourceForm: React.FC<AddSourceFormProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('http');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const handleHeaderChange = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value };
    setHeaders(newHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      description,
      tags,
      endpoint,
      apiKey,
      method,
      headers: headers.filter(header => header.key && header.value),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">增加信源</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">信源名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">信源类型</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="internalApi">站内API</option>
            </select>
          </div>
          {(type === 'http' || type === 'https') && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">请求方法</label>
                <input
                  type="text"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Endpoint</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              {headers.map((header, index) => (
                <div key={index} className="mb-4 flex">
                  <input
                    type="text"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, e.target.value, header.value)}
                    placeholder="Header Key"
                    className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2 mr-2"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, header.key, e.target.value)}
                    placeholder="Header Value"
                    className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
                  />
                  <button type="button" onClick={() => removeHeader(index)} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">删除</button>
                </div>
              ))}
              <button type="button" onClick={addHeader} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">增加Header</button>
            </>
          )}
          {type === 'internalApi' && (
            <div className="mb-4">
              <label className="block text-gray-700">API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">信源描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">信源标签</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 bg-gray-500 text-white px-4 py-2 rounded">取消</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">保存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSourceForm;