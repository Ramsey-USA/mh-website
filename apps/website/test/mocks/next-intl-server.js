function createTranslator() {
  return (key) => key;
}

function getTranslations() {
  return Promise.resolve(createTranslator());
}

function getMessages() {
  return Promise.resolve({});
}

function getLocale() {
  return Promise.resolve("en");
}

function getNow() {
  return Promise.resolve(new Date());
}

function getTimeZone() {
  return Promise.resolve("America/Los_Angeles");
}

function getFormatter() {
  return Promise.resolve({
    dateTime: (value) => String(value),
    number: (value) => String(value),
  });
}

function getRequestConfig(factory) {
  return factory;
}

function setRequestLocale() {
  return undefined;
}

module.exports = {
  getTranslations,
  getMessages,
  getLocale,
  getNow,
  getTimeZone,
  getFormatter,
  getRequestConfig,
  setRequestLocale,
};
