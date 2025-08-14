import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "src/common/decorator/guard/jwt-auth.guard";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import {
  createUserSchema,
  updateUserSchema,
} from "./schemas/create-and-update-user-schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";

@ApiTags("User")
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findUsers(): Promise<User[]> {
    console.log("oi");

    return await this.userService.findAll();
  }

  @Get("/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") userId: string) {
    try {
      return await this.userService.findOne(userId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // Para atualizar ele tem que mandar os mesmos dados do create: name, email e googleId
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Body() data: updateUserDto, @Param("id") userId: string) {
    try {
      return await this.userService.update(userId, data);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") userId: string) {
    try {
      return await this.userService.remove(userId);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(":id")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async changeUserRole(@Param("id") userId: string) {
    return await this.userService.changeUserRole(userId);
  }
}
