import z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(5, "O titulo deve ter pelo menos 5 caracteres"),
  description: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  location: z.string().min(3, "Local inválido"),
});

export const updateEventSchema = createEventSchema.partial();
