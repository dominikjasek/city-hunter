import isWebview from 'is-ua-webview';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useWebviewLoginRedirect = () => {
  const { push } = useRouter();

  useEffect(() => {
    const isWebView = isWebview(window.navigator.userAgent);
    if (isWebView) {
      push('/auth/webview');
    }
  }, []);
};
