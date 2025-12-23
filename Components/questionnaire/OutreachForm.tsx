import React from 'react';
import { TextField, TextAreaField, SelectField, CheckboxGroup } from './FormFields';

const ageGroups = [
  { value: 'under_18', label: 'Under 18' },
  { value: '18_25', label: '18 - 25' },
  { value: '26_35', label: '26 - 35' },
  { value: '36_50', label: '36 - 50' },
  { value: '50_plus', label: '50+' },
];

const outreachProjects = [
  { value: 'family', label: 'Family Projects' },
  { value: 'boyhood', label: 'Boyhood Projects' },
  { value: 'girlhood', label: 'Girlhood Projects' },
  { value: 'manhood', label: 'Manhood Projects' },
  { value: 'womanhood', label: 'Womanhood Projects' },
];

const roleInterests = [
  { value: 'participant', label: 'Participant' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'leader', label: 'Group Leader' },
];

const availabilityOptions = [
  { value: 'weekday_morning', label: 'Weekday Mornings' },
  { value: 'weekday_afternoon', label: 'Weekday Afternoons' },
  { value: 'saturday', label: 'Saturdays' },
  { value: 'sunday', label: 'Sundays' },
];

const transportOptions = [
  { value: 'own_transport', label: 'I have my own transport' },
  { value: 'public_transport', label: 'I use public transport' },
  { value: 'need_transport', label: 'I need transport assistance' },
];

export default function OutreachForm({ data, onChange }) {
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
          <SelectField
            label="Age Group"
            name="age_group"
            value={data.age_group}
            onChange={onChange}
            options={ageGroups}
            placeholder="Select your age group"
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

      {/* Project Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Selection</h3>
        <SelectField
          label="Outreach Project"
          name="outreach_project"
          value={data.outreach_project}
          onChange={onChange}
          options={outreachProjects}
          placeholder="Select a project"
          required
        />
        <p className="text-sm text-gray-500 mt-2">
          Our outreach programs include Family, Boyhood, Girlhood, Manhood, and Womanhood projects designed to address specific community needs.
        </p>
      </div>

      {/* Role Interest */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Role</h3>
        <SelectField
          label="How would you like to participate?"
          name="role_interest"
          value={data.role_interest}
          onChange={onChange}
          options={roleInterests}
          placeholder="Select your role interest"
          required
        />
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills to Contribute</h3>
        <TextAreaField
          label="What skills can you contribute?"
          name="skills_to_contribute"
          value={data.skills_to_contribute}
          onChange={onChange}
          placeholder="Tell us about any skills, experience, or talents you can bring to our outreach programs..."
          rows={4}
        />
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
        <CheckboxGroup
          label="When are you available?"
          name="availability"
          value={Array.isArray(data.availability) ? data.availability : []}
          onChange={onChange}
          options={availabilityOptions}
          required
        />
      </div>

      {/* Transportation */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transportation</h3>
        <SelectField
          label="Transportation needs"
          name="transportation_needs"
          value={data.transportation_needs}
          onChange={onChange}
          options={transportOptions}
          placeholder="Select your transportation situation"
        />
      </div>

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <TextField
          label="Emergency Contact (Name & Phone)"
          name="emergency_contact"
          value={data.emergency_contact}
          onChange={onChange}
          placeholder="e.g., John Doe - 079 123 4567"
          required
        />
      </div>
    </div>
  );
}