import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SourceManagement from './components/SourceManagement';
import InfoList from './components/InfoList';
import TagManagement from './components/TagManagement';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex">
        {/* 左侧导航栏 */}
        <nav className="bg-green-900 text-white w-50 min-h-screen p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">导航</h1>
          </div>
          <ul className="space-y-4">
            <li>
              <Link className="hover:bg-green-700 p-2 block rounded" to="/">欢迎页面</Link>
            </li>
            <li>
              <Link className="hover:bg-green-700 p-2 block rounded" to="/source-management">信源管理</Link>
            </li>
            <li>
              <Link className="hover:bg-green-700 p-2 block rounded" to="/info-list">信息列表</Link>
            </li>
            <li>
              <Link className="hover:bg-green-700 p-2 block rounded" to="/tag-management">信息标签管理</Link>
            </li>
          </ul>
        </nav>
        
        {/* 主内容区域 */}
        <main className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/source-management" element={<SourceManagement />} />
            <Route path="/info-list" element={<InfoList />} />
            <Route path="/tag-management" element={<TagManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;