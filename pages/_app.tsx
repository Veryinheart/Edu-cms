import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { MessagesProvider } from '../components/contexts/messageContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MessagesProvider>
      <Component {...pageProps} />
    </MessagesProvider>
  );
}

export default MyApp;
