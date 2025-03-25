
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-xl bg-workzap-blue flex items-center justify-center text-white font-bold">
              WZ
            </div>
            <span className="text-xl font-semibold text-gray-900">WorkZap</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/jobs" className="text-gray-700 hover:text-workzap-blue transition-colors">
              Find Jobs
            </Link>
            <Link to="/volunteers" className="text-gray-700 hover:text-workzap-blue transition-colors">
              Volunteers
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-workzap-blue transition-colors">
              How It Works
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button className="bg-workzap-blue hover:bg-workzap-blue/90" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="px-4 py-6 space-y-6">
            <Link 
              to="/jobs" 
              className="block text-gray-700 hover:text-workzap-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/volunteers" 
              className="block text-gray-700 hover:text-workzap-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Volunteers
            </Link>
            <Link 
              to="/how-it-works" 
              className="block text-gray-700 hover:text-workzap-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button className="w-full justify-center bg-workzap-blue hover:bg-workzap-blue/90" asChild>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
