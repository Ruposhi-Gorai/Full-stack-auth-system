import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { signupUser } from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name || form.name.trim().length === 0) {
      setError('Please enter your name.');
      return;
    }
    if (!form.email || !emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.password || form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      const res = await signupUser(form);
      setSuccess(res.data?.message || 'Signup successful');
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      // log full error for debugging
      // eslint-disable-next-line no-console
      console.error('Signup error:', err);
      setError(
        err?.response?.data?.message || err?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-1">Create an Account</h1>
        <p className="text-gray-500 text-sm mb-4">Sign up to continue</p>

        {error && (
          <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 px-3 py-2 rounded mb-3 text-sm">
            {success}
          </p>
        )}

        <form onSubmit={submit}>
          <InputField label="Name" name="name" onChange={change} />
          <InputField label="Email" name="email" type="email" onChange={change} />
          <InputField label="Password" name="password" type="password" onChange={change} />

          <button
            type="submit"
            disabled={loading}
            className={
              "w-full text-white py-2 rounded mt-2 transition " +
              (loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700")
            }
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
