// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require("intl");
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const express = require("express");
const { readFileSync } = require("fs");
const { basename } = require("path");
const accepts = require("accepts");
const glob = require("glob");
const next = require("next");
const dotenv = require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
  .sync("./lang/*.json")
  .map(f => basename(f, ".json"));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  const lang = locale.split("-")[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = readFileSync(localeDataFile, "utf8");
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => {
  return require(`./lang/${locale}.json`);
};

app.prepare().then(() => {
  const server = express();

  const addLocaleSupport = req => {
    const accept = accepts(req);
    const locale =
      accept.language(accept.languages(supportedLanguages)) || "en";
    req.locale = locale;
    req.localeDataScript = getLocaleDataScript(locale);
    req.messages = /*dev ? {} :*/ getMessages(locale);
    return req;
  };

  server.get("/posts/post/:id", (req, res) => {
    return app.render(addLocaleSupport(req), res, "/posts/post", {
      id: req.params.id
    });
  });

  server.get("/pages/page/:id", (req, res) => {
    return app.render(addLocaleSupport(req), res, "/pages/page", {
      id: req.params.id
    });
  });

  server.get("/user/confirm/:token", (req, res) => {
    return app.render(addLocaleSupport(req), res, "/confirm", {
      token: req.params.token
    });
  });

  server.get("/user/change-password/:token", (req, res) => {
    return app.render(addLocaleSupport(req), res, "/change-password", {
      token: req.params.token
    });
  });

  server.get("*", (req, res) => {
    return handle(addLocaleSupport(req), res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
