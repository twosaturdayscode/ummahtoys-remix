import type { Env } from 'server/env'
import type { WooCommerceService } from 'services/commerce/woocommerce/woocommerce'

declare module '@remix-run/server-runtime' {
	export interface AppLoadContext {
		env: Env
		services: {
			woocommerce: WooCommerceService
		}
	}
}
