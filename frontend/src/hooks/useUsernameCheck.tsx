import { useState, useEffect } from "react";
import axios from "axios";

export const useUsernameCheck = (username: string) => {
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!username || username.trim().length < 3) {
      setStatus("idle");
      setMessage("Enter at least 3 characters");
      return;
    }

    const debounceDelay = setTimeout(async () => {
      setStatus("checking");

      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/profile",
          {
            params: { username },
          }
        );

        if (response.data.available === true) {
          setStatus("available");
          setMessage("Username is available");

        } else {
          setStatus("taken");
          setMessage("Username is already taken");

        }

      } catch (error) {
        console.error("Error checking username:", error);
        setStatus("error");
      }
    }, 800);

    return () => clearTimeout(debounceDelay);
  }, [username]);

  return { status, message };
};
