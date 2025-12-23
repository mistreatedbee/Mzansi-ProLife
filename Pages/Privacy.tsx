import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/signup">
            <Button variant="outline" className="mb-6 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Signup
            </Button>
          </Link>
          
          <Card className="shadow-2xl border-0">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-green-600" />
                <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
              </div>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Mzansi Prolife Development Institute NPC ("we", "our", or "us") is committed to protecting 
                  your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                  your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2 ml-4">
                      <li>Register for an account</li>
                      <li>Fill out questionnaire forms</li>
                      <li>Make a donation</li>
                      <li>Contact us via email or phone</li>
                      <li>Subscribe to our newsletter</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may automatically collect certain information about your device, including information 
                      about your web browser, IP address, time zone, and some of the cookies that are installed 
                      on your device.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Process and manage your submissions and applications</li>
                  <li>Process donations and send acknowledgments</li>
                  <li>Communicate with you about our programs and services</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Protection of Personal Information Act (POPIA)</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a South African organization, we comply with the Protection of Personal Information Act 
                  (POPIA) No. 4 of 2013. We are committed to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Processing personal information lawfully and reasonably</li>
                  <li>Collecting only necessary information for our purposes</li>
                  <li>Keeping information accurate and up-to-date</li>
                  <li>Securing personal information against unauthorized access</li>
                  <li>Respecting your rights to access, correct, or delete your information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist us in operating our website (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Under POPIA, you have the right to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Lodge a complaint with the Information Regulator</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and 
                  hold certain information. You can instruct your browser to refuse all cookies or to indicate 
                  when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not intended for children under 18 years of age. We do not knowingly 
                  collect personal information from children under 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, 
                  please contact us:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Email: mzansiprolifedevelopment@gmail.com</li>
                  <li>Phone: 079 822 2269</li>
                  <li>Address: 32 Bell Street | Caltex Building, Office No. 106, Nelspruit, 1200, South Africa</li>
                  <li>Information Regulator: complaints.IR@justice.gov.za</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

