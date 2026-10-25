import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookTablePage from './pages/BookTablePage';
import PrivateDiningPage from './pages/PrivateDiningPage';
import ManagerPage from './pages/ManagerPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path || '/';
    }
    return '/';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPath(window.location.pathname || '/');
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => setIsTransitioning(false), 50);
      }, 180);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path.startsWith('/#')) {
      const anchorId = path.replace('/#', '');
      if (currentPath !== '/') {
        setIsTransitioning(true);
        setTimeout(() => {
          window.history.pushState({}, '', '/');
          setCurrentPath('/');
          setIsTransitioning(false);
          setTimeout(() => {
            const el = document.getElementById(anchorId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 120);
        }, 220);
      } else {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Soft fade out transition
    setIsTransitioning(true);
    setTimeout(() => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Soft fade in transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 220);
  };

  // Determine current page based on basePath
  const basePath = currentPath.split('?')[0].split('#')[0];
  let PageComponent = HomePage;
  if (basePath === '/' || basePath === '') {
    PageComponent = HomePage;
  } else if (basePath === '/menu') {
    PageComponent = MenuPage;
  } else if (basePath === '/book-a-table') {
    PageComponent = BookTablePage;
  } else if (basePath === '/private-dining') {
    PageComponent = PrivateDiningPage;
  } else if (basePath === '/gestionnaire' || basePath === '/gestion') {
    PageComponent = ManagerPage;
  } else {
    PageComponent = NotFoundPage;
  }

  return (
    <div className="bg-[#FFF9EF] text-[#2B211D] min-h-screen flex flex-col font-sans selection:bg-[#E94B35] selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Content Area with Soft Fade Page Transitions */}
      <main
        className={`flex-1 ${
          isTransitioning ? 'page-transition-exit' : 'page-transition-enter'
        }`}
      >
        <PageComponent navigate={navigate} />
      </main>

      {/* Universal Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
