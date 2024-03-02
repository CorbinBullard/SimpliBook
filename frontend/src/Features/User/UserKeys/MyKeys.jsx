import { Card } from "antd";
import React from "react";
import GenerateSecretKey from "./GenerateSecretKey";

export default function MyKeys({ publicKey }) {
  return (
    <Card title="My Keys" style={{ maxWidth: "35rem" }}>
      <p>Public Key: {publicKey}</p>
      <GenerateSecretKey />
    </Card>
  );
}
