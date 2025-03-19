// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quizzes/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz details');
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <>
   
        <main>
          <p>Loading quiz...</p>
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
  
      <main>
        <h1>{quiz.title}</h1>
        <form>
          {quiz.questions && quiz.questions.map((q) => (
            <div key={q._id}>
              <p>{q.question}</p>
              <input type="text" name={`question_${q._id}`} />
            </div>
          ))}
          <button type="submit">Submit Quiz</button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default QuizPage;
