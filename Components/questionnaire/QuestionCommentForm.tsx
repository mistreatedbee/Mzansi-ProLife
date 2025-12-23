import React from 'react';
import { TextField, TextAreaField, SelectField, FileUploadField } from './FormFields';

const categories = [
  { value: 'ambassadors', label: 'Social Life Change Ambassadors' },
  { value: 'help_centres', label: 'Sizanani Community Help Centres' },
  { value: 'outreach', label: 'Community Outreach & Healing' },
  { value: 'entrepreneurship', label: 'Entrepreneurship & Business' },
  { value: 'skills', label: 'Skills Development' },
  { value: 'agriculture', label: 'Farming, Agriculture & Sports' },
  { value: 'general', label: 'General Inquiry' },
];

const messageTypes = [
  { value: 'question', label: 'Question' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'praise', label: 'Praise / Feedback' },
];

const contactPreferences = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

export default function QuestionCommentForm({ data, onChange }) {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Contact Details</h3>
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
            label="Email Address"
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="e.g., 079 123 4567"
          />
          <SelectField
            label="Preferred Contact Method"
            name="contact_preference"
            value={data.contact_preference}
            onChange={onChange}
            options={contactPreferences}
            placeholder="How should we contact you?"
          />
        </div>
      </div>

      {/* Message Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Message</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <SelectField
              label="Category"
              name="message_category"
              value={data.message_category}
              onChange={onChange}
              options={categories}
              placeholder="Select a category"
              required
            />
            <SelectField
              label="Message Type"
              name="message_type"
              value={data.message_type}
              onChange={onChange}
              options={messageTypes}
              placeholder="Select type"
              required
            />
          </div>
          <TextAreaField
            label="Your Message"
            name="message"
            value={data.message}
            onChange={onChange}
            placeholder="Please describe your question, suggestion, or feedback in detail..."
            required
            rows={6}
          />
        </div>
      </div>

      {/* Supporting Documents */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supporting Documents</h3>
        <p className="text-sm text-gray-500 mb-4">Optional - attach any relevant documents</p>
        <FileUploadField
          label="Upload Document"
          name="id_document_url"
          value={data.id_document_url}
          onChange={onChange}
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
        />
      </div>
    </div>
  );
}