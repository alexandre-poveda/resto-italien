import React from 'react';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Footer({ navigate }) {
  const handleNav = (e, path, anchor) => {
    e.preventDefault();
    if (anchor) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2B211D] text-[#FFF9EF] pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#FFF9EF]/10">
      <div className="max-w-7xl mx-auto">
        {/* Big Sea Farewell Banner */}
        <div className="border-b border-[#FFF9EF]/15 pb-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFF9EF] uppercase leading-[0.95]">
              À TRÈS VITE<br />
              <span className="italic font-normal text-[#F4E6A8]">AU BORD DE L'EAU.</span>
            </h2>
            <p className="mt-4 text-[#FFF9EF]/70 max-w-md text-sm sm:text-base font-sans font-normal">
              {RESTAURANT_INFO.subtitle}. Cuisine de partage, grands poissons de roche et belles quilles ouvertes jusqu'à tard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                navigate('/book-a-table');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
            >
              <span>Réserver une table</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigate('/menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 border border-[#FFF9EF]/30 hover:border-[#FFF9EF] text-[#FFF9EF] px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Consulter la carte</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-[#FFF9EF]/10">
          {/* Col 1: About */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#FFF9EF] mb-3">
              SANTO MARE
            </h3>
            <p className="text-xs text-[#FFF9EF]/70 leading-relaxed font-sans mb-4">
              Bistrot côtier et trattoria marine face aux calanques. Des recettes italo-provençales préparées avec les trésors des pêcheurs et maraîchers de notre terroir.
            </p>
            <div className="inline-block bg-[#FFF9EF]/10 px-3 py-1.5 rounded text-[11px] font-sans text-[#F4E6A8] tracking-wider uppercase font-semibold">
              Tables sans réservation bienvenues
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-[#FFF9EF]/50 font-bold block mb-4">
              Explorer
            </span>
            <ul className="space-y-2.5 text-xs font-sans font-medium">
              <li>
                <a
                  href="/menu"
                  onClick={(e) => handleNav(e, '/menu')}
                  className="hover:text-[#E94B35] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>La Carte Saisonnière</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9EF]/40" />
                </a>
              </li>
              <li>
                <a
                  href="/#story"
                  onClick={(e) => handleNav(e, '/', 'story')}
                  className="hover:text-[#E94B35] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Notre Histoire & Philosophie</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9EF]/40" />
                </a>
              </li>
              <li>
                <a
                  href="/#whats-on"
                  onClick={(e) => handleNav(e, '/', 'whats-on')}
                  className="hover:text-[#E94B35] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Soirées & DJ Sets</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9EF]/40" />
                </a>
              </li>
              <li>
                <a
                  href="/private-dining"
                  onClick={(e) => handleNav(e, '/private-dining')}
                  className="hover:text-[#E94B35] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Privatisation & Tablées de Fête</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9EF]/40" />
                </a>
              </li>
              <li>
                <a
                  href="/book-a-table"
                  onClick={(e) => handleNav(e, '/book-a-table')}
                  className="hover:text-[#E94B35] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Réservations en Ligne</span>
                  <ArrowUpRight className="w-3 h-3 text-[#FFF9EF]/40" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-[#FFF9EF]/50 font-bold block mb-4">
              Contact & Accès
            </span>
            <ul className="space-y-3 text-xs font-sans text-[#FFF9EF]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E94B35] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}<br />Vieux-Port, Marseille</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E94B35] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#FFF9EF]">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E94B35] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#FFF9EF]">
                  {RESTAURANT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#E94B35] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFF9EF]"
                >
                  {RESTAURANT_INFO.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Horaires */}
          <div>
            <span className="text-[11px] font-sans uppercase tracking-widest text-[#FFF9EF]/50 font-bold block mb-4">
              Horaires d'Ouverture
            </span>
            <div className="space-y-2 text-xs font-sans">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-[#FFF9EF]/10 pb-1.5">
                  <span className="text-[#FFF9EF]/70">{h.days}</span>
                  <span className="font-semibold text-[#FFF9EF]">{h.time}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#FFF9EF]/50 mt-3 italic">
              Service continu le week-end · Déjeuner & Dîner.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FFF9EF]/40 font-sans">
          <p>© {new Date().getFullYear()} Santo Mare — Marseille, France. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <span className="hover:text-[#FFF9EF] cursor-pointer">Mentions Légales</span>
            <span className="text-[#FFF9EF]/20 hidden sm:inline">•</span>
            <a
              href="/gestionnaire"
              onClick={(e) => handleNav(e, '/gestionnaire')}
              className="hover:text-[#E94B35] text-[#FFF9EF]/60 transition-colors cursor-pointer"
            >
              Espace Gestionnaire
            </a>
            <span className="hover:text-[#FFF9EF] cursor-pointer">Politique de Confidentialité</span>
            <span className="text-[#FFF9EF]/20 hidden sm:inline">•</span>
            <span className="hover:text-[#FFF9EF] cursor-pointer">Presse et Événements</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
