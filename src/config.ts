import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3000),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RPC_URL: z.string().url(),
  WYDENCOIN_ADDRESS: z.string().regex(/^0x[0-9a-fA-F]{40}$/),
  MINTER_PRIVATE_KEY: z.string().min(1),
  INTERNAL_API_TOKEN: z.string().min(12),
});

export type Config = z.infer<typeof schema>;
export const loadConfig = (env = process.env): Config => schema.parse(env);
