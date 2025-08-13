import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        googleId: data.googleId,
        created_at: data.created_at,
        role: data.role,
        picture: data.picture,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: updateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async changeUserRole(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        role: "ADMIN",
      },
    });
  }
}
