
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, MessageSquare, Menu, X, Cat as CatIcon, Star, Info } from 'lucide-react';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Matchmaker from './pages/Matchmaker';
import CatDetail from './pages/CatDetail';
import ChatAssistant from './components/ChatAssistant';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Cats', path: '/browse' },
    { name: 'Purr-fect Match', path: '/matchmaker' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-rose-500 p-2 rounded-xl text-white">
              <CatIcon size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-serif">
              Whisker <span className="text-rose-500">Wonders</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                  location.pathname === link.path ? 'text-rose-500' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
              <ShoppingBag size={18} />
              Wishlist
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-slate-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="max-w-xs">
        <h3 className="text-2xl font-serif font-bold mb-4">Whisker Wonders</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Premium cat marketplace dedicated to ethical breeding and finding the perfect forever homes for our feline friends.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-bold mb-4">Marketplace</h4>
          <ul className="text-slate-400 text-sm space-y-2">
            <li><Link to="/browse">Browse Cats</Link></li>
            <li><Link to="/matchmaker">AI Matchmaker</Link></li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="text-slate-400 text-sm space-y-2">
            <li>Care Guides</li>
            <li>Breeder Info</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-bold mb-4">Newsletter</h4>
          <div className="flex gap-2">
            <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-rose-500 w-full" />
            <button className="bg-rose-500 px-4 py-2 rounded-lg text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
      &copy; 2024 Whisker Wonders. All rights reserved. Made with love for cats.
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/cat/:id" element={<CatDetail />} />
            <Route path="/matchmaker" element={<Matchmaker />} />
          </Routes>
        </main>
        <ChatAssistant />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
