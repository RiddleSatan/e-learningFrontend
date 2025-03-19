// src/pages/CreateCoursePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateCoursePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Local state for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check user role; if not instructor/admin, show access denied
  if (!user || !['instructor', 'admin'].includes(user.role)) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-900 p-8">
          <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Access Denied</h1>
            <p className="text-center">You do not have permission to create courses.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      for (let i = 0; i < files.length; i++) {
        formData.append('multimedia', files[i]);
      }

      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          // Don't set "Content-Type" for FormData
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create course');
      }

      const data = await response.json();
      navigate(`/courses/${data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow flex items-center justify-center bg-gray-900 p-8">
        <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-md shadow-lg transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-center">Create a New Course</h1>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Course Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block mb-1">Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="mt-6"> 
  <label className="block text-sm font-medium text-gray-300 mb-2"> 
    Upload Multimedia
  </label>
  <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition-colors duration-300"> 
    <input
      type="file"
      name="multimedia"
      multiple
      onChange={handleFileChange}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
    />
    <div className="text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h20M32 8a4 4 0 014-4v0a4 4 0 014 4v0a4 4 0 01-4 4v0a4 4 0 01-4-4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-1 text-sm text-gray-500">
        Drag and drop files here, or click to select
      </p>
    </div>
  </div>
</div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCoursePage;
