
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, ShoppingBag, Info, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { CATS } from '../data/cats';

const StatBar = ({ label, value }: { label: string, value: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-slate-500 font-medium">{label}</span>
      <span className="text-slate-900 font-bold">{value}/5</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-rose-500 rounded-full transition-all duration-1000" 
        style={{ width: `${(value / 5) * 100}%` }}
      />
    </div>
  </div>
);

const CatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cat = CATS.find(c => c.id === id);

  if (!cat) return <div>Cat not found.</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-rose-500 transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Images */}
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 cursor-pointer hover:border-rose-500 transition-all">
                  <img src={`https://picsum.photos/id/${parseInt(cat.id) * 10 + i}/300/300`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-rose-50 text-rose-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Available Now</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} className="fill-current" />
                    <span className="text-sm font-bold">Premium Breed</span>
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-bold mb-2">{cat.name}</h1>
                <p className="text-2xl text-slate-500 font-medium">{cat.breed} • {cat.gender}</p>
              </div>
              <div className="flex gap-4">
                <button className="p-3 rounded-2xl border border-slate-100 hover:bg-rose-50 hover:text-rose-500 transition-all text-slate-400">
                  <Share2 size={24} />
                </button>
                <button className="p-3 rounded-2xl border border-slate-100 hover:bg-rose-50 hover:text-rose-500 transition-all text-slate-400">
                  <Heart size={24} />
                </button>
              </div>
            </div>

            <div className="text-4xl font-bold text-rose-500 mb-8">${cat.price}</div>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-slate-50 p-4 rounded-2xl text-center">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Age</div>
                <div className="text-lg font-bold">{cat.age}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Weight</div>
                <div className="text-lg font-bold">8-12 lbs</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Color</div>
                <div className="text-lg font-bold">Varied</div>
              </div>
            </div>

            <div className="prose prose-slate mb-10">
              <h3 className="text-xl font-bold mb-4">About {cat.name}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{cat.description}</p>
            </div>

            <div className="space-y-6 mb-12">
              <h3 className="text-xl font-bold">Characteristics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <StatBar label="Energy Level" value={cat.energyLevel} />
                <StatBar label="Shedding" value={cat.shedding} />
                <StatBar label="Affection" value={5} />
                <StatBar label="Intelligence" value={4} />
              </div>
            </div>

            <div className="bg-rose-50 rounded-3xl p-8 mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-rose-500" /> Whisker Wonders Guarantee
              </h3>
              <ul className="space-y-4">
                {[
                  "Pedigree & Health Certificate Included",
                  "Up-to-date on all vaccinations",
                  "1 Year Comprehensive Health Guarantee",
                  "Complimentary 30-day Pet Insurance",
                  "Starter kit with premium kitten food"
                ].map(text => (
                  <li key={text} className="flex items-center gap-3 text-slate-600 font-medium">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-slate-900 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200">
                <ShoppingBag size={24} /> Inquiry About {cat.name}
              </button>
              <button className="px-10 py-5 rounded-2xl border-2 border-slate-200 font-bold hover:border-rose-500 hover:text-rose-500 transition-all">
                Schedule Video Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatDetail;
