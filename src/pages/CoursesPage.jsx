// src/pages/CoursesPage.jsx
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center bg-gray-900 p-8">
        <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-md shadow-lg transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>
          {loading ? (
            <p className="text-center">Loading courses...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="bg-white text-black px-3 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
                >
<h2 className="text-2xl md:text-3xl font-extrabold text-black">
  {course.title}
</h2>
<p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
  {course.description}
</p>



                  <Link
                    to={`/courses/${course._id}`}
                    className="inline-block bg-black text-white px-3 py-1 rounded-md transition-colors duration-300 hover:bg-gray-700"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
