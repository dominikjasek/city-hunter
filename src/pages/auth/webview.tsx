import { NextPage } from 'next';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import isWebview from 'is-ua-webview';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Webview: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    const isWebView = isWebview(window.navigator.userAgent);
    if (!isWebView) {
      push('/auth/login');
    }
  });

  return (
    <MessageBox
      message={
        'Používáte mobilní WebView prohlížeč. Z bezpečnostních důvodů je pro přihlášení potřebné, abyste otevřeli tuto stránku ve vašem výchozím prohlížeči.'
      }
      type={'warning'}
    />
  );
};

export default Webview;
