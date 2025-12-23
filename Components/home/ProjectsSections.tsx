import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  HeartHandshake, 
  Briefcase, 
  Wrench, 
  Sprout,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    icon: Users,
    title: 'Social Life Change Ambassadors',
    description: 'Recruitment and training of community change agents who lead transformation initiatives in their neighborhoods.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    icon: Building,
    title: 'Sizanani Community Help Centres',
    description: 'Establishing accessible help centres across townships and rural areas to provide resources and support.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    icon: HeartHandshake,
    title: 'Community Outreach & Healing',
    description: 'Dialogue and collaboration programs for community healing, addressing social challenges through unity.',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600'
  },
  {
    icon: Briefcase,
    title: 'Entrepreneurship & Business Development',
    description: 'Supporting innovative entrepreneurship and business establishment for economic empowerment.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600'
  },
  {
    icon: Wrench,
    title: 'Skills Development & Industrialisation',
    description: 'Converting practical skills into wealth through comprehensive training and development programs.',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600'
  },
  {
    icon: Sprout,
    title: 'Farming, Agriculture & Sports',
    description: 'Agricultural excellence and sports development programs for sustainable livelihoods and youth engagement.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  }
];

export default function ProjectsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold mb-4">OUR PROJECTS</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Six Pillars of Empowerment
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach addresses the root causes of poverty through targeted initiatives that create lasting change.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:border-transparent transition-all duration-500"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 ${project.bgColor} group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500`}>
                  <project.icon className={`w-7 h-7 ${project.textColor} group-hover:text-white transition-colors duration-500`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed mb-6 transition-colors duration-500">
                  {project.description}
                </p>

                {/* Link */}
                <Link 
                  to={createPageUrl('Projects')}
                  className="inline-flex items-center gap-2 text-green-600 group-hover:text-white font-medium text-sm transition-colors duration-500"
                >
                  Learn More
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to={createPageUrl('Projects')}>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 rounded-full px-8 shadow-lg shadow-green-600/30 group">
              Explore All Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}