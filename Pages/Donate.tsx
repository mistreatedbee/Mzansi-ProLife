import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Copy, 
  Check, 
  Building2, 
  CreditCard, 
  Shield,
  Users,
  Building,
  HeartHandshake,
  Briefcase,
  Wrench,
  Sprout
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const projects = [
  { icon: Users, title: 'Social Life Change Ambassadors', color: 'bg-blue-50 text-blue-600' },
  { icon: Building, title: 'Sizanani Community Help Centres', color: 'bg-purple-50 text-purple-600' },
  { icon: HeartHandshake, title: 'Community Outreach & Healing', color: 'bg-rose-50 text-rose-600' },
  { icon: Briefcase, title: 'Entrepreneurship & Business', color: 'bg-amber-50 text-amber-600' },
  { icon: Wrench, title: 'Skills Development', color: 'bg-teal-50 text-teal-600' },
  { icon: Sprout, title: 'Farming, Agriculture & Sports', color: 'bg-green-50 text-green-600' },
];

export default function Donate() {
  const [copiedField, setCopiedField] = React.useState(null);

  const bankingDetails = [
    { label: 'Account Name', value: 'Mzansi Prolife Development Institute NPC' },
    { label: 'Bank', value: 'Capitec Business' },
    { label: 'Account Number', value: '1053 5763 31' },
  ];

  const copyToClipboard = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Support Our Mission
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Your donation helps us empower communities across South Africa through our six core projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Banking Details */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Make a Direct Donation
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Use our banking details below to make a direct EFT donation. Every contribution, no matter the size, makes a difference in the lives of South African communities.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">100% Secure & Transparent</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Registered Non-Profit Cooperation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">Tax-Deductible Contributions</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-sm text-gray-500 mb-2">Organization Details</p>
                <p className="font-semibold text-gray-800">NPC Reg: 2025/205554/08</p>
                <p className="font-semibold text-gray-800">Tax Number: 9201973287</p>
              </div>
            </motion.div>

            {/* Banking Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 shadow-2xl text-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Banking Details</h3>
                    <p className="text-green-100 text-sm">For EFT Donations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {bankingDetails.map((detail) => (
                    <div 
                      key={detail.label}
                      className="bg-white/10 rounded-2xl p-5 flex items-center justify-between hover:bg-white/20 transition-colors"
                    >
                      <div>
                        <p className="text-green-100 text-sm mb-1">{detail.label}</p>
                        <p className="font-bold text-lg">{detail.value}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(detail.label, detail.value)}
                        className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {copiedField === detail.label ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-green-100 text-sm text-center">
                    Please use your name or "Donation" as reference
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Where Your Donation Goes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your contribution supports our six core projects that transform lives across South African communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 ${project.color.split(' ')[0]} rounded-xl flex items-center justify-center mb-4`}>
                  <project.icon className={`w-6 h-6 ${project.color.split(' ')[1]}`} />
                </div>
                <h3 className="font-bold text-gray-900">{project.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want to Donate to a Specific Project?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Use our donation form to specify which project you'd like to support and upload proof of payment.
          </p>
          <Link to={createPageUrl('Questionnaire') + '?type=donate'}>
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8">
              Fill Donation Form
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}