/*
 * File: src/components/ImageViewer.tsx
 * Purpose: Full-screen image viewer with gestures and controls for the web app.
 * Features:
 * - Open from grid, swipe left/right (keyboard arrows), ESC to close, X button.
 * - Zoom via wheel/double-click and pinch on touch; pan when zoomed.
 * - Swipe-down to close on touch when not zoomed; thumbnails and share/download actions.
 * Notes:
 * - Integrated in `HomePage.tsx` and operates on the filtered outfits array.
 * - Built for React 18.3 + TS 5.5, styles via Tailwind CSS 3.4.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Download, HelpCircle, ExternalLink, Heart, ShoppingCart } from 'lucide-react';
import { Outfit } from '../types';
import { formatINR } from '../utils/format';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  outfits: Outfit[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onAddToCart?: (outfitId: number) => void;
  onToggleFavorite?: (outfitId: number) => void;
  isFavorite?: (outfitId: number) => boolean;
}

export default function ImageViewer({ 
  isOpen, 
  onClose, 
  outfits, 
  currentIndex, 
  onIndexChange,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  const [isSwipeMode, setIsSwipeMode] = useState(false);
  const [swipeStartY, setSwipeStartY] = useState(0);
  const [swipeCurrentY, setSwipeCurrentY] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeCurrentX, setSwipeCurrentX] = useState(0);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [showHelp, setShowHelp] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pinchStartScaleRef = useRef<number>(1);

  // Reset transform when image changes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      setIsDragging(false);
      setIsSwipeMode(false);
      setSwipeCurrentY(0);
    }
  }, [currentIndex, isOpen]);

  // Ensure selected image defaults to the outfit image on change
  useEffect(() => {
    if (isOpen && outfits[currentIndex]) {
      const base = outfits[currentIndex].image;
      setSelectedImageUrl(base);
    }
  }, [isOpen, currentIndex, outfits]);

  // Handle keyboard navigation and help toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (scale === 1) goToPrevious();
          break;
        case 'ArrowRight':
          if (scale === 1) goToNext();
          break;
        case '?':
        case 'h':
        case 'H':
          setShowHelp((s: boolean) => !s);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, scale]);

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const goToNext = useCallback(() => {
    if (currentIndex < outfits.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  }, [currentIndex, outfits.length, onIndexChange]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  }, [currentIndex, onIndexChange]);

  // Handle double tap to zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    const timeDiff = now - lastTap;
    
    if (timeDiff < 300 && timeDiff > 0) {
      // Double tap detected
      handleDoubleClick();
    }
    setLastTap(now);

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setSwipeStartX(touch.clientX);
      setSwipeCurrentX(0);
      setIsHorizontalSwipe(false);
      
      // Check if this might be a swipe down gesture (starting from top area)
      if (scale === 1 && touch.clientY < window.innerHeight * 0.3) {
        setSwipeStartY(touch.clientY);
        setIsSwipeMode(true);
      }
    } else if (e.touches.length === 2) {
      // Pinch gesture start
      setIsSwipeMode(false);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const startDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      pinchStartDistanceRef.current = startDistance;
      pinchStartScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      if (isSwipeMode && scale === 1) {
        // Handle swipe down to close
        const deltaY = touch.clientY - swipeStartY;
        if (deltaY > 0) {
          setSwipeCurrentY(deltaY);
        }
      } else if (scale > 1) {
        // Handle pan when zoomed
        const deltaX = touch.clientX - dragStart.x;
        const deltaY = touch.clientY - dragStart.y;
        
        setTranslateX((prev: number) => prev + deltaX);
        setTranslateY((prev: number) => prev + deltaY);
        setDragStart({ x: touch.clientX, y: touch.clientY });
      } else {
        // Handle horizontal swipe between images
        const deltaX = touch.clientX - swipeStartX;
        setSwipeCurrentX(deltaX);
        if (Math.abs(deltaX) > 10) {
          setIsHorizontalSwipe(true);
        }
      }
    } else if (e.touches.length === 2) {
      // Handle pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      if (pinchStartDistanceRef.current) {
        const scaleFactor = distance / pinchStartDistanceRef.current;
        const newScale = Math.max(0.5, Math.min(4, pinchStartScaleRef.current * scaleFactor));
        setScale(newScale);
        if (newScale === 1) {
          setTranslateX(0);
          setTranslateY(0);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (isSwipeMode && swipeCurrentY > 100) {
      // Swipe down threshold reached, close viewer
      onClose();
    }
    
    setIsSwipeMode(false);
    setSwipeCurrentY(0);
    setIsDragging(false);
    // Complete horizontal swipe navigation
    if (isHorizontalSwipe && Math.abs(swipeCurrentX) > 60 && scale === 1) {
      if (swipeCurrentX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setSwipeCurrentX(0);
    setIsHorizontalSwipe(false);
  };

  // Handle mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setTranslateX((prev: number) => prev + deltaX);
      setTranslateY((prev: number) => prev + deltaY);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle double click to zoom
  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
    }
  };

  const handleSelectThumb = (url: string) => {
    setSelectedImageUrl(url);
    // reset transforms so the new image is centered
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  const handleShare = async () => {
    try {
      const url = selectedImageUrl || outfits[currentIndex]?.image;
      if (!url) return;
      if (navigator.share) {
        await navigator.share({ title: outfits[currentIndex]?.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert('Image link copied to clipboard');
      } else {
        alert('Sharing not supported on this browser');
      }
    } catch (err) {
      // fallback alert
      alert('Unable to share');
    }
  };

  const handleDownload = async () => {
    const url = selectedImageUrl || outfits[currentIndex]?.image;
    if (!url) return;
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = outfits[currentIndex]?.name?.replace(/\s+/g, '_') || 'image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      alert('Unable to trigger download');
    }
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(4, scale + delta));
    
    if (newScale === 1) {
      setTranslateX(0);
      setTranslateY(0);
    }
    
    setScale(newScale);
  };

  if (!isOpen || !outfits[currentIndex]) return null;

  const currentOutfit = outfits[currentIndex];
  // Build a gallery from provided images or derive from the base image by swapping the width param
  const buildGallery = (): string[] => {
    const base = currentOutfit.image;
    const variants = [400, 800, 1200];
    const derived = variants.map((w) => base.replace(/([?&])w=\d+/, `$1w=${w}`));
    const unique = Array.from(new Set([base, ...derived]));
    return Array.isArray(currentOutfit.images) && currentOutfit.images.length > 0
      ? currentOutfit.images
      : unique;
  };
  const gallery = buildGallery();
  const opacity = isSwipeMode ? Math.max(0.3, 1 - swipeCurrentY / 300) : 1;
  const transform = isSwipeMode
    ? `translateY(${swipeCurrentY}px)`
    : isHorizontalSwipe && scale === 1
    ? `translateX(${swipeCurrentX}px)`
    : '';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      style={{ opacity }}
      ref={containerRef}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (scale === 1 && e.target === containerRef.current) {
          onClose();
        }
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons (disabled visually when zoomed) */}
      {currentIndex > 0 && (
        <button
          onClick={() => scale === 1 && goToPrevious()}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full text-white transition-colors ${
            scale === 1 ? 'bg-black/50 hover:bg-black/70' : 'bg-black/30 opacity-60 cursor-not-allowed'
          }`}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < outfits.length - 1 && (
        <button
          onClick={() => scale === 1 && goToNext()}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full text-white transition-colors ${
            scale === 1 ? 'bg-black/50 hover:bg-black/70' : 'bg-black/30 opacity-60 cursor-not-allowed'
          }`}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
        {currentIndex + 1} / {outfits.length}
      </div>

      {/* Image container */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ transform }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
      >
        <img
          ref={imageRef}
          src={selectedImageUrl || gallery[0] || currentOutfit.image}
          alt={currentOutfit.name}
          className="max-w-full max-h-full object-contain select-none transition-transform duration-200"
          style={{
            transform: `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
          }}
          draggable={false}
        />
      </div>

      {/* Image info + actions */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
        <h3 className="font-semibold text-lg mb-1">{currentOutfit.name}</h3>
        <p className="text-sm text-gray-300 mb-2">{currentOutfit.description}</p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-medium">{formatINR(currentOutfit.price)}</span>
            <span className="hidden sm:inline text-gray-300">{currentOutfit.material ? `${currentOutfit.brand} • ${currentOutfit.material}` : currentOutfit.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            {onAddToCart && (
              <button
                onClick={() => onAddToCart(currentOutfit.id)}
                className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm flex items-center gap-1"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            )}
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(currentOutfit.id)}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 ${isFavorite && isFavorite(currentOutfit.id) ? 'bg-red-500/70 hover:bg-red-500/80' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                aria-label="Toggle favorite"
              >
                <Heart className="w-4 h-4" />
                {isFavorite && isFavorite(currentOutfit.id) ? 'Liked' : 'Like'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Zoom indicator */}
      {scale !== 1 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10 px-2 py-1 bg-black/50 rounded text-white text-xs">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Controls */}
      <div className="absolute top-4 right-16 z-10 flex items-center space-x-2">
        <button onClick={handleShare} className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors" aria-label="Share image">
          <Share2 className="w-5 h-5" />
        </button>
        <button onClick={handleDownload} className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors" aria-label="Download image">
          <Download className="w-5 h-5" />
        </button>
        <a
          href={selectedImageUrl || gallery[0] || currentOutfit.image}
          target="_blank"
          rel="noreferrer"
          className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          aria-label="Open image in new tab"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
        <button onClick={() => setShowHelp((s: boolean) => !s)} className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors" aria-label="Help">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails (per product, if available) */}
      {gallery.length > 1 && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 max-w-[90%]">
          <div className="flex items-center space-x-2 overflow-x-auto px-2 py-2 bg-black/30 rounded-xl backdrop-blur-sm">
            {gallery.map((imgUrl) => (
              <button
                key={imgUrl}
                onClick={() => handleSelectThumb(imgUrl)}
                className={`relative flex-shrink-0 rounded-md overflow-hidden border ${
                  (selectedImageUrl || gallery[0] || currentOutfit.image) === imgUrl ? 'border-white ring-2 ring-white/70' : 'border-transparent'
                }`}
              >
                <img src={imgUrl} alt="thumb" className="h-14 w-14 object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Help overlay */}
      {showHelp && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-white">
          <div className="bg-black/70 rounded-lg px-4 py-3 text-xs text-center space-y-1 max-w-[90vw]">
            <p>Double-tap or scroll to zoom</p>
            <p>Swipe left/right to switch items</p>
            <p>Swipe down or press ESC to close</p>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-1 inline-block px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
