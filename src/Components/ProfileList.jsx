import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError('Failed to fetch profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await axios.delete(`http://localhost:5000/profiles/${id}`);
        setProfiles(profiles.filter((profile) => profile.id !== id));
        alert('Profile deleted successfully!');
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Failed to delete profile. Please try again.');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading profiles...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (profiles.length === 0) return <div className="text-center mt-8">No profiles found.</div>;

  return (
    <section className="px-4 py-10">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="text-xl font-bold">{profile.username}</h3>
            <p className="text-gray-600">Email: {profile.email}</p>
            <p className="mt-2">Role: {profile.role}</p>
            <div className="flex space-x-2 mt-4">
              <Link to={`/edit-profile/${profile.id}`} className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800">
                Edit
              </Link>
              <button onClick={() => handleDelete(profile.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileList;
