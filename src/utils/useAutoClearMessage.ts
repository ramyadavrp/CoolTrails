import { useEffect } from "react";

/**
 * Automatically clears a message after a given delay.
 *
 * @param message - The current message state (string or null)
 * @param setMessage - The state setter for the message
 * @param delay - Delay in milliseconds before clearing (default 3000)
 */
export const useAutoClearMessage = (
  message: string | null,
  setMessage: React.Dispatch<React.SetStateAction<string | null>>,
  delay: number = 3000
): void => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), delay);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage, delay]);
};
