import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-xl space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-800">Login</h2>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold w-full"
      >
        Login
      </button>
    </form>
  );
}
