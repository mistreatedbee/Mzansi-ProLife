import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, Mail, Heart, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const taglines = [
  "Driving innovation for a sustainable future for all",
  "Empowering Communities Through Safety, Skills, and Self-Reliance",
  "Valuing, privileging, preserving each other is the way"
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const auth = localStorage.getItem('user_authenticated');
      const name = localStorage.getItem('user_name');
      setIsAuthenticated(auth === 'true');
      setUserName(name || '');
    };
    
    checkAuth();
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    // Also check periodically
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    { label: 'Home', page: 'Home' },
    { label: 'About', page: 'About' },
    { label: 'Projects', page: 'Projects' },
    { label: 'Get Involved', page: 'Questionnaire' },
    { label: 'Donate', page: 'Donate' },
    { label: 'Contact', page: 'Contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-700 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTagline}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-medium italic"
            >
              "{taglines[currentTagline]}"
            </motion.span>
          </AnimatePresence>
          <div className="flex items-center gap-6">
            <a href="tel:0798222269" className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              079 822 2269
            </a>
            <a href="mailto:mzansiprolifedevelopment@gmail.com" className="flex items-center gap-1.5 hover:text-green-200 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-800 text-lg leading-tight">Mzansi Prolife</h1>
                <p className="text-xs text-gray-500">Development Institute NPC</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className="px-4 py-2 text-gray-600 hover:text-green-600 font-medium rounded-full hover:bg-green-50 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to={createPageUrl('Questionnaire')}>
                <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6 shadow-lg shadow-green-600/30">
                  Start Questionnaire
                </Button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="outline" className="rounded-full border-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      {userName || 'Profile'}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="rounded-full border-gray-300">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.page}
                        to={createPageUrl(item.page)}
                        onClick={() => setMobileOpen(false)}
                        className="px-4 py-3 text-gray-700 hover:text-green-600 font-medium rounded-xl hover:bg-green-50 transition-all"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 space-y-3">
                    <Link to={createPageUrl('Questionnaire')} onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 rounded-full">
                        Start Questionnaire
                      </Button>
                    </Link>
                    {isAuthenticated ? (
                      <Link to="/profile" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full rounded-full">
                          <User className="w-4 h-4 mr-2" />
                          My Profile
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setMobileOpen(false)}>
                          <Button variant="outline" className="w-full rounded-full">
                            Login
                          </Button>
                        </Link>
                        <Link to="/signup" onClick={() => setMobileOpen(false)}>
                          <Button className="w-full bg-green-600 hover:bg-green-700 rounded-full">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="mt-auto pb-8">
                    <p className="text-xs text-gray-500 text-center">
                      NPC Reg: 2025/205554/08
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}