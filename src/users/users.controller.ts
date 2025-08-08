import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Event, Role, User } from "generated/prisma";

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async createUser(
  //   @Body()
  //   userData: {
  //     email: string;
  //     name: string;
  //     picture: string;
  //     role: Role;
  //     created_at: string;
  //     token: string;
  //     event: Event[];
  //   }
  // ): Promise<User> {
  //   return this.usersService.create(userData);
  // }

  @Get()
  async findUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findUserById(@Param("id") id: string): Promise<User | null> {
    return this.usersService.findOne(String(id));
  }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() userData: { name?: string }): Promise<User> {
  //   return this.usersService.updateUser(String(id), userData);
  // }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<User> {
    return this.usersService.deleteUser(String(id));
  }
}
