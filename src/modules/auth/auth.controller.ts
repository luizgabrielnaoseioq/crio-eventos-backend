import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UsersDTO } from "./dto/users.dto";

@ApiTags("Auth")
@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createUser(
    @Body()
    body: UsersDTO
  ) {
    const { token } = body;
    console.log(body);

    try {
      const user = await this.authService.create({ token });
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
