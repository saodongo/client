import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/features');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
        setError('Failed to fetch features. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await axios.delete(`http://localhost:5000/features/${id}`);
        setFeatures(features.filter((feature) => feature.id !== id));
        alert('Feature deleted successfully!');
      } catch (error) {
        console.error('Error deleting feature:', error);
        alert('Failed to delete feature. Please try again.');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading features...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (features.length === 0) return <div className="text-center mt-8">No features found.</div>;

  return (
    <section className="px-4 py-10">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-bold">{feature.name}</h3>
            <p className="text-gray-600">{feature.description}</p>
            <div className="flex space-x-2 mt-4">
              <Link to={`/edit-feature/${feature.id}`} className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800">Edit</Link>
              <button onClick={() => handleDelete(feature.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureList;
