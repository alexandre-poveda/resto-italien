import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Calendar, ArrowUpRight, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Navbar({ currentPath, navigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'La Carte', path: '/menu' },
    { label: 'Notre Histoire', path: '/#story', isAnchor: true },
    { label: 'Événements', path: '/#whats-on', isAnchor: true },
    { label: 'Privatisation', path: '/private-dining' },
    { label: 'Nous Trouver', path: '/#visit', isAnchor: true },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.isAnchor) {
      if (currentPath !== '/') {
        navigate('/');
        setTimeout(() => {
          const anchor = link.path.replace('/#', '');
          const element = document.getElementById(anchor);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        const anchor = link.path.replace('/#', '');
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF9EF]/95 backdrop-blur-md shadow-sm border-b border-[#2B211D]/10 py-3.5'
            : 'bg-[#FFF9EF]/80 backdrop-blur-xs py-5 border-b border-[#2B211D]/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0 mr-8 lg:mr-16">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-wider text-[#2B211D] font-bold group-hover:text-[#E94B35] transition-colors text-center block">
                SANTO MARE
              </span>
              <span className="text-[10px] tracking-widest text-[#2B211D]/70 uppercase font-sans font-medium -mt-1 text-center block w-full">
                Cuisine Côtière · Marseille
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center justify-center flex-1 gap-8 lg:gap-11 px-4">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative text-xs lg:text-[13px] tracking-widest uppercase font-semibold transition-colors duration-200 py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[#E94B35]'
                      : 'text-[#2B211D]/85 hover:text-[#E94B35]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E94B35] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0 ml-8 lg:ml-12">
            <button
              onClick={() => {
                navigate('/book-a-table');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#E94B35] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#D33822] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <span>Réserver une table</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                navigate('/book-a-table');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 bg-[#E94B35] text-white px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase"
            >
              <Calendar className="w-3 h-3" />
              <span>Réserver</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2B211D] hover:text-[#E94B35] transition-colors"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#FFF9EF] flex flex-col justify-between p-6 pt-24 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <div className="border-b border-[#2B211D]/10 pb-4">
              <span className="text-xs uppercase tracking-widest text-[#2B211D]/50 font-bold">
                Navigation
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="font-serif text-2xl text-[#2B211D] hover:text-[#E94B35] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#2B211D]/40" />
                </a>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/book-a-table');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E94B35] text-white py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-[#D33822] transition-colors shadow-sm"
              >
                <span>Réserver une table</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-[#2B211D]/10 pt-6 flex flex-col gap-3 text-xs text-[#2B211D]/70 font-sans">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E94B35]" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#E94B35]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </div>
            <p className="text-[11px] text-[#2B211D]/50 mt-1">
              {RESTAURANT_INFO.footerHoursText}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
