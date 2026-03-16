import { useCallback, useState } from "react";
import { apiPost } from "@/lib/apiClient";

export interface RealitoMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface RealitoApiResponse {
  reply: string;
  gaSuggestion?: {
    recommendedPath: string[];
    confidenceScore: number;
    geneticGen: string;
    explanation: string;
  };
  intent: string;
  engine: string;
}

interface ChatMessageDTO {
  from: "user" | "realito";
  text: string;
}

export function useRealitoChat() {
  const [messages, setMessages] = useState<RealitoMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Soy Realito, el núcleo cognitivo de RDM·X. Puedo recomendarte rutas optimizadas con inteligencia de gemelo digital, contarte la historia de 5 siglos de minería, guiarte por la mejor gastronomía o planear aventuras en la montaña. ¿Qué experiencia buscas?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const send = useCallback(
    async (content: string) => {
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
        // Build context history from recent messages
        const contextHistory: ChatMessageDTO[] = messages.slice(-6).map((m) => ({
          from: m.role === "user" ? "user" : "realito",
          text: m.content,
        }));

        const payload = await apiPost<RealitoApiResponse>("/api/realito/chat", {
          message: text,
          contextHistory,
          userPreferences: {},
        });

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: payload.reply,
          },
        ]);
      } catch {
        // Fallback to local intelligence when API is unavailable
        const lowerText = text.toLowerCase();
        let fallbackReply: string;

        if (/ruta|tour|recorrido|caminar/.test(lowerText)) {
          fallbackReply =
            "Te recomiendo iniciar en el Centro Histórico, visitar la Mina de Acosta y cerrar en el Panteón Inglés. Es la ruta del patrimonio más popular y toma aproximadamente 1.5 horas.";
        } else if (/comer|paste|restaurante|comida/.test(lowerText)) {
          fallbackReply =
            "Los pastes son imperdibles — la Pastería El Portal frente a la plaza tiene la receta original córnica de 1824. Para comida completa, Los Portales sirve mole y barbacoa hidalguense.";
        } else if (/historia|mina|museo/.test(lowerText)) {
          fallbackReply =
            "Real del Monte tiene más de 5 siglos de historia. En 1766 ocurrió aquí la primera huelga laboral de América. La Mina de Acosta te permite descender 400m bajo tierra.";
        } else {
          fallbackReply =
            "Estoy en modo local pero puedo ayudarte. Te recomiendo iniciar en el Centro Histórico y la Mina de Acosta. ¿Buscas historia, gastronomía o aventura?";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: fallbackReply,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return { messages, isLoading, send };
}
