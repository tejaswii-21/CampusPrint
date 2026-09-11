import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Briefcase } from 'lucide-react';
import Logo from './Logo';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const { navigate } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: Parameters<typeof navigate>[0]) => {
    navigate(page);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-ink-200' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => handleNav('landing')} className="flex items-center">
            <Logo size="md" />
          </button>

          <div className="hidden items-center gap-1 md:flex">
            <button onClick={() => handleNav('landing')} className="btn-ghost">Home</button>
            <a href="#services" className="btn-ghost">Services</a>
            <a href="#how-it-works" className="btn-ghost">How It Works</a>
            <a href="#pricing" className="btn-ghost">Pricing</a>
            <a href="#contact" className="btn-ghost">Contact</a>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => handleNav('staff-login')}
              className="btn-secondary"
            >
              <Briefcase size={16} />
              Staff Login
            </button>
            <button
              onClick={() => handleNav('student-login')}
              className="btn-primary"
            >
              <GraduationCap size={16} />
              Student Login
            </button>
          </div>

          <button
            className="rounded-lg p-2 text-ink-700 hover:bg-ink-100 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="animate-fade-in border-t border-ink-200 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <button onClick={() => handleNav('landing')} className="btn-ghost justify-start">Home</button>
              <a href="#services" onClick={() => setMenuOpen(false)} className="btn-ghost justify-start">Services</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="btn-ghost justify-start">How It Works</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="btn-ghost justify-start">Pricing</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-ghost justify-start">Contact</a>
              <div className="mt-2 flex flex-col gap-2 px-2">
                <button onClick={() => handleNav('staff-login')} className="btn-secondary w-full">
                  <Briefcase size={16} />
                  Staff Login
                </button>
                <button onClick={() => handleNav('student-login')} className="btn-primary w-full">
                  <GraduationCap size={16} />
                  Student Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
