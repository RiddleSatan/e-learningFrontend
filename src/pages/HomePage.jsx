import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/courses/featured');
        if (!response.ok) {
          throw new Error('Failed to fetch featured courses');
        }
        const data = await response.json();
        setFeaturedCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen rounded-md">
  

      {/* Main Content with uniform spacing */}
      <main className="flex-grow flex items-center justify-center bg-gray-900 text-white px-8 rounded-md">
        {/* Content container */}
        <div className="w-full max-w-4xl bg-gray-800 text-white p-8 rounded-md shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome to E-Learning Platform</h1>
          <p className="text-center mb-6">Explore courses and start learning.</p>
          <div className="flex justify-center mb-8">
            <Link
              to="/courses"
              className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
            >
              Browse Courses
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-center">Featured Courses</h2>
            {loading && <p className="text-center">Loading featured courses...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {!loading && !error && (
              <ul className="space-y-4">
                {featuredCourses.map((course) => (
                  <li
                    key={course._id}
                    className="bg-white text-black px-3 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
                  >
                    <Link to={`/courses/${course._id}`}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
