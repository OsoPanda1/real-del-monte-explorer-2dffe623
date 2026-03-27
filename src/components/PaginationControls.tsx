import { motion } from "framer-motion";
import type { PaginationMeta } from "@/hooks/usePaginated";

interface PaginationControlsProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ meta, onPageChange }: PaginationControlsProps) => {
  if (meta.totalPages <= 1) return null;

  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, meta.page - Math.floor(maxVisible / 2));
  const end = Math.min(meta.totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-2 mt-8 font-mono text-xs"
    >
      <button
        onClick={() => onPageChange(meta.page - 1)}
        disabled={meta.page <= 1}
        className="px-3 py-2 rounded-lg bg-card/60 border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Anterior
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 rounded-lg bg-card/40 border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            1
          </button>
          {start > 2 && <span className="text-muted-foreground px-1">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded-lg border transition-colors ${
            p === meta.page
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card/40 border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {p}
        </button>
      ))}

      {end < meta.totalPages && (
        <>
          {end < meta.totalPages - 1 && <span className="text-muted-foreground px-1">…</span>}
          <button
            onClick={() => onPageChange(meta.totalPages)}
            className="w-8 h-8 rounded-lg bg-card/40 border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            {meta.totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(meta.page + 1)}
        disabled={meta.page >= meta.totalPages}
        className="px-3 py-2 rounded-lg bg-card/60 border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Siguiente →
      </button>

      <span className="ml-4 text-muted-foreground">
        {meta.totalItems} registros
      </span>
    </motion.div>
  );
};

export default PaginationControls;
