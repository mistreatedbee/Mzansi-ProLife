import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2, Home, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

import QuestionnaireStep1 from '@/components/questionnaire/QuestionaireStep1';
import AmbassadorForm from '@/components/questionnaire/AmbassadorForm';
import ProductOrderForm from '@/components/questionnaire/ProductOrderForm';
import AdvertiseForm from '@/components/questionnaire/AdvertiseForm';
import DonationForm from '@/components/questionnaire/DonationForm';
import JobApplicationForm from '@/components/questionnaire/JobApplicationForm';
import QuestionCommentForm from '@/components/questionnaire/QuestionCommentForm';
import OutreachForm from '@/components/questionnaire/OutreachForm';
import AgentRequestForm from '@/components/questionnaire/AgentRequestForm';

const formTitles = {
  ambassador: 'Become a Social Change Ambassador',
  product_order: 'Order / Buy Products',
  advertise: 'Advertise a Company',
  donate: 'Make a Donation',
  job_application: 'Apply for Job Opportunities',
  question_comment: 'Submit a Question or Comment',
  outreach_participation: 'Community Outreach Participation',
  agent_request: 'Speak to an Agent',
};

export default function Questionnaire() {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type');
  
  const [step, setStep] = useState(preselectedType ? 2 : 1);
  const [selectedOption, setSelectedOption] = useState(preselectedType || '');
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedType) {
      setSelectedOption(preselectedType);
      setStep(2);
    }
  }, [preselectedType]);

  const generateReferenceNumber = () => {
    const prefix = 'MPD';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleFormChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && selectedOption) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setFormData({});
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const refNum = generateReferenceNumber();

    try {
      await base44.entities.Submission.create({
        submission_type: selectedOption,
        reference_number: refNum,
        status: 'new',
        ...formData,
      });

      setReferenceNumber(refNum);
      setSubmitted(true);
      toast.success('Submission successful!');
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case 'ambassador':
        return <AmbassadorForm data={formData} onChange={handleFormChange} />;
      case 'product_order':
        return <ProductOrderForm data={formData} onChange={handleFormChange} />;
      case 'advertise':
        return <AdvertiseForm data={formData} onChange={handleFormChange} />;
      case 'donate':
        return <DonationForm data={formData} onChange={handleFormChange} />;
      case 'job_application':
        return <JobApplicationForm data={formData} onChange={handleFormChange} />;
      case 'question_comment':
        return <QuestionCommentForm data={formData} onChange={handleFormChange} />;
      case 'outreach_participation':
        return <OutreachForm data={formData} onChange={handleFormChange} />;
      case 'agent_request':
        return <AgentRequestForm data={formData} onChange={handleFormChange} />;
      default:
        return null;
    }
  };

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-24">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-10 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Submission Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your submission. Your reference number is:
            </p>
            <div className="bg-gray-100 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-500 mb-1">Reference Number</p>
              <p className="text-2xl font-bold text-green-600">{referenceNumber}</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">
              Please save this reference number for future inquiries. Our team will review your submission and contact you soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Home')}>
                <Button variant="outline" className="rounded-full px-6">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Button>
              </Link>
              <Button 
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setSelectedOption('');
                  setFormData({});
                }}
                className="bg-green-600 hover:bg-green-700 rounded-full px-6"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                New Submission
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Questionnaire</h1>
              <p className="text-sm text-gray-500">Mzansi Prolife Development Institute</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Step {step} of 2</span>
              <div className="flex gap-1.5">
                <div className={`w-10 h-2 rounded-full ${step >= 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                <div className={`w-10 h-2 rounded-full ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
                <QuestionnaireStep1 
                  selectedOption={selectedOption}
                  onSelect={handleOptionSelect}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {formTitles[selectedOption]}
                  </h2>
                  <p className="text-gray-500">
                    Please fill in the required information below.
                  </p>
                </div>
                {renderForm()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="rounded-full px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {step === 1 && <div />}

          {step === 1 ? (
            <Button 
              onClick={handleNext}
              disabled={!selectedOption}
              className="bg-green-600 hover:bg-green-700 rounded-full px-8 shadow-lg shadow-green-600/30 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 rounded-full px-8 shadow-lg shadow-green-600/30"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}