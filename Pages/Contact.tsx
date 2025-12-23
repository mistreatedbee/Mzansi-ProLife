import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock,
  Building2,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Contact() {
  const [copiedField, setCopiedField] = React.useState(null);

  const phoneNumbers = [
    { label: 'Vodacom', number: '079 822 2269', color: 'bg-red-50 text-red-600 border-red-100' },
    { label: 'MTN', number: '078 081 3955', color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
    { label: 'Cell C', number: '061 708 3753', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { label: 'Telkom', number: '061 473 0612', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(text);
    toast.success('Copied to clipboard');
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We're here to help! Reach out through any of our contact channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Phone Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Phone className="w-6 h-6 text-green-600" />
                  Phone Numbers
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.number.replace(/\s/g, '')}`}
                      className={`${phone.color.split(' ')[0]} border ${phone.color.split(' ')[2]} rounded-2xl p-5 hover:scale-105 transition-transform flex items-center justify-between group`}
                    >
                      <div>
                        <p className="text-sm text-gray-500">{phone.label}</p>
                        <p className={`font-bold text-lg ${phone.color.split(' ')[1]}`}>{phone.number}</p>
                      </div>
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Phone className={`w-5 h-5 ${phone.color.split(' ')[1]}`} />
                      </div>
                    </a>
                  ))}
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/27737353200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-50 border border-green-100 rounded-2xl p-6 hover:bg-green-100 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <MessageCircle className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-bold text-xl text-green-600">073 735 3200</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-green-600" />
                  Email
                </h2>
                
                <div className="space-y-6">
                  <a
                    href="mailto:mzansiprolifedevelopment@gmail.com"
                    className="block bg-blue-50 border border-blue-100 rounded-2xl p-5 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-semibold text-gray-800 text-sm truncate">mzansiprolifedevelopment@gmail.com</p>
                      </div>
                    </div>
                  </a>

                  <button
                    onClick={() => copyToClipboard('mzansiprolifedevelopment@gmail.com')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    {copiedField === 'mzansiprolifedevelopment@gmail.com' ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Address & Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Map */}
                <div className="h-80 lg:h-auto bg-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.1234567890123!2d30.9689!3d-25.4657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNelspruit%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '320px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mzansi Prolife Location"
                  />
                </div>

                {/* Address Info */}
                <div className="p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                    Physical Address
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        <strong>32 Bell Street | Caltex Building</strong><br />
                        Office No. 106<br />
                        Nelspruit, 1200<br />
                        South Africa
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Building2 className="w-4 h-4 text-green-600" />
                        <span>NPC Reg: 2025/205554/08 • Tax: 9201973287</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prefer a Digital Form?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Use our questionnaire system to submit your inquiry, application, or feedback.
          </p>
          <Link to={createPageUrl('Questionnaire')}>
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-8">
              Start Questionnaire
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}