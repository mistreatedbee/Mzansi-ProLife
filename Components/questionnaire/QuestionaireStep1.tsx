import React from 'react';
import { 
  UserPlus, 
  ShoppingBag, 
  Megaphone, 
  Heart, 
  Briefcase, 
  MessageSquare, 
  Users, 
  Headphones 
} from 'lucide-react';
import { motion } from 'framer-motion';

const options = [
  { 
    id: 'ambassador', 
    icon: UserPlus, 
    label: 'Become a Social Change Ambassador',
    description: 'Join our network of community leaders',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  { 
    id: 'product_order', 
    icon: ShoppingBag, 
    label: 'Order / Buy Products',
    description: 'Browse and purchase our products',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  { 
    id: 'advertise', 
    icon: Megaphone, 
    label: 'Advertise a Company',
    description: 'Partner with us for advertising',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600'
  },
  { 
    id: 'donate', 
    icon: Heart, 
    label: 'Donate',
    description: 'Support our community projects',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600'
  },
  { 
    id: 'job_application', 
    icon: Briefcase, 
    label: 'Apply for Job Opportunities',
    description: 'Join our team',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600'
  },
  { 
    id: 'question_comment', 
    icon: MessageSquare, 
    label: 'Submit a Question or Comment',
    description: 'Get in touch with us',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600'
  },
  { 
    id: 'outreach_participation', 
    icon: Users, 
    label: 'Community Outreach Participation',
    description: 'Join our outreach programs',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  },
  { 
    id: 'agent_request', 
    icon: Headphones, 
    label: 'Speak to an Agent',
    description: 'Talk to our team directly',
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600'
  },
];

export default function QuestionnaireStep1({ selectedOption, onSelect }) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Welcome to Mzansi Prolife Development Institute
        </h2>
        <p className="text-gray-600 text-lg">
          Please choose one option below to get started:
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelect(option.id)}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${
              selectedOption === option.id 
                ? `border-transparent bg-gradient-to-br ${option.color} text-white shadow-lg` 
                : `border-gray-100 hover:border-transparent hover:shadow-lg ${option.bgColor}`
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedOption === option.id 
                  ? 'bg-white/20' 
                  : 'bg-white shadow-sm'
              }`}>
                <option.icon className={`w-6 h-6 ${
                  selectedOption === option.id 
                    ? 'text-white' 
                    : option.textColor
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${
                  selectedOption === option.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {option.label}
                </h3>
                <p className={`text-sm ${
                  selectedOption === option.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {option.description}
                </p>
              </div>
            </div>

            {selectedOption === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center"
              >
                <svg className={`w-4 h-4 ${option.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}