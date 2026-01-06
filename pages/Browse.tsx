
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, Cat as CatIcon, Heart } from 'lucide-react';
import { CATS } from '../data/cats';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [maxPrice, setMaxPrice] = useState(4000);

  const breeds = ['All', ...Array.from(new Set(CATS.map(c => c.breed)))];

  const filteredCats = CATS.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cat.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBreed = selectedBreed === 'All' || cat.breed === selectedBreed;
    const matchesPrice = cat.price <= maxPrice;
    return matchesSearch && matchesBreed && matchesPrice;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Search & Filter Header */}
      <div className="bg-white border-b pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold mb-8">Find Your Companion</h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name or breed..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-rose-500 transition-all text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                <SlidersHorizontal size={18} className="text-slate-500" />
                <span className="text-sm font-bold text-slate-600">Filters:</span>
              </div>
              
              <select 
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-rose-500"
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
              >
                {breeds.map(b => <option key={b} value={b}>{b}</option>)}
              </select>

              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-slate-500">Max Price: ${maxPrice}</span>
                <input 
                  type="range" 
                  min="500" 
                  max="4000" 
                  step="100"
                  className="accent-rose-500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-8">
          <p className="text-slate-500 font-medium">{filteredCats.length} feline friends found</p>
        </div>

        {filteredCats.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCats.map(cat => (
              <Link to={`/cat/${cat.id}`} key={cat.id} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 border border-slate-100 h-full flex flex-col">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg">
                      <Heart size={20} />
                    </button>
                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-bold">
                      {cat.age}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
                      <span className="text-lg font-bold text-rose-500">${cat.price}</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium mb-4">{cat.breed}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {cat.personality.map(p => (
                        <span key={p} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-rose-500 mb-6">
              <Search size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">No cats found</h2>
            <p className="text-slate-500 mb-8">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedBreed('All'); setMaxPrice(4000); }}
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
