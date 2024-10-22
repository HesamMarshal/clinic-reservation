import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  slug: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional({ format: "binary" })
  image: string;
}
