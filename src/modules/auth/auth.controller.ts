import { Controller, Get, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller("/users")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async createUser(
    @Body()
    body: AuthDTO
  ) {
    const { token } = body;
    console.log(body);

    try {
      const auth = await this.authService.create({ token });
      return auth;
    } catch (error) {
      console.error(error);
    }
  }
}
