import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // CAUTION: Console in development, for production use api's for data collection
    if (process.env.environment !== "production") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
    // TODO: Service api to be made and called for data collection
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen">
          <main
            className="relative mx-auto w-full h-full flex justify-center items-center text-7xl text-richblack-900
           min-w-minContent max-w-maxContent overflow-scroll overflow-x-hidden"
          >
            <h1>Something went wrong!</h1>
          </main>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
