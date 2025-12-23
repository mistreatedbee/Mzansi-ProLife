import React from 'react';
import { TextField, TextAreaField, SelectField, FileUploadField } from './FormFields';

const positions = [
  { value: 'community_coordinator', label: 'Community Coordinator' },
  { value: 'project_manager', label: 'Project Manager' },
  { value: 'admin_assistant', label: 'Administrative Assistant' },
  { value: 'field_worker', label: 'Field Worker' },
  { value: 'trainer', label: 'Trainer / Facilitator' },
  { value: 'marketing', label: 'Marketing & Communications' },
  { value: 'other', label: 'Other' },
];

export default function JobApplicationForm({ data, onChange }) {
  return (
    <div className="space-y-8">
      {/* Personal Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Full Name"
            name="full_name"
            value={data.full_name}
            onChange={onChange}
            placeholder="Enter your full name"
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
            required
          />
          <TextField
            label="ID Number"
            name="id_number"
            value={data.id_number}
            onChange={onChange}
            placeholder="Enter your ID number"
            required
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <TextField
              label="Street Address"
              name="address"
              value={data.address}
              onChange={onChange}
              placeholder="Enter your street address"
            />
          </div>
          <TextField
            label="City"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="Enter your city"
          />
          <TextField
            label="Postal Code"
            name="postal_code"
            value={data.postal_code}
            onChange={onChange}
            placeholder="Enter postal code"
          />
        </div>
      </div>

      {/* Position */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Position Applied For</h3>
        <SelectField
          label="Position"
          name="position_applied"
          value={data.position_applied}
          onChange={onChange}
          options={positions}
          placeholder="Select a position"
          required
        />
      </div>

      {/* Qualifications & Experience */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Qualifications & Experience</h3>
        <div className="space-y-4">
          <TextAreaField
            label="Qualifications"
            name="qualifications"
            value={data.qualifications}
            onChange={onChange}
            placeholder="List your qualifications, certifications, and education..."
            rows={4}
          />
          <TextAreaField
            label="Work Experience"
            name="experience"
            value={data.experience}
            onChange={onChange}
            placeholder="Describe your relevant work experience..."
            rows={4}
          />
        </div>
      </div>

      {/* Documents */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FileUploadField
            label="Upload CV / Resume"
            name="cv_url"
            value={data.cv_url}
            onChange={onChange}
            accept=".pdf,.doc,.docx"
            required
          />
          <FileUploadField
            label="Qualifications Certificate"
            name="id_document_url"
            value={data.id_document_url}
            onChange={onChange}
            accept=".pdf,.png,.jpg,.jpeg"
          />
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Earliest Start Date"
            name="availability"
            type="date"
            value={data.availability}
            onChange={onChange}
          />
          <TextField
            label="Salary Expectation (ZAR)"
            name="salary_expectation"
            value={data.salary_expectation}
            onChange={onChange}
            placeholder="e.g., R15,000 - R20,000"
          />
        </div>
      </div>
    </div>
  );
}