import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles, AlertCircle, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/restaurantData';
import BlurRevealTitle from '../components/BlurRevealTitle';

export default function BookTablePage({ navigate }) {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [service, setService] = useState('dinner'); // 'lunch' or 'dinner'
  const [timeSlot, setTimeSlot] = useState('20:00');
  const [seating, setSeating] = useState('terrace'); // 'terrace', 'main', 'counter'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietary, setDietary] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Check URL params for event-linked reservations
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ev = params.get('event');
    const d = params.get('date');
    const s = params.get('service');
    if (ev) {
      setSelectedEvent(ev);
      setDietary((prev) => (prev ? `${prev} · Événement : ${ev}` : `Participation à : ${ev}`));
    }
    if (d) setDate(d);
    if (s === 'lunch' || s === 'dinner') setService(s);
  }, []);

  const lunchSlots = ['12:00', '12:30', '13:00', '13:30', '14:00'];
  const dinnerSlots = ['19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

  const activeSlots = service === 'lunch' ? lunchSlots : dinnerSlots;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const ref = `SM-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E94B35', '#397DD8', '#F4E6A8', '#697348']
      });
    } catch (err) {
      // safe fallback if canvas confetti isn't available
    }

    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const seatingLabels = {
    terrace: 'Terrasse face à la mer (sous les parasols)',
    main: 'Salle intérieure (banquettes & chêne ciré)',
    counter: 'Comptoir du chef (vue directe sur la cuisine)'
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFF9EF] min-h-screen">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-[#2B211D]/10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2B211D]/10 text-xs tracking-widest uppercase font-semibold text-[#2B211D]/75">
          <span>RÉSERVATIONS · SANTO MARE</span>
          <span className="text-[#E94B35]">DÉJEUNER · DÎNER · BONNE COMPAGNIE</span>
        </div>

        <div className="pt-10 sm:pt-14 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E94B35] block mb-2">
            Votre Table. Notre Maison.
          </span>
          <BlurRevealTitle as="h1" className="font-serif text-5xl sm:text-7xl font-bold uppercase text-[#2B211D] tracking-tight leading-[0.95]">
            Prenez Date.
          </BlurRevealTitle>
          <p className="mt-4 text-base sm:text-lg text-[#2B211D]/80 font-sans">
            Venez pour le déjeuner. Restez pour le dîner. Prenez le temps des deux. Les réservations sont ouvertes 30 jours à l'avance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {isSubmitted ? (
          /* Confirmation State */
          <div className="max-w-2xl mx-auto bg-[#FFFCF7] p-8 sm:p-12 rounded-3xl border-2 border-[#697348] shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#697348]/15 text-[#697348] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-1">
              Réservation Confirmée · Réf : {bookingRef}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211D]">
              Votre table est prête, {name}.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#2B211D]/75 font-sans">
              Nous avons bien enregistré votre venue au Santo Mare. Un courriel de confirmation détaillé vient de vous être adressé à <strong className="text-[#2B211D]">{email}</strong>.
            </p>

            <div className="my-8 p-6 bg-[#FFF9EF] rounded-2xl border border-[#2B211D]/10 text-left space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex justify-between border-b border-[#2B211D]/10 pb-2">
                <span className="text-[#2B211D]/60">Date & Heure :</span>
                <strong className="text-[#2B211D]">{date} à {timeSlot}</strong>
              </div>
              <div className="flex justify-between border-b border-[#2B211D]/10 pb-2">
                <span className="text-[#2B211D]/60">Nombre de convives :</span>
                <strong className="text-[#2B211D]">{guests} personne{Number(guests) > 1 ? 's' : ''}</strong>
              </div>
              <div className="flex justify-between border-b border-[#2B211D]/10 pb-2">
                <span className="text-[#2B211D]/60">Emplacement :</span>
                <strong className="text-[#2B211D]">{seatingLabels[seating]}</strong>
              </div>
              <div className="flex justify-between border-b border-[#2B211D]/10 pb-2">
                <span className="text-[#2B211D]/60">Téléphone de contact :</span>
                <strong className="text-[#2B211D]">{phone}</strong>
              </div>
              {dietary && (
                <div className="flex justify-between pt-1">
                  <span className="text-[#2B211D]/60">Note spéciale :</span>
                  <span className="text-[#2B211D] italic">{dietary}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#2B211D] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#E94B35] transition-colors"
              >
                Modifier ou refaire une réservation
              </button>
              <button
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-[#2B211D]/25 text-[#2B211D] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:border-[#2B211D] transition-colors"
              >
                Consulter la carte
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#FFFCF7] p-6 sm:p-10 rounded-3xl border border-[#2B211D]/15 shadow-sm space-y-8">
              {/* Event highlight if linked from event */}
              {selectedEvent && (
                <div className="bg-[#E94B35]/10 border border-[#E94B35]/30 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#E94B35] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#E94B35] block">
                        Réservation pour Soirée Spéciale
                      </span>
                      <span className="font-serif font-bold text-[#2B211D] text-base">
                        {selectedEvent}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="text-xs text-[#2B211D]/60 hover:text-[#2B211D] underline"
                  >
                    Changer
                  </button>
                </div>
              )}

              {/* Step 1: Convives */}
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-[#2B211D] block mb-3">
                  1. Nombre de Convives
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-3 rounded-xl font-serif text-lg font-bold border transition-all ${
                        guests === num
                          ? 'bg-[#E94B35] text-white border-[#E94B35] shadow-sm'
                          : 'bg-[#FFF9EF] text-[#2B211D] border-[#2B211D]/15 hover:border-[#2B211D]/40'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {guests === '8+' && (
                  <p className="mt-2 text-xs text-[#E94B35] font-sans">
                    Pour les groupes de 8 personnes et plus, nous vous conseillons nos menus de groupe ou notre espace privatif.
                  </p>
                )}
              </div>

              {/* Step 2: Date */}
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-[#2B211D] block mb-3">
                  2. Date de Venue
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3.5 text-sm font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35] focus:ring-1 focus:ring-[#E94B35]"
                  />
                </div>
              </div>

              {/* Step 3: Service & Heure */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase font-bold tracking-widest text-[#2B211D] block">
                    3. Service & Heure d'Arrivée
                  </label>
                  <div className="flex bg-[#2B211D]/5 p-1 rounded-full border border-[#2B211D]/10">
                    <button
                      type="button"
                      onClick={() => {
                        setService('lunch');
                        setTimeSlot('12:30');
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                        service === 'lunch' ? 'bg-[#2B211D] text-white' : 'text-[#2B211D]/60'
                      }`}
                    >
                      Midi (12h-15h)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setService('dinner');
                        setTimeSlot('20:00');
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                        service === 'dinner' ? 'bg-[#2B211D] text-white' : 'text-[#2B211D]/60'
                      }`}
                    >
                      Soir (19h30-23h)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {activeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 rounded-xl font-serif text-sm font-bold border transition-all ${
                        timeSlot === slot
                          ? 'bg-[#E94B35] text-white border-[#E94B35] shadow-xs'
                          : 'bg-[#FFF9EF] text-[#2B211D] border-[#2B211D]/15 hover:border-[#2B211D]/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Emplacement */}
              <div>
                <label className="text-xs uppercase font-bold tracking-widest text-[#2B211D] block mb-3">
                  4. Préférence d'Emplacement
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'terrace', label: 'Terrasse Mer', sub: 'Air marin & parasols' },
                    { id: 'main', label: 'Salle Principale', sub: 'Chêne clair & banquettes' },
                    { id: 'counter', label: 'Comptoir Chef', sub: 'Face aux fourneaux' },
                  ].map((seat) => (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => setSeating(seat.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        seating === seat.id
                          ? 'bg-[#FFF9EF] border-[#E94B35] shadow-xs ring-1 ring-[#E94B35]'
                          : 'bg-[#FFF9EF] border-[#2B211D]/15 hover:border-[#2B211D]/40'
                      }`}
                    >
                      <strong className="block font-serif text-sm font-bold text-[#2B211D]">
                        {seat.label}
                      </strong>
                      <span className="text-[11px] text-[#2B211D]/60 font-sans">
                        {seat.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Vos Coordonnées */}
              <div className="border-t border-[#2B211D]/10 pt-6 space-y-4">
                <label className="text-xs uppercase font-bold tracking-widest text-[#2B211D] block">
                  5. Vos Coordonnées
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Prénom & Nom *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Adresse courriel *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Numéro de téléphone *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Régimes, allergies ou occasion (optionnel)"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                <span>Confirmer ma réservation pour {guests} personne{Number(guests) > 1 ? 's' : ''}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#2B211D]/50 text-center font-sans">
                Confirmation instantanée sans frais. Annulation gratuite jusqu'à 2 heures avant le service.
              </p>
            </form>

            {/* Sidebar Summary & Complementary Sections */}
            <div className="lg:col-span-5 space-y-6">
              {/* Live Ticket Card */}
              <div className="bg-[#FFF9EF] p-6 rounded-3xl border border-[#2B211D]/15 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E94B35] block mb-2">
                  Récapitulatif de votre table
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2B211D]">
                  {guests} Convives · {timeSlot}
                </h3>
                <p className="text-xs text-[#2B211D]/70 font-sans mt-1">
                  {date} · {service === 'lunch' ? 'Service du Déjeuner' : 'Service du Dîner'}
                </p>

                <div className="mt-4 pt-4 border-t border-[#2B211D]/10 text-xs font-sans space-y-2 text-[#2B211D]/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#E94B35]" />
                    <span>{seatingLabels[seating]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E94B35]" />
                    <span>Pain focaccia tiède & eau fraîche offerts à l'arrivée</span>
                  </div>
                </div>
              </div>

              {/* "A Longer Table?" Card */}
              <div className="bg-[#2B211D] text-[#FFF9EF] p-6 rounded-3xl shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4E6A8] block mb-1">
                  Une plus longue tablée ?
                </span>
                <h4 className="font-serif text-xl font-bold">
                  Vous organisez un repas de groupe ou un anniversaire ?
                </h4>
                <p className="text-xs text-[#FFF9EF]/70 font-sans mt-2">
                  Nous privatisons notre salon de banquet marin ou la terrasse complète pour les événements de 10 à 90 personnes.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      navigate('/private-dining');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E94B35] hover:text-white transition-colors"
                  >
                    <span>Faire une demande de privatisation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* "Before You Come" Card */}
              <div className="bg-[#FFFCF7] p-6 rounded-3xl border border-[#2B211D]/15">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2B211D]/50 block mb-1">
                  Avant de venir
                </span>
                <h4 className="font-serif text-lg font-bold text-[#2B211D]">
                  Explorez les assiettes du moment
                </h4>
                <p className="text-xs text-[#2B211D]/70 font-sans mt-1">
                  Découvrez nos linguine au citron d'Amalfi, notre loup de mer et nos flacons vivants.
                </p>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      navigate('/menu');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2B211D] hover:text-[#E94B35] transition-colors"
                  >
                    <span>Voir toute la carte</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
