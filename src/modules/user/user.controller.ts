import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async findUsers(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Get(":id")
    async findUserById(@Param("id") id: string): Promise<User | null> {
      return this.userService.findOne(id);
    }
  
    // @Put(':id')
    // async updateUser(@Param('id') id: string, @Body() userData: { name?: string }): Promise<User> {
    //   return this.userService.updateUser(String(id), userData);
    // }
  
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<User> {
      return this.userService.deleteUser(String(id));
    }
}