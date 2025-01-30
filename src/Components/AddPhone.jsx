import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPhone = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
  });

  // Fetch phone details if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/phone/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch phone');
          return response.json();
        })
        .then(data => setFormData(data))
        .catch(error => console.error('Error fetching phone:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PATCH' : 'POST';
      const url = id ? `http://localhost:5000/phone/${id}` : `http://localhost:5000/phone`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save phone');

      alert(id ? 'Phone updated successfully!' : 'Phone added successfully!');
      navigate('/phones'); // Redirect to phones page
    } catch (error) {
      console.error('Error saving phone:', error);
      alert('Failed to save phone. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this phone?')) {
      try {
        const response = await fetch(`http://localhost:5000/phone/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete phone');

        alert('Phone deleted successfully!');
        navigate('/phones'); // Redirect to phones page
      } catch (error) {
        console.error('Error deleting phone:', error);
        alert('Failed to delete phone. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Phone' : 'Add Phone'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id ? 'Update Phone' : 'Add Phone'}
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Delete Phone
          </button>
        )}
      </form>
    </div>
  );
};

export default EditPhone;
