// src/pages/LessonPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const LessonPage = () => {
  const {  lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lesson details');
        }
        const data = await response.json();
        setLesson(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <>
   
        <main>
          <p>Loading lesson details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>

        <main>
          <p>Error: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <h1>{lesson.title}</h1>
        <p>{lesson.content}</p>
      </main>
      <Footer />
    </>
  );
};

export default LessonPage;
