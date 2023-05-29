import { NextPage } from 'next';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

const Webview: NextPage = () => {
  return (
    <MessageBox
      message={
        'Používáte mobilní WebView prohlížeč. Pro přihlášení je nutné, abyste otevřeli tuto stránku ve vašem výchozím'
      }
      type={'warning'}
    />
  );
};

export default Webview;
