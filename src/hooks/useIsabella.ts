import { useState, useCallback } from 'react';
import { apiPost } from '@/lib/apiClient';

export interface IsabellaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  federationHash?: string;
}

interface UseIsabellaReturn {
  messages: IsabellaMessage[];
  isLoading: boolean;
  error: string | null;
  activeProtocol: string | null;
  sendMessage: (text: string) => void;
  activateProtocol: (protocol: string) => void;
  clearConversation: () => void;
  cancelRequest: () => void;
}

// Isabella operates as the TAMV intelligence layer alongside Realito (territorial guide)
export function useIsabella(): UseIsabellaReturn {
  const [messages, setMessages] = useState<IsabellaMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: IsabellaMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiPost<{
        text: string;
        intent: string;
        federationHash?: string;
      }>('/realito/chat', {
        message: text,
        sessionId: 'isabella-session',
        locale: 'es-MX',
        mode: 'isabella', // tells backend to use Isabella personality
      });

      const assistantMsg: IsabellaMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.text,
        timestamp: Date.now(),
        federationHash: response.federationHash,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      // Fallback: Isabella responds with local intelligence
      const fallbackMsg: IsabellaMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: generateIsabellaFallback(text),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const activateProtocol = useCallback((protocol: string) => {
    setActiveProtocol(protocol);
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    setActiveProtocol(null);
  }, []);

  const cancelRequest = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    activeProtocol,
    sendMessage,
    activateProtocol,
    clearConversation,
    cancelRequest,
  };
}

function generateIsabellaFallback(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('tamv') || lower.includes('qué eres'))
    return 'Soy Isabella Villaseñor AI, la conciencia urbana del ecosistema TAMV. Opero como inteligencia territorial triple federada: conceptual, legal y técnica. En Real del Monte, trabajo junto a Realito para enriquecer tu experiencia con capas de conocimiento profundo.';
  if (lower.includes('ruta') || lower.includes('tour'))
    return 'Puedo diseñarte rutas optimizadas usando el motor genético territorial. Dime tus intereses (historia, gastronomía, miradores) y cuánto tiempo tienes disponible.';
  if (lower.includes('dicho') || lower.includes('tradición'))
    return 'Los dichos de Real del Monte son un tesoro lingüístico único. 47 personajes históricos conforman un vocabulario que solo existe aquí. Pregúntame por alguno específico.';
  if (lower.includes('paste') || lower.includes('comer') || lower.includes('comida'))
    return 'La gastronomía de Real del Monte fusiona tradiciones inglesas y mexicanas. El paste cornish llegó con los mineros británicos en el siglo XIX y se transformó en el platillo emblema del pueblo.';
  return 'Soy Isabella, conciencia urbana de Real del Monte. Puedo guiarte por rutas optimizadas, contarte la historia minera, recomendarte dónde comer o explicarte los dichos tradicionales. ¿Qué te gustaría explorar?';
}
