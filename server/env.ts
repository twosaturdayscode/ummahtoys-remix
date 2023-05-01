import { z } from 'zod'

export const envSchema = z.object({
	WORDPRESS_URL: z.string().min(1),
	WOOCOMMERCE_CK: z.string().min(1),
	WOOCOMMERCE_CS: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>
