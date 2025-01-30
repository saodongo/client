import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Fetch feature details if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/feature/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch feature');
          return response.json();
        })
        .then(data => setFormData(data))
        .catch(error => console.error('Error fetching feature:', error));
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
      const url = id ? `http://localhost:5000/feature/${id}` : 'http://localhost:5000/feature';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save feature');

      alert(id ? 'Feature updated successfully!' : 'Feature added successfully!');
      navigate('/features'); // Redirect to features page
    } catch (error) {
      console.error('Error saving feature:', error);
      alert('Failed to save feature. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        const response = await fetch(`http://localhost:5000/feature/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete feature');

        alert('Feature deleted successfully!');
        navigate('/features'); // Redirect to features page
      } catch (error) {
        console.error('Error deleting feature:', error);
        alert('Failed to delete feature. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Feature' : 'Add Feature'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Feature Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
        >
          {id ? 'Update Feature' : 'Add Feature'}
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Delete Feature
          </button>
        )}
      </form>
    </div>
  );
};

export default AddFeature;