import { Controller, Get, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth.dto";

@Controller("/auth")
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
      const user = await this.authService.create({ token });
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
