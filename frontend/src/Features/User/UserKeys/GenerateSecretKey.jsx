import React, { useState } from "react";
import { Input, Button, message, Form, Card, Flex } from "antd";
import { generateSecureKey } from "../../../utils/utilFunctions";

export default function GenerateSecretKey() {
  const [key, setKey] = useState("");

  const generateKey = () => {
    // Assuming generateSecureKey is defined and generates a 32-byte key
    const newKey = generateSecureKey(32); // Replace with your key generation logic
    setKey(newKey);
    fetch("/api/users/secret", {
      method: "PUT",
      body: JSON.stringify({ private_key: newKey }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const copyToClipboard = async () => {
    if (!key) return; // Do nothing if the key is empty
    try {
      await navigator.clipboard.writeText(key);
      message.success("Key copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy the key.");
    }
  };

  return (
    <Flex gap={1}>
      <Button onClick={generateKey}>Generate Key</Button>
      <Input
        value={key}
        onClick={copyToClipboard}
        readOnly
        placeholder="Click to generate and copy the key"
        type="password"
        style={{ cursor: "pointer" }}
      />
    </Flex>
  );
}
