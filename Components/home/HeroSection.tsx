import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const taglines = [
  "Driving innovation for a sustainable future for all",
  "Empowering Communities Through Safety, Skills, and Self-Reliance",
  "Valuing, privileging, preserving each other is the way"
];

export default function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-gray-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-green-100 rounded-full opacity-30" />
      
      {/* Floating Shapes */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-32 right-[20%] w-16 h-16 bg-green-500/10 rounded-3xl rotate-12"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-32 left-[15%] w-20 h-20 bg-gray-300/20 rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Non-Profit Cooperation • Reg: 2025/205554/08
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Mzansi Prolife
              <br />
              <span className="text-green-600">Development Institute</span>
            </h1>

            {/* Animated Tagline */}
            <div className="h-16 mb-8">
              <motion.p
                key={currentTagline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl text-gray-600 italic"
              >
                "{taglines[currentTagline]}"
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to={createPageUrl('Questionnaire')}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 rounded-full px-8 h-14 text-lg shadow-xl shadow-green-600/30 group">
                  Start Questionnaire
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl('Questionnaire')}>
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8 h-14 text-lg border-2 border-green-200 shadow-lg group">
                  Get Involved
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="https://wa.me/27737353200" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-2 hover:bg-gray-50 group">
                  <Play className="mr-2 w-5 h-5" />
                  Speak to Live Support
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                  <p className="text-sm text-gray-500">Core Projects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">Ubuntu</p>
                  <p className="text-sm text-gray-500">Our Foundation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Circle */}
              <div className="w-[450px] h-[450px] mx-auto relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-2 border-green-200 rounded-full" />
                <div className="absolute inset-4 border border-green-100 rounded-full" />
                
                {/* Center Image */}
                <div className="absolute inset-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-2xl shadow-green-600/30 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80"
                    alt="Community empowerment"
                    className="w-full h-full object-cover mix-blend-overlay opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-24 h-24 text-white/90" />
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 right-10 bg-white rounded-2xl shadow-xl p-4"
                >
                  <p className="text-green-600 font-semibold">Skills Development</p>
                  <p className="text-xs text-gray-500">Building futures</p>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute bottom-10 -left-4 bg-white rounded-2xl shadow-xl p-4"
                >
                  <p className="text-green-600 font-semibold">Community Centres</p>
                  <p className="text-xs text-gray-500">Sizanani Help</p>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-0 right-0 bg-white rounded-2xl shadow-xl p-4"
                >
                  <p className="text-green-600 font-semibold">Ambassadors</p>
                  <p className="text-xs text-gray-500">Life Changers</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}