import React from 'react';
import { TextField, TextAreaField, SelectField, FileUploadField } from './FormFields';
import { Package, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const availableProducts = [
  { id: 'tshirt', name: 'Mzansi Prolife T-Shirt', price: 150 },
  { id: 'cap', name: 'Branded Cap', price: 80 },
  { id: 'bag', name: 'Canvas Tote Bag', price: 120 },
  { id: 'sticker', name: 'Sticker Pack', price: 30 },
  { id: 'poster', name: 'Inspirational Poster', price: 50 },
];

const deliveryTimes = [
  { value: 'morning', label: 'Morning (8AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'anytime', label: 'Anytime' },
];

export default function ProductOrderForm({ data, onChange }) {
  const products = data.products_ordered || [];

  const addProduct = (product) => {
    const existing = products.find(p => p.id === product.id);
    if (existing) {
      const updated = products.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      onChange('products_ordered', updated);
    } else {
      onChange('products_ordered', [...products, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, delta) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const newQty = Math.max(0, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }).filter(p => p.quantity > 0);
    onChange('products_ordered', updated);
  };

  const removeProduct = (productId) => {
    onChange('products_ordered', products.filter(p => p.id !== productId));
  };

  const totalAmount = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <div className="space-y-8">
      {/* Product Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Products</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {availableProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => addProduct(product)}
              className="p-4 border border-gray-200 rounded-xl text-left hover:border-green-400 hover:bg-green-50 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800 mt-3">{product.name}</h4>
              <p className="text-green-600 font-semibold">R{product.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      {products.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Order</h3>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">R{product.price} each</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, -1)}
                      className="p-2 hover:bg-gray-200 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{product.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="p-2 hover:bg-gray-200 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-green-600">R{totalAmount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
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
          <TextField
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
          <SelectField
            label="Preferred Delivery Time"
            name="best_time_to_contact"
            value={data.best_time_to_contact}
            onChange={onChange}
            options={deliveryTimes}
            placeholder="Select time"
          />
        </div>
      </div>

      {/* Delivery Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <TextField
              label="Street Address"
              name="address"
              value={data.address}
              onChange={onChange}
              placeholder="Enter delivery address"
              required
            />
          </div>
          <TextField
            label="City"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="Enter city"
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

      {/* Proof of Payment */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <p className="text-amber-800 text-sm">
            <strong>Banking Details:</strong> Capitec Business, Account: 1053 5763 31, Account Name: Mzansi Prolife Development Institute NPC
          </p>
        </div>
        <FileUploadField
          label="Upload Proof of Payment"
          name="proof_of_payment_url"
          value={data.proof_of_payment_url}
          onChange={onChange}
          accept=".pdf,.png,.jpg,.jpeg"
          required
        />
      </div>
    </div>
  );
}