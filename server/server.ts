import type { AppLoadContext } from '@remix-run/cloudflare'
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages'
import * as build from '@remix-run/dev/server-build'
import { envSchema } from 'server/env'
import { WooCommerceService } from 'services/commerce/woocommerce/woocommerce'

const handleRequest = createPagesFunctionHandler({
	build,
	mode: process.env.NODE_ENV,
	getLoadContext(context): AppLoadContext {
		const env: AppLoadContext['env'] = envSchema.parse(context.env)

		const services: AppLoadContext['services'] = {
			woocommerce: new WooCommerceService(env.WORDPRESS_URL, {
				consumerKey: env.WOOCOMMERCE_CK,
				consumerSecret: env.WOOCOMMERCE_CS,
			}),
		}

		return { env, services }
	},
})

export function onRequest(context: EventContext<any, any, any>) {
	return handleRequest(context)
}
