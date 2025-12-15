/**
 * Voice Input Hook
 * Handles Web Speech API for voice-to-text conversion
 */

import { useState, useEffect, useCallback, useRef } from "react";

// Extend Window interface for Web Speech API
interface IWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SpeechRecognition?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition?: any;
}

interface UseVoiceInputReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export function useVoiceInput(): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Check if browser supports Web Speech API
  useEffect(() => {
    const windowWithSpeech = window as IWindow;
    const SpeechRecognitionAPI =
      windowWithSpeech.SpeechRecognition ||
      windowWithSpeech.webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false; // Stop after one phrase
      recognitionRef.current.interimResults = true; // Show interim results
      recognitionRef.current.lang = "en-US";

      // Handle results
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      // Handle errors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);

        switch (event.error) {
          case "no-speech":
            setError("No speech detected. Please try again.");
            break;
          case "audio-capture":
            setError("Microphone not found. Please check your device.");
            break;
          case "not-allowed":
            setError(
              "Microphone access denied. Please enable it in your browser settings.",
            );
            break;
          case "network":
            setError("Network error. Please check your connection.");
            break;
          default:
            setError(`Error: ${event.error}`);
        }
      };

      // Handle end
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
      setError("Speech recognition is not supported in your browser.");
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      setError("Speech recognition is not available.");
      return;
    }

    try {
      setError(null);
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error("Error starting recognition:", err);
      setError("Failed to start voice recognition. Please try again.");
      setIsListening(false);
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
