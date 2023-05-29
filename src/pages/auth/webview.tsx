import { NextPage } from 'next';
import { Typography } from '@mui/material';

const Webview: NextPage = () => {
  return (
    <Typography>
      Používáte mobilní WebView prohlížeč. Pro přihlášení je nutné, abyste otevřeli tuto stránku ve vašem výchozím
      prohlížeči.
    </Typography>
  );
};

export default Webview;
