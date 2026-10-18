import React, { useState } from 'react';
import { ArrowUpRight, Compass, Sparkles, Clock, Wine, Users, Calendar, MapPin, ChevronRight, Music } from 'lucide-react';
import Marquee from '../components/Marquee';
import { RESTAURANT_INFO, SIGNATURE_DISHES, ATMOSPHERE_MOODS, EVENTS } from '../data/restaurantData';

export default function HomePage({ navigate }) {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);
  const [activePlateIndex, setActivePlateIndex] = useState(0);

  const activeMood = ATMOSPHERE_MOODS[activeMoodIndex];
  const activePlate = SIGNATURE_DISHES[activePlateIndex];

  return (
    <div className="pt-20 sm:pt-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-16 sm:pb-24 border-b border-[#2B211D]/10">
        <div className="max-w-7xl mx-auto">
          {/* Top Location / Status bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2B211D]/10 text-xs tracking-widest uppercase font-semibold text-[#2B211D]/75">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#697348] animate-pulse"></span>
              <span>{RESTAURANT_INFO.coordinates} · MARSEILLE</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <span>{RESTAURANT_INFO.subtitle}</span>
              <span className="text-[#E94B35]">TABLE 07 · ARRIVÉES SANS RÉSERVATION BIENVENUES</span>
            </div>
          </div>

          {/* Giant Hero Title */}
          <div className="pt-8 sm:pt-14 pb-8 sm:pb-12">
            <div className="inline-block mb-3 text-xs tracking-[0.25em] uppercase font-bold text-[#E94B35]">
              Marseille · Trattoria & Bistrot de Mer
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight uppercase text-[#2B211D] leading-[0.92]">
              BONNE TABLE.<br />
              <span className="text-[#E94B35]">VINS VIVANTS.</span><br />
              <span className="italic font-normal text-[#2B211D]/80">SOIRÉES INFINIES.</span>
            </h1>
          </div>

          {/* Subtext and Three Hero Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
            <div className="lg:col-span-5">
              <p className="font-sans text-base sm:text-lg text-[#2B211D]/80 leading-relaxed font-normal">
                {RESTAURANT_INFO.tagline}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    navigate('/book-a-table');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#E94B35] hover:bg-[#D33822] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                >
                  <span>Réserver votre table</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    navigate('/menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 border border-[#2B211D]/25 hover:border-[#2B211D] text-[#2B211D] px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>Découvrir le menu</span>
                  <ArrowUpRight className="w-4 h-4 text-[#2B211D]/60" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#2B211D]/5 p-5 rounded-2xl border border-[#2B211D]/10 hover:border-[#E94B35]/40 transition-colors">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#E94B35] block mb-1">
                  Horaires
                </span>
                <p className="font-serif text-lg font-bold text-[#2B211D]">
                  Mardi — Dimanche
                </p>
                <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">
                  12h00 → Tard dans la nuit
                </p>
              </div>

              <div className="bg-[#2B211D]/5 p-5 rounded-2xl border border-[#2B211D]/10 hover:border-[#E94B35]/40 transition-colors">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#E94B35] block mb-1">
                  Ambiance
                </span>
                <p className="font-serif text-lg font-bold text-[#2B211D]">
                  Venez avec l'Appétit
                </p>
                <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">
                  Partage & grandes tablées
                </p>
              </div>

              <div className="bg-[#2B211D]/5 p-5 rounded-2xl border border-[#2B211D]/10 hover:border-[#E94B35]/40 transition-colors">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#E94B35] block mb-1">
                  Saison
                </span>
                <p className="font-serif text-lg font-bold text-[#2B211D]">
                  Carte Nº 03
                </p>
                <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">
                  Pêche locale & produits du sud
                </p>
              </div>
            </div>
          </div>

          {/* Large Hero Photography Frame */}
          <div className="mt-12 sm:mt-16 relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] shadow-xl border border-[#2B211D]/15 group">
            <img
              src="https://framerusercontent.com/images/3aSiJ6lXiGAmTM2hZcKOEo6eyoM.jpg"
              alt="Table dressée au bord de la mer Méditerranée au restaurant Santo Mare"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B211D]/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
              <div className="text-white max-w-xl">
                <span className="text-xs uppercase tracking-widest font-bold text-[#F4E6A8] mb-1 block">
                  Bistrot Marin & Bar à Vins Vivants
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  "L'air salin du large, la chaleur du feu de bois et les rires qui résonnent sur le quai."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE DISHES HIGHLIGHT (CARTE Nº03) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#2B211D]/10">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
                Édition Saisonnière · Carte Nº 03
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
                Ce qu'on déguste en ce moment.
              </h2>
              <p className="text-sm sm:text-base text-[#2B211D]/70 font-sans mt-2 max-w-lg">
                Venez le ventre vide. Commandez trop. Restez trop tard. Une sélection d'assiettes emblématiques préparées chaque jour selon le marché.
              </p>
            </div>
            <button
              onClick={() => {
                navigate('/menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2B211D] hover:text-[#E94B35] transition-colors group"
            >
              <span>Consulter la carte complète</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* 4 Dish Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
            {SIGNATURE_DISHES.map((dish) => (
              <div
                key={dish.number}
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-[#FFFCF7] rounded-2xl p-5 border border-[#2B211D]/10 hover:border-[#E94B35] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-[#2B211D]/5">
                    <img
                      src={dish.fullImage}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#FFF9EF]/90 backdrop-blur-xs text-[#2B211D] font-serif font-bold text-xs px-2.5 py-1 rounded-full">
                      {dish.number}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#E94B35] text-white font-serif font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                      {dish.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2B211D] group-hover:text-[#E94B35] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#2B211D]/75 font-sans mt-1">
                    {dish.desc}
                  </p>
                  <p className="text-[11px] text-[#2B211D]/55 font-sans italic mt-2 line-clamp-2">
                    {dish.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#2B211D]/10 flex items-center justify-between text-xs font-semibold text-[#2B211D]/60 group-hover:text-[#E94B35] transition-colors">
                  <span>Voir la recette</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INFINITE MARQUEE BANNER */}
      <Marquee text="POISSON FRAIS DU PORT ★ PÂTES FRAÎCHES MAISON ★ VINS NATURELS & FLACONS VIVANTS ★ APÉRITIVO À L'ITALIENNE ★ EMBRUNS MARINS & BELLES NUITS ★ CUISINE CÔTIÈRE ★" />

      {/* 4. PASS THE PLATE (FAITES TOURNER L'ASSIETTE) INTERACTIVE SECTION */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
              Le Partage en Priorité · 04
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#2B211D]">
              Faites Tourner l'Assiette.
            </h2>
            <p className="text-sm sm:text-base text-[#2B211D]/75 font-sans mt-3">
              Ici, personne ne garde son assiette pour soi. Les plats circulent, les fourchettes se croisent et les verres se remplissent au fil des conversations.
            </p>
          </div>

          {/* Interactive Plate Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Selector Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SIGNATURE_DISHES.map((dish, idx) => {
                const isSelected = activePlateIndex === idx;
                return (
                  <button
                    key={dish.number}
                    onClick={() => setActivePlateIndex(idx)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
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

            {/* Right Plate Display with Cutout physics / animation */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 sm:p-12 bg-[#FFF9EF] rounded-3xl border border-[#2B211D]/15 shadow-inner relative overflow-hidden min-h-[420px]">
              {/* Subtle background radial glow */}
              <div className="absolute w-[360px] h-[360px] rounded-full bg-[#F4E6A8]/40 blur-3xl pointer-events-none"></div>

              {/* Floating Plate Cutout */}
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center animate-float-slow">
                <img
                  key={activePlate.cutoutImage}
                  src={activePlate.cutoutImage}
                  alt={activePlate.name}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-3 cursor-grab"
                />
              </div>

              {/* Dish details snippet below plate */}
              <div className="relative z-10 text-center mt-6 max-w-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#E94B35] block mb-1">
                  Assiette Nº {activePlate.number}
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
                    className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#E94B35] hover:underline"
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

      {/* 5. ATMOSPHERE · 3 AMBIANCES */}
      <section id="atmosphere" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#2B211D]/10">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
                Atmosphère · 05
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
                Un Lieu. Trois Moments de Vie.
              </h2>
              <p className="text-sm sm:text-base text-[#2B211D]/70 font-sans mt-2 max-w-xl">
                Des premières lueurs du soleil sur les mâts des bateaux jusqu'aux dernières quilles de vin nature partagées dans la fraîcheur de la nuit.
              </p>
            </div>

            {/* Mood switcher tabs */}
            <div className="flex bg-[#2B211D]/5 p-1 rounded-full border border-[#2B211D]/10">
              {ATMOSPHERE_MOODS.map((mood, idx) => (
                <button
                  key={mood.id}
                  onClick={() => setActiveMoodIndex(idx)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeMoodIndex === idx
                      ? 'bg-[#E94B35] text-white shadow-sm'
                      : 'text-[#2B211D]/70 hover:text-[#2B211D]'
                  }`}
                >
                  {mood.tag}
                </button>
              ))}
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
                  className="inline-flex items-center gap-2 bg-[#2B211D] hover:bg-[#E94B35] text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>Réserver ce moment</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT'S ON / CE SOIR AU SANTO */}
      <section id="whats-on" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#2B211D]/10">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
                Agenda & Vie Nocturne
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
                Ce Soir & Cette Semaine au Santo.
              </h2>
              <p className="text-sm sm:text-base text-[#2B211D]/70 font-sans mt-2 max-w-lg">
                Des soirées vinyles, des barbecues dominicaux et des rencontres avec les vignerons qui font vibrer nos verres.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#697348] bg-[#697348]/10 px-4 py-2 rounded-full">
              <Music className="w-4 h-4" />
              <span>Système son Haute-Fidélité & Vinyles</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-[#FFF9EF] p-7 rounded-3xl border border-[#2B211D]/10 hover:border-[#E94B35] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E94B35] bg-[#E94B35]/10 px-3 py-1 rounded-full">
                      {event.badge}
                    </span>
                    <span className="text-xs text-[#2B211D]/60 font-sans">
                      {event.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#2B211D] mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#397DD8] mb-3">
                    {event.highlight}
                  </p>
                  <p className="text-xs text-[#2B211D]/75 font-sans leading-relaxed">
                    {event.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2B211D]/10">
                  <button
                    onClick={() => {
                      navigate('/book-a-table');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider text-[#2B211D] hover:text-[#E94B35] transition-colors py-2"
                  >
                    <span>Participer</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR STORY (NOTRE HISTOIRE) */}
      <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block">
                Notre Histoire · 06
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D] leading-tight">
                Une table de quartier baignée d'embruns marins.
              </h2>
              <p className="font-sans text-base text-[#2B211D]/80 leading-relaxed">
                Santo Mare est né d'un amour viscéral pour deux côtes sœurs : le littoral marseillais et la Riviera italienne. Deux terres unies par le sel, l'olivier, l'ail doux et la passion du bon geste.
              </p>
              <p className="font-sans text-base text-[#2B211D]/80 leading-relaxed">
                Chaque matin, nos cuisiniers accueillent les caisses de bars, daurades et poulpes débarquées au port. La pâte à focaccia lève lentement, les tomates s'épanouissent au soleil et les pâtes fraîches sont laminées à la main. Pas d'esbroufe : des produits francs, de l'huile d'olive en abondance et des flacons vivants qui racontent leur terroir.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#2B211D]/10">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#E94B35]">100%</span>
                  <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">Pêche artisanale & maraîchage bio de Provence</p>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#697348]">80+</span>
                  <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">Références de vins vivants & cuvées nature</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <img
                  src="https://framerusercontent.com/images/enKz7ixDbNy06JOGJ0baMIv5woc.jpg"
                  alt="Préparation en cuisine chez Santo Mare"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4] mt-8">
                <img
                  src="https://framerusercontent.com/images/ouXh6dXR1Y8fR9D4dBboTNgMZM.jpg"
                  alt="Vue de la terrasse de Santo Mare"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE CELLAR (LA CAVE) */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#2B211D] text-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF9EF]/10">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
                La Cave du Santo · 07
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
                navigate('/menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 border border-[#FFF9EF]/30 hover:border-[#FFF9EF] text-[#FFF9EF] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Voir la carte des vins</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12">
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#F4E6A8] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Blancs Vivants</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Minéraux, iodés et tranchants comme la Méditerranée.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#E94B35] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Vins d'Orange</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Macérations pelliculaires complexes et solaires.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#397DD8] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Rosés de Pressée</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Légers, gouleyants, servis très frais en carafe.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#FFF9EF]/5 border border-[#FFF9EF]/10 hover:border-[#E94B35] transition-colors">
              <Wine className="w-6 h-6 text-[#697348] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#FFF9EF]">Apéritifs & Amari</h3>
              <p className="text-xs text-[#FFF9EF]/60 font-sans mt-1">Herbes sauvages macérées, amers et vermouths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRIVATE DINING CALLOUT */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#2B211D]/10 bg-[#FFFCF7]">
        <div className="max-w-7xl mx-auto bg-[#FFF9EF] p-8 sm:p-14 rounded-3xl border border-[#2B211D]/15 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
              Privatisation & Événements · 08
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
                className="inline-flex items-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm"
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

      {/* 10. VISIT & LOCATION */}
      <section id="visit" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFF9EF]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block">
                Nous Trouver · 09
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D] leading-tight">
                Retrouvez-nous au bord de l'eau.
              </h2>
              <div className="space-y-4 text-sm font-sans text-[#2B211D]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E94B35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2B211D]">{RESTAURANT_INFO.address}</strong>
                    <span>13002 Marseille · Vieux-Port</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#E94B35] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2B211D]">Mardi — Dimanche</strong>
                    <span>Déjeuner à partir de 12h00 · Dîner jusqu'à 01h30 le week-end</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2B211D] hover:bg-[#E94B35] text-white px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>Ouvrir dans Google Maps</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl overflow-hidden aspect-[16/10] shadow-lg border border-[#2B211D]/15">
              <img
                src="https://framerusercontent.com/images/5cLqI8QHlTW8ZTXNq5unrFYefk.jpg"
                alt="Quartier du port à Marseille proche du restaurant Santo Mare"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
