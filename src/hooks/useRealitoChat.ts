import { useCallback, useState } from "react";

export interface RealitoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface RealitoChatResponse {
  reply?: string;
}

export function useRealitoChat() {
  const [messages, setMessages] = useState<RealitoMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Bienvenido a Real del Monte. Puedo recomendarte rutas, gastronomía y experiencias según tu intención.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const send = useCallback(async (content: string) => {
    const text = content.trim();
    if (!text) return;

    const userMessage: RealitoMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/realito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("No response");
      }

      const payload = (await response.json()) as RealitoChatResponse;
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: payload.reply ?? "Estoy preparando recomendaciones precisas para tu visita.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Por ahora estoy en modo local. Te recomiendo iniciar en el Centro Histórico y Mina La Acosta.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, send };
}
