import React from 'react';
import { TextField, TextAreaField, SelectField, CheckboxGroup, FileUploadField } from './FormFields';

const branches = [
  { value: 'nelspruit', label: 'Nelspruit Main Office' },
  { value: 'johannesburg', label: 'Johannesburg Branch' },
  { value: 'pretoria', label: 'Pretoria Branch' },
  { value: 'durban', label: 'Durban Branch' },
  { value: 'cape_town', label: 'Cape Town Branch' },
];

const projectInterests = [
  { value: 'ambassadors', label: 'Social Life Change Ambassadors' },
  { value: 'help_centres', label: 'Sizanani Community Help Centres' },
  { value: 'outreach', label: 'Community Outreach & Healing' },
  { value: 'entrepreneurship', label: 'Entrepreneurship & Business' },
  { value: 'skills', label: 'Skills Development' },
  { value: 'agriculture', label: 'Farming, Agriculture & Sports' },
];

const availabilityOptions = [
  { value: 'weekdays_morning', label: 'Weekday Mornings' },
  { value: 'weekdays_afternoon', label: 'Weekday Afternoons' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'flexible', label: 'Flexible' },
];

export default function AmbassadorForm({ data, onChange }) {
  return (
    <div className="space-y-8">
      {/* Personal Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="First Name"
            name="full_name"
            value={data.full_name}
            onChange={onChange}
            placeholder="Enter your first name"
            required
          />
          <TextField
            label="Surname"
            name="surname"
            value={data.surname}
            onChange={onChange}
            placeholder="Enter your surname"
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
              required
            />
          </div>
          <TextField
            label="City"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="Enter your city"
            required
          />
          <TextField
            label="Postal Code"
            name="postal_code"
            value={data.postal_code}
            onChange={onChange}
            placeholder="Enter postal code"
            required
          />
        </div>
      </div>

      {/* Branch Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Selection</h3>
        <SelectField
          label="Nearest Sizanani Community Help Centre"
          name="branch_location"
          value={data.branch_location}
          onChange={onChange}
          options={branches}
          placeholder="Select your nearest branch"
          required
        />
      </div>

      {/* Verification Documents */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Documents</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <FileUploadField
            label="ID Document"
            name="id_document_url"
            value={data.id_document_url}
            onChange={onChange}
            accept=".pdf,.png,.jpg,.jpeg"
            required
          />
          <FileUploadField
            label="Selfie Photo"
            name="selfie_url"
            value={data.selfie_url}
            onChange={onChange}
            accept=".png,.jpg,.jpeg"
            required
          />
        </div>
      </div>

      {/* Motivation */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Motivation</h3>
        <TextAreaField
          label="Why do you want to become a Social Life Change Ambassador?"
          name="motivation"
          value={data.motivation}
          onChange={onChange}
          placeholder="Tell us about your motivation and what you hope to achieve..."
          required
          rows={5}
        />
      </div>

      {/* Areas of Interest */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Interest</h3>
        <CheckboxGroup
          label="Select the projects you're interested in"
          name="areas_of_interest"
          value={data.areas_of_interest || []}
          onChange={onChange}
          options={projectInterests}
          required
        />
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
        <SelectField
          label="When are you available?"
          name="availability"
          value={data.availability}
          onChange={onChange}
          options={availabilityOptions}
          placeholder="Select your availability"
          required
        />
      </div>
    </div>
  );
}