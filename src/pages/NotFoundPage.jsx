// src/pages/NotFoundPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <h1>404 - Page Not Found</h1>
        <Link to="/">Go Back Home</Link>
      </main>
      <Footer />
    </>
  );
}

export default NotFoundPage;
