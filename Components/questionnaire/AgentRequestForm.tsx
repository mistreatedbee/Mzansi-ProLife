import React from 'react';
import { TextField, TextAreaField, SelectField } from './FormFields';
import { Phone, MessageCircle, Clock } from 'lucide-react';

const urgencyLevels = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'other', label: 'Other' },
];

const contactMethods = [
  { value: 'vodacom', label: 'Call - Vodacom: 079 822 2269', number: '0798222269' },
  { value: 'mtn', label: 'Call - MTN: 078 081 3955', number: '0780813955' },
  { value: 'cellc', label: 'Call - Cell C: 061 708 3753', number: '0617083753' },
  { value: 'telkom', label: 'Call - Telkom: 061 473 0612', number: '0614730612' },
  { value: 'whatsapp', label: 'WhatsApp: 073 735 3200', number: '27737353200' },
];

const timeSlots = [
  { value: 'morning', label: 'Morning (8AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'anytime', label: 'Anytime' },
];

export default function AgentRequestForm({ data, onChange }) {
  const selectedMethod = contactMethods.find(m => m.value === data.preferred_contact_method);

  return (
    <div className="space-y-8">
      {/* Contact Numbers Card */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" />
          Our Contact Numbers
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <a href="tel:0798222269" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-green-50 transition-colors">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Vodacom</p>
              <p className="font-semibold text-gray-800">079 822 2269</p>
            </div>
          </a>
          <a href="tel:0780813955" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-green-50 transition-colors">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">MTN</p>
              <p className="font-semibold text-gray-800">078 081 3955</p>
            </div>
          </a>
          <a href="tel:0617083753" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-green-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Cell C</p>
              <p className="font-semibold text-gray-800">061 708 3753</p>
            </div>
          </a>
          <a href="tel:0614730612" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-green-50 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Telkom</p>
              <p className="font-semibold text-gray-800">061 473 0612</p>
            </div>
          </a>
        </div>
        <a 
          href="https://wa.me/27737353200" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 mt-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
          <div>
            <p className="text-sm opacity-80">WhatsApp</p>
            <p className="font-bold">073 735 3200</p>
          </div>
        </a>
      </div>

      {/* Request Callback Form */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Request a Callback</h3>
        <p className="text-gray-600 mb-6">
          Fill out the form below and our team will contact you.
        </p>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField
              label="Full Name"
              name="full_name"
              value={data.full_name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={data.phone}
              onChange={onChange}
              placeholder="e.g., 079 123 4567"
              required
            />
          </div>

          <SelectField
            label="Reason for Contact"
            name="urgent_reason"
            value={data.urgent_reason}
            onChange={onChange}
            options={urgencyLevels}
            placeholder="Select reason"
            required
          />

          <SelectField
            label="Preferred Contact Method"
            name="preferred_contact_method"
            value={data.preferred_contact_method}
            onChange={onChange}
            options={contactMethods}
            placeholder="How should we contact you?"
            required
          />

          <SelectField
            label="Best Time to Contact"
            name="best_time_to_contact"
            value={data.best_time_to_contact}
            onChange={onChange}
            options={timeSlots}
            placeholder="When should we call?"
          />

          <TextAreaField
            label="Brief Description"
            name="brief_description"
            value={data.brief_description}
            onChange={onChange}
            placeholder="Briefly describe what you need help with..."
            rows={4}
          />
        </div>
      </div>

      {/* Confirmation Note */}
      {selectedMethod && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-green-700">
            <Clock className="w-5 h-5" />
            <p className="font-medium">
              We'll contact you via {selectedMethod.label.split(':')[0]}
            </p>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Expect a response within 24-48 hours during business days.
          </p>
        </div>
      )}
    </div>
  );
}