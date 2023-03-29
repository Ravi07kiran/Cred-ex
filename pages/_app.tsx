import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";


// This is the chainId your dApp will work on.
const activeChain = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Head>
        <title>Cred&Ex</title>
        
      </Head>
      <Header />
      <Component {...pageProps} />
      
    </ThirdwebProvider>
  );
}

export default MyApp;
