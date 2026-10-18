import React from 'react';

export default function Marquee({
  text = "PÊCHE LOCALE DU MATIN ★ PÂTES FRAÎCHES MAISON ★ VINS NATURELS & FLACONS VIVANTS ★ APÉRITIVO À L'ITALIENNE ★ EMBRUNS MARINS & BELLES NUITS ★ CUISINE CÔTIÈRE ★",
  reverse = false,
  bgColor = "bg-[#E94B35]",
  textColor = "text-white"
}) {
  const repeatedText = `${text} `.repeat(4);

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap py-3.5 sm:py-4.5 ${bgColor} ${textColor} border-y border-[#2B211D]/15 select-none relative z-10`}>
      <div
        className={`inline-block ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } font-serif text-sm sm:text-base tracking-[0.25em] uppercase font-bold`}
      >
        <span>{repeatedText}</span>
        <span>{repeatedText}</span>
      </div>
    </div>
  );
}
