const getCloudflareContext = jest.fn(() => {
  throw new Error("Not in a Cloudflare Workers environment");
});

module.exports = {
  getCloudflareContext,
};
