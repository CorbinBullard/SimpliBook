import { Button } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { SimpliBookKeys } from "../../utils/constants";
import ExternalTestPage from "../../pages/ExternalTestPage";

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
      <Button onClick={handleSubmit}>SIGN IN</Button>
      <ExternalTestPage />
    </div>
  );
}
