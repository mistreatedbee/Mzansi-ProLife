import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  ShoppingBag, 
  Megaphone, 
  Heart, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Headphones,
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { motion } from 'framer-motion';

const options = [
  { icon: UserPlus, label: 'Become a Social Change Ambassador', color: 'bg-blue-50 text-blue-600' },
  { icon: ShoppingBag, label: 'Order / Buy Products', color: 'bg-purple-50 text-purple-600' },
  { icon: Megaphone, label: 'Advertise a Company', color: 'bg-amber-50 text-amber-600' },
  { icon: Heart, label: 'Donate', color: 'bg-rose-50 text-rose-600' },
  { icon: Briefcase, label: 'Apply for Job Opportunities', color: 'bg-teal-50 text-teal-600' },
  { icon: MessageSquare, label: 'Submit a Question or Comment', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Users, label: 'Community Outreach Participation', color: 'bg-green-50 text-green-600' },
  { icon: Headphones, label: 'Speak to an Agent', color: 'bg-gray-100 text-gray-600' },
];

export default function QuestionnairePreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ClipboardList className="w-4 h-4" />
              Digital Forms System
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Replace Paper Forms &
              <br />
              <span className="text-green-600">WhatsApp Confusion</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our digital questionnaire system makes it easy to engage with Mzansi Prolife Development Institute. Choose from 8 different options to get started on your journey with us.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Structured data capture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Instant reference numbers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Mobile-friendly experience</span>
              </div>
            </div>

            <Link to={createPageUrl('Questionnaire')}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 rounded-full px-8 h-14 text-lg shadow-xl shadow-green-600/30 group">
                Start Questionnaire Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Options Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 rounded-[3rem] rotate-3 scale-105" />
            
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <p className="font-semibold text-gray-800">Step 1: Choose an Option</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {options.map((option, idx) => (
                  <motion.div
                    key={option.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`${option.color.split(' ')[0]} rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer group`}
                  >
                    <option.icon className={`w-6 h-6 ${option.color.split(' ')[1]} mb-2`} />
                    <p className="text-xs font-medium text-gray-700 leading-tight">{option.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Progress: 1 of 3</span>
                <div className="flex gap-1.5">
                  <div className="w-8 h-2 bg-green-500 rounded-full" />
                  <div className="w-8 h-2 bg-gray-200 rounded-full" />
                  <div className="w-8 h-2 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}