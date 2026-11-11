import React, { useState } from 'react';
import { GalleryPhoto } from '../types/story';
import { MapPin, Maximize2, X, Sparkles } from 'lucide-react';

interface MemoryGalleryProps {
  title: string;
  subtitle: string;
  photos: GalleryPhoto[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  title,
  subtitle,
  photos
}) => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="memory-gallery"
      className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto"
      data-testid="memory-gallery-section"
    >
      {/* Editorial Header */}
      <div className="text-center mb-16 sm:mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D6B779] mb-3 font-sans font-medium">
          Chapter III · The Archive
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight mb-4">
          {title}
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#C88D91] italic max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Asymmetric Editorial Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo, index) => {
          // Span 2 columns for the first hero photo (such as the beautiful swan lake memory)
          const isSpan = index === 0;

          return (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`group relative overflow-hidden border border-[#D6B779]/30 bg-[#1E070F] shadow-[0_12px_30px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-500 hover:border-[#D6B779] hover:shadow-[0_16px_40px_rgba(214,183,121,0.2)] ${
                isSpan ? 'md:col-span-2 aspect-16/9' : 'aspect-4/3 sm:aspect-square'
              }`}
              data-testid={`gallery-card-${index}`}
            >
              {!imageErrors[photo.id] ? (
                <img
                  src={photo.url}
                  alt={photo.caption}
                  onError={() => handleImageError(photo.id)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#350D19] to-[#10090D]">
                  <Sparkles className="w-6 h-6 text-[#D6B779] mb-2 opacity-60" />
                  <span className="font-serif text-base text-[#F7EDE5]">{photo.caption}</span>
                </div>
              )}

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10090D] via-[#10090D]/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Hover Golden Overlay Border */}
              <div className="absolute inset-2 border border-[#D6B779]/0 group-hover:border-[#D6B779]/50 transition-all duration-500 pointer-events-none" />

              {/* Caption & Location Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end text-left">
                {photo.location && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#D6B779] font-sans mb-1.5">
                    <MapPin className="w-3 h-3 text-[#D6B779]" />
                    <span>{photo.location}</span>
                  </div>
                )}
                <p className="font-serif text-base sm:text-lg text-[#F7EDE5] leading-snug font-light">
                  {photo.caption}
                </p>
              </div>

              {/* Expand icon in corner */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#10090D]/70 border border-[#D6B779]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5 text-[#D6B779]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
          data-testid="gallery-lightbox"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center bg-[#10090D] border border-[#D6B779]/40 p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-10 w-10 h-10 rounded-full bg-[#350D19] border border-[#D6B779]/40 flex items-center justify-center text-[#F7EDE5] hover:text-[#D6B779] transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-[75vh] overflow-hidden flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="w-full mt-4 text-center sm:text-left px-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#D6B779]/20 pt-3">
              <p className="font-serif text-lg text-[#F7EDE5]">{activePhoto.caption}</p>
              {activePhoto.location && (
                <span className="text-xs uppercase tracking-[0.2em] text-[#D6B779] font-sans">
                  {activePhoto.location}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
