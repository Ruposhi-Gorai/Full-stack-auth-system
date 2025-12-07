import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
      <h1
        className="text-lg font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        AuthApp
      </h1>

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link className="hover:text-gray-300" to="/login">
              Login
            </Link>
            <Link
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm"
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button
              className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
