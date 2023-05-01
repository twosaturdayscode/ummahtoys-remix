# Welcome to Ummahtoys website!

This e-commerce website is made with Remix, powered by Woocommerce.

- [Remix Docs](https://remix.run/docs)
- [Woocommerce Docs](https://woocommerce.com/documentation)

## Development

Remember to:

- Set WordPress permalinks to something `Post name` at: Settings > Permalinks.
- Generate REST API keys: WooCommerce > Settings > Advanced > REST API.

## To be done:

- [ ] Create `WooCommerceProductSchema` zod schema to perform validation of the products coming from WooCommerce API and filter out incomplete products. Remember to check:
  - [ ] At least one image in the images property

## Notes

- To fully develop locally I'm using [LocalWP](https://localwp.com) to get the HTTPS thing working you need to self-sign the SSL certificate. So far so good, but this causes an issue with the Fetch API (used by cloudflare pages) that throws when the server to be connected to is not _really_ secure (i.e. SSL is self-signed). A workaround is to set the env var `NODE_TLS_REJECT_UNAUTHORIZED` to 0
