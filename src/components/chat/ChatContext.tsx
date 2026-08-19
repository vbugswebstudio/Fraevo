"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChatOverlay } from "@/components/chat/ChatOverlay";

interface ChatContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ChatContext = createContext<ChatContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  const open = useCallback(() => {
    setIsOpen(true);
    setSessionId((id) => id + 1);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <ChatContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ChatOverlay isOpen={isOpen} onClose={close} sessionId={sessionId} />
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}