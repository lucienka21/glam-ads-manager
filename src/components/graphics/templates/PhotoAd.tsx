import React from 'react';

interface PhotoAdProps {
  data: {
    image?: string;
    headline?: string;
    subheadline?: string;
    tagline?: string;
    taglineAccent?: string;
    logoText?: string;
  };
}

const PhotoAd: React.FC<PhotoAdProps> = ({ data }) => {
  return (
    <div className="relative w-[1080px] h-[1080px] overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Background Photo - full bleed */}
      {data.image ? (
        <img 
          src={data.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
          <span className="text-stone-400 text-3xl">+ Dodaj zdjęcie</span>
        </div>
      )}

      {/* Logo top right corner */}
      {data.logoText && (
        <div className="absolute top-10 right-10 z-20">
          <span 
            className="text-2xl tracking-wide"
            style={{ 
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#1a1a1a'
            }}
          >
            {data.logoText}
          </span>
        </div>
      )}

      {/* Logo bottom left corner */}
      {data.logoText && (
        <div className="absolute bottom-10 left-10 z-20">
          <span 
            className="text-xl tracking-wide"
            style={{ 
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#1a1a1a'
            }}
          >
            {data.logoText}
          </span>
        </div>
      )}

      {/* Main headline - right side, inline black box */}
      <div className="absolute right-0 top-[180px] z-10">
        <div 
          className="px-14 py-6"
          style={{ backgroundColor: 'rgba(10, 10, 10, 0.92)' }}
        >
          <h1 
            className="text-white text-right leading-[0.95]"
            style={{ 
              fontSize: '90px',
              fontWeight: 900,
              letterSpacing: '-2px',
              textTransform: 'uppercase'
            }}
          >
            {(data.headline || 'UWAGA KOBIETO').split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          
          {/* Golden arrow */}
          <div className="flex justify-end mt-5">
            <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
              <path 
                d="M16 0 L16 40 M4 28 L16 44 L28 28" 
                stroke="#C9A227" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Subheadline - right side */}
      <div className="absolute right-0 top-[440px] z-10">
        <div 
          className="px-14 py-5"
          style={{ backgroundColor: 'rgba(10, 10, 10, 0.92)' }}
        >
          <p 
            className="text-white text-right uppercase leading-snug"
            style={{ 
              fontSize: '28px',
              fontWeight: 700,
              maxWidth: '480px',
              letterSpacing: '0.5px'
            }}
          >
            {data.subheadline || 'Odbierz hair plan, czyli spersonalizowany plan pielęgnacyjny włosów!'}
          </p>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-12 right-0 left-0 z-10">
        <div 
          className="mx-10 px-10 py-6"
          style={{ backgroundColor: 'rgba(10, 10, 10, 0.92)' }}
        >
          <p 
            className="text-white uppercase text-center"
            style={{ 
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '1px'
            }}
          >
            {data.tagline || 'Twój wizerunek'}
          </p>
          <p 
            className="uppercase text-center mt-1"
            style={{ 
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '1px',
              color: '#C9A227'
            }}
          >
            {data.taglineAccent || 'zaczyna się od fryzury!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoAd;