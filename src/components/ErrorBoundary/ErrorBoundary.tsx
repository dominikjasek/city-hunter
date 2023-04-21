import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasKnownError?: boolean;
  hasError: boolean;
}

const isKnownError = (e: Error): boolean => {
  return e.stack?.includes('JAK.Signals.removeListener') ?? false;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    hasKnownError: false,
  };

  public static getDerivedStateFromError(e: Error): State {
    if (isKnownError(e)) {
      return { hasError: false, hasKnownError: true };
    }
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (isKnownError(error)) {
      return;
    }
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h4>
          Jejda, něco se pokazilo, prosím nahlašte tuto chybu
          administrátorovi...
        </h4>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
