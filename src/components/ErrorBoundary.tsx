import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-destructive/10">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Algo salió mal</h2>
            <p className="text-sm text-muted-foreground mb-6">Ha ocurrido un error inesperado. Por favor, intenta recargar la página.</p>
            <button onClick={() => window.location.reload()} className="btn-premium inline-flex items-center gap-2">Recargar página</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
