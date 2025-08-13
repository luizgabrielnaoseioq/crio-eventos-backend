import { z } from "zod";

const usersSchema = z.object({
  token: z.string().min(1, "token not found"),
});

type UsersSchemaType = z.infer<typeof usersSchema>;

export class AuthDTO implements UsersSchemaType {
  token: string;
}
