import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookTablePage from './pages/BookTablePage';
import PrivateDiningPage from './pages/PrivateDiningPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path.startsWith('/#')) {
      // Anchors on home
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current page
  let PageComponent = HomePage;
  if (currentPath === '/' || currentPath === '') {
    PageComponent = HomePage;
  } else if (currentPath === '/menu') {
    PageComponent = MenuPage;
  } else if (currentPath === '/book-a-table') {
    PageComponent = BookTablePage;
  } else if (currentPath === '/private-dining') {
    PageComponent = PrivateDiningPage;
  } else {
    PageComponent = NotFoundPage;
  }

  return (
    <div className="bg-[#FFF9EF] text-[#2B211D] min-h-screen flex flex-col font-sans selection:bg-[#E94B35] selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        <PageComponent navigate={navigate} />
      </main>

      {/* Universal Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
