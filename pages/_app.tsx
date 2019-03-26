import { LocaleProvider } from 'antd';
import csCZ from 'antd/lib/locale-provider/cs_CZ';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { addLocaleData, IntlProvider } from 'react-intl';
import '../lib/icons';
import withApollo from '../lib/withApollo';
import '../styles/global.scss';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

declare global {
  interface Window {
    ReactIntlLocaleData: any;
    __NEXT_DATA__: any;
  }
}

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();
    return { pageProps, locale, messages, initialNow };
  }

  render() {
    const {
      Component,
      pageProps,
      locale,
      messages,
      initialNow,
      apolloClient
    } = this.props;
    return (
      <Container>
        <LocaleProvider locale={csCZ}>
          <IntlProvider
            locale={locale}
            messages={messages}
            initialNow={initialNow}
          >
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </IntlProvider>
        </LocaleProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
