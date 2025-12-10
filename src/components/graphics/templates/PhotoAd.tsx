import React from 'react';

interface PhotoAdProps {
  data: {
    image?: string;
    headline?: string;
    subheadline?: string;
    tagline?: string;
    logoText?: string;
  };
}

const PhotoAd: React.FC<PhotoAdProps> = ({ data }) => {
  return (
    <div className="relative w-[1080px] h-[1080px] bg-zinc-100 overflow-hidden">
      {/* Background Photo */}
      {data.image ? (
        <img 
          src={data.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
          <span className="text-zinc-400 text-2xl">+ Dodaj zdjęcie</span>
        </div>
      )}

      {/* Logo top right */}
      {data.logoText && (
        <div className="absolute top-8 right-8 z-10">
          <span className="text-zinc-800 text-xl font-light italic tracking-wide">
            {data.logoText}
          </span>
        </div>
      )}

      {/* Logo bottom left */}
      {data.logoText && (
        <div className="absolute bottom-8 left-8 z-10">
          <span className="text-zinc-800 text-lg font-light italic tracking-wide">
            {data.logoText}
          </span>
        </div>
      )}

      {/* Right side dark overlay with content */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] flex flex-col justify-center">
        {/* Headline section */}
        <div className="bg-zinc-900/90 px-12 py-8 mb-4">
          <h1 className="text-white text-7xl font-black uppercase leading-none tracking-tight">
            {data.headline || 'UWAGA KOBIETO'}
          </h1>
          
          {/* Golden arrow */}
          <div className="flex justify-center mt-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-amber-500">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Subheadline */}
        <div className="bg-zinc-900/90 px-12 py-6 mb-4">
          <p className="text-white text-2xl font-bold uppercase leading-relaxed">
            {data.subheadline || 'Odbierz spersonalizowany plan pielęgnacyjny!'}
          </p>
        </div>

        {/* Tagline at bottom */}
        <div className="absolute bottom-12 right-0 left-0">
          <div className="bg-zinc-900/90 px-12 py-6">
            <p className="text-white text-3xl font-black uppercase">
              {data.tagline || 'Twój wizerunek'}
            </p>
            <p className="text-amber-500 text-3xl font-black uppercase">
              zaczyna się tutaj!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoAd;