import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Eye, Utensils } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/restaurantData';
import { getStoredMenu } from '../data/storage';
import DishHoverPreview from '../components/DishHoverPreview';
import BlurRevealTitle from '../components/BlurRevealTitle';

export default function MenuPage({ navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState(() => getStoredMenu());
  const [activeDish, setActiveDish] = useState(null);
  const [mobileModalDish, setMobileModalDish] = useState(null);

  // Sync menu from localStorage and listen to updates
  useEffect(() => {
    const handleUpdate = () => {
      setMenuItems(getStoredMenu());
    };
    window.addEventListener('santo_data_updated', handleUpdate);
    return () => window.removeEventListener('santo_data_updated', handleUpdate);
  }, []);

  // Check URL params for pre-selected category (e.g. from "Voir la carte des vins")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && MENU_CATEGORIES.some((c) => c.id === catParam)) {
      setSelectedCategory(catParam);
    }
  }, []);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
  };

  // Categories to display
  const categoriesToRender =
    selectedCategory === 'all'
      ? MENU_CATEGORIES.filter((c) => c.id !== 'all')
      : MENU_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFF9EF] min-h-screen">
      {/* Floating Cursor Image Preview for Desktop */}
      <DishHoverPreview activeDish={activeDish} />

      {/* Main Header */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-10 border-b border-[#2B211D]/10">
        <div className="pt-6 sm:pt-10 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E94B35] block mb-2">
            Cuisine Côtière & Trattoria de Mer
          </span>
          <BlurRevealTitle as="h1" className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold uppercase text-[#2B211D] tracking-tight leading-[0.95]">
            La Carte Saisonnière.
          </BlurRevealTitle>
          <p className="mt-4 text-base sm:text-lg text-[#2B211D]/75 font-sans max-w-2xl">
            Assiettes solaires pensées pour le partage, poissons débarqués au port et pâtes fraîches façonnées chaque matin.
          </p>
        </div>

        {/* Clean, Redesigned Category Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5 pt-6 border-t border-[#2B211D]/10">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'all'
                ? menuItems.length
                : menuItems.filter((d) => d.courseId === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#E94B35] text-white shadow-sm'
                    : 'bg-[#2B211D]/5 text-[#2B211D]/80 hover:bg-[#2B211D]/10'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#2B211D]/10 text-[#2B211D]/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Categories & Dish Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        {categoriesToRender.map((cat) => {
          const categoryDishes = menuItems.filter((d) => d.courseId === cat.id);
          if (categoryDishes.length === 0) return null;

          return (
            <div key={cat.id} id={cat.id} className="scroll-mt-36">
              {/* Category Header */}
              <div className="border-b-2 border-[#2B211D] pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#E94B35]">
                    Service {cat.code}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase text-[#2B211D]">
                    {cat.label}
                  </h2>
                </div>
                <span className="text-xs font-serif italic text-[#2B211D]/60">
                  {cat.sub}
                </span>
              </div>

              {/* Dish Items Listing */}
              <div className="divide-y divide-[#2B211D]/10">
                {categoryDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onMouseEnter={() => setActiveDish(dish)}
                    onMouseLeave={() => setActiveDish(null)}
                    className="py-5 sm:py-6 group transition-colors duration-200 hover:bg-[#2B211D]/[0.02] -mx-4 px-4 rounded-xl cursor-default flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B211D] group-hover:text-[#E94B35] transition-colors">
                          {dish.name}
                        </h3>
                        {dish.tags?.map((t) => (
                          <span
                            key={t}
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                              t === 'Signature'
                                ? 'bg-[#E94B35] text-white'
                                : 'bg-[#2B211D]/10 text-[#2B211D]/70'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="mt-1.5 text-xs sm:text-sm text-[#2B211D]/75 font-sans leading-relaxed max-w-3xl">
                        {dish.description}
                      </p>

                      {dish.pairing && (
                        <p className="mt-2 text-xs font-serif italic text-[#697348] flex items-center gap-1.5">
                          <span>Accord conseillé :</span>
                          <span className="font-semibold">{dish.pairing}</span>
                        </p>
                      )}

                      {/* Mobile tap to view image button */}
                      <button
                        onClick={() => setMobileModalDish(dish)}
                        className="mt-3 md:hidden inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#E94B35] uppercase tracking-wider"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Aperçu photo</span>
                      </button>
                    </div>

                    {/* Price and Thumbnail */}
                    <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                      <span className="font-serif text-2xl font-bold text-[#2B211D]">
                        {dish.price} €
                      </span>

                      {/* Dish Thumbnail */}
                      <div
                        onClick={() => setMobileModalDish(dish)}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-[#2B211D]/15 shadow-xs cursor-pointer group-hover:scale-105 transition-transform bg-[#2B211D]/5"
                        title="Cliquer pour voir la photo"
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Reservation Callout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="bg-[#2B211D] text-[#FFF9EF] p-10 sm:p-14 rounded-3xl shadow-xl">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase">
            La Bonne Cuisine Mérite une Belle Table.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#FFF9EF]/75 font-sans max-w-lg mx-auto">
            Réservez pour deux ou venez avec tous vos amis. L'apéritivo commence à midi et se poursuit jusque tard dans la nuit.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                navigate('/book-a-table');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md transition-colors"
            >
              <span>Réserver une table</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                navigate('/private-dining');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 border border-[#FFF9EF]/30 hover:border-[#FFF9EF] text-[#FFF9EF] px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Repas de groupe & privatisation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dish Modal Preview (when tapped) */}
      {mobileModalDish && (
        <div
          className="fixed inset-0 z-50 bg-[#2B211D]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setMobileModalDish(null)}
        >
          <div
            className="bg-[#FFF9EF] rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#2B211D]/20 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-[#2B211D]/5">
              <img
                src={mobileModalDish.image}
                alt={mobileModalDish.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 right-3 bg-[#E94B35] text-white font-serif text-sm font-bold px-3 py-1 rounded-full shadow-md">
                {mobileModalDish.price} €
              </span>
            </div>
            <div className="p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E94B35] block mb-1">
                {mobileModalDish.courseName}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2B211D]">
                {mobileModalDish.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#2B211D]/75 font-sans leading-relaxed">
                {mobileModalDish.description}
              </p>
              {mobileModalDish.pairing && (
                <div className="mt-3 pt-3 border-t border-[#2B211D]/10 text-xs italic text-[#697348]">
                  Accord conseillé : <strong className="text-[#2B211D]">{mobileModalDish.pairing}</strong>
                </div>
              )}
              <div className="mt-6">
                <button
                  onClick={() => setMobileModalDish(null)}
                  className="w-full bg-[#2B211D] text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
