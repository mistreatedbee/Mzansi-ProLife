import React from 'react';
import { TextField, TextAreaField, SelectField, FileUploadField } from './FormFields';

const industries = [
  { value: 'retail', label: 'Retail' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'construction', label: 'Construction' },
  { value: 'financial', label: 'Financial Services' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'other', label: 'Other' },
];

const adTypes = [
  { value: 'banner', label: 'Banner Advertisement' },
  { value: 'featured', label: 'Featured Listing' },
  { value: 'sponsorship', label: 'Event Sponsorship' },
  { value: 'partnership', label: 'Partnership' },
];

const targetAudiences = [
  { value: 'all', label: 'All Communities' },
  { value: 'ambassadors', label: 'Social Life Change Ambassadors' },
  { value: 'help_centres', label: 'Sizanani Community Help Centres' },
  { value: 'outreach', label: 'Community Outreach Programs' },
  { value: 'entrepreneurship', label: 'Entrepreneurs & Business' },
  { value: 'skills', label: 'Skills Development Programs' },
  { value: 'agriculture', label: 'Farming & Agriculture' },
];

const budgetRanges = [
  { value: 'under_5k', label: 'Under R5,000' },
  { value: '5k_10k', label: 'R5,000 - R10,000' },
  { value: '10k_25k', label: 'R10,000 - R25,000' },
  { value: '25k_50k', label: 'R25,000 - R50,000' },
  { value: 'over_50k', label: 'Over R50,000' },
];

export default function AdvertiseForm({ data, onChange }) {
  return (
    <div className="space-y-8">
      {/* Company Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Company Name"
            name="company_name"
            value={data.company_name}
            onChange={onChange}
            placeholder="Enter company name"
            required
          />
          <TextField
            label="Company Registration Number"
            name="company_registration"
            value={data.company_registration}
            onChange={onChange}
            placeholder="e.g., 2020/123456/07"
          />
          <SelectField
            label="Industry"
            name="industry"
            value={data.industry}
            onChange={onChange}
            options={industries}
            placeholder="Select industry"
            required
          />
        </div>
      </div>

      {/* Contact Person */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Person</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Full Name"
            name="full_name"
            value={data.full_name}
            onChange={onChange}
            placeholder="Enter contact person name"
            required
          />
          <TextField
            label="Position"
            name="position_applied"
            value={data.position_applied}
            onChange={onChange}
            placeholder="e.g., Marketing Manager"
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            placeholder="Enter email"
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
      </div>

      {/* Advertisement Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advertisement Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <SelectField
            label="Advertisement Type"
            name="ad_type"
            value={data.ad_type}
            onChange={onChange}
            options={adTypes}
            placeholder="Select ad type"
            required
          />
          <SelectField
            label="Target Audience"
            name="project_allocation"
            value={data.project_allocation}
            onChange={onChange}
            options={targetAudiences}
            placeholder="Select target audience"
            required
          />
          <TextField
            label="Start Date"
            name="availability"
            type="date"
            value={data.availability}
            onChange={onChange}
            required
          />
          <SelectField
            label="Budget Range"
            name="budget_range"
            value={data.budget_range}
            onChange={onChange}
            options={budgetRanges}
            placeholder="Select budget"
            required
          />
        </div>
      </div>

      {/* Company Media */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Logo / Media</h3>
        <FileUploadField
          label="Upload Company Logo or Advertisement Media"
          name="id_document_url"
          value={data.id_document_url}
          onChange={onChange}
          accept=".png,.jpg,.jpeg,.pdf"
        />
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <TextAreaField
          label="Tell us more about your advertising goals"
          name="message"
          value={data.message}
          onChange={onChange}
          placeholder="Describe what you hope to achieve with this advertisement, any specific requirements, or additional information..."
          rows={4}
        />
      </div>
    </div>
  );
}