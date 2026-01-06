
import React from 'react';
import { Link } from 'react-router-dom';
// Fixed: Added Cat as CatIcon to the imports
import { ArrowRight, Sparkles, ShieldCheck, Heart, Star, Cat as CatIcon } from 'lucide-react';
import { CATS } from '../data/cats';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const Home = () => {
  const featuredCats = CATS.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
              <Sparkles size={16} />
              AI-Powered Matchmaking Now Live
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight mb-8">
              Discover Your New <br />
              <span className="text-rose-500">Soulmate.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              Experience the future of feline adoption. We connect ethical breeders with loving homes using intelligent matching and high-standard verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/browse" className="bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200">
                Explore Cats
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/matchmaker" className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:border-rose-200 hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                Find My Match
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 scale-95 hover:rotate-0 hover:scale-100 transition-all duration-700">
               <img src="https://picsum.photos/id/1084/800/800" alt="Hero Cat" className="w-full h-full object-cover" />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl hidden lg:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 text-emerald-500 p-3 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-xl font-bold">100% Verified</div>
                  <div className="text-slate-500 text-sm">Certified Breeders Only</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Why Whisker Wonders?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We prioritize health, happiness, and transparency above all else.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldCheck} 
              title="Health Guarantee" 
              description="Every kitten comes with a full medical history, vaccinations, and a 1-year health guarantee."
            />
            <FeatureCard 
              icon={Sparkles} 
              title="AI Matching" 
              description="Our proprietary Gemini-powered algorithm finds the breed that best fits your lifestyle and home."
            />
            <FeatureCard 
              icon={Heart} 
              title="Ethical Standard" 
              description="We only work with hobbyist breeders who treat their cats as beloved family members."
            />
          </div>
        </div>
      </section>

      {/* Featured Cats */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Latest Arrivals</h2>
              <p className="text-slate-500">Meet our newest kittens waiting for their forever homes.</p>
            </div>
            <Link to="/browse" className="text-rose-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              See All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCats.map(cat => (
              <Link to={`/cat/${cat.id}`} key={cat.id} className="group">
                <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-rose-500">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{cat.name}</h3>
                      <span className="text-lg font-bold text-rose-500">${cat.price}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-1">{cat.breed} • {cat.age}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.personality.slice(0, 2).map(p => (
                        <span key={p} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-xs font-medium">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-rose-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-rose-400 opacity-20 transform translate-x-12 -translate-y-12">
          <CatIcon size={300} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="fill-white text-white" />)}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold leading-relaxed mb-8 italic">
            "The AI matchmaker recommended a British Shorthair for my apartment lifestyle, and it couldn't have been more accurate. Luna is the perfect companion!"
          </h2>
          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-lg">
               <img src="https://picsum.photos/id/64/100/100" alt="Sarah" />
             </div>
             <p className="text-white font-bold text-lg">Sarah Jenkins</p>
             <p className="text-rose-200 text-sm">Verified Adopter</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
