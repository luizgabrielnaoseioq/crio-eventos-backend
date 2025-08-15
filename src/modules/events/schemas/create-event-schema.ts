import { Categories } from "@prisma/client";
import z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().nullish(),
  start_date: z.coerce.date({
    error: "Data de início obrigatória",
  }),
  end_date: z.coerce.date({
    error: "Data de término obrigatória",
  }),
  location: z.string().min(3, "Local inválido"),
  image_url: z.string().url("URL inválida").nullish(),
  event_url: z.string().url("URL inválida").nullish(),
  social_links: z.array(z.string().url("URL inválida")).nullish(),
  categories: z.enum(Categories),
});

export const updateEventSchema = createEventSchema.partial();
