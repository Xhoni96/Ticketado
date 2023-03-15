import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SESSION_SECRET: z.string().min(1, { message: "SESSION_SECRET must be set" }),
  VMT_TOKEN: z.string().min(1),
  API_URL: z.string().min(1),
});

const environment = environmentSchema.parse(process.env);

export { environment };
