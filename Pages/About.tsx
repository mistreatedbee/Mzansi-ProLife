import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Lightbulb, 
  BookOpen, 
  Leaf,
  Users,
  ArrowRight,
  Building2,
  MapPin,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const values = [
    { icon: Heart, label: 'Ubuntu', desc: 'We rise by lifting others', color: 'from-rose-500 to-rose-600' },
    { icon: Shield, label: 'Integrity', desc: 'Transparency in all we do', color: 'from-blue-500 to-blue-600' },
    { icon: Lightbulb, label: 'Action', desc: 'Real change begins on the ground', color: 'from-amber-500 to-amber-600' },
    { icon: BookOpen, label: 'Learning', desc: 'Growth through knowledge', color: 'from-purple-500 to-purple-600' },
    { icon: Leaf, label: 'Sustainability', desc: 'Empowerment that lasts', color: 'from-green-500 to-green-600' },
  ];

  const missionPoints = [
    { title: 'Health and Safety', desc: 'Promoting well-being in every community' },
    { title: 'Farming and Agriculture', desc: 'Sustainable food production and livelihoods' },
    { title: 'Innovative Entrepreneurship', desc: 'Creative solutions for economic growth' },
    { title: 'Business Establishment', desc: 'Supporting new ventures and enterprises' },
    { title: 'Skills Development', desc: 'Practical training for self-reliance' },
    { title: 'Sport Excellence', desc: 'Youth engagement through athletics' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              NPC Reg: 2025/205554/08
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About Mzansi Prolife
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              A Non-Profit Cooperation aimed at enabling and improving the lives of ordinary citizens of South Africa to achieve extraordinary outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Mzansi Prolife Development Institute is a Non-Profit Cooperation aimed at enabling and improving the lives of ordinary citizens of South Africa to achieve extraordinary outcomes. This is done through recruitment of Social Life Change Ambassadors and establishment of Sizanani Community Help Centres across townships and rural communities.
                </p>
                <p>
                  Through dialogue, collaboration, innovation, skills development, entrepreneurship, agriculture, safety initiatives, and sports development, societal challenges are identified and addressed. Practical skills are converted into wealth to eradicate poverty, which is the root cause of many social ills.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-green-100 rounded-[2.5rem] rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80"
                alt="Community engagement"
                className="relative rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Enable and empower township and rural communities to achieve extraordinary life improvement and self-reliance through:
              </p>
              <div className="grid grid-cols-2 gap-4">
                {missionPoints.map((point, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 text-sm">{point.title}</p>
                    <p className="text-xs text-gray-500">{point.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-10 shadow-xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-3xl font-light text-green-100 leading-relaxed mb-8">
                  "A nation where every household is safe, every youth is skilled, and every dream is supported."
                </p>
                <div className="pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-200" />
                    <span className="text-green-100">Building a better South Africa together</span>
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
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-12">Our Core Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{value.label}</h4>
                  <p className="text-xs text-gray-500">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Organization Details */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Organization Details</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <Award className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-1">Registration Number</p>
                <p className="font-bold text-gray-900">2025/205554/08</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <Building2 className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-1">Tax Number</p>
                <p className="font-bold text-gray-900">9201973287</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                <MapPin className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-bold text-gray-900">Nelspruit, South Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join us in our mission to empower communities across South Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Questionnaire')}>
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8 group">
                Get Involved
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl('Donate')}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8">
                Support Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}