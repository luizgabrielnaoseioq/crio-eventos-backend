import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err, user) {
    // Se houver erro ou usuário inválido → lança 401
    if (err || !user) {
      throw err || new UnauthorizedException("Token inválido ou ausente");
    }
    return user;
  }
}
