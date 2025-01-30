import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/phones');
        setPhones(response.data);
      } catch (error) {
        console.error('Error fetching phones:', error);
        setError('Failed to fetch phones. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this phone?')) {
      try {
        await axios.delete(`http://localhost:5000/phones/${id}`);
        setPhones(phones.filter((phone) => phone.id !== id));
        alert('Phone deleted successfully!');
      } catch (error) {
        console.error('Error deleting phone:', error);
        alert('Failed to delete phone. Please try again.');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading phones...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (phones.length === 0) return <div className="text-center mt-8">No phones found.</div>;

  return (
    <section className="px-4 py-10">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Phones</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phones.map((phone) => (
          <div key={phone.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-bold">{phone.name}</h3>
            <p className="text-gray-600">{phone.brand}</p>
            <p className="mt-2">Price: ${phone.price}</p>
            <div className="flex space-x-2 mt-4">
              <Link to={`/edit-phone/${phone.id}`} className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800">Edit</Link>
              <button onClick={() => handleDelete(phone.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhoneList;
