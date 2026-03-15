import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const orbVariants = {
  idle: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 3 },
  },
  active: {
    scale: 1.15,
    boxShadow: "0 0 60px rgba(0, 243, 255, 0.5)",
  },
};

const RealitoOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    {
      role: "assistant",
      text: "Bienvenido a la cima, viajero. La neblina está baja hoy, perfecto para un paste caliente en el centro. ¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    // Simulated response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Estoy analizando tu consulta sobre Real del Monte. Pronto tendré acceso al motor TAMV para darte información en tiempo real. Por ahora, te recomiendo visitar el Museo de Mina La Acosta.",
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Orb */}
      <motion.button
        variants={orbVariants}
        animate={isOpen ? "active" : "idle"}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center cursor-pointer"
        style={{
          boxShadow: "0 0 30px rgba(0, 243, 255, 0.3)",
          borderTop: "1px solid rgba(255,255,255,0.3)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-primary-foreground font-bold text-lg">R</span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-8 z-50 w-[360px] max-h-[500px] glass-surface-strong flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-foreground/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">R</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Realito AI</h4>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
                    TAMV Kernel · En línea
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-foreground bg-muted p-3 rounded-2xl rounded-br-md ml-8"
                      : "text-muted-foreground p-3 rounded-2xl rounded-bl-md mr-4 bg-card/60"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-foreground/10">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Pregúntale a Realito..."
                  className="flex-1 bg-muted/50 text-sm px-4 py-2.5 rounded-xl border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="px-4 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RealitoOrb;
