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
  image_url: z.url("URL inválida").nullish(),
  event_url: z.url("URL inválida").nullish(),
  social_links: z.url("URL inválida"),
  categorie: z.enum(Categories),
  address: z.object({
    city: z.string().min(2, "Cidade inválida"),
    street: z.string().min(3, "Rua inválida"),
    number: z.string(),
    complement: z.string().nullish(),
  }),
});

export const updateEventSchema = createEventSchema.partial();
