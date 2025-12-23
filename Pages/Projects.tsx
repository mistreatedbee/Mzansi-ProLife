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
  Check,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    icon: Users,
    title: 'Social Life Change Ambassadors',
    description: 'Recruitment and training of community change agents who lead transformation initiatives in their neighborhoods.',
    details: [
      'Community leader identification and recruitment',
      'Comprehensive training programs',
      'Ongoing mentorship and support',
      'Network building across communities',
      'Impact measurement and reporting'
    ],
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Building,
    title: 'Sizanani Community Help Centres',
    description: 'Establishing accessible help centres across townships and rural areas to provide resources and support.',
    details: [
      'Strategic location selection',
      'Resource provision and management',
      'Community services coordination',
      'Information and referral services',
      'Safe spaces for community gatherings'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: HeartHandshake,
    title: 'Community Outreach & Healing',
    description: 'Dialogue and collaboration programs for community healing, addressing social challenges through unity.',
    details: [
      'Family Projects',
      'Boyhood Projects',
      'Girlhood Projects',
      'Manhood Projects',
      'Womanhood Projects'
    ],
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80',
    color: 'from-rose-500 to-rose-600'
  },
  {
    icon: Briefcase,
    title: 'Entrepreneurship & Business Development',
    description: 'Supporting innovative entrepreneurship and business establishment for economic empowerment.',
    details: [
      'Business planning workshops',
      'Startup mentorship programs',
      'Access to funding opportunities',
      'Market linkage support',
      'Business incubation services'
    ],
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&auto=format&fit=crop&q=80',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: Wrench,
    title: 'Skills Development & Industrialisation',
    description: 'Converting practical skills into wealth through comprehensive training and development programs.',
    details: [
      'Technical skills training',
      'Vocational certification programs',
      'Apprenticeship placements',
      'Industry partnerships',
      'Job placement assistance'
    ],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Sprout,
    title: 'Farming, Agriculture & Sports Development',
    description: 'Agricultural excellence and sports development programs for sustainable livelihoods and youth engagement.',
    details: [
      'Sustainable farming training',
      'Agricultural cooperatives support',
      'Youth sports programs',
      'Coaching and athlete development',
      'Nutrition and healthy living initiatives'
    ],
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&auto=format&fit=crop&q=80',
    color: 'from-green-500 to-green-600'
  }
];

export default function Projects() {
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
              <Target className="w-4 h-4" />
              Our Impact Areas
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Six Pillars of Empowerment
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Our comprehensive approach addresses the root causes of poverty through targeted initiatives that create lasting change in South African communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-24">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <project.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {project.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {project.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl('Questionnaire')}>
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6 group">
                      Get Involved
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="relative">
                    <div className={`absolute -inset-4 bg-gradient-to-br ${project.color} opacity-20 rounded-[2.5rem] ${idx % 2 === 1 ? '-rotate-3' : 'rotate-3'}`} />
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="relative rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Join one of our projects and help us empower communities across South Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Questionnaire')}>
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8 group">
                Start Questionnaire
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to={createPageUrl('Donate')}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}