import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Heart, Copy, Check, Building2, CreditCard, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function DonateSection() {
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
    <section className="py-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Support Our Mission
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Your Donation Creates
              <br />
              <span className="text-green-200">Lasting Change</span>
            </h2>

            <p className="text-green-100 text-lg leading-relaxed mb-8">
              Every contribution helps us empower more communities across South Africa. Your support funds our six core projects that transform lives.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-200" />
                <span className="text-green-100 text-sm">Secure & Transparent</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-green-200" />
                <span className="text-green-100 text-sm">NPC Registered</span>
              </div>
            </div>

            <Link to={createPageUrl('Donate')}>
              <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8 shadow-xl group">
                Donate Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Banking Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Banking Details</h3>
                  <p className="text-sm text-gray-500">Direct EFT donations</p>
                </div>
              </div>

              <div className="space-y-4">
                {bankingDetails.map((detail) => (
                  <div 
                    key={detail.label}
                    className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between group hover:bg-green-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{detail.label}</p>
                      <p className="font-semibold text-gray-900">{detail.value}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(detail.label, detail.value)}
                      className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all"
                    >
                      {copiedField === detail.label ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>NPC Reg: 2025/205554/08 • Tax: 9201973287</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}