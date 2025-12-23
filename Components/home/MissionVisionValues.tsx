import React from 'react';
import { Target, Eye, Heart, Shield, Lightbulb, BookOpen, Leaf, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MissionVisionValues() {
  const missionPoints = [
    'Health and safety',
    'Farming and agriculture',
    'Innovative entrepreneurship',
    'Business establishment',
    'Skills development',
    'Sport excellence'
  ];

  const values = [
    { icon: Heart, label: 'Ubuntu', desc: 'We rise by lifting others', color: 'bg-rose-50 text-rose-600' },
    { icon: Shield, label: 'Integrity', desc: 'Transparency in all we do', color: 'bg-blue-50 text-blue-600' },
    { icon: Lightbulb, label: 'Action', desc: 'Real change begins on the ground', color: 'bg-amber-50 text-amber-600' },
    { icon: BookOpen, label: 'Learning', desc: 'Growth through knowledge', color: 'bg-purple-50 text-purple-600' },
    { icon: Leaf, label: 'Sustainability', desc: 'Empowerment that lasts', color: 'bg-green-50 text-green-600' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold mb-4">OUR FOUNDATION</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mission, Vision & Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide our work in empowering South African communities.
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              Enable and empower township and rural communities to achieve extraordinary life improvement and self-reliance through:
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {missionPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-green-100 text-lg leading-relaxed">
                "A nation where every household is safe, every youth is skilled, and every dream is supported."
              </p>
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-200" />
                  <span className="text-green-100 text-sm">Building a better South Africa together</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-xl font-bold text-gray-900 mb-8">Our Core Values</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value, idx) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 w-full sm:w-auto sm:min-w-[200px]"
              >
                <div className={`w-12 h-12 ${value.color.split(' ')[0]} rounded-xl flex items-center justify-center mb-4`}>
                  <value.icon className={`w-6 h-6 ${value.color.split(' ')[1]}`} />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{value.label}</h4>
                <p className="text-sm text-gray-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}