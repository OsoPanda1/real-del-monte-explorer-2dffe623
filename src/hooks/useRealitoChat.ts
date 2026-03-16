import { useCallback, useState } from "react";

export interface RealitoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface RealitoChatResponse {
  reply?: string;
  trace?: {
    interactionId: string;
    source: string;
  };
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
  const [lastTraceId, setLastTraceId] = useState<string | null>(null);

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
      const nextHistory = [...messages, userMessage].map((message) => ({
        role: message.role,
        content: message.content,
      }));

      const response = await fetch("/api/realito/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: nextHistory,
          context: { queryType: text },
        }),
      });

      if (!response.ok) {
        throw new Error("No response");
      }

      const payload = (await response.json()) as RealitoChatResponse;
      if (payload.trace?.interactionId) {
        setLastTraceId(payload.trace.interactionId);
      }

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
          content: "Ahora estoy en modo de respaldo. Te sugiero Centro Histórico, Mina La Acosta y la Ruta Gastronómica del Paste.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, send, lastTraceId };
}
