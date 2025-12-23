import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-green-600 hover:bg-green-700 rounded-xl px-8 py-6 text-lg">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="rounded-xl px-8 py-6 text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Link to="/" className="text-green-600 hover:text-green-700 hover:underline">Home</Link>
              <Link to="/about" className="text-green-600 hover:text-green-700 hover:underline">About</Link>
              <Link to="/projects" className="text-green-600 hover:text-green-700 hover:underline">Projects</Link>
              <Link to="/questionnaire" className="text-green-600 hover:text-green-700 hover:underline">Get Involved</Link>
              <Link to="/donate" className="text-green-600 hover:text-green-700 hover:underline">Donate</Link>
              <Link to="/contact" className="text-green-600 hover:text-green-700 hover:underline">Contact</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

