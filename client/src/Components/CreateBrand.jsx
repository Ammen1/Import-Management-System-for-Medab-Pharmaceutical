import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Label, TextInput } from 'flowbite-react';

export default function CreateBrand() {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/backend/brands', { label, value });
      setLabel('');
      setValue('');
      setError('');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while creating the brand.');
      }
    }
  };

  return (
    <div className="container mx-auto py-8 mt-20 lg:ml-36 ml-10">
      <h2 className="text-2xl font-bold mb-4">Create Brand</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-4 lg:mr-20 mr-20'>
        <div className="mb-4">
          <Label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">Label:</Label>
          <TextInput
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            className=" border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">Value:</Label>
          <TextInput
            type="text"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className=" border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Create Brand
        </Button>
      </form>
    </div>
  );
}
