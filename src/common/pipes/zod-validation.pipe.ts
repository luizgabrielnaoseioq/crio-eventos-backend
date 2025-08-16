import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      console.log("Validation error:", result.error);
      throw new BadRequestException(result.error);
    }
    return result.data;
  }
}
