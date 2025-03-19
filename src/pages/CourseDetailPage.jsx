// src/pages/CourseDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 rounded-md">
        <main className="flex-grow flex items-center justify-center p-8 rounded-md">
          <p>Loading course details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 rounded-md">
        <main className="flex-grow flex items-center justify-center p-8 rounded-md">
          <p>Error: {error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 rounded-md">
      <main className="flex-grow p-8 rounded-md">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="mb-6">{course.description}</p>

        {/* Multimedia Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Multimedia</h2>
          {course.multimedia && course.multimedia.length > 0 ? (
            <ul className="space-y-2">
              {course.multimedia.map((fileUrl, index) => {
                const absoluteUrl = `http://localhost:5000${fileUrl}`;
                return (
                  <li key={index}>
                    <a
                      href={absoluteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      {fileUrl}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No multimedia files uploaded.</p>
          )}
        </section>

        {/* Lessons Section */}
        {course.lessons && course.lessons.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
            <ul className="space-y-2">
              {course.lessons.map((lesson) => (
                <li key={lesson._id}>
                  <Link
                    to={`/courses/${courseId}/lessons/${lesson._id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Quizzes Section */}
        {course.quizzes && course.quizzes.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
            <ul className="space-y-2">
              {course.quizzes.map((quiz) => (
                <li key={quiz._id}>
                  <Link
                    to={`/courses/${courseId}/quizzes/${quiz._id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    {quiz.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
