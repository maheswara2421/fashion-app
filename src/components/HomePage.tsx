/*
 * File: src/components/HomePage.tsx
 * Purpose: Main product discovery grid with search, filters, favorites, auth, and launches ImageViewer.
 * Notes:
 * - Uses React 18.3, Tailwind CSS 3.4.
 * - Data from src/data/outfits; filtering computed via useMemo.
 * - Integrates Supabase auth (web) via src/lib/supabaseClient.
 * - Opens ImageViewer to browse filtered results.
 */
import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Filter, Heart, ShoppingBag, Star, Share2, ShoppingCart, Trash2 } from 'lucide-react';
import { Outfit, FilterOptions, StyleResult } from '../types';
import { outfits, categories, styles, seasons, occasions } from '../data/outfits';
import ImageViewer from './ImageViewer';
import AuthModal from './AuthModal';
import { supabase } from '../lib/supabaseClient';
import type { Session } from '@supabase/supabase-js';
import { formatINR } from '../utils/format';

interface HomePageProps {
  onStartQuiz: () => void;
  quizResult?: StyleResult;
}

export default function HomePage({ onStartQuiz, quizResult }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Record<number, number>>({});
  const [session, setSession] = useState<Session | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    style: 'All',
    season: 'All',
    occasion: 'All',
    priceRange: [0, 500],
    colors: []
  });
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quizEnabled, setQuizEnabled] = useState(true);
  const [quizCats, setQuizCats] = useState<Set<string>>(new Set());
  const [quizCols, setQuizCols] = useState<Set<string>>(new Set());
  type Toast = { message: string; actionLabel?: string; onAction?: () => void } | null;
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<number | null>(null);
  const [cartPulse, setCartPulse] = useState(false);

  // Lightweight toast
  const showToast = (t: string | { message: string; actionLabel?: string; onAction?: () => void }) => {
    const next: Toast = typeof t === 'string' ? { message: t } : t;
    setToast(next);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1600);
  };

  // Sync local quiz filters when a new quiz result arrives
  useEffect(() => {
    const cats = new Set((quizResult?.outfitTypes || []).map((s: string) => s.toLowerCase()));
    const cols = new Set((quizResult?.colors || []).map((c: string) => c.toLowerCase()));
    setQuizCats(cats);
    setQuizCols(cols);
    setQuizEnabled(true);
  }, [quizResult]);

  const filteredOutfits = useMemo(() => {
    const quizCategories = quizEnabled ? quizCats : new Set<string>();
    const quizColors = quizEnabled ? quizCols : new Set<string>();

    return outfits.filter(outfit => {
      const matchesSearch = outfit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           outfit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           outfit.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filters.category === 'All' || outfit.category === filters.category;
      const matchesStyle = filters.style === 'All' || outfit.style === filters.style;
      const matchesSeason = filters.season === 'All' || outfit.season === filters.season || outfit.season === 'All Season';
      const matchesOccasion = filters.occasion === 'All' || outfit.occasion === filters.occasion;
      const matchesPrice = outfit.price >= filters.priceRange[0] && outfit.price <= filters.priceRange[1];
      const matchesColors = filters.colors.length === 0 || filters.colors.some(color => 
        outfit.colors.some(outfitColor => outfitColor.toLowerCase().includes(color.toLowerCase()))
      );

      // If a quiz result exists, further narrow results to its suggested categories/colors
      const matchesQuizCategory = quizCategories.size === 0 || quizCategories.has(outfit.category.toLowerCase());
      const matchesQuizColor = quizColors.size === 0 || outfit.colors.some((c) => quizColors.has(c.toLowerCase()));

      return matchesSearch && matchesCategory && matchesStyle && matchesSeason && 
             matchesOccasion && matchesPrice && matchesColors && matchesQuizCategory && matchesQuizColor;
    });
  }, [searchTerm, filters, quizEnabled, quizCats, quizCols]);

  // Load current session and subscribe to auth changes
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Persist favorites and cart to localStorage
  useEffect(() => {
    try {
      const fav = localStorage.getItem('sd_favorites');
      if (fav) setFavorites(new Set(JSON.parse(fav)));
      const crt = localStorage.getItem('sd_cart');
      if (crt) setCart(JSON.parse(crt));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('sd_favorites', JSON.stringify(Array.from(favorites))); } catch {}
  }, [favorites]);

  useEffect(() => {
    try { localStorage.setItem('sd_cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const toggleFavorite = (outfitId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(outfitId)) {
      newFavorites.delete(outfitId);
      showToast({
        message: 'Removed from favorites',
        actionLabel: 'Undo',
        onAction: () => {
          setFavorites(prev => new Set(prev).add(outfitId));
        },
      });
    } else {
      newFavorites.add(outfitId);
      showToast('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  const addToCart = (outfitId: number) => {
    setCart((prev) => ({ ...prev, [outfitId]: (prev[outfitId] || 0) + 1 }));
    showToast('Added to cart');
    setCartPulse(true);
    window.setTimeout(() => setCartPulse(false), 250);
  };

  const removeFromCart = (outfitId: number) => {
    setCart((prev) => {
      const qty = (prev[outfitId] || 0) - 1;
      const next = { ...prev };
      if (qty <= 0) delete next[outfitId]; else next[outfitId] = qty;
      return next;
    });
  };

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const shareOutfit = async (outfit: Outfit) => {
    const shareData = {
      title: outfit.name,
      text: `${outfit.name} — ${outfit.description}`,
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.title}: ${shareData.url}`);
        alert('Link copied to clipboard');
      }
    } catch {}
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const openImageViewer = (outfitId: number) => {
    const index = filteredOutfits.findIndex((outfit: Outfit) => outfit.id === outfitId);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setImageViewerOpen(true);
    }
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                StyleDiscover
              </h1>
            </div>
            <div className="flex items-center gap-3 relative">
              {!session ? (
                <>
                  <button
                    onClick={() => { setAuthMode('signin'); setAuthOpen(true); }}
                    className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setAuthMode('signup'); setAuthOpen(true); }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 min-w-[40px]"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                  >
                    <span className="hidden sm:inline text-sm text-gray-700">Profile</span>
                    <span className="sm:hidden text-sm">⋮</span>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border p-2 z-50">
                      <div className="px-3 py-2 text-xs text-gray-500">Signed in</div>
                      <div className="px-3 py-2 text-sm font-medium truncate">{session.user.email}</div>
                      <hr className="my-2" />
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg" disabled>
                        Settings (coming soon)
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => {
                  if (!session) {
                    setAuthMode('signin');
                    setAuthOpen(true);
                    return;
                  }
                  onStartQuiz();
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              >
                Take Quiz
              </button>
              <button
                onClick={() => setCartOpen((v) => !v)}
                className={`relative p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-transform ${cartPulse ? 'scale-110' : ''}`}
                aria-haspopup="menu"
                aria-expanded={cartOpen}
                title="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </button>
              {cartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border p-3 z-50 max-h-96 overflow-auto">
                  <div className="font-semibold mb-2">Cart</div>
                  {Object.keys(cart).length === 0 && (
                    <div className="text-sm text-gray-500">Your cart is empty</div>
                  )}
                  {Object.entries(cart).map(([id, qty]) => {
                    const item = outfits.find(o => o.id === Number(id));
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center gap-3 py-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <div className="text-sm font-medium truncate">{item.name}</div>
                          <div className="text-xs text-gray-500">Qty: {qty}</div>
                        </div>
                        <button onClick={() => removeFromCart(Number(id))} className="p-2 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search outfits, styles, or occasions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                  <select
                    value={filters.style}
                    onChange={(e) => updateFilter('style', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {styles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                  <select
                    value={filters.season}
                    onChange={(e) => updateFilter('season', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {seasons.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                  <select
                    value={filters.occasion}
                    onChange={(e) => updateFilter('occasion', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quiz preferences banner */}
        {(quizEnabled && (quizCats.size > 0 || quizCols.size > 0)) && (
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-purple-700">
                Your style preferences are applied
                {quizCats.size > 0 ? ` • ${quizCats.size} categories` : ''}
                {quizCols.size > 0 ? ` • ${quizCols.size} colors` : ''}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuizEnabled(false)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100"
                >
                  Disable
                </button>
                <button
                  onClick={() => { setQuizCats(new Set()); setQuizCols(new Set()); }}
                  className="px-3 py-1.5 text-sm rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from(quizCats).slice(0,12).map((c) => (
                <button
                  key={`qc-${c}`}
                  onClick={() => setQuizCats(prev => { const n = new Set(prev); n.delete(c); return n; })}
                  className="px-2 py-1 rounded-full bg-white border border-purple-200 text-xs text-purple-700 hover:bg-purple-100"
                >
                  {c} ×
                </button>
              ))}
              {Array.from(quizCols).slice(0,12).map((c) => (
                <button
                  key={`ql-${c}`}
                  onClick={() => setQuizCols(prev => { const n = new Set(prev); n.delete(c); return n; })}
                  className="px-2 py-1 rounded-full bg-white border border-pink-200 text-xs text-pink-700 hover:bg-pink-100"
                >
                  {c} ×
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-purple-600">{filteredOutfits.length}</span> outfits
          </p>
        </div>

        {/* Outfit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOutfits.map((outfit) => (
            <div key={outfit.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImageViewer(outfit.id)}
                />
                <button
                  onClick={() => toggleFavorite(outfit.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(outfit.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`}
                  />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {outfit.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{outfit.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{outfit.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-purple-600">{formatINR(outfit.price)}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{Number(outfit.rating ?? 4).toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {outfit.colors.slice(0, 3).map((color: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{outfit.brand}{outfit.material ? ` • ${outfit.material}` : ''}</span>
                  <span className="truncate">{outfit.sku}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(outfit.id)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => shareOutfit(outfit)}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredOutfits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No outfits found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters to find more outfits.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  category: 'All',
                  style: 'All',
                  season: 'All',
                  occasion: 'All',
                  priceRange: [0, 500],
                  colors: []
                });
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Image Viewer */}
      <ImageViewer
        isOpen={imageViewerOpen}
        onClose={closeImageViewer}
        outfits={filteredOutfits}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        onAddToCart={(id) => addToCart(id)}
        onToggleFavorite={(id) => toggleFavorite(id)}
        isFavorite={(id) => favorites.has(id)}
      />

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => { /* session updates via listener */ }}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-3">
          <span className="text-sm">{toast.message}</span>
          {toast.actionLabel && toast.onAction && (
            <button
              onClick={() => { toast.onAction?.(); setToast(null); }}
              className="text-xs font-medium underline decoration-white/60"
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}