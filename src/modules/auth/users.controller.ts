import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "generated/prisma";
import { UsersDTO } from "./dto/users.dto";

@Controller("/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  async createUser(
    @Body()
    body: UsersDTO
  ) {
    const { token } = body
    console.log(body);
    
    try {
      const user = await this.usersService.create({ token })
      return user
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  async findUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findUserById(@Param("id") id: string): Promise<User | null> {
    return this.usersService.findOne(id);
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
