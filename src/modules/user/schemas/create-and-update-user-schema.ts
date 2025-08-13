import z, { email } from "zod";
import { partial } from "zod/mini";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  googleId: z.string(),
});

export const updateUserSchema = createUserSchema.partial();
