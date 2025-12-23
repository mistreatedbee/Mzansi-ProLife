import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
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
                <FileText className="w-8 h-8 text-green-600" />
                <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
              </div>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using the Mzansi Prolife Development Institute NPC website and services, 
                  you accept and agree to be bound by the terms and provision of this agreement. If you do 
                  not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials on Mzansi Prolife Development 
                  Institute NPC's website for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This license shall automatically terminate if you violate any of these restrictions and 
                  may be terminated by Mzansi Prolife Development Institute NPC at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you create an account with us, you must provide information that is accurate, 
                  complete, and current at all times. You are responsible for safeguarding the password 
                  and for all activities that occur under your account.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You must notify us immediately of any unauthorized use of your account or any other 
                  breach of security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your use of our services is also governed by our Privacy Policy. Please review our 
                  Privacy Policy, which also governs your use of the services, to understand our practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Donations and Payments</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All donations made through our platform are final and non-refundable unless otherwise 
                  stated. We reserve the right to refuse or cancel any donation at any time.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You agree to provide current, complete, and accurate purchase and account information 
                  for all donations made on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  The content, organization, graphics, design, compilation, and other matters related to 
                  the website are protected under applicable copyrights, trademarks, and other proprietary 
                  rights. Copying, redistribution, or use of any such materials is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall Mzansi Prolife Development Institute NPC or its suppliers be liable 
                  for any damages (including, without limitation, damages for loss of data or profit, or 
                  due to business interruption) arising out of the use or inability to use the materials 
                  on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Revisions</h2>
                <p className="text-gray-700 leading-relaxed">
                  Mzansi Prolife Development Institute NPC may revise these terms of service at any time 
                  without notice. By using this website, you are agreeing to be bound by the then current 
                  version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>Email: mzansiprolifedevelopment@gmail.com</li>
                  <li>Phone: 079 822 2269</li>
                  <li>Address: 32 Bell Street | Caltex Building, Office No. 106, Nelspruit, 1200, South Africa</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

