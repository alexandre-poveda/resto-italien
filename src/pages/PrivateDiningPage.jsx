import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Users, CheckCircle2, GlassWater, Music, Utensils, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRIVATE_DINING_PACKAGES, RESTAURANT_INFO } from '../data/restaurantData';
import BlurRevealTitle from '../components/BlurRevealTitle';

export default function PrivateDiningPage({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '20',
    occasion: 'anniversary',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `SM-PRIV-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryId(id);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#E94B35', '#397DD8', '#F4E6A8']
      });
    } catch (e) {}

    const el = document.getElementById('enquire');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 bg-[#FFF9EF] min-h-screen">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#2B211D]/10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2B211D]/10 text-xs tracking-widest uppercase font-semibold text-[#2B211D]/75">
          <span>PRIVATISATION & ÉVÉNEMENTS · SANTO MARE</span>
          <span className="text-[#E94B35]">DE 8 À 90 CONVIVES</span>
        </div>

        <div className="pt-10 sm:pt-14 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E94B35] block mb-2">
            Invitez Tout le Monde.
          </span>
          <BlurRevealTitle as="h1" className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold uppercase text-[#2B211D] tracking-tight leading-[0.95]">
            Faisons un Plan.
          </BlurRevealTitle>
          <p className="mt-4 text-base sm:text-lg text-[#2B211D]/80 font-sans">
            Un déjeuner d'anniversaire au soleil. Un grand dîner de famille qui s'éternise. Une fête d'entreprise face aux flots bleus. Donnez-vous une vraie raison de vous rassembler autour de la même table.
          </p>
        </div>
      </div>

      {/* Hero Photo Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/8] shadow-xl border border-[#2B211D]/15">
          <img
            src="https://framerusercontent.com/images/oOasiftP6OiUK3TlYBldiT4ygg.webp"
            alt="La grande tablée du Santo Mare avant le premier verre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B211D]/85 via-[#2B211D]/20 to-transparent flex items-end p-6 sm:p-12 text-white">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F4E6A8] block mb-1">
                La Table, Avant le Premier Verre
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-bold">
                Des souvenirs inoubliables gravés face à la mer Méditerranée.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Packages Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-2">
            Nos Formules Sur-Mesure
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-[#2B211D]">
            Choisissez Votre Ambiance.
          </h2>
          <p className="text-sm sm:text-base text-[#2B211D]/75 font-sans mt-2">
            Du dîner intimiste entre proches à la privatisation festive complète de tout l'établissement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRIVATE_DINING_PACKAGES.map((pkg) => (
            <div
              key={pkg.number}
              className="bg-[#FFFCF7] p-8 rounded-3xl border border-[#2B211D]/15 hover:border-[#E94B35] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#E94B35]">
                    {pkg.number}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2B211D]/70 bg-[#2B211D]/5 px-3 py-1 rounded-full">
                    {pkg.capacity}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#2B211D] mb-3">
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2B211D]/75 font-sans leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-2 border-t border-[#2B211D]/10 pt-4">
                  {pkg.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#2B211D]/80 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#697348] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2B211D]/10">
                <a
                  href="#enquire"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2B211D] hover:bg-[#E94B35] text-white py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  <span>Demander un devis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form Section */}
      <div id="enquire" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 scroll-mt-24">
        <div className="bg-[#FFFCF7] p-8 sm:p-14 rounded-3xl border border-[#2B211D]/15 shadow-md">
          {submitted ? (
            <div className="text-center py-8 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#697348]/15 text-[#697348] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-1">
                Demande transmise · Réf : {inquiryId}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211D]">
                Merci, {formData.name} !
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#2B211D]/75 font-sans max-w-md mx-auto">
                Notre responsable des événements prend connaissance de votre projet pour environ <strong>{formData.guests} convives</strong> le <strong>{formData.date}</strong>. Nous vous recontactons sous 24h ouvrées.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#2B211D] text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#E94B35] transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest font-bold text-[#E94B35] block mb-1">
                  Formulaire de Contact
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B211D]">
                  Votre Occasion.
                </h3>
                <p className="text-sm text-[#2B211D]/70 font-sans mt-2">
                  Indiquez-nous la date envisagée, le nombre d'invités attendus et ce que vous avez en tête. Nous adapterons le menu et l'espace à vos envies.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                      Prénom & Nom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Éléonore Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                      Adresse Courriel *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: eleonore@domaine.fr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: +33 6 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                      Date Envisagée *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                      Nombre d'Invités ({formData.guests})
                    </label>
                    <input
                      type="number"
                      min="6"
                      max="120"
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                    Type d'Événement
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                  >
                    <option value="anniversary">Anniversaire / Célébration personnelle</option>
                    <option value="wedding">Mariage / Fiançailles / Baptême</option>
                    <option value="corporate">Repas d'entreprise / Soirée d'équipe</option>
                    <option value="dinner">Dîner dégustation privé & accord vins</option>
                    <option value="other">Autre projet particulier</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#2B211D] block mb-2">
                    Vos Souhaits & Détails Particuliers
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Parlez-nous de l'ambiance désirée, du créneau (déjeuner ou dîner), de préférences de menu ou d'animations musicales..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FFF9EF] border border-[#2B211D]/20 rounded-xl px-4 py-3 text-xs font-sans text-[#2B211D] focus:outline-hidden focus:border-[#E94B35]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                >
                  <span>Envoyer ma demande de privatisation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-[#2B211D]/50 text-center font-sans">
                  Réponse personnalisée garantie sous 24 heures par notre directrice d'événement.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
