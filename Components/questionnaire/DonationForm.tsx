import React from 'react';
import { TextField, SelectField, FileUploadField } from './FormFields';
import { Copy, Check, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const donationTypes = [
  { value: 'once_off', label: 'Once-off Donation' },
  { value: 'monthly', label: 'Monthly Donation' },
  { value: 'project_specific', label: 'Project-specific Donation' },
];

const projectOptions = [
  { value: 'ambassadors', label: 'Social Life Change Ambassadors' },
  { value: 'help_centres', label: 'Sizanani Community Help Centres' },
  { value: 'outreach', label: 'Community Outreach & Healing' },
  { value: 'entrepreneurship', label: 'Entrepreneurship & Business Development' },
  { value: 'skills', label: 'Skills Development & Industrialisation' },
  { value: 'agriculture', label: 'Farming, Agriculture & Sports Development' },
  { value: 'general', label: 'General Fund (Where Most Needed)' },
];

const amountPresets = ['100', '250', '500', '1000', '2500', '5000'];

export default function DonationForm({ data, onChange }) {
  const [copiedField, setCopiedField] = React.useState(null);

  const bankingDetails = [
    { label: 'Account Name', value: 'Mzansi Prolife Development Institute NPC' },
    { label: 'Bank', value: 'Capitec Business' },
    { label: 'Account Number', value: '1053 5763 31' },
  ];

  const copyToClipboard = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopiedField(label);
    toast.success(`${label} copied`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Banking Details Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">Banking Details for EFT</h3>
            <p className="text-green-100 text-sm">Transfer your donation to:</p>
          </div>
        </div>

        <div className="space-y-3">
          {bankingDetails.map((detail) => (
            <div 
              key={detail.label}
              className="bg-white/10 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-green-100 text-xs">{detail.label}</p>
                <p className="font-semibold">{detail.value}</p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(detail.label, detail.value)}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {copiedField === detail.label ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Type */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h3>
        <SelectField
          label="Donation Type"
          name="donation_type"
          value={data.donation_type}
          onChange={onChange}
          options={donationTypes}
          placeholder="Select donation type"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (ZAR) <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
          {amountPresets.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onChange('donation_amount', amount)}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                data.donation_amount === amount
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50'
              }`}
            >
              R{amount}
            </button>
          ))}
        </div>
        <TextField
          label=""
          name="donation_amount"
          type="number"
          value={data.donation_amount}
          onChange={onChange}
          placeholder="Or enter custom amount"
        />
      </div>

      {/* Project Allocation */}
      <SelectField
        label="Allocate to Project"
        name="project_allocation"
        value={data.project_allocation}
        onChange={onChange}
        options={projectOptions}
        placeholder="Select a project (optional)"
      />

      {/* Personal Details (Optional) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Details</h3>
        <p className="text-sm text-gray-500 mb-4">Optional - for donation receipt</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Full Name"
            name="full_name"
            value={data.full_name}
            onChange={onChange}
            placeholder="Enter your name"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            placeholder="For receipt"
          />
          <TextField
            label="Phone"
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="Contact number"
          />
        </div>
      </div>

      {/* Proof of Payment */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Proof of Payment</h3>
        <FileUploadField
          label="Upload Proof of Payment"
          name="proof_of_payment_url"
          value={data.proof_of_payment_url}
          onChange={onChange}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </div>
    </div>
  );
}