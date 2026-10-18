import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, RotateCcw, Check, X, Search, Image as ImageIcon, 
  Tag, Utensils, Calendar, Sparkles, AlertCircle, ArrowLeft, Eye, EyeOff,
  Lock, Unlock, ShieldCheck, KeyRound, LogOut 
} from 'lucide-react';
import { 
  getStoredMenu, saveStoredMenu, resetStoredMenu, 
  getStoredEvents, saveStoredEvents, resetStoredEvents 
} from '../data/storage';
import { MENU_CATEGORIES } from '../data/restaurantData';

const COMMON_TAGS = [
  'Signature', 'Végétarien', 'Végétalien', 'Sans Gluten', 
  'Bio & Nature', 'Pêche Locale', 'À Partager'
];

export default function ManagerPage({ navigate }) {
  // Authentication & Security Gate
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('santo_manager_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState('menu'); // 'menu' | 'events'
  const [menuItems, setMenuItems] = useState(() => getStoredMenu());
  const [events, setEvents] = useState(() => getStoredEvents());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = passwordInput.trim().toLowerCase();
    // Unique secure password (with aliases for convenience)
    if (clean === 'santomare13' || clean === 'santo13' || clean === 'santomare') {
      sessionStorage.setItem('santo_manager_auth', 'true');
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('santo_manager_auth');
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError(false);
  };

  // Dish modal state
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({
    name: '',
    courseId: 'course-01',
    courseName: 'Nos Entrées',
    price: 15,
    description: '',
    image: '',
    pairing: '',
    tags: []
  });
  const [newTagInput, setNewTagInput] = useState('');

  // Event modal state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    targetDate: '',
    service: 'dinner',
    badge: 'Soirée Spéciale',
    highlight: '',
    desc: '',
    longDescription: '',
    image: ''
  });

  const showNotification = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Sync state if other tabs change
  useEffect(() => {
    const handleSync = () => {
      setMenuItems(getStoredMenu());
      setEvents(getStoredEvents());
    };
    window.addEventListener('santo_data_updated', handleSync);
    return () => window.removeEventListener('santo_data_updated', handleSync);
  }, []);

  // --- DISH ACTIONS ---
  const handleOpenAddDish = () => {
    setEditingDish(null);
    setDishForm({
      name: '',
      courseId: 'course-01',
      courseName: 'Nos Entrées',
      price: 16,
      description: '',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      pairing: '',
      tags: ['Signature']
    });
    setNewTagInput('');
    setIsDishModalOpen(true);
  };

  const handleOpenEditDish = (dish) => {
    setEditingDish(dish);
    setDishForm({
      name: dish.name || '',
      courseId: dish.courseId || 'course-01',
      courseName: dish.courseName || 'Nos Entrées',
      price: dish.price || 0,
      description: dish.description || '',
      image: dish.image || '',
      pairing: dish.pairing || '',
      tags: Array.isArray(dish.tags) ? [...dish.tags] : []
    });
    setNewTagInput('');
    setIsDishModalOpen(true);
  };

  const handleSaveDish = (e) => {
    e.preventDefault();
    if (!dishForm.name.trim()) return;

    // Resolve courseName
    const cat = MENU_CATEGORIES.find((c) => c.id === dishForm.courseId);
    const courseName = cat ? cat.label : 'Plat';

    let updated;
    if (editingDish) {
      updated = menuItems.map((item) =>
        item.id === editingDish.id
          ? { ...item, ...dishForm, courseName, price: Number(dishForm.price) }
          : item
      );
      showNotification(`Le plat "${dishForm.name}" a été modifié.`);
    } else {
      const newDish = {
        ...dishForm,
        id: `custom-${Date.now()}`,
        courseName,
        price: Number(dishForm.price)
      };
      updated = [newDish, ...menuItems];
      showNotification(`Nouveau plat "${dishForm.name}" ajouté à la carte.`);
    }

    saveStoredMenu(updated);
    setMenuItems(updated);
    setIsDishModalOpen(false);
  };

  const handleDeleteDish = (dishId) => {
    const dish = menuItems.find((d) => d.id === dishId);
    if (!dish) return;
    if (window.confirm(`Confirmez-vous la suppression de "${dish.name}" ?`)) {
      const updated = menuItems.filter((d) => d.id !== dishId);
      saveStoredMenu(updated);
      setMenuItems(updated);
      showNotification(`"${dish.name}" a été retiré de la carte.`, 'info');
    }
  };

  const handleAddTag = (tagToAdd) => {
    const clean = tagToAdd.trim();
    if (!clean) return;
    if (!dishForm.tags.includes(clean)) {
      setDishForm((prev) => ({ ...prev, tags: [...prev.tags, clean] }));
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setDishForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove)
    }));
  };

  // --- EVENT ACTIONS ---
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: '',
      date: 'Chaque Jeudi · 20h00',
      targetDate: new Date().toISOString().split('T')[0],
      service: 'dinner',
      badge: 'Soirée Spéciale',
      highlight: 'Ambiance festive & flacons d\'artisans',
      desc: 'Description courte pour la carte...',
      longDescription: 'Présentation complète de la soirée...',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title || '',
      date: event.date || '',
      targetDate: event.targetDate || '',
      service: event.service || 'dinner',
      badge: event.badge || '',
      highlight: event.highlight || '',
      desc: event.desc || '',
      longDescription: event.longDescription || event.desc || '',
      image: event.image || ''
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) return;

    let updated;
    if (editingEvent) {
      updated = events.map((ev) =>
        ev.id === editingEvent.id ? { ...ev, ...eventForm } : ev
      );
      showNotification(`L'événement "${eventForm.title}" a été mis à jour.`);
    } else {
      const newEv = {
        ...eventForm,
        id: `ev-${Date.now()}`
      };
      updated = [...events, newEv];
      showNotification(`Nouvel événement "${eventForm.title}" ajouté à l'agenda.`);
    }

    saveStoredEvents(updated);
    setEvents(updated);
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    const ev = events.find((e) => e.id === eventId);
    if (!ev) return;
    if (window.confirm(`Confirmez-vous la suppression de l'événement "${ev.title}" ?`)) {
      const updated = events.filter((e) => e.id !== eventId);
      saveStoredEvents(updated);
      setEvents(updated);
      showNotification(`"${ev.title}" a été supprimé de l'agenda.`, 'info');
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Voulez-vous réinitialiser toute la carte et tous les événements aux valeurs par défaut d\'origine ?')) {
      resetStoredMenu();
      resetStoredEvents();
      setMenuItems(getStoredMenu());
      setEvents(getStoredEvents());
      showNotification('Carte et événements réinitialisés avec succès !');
    }
  };

  // Filtered menu
  const filteredDishes = menuItems.filter((dish) => {
    const matchesCat = categoryFilter === 'all' || dish.courseId === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(dish.tags && dish.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  // Security Gate: Password Required
  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-24 bg-[#FFF9EF] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#FFFCF7] rounded-3xl p-8 sm:p-10 border border-[#2B211D]/15 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
          {/* Security Badge & Lock Icon */}
          <div className="w-16 h-16 rounded-full bg-[#E94B35]/10 text-[#E94B35] flex items-center justify-center mx-auto mb-6 border border-[#E94B35]/25">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
            Zone Sécurisée · Santo Mare
          </span>
          <h1 className="font-serif text-3xl font-bold uppercase text-[#2B211D]">
            Espace Gestionnaire
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#2B211D]/75 font-sans leading-relaxed">
            Cet espace de gestion est strictement réservé à la direction et à l'équipe du restaurant. Veuillez renseigner le mot de passe unique pour accéder au back-office.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#2B211D]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Mot de passe d'accès..."
                required
                className={`w-full pl-11 pr-11 py-3 rounded-full border text-sm font-sans focus:outline-none transition-all ${
                  passwordError
                    ? 'border-[#D33822] bg-[#D33822]/5 text-[#D33822]'
                    : 'border-[#2B211D]/20 bg-white text-[#2B211D] focus:border-[#E94B35]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2B211D]/40 hover:text-[#2B211D] cursor-pointer"
                aria-label="Afficher ou masquer le mot de passe"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {passwordError && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#D33822] font-semibold animate-in fade-in">
                <AlertCircle className="w-4 h-4" />
                <span>Mot de passe incorrect. Veuillez réessayer.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#E94B35] hover:bg-[#D33822] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Déverrouiller l'Espace</span>
            </button>
          </form>

          {/* Helper Note for Convenience */}
          <div className="mt-6 pt-6 border-t border-[#2B211D]/10 text-center">
            <p className="text-[11px] text-[#2B211D]/55 font-sans">
              Mot de passe unique : <code className="bg-[#2B211D]/5 px-2 py-0.5 rounded font-mono font-bold text-[#E94B35]">santomare13</code>
            </p>
            <button
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 text-xs font-semibold text-[#2B211D]/60 hover:text-[#2B211D] uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retourner sur le site</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFF9EF] min-h-screen">
      {/* Toast Notification */}
      {feedback && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-[#2B211D] text-[#FFF9EF] px-5 py-3 rounded-2xl shadow-2xl border border-[#E94B35]/40 flex items-center gap-3">
            <Check className="w-5 h-5 text-[#E94B35]" />
            <span className="text-xs sm:text-sm font-semibold">{feedback.msg}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 border-b border-[#2B211D]/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#E94B35] mb-1">
              <span>Back-office & Gestion</span>
              <span>·</span>
              <span>Accès Sécurisé</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
              Espace Gestionnaire
            </h1>
            <p className="text-xs sm:text-sm text-[#2B211D]/75 font-sans mt-1">
              Pilotez la carte du restaurant (prix, plats, photos, étiquettes) et l'agenda des événements en direct.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#2B211D]/20 text-[#2B211D]/70 hover:text-[#E94B35] hover:border-[#E94B35] transition-colors cursor-pointer bg-white/40"
              title="Restaurer la carte et les événements d'origine"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>

            <button
              onClick={() => {
                navigate(activeTab === 'menu' ? '/menu' : '/#whats-on');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full bg-[#2B211D] text-white hover:bg-[#E94B35] transition-colors cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>Voir le rendu public</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#2B211D]/20 text-[#2B211D]/70 hover:text-[#D33822] hover:border-[#D33822] transition-colors cursor-pointer bg-white/40"
              title="Verrouiller l'espace gestionnaire"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 flex items-center gap-3 border-b border-[#2B211D]/10 pb-0">
          <button
            onClick={() => setActiveTab('menu')}
            className={`pb-4 px-3 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'menu'
                ? 'border-[#E94B35] text-[#E94B35]'
                : 'border-transparent text-[#2B211D]/60 hover:text-[#2B211D]'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Carte & Menus</span>
            <span className="text-[11px] bg-[#2B211D]/10 px-2 py-0.5 rounded-full text-[#2B211D]">
              {menuItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-3 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'events'
                ? 'border-[#E94B35] text-[#E94B35]'
                : 'border-transparent text-[#2B211D]/60 hover:text-[#2B211D]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Événements & Soirées</span>
            <span className="text-[11px] bg-[#2B211D]/10 px-2 py-0.5 rounded-full text-[#2B211D]">
              {events.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= TAB 1: MENU MANAGEMENT ================= */}
        {activeTab === 'menu' && (
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {MENU_CATEGORIES.map((cat) => {
                  const isSelected = categoryFilter === cat.id;
                  const count =
                    cat.id === 'all'
                      ? menuItems.length
                      : menuItems.filter((d) => d.courseId === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#E94B35] text-white shadow-xs'
                          : 'bg-[#2B211D]/5 text-[#2B211D]/80 hover:bg-[#2B211D]/10'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search + Add Button */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2B211D]/50" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un plat, tag..."
                    className="pl-10 pr-4 py-2 text-xs rounded-full border border-[#2B211D]/20 bg-white/70 focus:outline-none focus:border-[#E94B35] w-56 sm:w-64"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2B211D]/40 hover:text-[#2B211D]"
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  onClick={handleOpenAddDish}
                  className="inline-flex items-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un plat</span>
                </button>
              </div>
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-[#FFFCF7] rounded-3xl border border-[#2B211D]/12 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Image Preview & Badge */}
                    <div className="relative aspect-[16/10] bg-[#2B211D]/5 overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#2B211D]/80 backdrop-blur-xs text-[#FFF9EF] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {dish.courseName}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#E94B35] text-white font-serif text-sm font-bold px-3 py-1 rounded-full shadow-md">
                        {dish.price} €
                      </div>
                    </div>

                    {/* Dish Body */}
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-bold text-[#2B211D]">
                        {dish.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#2B211D]/75 font-sans leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>

                      {dish.pairing && (
                        <p className="mt-2 text-[11px] font-serif italic text-[#697348]">
                          Accord : <strong>{dish.pairing}</strong>
                        </p>
                      )}

                      {/* Tag Chips */}
                      {dish.tags && dish.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {dish.tags.map((t) => (
                            <span
                              key={t}
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                t === 'Signature'
                                  ? 'bg-[#E94B35] text-white'
                                  : 'bg-[#2B211D]/10 text-[#2B211D]/70'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 bg-[#FFF9EF] border-t border-[#2B211D]/10 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditDish(dish)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#2B211D] hover:bg-[#2B211D]/10 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDish(dish.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D33822] hover:bg-[#D33822]/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDishes.length === 0 && (
              <div className="text-center py-16 bg-[#FFFCF7] rounded-3xl border border-dashed border-[#2B211D]/20">
                <p className="font-serif text-xl text-[#2B211D]/70">Aucun plat ne correspond à vos filtres.</p>
                <button
                  onClick={() => { setCategoryFilter('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs uppercase font-bold text-[#E94B35] underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: EVENTS MANAGEMENT ================= */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2B211D]">
                  Agenda des Soirées
                </h2>
                <p className="text-xs text-[#2B211D]/70 font-sans mt-0.5">
                  Ces événements apparaissent directement sur la page d'accueil avec possibilité de réservation dédiée.
                </p>
              </div>

              <button
                onClick={handleOpenAddEvent}
                className="inline-flex items-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un événement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-[#FFFCF7] rounded-3xl border border-[#2B211D]/12 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Event Photo */}
                    <div className="relative aspect-[16/10] bg-[#2B211D]/5 overflow-hidden">
                      <img
                        src={ev.image || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#E94B35] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                        {ev.badge}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-[#2B211D]/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full">
                        {ev.date}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-2xl font-bold text-[#2B211D]">
                        {ev.title}
                      </h3>
                      <p className="text-xs font-serif italic text-[#397DD8] mt-1">
                        {ev.highlight}
                      </p>
                      <p className="mt-2 text-xs text-[#2B211D]/75 font-sans leading-relaxed line-clamp-3">
                        {ev.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FFF9EF] border-t border-[#2B211D]/10 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditEvent(ev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#2B211D] hover:bg-[#2B211D]/10 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D33822] hover:bg-[#D33822]/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: EDIT / ADD DISH ================= */}
      {isDishModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2B211D]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsDishModalOpen(false)}
        >
          <div
            className="bg-[#FFF9EF] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#2B211D]/20 my-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#2B211D]/10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#2B211D]">
                {editingDish ? 'Modifier le Plat' : 'Ajouter un Nouveau Plat'}
              </h2>
              <button
                onClick={() => setIsDishModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#2B211D]/10 flex items-center justify-center text-[#2B211D] hover:bg-[#E94B35] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="mt-6 space-y-5">
              {/* Name & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                    Nom du Plat *
                  </label>
                  <input
                    type="text"
                    required
                    value={dishForm.name}
                    onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                    placeholder="ex. Linguine alle Vongole"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={dishForm.price}
                    onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  Catégorie du Menu
                </label>
                <select
                  value={dishForm.courseId}
                  onChange={(e) => setDishForm({ ...dishForm, courseId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                >
                  {MENU_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label} ({c.sub})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  Description & Ingrédients
                </label>
                <textarea
                  rows={3}
                  value={dishForm.description}
                  onChange={(e) => setDishForm({ ...dishForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  placeholder="Détaillez la recette, les provenances locales..."
                />
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  URL de la Photo
                </label>
                <input
                  type="url"
                  value={dishForm.image}
                  onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  placeholder="https://..."
                />
                {dishForm.image && (
                  <div className="mt-2 w-28 h-20 rounded-xl overflow-hidden border border-[#2B211D]/20">
                    <img src={dishForm.image} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Accord Conseillé */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  Accord Boisson / Vin Conseillé
                </label>
                <input
                  type="text"
                  value={dishForm.pairing}
                  onChange={(e) => setDishForm({ ...dishForm, pairing: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  placeholder="ex. Bandol Blanc · Domaine Tempier"
                />
              </div>

              {/* Tags Management */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1.5">
                  Étiquettes / Tags
                </label>
                {/* Active Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {dishForm.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 bg-[#E94B35] text-white text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:opacity-75 cursor-pointer text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {dishForm.tags.length === 0 && (
                    <span className="text-xs text-[#2B211D]/50 italic">Aucune étiquette</span>
                  )}
                </div>

                {/* Add Tag Row */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag(newTagInput);
                      }
                    }}
                    placeholder="Ajouter une étiquette..."
                    className="flex-1 px-4 py-2 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-xs focus:border-[#E94B35] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddTag(newTagInput)}
                    className="bg-[#2B211D] text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#E94B35] transition-colors"
                  >
                    Ajouter
                  </button>
                </div>

                {/* Common Suggestions */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-[#2B211D]/60 uppercase tracking-wider font-bold">Suggestions :</span>
                  {COMMON_TAGS.map((suggested) => (
                    <button
                      key={suggested}
                      type="button"
                      onClick={() => handleAddTag(suggested)}
                      disabled={dishForm.tags.includes(suggested)}
                      className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${
                        dishForm.tags.includes(suggested)
                          ? 'opacity-40 border-[#2B211D]/10 bg-transparent'
                          : 'border-[#2B211D]/20 hover:border-[#E94B35] hover:text-[#E94B35]'
                      }`}
                    >
                      + {suggested}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#2B211D]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDishModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B211D]/70 hover:text-[#2B211D]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#E94B35] hover:bg-[#D33822] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Enregistrer le Plat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / ADD EVENT ================= */}
      {isEventModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#2B211D]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsEventModalOpen(false)}
        >
          <div
            className="bg-[#FFF9EF] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#2B211D]/20 my-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#2B211D]/10">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-[#2B211D]">
                {editingEvent ? 'Modifier l\'Événement' : 'Créer un Événement'}
              </h2>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#2B211D]/10 flex items-center justify-center text-[#2B211D] hover:bg-[#E94B35] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="mt-6 space-y-4">
              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                    Titre de l'Événement *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                    placeholder="ex. Soirée Disco & Vins Vivants"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                    Pastille / Badge *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.badge}
                    onChange={(e) => setEventForm({ ...eventForm, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                    placeholder="ex. DJ Set & Vinyles"
                  />
                </div>
              </div>

              {/* Date & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                    Date & Horaires (Affichage) *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                    placeholder="ex. Chaque Vendredi · 21h00 — 01h30"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                    Service par Défaut
                  </label>
                  <select
                    value={eventForm.service}
                    onChange={(e) => setEventForm({ ...eventForm, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  >
                    <option value="dinner">Dîner / Soirée (Soir)</option>
                    <option value="lunch">Déjeuner (Midi)</option>
                  </select>
                </div>
              </div>

              {/* Highlight */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  Accroche / Slogan
                </label>
                <input
                  type="text"
                  value={eventForm.highlight}
                  onChange={(e) => setEventForm({ ...eventForm, highlight: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  placeholder="ex. Sélection vinyles funk, italo-disco et quilles sauvages"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  URL de l'Image de l'Événement
                </label>
                <input
                  type="url"
                  value={eventForm.image}
                  onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  placeholder="https://..."
                />
                {eventForm.image && (
                  <div className="mt-2 w-36 h-20 rounded-xl overflow-hidden border border-[#2B211D]/20">
                    <img src={eventForm.image} alt="Aperçu événement" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  Description Courte (Affichée sur la carte)
                </label>
                <textarea
                  rows={2}
                  value={eventForm.desc}
                  onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                />
              </div>

              {/* Long Description (for Modal) */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-[#2B211D] block mb-1">
                  Description Complète (Affichée dans la fenêtre "À propos")
                </label>
                <textarea
                  rows={4}
                  value={eventForm.longDescription}
                  onChange={(e) => setEventForm({ ...eventForm, longDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2B211D]/20 bg-white font-sans text-sm focus:border-[#E94B35] focus:outline-none"
                  placeholder="Racontez le déroulement complet, les DJs invités, la carte des boissons spécifique..."
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#2B211D]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#2B211D]/70 hover:text-[#2B211D]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#E94B35] hover:bg-[#D33822] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Enregistrer l'Événement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
