import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";
import { AuthDTO } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService
  ) {}

  async create({ token }: AuthDTO) {
    const data = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = data.getPayload();
    if (!payload) throw new UnauthorizedException("Invalid Google token");

    const { email, name, picture, sub } = payload;

    if (!email) throw new UnauthorizedException("Email not provided");

    let user = await this.prisma.user.findUnique({
      where: { googleId: sub },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          picture,
          googleId: sub,
        },
      });
    }
    const accessToken = this.jwt.sign(
      {
        sub: user.id,
        role: user.role,
        email: user.email,
      },
      {
        expiresIn: "7d",
        secret: process.env.JWT_SECRET,
      }
    );
    console.log("accessToken", accessToken);

    return {
      user,
      accessToken,
    };
  }
}
