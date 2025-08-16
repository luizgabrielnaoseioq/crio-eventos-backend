import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import {
  IsEnum
} from "class-validator";
export class SwitchingEventStatusDto {
  @ApiProperty({ enumName: "Status", enum: Status, examples: [Status.APPROVED, Status.REJECTED, Status.PENDING] })
  @IsEnum(Status)
  status: Status;
}