const React = require("react");

function passthroughChildren(props) {
  return React.createElement(React.Fragment, null, props?.children ?? null);
}

function useTranslations() {
  const t = (key) => key;
  t.raw = (key) => {
    if (key === "clientTestimonials") {
      return [
        {
          id: "mock-1",
          name: "Project Stakeholder",
          quote: "Trusted partnership and quality outcomes.",
        },
      ];
    }
    return {};
  };
  t.rich = (key) => key;
  t.has = () => true;
  return t;
}

function useFormatter() {
  return {
    dateTime: (value) => String(value),
    number: (value) => String(value),
    relativeTime: (value) => String(value),
    list: (value) => String(value),
  };
}

function useLocale() {
  return "en";
}

function useMessages() {
  return {};
}

function useNow() {
  return new Date();
}

function useTimeZone() {
  return "America/Los_Angeles";
}

module.exports = {
  useTranslations,
  useFormatter,
  useLocale,
  useMessages,
  useNow,
  useTimeZone,
  NextIntlClientProvider: passthroughChildren,
  IntlProvider: passthroughChildren,
};
