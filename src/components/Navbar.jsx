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
      <header className="bg-gray-900 text-white p-4
