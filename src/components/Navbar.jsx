import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  // Base and active link styles
  const baseLinkClasses =
    "px-3  rounded-md transition-colors duration-300 hover:bg-white hover:text-black";
  const activeClasses = "bg-white text-black";

  return (
    <nav className="w-full bg-black text-white p-4 rounded-md border-b border-gray-700 shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left Side Navigation */}
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/forum"
            className={({ isActive }) =>
              isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
            }
          >
            Forum
          </NavLink>
          {user && user.role === "instructor" && (
            <NavLink
              to="/create-course"
              className={({ isActive }) =>
                isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
              }
            >
              Create Course
            </NavLink>
          )}
          {user && user.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
              }
            >
              Admin Panel
            </NavLink>
          )}
        </div>

        {/* Right Side (Auth Buttons) */}
        <div className="flex items-center space-x-4 ml-auto">
          {user ? (
            <button
              onClick={logout}
              className="bg-gray-800 px-3 py-1 rounded-md hover:bg-gray-700 transition-colors duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${baseLinkClasses} ${activeClasses}` : baseLinkClasses
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
