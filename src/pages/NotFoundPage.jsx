import React from 'react';
import { ArrowUpRight, Compass, Utensils } from 'lucide-react';

export default function NotFoundPage({ navigate }) {
  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center justify-center bg-[#FFF9EF]">
      <div className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-full bg-[#E94B35]/10 text-[#E94B35] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '15s' }} />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E94B35] block mb-2">
          404 / Hors de la Carte
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold uppercase text-[#2B211D] tracking-tight">
          Cette Table n'Existe Pas.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#2B211D]/75 font-sans leading-relaxed">
          On dirait que vous vous êtes égaré dans les ruelles du Panier ou au large des calanques. Laissez-nous vous ramener au chaud chez Santo Mare.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E94B35] hover:bg-[#D33822] text-white px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
          >
            <span>Retour à l'accueil</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              navigate('/menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#2B211D]/25 hover:border-[#2B211D] text-[#2B211D] px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <Utensils className="w-4 h-4 text-[#2B211D]/60" />
            <span>Découvrir la carte</span>
          </button>
        </div>
      </div>
    </div>
  );
}
