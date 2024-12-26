import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  console.log("MyApp renderizado", { Component, pageProps });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
