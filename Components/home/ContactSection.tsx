import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const phoneNumbers = [
    { label: 'Vodacom', number: '079 822 2269', color: 'bg-red-50 text-red-600' },
    { label: 'MTN', number: '078 081 3955', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Cell C', number: '061 708 3753', color: 'bg-blue-50 text-blue-600' },
    { label: 'Telkom', number: '061 473 0612', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-green-600 font-semibold mb-4">CONTACT US</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Get in Touch With
              <br />
              <span className="text-green-600">Mzansi Prolife</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              We're here to help! Reach out through any of our contact channels and our team will assist you promptly.
            </p>

            {/* Phone Numbers */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {phoneNumbers.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:${phone.number.replace(/\s/g, '')}`}
                  className={`${phone.color.split(' ')[0]} rounded-2xl p-4 hover:scale-105 transition-transform`}
                >
                  <Phone className={`w-5 h-5 ${phone.color.split(' ')[1]} mb-2`} />
                  <p className="text-sm text-gray-500">{phone.label}</p>
                  <p className="font-semibold text-gray-800">{phone.number}</p>
                </a>
              ))}
            </div>

            {/* WhatsApp & Email */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://wa.me/27737353200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-50 rounded-2xl p-5 hover:bg-green-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="font-semibold text-gray-800">073 735 3200</p>
                  </div>
                </div>
              </a>
              <a
                href="mailto:mzansiprolifedevelopment@gmail.com"
                className="flex-1 bg-blue-50 rounded-2xl p-5 hover:bg-blue-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800 text-sm">mzansiprolife...@gmail.com</p>
                  </div>
                </div>
              </a>
            </div>

            <Link to={createPageUrl('Contact')}>
              <Button className="bg-green-600 hover:bg-green-700 rounded-full px-8 shadow-lg shadow-green-600/30 group">
                View All Contact Options
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Map & Address */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Map */}
              <div className="h-64 bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.1234567890123!2d30.9689!3d-25.4657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNelspruit%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mzansi Prolife Location"
                />
              </div>

              {/* Address Card */}
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Physical Address</p>
                    <p className="text-gray-600">
                      32 Bell Street | Caltex Building<br />
                      Office No. 106<br />
                      Nelspruit, 1200<br />
                      South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500 pt-6 border-t border-gray-100">
                  <Clock className="w-4 h-4" />
                  <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}