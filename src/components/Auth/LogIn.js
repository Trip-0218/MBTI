import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        
        // Save token to localStorage or cookies
        localStorage.setItem("auth-token", data.authtoken);

        // Fetch user details to determine role
        const userResponse = await fetch("http://localhost:8080/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": data.authtoken
          },
        });

        const userData = await userResponse.json();

        // Redirect based on user role
        if (userData.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/home";
        }
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggles between text and password type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-green-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-500 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
