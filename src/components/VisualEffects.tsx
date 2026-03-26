import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export const TextReveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "100%", opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}>
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className={className}>
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }} className={className}>
    {children}
  </motion.div>
);

export const GlowCard = ({ children, className = "", color = "electric" }: { children: ReactNode; className?: string; color?: "electric" | "gold" | "copper" }) => {
  const glowColors = { electric: "hsla(210,100%,55%,0.15)", gold: "hsla(43,80%,55%,0.15)", copper: "hsla(25,55%,45%,0.15)" };
  return (
    <motion.div className={`relative glass-card rounded-xl overflow-hidden group card-glow-hover ${className}`} whileHover={{ y: -6, boxShadow: `0 20px 50px -15px ${glowColors[color]}` }} transition={{ duration: 0.4 }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${glowColors[color]}, transparent 70%)` }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const AuroraBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 aurora-bg pointer-events-none ${className}`} />
);

export const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-[hsla(210,100%,55%,0.03)] blur-3xl animate-orb" />
    <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-[hsla(43,80%,55%,0.03)] blur-3xl animate-orb-reverse" />
    <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-[hsla(145,35%,28%,0.02)] blur-3xl animate-breathe" />
  </div>
);

export const ImmersiveHero = ({ image, title, subtitle, label, children }: { image: string; title: string; subtitle?: string; label?: string; children?: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={image} alt={title} className="w-full h-full object-cover ken-burns opacity-30" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <AuroraBackground />
      <FloatingOrbs />
      <div className="dust-particles" />
      <motion.div className="relative text-center px-6 z-10" style={{ opacity }}>
        {children}
        {label && (
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[10px] tracking-[0.5em] uppercase text-[hsl(var(--gold))]/60 block mb-4">{label}</motion.span>
        )}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight">
          <span className="text-gradient-gold animate-gradient-text text-glow-gold">{title}</span>
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="font-display text-lg md:text-xl text-[hsl(var(--platinum))]/60 italic mt-6 max-w-xl mx-auto">{subtitle}</motion.p>
        )}
      </motion.div>
    </section>
  );
};
