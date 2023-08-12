import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  SESSION_SECRET: z.string().min(1, { message: "SESSION_SECRET must be set" }),
});

const environment = environmentSchema.parse(process.env);

export { environment };
