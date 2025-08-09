import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { Prisma, User } from "generated/prisma";
import { OAuth2Client } from "google-auth-library";
import { UsersDTO } from "./dto/users.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) { }

  async create({ token }: UsersDTO) {
    const data = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    const payload = data.getPayload()
    if (!payload) throw new UnauthorizedException("Invalid Google token")

    const { email, name, picture, sub } = payload

    if (!email) throw new UnauthorizedException("Email not provided")

    let user = await this.prisma.user.findUnique({
      where: { googleId: sub }
    })

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name,
          picture,
          googleId: sub
        }
      })
    }
    const authentication = this.jwt.sign(
      {
        sub: user.id,
        role: user.role,
        email: user.email
      },
      {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET
      }
    )
    return {
      user,
      authentication
    }
  }


  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
