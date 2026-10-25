import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Clock, Wine, MapPin, Calendar, Info, X, 
  ChevronLeft, ChevronRight, Sparkles, Phone, Music, DollarSign, Shirt 
} from 'lucide-react';
import Marquee from '../components/Marquee';
import { RESTAURANT_INFO, SIGNATURE_DISHES, ATMOSPHERE_MOODS } from '../data/restaurantData';
import { getStoredEvents } from '../data/storage';

const STORY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1000&q=80',
    title: 'La Terrasse Maritime',
    sub: 'Face aux mâts du Vieux-Port, à l\'ombre des canisses'
  },
  {
    url: 'https://framerusercontent.com/images/enKz7ixDbNy06JOGJ0baMIv5woc.jpg',
    title: 'La Cuisine Ouverte',
    sub: 'Préparation minute, feu de bois et gestes précis'
  },
  {
    url: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1000&q=80',
    title: 'Le Retour de Pêche',
    sub: 'Vrais poissons frais de ligne débarqués chaque matin'
  },
  {
    url: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80',
    title: 'Pâtes Façonnées au Bronze',
    sub: 'Laminage à la main et semoule de blé dur sélectionnée'
  },
  {
    url: 'https://framerusercontent.com/images/ouXh6dXR1Y8fR9D4dBboTNgMZM.jpg',
    title: 'La Grande Tablée',
    sub: 'Convivialité méditerranéenne et partage'
  },
  {
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    title: 'La Cave Vivante',
    sub: 'Plus de 80 flacons de vignerons naturels et biodynamiques'
  }
];

export default function HomePage({ navigate }) {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const [isMoodHovered, setIsMoodHovered] = useState(false);
  const [activePlateIndex, setActivePlateIndex] = useState(0);
  const [events, setEvents] = useState(() => getStoredEvents());
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [storyPhotoIndex, setStoryPhotoIndex] = useState(0);
  const [isStoryHovered, setIsStoryHovered] = useState(false);

  // Sync events from localStorage
  useEffect(() => {
    const handleUpdate = () => {
      setEvents(getStoredEvents());
    };
    window.addEventListener('santo_data_updated', handleUpdate);
    return () => window.removeEventListener('santo_data_updated', handleUpdate);
  }, []);

  // Auto-cycle atmosphere moods ("Un lieu, trois moments de vie")
  useEffect(() => {
    if (isMoodHovered) return;
    const moodTimer = setInterval(() => {
      setActiveMoodIndex((prev) => (prev + 1) % ATMOSPHERE_MOODS.length);
    }, 4500);
    return () => clearInterval(moodTimer);
  }, [isMoodHovered]);

  // Auto-cycle story photos
  useEffect(() => {
    if (isStoryHovered) return;
    const interval = setInterval(() => {
      setStoryPhotoIndex((prev) => (prev + 1) % STORY_PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isStoryHovered]);

  const activeMood = ATMOSPHERE_MOODS[activeMoodIndex];
  const activePlate = SIGNATURE_DISHES[activePlateIndex];

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* 1. HERO BANNER: Full-width container (w-full), 60% Left Text/Buttons, 40% Right Image */}
      <section className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-14 pb-14 sm:pb-20 border-b border-[#2B211D]/10 bg-[#FAF7F2] overflow-hidden">
        
        {/* Soft atmospheric background accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E94B35]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F4E6A8]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-16">
          
          {/* Left Column (60%): Poetic Rhyming Headline, Narrative & Buttons */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center space-y-6 sm:space-y-8 z-10">
            
            {/* Eyebrow Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#2B211D]/15 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E94B35] animate-pulse" />
              <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-bold text-[#2B211D]">
                Marseille · Trattoria Côtière & Bistrot de Mer
              </span>
            </div>

            {/* Headline with harmonious rhyme and bold maritime typography */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight uppercase text-[#2B211D] leading-[0.98]">
              LE GOÛT DU LARGE.<br />
              <span className="text-[#E94B35]">LE VIN DU SOIR.</span><br />
              <span className="italic font-normal text-[#2B211D]/85">LE BONHEUR DE S'ASSEOIR.</span>
            </h1>

            {/* Narrative copy */}
            <p className="font-sans text-base sm:text-xl text-[#2B211D]/80 leading-relaxed font-normal max-w-2xl">
              {RESTAURANT_INFO.tagline}
            </p>

            {/* Micro-perks badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#2B211D]/75 font-medium pt-1">
              <span className="px-3.5 py-1.5 rounded-full bg-white/70 border border-[#2B211D]/10 flex items-center gap-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E94B35]" />
                Pêche de Ligne Débarquée le Matin
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/70 border border-[#2B211D]/10 flex items-center gap-2 shadow-2xs">
                <Wine className="w-3.5 h-3.5 text-[#E94B35]" />
                80+ Vins Vivants & Biodynamie
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/70 border border-[#2B211D]/10 flex items-center gap-2 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#E94B35]" />
                Terrasse Vue Vieux-Port
              </span>
            </div>

            {/* Interactive Buttons (Les Boutons) */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              
              {/* Primary: Réserver une table */}
              <button
                onClick={() => {
                  navigate('/book-a-table');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2.5 bg-[#E94B35] hover:bg-[#D33822] text-white px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Réserver une table</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Secondary: Découvrir le menu */}
              <button
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2.5 border-2 border-[#2B211D]/20 hover:border-[#2B211D] bg-white/60 hover:bg-white text-[#2B211D] px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer"
              >
                <span>Découvrir la carte</span>
                <ArrowUpRight className="w-4 h-4 text-[#2B211D]/70" />
              </button>

              {/* Tertiary Link: Carte des vins */}
              <button
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group px-4 py-2 text-xs uppercase tracking-widest font-semibold text-[#2B211D]/70 hover:text-[#E94B35] transition-colors flex items-center justify-center gap-1.5 underline-offset-8 hover:underline sm:self-center cursor-pointer"
              >
                <span>Carte des vins</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

            </div>

            {/* Quick Practical Info Strip */}
            <div className="pt-4 border-t border-[#2B211D]/15 flex flex-wrap items-center gap-6 text-xs text-[#2B211D]/65 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E94B35]" />
                <span>Quai du Port, 13002 Marseille</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E94B35]" />
                <span>Tous les jours · 12h00—15h00 & 19h00—00h00</span>
              </div>
            </div>

          </div>

          {/* Right Column (40%): Authentic Waterside Terrace on Marseille Harbor */}
          <div className="w-full lg:w-[40%] flex justify-center items-center">
            <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] xl:h-[680px] rounded-3xl overflow-hidden shadow-2xl border border-[#2B211D]/15 group bg-[#2B211D]/10">
              <img
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1400&q=80"
                alt="Terrasse du restaurant Santo Mare face au Vieux-Port de Marseille"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              
              {/* Subtle top-left badge */}
              <div className="absolute top-5 left-5 z-10">
                <div className="bg-[#2B211D]/75 backdrop-blur-md text-white rounded-full px-4 py-1.5 border border-white/10 shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E94B35]" />
                  <span className="text-[11px] uppercase tracking-widest font-bold">
                    Terrasse Quai du Port
                  </span>
                </div>
              </div>

              {/* Bottom Glassmorphic Card */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-[#2B211D]/85 backdrop-blur-md text-white rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#F4E6A8] mb-1.5 block">
                  Vue Directe sur le Vieux-Port
                </span>
                <p className="font-serif text-base sm:text-lg font-bold leading-snug">
                  "L'air marin, le clapotis contre les quais et les verres qui tintent au soleil couchant."
                </p>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
                  <span>Réservation conseillée au coucher du soleil</span>
                  <span className="text-[#F4E6A8] font-semibold">19h30 — 22h00</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. LES PLATS DE SAISON */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#2B211D]/10">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#2B211D]">
                Les Plats de Saison.
              </h2>
              <p className="text-sm sm:text-base text-[#2B211D]/75 font-sans mt-2 max-w-xl">
                Une sélection d'assiettes emblématiques préparées chaque jour selon le marché et la pêche du matin.
              </p>
            </div>

            <button
              onClick={() => {
                navigate('/menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2B211D] hover:text-[#E94B35] transition-colors group cursor-pointer"
            >
              <span>Voir toute la carte</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Interactive Plate Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12">
            {/* Left Selector Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SIGNATURE_DISHES.map((dish, idx) => {
                const isSelected = activePlateIndex === idx;
                return (
                  <button
                    key={dish.number}
                    onClick={() => setActivePlateIndex(idx)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFF9EF] border-[#E94B35] shadow-lg translate-x-2'
                        : 'bg-[#FFF9EF]/40 border-[#2B211D]/10 hover:border-[#2B211D]/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`font-serif text-sm font-bold ${isSelected ? 'text-[#E94B35]' : 'text-[#2B211D]/40'}`}>
                          {dish.number}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-[#2B211D]">
                          {dish.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[#2B211D]/70 font-sans mt-1 pl-7">
                        {dish.desc}
                      </p>
                    </div>

                    <div className="text-right pl-4">
                      <span className="font-serif font-bold text-base text-[#2B211D]">
                        {dish.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Plate Display */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 sm:p-12 bg-[#FFF9EF] rounded-3xl border border-[#2B211D]/15 shadow-inner relative overflow-hidden min-h-[440px]">
              <div className="absolute w-[360px] h-[360px] rounded-full bg-[#F4E6A8]/40 blur-3xl pointer-events-none"></div>

              {/* Floating Plate Cutout */}
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-float-slow">
                <img
                  key={activePlate.cutoutImage}
                  src={activePlate.cutoutImage}
                  alt={activePlate.name}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 cursor-grab"
                />
              </div>

              {/* Dish details snippet */}
              <div className="relative z-10 text-center mt-6 max-w-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E94B35] block mb-1">
                  Plat Nº {activePlate.number}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2B211D]">
                  {activePlate.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#2B211D]/75 font-sans mt-2">
                  {activePlate.details}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      navigate('/menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#E94B35] hover:underline cursor-pointer"
                  >
                    <span>Commander dans le menu</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SLOW & LEISURELY MARQUEE BANNER */}
      <Marquee text="PÊCHE DU MATIN ★ PÂTES FRAÎCHES FAÇONNÉES AU BRONZE ★ VINS VIVANTS & NATURELS ★ APÉRITIVO ITALIEN ★ BELLES NUITS FACE À LA MER ★ HUILE D'OLIVE VIERGE EXTRA ★" />

      {/* 4. UN LIEU. TROIS MOMENTS DE VIE (With smooth auto-cycling & manual click) */}
      <section 
        id="atmosphere" 
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFF9EF]"
        onMouseEnter={() => setIsMoodHovered(true)}
        onMouseLeave={() => setIsMoodHovered(false)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#2B211D]/10">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
                Un Lieu. Trois Moments de Vie.
              </h2>
              <p className="text-sm sm:text-base text-[#2B211D]/70 font-sans mt-2 max-w-xl">
                Des premières lueurs du soleil sur les mâts des bateaux jusqu'aux dernières quilles de vin nature partagées dans la fraîcheur de la nuit.
              </p>
            </div>

            {/* Mood switcher tabs (interactive + auto-advancing) */}
            <div className="flex bg-[#2B211D]/5 p-1.5 rounded-full border border-[#2B211D]/10">
              {ATMOSPHERE_MOODS.map((mood, idx) => {
                const isActive = activeMoodIndex === idx;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setActiveMoodIndex(idx)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#E94B35] text-white shadow-sm'
                        : 'text-[#2B211D]/70 hover:text-[#2B211D]'
                    }`}
                  >
                    <span>{mood.tag}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Mood Content Showcase */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] shadow-xl border border-[#2B211D]/15 relative">
              <img
                key={activeMood.image}
                src={activeMood.image}
                alt={activeMood.title}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#FFF9EF]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-serif font-bold text-[#2B211D]">
                {activeMood.tag}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E94B35] mb-2 block">
                Moment de la journée
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211D] leading-tight mb-2">
                {activeMood.title}
              </h3>
              <p className="font-serif text-lg italic text-[#697348] mb-4">
                "{activeMood.subtitle}"
              </p>
              <p className="text-sm sm:text-base text-[#2B211D]/80 font-sans leading-relaxed mb-6">
                {activeMood.description}
              </p>
              <div>
                <button
                  onClick={() => {
                    navigate('/book-a-table');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 bg-[#2B211D] hover:bg-[#E94B35] text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Réserver ce moment</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CE SOIR ET CETTE SEMAINE AU SANTO (Label removed, 'et' spelled out, rich modal with exact card desc + extras) */}
      <section id="whats-on" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto">
          <div className="pb-12 border-b border-[#2B211D]/10">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
              Ce Soir et Cette Semaine au Santo.
            </h2>
            <p className="text-sm sm:text-base text-[#2B211D]/70 font-sans mt-2 max-w-lg">
              Des soirées vinyles, des barbecues dominicaux et des rencontres avec les vignerons qui font vibrer nos verres.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#FFF9EF] rounded-3xl border border-[#2B211D]/10 hover:border-[#E94B35] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md group"
              >
                {/* Event Photo */}
                <div
                  className="aspect-[16/10] overflow-hidden relative cursor-pointer"
                  onClick={() => setSelectedEventModal(event)}
                >
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#E94B35] px-3 py-1 rounded-full shadow-sm">
                      {event.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#2B211D]/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-sans">
                    {event.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3
                    onClick={() => setSelectedEventModal(event)}
                    className="font-serif text-2xl font-bold text-[#2B211D] mb-1 group-hover:text-[#E94B35] transition-colors cursor-pointer"
                  >
                    {event.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#397DD8] mb-3">
                    {event.highlight}
                  </p>
                  <p className="text-xs text-[#2B211D]/75 font-sans leading-relaxed line-clamp-3">
                    {event.desc}
                  </p>

                  <div className="pt-5 mt-auto border-t border-[#2B211D]/10 flex items-center justify-between gap-3">
                    {/* "À propos" button opens blurry overlay modal */}
                    <button
                      onClick={() => setSelectedEventModal(event)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#2B211D]/70 hover:text-[#2B211D] transition-colors py-1.5 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>À propos</span>
                    </button>

                    {/* "Participer" button pre-fills booking */}
                    <button
                      onClick={() => {
                        const query = new URLSearchParams({
                          event: event.title,
                          date: event.targetDate || event.suggestedDate || '',
                          service: event.service || event.suggestedService || 'dinner'
                        }).toString();
                        navigate(`/book-a-table?${query}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#E94B35] hover:bg-[#D33822] text-white px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      <span>Participer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR STORY (Fresh Fish Photo & Auto-cycling Multi-Photo Gallery) */}
      <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block">
                Notre Histoire
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D] leading-tight">
                Une table de quartier baignée d'embruns marins.
              </h2>
              <p className="font-sans text-base text-[#2B211D]/80 leading-relaxed">
                Santo Mare est né d'un amour viscéral pour deux côtes sœurs : le littoral marseillais et la Riviera italienne. Deux terres unies par le sel, l'olivier, l'ail doux et la passion du bon geste.
              </p>
              <p className="font-sans text-base text-[#2B211D]/80 leading-relaxed">
                Chaque matin, nos cuisiniers accueillent les caisses de bars, daurades et poulpes débarquées au port. La pâte à focaccia lève lentement, les tomates s'épanouissent au soleil et les pâtes fraîches sont laminées à la main.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#2B211D]/10">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#E94B35]">100%</span>
                  <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">Pêche artisanale et maraîchage bio de Provence</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#697348]">80+</span>
                  <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">Références de vins vivants et cuvées nature</p>
                </div>
              </div>
            </div>

            {/* Auto-cycling Multi-Photo Gallery */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setIsStoryHovered(true)}
              onMouseLeave={() => setIsStoryHovered(false)}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#2B211D]/10 border border-[#2B211D]/15 group">
                <img
                  key={STORY_PHOTOS[storyPhotoIndex].url}
                  src={STORY_PHOTOS[storyPhotoIndex].url}
                  alt={STORY_PHOTOS[storyPhotoIndex].title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out"
                />

                {/* Photo info caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B211D]/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#F4E6A8] block mb-0.5">
                      Instantané {storyPhotoIndex + 1} / {STORY_PHOTOS.length}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold">
                      {STORY_PHOTOS[storyPhotoIndex].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/80 font-sans mt-0.5">
                      {STORY_PHOTOS[storyPhotoIndex].sub}
                    </p>
                  </div>
                </div>

                {/* Arrows */}
                <button
                  onClick={() => setStoryPhotoIndex((prev) => (prev - 1 + STORY_PHOTOS.length) % STORY_PHOTOS.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFF9EF]/80 backdrop-blur-xs text-[#2B211D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer shadow-md"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setStoryPhotoIndex((prev) => (prev + 1) % STORY_PHOTOS.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FFF9EF]/80 backdrop-blur-xs text-[#2B211D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer shadow-md"
                  aria-label="Photo suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails strip below */}
              <div className="grid grid-cols-6 gap-2 mt-4">
                {STORY_PHOTOS.map((p, idx) => (
                  <button
                    key={p.url}
                    onClick={() => setStoryPhotoIndex(idx)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      storyPhotoIndex === idx
                        ? 'border-[#E94B35] scale-105 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE CELLAR (LA CAVE - LINK TO BOISSONS & VINS) */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#2B211D] text-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF9EF]/10">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
                La Cave du Santo
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#FFF9EF]">
                Encore une bouteille.
              </h2>
              <p className="text-sm sm:text-base text-[#FFF9EF]/70 font-sans mt-2 max-w-lg">
                Des vignerons passionnés, des fermentations naturelles, zéro artifice. Nos vins respirent la terre et la mer.
              </p>
            </div>

            <button
              onClick={() => {
                navigate('/menu?category=course-04');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 border border-[#FFF9EF]/30 hover:border-[#FFF9EF] text-[#FFF9EF] px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>Voir la carte des vins</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12">
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#F4E6A8] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Blancs Vivants</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Cassis, Vermentino marin & minéraux de Provence.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#E94B35] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Vins d'Orange</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Macérations pelliculaires complexes et solaires.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#397DD8] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Rosés de Pressée</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Bandol authentique, servis frais en carafe.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#697348] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Apéritifs et Amari</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Spritz Santo, Pastis Henri Bardouin et Negroni.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRIVATE DINING CALLOUT */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto bg-[#FFF9EF] p-8 sm:p-14 rounded-3xl border border-[#2B211D]/15 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
              Privatisation & Événements
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
              Invitez Tout le Monde.
            </h2>
            <p className="text-sm sm:text-base text-[#2B211D]/75 font-sans mt-3 max-w-lg leading-relaxed">
              Grands anniversaires, retrouvailles de famille, dîners d'équipe et célébrations qui méritent bien plus qu'une simple conversation de groupe.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  navigate('/private-dining');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
              >
                <span>Découvrir les formules de privatisation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-[#2B211D]/10">
            <img
              src="https://framerusercontent.com/images/oOasiftP6OiUK3TlYBldiT4ygg.webp"
              alt="Grande tablée de banquet privatif chez Santo Mare"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 9. RETROUVEZ-NOUS AU BORD DE L'EAU (Pills removed, integrated schedule, elevated text & Google Maps aligned with right image) */}
      <section id="visit" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
              Retrouvez-nous au bord de l'eau.
            </h2>
          </div>

          {/* 2 Columns: Elevated texts + Google Maps on Left, Port photo on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Higher-up text block, action buttons, and integrated Google Maps embed */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="space-y-4 text-sm font-sans text-[#2B211D]/85">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#E94B35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#2B211D] text-base">{RESTAURANT_INFO.address}</strong>
                      <span className="text-xs text-[#2B211D]/70">13002 Marseille · Quartier du Vieux-Port · Face aux calanques</span>
                    </div>
                  </div>

                  {/* Integrated Opening Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#E94B35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#2B211D] text-base">Horaires d'Ouverture</strong>
                      <div className="text-xs text-[#2B211D]/75 space-y-0.5 mt-0.5">
                        <p><strong className="text-[#2B211D]">Mardi — Jeudi :</strong> 12h00 — 00h00 (Service continu)</p>
                        <p><strong className="text-[#2B211D]">Vendredi — Samedi :</strong> 12h00 — 01h30 (Dîner festif et DJ)</p>
                        <p><strong className="text-[#2B211D]">Dimanche :</strong> 12h00 — 23h00 · <span className="italic text-[#E94B35]">Lundi fermé (Retour de pêche)</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Phone & Hospitality */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#E94B35] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#2B211D] text-base">{RESTAURANT_INFO.phone}</strong>
                      <span className="text-xs text-[#2B211D]/70">Tables sans réservation toujours bienvenues au comptoir</span>
                    </div>
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="pt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#2B211D] hover:bg-[#E94B35] text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
                  >
                    <span>Ouvrir dans Google Maps</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      navigate('/book-a-table');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 border border-[#2B211D]/25 hover:border-[#2B211D] text-[#2B211D] px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>Réserver une table</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Google Maps Frame (Aligned with bottom of right image) */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-[#2B211D]/15 shadow-sm h-64 sm:h-72 w-full bg-[#2B211D]/5">
                <iframe
                  title="Carte Google Maps Santo Mare Marseille"
                  src="https://maps.google.com/maps?q=14%20Rue%20de%20la%20Marine%2C%2013002%20Marseille&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Column: Coastal Harbor Photography */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-lg border border-[#2B211D]/15 min-h-[460px] lg:min-h-[520px]">
              <img
                src="https://framerusercontent.com/images/5cLqI8QHlTW8ZTXNq5unrFYefk.jpg"
                alt="Quartier du port à Marseille proche du restaurant Santo Mare"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OVERLAY MODAL: "À PROPOS" DE L'ÉVÉNEMENT (With Backdrop Blur, exact card desc + detailed supplementary info) */}
      {selectedEventModal && (
        <div
          className="fixed inset-0 z-50 bg-[#2B211D]/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="bg-[#FFF9EF] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#2B211D]/20 animate-in zoom-in-95 duration-200 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] bg-[#2B211D]/10">
              <img
                src={selectedEventModal.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80'}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2B211D]/80 hover:bg-[#2B211D] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#E94B35] px-3 py-1 rounded-full shadow-sm">
                  {selectedEventModal.badge}
                </span>
                <span className="text-xs bg-[#2B211D]/80 backdrop-blur-xs text-white px-3 py-1 rounded-full font-sans">
                  {selectedEventModal.date}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#E94B35] block mb-1">
                  Événement Santo Mare
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211D]">
                  {selectedEventModal.title}
                </h3>
                <p className="text-sm font-serif italic text-[#397DD8] mt-1 font-semibold">
                  {selectedEventModal.highlight}
                </p>
              </div>

              {/* Exact Description from the Card */}
              <div className="bg-[#E94B35]/10 border-l-4 border-[#E94B35] p-4 rounded-r-2xl">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E94B35] block mb-1">
                  Présentation de la soirée
                </span>
                <p className="font-serif text-base text-[#2B211D] italic leading-relaxed">
                  "{selectedEventModal.desc}"
                </p>
              </div>

              {/* Supplementary Practical Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#2B211D]/5 border border-[#2B211D]/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E94B35] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Horaires & Déroulement</span>
                  </div>
                  <p className="text-xs text-[#2B211D]/85 font-sans">
                    {selectedEventModal.schedule || "21h00 — 01h30 (Service dîner dès 19h30)"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#2B211D]/5 border border-[#2B211D]/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#697348] mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Tarif & Modalités</span>
                  </div>
                  <p className="text-xs text-[#2B211D]/85 font-sans">
                    {selectedEventModal.pricing || "Entrée libre · Consommation & restauration à la carte"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#2B211D]/5 border border-[#2B211D]/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#397DD8] mb-1">
                    <Shirt className="w-3.5 h-3.5" />
                    <span>Code Vestimentaire</span>
                  </div>
                  <p className="text-xs text-[#2B211D]/85 font-sans">
                    {selectedEventModal.dressCode || "Élégance décontractée & esprit marin (chemises en lin, sourires)"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#2B211D]/5 border border-[#2B211D]/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E94B35] mb-1">
                    <Music className="w-3.5 h-3.5" />
                    <span>Ambiance Sonore</span>
                  </div>
                  <p className="text-xs text-[#2B211D]/85 font-sans">
                    {selectedEventModal.music || "Sélection vinyles italo-disco, funk méditerranéen & jazz doux"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#2B211D]/5 border border-[#2B211D]/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#697348] mb-1">
                    <Wine className="w-3.5 h-3.5" />
                    <span>Côté Bar & Boissons</span>
                  </div>
                  <p className="text-xs text-[#2B211D]/85 font-sans">
                    {selectedEventModal.drinks || "Quilles de vins vivants au verre, Spritz Santo & cocktails signature"}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#2B211D]/5 border border-[#2B211D]/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B211D] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Lieu & Emplacement</span>
                  </div>
                  <p className="text-xs text-[#2B211D]/85 font-sans">
                    {selectedEventModal.location || "Terrasse maritime face au port & comptoir en marbre intérieur"}
                  </p>
                </div>
              </div>

              {/* Extended Full Notes */}
              {selectedEventModal.longDescription && selectedEventModal.longDescription !== selectedEventModal.desc && (
                <div className="text-xs sm:text-sm text-[#2B211D]/80 font-sans leading-relaxed whitespace-pre-line border-t border-[#2B211D]/10 pt-4">
                  {selectedEventModal.longDescription}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-[#2B211D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B211D]/70 hover:text-[#2B211D] border border-[#2B211D]/20 cursor-pointer"
                >
                  Fermer
                </button>

                <button
                  onClick={() => {
                    const event = selectedEventModal;
                    setSelectedEventModal(null);
                    const query = new URLSearchParams({
                      event: event.title,
                      date: event.targetDate || event.suggestedDate || '',
                      service: event.service || event.suggestedService || 'dinner'
                    }).toString();
                    navigate(`/book-a-table?${query}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-md cursor-pointer"
                >
                  <span>Réserver pour cette soirée</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
