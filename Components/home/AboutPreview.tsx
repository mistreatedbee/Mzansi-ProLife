import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Shield, Lightbulb, Heart, BookOpen, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const coreValues = [
  { icon: Heart, label: 'Ubuntu', desc: 'We rise by lifting others' },
  { icon: Shield, label: 'Integrity', desc: 'Transparency in all we do' },
  { icon: Lightbulb, label: 'Action', desc: 'Real change begins on the ground' },
  { icon: BookOpen, label: 'Learning', desc: 'Growth through knowledge' },
  { icon: Leaf, label: 'Sustainability', desc: 'Empowerment that lasts' },
];

export default function AboutPreview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100 rounded-[2.5rem] rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80"
                alt="Community collaboration"
                className="relative rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover"
              />
              
              {/* Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">NPC</p>
                    <p className="text-sm text-gray-500">Registered Non-Profit</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-semibold mb-4">WHO WE ARE</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Enabling Extraordinary
              <br />
              <span className="text-green-600">Outcomes for All</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Mzansi Prolife Development Institute is a Non-Profit Cooperation aimed at enabling and improving the lives of ordinary citizens of South Africa to achieve extraordinary outcomes.
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed mb-6">
                    This is done through recruitment of Social Life Change Ambassadors and establishment of Sizanani Community Help Centres across townships and rural communities. Through dialogue, collaboration, innovation, skills development, entrepreneurship, agriculture, safety initiatives, and sports development, societal challenges are identified and addressed. Practical skills are converted into wealth to eradicate poverty, which is the root cause of many social ills.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-green-600 font-medium mb-8 hover:text-green-700 transition-colors"
            >
              {expanded ? 'Show Less' : 'Read More'}
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Core Values Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {coreValues.map((value, idx) => (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-green-50 transition-colors group"
                >
                  <value.icon className="w-6 h-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-gray-800 text-sm">{value.label}</p>
                  <p className="text-xs text-gray-500">{value.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link to={createPageUrl('About')}>
              <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 shadow-lg shadow-green-600/30 group">
                Learn More About Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}