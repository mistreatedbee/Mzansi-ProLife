import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const phoneNumbers = [
    { label: 'Vodacom', number: '079 822 2269' },
    { label: 'MTN', number: '078 081 3955' },
    { label: 'Cell C', number: '061 708 3753' },
    { label: 'Telkom', number: '061 473 0612' },
  ];

  const quickLinks = [
    { label: 'Home', page: 'Home' },
    { label: 'About Us', page: 'About' },
    { label: 'Our Projects', page: 'Projects' },
    { label: 'Get Involved', page: 'Questionnaire' },
    { label: 'Donate', page: 'Donate' },
    { label: 'Contact Us', page: 'Contact' },
  ];

  const projects = [
    'Social Life Change Ambassadors',
    'Sizanani Community Help Centres',
    'Community Outreach & Healing',
    'Entrepreneurship & Business',
    'Skills Development',
    'Farming, Agriculture & Sports',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mzansi Prolife</h3>
                <p className="text-sm text-gray-400">Development Institute NPC</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Enabling and improving the lives of ordinary citizens of South Africa to achieve extraordinary outcomes.
            </p>
            <div className="space-y-1 text-sm text-gray-500">
              <p>NPC Reg: 2025/205554/08</p>
              <p>Tax Number: 9201973287</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <Link 
                    to={createPageUrl(link.page)}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Projects</h4>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project}>
                  <Link 
                    to={createPageUrl('Projects')}
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    {project}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  32 Bell Street | Caltex Building<br />
                  Office No. 106<br />
                  Nelspruit, 1200<br />
                  South Africa
                </p>
              </div>
              <div className="space-y-2">
                {phoneNumbers.map((phone) => (
                  <a 
                    key={phone.number}
                    href={`tel:${phone.number.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 text-green-500" />
                    {phone.label}: {phone.number}
                  </a>
                ))}
              </div>
              <a 
                href="https://wa.me/27737353200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-green-500" />
                WhatsApp: 073 735 3200
              </a>
              <a 
                href="mailto:mzansiprolifedevelopment@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-green-500" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Mzansi Prolife Development Institute NPC. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs italic text-center">
              "Empowering Communities Through Safety, Skills, and Self-Reliance"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}