import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, Label } from 'flowbite-react';

export default function ProductReportForm() {
  const [customerName, setCustomerName] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [description, setDescription] = useState(''); // Added description state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send a POST request to generate the product report
      const response = await axios.post('http://localhost:8080/backend/products/generate', {
        customerName,
        medicineName,
        quantity,
        totalPrice,
        paymentMethod,
        description, // Include description in the request
      });
      
      console.log('Product report generated successfully:', response.data);
      alert('Product report generated successfully!');
    } catch (error) {
      console.error('Error generating product report:', error);
      setError('Failed to generate product report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 mt-20">
      <h2 className="text-2xl font-bold mb-4">Generate Product Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="customerName">Customer Name:</Label>
          <TextInput
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="medicineName">Medicine Name:</Label>
          <TextInput
            id="medicineName"
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity:</Label>
          <TextInput
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="totalPrice">Total Price:</Label>
          <TextInput
            id="totalPrice"
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="paymentMethod">Payment Method:</Label>
          <TextInput
            id="paymentMethod"
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description:</Label> {/* Added description field */}
          <TextInput
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </Button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
