import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import ForumPage from "./pages/ForumPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen p-2 bg-white">
          <Navbar />
          <div className="mt-2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
              <Route path="/courses/:courseId/quizzes/:quizId" element={<QuizPage />} />
              <Route
                path="/create-course"
                element={<PrivateRoute element={<CreateCoursePage />} roles={['instructor', 'admin']} />}
              />
              <Route
                path="/edit-course/:courseId"
                element={<PrivateRoute element={<EditCoursePage />} roles={['instructor']} />}
              />
              <Route path="/forum" element={<ForumPage />} />
              <Route
                path="/admin"
                element={<PrivateRoute element={<AdminDashboardPage />} roles={['admin']} />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
