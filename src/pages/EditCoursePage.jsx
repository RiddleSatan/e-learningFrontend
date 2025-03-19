// src/pages/EditCoursePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/useAuth';

const EditCoursePage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [existingMultimedia, setExistingMultimedia] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user has permission (instructor or admin)
  useEffect(() => {
    if (!user || !['instructor', 'admin'].includes(user.role)) {
      setError('You do not have permission to edit courses.');
      setLoading(false);
    }
  }, [user]);

  // Fetch existing course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setExistingMultimedia(data.multimedia || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && ['instructor', 'admin'].includes(user.role)) {
      fetchCourse();
    }
  }, [courseId, user]);

  const handleFileChange = (e) => {
    setNewFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !['instructor', 'admin'].includes(user.role)) {
      setError('You do not have permission to edit courses.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create FormData for partial updates + file uploads
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      // If user selected new files, append them
      for (let i = 0; i < newFiles.length; i++) {
        formData.append('multimedia', newFiles[i]);
      }

      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      const updatedCourse = await response.json();
      // Redirect to updated course detail page
      navigate(`/courses/${updatedCourse._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>

        <main>
          <p>Loading course data...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
      
        <main>
          <p style={{ color: 'red' }}>{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
  
      <main>
        <h1>Edit Course: {courseId}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Course Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Existing multimedia (if you want to show or remove them) */}
          <div>
            <label>Existing Multimedia:</label>
            <ul>
              {existingMultimedia.map((file, idx) => (
                <li key={idx}>{file}</li>
              ))}
            </ul>
          </div>

          <div>
            <label>Upload New Multimedia:</label>
            <input
              type="file"
              name="multimedia"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Course'}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default EditCoursePage;
