const React = require("react");

function createNavigation() {
  return {
    Link: function MockLink(props) {
      const href = typeof props.href === "string" ? props.href : "#";
      return React.createElement("a", { href }, props.children ?? null);
    },
    redirect: () => undefined,
    usePathname: () => "/",
    useRouter: () => ({
      replace: () => undefined,
      push: () => undefined,
      refresh: () => undefined,
      back: () => undefined,
      forward: () => undefined,
      prefetch: () => Promise.resolve(undefined),
    }),
    getPathname: ({ href }) => (typeof href === "string" ? href : "/"),
  };
}

module.exports = {
  createNavigation,
};
