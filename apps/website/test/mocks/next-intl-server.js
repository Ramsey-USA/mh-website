function createTranslator() {
  return (key) => key;
}

async function getTranslations() {
  return createTranslator();
}

async function getMessages() {
  return {};
}

async function getLocale() {
  return "en";
}

async function getNow() {
  return new Date();
}

async function getTimeZone() {
  return "America/Los_Angeles";
}

async function getFormatter() {
  return {
    dateTime: (value) => String(value),
    number: (value) => String(value),
  };
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
