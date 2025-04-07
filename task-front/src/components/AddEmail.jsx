import React, { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AddEmail({ onAddEmail }) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(false);
    setError("");

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      if (!value) {
        setError("Email je obavezan.");
        setIsValid(false);
      } else if (!emailRegex.test(value)) {
        setError("Email nije validan.");
        setIsValid(false);
      } else {
        setError("");
        setIsValid(true);
      }
    }, 300);

    setTypingTimeout(timeout);
  };

  const handleAddEmail = () => {
    if (isValid) {
      onAddEmail(email);
      setEmail("");
      setIsValid(false);
      setError("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 justify-items-start">
        Add Email to Database
      </h2>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          className="max-w-xs h-10 w-80"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          isInvalid={!isValid && !!error}
          errorMessage={error}
        />
        <Button
          className="h-10 "
          color="primary"
          onClick={handleAddEmail}
          isDisabled={!isValid}
        >
          Add Email
        </Button>
      </div>
    </div>
  );
}
