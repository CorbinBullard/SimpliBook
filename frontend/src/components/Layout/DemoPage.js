import React from "react";
import { useNavigate } from "react-router";

export default function DemoPage({ session }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential: "demo@user.com",
        password: "password",
      }),
    }).then(() => {
      navigate("/dashboard");
    });
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSubmit}>SIGN IN</button>
    </div>
  );
}
