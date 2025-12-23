import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChallengeSolutionSection() {
  const challenges = [
    'Poverty and unemployment',
    'Lack of skills and opportunities',
    'Limited access to resources',
    'Social challenges in communities',
    'Youth disengagement',
    'Economic inequality'
  ];

  const solutions = [
    {
      title: 'Social Life Change Ambassadors',
      desc: 'Training community leaders to drive transformation'
    },
    {
      title: 'Sizanani Community Help Centres',
      desc: 'Establishing accessible support hubs'
    },
    {
      title: 'Community Outreach & Healing',
      desc: 'Dialogue and collaboration programs'
    },
    {
      title: 'Entrepreneurship & Business Development',
      desc: 'Supporting innovative business ventures'
    },
    {
      title: 'Skills Development & Industrialisation',
      desc: 'Converting practical skills into wealth'
    },
    {
      title: 'Farming, Agriculture & Sports Development',
      desc: 'Sustainable livelihoods and youth engagement'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold mb-4">OUR APPROACH</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The Challenge & Our Solution
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding the problems we face and the comprehensive solutions we provide
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* The Challenge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border-l-4 border-red-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">The Challenge</h3>
                <p className="text-gray-500 text-sm">Problems we address</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              South African communities face significant challenges including poverty, unemployment, lack of opportunities, and limited access to resources. These challenges create cycles of disadvantage that affect families, youth, and entire communities.
            </p>

            <div className="space-y-3">
              {challenges.map((challenge, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{challenge}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 shadow-xl text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Our Solution</h3>
                <p className="text-green-100 text-sm">Six empowerment projects</p>
              </div>
            </div>

            <p className="text-green-100 mb-6 leading-relaxed">
              Through our six comprehensive empowerment projects, we address these challenges systematically. We convert practical skills into wealth, establish community support centres, and create pathways to self-reliance.
            </p>

            <div className="space-y-3 mb-8">
              {solutions.map((solution, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                  <Check className="w-5 h-5 text-green-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{solution.title}</p>
                    <p className="text-green-100 text-xs">{solution.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to={createPageUrl('Projects')}>
              <Button className="bg-white text-green-700 hover:bg-green-50 rounded-full px-6 group w-full sm:w-auto">
                Explore All Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

