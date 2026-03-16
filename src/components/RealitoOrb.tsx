import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRealitoChat } from "@/hooks/useRealitoChat";

const orbVariants = {
  idle: {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 3 },
  },
  active: {
    scale: 1.15,
    boxShadow: "0 0 45px rgba(240, 248, 255, 0.6)",
  },
};

const RealitoOrb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, send, lastTraceId } = useRealitoChat();

  const handleSend = async () => {
    if (!input.trim()) return;
    const payload = input;
    setInput("");
    await send(payload);
  };

  return (
    <>
      <motion.button
        variants={orbVariants}
        animate={isOpen ? "active" : "idle"}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-silver-medium flex items-center justify-center cursor-pointer"
        style={{
          boxShadow: "0 0 30px rgba(240, 248, 255, 0.35)",
          borderTop: "1px solid rgba(255,255,255,0.3)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-pearl-white font-bold text-lg">R</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-24 right-8 z-50 w-[360px] max-h-[500px] bg-pearl-white/5 border border-silver-light/25 shadow-glass-silver backdrop-blur-18 rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-silver-light/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-silver-medium flex items-center justify-center">
                  <span className="text-pearl-white font-bold text-xs">R</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Realito AI</h4>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-silver-light">Modo contextual</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "text-slate-900 bg-bg-day p-3 rounded-2xl rounded-br-md ml-8"
                      : "text-slate-100 p-3 rounded-2xl rounded-bl-md mr-4 bg-black/30"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && <div className="text-xs text-silver-light font-mono">Realito está analizando contexto…</div>}
            </div>

            {lastTraceId && (
              <div className="px-4 py-2 border-t border-silver-light/20 font-mono text-[10px] text-silver-light/80">
                Trace: {lastTraceId.slice(0, 8)}
              </div>
            )}
            <div className="p-3 border-t border-silver-light/20">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && void handleSend()}
                  placeholder="Pregúntale a Realito..."
                  className="flex-1 bg-black/25 text-sm px-4 py-2.5 rounded-xl border border-silver-light/20 outline-none text-slate-100 placeholder:text-slate-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => void handleSend()}
                  className="px-4 py-2.5 bg-silver-medium text-pearl-white text-xs font-bold rounded-xl"
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
