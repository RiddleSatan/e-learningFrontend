// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users (assuming /api/users exists for admin)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
  
      <main>
        <h1>Admin Dashboard</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <section>
          <h2>Manage Users</h2>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  {user.name} - {user.email} ({user.role})
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Manage Courses</h2>
          {loadingCourses ? (
            <p>Loading courses...</p>
          ) : (
            <ul>
              {courses.map((course) => (
                <li key={course._id}>
                  <strong>{course.title}</strong> - {course.description}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Manage Content</h2>
          {/* Aap yahan content management ka code add kar sakte hain */}
          <p>Feature coming soon...</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboardPage;
