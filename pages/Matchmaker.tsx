
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, Loader2, ArrowRight, Home, Users, Volume2, Briefcase } from 'lucide-react';
import { getCatMatch } from '../services/geminiService';
import { CATS } from '../data/cats';
import { MatchResult, Cat } from '../types';

const Matchmaker = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<(MatchResult & { cat: Cat | undefined })[]>([]);

  const handleMatch = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const matchResults = await getCatMatch(description);
      const enhancedResults = matchResults.map(res => ({
        ...res,
        cat: CATS.find(c => c.id === res.catId)
      }));
      setResults(enhancedResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "I live in a small quiet apartment and work from home. I want a calm companion.",
    "Big family with kids and a dog. We need a social and patient cat.",
    "Active person, love to play and teach tricks. I have plenty of space."
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles size={18} />
            Powered by Gemini AI
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Find Your Purr-fect Match</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Describe your home, lifestyle, and personality. Our AI behaviorist will analyze our catalog to find your most compatible feline companion.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 mb-16">
          <textarea
            className="w-full h-48 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-rose-500 text-xl p-8 transition-all resize-none mb-8"
            placeholder="E.g., I have a busy office job but quiet weekends. I live in a modern flat with a balcony. I prefer a breed that isn't too vocal..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Try these prompts:</span>
              <div className="flex flex-wrap gap-2">
                {examples.map(ex => (
                  <button 
                    key={ex} 
                    onClick={() => setDescription(ex)}
                    className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all font-bold"
                  >
                    {ex.substring(0, 35)}...
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleMatch}
              disabled={loading || !description.trim()}
              className="bg-rose-500 text-white px-12 py-5 rounded-2xl text-xl font-bold flex items-center gap-3 hover:bg-rose-600 transition-all shadow-xl shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Analyzing Personality...
                </>
              ) : (
                <>
                  Get Matches
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Area */}
        {results.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-3xl font-serif font-bold mb-10 text-center">Your Curated Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((res, idx) => (
                res.cat && (
                  <Link to={`/cat/${res.cat.id}`} key={res.catId} className="group h-full">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-2xl transition-all hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                        <img src={res.cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={res.cat.name} />
                        <div className="absolute top-4 left-4 bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                          {res.matchPercentage}% Match
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold mb-1">{res.cat.name}</h3>
                        <p className="text-slate-500 font-medium mb-6">{res.cat.breed}</p>
                        <div className="bg-rose-50 p-4 rounded-2xl mb-6 flex-grow">
                          <p className="text-rose-700 text-sm leading-relaxed italic">"{res.reasoning}"</p>
                        </div>
                        <button className="text-rose-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                          View Details <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matchmaker;
