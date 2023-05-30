import React, { Component, ErrorInfo, ReactNode } from 'react';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <MessageBox message={'Něco se pokazilo, obnovte stránku a zkuste to znovu'} type={'error'} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
