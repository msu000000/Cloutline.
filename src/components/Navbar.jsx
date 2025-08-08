import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signIn, signUp, signOut } = useAuth();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("signin"); // or 'signup'
  const [dark, setDark] = useState(true);

  const toggleDark = () => {
    setDark((d) => {
      const newVal = !d;
      if (newVal) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return newVal;
    });
  };

  const doAuth = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signin") await signIn(email, pw);
      else await signUp(email, pw);
      setShow(false);
      setEmail("");
      setPw("");
    } catch (err) {
      alert(err.message || "Auth error");
    }
  };

  return (
    <>
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Cloutline</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleDark}>
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
            {user ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <button onClick={() => setShow(true)}>Sign In</button>
            )}
          </div>
        </div>
      </header>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={doAuth}
            className="bg-white text-black p-6 rounded shadow-lg w-80"
          >
            <h2 className="text-lg font-bold mb-4">
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="border p-2 w-full mb-4"
              required
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </button>
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-sm text-blue-500 underline"
              >
                {mode === "signin" ? "Need an account?" : "Have an account?"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="mt-4 text-sm text-red-500 underline"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
