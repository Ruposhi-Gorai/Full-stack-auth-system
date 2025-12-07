import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { loginUser } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed! (Wrong email or password)");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
        <p className="text-gray-500 text-sm mb-4">Login to continue</p>

        {error && (
          <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={submit}>
        
          <InputField label="Email" name="email" type="email" onChange={change} />
          <InputField label="Password" name="password" type="password" onChange={change} />

          <button className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-3">
          Don’t have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
